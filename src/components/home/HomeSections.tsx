import Link from 'next/link'
import { Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Badge, DietaryBadges } from '@/components/ui/Badge'
import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stars } from '@/components/ui/Stars'
import { MapVisual } from '@/components/ui/MapVisual'
import { FavoriteButton } from '@/components/menu/FavoriteButton'
import { EventCard } from '@/components/events/EventCard'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { OpeningStatus } from '@/components/layout/OpeningStatus'
import { QuickReserve } from '@/components/reservation/QuickReserve'
import { events } from '@/data/events'
import { gallery } from '@/data/gallery'
import { featuredDishSlugs, getDish, highlightSlugs } from '@/data/menu'
import { experiences, hours, mapsUrl, restaurant, story } from '@/data/restaurant'
import { ratingStats, reviews } from '@/data/reviews'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { localizedPath, type Locale } from '@/lib/i18n/config'
import { cn, fmt, formatPrice, weekdayName } from '@/lib/utils'
import type { MenuItem } from '@/types'

interface P { locale: Locale; t: Dictionary }
const pick = (slugs: string[]) => slugs.map(getDish).filter((d): d is MenuItem => !!d)

export function FeaturedDishes({ locale, t }: P) {
  const dishes = pick(featuredDishSlugs)
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <Reveal><SectionHeading title={t.home.signatureTitle} /></Reveal>
        <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          {dishes.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08} className={cn(i === 0 ? 'lg:col-span-6 lg:row-span-2' : 'lg:col-span-6')}>
              <article className="group relative">
                <Photo src={d.image} alt={d.imageAlt} zoom sizes="(min-width:1024px) 50vw, 100vw" className={cn('rounded-[3px]', i === 0 ? 'aspect-[4/3] lg:aspect-[4/5]' : 'aspect-[16/9]')} />
                <FavoriteButton id={d.id} name={d.name} className="absolute end-3 top-3 z-10" />
                <div className="mt-5 flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-3xl leading-tight sm:text-4xl">
                    <Link href={localizedPath(locale, `/menu/${d.slug}`)} className="after:absolute after:inset-0 after:z-0">{d.name}</Link>
                  </h3>
                  <p className="whitespace-nowrap font-display text-2xl text-zellige">{formatPrice(d.price, locale)}</p>
                </div>
                <p className="mt-2 max-w-lg leading-relaxed text-mute">{d.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {d.chefsChoice && <Badge tone="accent">{t.dietary.chef}</Badge>}
                  <DietaryBadges tags={d.dietary} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Intro({ locale, t }: P) {
  return (
    <section className="bg-chalk-200 py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <Photo src="/images/story.svg" alt="The hearth at Maison Ember in the hour before service" className="aspect-[5/4] rounded-[3px]" sizes="(min-width:1024px) 50vw, 100vw" />
            <Photo src="/images/team/mehdi-lahlou.svg" alt="Chef Mehdi Lahlou" className="absolute -bottom-8 end-4 aspect-[3/4] w-28 rounded-[3px] border-4 border-chalk-200 sm:w-40" sizes="160px" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:ps-8">
          <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] sm:text-5xl">{t.home.introTitle}</h2>
          {story.paragraphs.map((p) => <p key={p.slice(0, 16)} className="mt-5 max-w-xl text-lg leading-relaxed text-mute">{p}</p>)}
          <p className="mt-6 font-display text-xl">Mehdi Lahlou, Executive Chef</p>
          <ButtonLink href={localizedPath(locale, '/about')} variant="outline" className="mt-8">{t.home.introLink}</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}

export function Experience({ t }: P) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><div className="lg:sticky lg:top-28"><SectionHeading title={t.home.experienceTitle} /></div></Reveal>
        <ul className="divide-y divide-deep/15 border-y border-deep/15 lg:col-span-8">
          {experiences.map((e) => (
            <li key={e.id}>
              <Reveal className="flex items-center justify-between gap-6 py-7">
                <div className="max-w-lg">
                  <h3 className="font-display text-3xl">{e.title}</h3>
                  <p className="mt-2 leading-relaxed text-mute">{e.text}</p>
                </div>
                <Photo src={e.image} alt={e.alt} className="hidden aspect-[4/3] w-44 shrink-0 rounded-[3px] sm:block" sizes="176px" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function MenuHighlights({ locale, t }: P) {
  const dishes = pick(highlightSlugs)
  return (
    <section className="dark-surface bg-deep py-24 text-chalk sm:py-32">
      <div className="container-x">
        <Reveal><SectionHeading title={t.home.menuTitle} tone="dark" /></Reveal>
        <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
          {dishes.map((d) => (
            <li key={d.id} className="border-b border-chalk/15 py-6">
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-display text-2xl">
                  <Link href={localizedPath(locale, `/menu/${d.slug}`)} className="hover:text-saffron">{d.name}</Link>
                </h3>
                <p className="whitespace-nowrap font-display text-xl text-saffron">{formatPrice(d.price, locale)}</p>
              </div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-chalk/70">{d.description}</p>
            </li>
          ))}
        </ul>
        <ButtonLink href={localizedPath(locale, '/menu')} className="mt-12">{t.home.menuCta}</ButtonLink>
      </div>
    </section>
  )
}

export function ReserveBand({ t }: P) {
  return (
    <section id="reserve" className="dark-surface relative isolate overflow-hidden bg-deep-700 py-24 text-chalk sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -start-24 top-0 h-80 w-80 rounded-full bg-saffron/15 blur-[100px]" />
      <div className="container-x">
        <h2 className="font-display text-5xl font-light leading-none tracking-[-0.02em] sm:text-7xl">{t.home.reserveTitle}</h2>
        <p className="mt-5 max-w-xl text-lg text-chalk/75">{t.home.reserveBody}</p>
        <QuickReserve />
      </div>
    </section>
  )
}

export function Testimonials({ locale, t }: P) {
  const featured = reviews.filter((r) => r.featured).slice(0, 3)
  const { average, total } = ratingStats(reviews)
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title={t.home.reviewsTitle} />
          <div className="flex items-center gap-3">
            <p className="font-display text-5xl font-light">{average.toFixed(1)}</p>
            <div>
              <Stars rating={average} label={fmt(t.reviews.starsLabel, { n: average.toFixed(1) })} />
              <p className="text-sm text-mute">{fmt(t.reviews.totalReviews, { n: total })}</p>
            </div>
          </div>
        </Reveal>
        <ul className="mt-14 grid gap-12 md:grid-cols-3">
          {featured.map((r, i) => (
            <li key={r.id}><Reveal delay={i * 0.08}><ReviewCard review={r} locale={locale} t={t} /></Reveal></li>
          ))}
        </ul>
        <ButtonLink href={localizedPath(locale, '/reviews')} variant="outline" className="mt-12">{t.home.reviewsCta}</ButtonLink>
      </div>
    </section>
  )
}

export function UpcomingEvents({ locale, t }: P) {
  return (
    <section className="bg-chalk-200 py-24 sm:py-32">
      <div className="container-x">
        <Reveal><SectionHeading title={t.home.eventsTitle} /></Reveal>
        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {events.slice(0, 3).map((e, i) => (
            <li key={e.id}><Reveal delay={i * 0.08} className="h-full"><EventCard event={e} locale={locale} t={t} /></Reveal></li>
          ))}
        </ul>
        <ButtonLink href={localizedPath(locale, '/events')} variant="outline" className="mt-12">{t.home.eventsCta}</ButtonLink>
      </div>
    </section>
  )
}

export function SocialGrid({ t }: P) {
  const shots = [gallery[0], gallery[2], gallery[5], gallery[6], gallery[8], gallery[10]]
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <Reveal><SectionHeading title={t.home.galleryTitle} /></Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {shots.map((g) => (
            <li key={g.id}><Photo src={g.src} alt={g.alt} className="aspect-square rounded-[3px]" sizes="(min-width:1024px) 16vw, (min-width:768px) 33vw, 50vw" /></li>
          ))}
        </ul>
        <ButtonLink href={restaurant.social[0].url} external variant="outline" className="mt-10">{t.common.follow}</ButtonLink>
      </div>
    </section>
  )
}

export function Location({ locale, t }: P) {
  return (
    <section className="dark-surface bg-deep py-24 text-chalk sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl font-light leading-[1.05] sm:text-5xl">{t.home.locationTitle}</h2>
          <OpeningStatus className="mt-5 text-chalk/80" />
          <address className="mt-6 space-y-1 text-lg not-italic text-chalk/85">
            <p>{restaurant.address.street}</p>
            <p>{restaurant.address.district}, {restaurant.address.city} {restaurant.address.postalCode}</p>
            <p className="pt-2"><a href={restaurant.phoneHref} className="underline underline-offset-4">{restaurant.phone}</a></p>
            <p><a href={`mailto:${restaurant.email}`} className="underline underline-offset-4">{restaurant.email}</a></p>
          </address>
          <dl className="mt-8 space-y-1.5 text-[15px] text-chalk/75">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-6 border-b border-chalk/10 py-1.5">
                <dt>{weekdayName(h.day, locale)}</dt>
                <dd>{h.ranges.length === 0 ? t.common.closedDay : h.ranges.map(([a, b]) => `${a}\u2013${b}`).join(', ')}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={mapsUrl} external>{t.common.directions}</ButtonLink>
            <ButtonLink href={restaurant.phoneHref} variant="outlineLight"><Phone className="h-4 w-4" aria-hidden /> {t.common.callRestaurant}</ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <MapVisual label={`${restaurant.name}, ${restaurant.address.street}, ${restaurant.address.city}`} caption={`${restaurant.name}, ${restaurant.address.street}, ${restaurant.address.district}`} />
        </div>
      </div>
    </section>
  )
}
