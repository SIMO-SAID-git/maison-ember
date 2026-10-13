'use client'

import { useEffect, useState } from 'react'
import { useApp } from '@/components/providers/AppProvider'
import { getOpenStatus, type OpenStatus } from '@/lib/hours'
import { cn, fmt, weekdayName } from '@/lib/utils'

/** Rendered after mount so server and client markup match. */
export function OpeningStatus({ className }: { className?: string }) {
  const { t, locale } = useApp()
  const [status, setStatus] = useState<OpenStatus | null>(null)

  useEffect(() => {
    setStatus(getOpenStatus())
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!status) return <span className={cn('inline-block h-5 w-44', className)} aria-hidden />

  const text = status.open
    ? `${t.status.open}, ${fmt(t.status.closesAt, { time: status.closesAt })}`
    : status.today
      ? fmt(t.status.opensToday, { time: status.nextTime })
      : fmt(t.status.opensDay, { day: weekdayName(status.nextDay, locale), time: status.nextTime })

  return (
    <span className={cn('inline-flex items-center gap-2 text-sm', className)} role="status">
      <span aria-hidden className={cn('h-2 w-2 rounded-full', status.open ? 'bg-[#6FCF97]' : 'bg-chalk/40')} />
      {text}
    </span>
  )
}
