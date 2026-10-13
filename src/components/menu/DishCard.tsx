'use client'

import { Flame } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Badge, DietaryBadges } from '@/components/ui/Badge'
import { Photo } from '@/components/ui/Photo'
import { FavoriteButton } from '@/components/menu/FavoriteButton'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/types'

export function DishCard({ item, onOpen }: { item: MenuItem; onOpen: (item: MenuItem) => void }) {
  const { t, locale } = useApp()
  const allergens = item.allergens.length ? item.allergens.map((a) => t.allergens[a]).join(', ') : t.menu.noAllergens
  return (
    <article className={cn('group flex h-full flex-col', !item.available && 'opacity-75')}>
      <div className="relative">
        <Photo
          src={item.image}
          alt={item.imageAlt}
          zoom
          className="aspect-[4/3] rounded-[3px]"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
          {item.chefsChoice && <Badge tone="accent">{t.dietary.chef}</Badge>}
          {!item.available && <Badge tone="dark">{t.menu.unavailable}</Badge>}
        </div>
        <FavoriteButton id={item.id} name={item.name} className="absolute end-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight">{item.name}</h3>
          <p className="whitespace-nowrap font-display text-xl text-zellige">{formatPrice(item.price, locale)}</p>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-mute">{item.description}</p>
        <DietaryBadges tags={item.dietary} className="mt-3" />
        <p className="mt-3 text-sm text-mute">
          <span className="font-medium text-deep">{t.menu.ingredients}:</span> {item.ingredients.slice(0, 4).join(', ')}
        </p>
        <p className="mt-1 text-sm text-mute">
          <span className="font-medium text-deep">{t.menu.allergens}:</span> {allergens}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {item.popularity >= 85 ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-deep">
              <Flame className="h-4 w-4 text-ember" aria-hidden /> {t.menu.popular}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="text-[15px] font-medium text-zellige underline decoration-zellige/40 underline-offset-4 hover:decoration-zellige"
          >
            {t.common.viewDetails}
            <span className="sr-only">: {item.name}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
