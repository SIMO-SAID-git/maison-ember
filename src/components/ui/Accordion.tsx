'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Accordion({ items }: { items: { id: string; question: string; answer: string }[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <div className="divide-y divide-deep/15 border-y border-deep/15">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={`${item.id}-button`}
                aria-expanded={open}
                aria-controls={`${item.id}-panel`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-start font-display text-xl leading-snug sm:text-2xl"
              >
                {item.question}
                <Plus
                  className={cn('h-5 w-5 shrink-0 text-zellige transition-transform duration-300 motion-reduce:transition-none', open && 'rotate-45')}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-button`}
              inert={!open}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-6 pe-10 leading-relaxed text-mute">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
