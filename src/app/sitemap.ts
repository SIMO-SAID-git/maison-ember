import type { MetadataRoute } from 'next'
import { locales, localizedPath } from '@/lib/i18n/config'
import { menuItems } from '@/data/menu'
import { events } from '@/data/events'
import { siteUrl } from '@/lib/site'

const staticPaths = ['/', '/menu', '/about', '/reservations', '/events', '/offers', '/gallery', '/reviews', '/contact', '/faq']

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...menuItems.map((m) => `/menu/${m.slug}`), ...events.map((e) => `/events/${e.slug}`)]
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}${localizedPath(locale, path)}`,
      changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : path === '/reservations' || path === '/menu' ? 0.9 : 0.6,
    })),
  )
}
