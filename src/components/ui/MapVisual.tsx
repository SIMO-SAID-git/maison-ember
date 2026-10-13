/** A stylised street-map illustration. Replace with an embedded map when a provider is chosen. */
export function MapVisual({ label, caption }: { label: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-md bg-chalk-200">
      <svg viewBox="0 0 600 420" role="img" aria-label={label} className="block h-auto w-full">
        <rect width="600" height="420" fill="#E0DDD0" />
        <path d="M0 330 C120 300 220 360 340 330 S520 300 600 320 L600 420 L0 420Z" fill="#B9CFC6" />
        <g stroke="#F5F3EC" strokeWidth="14" strokeLinecap="round" fill="none">
          <path d="M-10 120 L610 150" /><path d="M-10 250 L610 230" /><path d="M120 -10 L150 300" />
          <path d="M300 -10 L290 320" /><path d="M470 -10 L500 310" />
        </g>
        <g stroke="#F5F3EC" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M-10 60 L610 80" /><path d="M-10 190 L610 190" /><path d="M210 -10 L220 300" /><path d="M390 -10 L395 310" />
        </g>
        <g fill="#CFCBBB">
          <rect x="165" y="165" width="90" height="55" /><rect x="310" y="95" width="70" height="40" />
          <rect x="405" y="165" width="75" height="50" /><rect x="40" y="165" width="60" height="50" /><rect x="520" y="95" width="60" height="45" />
        </g>
        <g transform="translate(298 168)">
          <ellipse cx="0" cy="34" rx="16" ry="5" fill="#0F1F1B" opacity=".25" />
          <path d="M0 32 C-22 8 -22 -22 0 -22 C22 -22 22 8 0 32Z" fill="#0F1F1B" />
          <circle cx="0" cy="-6" r="8" fill="#E2A72E" />
        </g>
      </svg>
      <figcaption className="px-4 py-3 text-sm text-mute">{caption}</figcaption>
    </figure>
  )
}
