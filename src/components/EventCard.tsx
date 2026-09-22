import { Link } from 'react-router-dom'
import type { MyWeekEvent } from '../data/types'
import { CURRENT_USER } from '../data/team'
import { relativeDayLabel, timeRange } from '../utils/dates'
import { StatusBadge } from './StatusBadge'
import { ChangeDisplay } from './ChangeDisplay'
import { IconArrowRight, IconClock } from './icons'

/**
 * EventCard — the standard (non-hero) card used for the 2nd/3rd events and
 * lists. Communicates status, the user's involvement, and any change without
 * overwhelming the briefing.
 */

function roleLine(event: MyWeekEvent): string {
  const role = event.roleByEmployee[CURRENT_USER.id]
  if (role === 'Tour Lead') return "You're the Tour Lead."
  if (role === 'Copied for awareness') return "You're copied for awareness."
  if (role === 'Attendee') return "You're attending this event."
  if (role) return `You're listed as ${role}.`
  return 'No documented role found for you.'
}

function supportingText(event: MyWeekEvent): string {
  switch (event.status) {
    case 'CHANGED':
      return 'No documented action required.'
    case 'FYI':
      return 'No action currently identified.'
    case 'ROLE_NOT_SPECIFIED':
      return 'MyWeek could not determine your responsibility from the available source information.'
    default:
      return ''
  }
}

export function EventCard({
  event,
  emphasis = 'normal',
}: {
  event: MyWeekEvent
  emphasis?: 'normal' | 'muted'
}) {
  const primaryChange = event.changes[0]
  const detailHref = `/events/${event.id}`

  return (
    <article
      className={`card p-5 transition-shadow hover:shadow-cardhover ${
        emphasis === 'muted' ? 'bg-white/70' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-ink">
            {event.title}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-muted">
            <IconClock className="h-4 w-4 text-ink-soft" aria-hidden />
            {relativeDayLabel(event.date)} ·{' '}
            {timeRange(event.startTime, event.endTime)}
          </p>
        </div>
        <StatusBadge status={event.status} size="sm" />
      </div>

      {primaryChange && (
        <div className="mt-3">
          <ChangeDisplay change={primaryChange} size="sm" />
        </div>
      )}

      <p className="mt-3 text-sm font-medium text-ink">{roleLine(event)}</p>
      {supportingText(event) && (
        <p className="mt-1 text-sm text-ink-muted">{supportingText(event)}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-ink-soft">
          {event.source.join(' · ')}
          {event.status === 'CHANGED' ? ' · Updated yesterday' : ''}
        </span>
        <Link to={detailHref} className="btn-ghost px-3 py-1.5 text-sm">
          View details
          <IconArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

/** Compact single-line row used in the "Other events" list. */
export function EventRow({ event }: { event: MyWeekEvent }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:bg-slate-50"
    >
      <div className="flex min-w-0 items-center gap-3">
        <StatusBadge status={event.status} size="sm" />
        <span className="truncate text-sm font-medium text-ink">
          {event.title}
        </span>
      </div>
      <span className="shrink-0 text-xs text-ink-soft">
        {relativeDayLabel(event.date)} · {event.startTime}
      </span>
    </Link>
  )
}
