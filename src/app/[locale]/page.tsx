import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { Experience, FeaturedDishes, Intro, Location, MenuHighlights, ReserveBand, SocialGrid, Testimonials, UpcomingEvents } from '@/components/home/HomeSections'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { buildMetadata, descriptions } from '@/lib/seo'
import { resolveLocale, type LocaleParams } from '@/lib/page'

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return buildMetadata({ locale, path: '/', title: { absolute: t.meta.siteTitle }, description: descriptions.home })
}

export default async function HomePage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params)
  return (
    <>
      <Hero />
      <FeaturedDishes locale={locale} t={t} />
      <Intro locale={locale} t={t} />
      <Experience locale={locale} t={t} />
      <MenuHighlights locale={locale} t={t} />
      <ReserveBand locale={locale} t={t} />
      <Testimonials locale={locale} t={t} />
      <UpcomingEvents locale={locale} t={t} />
      <SocialGrid locale={locale} t={t} />
      <Location locale={locale} t={t} />
    </>
  )
}
