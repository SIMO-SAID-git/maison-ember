import type { Dictionary } from '@/lib/i18n/dictionaries'
import { reservationRules } from '@/data/reservations'
import { fmt } from '@/lib/utils'

type Messages = Dictionary['errors']
export type FieldErrors<K extends string> = Partial<Record<K, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9\s().-]{7,20}$/
const NAME = /^[\p{L}\p{M}'\u2019 .-]{1,60}$/u

export function validateGuest(
  v: { firstName: string; lastName: string; email: string; phone: string; requests: string },
  m: Messages,
): FieldErrors<'firstName' | 'lastName' | 'email' | 'phone' | 'requests'> {
  const e: FieldErrors<'firstName' | 'lastName' | 'email' | 'phone' | 'requests'> = {}
  if (!v.firstName.trim()) e.firstName = m.required
  else if (!NAME.test(v.firstName.trim())) e.firstName = m.required
  if (!v.lastName.trim()) e.lastName = m.required
  else if (!NAME.test(v.lastName.trim())) e.lastName = m.required
  if (!v.email.trim()) e.email = m.required
  else if (!EMAIL.test(v.email.trim())) e.email = m.email
  if (!v.phone.trim()) e.phone = m.required
  else if (!PHONE.test(v.phone.trim())) e.phone = m.phone
  if (v.requests.length > reservationRules.maxRequestLength) {
    e.requests = fmt(m.tooLong, { n: reservationRules.maxRequestLength })
  }
  return e
}

export function validateContact(
  v: { name: string; email: string; phone: string; subject: string; message: string },
  m: Messages,
): FieldErrors<'name' | 'email' | 'phone' | 'subject' | 'message'> {
  const e: FieldErrors<'name' | 'email' | 'phone' | 'subject' | 'message'> = {}
  if (!v.name.trim()) e.name = m.required
  if (!v.email.trim()) e.email = m.required
  else if (!EMAIL.test(v.email.trim())) e.email = m.email
  if (v.phone.trim() && !PHONE.test(v.phone.trim())) e.phone = m.phone
  if (!v.subject.trim()) e.subject = m.required
  if (!v.message.trim()) e.message = m.required
  else if (v.message.trim().length < 10) e.message = m.tooShort
  else if (v.message.length > 1500) e.message = fmt(m.tooLong, { n: 1500 })
  return e
}
