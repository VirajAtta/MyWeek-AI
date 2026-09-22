import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import {
  IconAlert,
  IconUsers,
  IconChat,
  IconCalendar,
  IconShield,
} from './icons'

interface NavItem {
  to: string
  label: string
  icon: (p: { className?: string; 'aria-hidden'?: boolean }) => JSX.Element
  end?: boolean
}

const PRIMARY: NavItem[] = [
  { to: '/', label: 'My Actions', icon: IconAlert, end: true },
  { to: '/team', label: 'Team', icon: IconUsers },
  { to: '/ask', label: 'Ask MyWeek', icon: IconChat },
]

const SECONDARY: NavItem[] = [
  { to: '/events', label: 'All Events', icon: IconCalendar },
  { to: '/trust', label: 'About / Trust', icon: IconShield },
]

function NavLinkItem({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        [
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-brand-50 text-brand-700'
            : 'text-ink-muted hover:bg-slate-100 hover:text-ink',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            className={`h-[18px] w-[18px] ${isActive ? 'text-brand-600' : 'text-ink-soft group-hover:text-ink-muted'}`}
            aria-hidden
          />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm"
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path
            d="M8 22V10l4 6 4-6 4 6 4-6v12"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="leading-tight">
        <div className="font-bold text-ink">
          MyWeek <span className="text-brand-600">AI</span>
        </div>
        <div className="text-[11px] text-ink-soft">Operational awareness</div>
      </div>
    </div>
  )
}

function SidebarInner(): ReactNode {
  return (
    <div className="flex h-full flex-col">
      <div className="pt-5 pb-4">
        <Brand />
      </div>

      <nav aria-label="Primary" className="flex flex-col gap-1 px-3">
        {PRIMARY.map((item) => (
          <NavLinkItem key={item.to} item={item} />
        ))}
      </nav>

      <div className="mt-auto px-3 pb-5">
        <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          Reference
        </div>
        <nav aria-label="Secondary" className="flex flex-col gap-1">
          {SECONDARY.map((item) => (
            <NavLinkItem key={item.to} item={item} />
          ))}
        </nav>
        <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3 text-[11px] leading-relaxed text-ink-soft border border-slate-200/70">
          Read-only intelligence layer over Outlook + Airtable. Synthetic
          demo data.
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:shrink-0 md:flex-col border-r border-slate-200 bg-white">
      <SidebarInner />
    </aside>
  )
}
