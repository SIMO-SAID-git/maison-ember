/**
 * MOCK RESERVATION SERVICE: the integration point for a real booking backend.
 *
 * Every function is async and has the signature a real API client would have.
 * To go live, replace the bodies with `fetch('/api/...')` calls (or a booking
 * provider SDK). UI components never touch storage directly: persistence for
 * the demo lives in AppProvider (localStorage).
 */
import { getSlots } from '@/lib/availability'
import type { Reservation, ReservationInput, Slot } from '@/types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Any booking made with this email demonstrates the "failed submission" state. */
export const MOCK_FAILURE_EMAIL = 'fail@demo.test'

function newReservationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return `ME-${out}`
}

export async function fetchAvailability(date: string, guests: number): Promise<Slot[]> {
  await wait(450)
  return getSlots(date, guests)
}

export async function createReservation(input: ReservationInput): Promise<Reservation> {
  await wait(900)
  if (input.email.trim().toLowerCase() === MOCK_FAILURE_EMAIL) throw new Error('MOCK_BOOKING_FAILURE')
  return { ...input, id: newReservationId(), status: 'confirmed', createdAt: new Date().toISOString(), demo: true }
}

export async function updateReservation(existing: Reservation, input: ReservationInput): Promise<Reservation> {
  await wait(700)
  if (input.email.trim().toLowerCase() === MOCK_FAILURE_EMAIL) throw new Error('MOCK_BOOKING_FAILURE')
  return { ...existing, ...input }
}

export async function cancelReservation(existing: Reservation): Promise<Reservation> {
  await wait(600)
  return { ...existing, status: 'cancelled' }
}
