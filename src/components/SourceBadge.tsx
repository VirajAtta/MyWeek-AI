import type { SourceRef, SourceSystem } from '../data/types'

/**
 * SourceBadge — a small, consistent label showing where a fact came from.
 * Distinct visual treatment per source system so users learn to trust the
 * "everything is source-grounded" promise.
 */

const SYSTEM_CLASSES: Record<SourceSystem, string> = {
  Outlook: 'bg-brand-50 text-brand-700 border-brand-100',
  Airtable: 'bg-emerald-50 text-emerald-700 border-emerald-100',
}

export function SourceBadge({
  source,
  prefix = 'Source',
}: {
  source: SourceRef | string
  prefix?: string
}) {
  if (typeof source === 'string') {
    return (
      <span className="chip border bg-slate-50 text-ink-muted border-slate-200 font-medium">
        {prefix}: {source}
      </span>
    )
  }
  const label = source.field ? `${source.system} → ${source.field}` : source.system
  return (
    <span
      className={`chip border font-medium ${SYSTEM_CLASSES[source.system]}`}
      title={`Retrieved from ${label}`}
    >
      <span className="opacity-70">{prefix}:</span> {label}
    </span>
  )
}
