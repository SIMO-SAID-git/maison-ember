'use client'

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, UtensilsCrossed, X } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { DishCard } from '@/components/menu/DishCard'
import { DishDetail } from '@/components/menu/DishDetail'
import { cn, fmt, formatPrice, normalize } from '@/lib/utils'
import type { DietaryTag, MenuCategory, MenuItem } from '@/types'

type PriceBucket = 'any' | 'low' | 'mid' | 'high'
type SortKey = 'recommended' | 'asc' | 'desc' | 'popular'
const BUCKETS: Record<PriceBucket, [number, number]> = { any: [0, Infinity], low: [0, 149], mid: [150, 300], high: [301, Infinity] }
const CATEGORIES: ('all' | MenuCategory)[] = ['all', 'starters', 'salads', 'mains', 'seafood', 'meat', 'vegetarian', 'desserts', 'drinks', 'wine']
const DIET_OPTIONS: DietaryTag[] = ['vegetarian', 'vegan', 'gluten-free']

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'whitespace-nowrap rounded-full border px-4 py-2 text-[15px] transition-colors',
        active ? 'border-deep bg-deep text-chalk' : 'border-deep/25 hover:border-deep/60',
      )}
    >
      {children}
    </button>
  )
}

export function MenuExplorer({ items }: { items: MenuItem[] }) {
  const { t, locale } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | MenuCategory>('all')
  const [price, setPrice] = useState<PriceBucket>('any')
  const [diet, setDiet] = useState<DietaryTag[]>([])
  const [spicy, setSpicy] = useState(false)
  const [chef, setChef] = useState(false)
  const [sort, setSort] = useState<SortKey>('recommended')
  const [showFilters, setShowFilters] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<MenuItem | null>(null)

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    const [lo, hi] = BUCKETS[price]
    const list = items.filter((i) => {
      if (category !== 'all' && i.category !== category) return false
      if (i.price < lo || i.price > hi) return false
      if (diet.some((d) => !i.dietary.includes(d))) return false
      if (spicy && !i.dietary.includes('spicy')) return false
      if (chef && !i.chefsChoice) return false
      if (q && !normalize([i.name, i.description, ...i.ingredients].join(' ')).includes(q)) return false
      return true
    })
    const score = (i: MenuItem) => (i.chefsChoice ? 30 : 0) + i.popularity
    return [...list].sort((a, b) =>
      sort === 'asc' ? a.price - b.price : sort === 'desc' ? b.price - a.price : sort === 'popular' ? b.popularity - a.popularity : score(b) - score(a),
    )
  }, [items, query, category, price, diet, spicy, chef, sort])

  const activeFilters = (price !== 'any' ? 1 : 0) + diet.length + (spicy ? 1 : 0) + (chef ? 1 : 0)
  const anyActive = activeFilters > 0 || query !== '' || category !== 'all'
  const reset = () => {
    setQuery(''); setCategory('all'); setPrice('any'); setDiet([]); setSpicy(false); setChef(false)
  }
  const openDish = useCallback((item: MenuItem) => {
    setActive(item)
    setOpen(true)
  }, [])
  const closeDish = useCallback(() => setOpen(false), [])
  const toggleDiet = (d: DietaryTag) => setDiet((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]))

  return (
    <div className="container-x py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="menu-search" className="sr-only">{t.menu.searchLabel}</label>
          <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mute" aria-hidden />
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.menu.search}
            className="field ps-12"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            aria-expanded={showFilters}
            aria-controls="menu-filters"
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[3px] border border-deep/30 px-4 py-3 text-[15px] md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {t.menu.filters}{activeFilters > 0 && ` (${activeFilters})`}
          </button>
          <label className="flex flex-1 items-center gap-2 sm:flex-none">
            <span className="sr-only">{t.menu.sort}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field w-full sm:w-52" aria-label={t.menu.sort}>
              <option value="recommended">{t.menu.sortRecommended}</option>
              <option value="asc">{t.menu.sortPriceAsc}</option>
              <option value="desc">{t.menu.sortPriceDesc}</option>
              <option value="popular">{t.menu.sortPopular}</option>
            </select>
          </label>
        </div>
      </div>

      <div role="group" aria-label={t.nav.menu} className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {CATEGORIES.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{t.menu.categories[c]}</Chip>
        ))}
      </div>

      <div id="menu-filters" className={cn('mt-4 flex-wrap items-center gap-x-6 gap-y-3 border-y border-deep/10 py-4', showFilters ? 'flex' : 'hidden', 'md:flex')}>
        <label className="flex items-center gap-2 text-[15px]">
          <span className="font-medium">{t.menu.price}</span>
          <select value={price} onChange={(e) => setPrice(e.target.value as PriceBucket)} className="field w-auto py-2">
            <option value="any">{t.menu.priceAny}</option>
            <option value="low">{fmt(t.menu.priceUnder, { n: formatPrice(150, locale) })}</option>
            <option value="mid">{fmt(t.menu.priceMid, { a: formatPrice(150, locale), b: formatPrice(300, locale) })}</option>
            <option value="high">{fmt(t.menu.priceOver, { n: formatPrice(300, locale) })}</option>
          </select>
        </label>
        <div role="group" aria-label={t.menu.dietary} className="flex flex-wrap items-center gap-2">
          {DIET_OPTIONS.map((d) => (
            <Chip key={d} active={diet.includes(d)} onClick={() => toggleDiet(d)}>{t.dietary[d]}</Chip>
          ))}
          <Chip active={spicy} onClick={() => setSpicy((v) => !v)}>{t.menu.spicy}</Chip>
          <Chip active={chef} onClick={() => setChef((v) => !v)}>{t.menu.chefsChoice}</Chip>
        </div>
        {anyActive && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-[15px] text-zellige underline underline-offset-4">
            <X className="h-4 w-4" aria-hidden /> {t.menu.clearFilters}
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-mute" aria-live="polite">
        {filtered.length === 1 ? t.menu.resultsOne : fmt(t.menu.results, { n: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <EmptyState icon={<UtensilsCrossed className="h-10 w-10" />} title={t.menu.noResultsTitle}>
          <p>{t.menu.noResultsBody}</p>
          <Button variant="dark" className="mt-6" onClick={reset}>{t.menu.clearFilters}</Button>
        </EmptyState>
      ) : (
        <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
            >
              <DishCard item={item} onOpen={openDish} />
            </motion.li>
          ))}
        </ul>
      )}

      <Dialog open={open} onClose={closeDish} label={active?.name ?? t.nav.menu}>
        {active && <DishDetail item={active} inDialog />}
      </Dialog>
    </div>
  )
}
