import { RAW_EVENTS, TODAY } from '../data/events'
import type { EventStatus, MyWeekEvent } from '../data/types'
import { CURRENT_USER } from '../data/team'
import { withComputedChanges } from './changeEngine'

/**
 * Read-only data store.
 *
 * Hydrates the synthetic events with deterministically-computed changes and
 * exposes selectors. Nothing here mutates authoritative source records —
 * MyWeek is an intelligence layer, not a system of record.
 */

const EVENTS: MyWeekEvent[] = RAW_EVENTS.map(withComputedChanges)

/** Relevance rank for ordering "what matters" first. Lower = higher priority. */
const STATUS_RANK: Record<EventStatus, number> = {
  ACTION_REQUIRED: 0,
  SOURCE_CONFLICT: 1,
  CHANGED: 2,
  ROLE_NOT_SPECIFIED: 3,
  UNTRUSTED_CONTENT: 4,
  FYI: 5,
}

export function getAllEvents(): MyWeekEvent[] {
  return [...EVENTS].sort((a, b) => {
    const byStatus = STATUS_RANK[a.status] - STATUS_RANK[b.status]
    if (byStatus !== 0) return byStatus
    return a.date.localeCompare(b.date)
  })
}

export function getEventById(id: string): MyWeekEvent | undefined {
  return EVENTS.find((e) => e.id === id)
}

/** Events the current user is assigned to. */
export function getMyEvents(): MyWeekEvent[] {
  return getAllEvents().filter((e) =>
    e.assignedEmployees.includes(CURRENT_USER.id),
  )
}

export function getEventsForEmployee(employeeId: string): MyWeekEvent[] {
  return getAllEvents().filter((e) =>
    e.assignedEmployees.includes(employeeId),
  )
}

/** The single most important event for the hero card. */
export function getHeroEvent(): MyWeekEvent | undefined {
  return getMyEvents().find((e) => e.status === 'ACTION_REQUIRED')
}

export interface ActionSummary {
  actionRequired: number
  changes: number
  relevantThisWeek: number
  otherEvents: number
}

/**
 * Summary counts for the My Actions header row.
 * "Relevant this week" = the user's assigned events dated within the current
 * week window. "Other events" = everything else the user is authorized to see
 * (available, never hidden).
 */
export function getActionSummary(): ActionSummary {
  const mine = getMyEvents()
  const all = getAllEvents()

  // Events the user must act on.
  const actionRequired = mine.filter(
    (e) => e.status === 'ACTION_REQUIRED',
  ).length

  // Every one of the user's events with a deterministically-detected change
  // (the hero attendance change + the Phoenix Library room change = 2).
  const changes = mine.filter((e) => e.changes.length > 0).length

  // Relevant this week = the user's assigned events dated within the current
  // work-week window (Mon Sep 21 – Sat Sep 26, 2026 relative to synthetic today).
  const weekStart = '2026-09-21'
  const weekEnd = '2026-09-26'
  const relevantThisWeek = mine.filter(
    (e) => e.date >= weekStart && e.date <= weekEnd,
  ).length

  // Other events available (never hidden) = all authorized events the user is
  // NOT already counting among the relevant-this-week set.
  const otherEvents = all.length - relevantThisWeek

  return { actionRequired, changes, relevantThisWeek, otherEvents }
}

export { TODAY }
