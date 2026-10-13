import { Stars } from '@/components/ui/Stars'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'
import { fmt, formatDate } from '@/lib/utils'
import type { Review } from '@/types'

export function ReviewCard({ review, locale, t }: { review: Review; locale: Locale; t: Dictionary }) {
  const initials = review.author.split(' ').map((p) => p[0]).join('').slice(0, 2)
  return (
    <article className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-zellige font-display text-lg text-chalk">{initials}</span>
        <div>
          <p className="font-medium">{review.author}</p>
          <p className="text-sm text-mute">{formatDate(review.date, locale, { day: 'numeric', month: 'long', year: 'numeric' })}, {review.visit}</p>
        </div>
      </div>
      <Stars rating={review.rating} label={fmt(t.reviews.starsLabel, { n: review.rating })} className="mt-4" />
      <h3 className="mt-3 font-display text-2xl leading-snug">{review.title}</h3>
      <p className="mt-2 leading-relaxed text-mute">{review.body}</p>
    </article>
  )
}
