import { Link } from 'react-router-dom'
import {
  getHeroEvent,
  getMyEvents,
  getActionSummary,
} from '../services/dataStore'
import { SummaryMetric } from '../components/SummaryMetric'
import { HeroActionCard } from '../components/HeroActionCard'
import { EventCard, EventRow } from '../components/EventCard'
import { IconArrowRight, IconShield } from '../components/icons'

/**
 * SCREEN 1 — MY ACTIONS (hero screen).
 *
 * Communicates within seconds: MyWeek doesn't show another calendar — it shows
 * what may need Sarah's attention. Ranks by relevance, never hides events.
 */
export function MyActions() {
  const hero = getHeroEvent()
  const summary = getActionSummary()
  const mine = getMyEvents()

  const secondEvent = mine.find((e) => e.id === 'phoenix-library-outreach')
  const thirdEvent = mine.find((e) => e.id === 'community-info-session')

  const otherEvents = mine.filter(
    (e) =>
      e.id !== hero?.id &&
      e.id !== secondEvent?.id &&
      e.id !== thirdEvent?.id,
  )

  return (
    <div className="space-y-8">
      {/* Intro */}
      <section>
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
          Turn your calendar into an action plan.
        </p>
        <h2 className="mt-1 text-xl font-bold text-ink">Good morning, Sarah</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Here's what changed and what may need your attention.
        </p>
      </section>

      {/* Summary row */}
      <section aria-label="This week at a glance">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryMetric
            value={summary.reviewRecommended}
            label="Review Recommended"
            tone="action"
          />
          <SummaryMetric value={summary.changes} label="Changes" tone="changed" />
          <SummaryMetric
            value={summary.relevantThisWeek}
            label="Relevant This Week"
            tone="relevant"
          />
          <SummaryMetric
            value={summary.otherEvents}
            label="Other Events Available"
          />
        </div>
        <div className="mt-2 flex justify-end">
          <Link to="/events" className="btn-ghost px-2 py-1 text-xs">
            View all events
            <IconArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Hero event */}
      {hero && (
        <section aria-label="Top priority">
          <HeroActionCard event={hero} />
        </section>
      )}

      {/* Second + third events */}
      <section aria-label="More that may be relevant" className="space-y-4">
        {secondEvent && <EventCard event={secondEvent} />}
        {thirdEvent && <EventCard event={thirdEvent} emphasis="muted" />}
      </section>

      {/* Other events */}
      <section aria-label="Other events" className="card p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-ink">Other Events</h3>
            <p className="mt-1 max-w-2xl text-sm text-ink-muted">
              MyWeek ranks events by relevance but never removes events you are
              authorized to see.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {otherEvents.slice(0, 3).map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
            <IconShield className="h-4 w-4" aria-hidden />
            MyWeek ranks. It never hides.
          </span>
          <Link to="/events" className="btn-secondary px-3 py-1.5 text-sm">
            View all events
            <IconArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
