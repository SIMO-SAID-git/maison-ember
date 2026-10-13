import type { OccasionId, SeatingId } from '@/types'

export const seatings: { id: SeatingId; minGuests: number; maxGuests: number }[] = [
  { id: 'main', minGuests: 1, maxGuests: 8 },
  { id: 'terrace', minGuests: 1, maxGuests: 6 },
  { id: 'private', minGuests: 6, maxGuests: 14 },
  { id: 'bar', minGuests: 1, maxGuests: 4 },
]

export const occasions: OccasionId[] = ['birthday', 'anniversary', 'business', 'date', 'other']

export const reservationRules = {
  maxGuests: 14,
  bookAheadDays: 120,
  maxRequestLength: 300,
  /** Dates with no availability, to demonstrate the "fully booked" state. */
  fullyBookedDates: ['2026-10-24'],
}
