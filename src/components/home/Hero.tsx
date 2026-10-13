'use client'

import { motion } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { ButtonLink } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { OpeningStatus } from '@/components/layout/OpeningStatus'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { t, href } = useApp()
  return (
    <section className="dark-surface relative isolate overflow-hidden bg-deep text-chalk">
      <div aria-hidden className="pointer-events-none absolute -bottom-32 end-[-8%] h-[34rem] w-[34rem] animate-glow rounded-full bg-ember/30 blur-[120px]" />
      <div className="container-x grid min-h-[100svh] items-center gap-12 pb-24 pt-32 lg:grid-cols-12 lg:gap-8 lg:pt-28">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <OpeningStatus className="text-chalk/80" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.15 }}
            className="mt-6 max-w-3xl text-balance font-display text-[3.4rem] font-light leading-[0.98] tracking-[-0.025em] sm:text-7xl lg:text-[5.6rem]"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-chalk/75"
          >
            {t.hero.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <ButtonLink href={href('/reservations')}>{t.common.reserveTable}</ButtonLink>
            <ButtonLink href={href('/menu')} variant="outlineLight">{t.hero.explore}</ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease, delay: 0.25 }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none"
        >
          <div className="rounded-t-[999px] border border-saffron/50 p-2">
            <Photo
              src="/images/hero.svg"
              alt="Flames rising from the wood-fired hearth at Maison Ember"
              priority
              sizes="(min-width:1024px) 40vw, 90vw"
              className="aspect-[3/4] rounded-t-[999px]"
            />
          </div>
        </motion.div>
      </div>
      <div aria-hidden className="absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-chalk/60 lg:flex">
        <span>{t.hero.scroll}</span>
        <span className="block h-10 w-px animate-cue bg-chalk/60" />
      </div>
    </section>
  )
}
