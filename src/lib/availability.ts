import { reservationRules, seatings } from '@/data/reservations'
import type { SeatingId, Slot } from '@/types'
import { dayOfWeek, toISODate } from '@/lib/utils'

/** Small deterministic hash so the same date always gives the same mock availability. */
export function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const minutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5))

export const LUNCH_SLOTS = ['12:30', '13:00', '13:30', '14:00']
export const SUNDAY_SLOTS = ['12:30', '13:00', '13:30', '14:00', '14:30']
export const DINNER_SLOTS = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']
export const ALL_SLOT_TIMES = [...LUNCH_SLOTS, ...DINNER_SLOTS, '21:30']

export function slotTimesFor(iso: string): string[] {
  const dow = dayOfWeek(iso)
  if (dow === 1) return [] // closed on Mondays
  if (dow === 0) return SUNDAY_SLOTS
  const dinner = dow === 5 || dow === 6 ? [...DINNER_SLOTS, '21:30'] : DINNER_SLOTS
  return [...LUNCH_SLOTS, ...dinner]
}

export const isClosedDate = (iso: string) => dayOfWeek(iso) === 1

export function getSlots(iso: string, guests: number, now: Date = new Date()): Slot[] {
  const times = slotTimesFor(iso)
  if (reservationRules.fullyBookedDates.includes(iso)) return times.map((time) => ({ time, available: false }))

  const dow = dayOfWeek(iso)
  const isToday = iso === toISODate(now)
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  return times.map((time) => {
    const busyEvening = (dow === 5 || dow === 6) && time >= '19:00' ? 18 : 0
    const threshold = 22 + Math.min(guests, 8) * 2 + busyEvening
    let available = hash(`${iso}|${time}`) % 100 >= threshold
    if (isToday && minutes(time) <= nowMinutes + 60) available = false
    return { time, available }
  })
}

const SEATING_BUSY: Record<SeatingId, number> = { main: 0, terrace: 20, private: 30, bar: 10 }

export function seatingAvailable(iso: string, time: string, id: SeatingId, guests: number): boolean {
  const rule = seatings.find((s) => s.id === id)
  if (!rule || guests < rule.minGuests || guests > rule.maxGuests) return false
  return hash(`${iso}|${time}|${id}`) % 100 >= SEATING_BUSY[id]
}
