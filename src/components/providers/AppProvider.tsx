'use client'

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { dirOf, localizedPath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { useLocalStorage } from '@/lib/storage'
import type { Reservation } from '@/types'

interface AppContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: Dictionary
  href: (path: string) => string
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  reservation: Reservation | null
  saveReservation: (reservation: Reservation | null) => void
  hydrated: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

/** localStorage keys for the demo. A real backend would replace these with API calls. */
export const STORAGE_KEYS = {
  favorites: 'maison-ember:favorites',
  reservation: 'maison-ember:reservation',
  eventSeats: 'maison-ember:event-seats',
} as const

export function AppProvider({ locale, dictionary, children }: { locale: Locale; dictionary: Dictionary; children: ReactNode }) {
  const [favorites, setFavorites, favHydrated] = useLocalStorage<string[]>(STORAGE_KEYS.favorites, [])
  const [reservation, setReservation, resHydrated] = useLocalStorage<Reservation | null>(STORAGE_KEYS.reservation, null)

  const toggleFavorite = useCallback(
    (id: string) => setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setFavorites],
  )
  const href = useCallback((path: string) => localizedPath(locale, path), [locale])

  const value = useMemo<AppContextValue>(
    () => ({
      locale,
      dir: dirOf(locale),
      t: dictionary,
      href,
      favorites,
      toggleFavorite,
      isFavorite: (id: string) => favorites.includes(id),
      reservation,
      saveReservation: setReservation,
      hydrated: favHydrated && resHydrated,
    }),
    [locale, dictionary, href, favorites, toggleFavorite, reservation, setReservation, favHydrated, resHydrated],
  )

  return (
    <AppContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
