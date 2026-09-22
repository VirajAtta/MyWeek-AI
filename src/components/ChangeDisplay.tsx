import type { DetectedChange } from '../data/types'
import { formatDelta } from '../services/changeEngine'
import { IconArrowRight } from './icons'

/**
 * ChangeDisplay — renders a single deterministically-detected change as
 * "previous → current" with an optional numeric delta. Purely a fact display.
 */
export function ChangeDisplay({
  change,
  size = 'md',
}: {
  change: DetectedChange
  size?: 'sm' | 'md' | 'lg'
}) {
  const valueClass =
    size === 'lg'
      ? 'text-2xl font-bold'
      : size === 'sm'
        ? 'text-sm font-semibold'
        : 'text-lg font-bold'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`${valueClass} text-ink-muted line-through decoration-slate-300`}>
        {change.previousValue}
      </span>
      <IconArrowRight className="h-4 w-4 text-ink-soft" aria-label="changed to" />
      <span className={`${valueClass} text-ink`}>{change.currentValue}</span>
      {change.delta !== undefined && (
        <span
          className={`chip ${
            change.delta > 0
              ? 'bg-changed-bg text-changed-fg border border-changed-border'
              : 'bg-ok-bg text-ok-fg border border-ok-border'
          }`}
        >
          {formatDelta(change.delta)}{' '}
          {change.field === 'attendance' ? 'attendees' : ''}
        </span>
      )}
    </div>
  )
}
