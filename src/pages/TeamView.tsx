import { Link } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { getMember } from '../data/team'
import { IconAlert, IconUsers } from '../components/icons'

/**
 * SCREEN 3 — TEAM VIEW.
 *
 * Deliberately simple. Shared operational context grounded in authorized
 * source information, grouped by location. Includes one carefully-labeled
 * coverage alert that surfaces *missing* data without over-claiming.
 */

interface TeamRow {
  memberId: string
  event: string
  role: string
  time: string
}

interface TeamGroup {
  location: string
  rows: TeamRow[]
}

const GROUPS: TeamGroup[] = [
  {
    location: 'MCTEC',
    rows: [
      {
        memberId: 'sarah',
        event: 'ASU MCTEC Tour',
        role: 'Tour Lead',
        time: '10:00 AM',
      },
      {
        memberId: 'james',
        event: 'High School Tour',
        role: 'Support',
        time: '1:00 PM',
      },
    ],
  },
  {
    location: 'Phoenix Library',
    rows: [
      {
        memberId: 'maria',
        event: 'Community Outreach',
        role: 'Lead',
        time: '2:00 PM',
      },
      {
        memberId: 'alex',
        event: 'Community Outreach',
        role: 'Support',
        time: '2:00 PM',
      },
    ],
  },
  {
    location: 'Office',
    rows: [
      {
        memberId: 'rebecca',
        event: 'Outreach Planning',
        role: '',
        time: '',
      },
    ],
  },
]

export function TeamView() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <IconUsers className="h-5 w-5 text-brand-600" aria-hidden />
          Team Today
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Shared operational context from information you're authorized to see.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {GROUPS.map((group) => (
          <section key={group.location} className="card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {group.location}
            </h3>
            <ul className="mt-3 space-y-3">
              {group.rows.map((row, i) => {
                const member = getMember(row.memberId)
                if (!member) return null
                return (
                  <li key={i} className="flex items-center gap-3">
                    <Avatar
                      initials={member.initials}
                      name={member.name}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-ink">
                        {member.name}
                      </div>
                      <div className="text-xs text-ink-muted">
                        {row.event}
                        {row.role ? ` · ${row.role}` : ''}
                      </div>
                    </div>
                    {row.time && (
                      <span className="shrink-0 text-xs font-medium text-ink-soft">
                        {row.time}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* Operational alert — carefully labeled */}
      <section className="rounded-2xl border border-changed-border bg-changed-bg/60 p-5">
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-changed-bg text-changed-fg"
            aria-hidden
          >
            <IconAlert className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-ink">
              Coverage to review · 3:00 PM MCTEC Tour
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              No support assignment found in available source information.
            </p>
            <p className="mt-2 text-xs italic text-ink-soft">
              MyWeek flags that the data may be incomplete — it does not claim
              nobody is covering this event.
            </p>
            <Link
              to="/trust/uncertainty"
              className="btn-secondary mt-3 px-3 py-1.5 text-sm"
            >
              How MyWeek handles uncertainty
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
