import { useEffect } from 'react'
import type { MyWeekEvent } from '../data/types'
import { IconX, IconDoc } from './icons'

/**
 * SourceDrawer — slides in from the right and shows the synthetic RAW source
 * records (Outlook + Airtable, including historical "yesterday" / "today"
 * snapshots). This proves MyWeek always points back to authoritative records
 * and explicitly represents historical state.
 */
export function SourceDrawer({
  event,
  open,
  onClose,
}: {
  event: MyWeekEvent
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const records = event.rawSources ?? []

  return (
    <div
      className="fixed inset-0 z-40"
      role="dialog"
      aria-modal="true"
      aria-label="Source information"
    >
      <div
        className="absolute inset-0 bg-ink/30"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-drawer">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <IconDoc className="h-4 w-4 text-ink-muted" aria-hidden />
              Source information
            </div>
            <p className="mt-0.5 text-xs text-ink-soft">
              Synthetic raw records · {event.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary px-2 py-2"
            aria-label="Close source information"
          >
            <IconX className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          {records.length === 0 && (
            <p className="text-sm text-ink-muted">
              No raw source records are attached to this event in the demo
              dataset.
            </p>
          )}
          {records.map((rec, i) => (
            <section
              key={i}
              className="rounded-xl border border-slate-200 bg-slate-50/60"
            >
              <header className="flex items-center gap-2 border-b border-slate-200 px-4 py-2.5">
                <span
                  className={`chip border font-medium ${
                    rec.system === 'Outlook'
                      ? 'bg-brand-50 text-brand-700 border-brand-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}
                >
                  {rec.system}
                </span>
                <span className="text-sm font-semibold text-ink">
                  {rec.label}
                </span>
              </header>
              <dl className="divide-y divide-slate-100">
                {rec.fields.map((f, j) => (
                  <div
                    key={j}
                    className="flex items-start justify-between gap-4 px-4 py-2.5"
                  >
                    <dt className="text-xs font-medium text-ink-soft">
                      {f.key}
                    </dt>
                    <dd className="text-right text-sm text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-ink-soft border border-slate-200">
            MyWeek reads these records but never modifies them. Historical
            snapshots ("Yesterday" / "Today") let MyWeek detect changes
            deterministically instead of guessing a previous value.
          </p>
        </div>
      </div>
    </div>
  )
}
