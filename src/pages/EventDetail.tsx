import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEventById } from '../services/dataStore'
import {
  interpretChange,
  explainRelevance,
  handleUntrustedContent,
} from '../services/aiService'
import { CURRENT_USER } from '../data/team'
import { relativeDayLabel, timeRange } from '../utils/dates'
import { StatusBadge } from '../components/StatusBadge'
import { SourceBadge } from '../components/SourceBadge'
import { ChangeDisplay } from '../components/ChangeDisplay'
import { SourceDrawer } from '../components/SourceDrawer'
import { FeedbackWidget } from '../components/FeedbackWidget'
import {
  DetectedChangeKicker,
  AIInterpretationKicker,
  SuggestionKicker,
  SourceFactKicker,
  AdvisoryNote,
} from '../components/Labels'
import {
  IconArrowRight,
  IconDoc,
  IconLock,
  IconShield,
  IconAlert,
  IconLocation,
  IconClock,
} from '../components/icons'
import type { MyWeekEvent } from '../data/types'

/**
 * SCREEN 2 — EVENT INTELLIGENCE / REVIEW CHANGE.
 *
 * The page adapts to the event's status. For the hero (REVIEW_RECOMMENDED) it
 * shows the full change-intelligence flow. For safety scenarios it shows the
 * appropriate uncertainty / conflict / untrusted-content treatment.
 */
export function EventDetail() {
  const { id } = useParams()
  const event = id ? getEventById(id) : undefined
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (!event) {
    return (
      <div className="card p-8 text-center">
        <p className="text-ink-muted">Event not found.</p>
        <Link to="/" className="btn-ghost mt-4">
          Back to My Actions
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <IconArrowRight className="h-4 w-4 rotate-180" aria-hidden />
        Back to My Actions
      </Link>

      {/* Header */}
      <header className="card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <StatusBadge status={event.status} />
            <h2 className="mt-3 text-2xl font-bold text-ink">{event.title}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
              <IconClock className="h-4 w-4 text-ink-soft" aria-hidden />
              {relativeDayLabel(event.date)} ·{' '}
              {timeRange(event.startTime, event.endTime)}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
              <IconLocation className="h-4 w-4 text-ink-soft" aria-hidden />
              {event.location}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="btn-secondary"
          >
            <IconDoc className="h-4 w-4" aria-hidden />
            View source information
          </button>
        </div>
      </header>

      {/* Status-specific body */}
      {event.status === 'ROLE_NOT_SPECIFIED' && <MissingRole event={event} />}
      {event.status === 'SOURCE_CONFLICT' && <SourceConflictView event={event} />}
      {event.status === 'UNTRUSTED_CONTENT' && (
        <UntrustedContentView event={event} />
      )}

      {event.changes.length > 0 && <WhatChanged event={event} />}
      {event.changes.length > 0 && <WhyThisMayMatter event={event} />}

      {/* Documented information (facts) — for standard events */}
      {event.documentedFacts && event.documentedFacts.length > 0 && (
        <DocumentedInformation event={event} />
      )}

      {/* Suggestion (only when interpretation produced one) */}
      {event.changes.length > 0 && <SuggestionSection event={event} />}

      {/* Relevance note when there is no change to interpret */}
      {event.changes.length === 0 &&
        event.status !== 'ROLE_NOT_SPECIFIED' &&
        event.status !== 'SOURCE_CONFLICT' &&
        event.status !== 'UNTRUSTED_CONTENT' && (
          <section className="card p-6">
            <AIInterpretationKicker />
            <p className="mt-3 text-ink">{explainRelevance(event)}</p>
            <FeedbackWidget context={`relevance:${event.id}`} />
          </section>
        )}

      <SourceDrawer
        event={event}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}

/* ── Sections ─────────────────────────────────────────────────────────── */

function WhatChanged({ event }: { event: MyWeekEvent }) {
  const change = event.changes[0]
  const updated = new Date(change.detectedAt).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  const prevSnap = event.previousSnapshot
  return (
    <section className="card overflow-hidden">
      <div className="h-1 w-full bg-slate-300" aria-hidden />
      <div className="p-6">
        <DetectedChangeKicker />
        <h3 className="mt-3 text-lg font-bold text-ink">What changed</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Yesterday
            </div>
            <div className="mt-1 text-xl font-bold text-ink-muted">
              {change.previousValue}
              {change.field === 'attendance' ? ' attendees' : ''}
            </div>
            {prevSnap && (
              <div className="mt-1 text-[11px] text-ink-soft">
                Snapshot captured{' '}
                {new Date(prevSnap.capturedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            )}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Today
            </div>
            <div className="mt-1 text-xl font-bold text-ink">
              {change.currentValue}
              {change.field === 'attendance' ? ' attendees' : ''}
            </div>
          </div>
          <div className="rounded-xl border border-changed-border bg-changed-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-changed-fg/80">
              Detected difference
            </div>
            <div className="mt-2">
              <ChangeDisplay change={change} size="sm" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <SourceBadge source={change.source} />
          <span className="text-xs text-ink-soft">Updated: Today at {updated}</span>
        </div>
        <p className="mt-3 text-xs italic text-ink-soft">
          This change detection is deterministic, not AI-generated. MyWeek
          compared yesterday's and today's snapshots directly.
        </p>
      </div>
    </section>
  )
}

function WhyThisMayMatter({ event }: { event: MyWeekEvent }) {
  const change = event.changes[0]
  const result = interpretChange(event, change)
  return (
    <section className="card border-brand-100 p-6">
      <AIInterpretationKicker />
      <h3 className="mt-3 text-lg font-bold text-ink">Why this may matter</h3>
      <p className="mt-2 text-ink">{result.interpretation}</p>

      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Why MyWeek thinks this
        </div>
        <ul className="mt-2 space-y-2">
          {result.reasons.map((reason, i) => (
            <li
              key={i}
              className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 px-3 py-2"
            >
              <span className="text-sm text-ink">{reason.text}</span>
              <span className="ml-auto">
                <SourceBadge source={reason.source} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <FeedbackWidget context={`interpretation:${event.id}`} />
    </section>
  )
}

function DocumentedInformation({ event }: { event: MyWeekEvent }) {
  return (
    <section className="card p-6">
      <SourceFactKicker>Documented information</SourceFactKicker>
      <h3 className="mt-3 text-lg font-bold text-ink">Documented information</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Facts retrieved directly from source systems — distinct from AI
        interpretation.
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {event.documentedFacts!.map((fact, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-ink">
              {fact.value}
            </dd>
            <div className="mt-2">
              <SourceBadge source={fact.source} />
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}

function SuggestionSection({ event }: { event: MyWeekEvent }) {
  const change = event.changes[0]
  const result = interpretChange(event, change)
  if (!result.suggestion) return null
  return (
    <section className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-6">
      <SuggestionKicker />
      <h3 className="mt-3 text-lg font-bold text-ink">MyWeek Suggestion</h3>
      <p className="mt-2 text-ink">{result.suggestion}</p>
      <AdvisoryNote>
        AI-generated suggestion — not an instruction from your supervisor.
      </AdvisoryNote>
      <FeedbackWidget context={`suggestion:${event.id}`} />
    </section>
  )
}

/* ── Safety scenario views ────────────────────────────────────────────── */

function MissingRole({ event }: { event: MyWeekEvent }) {
  return (
    <section className="card border-fyi-border p-6">
      <div className="flex items-center gap-2">
        <span className="chip bg-fyi-bg text-fyi-fg border border-fyi-border uppercase tracking-wide">
          <IconAlert className="h-3.5 w-3.5" aria-hidden />
          Role not specified
        </span>
      </div>
      <p className="mt-3 text-ink">
        MyWeek could not determine your responsibility from the available source
        information.
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        You are invited to <strong>{event.title}</strong>, but no role is
        documented for {CURRENT_USER.name} in Outlook or Airtable. MyWeek does
        not infer a role that isn't in the source records.
      </p>
      <div className="mt-4">
        <Link to={`/events/${event.id}`} className="btn-secondary">
          View original event
        </Link>
      </div>
    </section>
  )
}

function SourceConflictView({ event }: { event: MyWeekEvent }) {
  const conflict = event.conflict!
  return (
    <section className="card border-changed-border p-6">
      <div className="flex items-center gap-2">
        <span className="chip bg-changed-bg text-changed-fg border border-changed-border uppercase tracking-wide">
          <IconShield className="h-3.5 w-3.5" aria-hidden />
          Source conflict
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-ink">
        Conflicting {conflict.label.toLowerCase()} information
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {conflict.values.map((v) => (
          <div
            key={v.source}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {v.source}
            </div>
            <div className="mt-1 text-lg font-bold text-ink">{v.value}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink">
        MyWeek found conflicting source information and cannot verify which{' '}
        {conflict.label.toLowerCase()} is correct.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
        <IconLock className="h-4 w-4 text-ink-muted" aria-hidden />
        <span className="text-sm text-ink-muted">
          Authoritative scheduling source:{' '}
          <strong className="text-ink">{conflict.authoritativeSource}</strong>
        </span>
      </div>
      <p className="mt-3 text-xs italic text-ink-soft">
        MyWeek does not silently resolve the conflict — a human decides.
      </p>
      <div className="mt-4">
        <Link to={`/events/${event.id}`} className="btn-secondary">
          Open original event
        </Link>
      </div>
    </section>
  )
}

function UntrustedContentView({ event }: { event: MyWeekEvent }) {
  const result = handleUntrustedContent()
  return (
    <section className="card border-changed-border p-6">
      <div className="flex items-center gap-2">
        <span className="chip bg-changed-bg text-changed-fg border border-changed-border uppercase tracking-wide">
          <IconShield className="h-3.5 w-3.5" aria-hidden />
          Untrusted event content detected
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-ink">
        Event content is treated as data
      </h3>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          External event note (imported, untrusted)
        </div>
        <p className="mt-1 font-mono text-sm text-ink-muted">
          “{event.untrustedNote}”
        </p>
      </div>
      <p className="mt-4 text-sm text-ink">{result.message}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-ok-bg px-4 py-3 border border-ok-border">
        <IconLock className="h-4 w-4 text-ok-fg" aria-hidden />
        <span className="text-sm text-ok-fg">
          <strong>Permissions unchanged.</strong> Visible events before:{' '}
          {result.visibleEventsBefore} · after: {result.visibleEventsAfter}. No
          additional events or information became available.
        </span>
      </div>
    </section>
  )
}
