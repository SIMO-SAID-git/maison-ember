import Link from 'next/link'
import { EventCard } from '@/components/events/EventCard'
import { PageHero } from '@/components/ui/PageHero'
import { events } from '@/data/events'
import { localizedPath } from '@/lib/i18n/config'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'

export const generateMetadata = pageMetadata('/events', 'events', 'events')

export default async function EventsPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.events.title} intro={t.events.intro} />
      <div className="container-x py-14 sm:py-20">
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => <li key={e.id}><EventCard event={e} locale={locale} t={t} /></li>)}
        </ul>
        <p className="mt-16 text-mute">
          <Link href={localizedPath(locale, '/offers')} className="text-zellige underline underline-offset-4">{t.nav.offers}</Link>
        </p>
      </div>
    </>
  )
}
