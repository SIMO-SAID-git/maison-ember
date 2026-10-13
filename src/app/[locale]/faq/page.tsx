import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'
import { PageHero } from '@/components/ui/PageHero'
import { faq } from '@/data/faq'
import { localizedPath } from '@/lib/i18n/config'
import { pageMetadata, resolveLocale, type LocaleParams } from '@/lib/page'
import type { FaqItem } from '@/types'

export const generateMetadata = pageMetadata('/faq', 'faq', 'faq')
const GROUPS: FaqItem['category'][] = ['reservations', 'visiting', 'dining']

export default async function FaqPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params)
  return (
    <>
      <PageHero title={t.faq.title} intro={t.faq.intro} />
      <div className="container-x max-w-4xl space-y-14 py-14 sm:py-20">
        {GROUPS.map((g) => (
          <section key={g} aria-labelledby={`faq-${g}`}>
            <h2 id={`faq-${g}`} className="mb-4 font-display text-4xl font-light">{t.faq.categories[g]}</h2>
            <Accordion items={faq.filter((f) => f.category === g)} />
          </section>
        ))}
        <p className="text-mute">
          {t.faq.still}{' '}
          <Link href={localizedPath(locale, '/contact')} className="text-zellige underline underline-offset-4">{t.nav.contact}</Link>
        </p>
      </div>
    </>
  )
}
