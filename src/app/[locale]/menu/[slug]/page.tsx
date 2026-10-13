import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DishDetail } from '@/components/menu/DishDetail'
import { PageHero } from '@/components/ui/PageHero'
import { getDish, menuItems } from '@/data/menu'
import { isLocale, locales, localizedPath } from '@/lib/i18n/config'
import { buildMetadata } from '@/lib/seo'
import { resolveLocale } from '@/lib/page'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => menuItems.map((m) => ({ locale, slug: m.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const dish = getDish(slug)
  if (!isLocale(locale) || !dish) return {}
  return buildMetadata({ locale, path: `/menu/${slug}`, title: dish.name, description: `${dish.description} Served at Maison Ember, Rabat.` })
}

export default async function DishPage({ params }: Props) {
  const { slug } = await params
  const { locale, t } = await resolveLocale(params)
  const dish = getDish(slug)
  if (!dish) notFound()
  return (
    <>
      <PageHero title={dish.name} intro={dish.description} />
      <div className="container-x py-10 sm:py-14">
        <Link href={localizedPath(locale, '/menu')} className="mb-8 inline-block text-zellige underline underline-offset-4">{t.common.backToMenu}</Link>
        <div className="overflow-hidden rounded-md bg-chalk-100">
          <DishDetail item={dish} hideTitle />
        </div>
      </div>
    </>
  )
}
