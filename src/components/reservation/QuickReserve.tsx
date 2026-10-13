'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/providers/AppProvider'
import { Button } from '@/components/ui/Button'
import { reservationRules } from '@/data/reservations'
import { ALL_SLOT_TIMES, isClosedDate } from '@/lib/availability'
import { addDays, fmt, toISODate } from '@/lib/utils'

export function QuickReserve() {
  const { t, href } = useApp()
  const router = useRouter()
  const [bounds, setBounds] = useState<{ min: string; max: string } | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('2')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const today = toISODate(new Date())
    setBounds({ min: today, max: addDays(today, reservationRules.bookAheadDays) })
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!date) return setError(t.home.pickDate)
    if (isClosedDate(date)) return setError(t.home.closedMonday)
    setError(null)
    const query = new URLSearchParams({ date, guests })
    if (time) query.set('time', time)
    router.push(href(`/reservations?${query.toString()}`))
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end">
      <div>
        <label htmlFor="q-date" className="mb-1.5 block text-sm text-chalk/75">{t.home.date}</label>
        <input id="q-date" type="date" value={date} min={bounds?.min} max={bounds?.max} onChange={(e) => setDate(e.target.value)} className="field bg-deep-700 text-chalk border-chalk/25" aria-invalid={error ? true : undefined} aria-describedby={error ? 'q-error' : undefined} />
      </div>
      <div>
        <label htmlFor="q-time" className="mb-1.5 block text-sm text-chalk/75">{t.home.time}</label>
        <select id="q-time" value={time} onChange={(e) => setTime(e.target.value)} className="field bg-deep-700 text-chalk border-chalk/25">
          <option value="">{t.home.anyTime}</option>
          {ALL_SLOT_TIMES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="q-guests" className="mb-1.5 block text-sm text-chalk/75">{t.home.guests}</label>
        <select id="q-guests" value={guests} onChange={(e) => setGuests(e.target.value)} className="field bg-deep-700 text-chalk border-chalk/25">
          {Array.from({ length: reservationRules.maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n === 1 ? t.common.guestOne : fmt(t.common.guestMany, { n })}</option>
          ))}
        </select>
      </div>
      <Button type="submit" className="sm:col-span-2 lg:col-span-1">{t.home.reserveCta}</Button>
      {error && <p id="q-error" role="alert" className="text-sm text-saffron sm:col-span-2 lg:col-span-4">{error}</p>}
    </form>
  )
}
