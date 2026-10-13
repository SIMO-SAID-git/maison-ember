import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/en/reservation', '/fr/reservation', '/ar/reservation'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
