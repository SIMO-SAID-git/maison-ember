'use client'

import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { Badge, DietaryBadges } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { FavoriteButton } from '@/components/menu/FavoriteButton'
import { formatPrice } from '@/lib/utils'
import type { MenuItem } from '@/types'

interface Props {
  item: MenuItem
  /** In the dialog the title is an h2 and a link to the full page is shown. */
  inDialog?: boolean
  hideTitle?: boolean
}

export function DishDetail({ item, inDialog, hideTitle }: Props) {
  const { t, locale, href } = useApp()
  const Title = inDialog ? 'h2' : 'h1'
  return (
    <div className="grid gap-0 md:grid-cols-2">
      <Photo src={item.image} alt={item.imageAlt} className="aspect-[4/3] md:aspect-auto md:min-h-[34rem]" sizes="(min-width:768px) 50vw, 100vw" priority={!inDialog} />
      <div className="p-6 sm:p-9">
        <div className="flex flex-wrap items-center gap-2 pe-12">
          {item.chefsChoice && <Badge tone="accent">{t.dietary.chef}</Badge>}
          <Badge>{t.menu.categories[item.category]}</Badge>
          {!item.available && <Badge tone="dark">{t.menu.unavailable}</Badge>}
        </div>
        {!hideTitle && <Title className="mt-4 font-display text-4xl font-light leading-tight">{item.name}</Title>}
        <p className="mt-2 font-display text-3xl text-zellige">{formatPrice(item.price, locale)}</p>
        <p className="mt-4 leading-relaxed text-mute">{item.description}</p>
        {!item.available && <p className="mt-3 rounded-[3px] bg-deep/10 p-3 text-sm">{t.menu.unavailableNote}</p>}

        <dl className="mt-6 space-y-5 text-[15px]">
          <div>
            <dt className="font-medium">{t.menu.ingredients}</dt>
            <dd className="mt-1 text-mute">{item.ingredients.join(', ')}</dd>
          </div>
          <div>
            <dt className="font-medium">{t.menu.allergens}</dt>
            <dd className="mt-1 text-mute">
              {item.allergens.length ? item.allergens.map((a) => t.allergens[a]).join(', ') : t.menu.noAllergens}
            </dd>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <dt className="font-medium">{t.menu.dietaryInfo}</dt>
              <dd className="mt-1">{item.dietary.length ? <DietaryBadges tags={item.dietary} /> : <span className="text-mute">{'\u2013'}</span>}</dd>
            </div>
            <div>
              <dt className="font-medium">{t.menu.calories}</dt>
              <dd className="mt-1 text-mute">{item.calories} kcal</dd>
            </div>
          </div>
          <div className="rounded-[3px] bg-deep p-4 text-chalk">
            <dt className="text-sm text-saffron">{t.menu.pairing}</dt>
            <dd className="mt-1 font-display text-xl">{item.pairing}</dd>
          </div>
          {item.chefNote && (
            <div className="border-s-2 border-saffron ps-4">
              <dt className="text-sm font-medium">{t.menu.chefNote}</dt>
              <dd className="mt-1 text-mute">{item.chefNote}</dd>
            </div>
          )}
        </dl>
        <p className="mt-5 text-xs text-mute">{t.menu.mockNote}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={href('/reservations')}>{t.common.reserveTable}</ButtonLink>
          <FavoriteButton id={item.id} name={item.name} withLabel />
          {inDialog && (
            <Link href={href(`/menu/${item.slug}`)} className="inline-flex items-center px-2 py-3 text-[15px] text-zellige underline underline-offset-4">
              {t.menu.openFull}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
