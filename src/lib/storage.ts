import { useCallback, useEffect, useState } from 'react'

/**
 * localStorage-backed state that is safe for SSR: it starts with `initial`
 * on both server and first client render, then hydrates from storage.
 * Swap this for an API-backed store when a real backend exists.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initial)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw !== null) setValue(JSON.parse(raw) as T)
    } catch {
      /* storage unavailable or corrupt: keep the initial value */
    }
    setHydrated(true)
  }, [key])

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          /* storage unavailable: state still updates in memory */
        }
        return resolved
      })
    },
    [key],
  )

  return [value, set, hydrated]
}
