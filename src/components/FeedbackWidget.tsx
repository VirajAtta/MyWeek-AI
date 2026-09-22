import { useState } from 'react'
import { recordFeedback } from '../services/feedbackStore'
import { IconThumbUp, IconThumbDown, IconCheck } from './icons'

/**
 * FeedbackWidget — "Was this useful?" for AI interpretation sections.
 * On thumbs-down, offers structured reasons. Stored locally only.
 */

const REASONS = [
  'This matters more than MyWeek indicated',
  'My role is incorrect',
  'The summary is incorrect',
  'Information is missing',
  'Other',
]

export function FeedbackWidget({ context }: { context: string }) {
  const [state, setState] = useState<'idle' | 'reasons' | 'done'>('idle')

  function submitUp() {
    recordFeedback({ context, helpful: true })
    setState('done')
  }

  function chooseReason(reason: string) {
    recordFeedback({ context, helpful: false, reason })
    setState('done')
  }

  if (state === 'done') {
    return (
      <div className="mt-3 flex items-center gap-1.5 text-xs text-ok-fg">
        <IconCheck className="h-4 w-4" aria-hidden />
        Thanks — your feedback was recorded locally.
      </div>
    )
  }

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-ink-muted">
          Was this useful?
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={submitUp}
            aria-label="Yes, this was useful"
            className="btn-secondary px-2.5 py-1.5"
          >
            <IconThumbUp className="h-4 w-4" aria-hidden />
            <span className="text-xs">Yes</span>
          </button>
          <button
            type="button"
            onClick={() => setState('reasons')}
            aria-label="No, this was not useful"
            aria-expanded={state === 'reasons'}
            className="btn-secondary px-2.5 py-1.5"
          >
            <IconThumbDown className="h-4 w-4" aria-hidden />
            <span className="text-xs">No</span>
          </button>
        </div>
      </div>

      {state === 'reasons' && (
        <fieldset className="mt-3">
          <legend className="text-xs font-medium text-ink-muted">
            What was off?
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {REASONS.map((reason) => (
              <button
                key={reason}
                type="button"
                onClick={() => chooseReason(reason)}
                className="chip border border-slate-300 bg-white text-ink-muted hover:bg-slate-50"
              >
                {reason}
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  )
}
