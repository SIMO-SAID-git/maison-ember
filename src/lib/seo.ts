import type { Metadata } from 'next'
import { locales, localizedPath, type Locale } from '@/lib/i18n/config'
import { restaurant, hours } from '@/data/restaurant'
import { ratingStats, reviews } from '@/data/reviews'
import { siteUrl } from '@/lib/site'

export const descriptions = {
  home: 'Wood-fired Mediterranean cooking in Agdal, Rabat. Reserve a table, explore the seasonal menu and book tasting events at Maison Ember.',
  menu: 'Browse the Maison Ember menu: starters, seafood, meat, vegetarian dishes, desserts and a small wine list. Filter by dietary needs and see allergens.',
  about: 'The story of Maison Ember: a wood-fired kitchen in Rabat, the team behind it, where the food comes from and how it is cooked.',
  reservations: 'Reserve a table at Maison Ember in Rabat. Choose your date, party size, time and seating in a few steps.',
  reservation: 'View, change or cancel your demonstration reservation at Maison Ember.',
  confirmation: 'Your Maison Ember reservation confirmation.',
  events: 'Wine tastings, chef\u2019s counters and seasonal dinners at Maison Ember. See dates, prices and available seats.',
  offers: 'Weekday lunch, seasonal tasting menu, anniversary and early dinner offers at Maison Ember, Rabat.',
  gallery: 'Photographs of dishes, the dining room, the kitchen and events at Maison Ember.',
  reviews: 'Read guest reviews of Maison Ember with ratings, filters and sorting.',
  contact: 'Contact Maison Ember: address, opening hours, phone, email and a message form. Find directions and answers to common questions.',
  faq: 'Answers to common questions about booking, cancellations, dress code, children, allergies, parking and payment at Maison Ember.',
  favorites: 'Your saved dishes from the Maison Ember menu.',
} as const

const ogLocale: Record<Locale, string> = { en: 'en_GB', fr: 'fr_FR', ar: 'ar_MA' }

export function buildMetadata(opts: {
  locale: Locale
  path: string
  title: Metadata['title']
  description: string
  noindex?: boolean
}): Metadata {
  const url = `${siteUrl}${localizedPath(opts.locale, opts.path)}`
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localizedPath(l, opts.path)}`]))
  const plainTitle = typeof opts.title === 'string' ? opts.title : undefined
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url, languages },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: plainTitle ?? restaurant.name,
      description: opts.description,
      url,
      siteName: restaurant.name,
      locale: ogLocale[opts.locale],
      type: 'website',
    },
  }
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function restaurantJsonLd(locale: Locale) {
  const { average, total } = ratingStats(reviews)
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: descriptions.home,
    url: `${siteUrl}${localizedPath(locale, '/')}`,
    telephone: restaurant.phone,
    email: restaurant.email,
    priceRange: restaurant.priceRange,
    servesCuisine: restaurant.cuisine,
    hasMenu: `${siteUrl}${localizedPath(locale, '/menu')}`,
    acceptsReservations: `${siteUrl}${localizedPath(locale, '/reservations')}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.city,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: restaurant.geo.lat, longitude: restaurant.geo.lng },
    openingHoursSpecification: hours
      .filter((h) => h.ranges.length > 0)
      .flatMap((h) =>
        h.ranges.map(([opens, closes]) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: DAY_NAMES[h.day],
          opens,
          closes,
        })),
      ),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number(average.toFixed(1)),
      reviewCount: total,
      bestRating: 5,
    },
  }
}
