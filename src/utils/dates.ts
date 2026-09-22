import { TODAY } from '../data/events'

/** Parse an ISO date string ("2026-09-23") into a local Date at midnight. */
export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const TODAY_DATE = parseISO(TODAY)

function dayDiff(iso: string): number {
  const target = parseISO(iso)
  const ms = target.getTime() - TODAY_DATE.getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

/**
 * Friendly relative label used across cards:
 * "Today", "Tomorrow", or e.g. "Thursday", "Mon, Sep 28".
 */
export function relativeDayLabel(iso: string): string {
  const diff = dayDiff(iso)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  const date = parseISO(iso)
  if (diff > 1 && diff < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/** Full date, e.g. "Tuesday, September 22, 2026". */
export function fullDate(iso: string): string {
  return parseISO(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Time range display, e.g. "10:00 AM – 11:30 AM". */
export function timeRange(start: string, end?: string): string {
  return end ? `${start} – ${end}` : start
}
