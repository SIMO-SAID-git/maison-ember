'use client'

import { useCallback, useState } from 'react'
import { Heart } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { ButtonLink } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { DishCard } from '@/components/menu/DishCard'
import { DishDetail } from '@/components/menu/DishDetail'
import type { MenuItem } from '@/types'

export function FavoritesView({ items }: { items: MenuItem[] }) {
  const { t, href, favorites, hydrated } = useApp()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<MenuItem | null>(null)
  const openDish = useCallback((i: MenuItem) => { setActive(i); setOpen(true) }, [])
  const closeDish = useCallback(() => setOpen(false), [])
  const saved = items.filter((i) => favorites.includes(i.id))

  if (hydrated && saved.length === 0) {
    return (
      <div className="container-x py-12">
        <EmptyState icon={<Heart className="h-10 w-10" />} title={t.favorites.emptyTitle}>
          <p>{t.favorites.emptyBody}</p>
          <ButtonLink href={href('/menu')} className="mt-6">{t.favorites.browse}</ButtonLink>
        </EmptyState>
      </div>
    )
  }
  return (
    <div className="container-x py-12">
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((item) => <li key={item.id}><DishCard item={item} onOpen={openDish} /></li>)}
      </ul>
      <Dialog open={open} onClose={closeDish} label={active?.name ?? t.nav.favorites}>
        {active && <DishDetail item={active} inDialog />}
      </Dialog>
    </div>
  )
}
