import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EventCard } from '@/components/events/EventCard'
import { EventSeats } from '@/components/events/EventSeats'
import { PageHero } from '@/components/ui/PageHero'
import { Photo } from '@/components/ui/Photo'
import { events } from '@/data/events'
import { isLocale, locales, localizedPath } from '@/lib/i18n/config'
import { buildMetadata } from '@/lib/seo'
import { resolveLocale } from '@/lib/page'
import { formatDate, formatPrice } from '@/lib/utils'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => events.map((e) => ({ locale, slug: e.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const event = events.find((e) => e.slug === slug)
  if (!isLocale(locale) || !event) return {}
  return buildMetadata({ locale, path: `/events/${slug}`, title: event.name, description: event.summary })
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const { locale, t } = await resolveLocale(params)
  const event = events.find((e) => e.slug === slug)
  if (!event) notFound()
  const others = events.filter((e) => e.id !== event.id).slice(0, 3)
  const facts: [string, string][] = [
    [t.home.date, formatDate(event.date, locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
    [t.home.time, `${event.startTime} \u2013 ${event.endTime}`],
    [t.events.location, event.location],
    [t.common.perPerson, formatPrice(event.price, locale)],
  ]
  return (
    <>
      <PageHero title={event.name} intro={event.summary} />
      <div className="container-x grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <Photo src={event.image} alt={event.imageAlt} className="aspect-[16/10] rounded-[3px]" priority sizes="(min-width:1024px) 55vw, 100vw" />
          <h2 className="mt-10 font-display text-3xl font-light">{t.events.details}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{event.description}</p>
          <h2 className="mt-10 font-display text-3xl font-light">{t.events.highlights}</h2>
          <ul className="mt-4 space-y-2 text-mute">
            {event.highlights.map((h) => <li key={h} className="border-s-2 border-saffron ps-4">{h}</li>)}
          </ul>
        </div>
        <aside className="space-y-8 lg:col-span-5">
          <dl className="divide-y divide-deep/10 rounded-md bg-chalk-100 px-6">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-4"><dt className="text-mute">{label}</dt><dd className="text-end font-medium">{value}</dd></div>
            ))}
          </dl>
          <EventSeats event={event} />
        </aside>
      </div>
      <section className="bg-chalk-200 py-16">
        <div className="container-x">
          <h2 className="font-display text-3xl font-light">{t.events.otherEvents}</h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((e) => <li key={e.id}><EventCard event={e} locale={locale} t={t} /></li>)}
          </ul>
          <Link href={localizedPath(locale, '/events')} className="mt-8 inline-block text-zellige underline underline-offset-4">{t.common.viewAll}</Link>
        </div>
      </section>
    </>
  )
}
