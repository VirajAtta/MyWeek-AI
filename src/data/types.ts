/**
 * MyWeek AI — Domain types
 *
 * These types model an intelligence layer that sits READ-ONLY on top of
 * existing operational systems (Outlook + Airtable). Nothing here mutates
 * authoritative records; MyWeek only interprets authorized information.
 */

export type SourceSystem = 'Outlook' | 'Airtable'

/** A precise pointer back to where a fact came from. */
export interface SourceRef {
  system: SourceSystem
  /** e.g. "Event Assignment", "Event Notes", "Expected Attendance" */
  field?: string
}

/** Event status drives the whole "what needs my attention" ranking. */
export type EventStatus =
  | 'REVIEW_RECOMMENDED'
  | 'CHANGED'
  | 'FYI'
  | 'ROLE_NOT_SPECIFIED'
  | 'SOURCE_CONFLICT'
  | 'UNTRUSTED_CONTENT'

/** A documented fact retrieved directly from a source system. */
export interface DocumentedFact {
  label: string
  value: string
  source: SourceRef
}

/**
 * A point-in-time snapshot of the fields MyWeek watches for an event.
 * MyWeek stores BOTH the previous and current snapshot so change detection
 * is deterministic — the AI never "guesses" a prior value.
 */
export interface EventSnapshot {
  attendance?: number
  location?: string
  startTime?: string
  endTime?: string
  room?: string
  notes?: string
  capturedAt: string
}

/**
 * The result of deterministic comparison between two snapshots.
 * Produced by the change engine, NOT by AI.
 */
export interface DetectedChange {
  field: string
  label: string
  previousValue: string | number
  currentValue: string | number
  /** Present for numeric changes, e.g. +15 */
  delta?: number
  source: SourceRef
  detectedAt: string
}

/** A relationship between an employee and an event. */
export interface Assignment {
  employeeId: string
  /** null = invited/attending but no documented role */
  role: string | null
  source: SourceRef
}

/**
 * When Outlook and Airtable disagree, MyWeek surfaces the conflict rather
 * than silently resolving it.
 */
export interface SourceConflict {
  field: string
  label: string
  values: { source: SourceSystem; value: string }[]
  authoritativeSource: SourceSystem
}

export interface MyWeekEvent {
  id: string
  title: string
  /** ISO date, e.g. "2026-09-23" */
  date: string
  startTime: string
  endTime?: string
  location: string
  organization?: string
  attendees: number
  assignedEmployees: string[]
  /** Documented role per employee id (may be missing for some). */
  roleByEmployee: Record<string, string | null>
  notes?: string
  source: SourceSystem[]
  lastUpdated: string
  /** Operationally critical / high-priority event. */
  critical: boolean
  status: EventStatus

  previousSnapshot?: EventSnapshot
  currentSnapshot?: EventSnapshot
  /** Deterministically computed at load time from the two snapshots. */
  changes: DetectedChange[]

  /** Facts to display in the "Documented Information" section. */
  documentedFacts?: DocumentedFact[]

  /** Present only for source-conflict scenarios. */
  conflict?: SourceConflict

  /** Present only for prompt-injection / untrusted-content scenarios. */
  untrustedNote?: string

  /** Raw synthetic source records for the source drawer. */
  rawSources?: RawSourceRecord[]
}

export interface RawSourceRecord {
  system: SourceSystem
  /** e.g. "Airtable — Yesterday" */
  label: string
  fields: { key: string; value: string }[]
}

export interface TeamMember {
  id: string
  name: string
  title: string
  initials: string
}

/** Locally stored feedback for the prototype. */
export interface FeedbackEntry {
  id: string
  context: string
  helpful: boolean
  reason?: string
  createdAt: string
}
