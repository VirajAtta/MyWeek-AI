/**
 * Avatar — initials-only, deterministically colored. No photographs.
 */

const PALETTE = [
  'bg-brand-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-indigo-600',
  'bg-teal-600',
]

function colorFor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

export function Avatar({
  initials,
  name,
  size = 'md',
}: {
  initials: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const dims =
    size === 'lg'
      ? 'h-11 w-11 text-base'
      : size === 'sm'
        ? 'h-8 w-8 text-xs'
        : 'h-9 w-9 text-sm'
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white ${dims} ${colorFor(initials)}`}
      role="img"
      aria-label={name ? `${name} avatar` : `${initials} avatar`}
    >
      {initials}
    </span>
  )
}
