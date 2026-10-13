'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { cn } from '@/lib/utils'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

interface DialogProps {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
  variant?: 'panel' | 'full'
  showClose?: boolean
  className?: string
}

/**
 * Accessible modal: role="dialog", focus moved in and trapped, Escape and
 * backdrop click close it, scroll is locked and focus returns to the trigger.
 */
export function Dialog({ open, onClose, label, children, variant = 'panel', showClose = true, className }: DialogProps) {
  const { t } = useApp()
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  })
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const focusables = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    const raf = requestAnimationFrame(() => focusables()[0]?.focus())

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className={cn(
            'fixed inset-0 z-[100]',
            variant === 'panel' ? 'flex items-end justify-center bg-deep/75 sm:items-center sm:p-6' : 'dark-surface bg-deep text-chalk',
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (variant === 'panel' && e.target === e.currentTarget) closeRef.current()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={cn(
              variant === 'panel'
                ? 'relative max-h-[92svh] w-full overflow-y-auto rounded-t-md bg-chalk text-deep sm:max-w-4xl sm:rounded-md'
                : 'relative h-full w-full overflow-y-auto',
              className,
            )}
            initial={{ opacity: 0, y: variant === 'panel' ? 28 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: variant === 'panel' ? 28 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {showClose && (
              <button
                type="button"
                onClick={() => closeRef.current()}
                aria-label={t.common.close}
                className="absolute end-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-deep text-chalk transition-colors hover:bg-deep-600"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
