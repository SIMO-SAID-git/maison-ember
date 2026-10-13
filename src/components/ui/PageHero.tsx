import type { ReactNode } from 'react'

/** Dark page opener. The fixed header sits transparently on top of it. */
export function PageHero({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="dark-surface relative isolate overflow-hidden bg-deep text-chalk">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 end-[-10%] h-[28rem] w-[28rem] rounded-full bg-ember/25 blur-[110px]" />
      <div className="container-x pb-14 pt-32 sm:pb-20 sm:pt-44">
        <h1 className="max-w-4xl font-display text-5xl font-light leading-[1] tracking-[-0.02em] sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chalk/75">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
