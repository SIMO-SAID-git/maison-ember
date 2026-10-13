import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Photo } from '@/components/ui/Photo'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { localizedPath, type Locale } from '@/lib/i18n/config'
import { fmt, formatDate, formatPrice } from '@/lib/utils'
import type { EventItem } from '@/types'

export function EventCard({ event, locale, t }: { event: EventItem; locale: Locale; t: Dictionary }) {
  const soldOut = event.seatsAvailable === 0
  return (
    <article className="group relative flex h-full flex-col">
      <Photo src={event.image} alt={event.imageAlt} zoom className="aspect-[5/4] rounded-[3px]" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[15px] text-zellige">
          {formatDate(event.date, locale, { weekday: 'long', day: 'numeric', month: 'long' })}, {event.startTime}
        </p>
        <h3 className="mt-1 font-display text-3xl leading-tight">
          <Link href={localizedPath(locale, `/events/${event.slug}`)} className="after:absolute after:inset-0">
            {event.name}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-mute">{event.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <span className="font-display text-xl">{formatPrice(event.price, locale)}</span>
          <span className="text-sm text-mute">{t.common.perPerson}</span>
          {soldOut ? <Badge tone="dark">{t.events.soldOut}</Badge> : <Badge tone="accent">{fmt(t.events.seatsLeft, { n: event.seatsAvailable })}</Badge>}
        </div>
      </div>
    </article>
  )
}
