import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Photo } from '@/components/ui/Photo'
import { offers } from '@/data/offers'
import { localizedPath } from '@/lib/i18n/config'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'
import { fmt, formatDate } from '@/lib/utils'

export const generateMetadata = pageMetadata('/offers', 'offers', 'offers')

export default async function OffersPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.offers.title} intro={t.offers.intro} />
      <div className="container-x divide-y divide-deep/15 py-6">
        {offers.map((o, i) => (
          <article key={o.id} className="grid items-center gap-8 py-14 lg:grid-cols-12 lg:gap-14">
            <Photo src={o.image} alt={o.imageAlt} className={`aspect-[4/3] rounded-[3px] lg:col-span-5 ${i % 2 ? 'lg:order-2' : ''}`} sizes="(min-width:1024px) 40vw, 100vw" />
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl font-light">{o.name}</h2>
              <p className="mt-2 font-display text-2xl text-zellige">{o.priceNote}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-mute">{o.summary}</p>
              <p className="mt-4 text-sm text-mute">
                {fmt(t.offers.valid, { from: formatDate(o.validFrom, locale, { day: 'numeric', month: 'long', year: 'numeric' }), to: formatDate(o.validTo, locale, { day: 'numeric', month: 'long', year: 'numeric' }) })}
              </p>
              <details className="mt-4 max-w-xl">
                <summary className="cursor-pointer py-2 text-[15px] font-medium text-zellige">{t.offers.terms}</summary>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-[15px] text-mute">{o.terms.map((term) => <li key={term}>{term}</li>)}</ul>
              </details>
              <ButtonLink href={`${localizedPath(locale, '/reservations')}?offer=${o.id}`} className="mt-6">{t.offers.claim}</ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
