'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Dialog } from '@/components/ui/Dialog'
import { Photo } from '@/components/ui/Photo'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn, fmt } from '@/lib/utils'
import type { GalleryCategory, GalleryImage } from '@/types'

const CATS: ('all' | GalleryCategory)[] = ['all', 'food', 'restaurant', 'chef', 'events', 'atmosphere']
const ASPECT = { portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]', square: 'aspect-square' } as const

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const { t, dir } = useApp()
  const [cat, setCat] = useState<'all' | GalleryCategory>('all')
  const [current, setCurrent] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(id)
  }, [])

  const list = useMemo(() => (cat === 'all' ? images : images.filter((i) => i.category === cat)), [images, cat])
  const close = useCallback(() => setCurrent(null), [])
  const step = useCallback((delta: number) => setCurrent((c) => (c === null ? c : (c + delta + list.length) % list.length)), [list.length])

  useEffect(() => {
    if (current === null) return
    const onKey = (e: KeyboardEvent) => {
      const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
      const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
      if (e.key === forward) step(1)
      if (e.key === back) step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [current, dir, step])

  const shown = current !== null ? list[current] : null

  return (
    <div className="container-x py-10 sm:py-14">
      <div role="group" aria-label={t.nav.gallery} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {CATS.map((c) => (
          <button
            key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cn('whitespace-nowrap rounded-full border px-4 py-2 text-[15px] transition-colors', cat === c ? 'border-deep bg-deep text-chalk' : 'border-deep/25 hover:border-deep/60')}
          >
            {t.gallery.categories[c]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 columns-2 gap-3 lg:columns-3" aria-busy="true">
          {[0, 1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className={cn('mb-3 w-full', i % 2 ? 'aspect-[3/4]' : 'aspect-[4/3]')} />)}
        </div>
      ) : (
        <ul className="mt-8 columns-2 gap-3 lg:columns-3">
          {list.map((img, i) => (
            <li key={img.id} className="mb-3 break-inside-avoid">
              <button type="button" onClick={() => setCurrent(i)} aria-label={fmt(t.gallery.open, { alt: img.alt })} className="group block w-full">
                <Photo src={img.src} alt="" zoom className={cn('w-full rounded-[3px]', ASPECT[img.aspect])} sizes="(min-width:1024px) 33vw, 50vw" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-sm text-mute">{t.gallery.note}</p>

      <Dialog open={shown !== null} onClose={close} label={shown?.alt ?? t.nav.gallery} variant="full" showClose={false}>
        {shown && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-sm text-chalk/75" aria-live="polite">{fmt(t.gallery.counter, { n: (current ?? 0) + 1, total: list.length })}</p>
              <button type="button" onClick={close} aria-label={t.gallery.closeLightbox} className="flex h-11 w-11 items-center justify-center rounded-full bg-chalk/10 hover:bg-chalk/20">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="relative mx-auto min-h-0 w-full max-w-5xl flex-1 px-4">
              <Photo src={shown.src} alt={shown.alt} fit="contain" className="h-full w-full bg-transparent" sizes="100vw" />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <button type="button" onClick={() => step(-1)} aria-label={t.gallery.prev} className="flex h-12 w-12 items-center justify-center rounded-full bg-chalk/10 hover:bg-chalk/20">
                <ChevronLeft className="h-6 w-6 rtl:rotate-180" aria-hidden />
              </button>
              <p className="text-center text-chalk/85">{shown.alt}</p>
              <button type="button" onClick={() => step(1)} aria-label={t.gallery.next} className="flex h-12 w-12 items-center justify-center rounded-full bg-chalk/10 hover:bg-chalk/20">
                <ChevronRight className="h-6 w-6 rtl:rotate-180" aria-hidden />
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
