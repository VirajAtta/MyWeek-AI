import type { FeedbackEntry } from '../data/types'

/**
 * Local feedback store for the prototype. Persists thumbs up/down and reasons
 * to localStorage so nothing leaves the browser and no backend is required.
 */

const KEY = 'myweek.feedback.v1'

export function recordFeedback(entry: Omit<FeedbackEntry, 'id' | 'createdAt'>): void {
  const all = getFeedback()
  all.push({
    ...entry,
    id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  })
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // Non-fatal for the prototype.
  }
}

export function getFeedback(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as FeedbackEntry[]) : []
  } catch {
    return []
  }
}
