import type {
  DetectedChange,
  EventSnapshot,
  MyWeekEvent,
  SourceRef,
} from '../data/types'

/**
 * Deterministic change engine.
 *
 * MyWeek does NOT use AI for simple field comparison. This pure utility
 * compares a previous snapshot with a current snapshot and returns the
 * detected differences. The AI layer only ever RECEIVES these results.
 */

interface WatchedField {
  key: keyof EventSnapshot
  label: string
  /** Which source system this field is authoritatively read from. */
  source: SourceRef
  numeric?: boolean
}

const WATCHED_FIELDS: WatchedField[] = [
  {
    key: 'attendance',
    label: 'Attendance',
    source: { system: 'Airtable', field: 'Expected Attendance' },
    numeric: true,
  },
  { key: 'room', label: 'Room', source: { system: 'Outlook' } },
  { key: 'location', label: 'Location', source: { system: 'Outlook' } },
  { key: 'startTime', label: 'Start time', source: { system: 'Outlook' } },
  { key: 'endTime', label: 'End time', source: { system: 'Outlook' } },
  {
    key: 'notes',
    label: 'Notes',
    source: { system: 'Airtable', field: 'Event Notes' },
  },
]

/**
 * Compare two snapshots and return the list of detected changes.
 * Returns an empty array when there is nothing to compare.
 */
export function detectChanges(
  previous: EventSnapshot | undefined,
  current: EventSnapshot | undefined,
): DetectedChange[] {
  if (!previous || !current) return []

  const changes: DetectedChange[] = []

  for (const field of WATCHED_FIELDS) {
    const prevValue = previous[field.key]
    const currValue = current[field.key]

    // Only report a change when both values exist and they differ.
    if (
      prevValue === undefined ||
      currValue === undefined ||
      prevValue === currValue
    ) {
      continue
    }

    const change: DetectedChange = {
      field: field.key,
      label: field.label,
      previousValue: prevValue as string | number,
      currentValue: currValue as string | number,
      source: field.source,
      detectedAt: current.capturedAt,
    }

    if (field.numeric) {
      change.delta = Number(currValue) - Number(prevValue)
    }

    changes.push(change)
  }

  return changes
}

/**
 * Attach deterministically computed changes to an event.
 * Called once when the data store hydrates.
 */
export function withComputedChanges(event: MyWeekEvent): MyWeekEvent {
  return {
    ...event,
    changes: detectChanges(event.previousSnapshot, event.currentSnapshot),
  }
}

/** Human-friendly delta string, e.g. "+15" or "-3". */
export function formatDelta(delta: number): string {
  return delta > 0 ? `+${delta}` : `${delta}`
}
