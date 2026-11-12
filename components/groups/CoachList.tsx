import PersonCard from '@/components/people/PersonCard'
import type { Coach } from '@/lib/cms/types'
import { coachLabel, groupCoaches } from '@/lib/format'

// Trainerteam einer Mannschaft. Bei mehreren Teams (D1, D2, …) je Team eine eigene Zeile.
export default function CoachList({ coaches }: { coaches: Coach[] }) {
  const squads = groupCoaches(coaches)
  const showSquads = squads.length > 1 || squads[0]?.squad

  return (
    <div className="space-y-8">
      {squads.map((entry) => (
        <div key={entry.squad ?? 'team'}>
          {showSquads && entry.squad && <h3 className="mb-3 text-sm font-extrabold tracking-[0.15em] text-navy uppercase">{entry.squad}</h3>}
          <ul className="grid gap-4 sm:grid-cols-2">
            {entry.coaches.map((coach) => (
              <li key={coach.name + coach.role}>
                <PersonCard person={{ ...coach, role: coachLabel(coach) }} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
