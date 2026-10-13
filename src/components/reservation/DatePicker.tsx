'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Skeleton } from '@/components/ui/Skeleton'
import { reservationRules } from '@/data/reservations'
import { isClosedDate } from '@/lib/availability'
import { addDays, cn, formatDate, monthLabel, toISODate, weekdayName } from '@/lib/utils'

const ORDER = [1, 2, 3, 4, 5, 6, 0]

export function DatePicker({ value, onChange }: { value: string | null; onChange: (iso: string) => void }) {
  const { t, locale } = useApp()
  const [today, setToday] = useState<string | null>(null)
  const [cursor, setCursor] = useState<{ y: number; m: number } | null>(null)

  useEffect(() => {
    const iso = toISODate(new Date())
    setToday(iso)
    const base = value ?? iso
    setCursor({ y: Number(base.slice(0, 4)), m: Number(base.slice(5, 7)) - 1 })
    // Runs once on mount: "today" is only known on the client.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!today || !cursor) return <Skeleton className="h-[22rem] w-full max-w-md" />

  const max = addDays(today, reservationRules.bookAheadDays)
  const index = cursor.y * 12 + cursor.m
  const canPrev = index > Number(today.slice(0, 4)) * 12 + Number(today.slice(5, 7)) - 1
  const canNext = index < Number(max.slice(0, 4)) * 12 + Number(max.slice(5, 7)) - 1
  const offset = (new Date(Date.UTC(cursor.y, cursor.m, 1)).getUTCDay() + 6) % 7
  const days = new Date(Date.UTC(cursor.y, cursor.m + 1, 0)).getUTCDate()
  const cells: (string | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: days }, (_, i) => `${cursor.y}-${String(cursor.m + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`),
  ]
  const move = (delta: number) =>
    setCursor((c) => {
      if (!c) return c
      const n = c.y * 12 + c.m + delta
      return { y: Math.floor(n / 12), m: n % 12 }
    })

  return (
    <div className="w-full max-w-md">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} disabled={!canPrev} aria-label={t.reserve.prevMonth} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-deep/10 disabled:opacity-30">
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden />
        </button>
        <p className="font-display text-2xl" aria-live="polite">{monthLabel(cursor.y, cursor.m, locale)}</p>
        <button type="button" onClick={() => move(1)} disabled={!canNext} aria-label={t.reserve.nextMonth} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-deep/10 disabled:opacity-30">
          <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-mute" aria-hidden>
        {ORDER.map((d) => <span key={d} className="py-2">{weekdayName(d, locale, 'short')}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((iso, i) => {
          if (!iso) return <span key={`blank-${i}`} />
          const closed = isClosedDate(iso)
          const disabled = iso < today || iso > max || closed
          const selected = iso === value
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={`${formatDate(iso, locale)}${closed ? ` (${t.reserve.closedLabel})` : ''}`}
              onClick={() => onChange(iso)}
              className={cn(
                'aspect-square rounded-[3px] text-[15px] transition-colors',
                selected ? 'bg-deep text-chalk' : 'hover:bg-deep/10',
                iso === today && !selected && 'ring-1 ring-deep/40',
                disabled && 'cursor-not-allowed text-deep/30 line-through hover:bg-transparent',
              )}
            >
              {Number(iso.slice(8))}
            </button>
          )
        })}
      </div>
    </div>
  )
}
