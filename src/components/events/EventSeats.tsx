'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Check, Loader2 } from 'lucide-react'
import { STORAGE_KEYS, useApp } from '@/components/providers/AppProvider'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useLocalStorage } from '@/lib/storage'
import { validateContact } from '@/lib/validation'
import { fmt } from '@/lib/utils'
import type { EventItem } from '@/types'

type Holds = Record<string, { seats: number; name: string }>

/** Mock seat booking: holds are stored in localStorage. Replace with a ticketing API. */
export function EventSeats({ event }: { event: EventItem }) {
  const { t, href } = useApp()
  const [holds, setHolds] = useLocalStorage<Holds>(STORAGE_KEYS.eventSeats, {})
  const [seats, setSeats] = useState(2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [busy, setBusy] = useState(false)

  const held = holds[event.id]
  const heldSeats = held?.seats ?? 0
  const left = Math.max(0, event.seatsAvailable - heldSeats)

  if (event.seatsAvailable === 0) {
    return (
      <div className="rounded-md bg-deep p-6 text-chalk dark-surface" role="status">
        <Badge tone="accent">{t.events.soldOut}</Badge>
        <p className="mt-3 text-chalk/80">{t.events.soldOutBody}</p>
        <ButtonLink href={href('/contact')} variant="outlineLight" className="mt-5">{t.events.joinWaitlist}</ButtonLink>
      </div>
    )
  }

  if (held) {
    return (
      <div className="rounded-md bg-chalk-100 p-6" role="status">
        <p className="flex items-center gap-2 font-display text-2xl"><Check className="h-5 w-5 text-zellige" aria-hidden /> {t.events.holdSuccess}</p>
        <p className="mt-2 text-mute">{fmt(t.events.holdSuccessBody, { n: held.seats, event: event.name })}</p>
        <button type="button" className="mt-4 text-sm text-zellige underline underline-offset-4" onClick={() => setHolds((h) => { const { [event.id]: _removed, ...rest } = h; return rest })}>
          {t.my.cancel}
        </button>
      </div>
    )
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validateContact({ name, email, phone: '', subject: 'x', message: 'xxxxxxxxxx' }, t.errors)
    setErrors({ name: found.name, email: found.email })
    if (found.name || found.email) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 700))
    setHolds((h) => ({ ...h, [event.id]: { seats, name: name.trim() } }))
    setBusy(false)
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-md bg-chalk-100 p-6">
      <h2 className="font-display text-3xl font-light">{t.events.book}</h2>
      <p className="text-sm text-mute">{fmt(t.events.seatsLeft, { n: left })}</p>
      <div>
        <label htmlFor="ev-seats" className="mb-1.5 block text-[15px] font-medium">{t.events.seats}</label>
        <select id="ev-seats" value={seats} onChange={(e) => setSeats(Number(e.target.value))} className="field">
          {Array.from({ length: Math.min(6, left) }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="ev-name" className="mb-1.5 block text-[15px] font-medium">{t.events.yourName}</label>
        <input id="ev-name" value={name} onChange={(e) => setName(e.target.value)} className="field" autoComplete="name" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'ev-name-err' : undefined} />
        {errors.name && <p id="ev-name-err" className="mt-1 text-sm text-ember">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="ev-email" className="mb-1.5 block text-[15px] font-medium">{t.events.yourEmail}</label>
        <input id="ev-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" autoComplete="email" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'ev-email-err' : undefined} />
        {errors.email && <p id="ev-email-err" className="mt-1 text-sm text-ember">{errors.email}</p>}
      </div>
      <Button type="submit" disabled={busy} className="w-full">
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />} {t.events.hold}
      </Button>
      <p className="text-xs text-mute">{t.common.demoDisclaimer} <Link href={href('/contact')} className="underline">{t.nav.contact}</Link></p>
    </form>
  )
}
