import type { TeamMember } from './types'

/**
 * Synthetic team members. Avatars are initials-based only — no photographs.
 */
export const TEAM: TeamMember[] = [
  {
    id: 'sarah',
    name: 'Sarah Martinez',
    title: 'Outreach Coordinator',
    initials: 'SM',
  },
  {
    id: 'james',
    name: 'James Lee',
    title: 'Outreach Specialist',
    initials: 'JL',
  },
  {
    id: 'maria',
    name: 'Maria Chen',
    title: 'Community Engagement Specialist',
    initials: 'MC',
  },
  {
    id: 'alex',
    name: 'Alex Johnson',
    title: 'Outreach Specialist',
    initials: 'AJ',
  },
  {
    id: 'rebecca',
    name: 'Rebecca Wilson',
    title: 'Outreach Coordinator',
    initials: 'RW',
  },
]

/** The logged-in demo user. */
export const CURRENT_USER = TEAM[0]

export function getMember(id: string): TeamMember | undefined {
  return TEAM.find((m) => m.id === id)
}
