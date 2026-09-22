import { Link } from 'react-router-dom'
import type { MyWeekEvent } from '../data/types'
import { CURRENT_USER } from '../data/team'
import { relativeDayLabel, timeRange } from '../utils/dates'
import { StatusBadge } from './StatusBadge'
import { ChangeDisplay } from './ChangeDisplay'
import { IconArrowRight } from './icons'

/**
 * HeroActionCard — the single most prominent card on My Actions.
 * Kept deliberately simple: it is a briefing, not an audit report.
 */
export function HeroActionCard({ event }: { event: MyWeekEvent }) {
  const change = event.changes[0]
  const role = event.roleByEmployee[CURRENT_USER.id]
  const updatedTime = new Date(event.lastUpdated).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <article className="card overflow-hidden border-action-border/60 shadow-cardhover">
      <div className="h-1.5 w-full bg-action-fg/80" aria-hidden />
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <StatusBadge status={event.status} />
            <h2 className="mt-3 text-2xl font-bold text-ink">{event.title}</h2>
            <p className="mt-1 text-sm font-medium text-ink-muted">
              {relativeDayLabel(event.date)} ·{' '}
              {timeRange(event.startTime, event.endTime)}
            </p>
          </div>
        </div>

        {change && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {change.label}
            </div>
            <div className="mt-1.5">
              <ChangeDisplay change={change} size="lg" />
            </div>
          </div>
        )}

        <p className="mt-5 text-base font-semibold text-ink">
          {role === 'Tour Lead' ? "You're the Tour Lead." : role ? `You're listed as ${role}.` : ''}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Attendance increased since yesterday and may affect your preparation.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to={`/events/${event.id}`} className="btn-primary">
            Review change
            <IconArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link to={`/events/${event.id}`} className="btn-ghost">
            View original event
          </Link>
          <span className="ml-auto text-xs text-ink-soft">
            Updated from {change?.source.system ?? 'Airtable'} · {updatedTime}
          </span>
        </div>
      </div>
    </article>
  )
}
