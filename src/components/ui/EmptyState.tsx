import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function EmptyState({ icon, title, children, className }: { icon?: ReactNode; title: string; children?: ReactNode; className?: string }) {
  return (
    <div role="status" className={cn('mx-auto flex max-w-md flex-col items-center px-4 py-14 text-center', className)}>
      {icon && <div className="mb-5 text-zellige" aria-hidden>{icon}</div>}
      <h2 className="font-display text-3xl font-light">{title}</h2>
      {children && <div className="mt-3 text-mute">{children}</div>}
    </div>
  )
}
