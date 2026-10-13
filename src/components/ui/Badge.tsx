'use client'

import type { ReactNode } from 'react'
import { useApp } from '@/components/providers/AppProvider'
import type { DietaryTag } from '@/types'
import { cn } from '@/lib/utils'

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'dark'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[3px] px-2 py-1 text-xs font-medium leading-none',
        tone === 'neutral' && 'bg-deep/10 text-deep',
        tone === 'accent' && 'bg-saffron text-deep',
        tone === 'dark' && 'bg-deep text-chalk',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function DietaryBadges({ tags, className }: { tags: DietaryTag[]; className?: string }) {
  const { t } = useApp()
  const shown = tags.includes('vegan') ? tags.filter((x) => x !== 'vegetarian') : tags
  if (shown.length === 0) return null
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {shown.map((tag) => (
        <li key={tag}>
          <Badge>{t.dietary[tag]}</Badge>
        </li>
      ))}
    </ul>
  )
}
