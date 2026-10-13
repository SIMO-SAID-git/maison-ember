'use client'

import { useApp } from '@/components/providers/AppProvider'
import { formatDate, fmt } from '@/lib/utils'
import type { Reservation } from '@/types'

export function ReservationDetails({ reservation: r }: { reservation: Reservation }) {
  const { t, locale } = useApp()
  const rows: [string, string][] = [
    [t.confirm.number, r.id],
    [t.confirm.date, formatDate(r.date, locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
    [t.confirm.time, r.time],
    [t.confirm.guests, r.guests === 1 ? t.common.guestOne : fmt(t.common.guestMany, { n: r.guests })],
    [t.confirm.seating, t.reserve.seating[r.seating].name],
    [t.confirm.requests, r.requests.trim() || t.confirm.noRequests],
  ]
  return (
    <dl className="divide-y divide-deep/10">
      {rows.map(([label, value]) => (
        <div key={label} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
          <dt className="text-mute">{label}</dt>
          <dd className="font-medium sm:max-w-[60%] sm:text-end">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
