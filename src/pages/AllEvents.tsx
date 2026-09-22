import { getAllEvents } from '../services/dataStore'
import { CURRENT_USER } from '../data/team'
import { EventRow } from '../components/EventCard'
import { IconShield, IconCalendar } from '../components/icons'

/**
 * ALL EVENTS — the full authorized list, proving "rank, never hide".
 * Events are ordered by relevance but nothing is removed.
 */
export function AllEvents() {
  const all = getAllEvents()
  const mine = all.filter((e) => e.assignedEmployees.includes(CURRENT_USER.id))
  const others = all.filter(
    (e) => !e.assignedEmployees.includes(CURRENT_USER.id),
  )

  return (
    <div className="space-y-6">
      <header>
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <IconCalendar className="h-5 w-5 text-brand-600" aria-hidden />
          All Events
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Every event you're authorized to see, ranked by relevance. MyWeek
          ranks — it never hides.
        </p>
      </header>

      <section className="card p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Your events ({mine.length})
        </h3>
        <div className="mt-3 space-y-2">
          {mine.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Other team events you can see ({others.length})
          </h3>
          <div className="mt-3 space-y-2">
            {others.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-ink-soft">
        <IconShield className="h-4 w-4" aria-hidden />
        MyWeek ranks. It never hides.
      </p>
    </div>
  )
}
