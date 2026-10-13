export const locales = ['en', 'fr', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
}
export const localeShort: Record<Locale, string> = { en: 'EN', fr: 'FR', ar: 'ع' }

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
export const dirOf = (locale: Locale): 'ltr' | 'rtl' => (locale === 'ar' ? 'rtl' : 'ltr')

export function localizedPath(locale: Locale, path: string): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
