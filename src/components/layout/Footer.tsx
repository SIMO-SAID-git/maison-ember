import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { hours, restaurant } from '@/data/restaurant'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { localizedPath, type Locale } from '@/lib/i18n/config'
import { fmt, weekdayName } from '@/lib/utils'

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const p = (path: string) => localizedPath(locale, path)
  const links = [
    ['/menu', t.nav.menu], ['/reservations', t.nav.reserve], ['/reservation', t.nav.myReservation], ['/events', t.nav.events],
    ['/offers', t.nav.offers], ['/about', t.nav.about], ['/gallery', t.nav.gallery], ['/reviews', t.nav.reviews],
    ['/faq', t.nav.faq], ['/contact', t.nav.contact],
  ] as const
  return (
    <footer className="dark-surface bg-deep text-chalk">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo href={p('/')} />
          <p className="mt-5 max-w-xs text-chalk/70">{t.footer.blurb}</p>
          <ul className="mt-6 flex gap-5 text-sm">
            {restaurant.social.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-chalk/80 underline-offset-4 hover:text-chalk hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.footer.explore} className="md:col-span-3">
          <h2 className="font-display text-xl">{t.footer.explore}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] md:grid-cols-1">
            {links.map(([path, label]) => (
              <li key={path}>
                <Link href={p(path)} className="text-chalk/75 hover:text-chalk">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="font-display text-xl">{t.footer.visit}</h2>
          <address className="mt-4 space-y-1 text-[15px] not-italic text-chalk/75">
            <p>{restaurant.address.street}</p>
            <p>{restaurant.address.district}, {restaurant.address.city}</p>
            <p className="pt-2"><a href={restaurant.phoneHref} className="hover:text-chalk">{restaurant.phone}</a></p>
            <p><a href={`mailto:${restaurant.email}`} className="break-all hover:text-chalk">{restaurant.email}</a></p>
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-display text-xl">{t.footer.hoursTitle}</h2>
          <dl className="mt-4 space-y-1.5 text-[15px] text-chalk/75">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt>{weekdayName(h.day, locale, 'short')}</dt>
                <dd className="text-end">
                  {h.ranges.length === 0 ? t.common.closedDay : h.ranges.map(([a, b]) => `${a}\u2013${b}`).join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-chalk/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-chalk/60 sm:flex-row sm:justify-between">
          <p>{fmt(t.footer.rights, { year: new Date().getFullYear() })}</p>
          <p>{t.footer.demo}</p>
        </div>
      </div>
    </footer>
  )
}
