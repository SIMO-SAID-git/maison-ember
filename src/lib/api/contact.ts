/** MOCK CONTACT SERVICE: replace with a POST to your email/CRM endpoint. */
import { MOCK_FAILURE_EMAIL } from '@/lib/api/reservations'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface ContactMessage {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export async function sendContactMessage(message: ContactMessage): Promise<{ ok: true }> {
  await wait(900)
  if (message.email.trim().toLowerCase() === MOCK_FAILURE_EMAIL) throw new Error('MOCK_CONTACT_FAILURE')
  return { ok: true }
}
