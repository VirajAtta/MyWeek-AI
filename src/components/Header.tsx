import { NavLink } from 'react-router-dom'
import { CURRENT_USER } from '../data/team'
import { TODAY } from '../data/events'
import { fullDate } from '../utils/dates'
import { Avatar } from './Avatar'
import { IconAlert, IconUsers, IconChat } from './icons'

/**
 * Top header with the current date and the logged-in user area
 * (Sarah Martinez · Outreach Coordinator · SM avatar). The personalized
 * "Good morning, Sarah" greeting lives on the My Actions homepage only —
 * it is not duplicated here. Also carries a compact primary nav for small
 * screens where the sidebar is hidden.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-ink sm:text-base">
            {fullDate(TODAY)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-semibold text-ink">
              {CURRENT_USER.name}
            </div>
            <div className="text-xs text-ink-soft">{CURRENT_USER.title}</div>
          </div>
          <Avatar
            initials={CURRENT_USER.initials}
            name={CURRENT_USER.name}
            size="lg"
          />
        </div>
      </div>

      {/* Compact primary nav for mobile (sidebar hidden below md) */}
      <nav
        aria-label="Primary (compact)"
        className="flex gap-1 border-t border-slate-200 px-3 py-2 md:hidden"
      >
        {[
          { to: '/', label: 'My Actions', Icon: IconAlert, end: true },
          { to: '/team', label: 'Team', Icon: IconUsers },
          { to: '/ask', label: 'Ask', Icon: IconChat },
        ].map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-ink-muted hover:bg-slate-100',
              ].join(' ')
            }
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
