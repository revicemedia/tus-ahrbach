import PersonCard from '@/components/people/PersonCard'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getPeopleByGroup } from '@/lib/cms'
import type { PeopleBlock } from '@/lib/cms/types'

export default async function People({ block }: { block: PeopleBlock }) {
  const people = await getPeopleByGroup(block.group)
  if (people.length === 0) return null

  return (
    <Section>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} text={block.text} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.id}>
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
