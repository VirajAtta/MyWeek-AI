import { Link } from 'react-router-dom'
import { getEventById } from '../services/dataStore'
import { handleUntrustedContent } from '../services/aiService'
import {
  IconShield,
  IconAlert,
  IconLock,
  IconArrowRight,
} from '../components/icons'
import type { ReactNode } from 'react'

/**
 * "How MyWeek Handles Uncertainty" — the three safety demonstrations, shown
 * inline so a reviewer can see the behavior without hunting through events.
 * Each links to the corresponding event detail page for the full treatment.
 */

function SafetyScenario({
  n,
  title,
  badge,
  children,
  eventId,
  eventLabel,
}: {
  n: number
  title: string
  badge: string
  children: ReactNode
  eventId: string
  eventLabel: string
}) {
  return (
    <section className="card p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
          {n}
        </span>
        <span className="chip bg-slate-100 text-ink-muted border border-slate-200 uppercase tracking-wide">
          <IconShield className="h-3.5 w-3.5" aria-hidden />
          {badge}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-ink">{title}</h3>
      <div className="mt-3">{children}</div>
      <Link
        to={`/events/${eventId}`}
        className="btn-secondary mt-4 px-3 py-1.5 text-sm"
      >
        {eventLabel}
        <IconArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  )
}

export function Uncertainty() {
  const conflict = getEventById('community-partner-meeting')?.conflict
  const untrusted = handleUntrustedContent()
  const untrustedNote = getEventById('external-partner-briefing')?.untrustedNote

  return (
    <div className="space-y-6">
      <Link
        to="/trust"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <IconArrowRight className="h-4 w-4 rotate-180" aria-hidden />
        Back to About / Trust
      </Link>

      <header>
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <IconShield className="h-5 w-5 text-brand-600" aria-hidden />
          How MyWeek Handles Uncertainty
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          Responsible AI exposes what it doesn't know. These synthetic scenarios
          show MyWeek surfacing uncertainty instead of guessing.
        </p>
      </header>

      {/* Scenario 1 — Missing role */}
      <SafetyScenario
        n={1}
        badge="Role not specified"
        title="Missing role"
        eventId="high-school-mctec-tour"
        eventLabel="View original event"
      >
        <div className="rounded-xl border border-fyi-border bg-fyi-bg/60 p-4">
          <div className="flex items-center gap-2 text-fyi-fg">
            <IconAlert className="h-4 w-4" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Role not specified
            </span>
          </div>
          <p className="mt-2 text-sm text-ink">
            MyWeek could not determine your responsibility from the available
            source information.
          </p>
          <p className="mt-1 text-xs italic text-ink-soft">
            MyWeek does not infer that you are the Tour Lead.
          </p>
        </div>
      </SafetyScenario>

      {/* Scenario 2 — Source conflict */}
      <SafetyScenario
        n={2}
        badge="Source conflict"
        title="Conflicting source information"
        eventId="community-partner-meeting"
        eventLabel="Open original event"
      >
        <div className="rounded-xl border border-changed-border bg-changed-bg/50 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {conflict?.values.map((v) => (
              <div
                key={v.source}
                className="rounded-lg border border-slate-200 bg-white p-3"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {v.source}
                </div>
                <div className="mt-0.5 text-base font-bold text-ink">
                  {v.value}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink">
            MyWeek found conflicting source information and cannot verify which
            location is correct.
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
            <IconLock className="h-4 w-4" aria-hidden />
            Authoritative scheduling source:{' '}
            <strong className="text-ink">
              {conflict?.authoritativeSource}
            </strong>
          </div>
        </div>
      </SafetyScenario>

      {/* Scenario 3 — Prompt injection */}
      <SafetyScenario
        n={3}
        badge="Untrusted content"
        title="Prompt injection in event content"
        eventId="external-partner-briefing"
        eventLabel="View original event"
      >
        <div className="rounded-xl border border-changed-border bg-changed-bg/50 p-4">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              External event note (untrusted)
            </div>
            <p className="mt-1 font-mono text-sm text-ink-muted">
              “{untrustedNote}”
            </p>
          </div>
          <p className="mt-3 text-sm text-ink">{untrusted.message}</p>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-ok-bg px-3 py-2 border border-ok-border">
            <IconLock className="h-4 w-4 text-ok-fg" aria-hidden />
            <span className="text-sm text-ok-fg">
              <strong>Permissions unchanged.</strong> No additional events became
              available ({untrusted.visibleEventsBefore} →{' '}
              {untrusted.visibleEventsAfter}).
            </span>
          </div>
        </div>
      </SafetyScenario>

      {/* Rank never hide */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="flex items-center gap-2 text-base font-bold text-ink">
          <IconShield className="h-5 w-5 text-brand-600" aria-hidden />
          Rank, never hide.
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          MyWeek prioritizes information to help employees focus, but it never
          removes authorized source information based on an AI relevance
          judgment.
        </p>
        <Link to="/events" className="btn-ghost mt-3 px-3 py-1.5 text-sm">
          See all authorized events
          <IconArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </div>
  )
}
