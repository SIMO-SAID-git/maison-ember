'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Menu, Phone, X } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { locales, localeNames, localeShort, type Locale } from '@/lib/i18n/config'
import { restaurant } from '@/data/restaurant'
import { cn } from '@/lib/utils'

const NAV = [
  ['/', 'home'],
  ['/menu', 'menu'],
  ['/about', 'about'],
  ['/events', 'events'],
  ['/gallery', 'gallery'],
  ['/reviews', 'reviews'],
  ['/contact', 'contact'],
] as const

function LangSwitch({ className }: { className?: string }) {
  const { locale, t } = useApp()
  const pathname = usePathname()
  const switchTo = (l: Locale) => pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, `/${l}`)
  return (
    <ul className={cn('items-center gap-1', className)} aria-label={t.nav.language}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={switchTo(l)}
            hrefLang={l}
            lang={l}
            aria-label={localeNames[l]}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'inline-flex h-9 min-w-9 items-center justify-center rounded-[3px] px-2 text-sm transition-colors',
              l === locale ? 'bg-chalk/15 text-chalk' : 'text-chalk/70 hover:text-chalk',
            )}
          >
            {localeShort[l]}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function Header() {
  const { t, href, favorites, hydrated } = useApp()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    const full = href(path)
    return path === '/' ? pathname === full : pathname === full || pathname.startsWith(`${full}/`)
  }
  const favCount = hydrated ? favorites.length : 0

  return (
    <header
      className={cn(
        'dark-surface fixed inset-x-0 top-0 z-50 text-chalk transition-colors duration-300',
        scrolled ? 'bg-deep shadow-[0_1px_0_rgba(236,234,225,0.12)]' : 'bg-transparent',
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-3 sm:h-20">
        <Logo href={href('/')} />

        <nav aria-label={t.nav.main} className="hidden items-center gap-8 xl:flex">
          {NAV.map(([path, key]) => (
            <Link
              key={path}
              href={href(path)}
              aria-current={isActive(path) ? 'page' : undefined}
              className={cn(
                'border-b-2 py-1 text-[15px] transition-colors',
                isActive(path) ? 'border-saffron text-chalk' : 'border-transparent text-chalk/75 hover:text-chalk',
              )}
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch className="hidden xl:flex" />
          <Link
            href={href('/favorites')}
            aria-label={`${t.nav.favorites}${favCount ? ` (${favCount})` : ''}`}
            className="relative hidden h-11 w-11 items-center justify-center rounded-full text-chalk/80 transition-colors hover:text-chalk sm:inline-flex"
          >
            <Heart className="h-5 w-5" aria-hidden />
            {favCount > 0 && (
              <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-semibold text-deep">
                {favCount}
              </span>
            )}
          </Link>
          <ButtonLink href={href('/reservations')} className="px-4 py-3 sm:px-5">
            <span className="sm:hidden">{t.nav.reserveShort}</span>
            <span className="hidden sm:inline">{t.nav.reserve}</span>
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.nav.openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-chalk xl:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} label={t.nav.main} variant="full" showClose={false}>
        <div className="container-x flex min-h-full flex-col pb-10">
          <div className="flex h-[72px] items-center justify-between sm:h-20">
            <Logo href={href('/')} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>
          <nav aria-label={t.nav.main} className="mt-6 flex-1">
            <ul className="space-y-1">
              {[...NAV, ['/offers', 'offers'] as const, ['/favorites', 'favorites'] as const].map(([path, key]) => (
                <li key={path}>
                  <Link
                    href={href(path)}
                    aria-current={isActive(path) ? 'page' : undefined}
                    className={cn(
                      'block py-2.5 font-display text-4xl font-light leading-tight sm:text-5xl',
                      isActive(path) ? 'text-saffron' : 'text-chalk',
                    )}
                  >
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 space-y-5 border-t border-chalk/15 pt-6">
            <ButtonLink href={href('/reservations')} className="w-full">
              {t.nav.reserve}
            </ButtonLink>
            <a href={restaurant.phoneHref} className="flex items-center gap-3 text-chalk/85">
              <Phone className="h-4 w-4" aria-hidden /> {restaurant.phone}
            </a>
            <LangSwitch className="flex" />
          </div>
        </div>
      </Dialog>
    </header>
  )
}
