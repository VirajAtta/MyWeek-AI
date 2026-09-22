import type { ReactNode } from 'react'
import { IconDoc, IconSpark, IconInfo } from './icons'

/**
 * Category kickers that make the three trust categories easy to distinguish:
 *   - Source Fact      → directly retrieved from Outlook/Airtable
 *   - AI Interpretation → contextual reasoning grounded in source facts
 *   - MyWeek Suggestion → an optional AI-generated consideration
 *
 * These are used as small headers above the relevant content blocks.
 */

export function DetectedChangeKicker() {
  return (
    <span className="chip bg-slate-100 text-ink-muted border border-slate-200 uppercase tracking-wide text-[11px]">
      <IconDoc className="h-3.5 w-3.5" aria-hidden />
      Detected change · deterministic
    </span>
  )
}

export function SourceFactKicker({ children }: { children?: ReactNode }) {
  return (
    <span className="chip bg-slate-100 text-ink-muted border border-slate-200 uppercase tracking-wide text-[11px]">
      <IconDoc className="h-3.5 w-3.5" aria-hidden />
      {children ?? 'Source fact'}
    </span>
  )
}

export function AIInterpretationKicker() {
  return (
    <span className="chip bg-brand-50 text-brand-700 border border-brand-100 uppercase tracking-wide text-[11px]">
      <IconSpark className="h-3.5 w-3.5" aria-hidden />
      AI interpretation
    </span>
  )
}

export function SuggestionKicker() {
  return (
    <span className="chip bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wide text-[11px]">
      <IconSpark className="h-3.5 w-3.5" aria-hidden />
      MyWeek suggestion
    </span>
  )
}

/** A subtle advisory disclaimer used under AI suggestions. */
export function AdvisoryNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 flex items-start gap-1.5 text-xs text-ink-soft">
      <IconInfo className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  )
}
