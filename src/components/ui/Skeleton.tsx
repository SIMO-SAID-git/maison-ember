import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse rounded-[3px] bg-deep/10 motion-reduce:animate-none', className)} />
}
