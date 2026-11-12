import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CallToAction from '@/components/blocks/CallToAction'
import Hero from '@/components/blocks/Hero'
import RenderBlocks from '@/components/blocks/RenderBlocks'
import GroupTile from '@/components/groups/GroupTile'
import Icon from '@/components/Icon/Icon'
import PersonCard from '@/components/people/PersonCard'
import RichText from '@/components/RichText/RichText'
import { Eyebrow, Section } from '@/components/ui/Section'
import { getDepartment, getDepartments, getGroups, getPeople } from '@/lib/cms'
import type { Group } from '@/lib/cms/types'

export async function generateStaticParams() {
  const departments = await getDepartments()
  return departments.map((department) => ({ abteilung: department.slug }))
}

export async function generateMetadata({ params }: PageProps<'/sport/[abteilung]'>): Promise<Metadata> {
  const { abteilung } = await params
  const department = await getDepartment(abteilung)
  if (!department) return {}
  return {
    title: department.name,
    description: `${department.name} im TuS Ahrbach: ${department.tagline} Alle Teams und Ansprechpartner.`,
    alternates: { canonical: `/sport/${department.slug}` },
  }
}

// Abteilungsseite: wird automatisch aus Abteilung und ihren Gruppen erzeugt
export default async function DepartmentPage({ params }: PageProps<'/sport/[abteilung]'>) {
  const { abteilung } = await params
  const department = await getDepartment(abteilung)
  if (!department) notFound()
  const [groups, leads] = await Promise.all([getGroups(department.slug), getPeople(department.leads)])

  // Gruppen in der Reihenfolge ihres ersten Auftretens nach Bereich bündeln
  const sections = groups.reduce<{ title: string; groups: Group[] }[]>((list, group) => {
    const section = list.find((entry) => entry.title === group.section)
    if (section) section.groups.push(group)
    else list.push({ title: group.section, groups: [group] })
    return list
  }, [])

  return (
    <>
      <Hero
        priority
        block={{
          id: 'hero',
          blockType: 'hero',
          variant: 'page',
          eyebrow: `Abteilung · ${groups.length} Teams & Gruppen`,
          title: department.name,
          text: department.tagline,
          image: department.image,
        }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Über die Abteilung</Eyebrow>
            <RichText content={department.intro} className="mt-4 text-lg/8" />
            {department.partnerships && (
              <div className="mt-10">
                <h2 className="text-xs font-semibold tracking-[0.2em] text-red uppercase">Spielgemeinschaften</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {department.partnerships.map((partnership) => (
                    <li key={partnership.name} className="border border-line p-4">
                      <p className="font-extrabold text-navy">{partnership.name}</p>
                      <p className="mt-1 text-sm text-slate-blue">{partnership.description}</p>
                      {partnership.link && (
                        <a href={partnership.link.href} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-red hover:text-navy">
                          {partnership.link.label}
                          <Icon name="open_in_new" className="size-4" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside>
            <h2 className="text-xs font-semibold tracking-[0.2em] text-red uppercase">Abteilungsleitung</h2>
            <ul className="mt-4 space-y-3">
              {leads.map((person) => (
                <li key={person.id}>
                  <PersonCard person={person} compact />
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {/* Sprungmarken zu den Bereichen */}
      <nav aria-label="Bereiche" className="sticky top-18 z-30 border-b border-line bg-white/95 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 lg:px-8">
          {sections.map((section) => (
            <li key={section.title}>
              <a href={`#${sectionId(section.title)}`} className="block px-3 py-3 text-sm font-semibold whitespace-nowrap text-navy uppercase transition-colors hover:text-red">
                {section.title}
                <span className="ml-1.5 text-slate-blue">{section.groups.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-paper">
        {sections.map((section) => (
          <section key={section.title} id={sectionId(section.title)} className="scroll-mt-32">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase">{section.title}</h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.groups.map((group) => (
                  <li key={group.slug}>
                    <GroupTile group={group} fallbackIcon={department.icon} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {department.layout && <RenderBlocks blocks={department.layout} />}

      <CallToAction
        block={{
          id: 'probetraining',
          blockType: 'callToAction',
          tone: 'red',
          title: 'Einfach mal mitmachen',
          text: 'Ein Probetraining ist in jeder Gruppe möglich. Trainingszeiten und Kontakt stehen auf der Seite des Teams.',
          actions: [
            { label: 'Mitglied werden', href: '/mitglied-werden' },
            { label: 'Alle Abteilungen', href: '/sport' },
          ],
        }}
      />

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <Link href="/sport" className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-red">
            <Icon name="chevron_left" className="size-5" />
            Alle Abteilungen
          </Link>
        </div>
      </div>
    </>
  )
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/[^a-z0-9]+/g, '-')
}
