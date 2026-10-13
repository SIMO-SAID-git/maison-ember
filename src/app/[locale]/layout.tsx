import type { Metadata } from 'next'
import { Hanken_Grotesk, Newsreader, Noto_Naskh_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import '../globals.css'
import { AppProvider } from '@/components/providers/AppProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/ui/JsonLd'
import { dirOf, isLocale, locales } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { restaurantJsonLd } from '@/lib/seo'
import { siteUrl } from '@/lib/site'
import { restaurant } from '@/data/restaurant'

const display = Newsreader({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Hanken_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' })
const arabic = Noto_Naskh_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600', '700'], variable: '--font-arabic', display: 'swap' })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.siteTitle, template: `%s | ${restaurant.name}` },
    description: t.meta.siteDescription,
    applicationName: restaurant.name,
  }
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <body>
        <AppProvider locale={locale} dictionary={t}>
          <a href="#main" className="skip-link">{t.nav.skip}</a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer locale={locale} t={t} />
        </AppProvider>
        <JsonLd data={restaurantJsonLd(locale)} />
      </body>
    </html>
  )
}
