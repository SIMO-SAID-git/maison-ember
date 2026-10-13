import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  eyebrow?: string
  intro?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'start' | 'center'
  className?: string
}

export function SectionHeading({ title, eyebrow, intro, tone = 'light', align = 'start', className }: Props) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && <p className={cn('mb-3 text-sm font-medium', tone === 'dark' ? 'text-saffron' : 'text-zellige')}>{eyebrow}</p>}
      <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] sm:text-5xl lg:text-[3.4rem]">{title}</h2>
      {intro && <p className={cn('mt-5 text-lg leading-relaxed', tone === 'dark' ? 'text-chalk/75' : 'text-mute')}>{intro}</p>}
    </div>
  )
}
