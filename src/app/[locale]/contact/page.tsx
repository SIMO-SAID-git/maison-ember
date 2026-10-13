import Link from 'next/link'
import { ContactForm } from '@/components/forms/ContactForm'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { MapVisual } from '@/components/ui/MapVisual'
import { PageHero } from '@/components/ui/PageHero'
import { faq } from '@/data/faq'
import { directions, hours, mapsUrl, restaurant } from '@/data/restaurant'
import { localizedPath } from '@/lib/i18n/config'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'
import { weekdayName } from '@/lib/utils'

export const generateMetadata = pageMetadata('/contact', 'contact', 'contact')

export default async function ContactPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.contact.title} intro={t.contact.intro} />
      <div className="container-x grid gap-14 py-14 lg:grid-cols-12 lg:py-20">
        <div className="space-y-10 lg:col-span-5">
          <address className="space-y-2 text-lg not-italic">
            <p className="font-display text-2xl">{restaurant.name}</p>
            <p>{restaurant.address.street}, {restaurant.address.district}</p>
            <p>{restaurant.address.postalCode} {restaurant.address.city}, {restaurant.address.country}</p>
            <p className="pt-2"><a href={restaurant.phoneHref} className="underline underline-offset-4">{restaurant.phone}</a></p>
            <p><a href={`mailto:${restaurant.email}`} className="break-all underline underline-offset-4">{restaurant.email}</a></p>
          </address>
          <div>
            <h2 className="font-display text-2xl">{t.common.hours}</h2>
            <dl className="mt-3 divide-y divide-deep/10 text-[15px]">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6 py-2">
                  <dt>{weekdayName(h.day, locale)}</dt>
                  <dd className="text-mute">{h.ranges.length === 0 ? t.common.closedDay : h.ranges.map(([a, b]) => `${a}\u2013${b}`).join(', ')}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-display text-2xl">{t.contact.directionsTitle}</h2>
            <dl className="mt-3 space-y-3 text-[15px]">
              {directions.map((d) => (
                <div key={d.mode}><dt className="font-medium">{d.mode}</dt><dd className="text-mute">{d.text}</dd></div>
              ))}
            </dl>
            <ButtonLink href={mapsUrl} external variant="outline" className="mt-5">{t.common.directions}</ButtonLink>
          </div>
          <div>
            <h2 className="font-display text-2xl">{t.contact.social}</h2>
            <ul className="mt-3 space-y-1 text-[15px]">
              {restaurant.social.map((s) => (
                <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{s.label}</a> <span className="text-mute">{s.handle}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-light">{t.contact.formTitle}</h2>
          <div className="mt-6"><ContactForm /></div>
          <div className="mt-14">
            <MapVisual label={`${restaurant.name}, ${restaurant.address.street}, ${restaurant.address.city}`} caption={`${restaurant.address.street}, ${restaurant.address.district}`} />
          </div>
        </div>
      </div>
      <section className="bg-chalk-200 py-16 sm:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="font-display text-4xl font-light">{t.contact.faqTitle}</h2>
          <div className="mt-8"><Accordion items={faq.slice(0, 5)} /></div>
          <Link href={localizedPath(locale, '/faq')} className="mt-8 inline-block text-zellige underline underline-offset-4">{t.contact.faqMore}</Link>
        </div>
      </section>
    </>
  )
}
