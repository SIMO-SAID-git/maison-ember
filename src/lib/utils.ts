import type { Locale } from '@/lib/i18n/config'

export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ')

export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''))
}

const intlLocale = (l: Locale) => (l === 'ar' ? 'ar-MA-u-nu-latn' : l === 'fr' ? 'fr-FR' : 'en-GB')

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Formats a yyyy-mm-dd string without timezone drift. */
export function formatDate(
  iso: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' },
): string {
  return new Intl.DateTimeFormat(intlLocale(locale), { ...options, timeZone: 'UTC' }).format(
    new Date(`${iso}T12:00:00Z`),
  )
}

export function weekdayName(day: number, locale: Locale, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat(intlLocale(locale), { weekday: style, timeZone: 'UTC' }).format(
    new Date(Date.UTC(2024, 0, 7 + day)), // 2024-01-07 was a Sunday
  )
}

export function monthLabel(year: number, month: number, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month, 1)))
}

export const toISODate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const dayOfWeek = (iso: string): number => new Date(`${iso}T12:00:00Z`).getUTCDay()

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export const normalize = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
