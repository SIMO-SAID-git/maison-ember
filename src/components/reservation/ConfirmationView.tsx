'use client'

import { CalendarPlus, CalendarX, Check } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { ReservationDetails } from '@/components/reservation/ReservationDetails'
import { restaurant } from '@/data/restaurant'
import type { Reservation } from '@/types'

function downloadIcs(r: Reservation) {
  const [h, m] = r.time.split(':').map(Number)
  const end = h * 60 + m + 120
  const d = r.date.replace(/-/g, '')
  const pad = (n: number) => String(n).padStart(2, '0')
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Maison Ember//Demo//EN', 'BEGIN:VEVENT',
    `UID:${r.id}@maisonember.example`, `DTSTAMP:${stamp}`,
    `DTSTART:${d}T${pad(h)}${pad(m)}00`, `DTEND:${d}T${pad(Math.floor(end / 60) % 24)}${pad(end % 60)}00`,
    'SUMMARY:Table at Maison Ember (demo reservation)',
    `LOCATION:${restaurant.address.street}\\, ${restaurant.address.city}`,
    'END:VEVENT', 'END:VCALENDAR',
  ]
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `maison-ember-${r.id}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export function ConfirmationView({ updated }: { updated: boolean }) {
  const { t, href, reservation, hydrated } = useApp()
  if (!hydrated) {
    return <div className="container-x py-14"><Skeleton className="h-96 max-w-2xl" /></div>
  }
  if (!reservation || reservation.status !== 'confirmed') {
    return (
      <div className="container-x py-14">
        <EmptyState icon={<CalendarX className="h-10 w-10" />} title={t.confirm.emptyTitle}>
          <p>{t.confirm.emptyBody}</p>
          <ButtonLink href={href('/reservations')} className="mt-6">{t.common.reserveTable}</ButtonLink>
        </EmptyState>
      </div>
    )
  }
  return (
    <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:py-16">
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zellige text-chalk"><Check className="h-5 w-5" aria-hidden /></span>
          <Badge tone="accent">{t.common.demo}</Badge>
        </div>
        <h2 className="mt-5 font-display text-4xl font-light leading-tight sm:text-5xl">{updated ? t.confirm.updated : t.confirm.title}</h2>
        <p className="mt-4 max-w-xl text-mute">{t.confirm.note}</p>
        <div className="mt-8 rounded-md bg-chalk-100 p-6 sm:p-8">
          <ReservationDetails reservation={reservation} />
          <p className="mt-4 text-sm text-mute">{t.confirm.status}: <strong className="text-deep">{t.confirm.confirmedDemo}</strong></p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="dark" onClick={() => downloadIcs(reservation)}><CalendarPlus className="h-4 w-4" aria-hidden /> {t.confirm.addCalendar}</Button>
          <ButtonLink href={href('/reservation')} variant="outline">{t.confirm.manage}</ButtonLink>
        </div>
      </div>
      <aside className="lg:col-span-5">
        <div className="dark-surface rounded-md bg-deep p-7 text-chalk">
          <h3 className="font-display text-3xl font-light">{t.confirm.where}</h3>
          <address className="mt-4 space-y-1 not-italic text-chalk/80">
            <p className="font-medium text-chalk">{restaurant.name}</p>
            <p>{restaurant.address.street}, {restaurant.address.district}</p>
            <p>{restaurant.address.postalCode} {restaurant.address.city}</p>
            <p className="pt-2"><a href={restaurant.phoneHref} className="underline underline-offset-4">{restaurant.phone}</a></p>
          </address>
          <p className="mt-6 rounded-[3px] bg-chalk/10 p-3 text-sm">{t.common.demoDisclaimer}</p>
        </div>
      </aside>
    </div>
  )
}
