import type { EventStatus } from '../data/types'
import { IconAlert, IconSwap, IconInfo, IconShield } from './icons'

/**
 * StatusBadge — never relies on color alone.
 * Every status carries a color, an icon, AND a text label (accessibility).
 */

interface StatusMeta {
  label: string
  dot: string // emoji/text symbol as an extra non-color cue
  classes: string
  Icon: (p: { className?: string; 'aria-hidden'?: boolean }) => JSX.Element
}

const META: Record<EventStatus, StatusMeta> = {
  REVIEW_RECOMMENDED: {
    label: 'Review recommended',
    dot: '🔴',
    classes: 'bg-action-bg text-action-fg border border-action-border',
    Icon: IconAlert,
  },
  CHANGED: {
    label: 'Changed',
    dot: '🟡',
    classes: 'bg-changed-bg text-changed-fg border border-changed-border',
    Icon: IconSwap,
  },
  FYI: {
    label: 'FYI',
    dot: '⚪',
    classes: 'bg-fyi-bg text-fyi-fg border border-fyi-border',
    Icon: IconInfo,
  },
  ROLE_NOT_SPECIFIED: {
    label: 'Role not specified',
    dot: '⚪',
    classes: 'bg-fyi-bg text-fyi-fg border border-fyi-border',
    Icon: IconInfo,
  },
  SOURCE_CONFLICT: {
    label: 'Source conflict',
    dot: '🟡',
    classes: 'bg-changed-bg text-changed-fg border border-changed-border',
    Icon: IconShield,
  },
  UNTRUSTED_CONTENT: {
    label: 'Untrusted content',
    dot: '🟡',
    classes: 'bg-changed-bg text-changed-fg border border-changed-border',
    Icon: IconShield,
  },
}

export function StatusBadge({
  status,
  size = 'md',
}: {
  status: EventStatus
  size?: 'sm' | 'md'
}) {
  const meta = META[status]
  const pad = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
  return (
    <span
      className={`chip uppercase tracking-wide ${pad} ${meta.classes}`}
      role="status"
    >
      <span aria-hidden className="text-[10px] leading-none">
        {meta.dot}
      </span>
      <meta.Icon className="h-3.5 w-3.5" aria-hidden />
      <span>{meta.label}</span>
    </span>
  )
}

export function statusLabel(status: EventStatus): string {
  return META[status].label
}
