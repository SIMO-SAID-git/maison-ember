'use client'

import { useMemo, useState } from 'react'
import { MessageSquareOff } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Stars } from '@/components/ui/Stars'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { ratingStats } from '@/data/reviews'
import { cn, fmt } from '@/lib/utils'
import type { Review } from '@/types'

type Sort = 'newest' | 'highest' | 'lowest'

export function ReviewsExplorer({ reviews }: { reviews: Review[] }) {
  const { t, locale } = useApp()
  const [rating, setRating] = useState<number | null>(null)
  const [sort, setSort] = useState<Sort>('newest')
  const stats = useMemo(() => ratingStats(reviews), [reviews])
  const list = useMemo(() => {
    const filtered = rating ? reviews.filter((r) => r.rating === rating) : reviews
    return [...filtered].sort((a, b) =>
      sort === 'highest' ? b.rating - a.rating || b.date.localeCompare(a.date) : sort === 'lowest' ? a.rating - b.rating || b.date.localeCompare(a.date) : b.date.localeCompare(a.date),
    )
  }, [reviews, rating, sort])

  return (
    <div className="container-x grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-sm text-mute">{t.reviews.overall}</h2>
          <p className="mt-2 font-display text-8xl font-light leading-none">{stats.average.toFixed(1)}</p>
          <Stars rating={stats.average} label={fmt(t.reviews.starsLabel, { n: stats.average.toFixed(1) })} size={22} className="mt-3" />
          <p className="mt-2 text-mute">{fmt(t.reviews.totalReviews, { n: stats.total })}</p>
          <ul className="mt-8 space-y-2">
            {stats.distribution.map(({ stars, count }) => (
              <li key={stars}>
                <button
                  type="button" aria-pressed={rating === stars} onClick={() => setRating(rating === stars ? null : stars)}
                  aria-label={`${fmt(t.reviews.starsLabel, { n: stars })}: ${count}`}
                  className={cn('flex w-full items-center gap-3 rounded-[3px] px-2 py-1.5 text-sm', rating === stars ? 'bg-deep text-chalk' : 'hover:bg-deep/10')}
                >
                  <span className="w-3 text-end">{stars}</span>
                  <span aria-hidden className="h-2 flex-1 overflow-hidden rounded-full bg-deep/15">
                    <span className="block h-full rounded-full bg-saffron" style={{ width: `${stats.total ? (count / stats.total) * 100 : 0}%` }} />
                  </span>
                  <span className="w-5 text-end">{count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-deep/15 pb-4">
          <p className="text-mute" aria-live="polite">
            {rating ? fmt(t.reviews.starsLabel, { n: rating }) : t.reviews.filterAll}: {fmt(t.reviews.totalReviews, { n: list.length })}
          </p>
          <label className="flex items-center gap-2 text-[15px]">
            {t.reviews.sort}
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field w-auto py-2">
              <option value="newest">{t.reviews.newest}</option>
              <option value="highest">{t.reviews.highest}</option>
              <option value="lowest">{t.reviews.lowest}</option>
            </select>
          </label>
        </div>
        {list.length === 0 ? (
          <EmptyState icon={<MessageSquareOff className="h-10 w-10" />} title={t.reviews.noneTitle}>
            <p>{t.reviews.noneBody}</p>
            <Button variant="dark" className="mt-6" onClick={() => setRating(null)}>{t.reviews.showAll}</Button>
          </EmptyState>
        ) : (
          <ul className="divide-y divide-deep/10">
            {list.map((r) => (
              <li key={r.id} className="py-8 first:pt-6"><ReviewCard review={r} locale={locale} t={t} /></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
