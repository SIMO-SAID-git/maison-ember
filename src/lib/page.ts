import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary, type Dictionary } from '@/lib/i18n/dictionaries'
import { buildMetadata, descriptions } from '@/lib/seo'

export type LocaleParams = { params: Promise<{ locale: string }> }

/** Validates the locale segment and returns the matching dictionary. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<{ locale: Locale; t: Dictionary }> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return { locale, t: getDictionary(locale) }
}

/** Builds a generateMetadata function for a static page. */
export function pageMetadata(path: string, description: keyof typeof descriptions, titleKey: keyof Dictionary['nav'], noindex = false) {
  return async ({ params }: LocaleParams): Promise<Metadata> => {
    const { locale } = await params
    if (!isLocale(locale)) return {}
    const t = getDictionary(locale)
    return buildMetadata({ locale, path, title: t.nav[titleKey], description: descriptions[description], noindex })
  }
}
