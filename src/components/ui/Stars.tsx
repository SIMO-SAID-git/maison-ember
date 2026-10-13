import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Stars({ rating, label, size = 16, className }: { rating: number; label: string; size?: number; className?: string }) {
  const filled = Math.round(rating)
  return (
    <span role="img" aria-label={label} className={cn('inline-flex gap-0.5 text-saffron-600', className)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} width={size} height={size} aria-hidden className={n <= filled ? 'fill-current' : 'text-deep/25'} />
      ))}
    </span>
  )
}
