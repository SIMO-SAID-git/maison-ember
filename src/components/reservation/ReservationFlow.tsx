'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarX, Loader2 } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { DatePicker } from '@/components/reservation/DatePicker'
import { occasions, reservationRules, seatings } from '@/data/reservations'
import { restaurant } from '@/data/restaurant'
import { seatingAvailable } from '@/lib/availability'
import { createReservation, fetchAvailability, updateReservation } from '@/lib/api/reservations'
import { validateGuest } from '@/lib/validation'
import { cn, fmt, formatDate } from '@/lib/utils'
import type { OccasionId, Reservation, SeatingId, Slot } from '@/types'

const STEPS = ['date', 'guests', 'time', 'seating', 'details'] as const
type Details = { firstName: string; lastName: string; email: string; phone: string; requests: string; occasion: OccasionId }

interface Props {
  mode: 'new' | 'modify'
  initial?: { date?: string; guests?: number; time?: string; requests?: string; offerName?: string }
}

function StepHeading({ children, focus }: { children: ReactNode; focus: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (focus) ref.current?.focus()
  }, [focus])
  return (
    <h2 ref={ref} tabIndex={-1} className="font-display text-3xl font-light leading-tight outline-none sm:text-4xl">
      {children}
    </h2>
  )
}

export function ReservationFlow({ mode, initial }: Props) {
  const { t, locale, href, dir, reservation, saveReservation, hydrated } = useApp()
  const router = useRouter()
  const existing = mode === 'modify' && reservation?.status === 'confirmed' ? reservation : null

  const [step, setStep] = useState(() => (initial?.date && initial.guests ? 2 : 0))
  const [interacted, setInteracted] = useState(false)
  const [date, setDate] = useState<string | null>(initial?.date ?? null)
  const [guests, setGuests] = useState<number | null>(initial?.guests ?? null)
  const [time, setTime] = useState<string | null>(initial?.time ?? null)
  const [seating, setSeating] = useState<SeatingId | null>(null)
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [details, setDetails] = useState<Details>({ firstName: '', lastName: '', email: '', phone: '', requests: initial?.requests ?? '', occasion: 'other' })
  const [errors, setErrors] = useState<ReturnType<typeof validateGuest>>({})
  const [submitting, setSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)
  const loadedExisting = useRef(false)

  // Modify mode: prefill from the stored reservation once it has loaded from localStorage.
  useEffect(() => {
    if (!existing || loadedExisting.current) return
    loadedExisting.current = true
    setDate(existing.date); setGuests(existing.guests); setTime(existing.time); setSeating(existing.seating)
    setDetails({ firstName: existing.firstName, lastName: existing.lastName, email: existing.email, phone: existing.phone, requests: existing.requests, occasion: existing.occasion })
    setStep(0)
  }, [existing])

  useEffect(() => {
    if (!date || !guests) {
      setSlots(null)
      return
    }
    let cancelled = false
    setSlots(null)
    fetchAvailability(date, guests).then((s) => {
      if (cancelled) return
      setSlots(s)
      setTime((prev) => (prev && s.some((x) => x.time === prev && x.available) ? prev : null))
    })
    return () => {
      cancelled = true
    }
  }, [date, guests])

  const go = (n: number) => {
    setInteracted(true)
    setStep(n)
  }
  const valid = [!!date, !!guests, !!time, !!seating][step] ?? true
  const set = <K extends keyof Details>(key: K, value: Details[K]) => setDetails((d) => ({ ...d, [key]: value }))

  const chooseGuests = (n: number) => {
    setGuests(n)
    const rule = seatings.find((s) => s.id === seating)
    if (rule && (n < rule.minGuests || n > rule.maxGuests)) setSeating(null)
  }
  const chooseTime = (value: string) => {
    setTime(value)
    if (seating && date && guests && !seatingAvailable(date, value, seating, guests)) setSeating(null)
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!date || !guests || !time || !seating) return
    const found = validateGuest(details, t.errors)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setSubmitting(true)
    setFailed(false)
    const input = {
      date, time, guests, seating,
      firstName: details.firstName.trim(), lastName: details.lastName.trim(), email: details.email.trim(),
      phone: details.phone.trim(), occasion: details.occasion, requests: details.requests.trim(),
    }
    try {
      const result: Reservation = existing ? await updateReservation(existing, input) : await createReservation(input)
      saveReservation(result)
      router.push(href(`/reservation/confirmation${existing ? '?updated=1' : ''}`))
    } catch {
      setFailed(true)
      setSubmitting(false)
    }
  }

  const x = dir === 'rtl' ? -16 : 16
  const stepLabel = fmt(t.reserve.stepOf, { n: step + 1, total: STEPS.length })
  const guestLabel = guests === null ? t.reserve.notSelected : guests === 1 ? t.common.guestOne : fmt(t.common.guestMany, { n: guests })

  const renderSlots = () => {
    if (slots === null) {
      return (
        <div role="status" aria-label={t.reserve.loadingSlots}>
          <span className="sr-only">{t.reserve.loadingSlots}</span>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => <Skeleton key={i} className="h-12" />)}
          </div>
        </div>
      )
    }
    if (slots.length === 0 || slots.every((s) => !s.available)) {
      const closed = slots.length === 0
      return (
        <EmptyState icon={<CalendarX className="h-10 w-10" />} title={closed ? t.reserve.noSlotsClosedTitle : t.reserve.noSlotsFullTitle} className="py-8">
          <p>{closed ? t.reserve.noSlotsClosedBody : t.reserve.noSlotsFullBody}</p>
          <Button variant="dark" className="mt-6" onClick={() => go(0)}>{t.reserve.chooseAnother}</Button>
        </EmptyState>
      )
    }
    const group = (label: string, list: Slot[]) =>
      list.length === 0 ? null : (
        <fieldset className="mt-6 first:mt-0">
          <legend className="mb-3 text-sm font-medium text-mute">{label}</legend>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {list.map((s) => (
              <button
                key={s.time}
                type="button"
                disabled={!s.available}
                aria-pressed={time === s.time}
                aria-label={s.available ? s.time : `${s.time}, ${t.reserve.slotUnavailable}`}
                onClick={() => chooseTime(s.time)}
                className={cn(
                  'rounded-[3px] border py-3 text-[15px] transition-colors',
                  time === s.time ? 'border-deep bg-deep text-chalk' : 'border-deep/25 hover:border-deep',
                  !s.available && 'cursor-not-allowed border-deep/10 text-deep/35 line-through hover:border-deep/10',
                )}
              >
                {s.time}
              </button>
            ))}
          </div>
        </fieldset>
      )
    return (
      <>
        <p className="mb-5 text-sm text-mute">{t.reserve.timeHelp}</p>
        {group(t.reserve.lunch, slots.filter((s) => s.time < '16:00'))}
        {group(t.reserve.dinner, slots.filter((s) => s.time >= '16:00'))}
      </>
    )
  }

  const fieldError = (key: keyof Details) => (errors as Record<string, string | undefined>)[key]
  const input = (key: 'firstName' | 'lastName' | 'email' | 'phone', label: string, type = 'text', autoComplete?: string) => (
    <div>
      <label htmlFor={`f-${key}`} className="mb-1.5 block text-[15px] font-medium">{label}</label>
      <input
        id={`f-${key}`} name={key} type={type} autoComplete={autoComplete} value={details[key]}
        onChange={(e) => set(key, e.target.value)} className="field"
        aria-invalid={fieldError(key) ? true : undefined} aria-describedby={fieldError(key) ? `e-${key}` : undefined}
      />
      {fieldError(key) && <p id={`e-${key}`} className="mt-1.5 text-sm text-ember">{fieldError(key)}</p>}
    </div>
  )

  if (mode === 'modify' && hydrated && !existing) {
    return (
      <div className="container-x py-16">
        <EmptyState icon={<CalendarX className="h-10 w-10" />} title={t.my.emptyTitle}>
          <p>{t.my.emptyBody}</p>
          <Link href={href('/reservations')} className="mt-5 inline-block text-zellige underline underline-offset-4">{t.reserve.title}</Link>
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="container-x grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <nav aria-label={stepLabel}>
          <p className="mb-3 text-sm text-mute lg:hidden">{stepLabel}</p>
          <ol className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <li key={s} className="flex-1">
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => go(i)}
                  aria-current={i === step ? 'step' : undefined}
                  className="group block w-full text-start disabled:cursor-default"
                >
                  <span className={cn('block h-1 rounded-full', i <= step ? 'bg-zellige' : 'bg-deep/15')} />
                  <span className={cn('mt-2 hidden text-sm lg:block', i === step ? 'font-medium' : 'text-mute')}>{t.reserve.steps[s]}</span>
                  <span className="sr-only lg:hidden">{t.reserve.steps[s]}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -x }} transition={{ duration: 0.25 }} className="mt-10">
            {step === 0 && (
              <section>
                <StepHeading focus={interacted}>{existing ? t.reserve.modifyTitle : t.reserve.dateTitle}</StepHeading>
                <p className="mb-6 mt-2 text-mute">{t.reserve.dateHelp}</p>
                <DatePicker value={date} onChange={setDate} />
              </section>
            )}
            {step === 1 && (
              <section>
                <StepHeading focus={interacted}>{t.reserve.guestsTitle}</StepHeading>
                <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-7">
                  {Array.from({ length: reservationRules.maxGuests }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n} type="button" aria-pressed={guests === n} onClick={() => chooseGuests(n)}
                      className={cn('aspect-square rounded-[3px] border font-display text-2xl transition-colors', guests === n ? 'border-deep bg-deep text-chalk' : 'border-deep/25 hover:border-deep')}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="mt-5 text-sm text-mute">{t.reserve.guestsHelp}</p>
                <p className="mt-2 text-sm">
                  {t.reserve.largeParty}{' '}
                  <Link href={href('/contact')} className="text-zellige underline underline-offset-4">{t.nav.contact}</Link>
                </p>
              </section>
            )}
            {step === 2 && (
              <section>
                <StepHeading focus={interacted}>{t.reserve.timeTitle}</StepHeading>
                <div className="mt-6">{renderSlots()}</div>
              </section>
            )}
            {step === 3 && date && guests && time && (
              <section>
                <StepHeading focus={interacted}>{t.reserve.seatingTitle}</StepHeading>
                <fieldset className="mt-6 grid gap-3 sm:grid-cols-2">
                  <legend className="sr-only">{t.reserve.seatingTitle}</legend>
                  {seatings.map((s) => {
                    const inRange = guests >= s.minGuests && guests <= s.maxGuests
                    const free = seatingAvailable(date, time, s.id, guests)
                    const copy = t.reserve.seating[s.id]
                    return (
                      <label key={s.id} className={cn('relative block', !free && 'cursor-not-allowed opacity-55')}>
                        <input
                          type="radio" name="seating" value={s.id} disabled={!free} checked={seating === s.id}
                          onChange={() => setSeating(s.id)} className="peer sr-only"
                        />
                        <span className="block h-full rounded-[3px] border border-deep/25 p-5 transition-colors peer-checked:border-deep peer-checked:bg-deep peer-checked:text-chalk peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-zellige">
                          <span className="block font-display text-2xl">{copy.name}</span>
                          <span className="mt-1 block text-[15px] opacity-80">{copy.desc}</span>
                          {!free && (
                            <span className="mt-3 block text-sm font-medium">
                              {inRange ? t.reserve.seatingUnavailable : fmt(t.reserve.seatingNeeds, { min: s.minGuests, max: s.maxGuests })}
                            </span>
                          )}
                        </span>
                      </label>
                    )
                  })}
                </fieldset>
              </section>
            )}
            {step === 4 && (
              <section>
                <StepHeading focus={interacted}>{t.reserve.detailsTitle}</StepHeading>
                <form onSubmit={submit} noValidate className="mt-6 space-y-5">
                  {initial?.offerName && <p className="rounded-[3px] bg-saffron/25 p-3 text-[15px]">{fmt(t.reserve.offerApplied, { name: initial.offerName })}</p>}
                  {Object.keys(errors).length > 0 && <p role="alert" className="rounded-[3px] border border-ember p-3 text-[15px] text-ember">{t.errors.summary}</p>}
                  <div className="grid gap-5 sm:grid-cols-2">
                    {input('firstName', t.reserve.firstName, 'text', 'given-name')}
                    {input('lastName', t.reserve.lastName, 'text', 'family-name')}
                    {input('email', t.reserve.email, 'email', 'email')}
                    {input('phone', t.reserve.phone, 'tel', 'tel')}
                  </div>
                  <fieldset>
                    <legend className="mb-2 text-[15px] font-medium">{t.reserve.occasion}</legend>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((o) => (
                        <label key={o}>
                          <input type="radio" name="occasion" value={o} checked={details.occasion === o} onChange={() => set('occasion', o)} className="peer sr-only" />
                          <span className="block cursor-pointer rounded-full border border-deep/25 px-4 py-2 text-[15px] peer-checked:border-deep peer-checked:bg-deep peer-checked:text-chalk peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-zellige">
                            {t.reserve.occasions[o]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="f-requests" className="mb-1.5 block text-[15px] font-medium">{t.reserve.requests}</label>
                    <textarea
                      id="f-requests" rows={4} value={details.requests} onChange={(e) => set('requests', e.target.value)} className="field"
                      aria-describedby="requests-help" aria-invalid={errors.requests ? true : undefined}
                    />
                    <p id="requests-help" className={cn('mt-1.5 text-sm', errors.requests ? 'text-ember' : 'text-mute')}>
                      {errors.requests ?? t.reserve.requestsHelp} ({details.requests.length}/{reservationRules.maxRequestLength})
                    </p>
                  </div>
                  {failed && <p role="alert" className="rounded-[3px] border border-ember p-3 text-[15px] text-ember">{t.reserve.failed}</p>}
                  <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                    {submitting ? t.reserve.submitting : existing ? t.reserve.modifySubmit : t.reserve.submit}
                  </Button>
                </form>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-3">
          {step > 0 && <Button variant="outline" onClick={() => go(step - 1)}>{t.common.back}</Button>}
          {step < STEPS.length - 1 && <Button variant="dark" disabled={!valid} onClick={() => go(step + 1)}>{t.common.continue}</Button>}
        </div>
      </div>

      <aside className="lg:col-span-5" aria-label={t.reserve.summary}>
        <div className="dark-surface rounded-md bg-deep p-7 text-chalk lg:sticky lg:top-28">
          <h2 className="font-display text-3xl font-light">{t.reserve.summary}</h2>
          <dl className="mt-5 space-y-3 text-[15px]">
            {[
              [t.reserve.steps.date, date ? formatDate(date, locale) : t.reserve.notSelected],
              [t.reserve.steps.guests, guestLabel],
              [t.reserve.steps.time, time ?? t.reserve.notSelected],
              [t.reserve.steps.seating, seating ? t.reserve.seating[seating].name : t.reserve.notSelected],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-chalk/10 pb-3">
                <dt className="text-chalk/65">{label}</dt>
                <dd className="text-end font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-chalk/70">{restaurant.address.street}, {restaurant.address.district}, {restaurant.address.city}</p>
          <p className="mt-4 rounded-[3px] bg-chalk/10 p-3 text-sm">{t.common.demoDisclaimer}</p>
        </div>
      </aside>
    </div>
  )
}
