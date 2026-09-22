/**
 * SummaryMetric — one figure in the My Actions summary row.
 * `tone` controls the accent used for the number (color + is announced via
 * the accessible label, not conveyed by color alone).
 */
type Tone = 'action' | 'changed' | 'relevant' | 'neutral'

const TONE: Record<Tone, string> = {
  action: 'text-action-fg',
  changed: 'text-changed-fg',
  relevant: 'text-brand-600',
  neutral: 'text-ink',
}

export function SummaryMetric({
  value,
  label,
  tone = 'neutral',
}: {
  value: number
  label: string
  tone?: Tone
}) {
  return (
    <div className="card px-4 py-3.5">
      <div className={`text-2xl font-bold leading-none ${TONE[tone]}`}>
        {value}
      </div>
      <div className="mt-1.5 text-xs font-medium text-ink-muted">{label}</div>
    </div>
  )
}
