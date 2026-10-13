import { hours, restaurant } from '@/data/restaurant'

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const DAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; nextDay: number; nextTime: string; today: boolean }

/** Computes open/closed in the restaurant's own timezone, wherever the visitor is. */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: restaurant.timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0'
  const day = DAYS[get('weekday')] ?? 0
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))

  const today = hours.find((h) => h.day === day)
  const current = today?.ranges.find(([open, close]) => toMinutes(open) <= minutes && minutes < toMinutes(close))
  if (current) return { open: true, closesAt: current[1] }

  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7
    const ranges = hours.find((h) => h.day === d)?.ranges ?? []
    const next = ranges.find(([open]) => offset > 0 || toMinutes(open) > minutes)
    if (next) return { open: false, nextDay: d, nextTime: next[0], today: offset === 0 }
  }
  return { open: false, nextDay: 2, nextTime: '12:30', today: false }
}
