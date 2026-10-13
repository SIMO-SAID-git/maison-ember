import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PhotoProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  zoom?: boolean
  fit?: 'cover' | 'contain'
}

/** Wrapper around next/image. The parent controls size and aspect ratio via className. */
export function Photo({ src, alt, className, imgClassName, sizes = '100vw', priority, zoom, fit = 'cover' }: PhotoProps) {
  return (
    <div className={cn('relative overflow-hidden bg-deep-700', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={src.endsWith('.svg')}
        className={cn(
          fit === 'cover' ? 'object-cover' : 'object-contain',
          zoom && 'transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transform-none',
          imgClassName,
        )}
      />
    </div>
  )
}
