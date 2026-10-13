'use client'

import { Heart } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { cn } from '@/lib/utils'

export function FavoriteButton({ id, name, className, withLabel }: { id: string; name: string; className?: string; withLabel?: boolean }) {
  const { t, isFavorite, toggleFavorite, hydrated } = useApp()
  const active = hydrated && isFavorite(id)
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(id)}
      aria-pressed={active}
      aria-label={`${t.menu.favoriteAdd}: ${name}`}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-colors',
        withLabel
          ? 'rounded-[3px] border border-deep/30 px-4 py-3 text-[15px] hover:bg-deep hover:text-chalk'
          : 'h-11 w-11 rounded-full bg-chalk/90 text-deep hover:bg-chalk',
        className,
      )}
    >
      <Heart className={cn('h-5 w-5', active && 'fill-ember text-ember')} aria-hidden />
      {withLabel && <span>{active ? t.menu.favoriteRemove : t.menu.favoriteAdd}</span>}
    </button>
  )
}
