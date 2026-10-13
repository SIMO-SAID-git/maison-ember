import Link from 'next/link'

export function FlameMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2c.6 3.2-1.8 4.6-3.4 6.8C7 11 6 12.800 6 15.200 6 18.900 8.700 22 12 22s6-3.100 6-6.800c0-2-.9-3.800-2-5.200-.4 1.200-1.100 2-2 2.400.5-3.100-.4-7.600-2-10.400Z" />
    </svg>
  )
}

export function Logo({ href }: { href: string }) {
  return (
    <Link href={href} aria-label="Maison Ember" className="group inline-flex items-center gap-2.5">
      <FlameMark className="h-6 w-6 text-saffron transition-transform duration-500 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
      <span className="font-display text-[1.65rem] font-normal leading-none tracking-[-0.01em]">Maison Ember</span>
    </Link>
  )
}
