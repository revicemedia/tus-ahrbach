import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CoachList from '@/components/groups/CoachList'
import GroupTile from '@/components/groups/GroupTile'
import Icon from '@/components/Icon/Icon'
import PersonCard from '@/components/people/PersonCard'
import RichText from '@/components/RichText/RichText'
import ActionLink, { ActionLinks } from '@/components/ui/ActionLink'
import { Eyebrow, Section, SectionHeading } from '@/components/ui/Section'
import { getDepartment, getGroup, getGroups } from '@/lib/cms'
import { coachLabel, sessionTime, weekdayLabel } from '@/lib/format'
import PageSkeleton from '@/components/ui/PageSkeleton'

export async function generateStaticParams() {
  const groups = await getGroups()
  return groups.map((group) => ({ abteilung: group.department, team: group.slug }))
}

export async function generateMetadata({ params }: PageProps<'/sport/[abteilung]/[team]'>): Promise<Metadata> {
  const { abteilung, team } = await params
  const [group, department] = await Promise.all([getGroup(abteilung, team), getDepartment(abteilung)])
  if (!group || !department) return {}
  return {
    title: `${group.name} · ${department.name}`,
    description:
      group.teaser ?? `${department.name} im TuS Ahrbach: ${group.name}${group.team ? ` (${group.team})` : ''}. Trainingszeiten, Trainerteam und Kontakt.`,
    alternates: { canonical: `/sport/${department.slug}/${group.slug}` },
    openGraph: { images: group.image ? [group.image.url] : undefined },
  }
}

// Teamseite: Steckbrief, Training, Trainerteam und Kontakt einer Mannschaft oder Gruppe
// Die Adresse (params) wird erst hinter Suspense gelesen, damit die Navigation sofort startet
export default function TeamPage({ params }: PageProps<'/sport/[abteilung]/[team]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TeamPageContent params={params} />
    </Suspense>
  )
}

async function TeamPageContent({ params }: Pick<PageProps<'/sport/[abteilung]/[team]'>, 'params'>) {
  const { abteilung, team } = await params
  const [group, department] = await Promise.all([getGroup(abteilung, team), getDepartment(abteilung)])
  if (!group || !department) notFound()
  const siblings = (await getGroups(department.slug)).filter((other) => other.section === group.section && other.slug !== group.slug)

  const facts = [
    group.team && { label: 'Spielgemeinschaft', value: group.team },
    group.league && { label: 'Spielklasse', value: group.league },
    group.ageLabel && { label: 'Alter', value: group.ageLabel },
    group.squads && { label: 'Mannschaften', value: `${group.squads} Teams` },
    group.season && { label: 'Saison', value: group.season },
  ].filter((fact) => !!fact)

  // Kontakt: ausdrücklicher Kontakt, sonst die erste erreichbare Person aus dem Trainerteam
  const reachableCoach = group.coaches.find((coach) => coach.phone || coach.email)
  const contact = group.contact ?? (reachableCoach && { ...reachableCoach, role: coachLabel(reachableCoach) })

  return (
    <>
      <section className="relative flex flex-col overflow-hidden bg-navy">
        {/* Text in der Inhaltsbreite, Foto ab Desktop randlos in der rechten Hälfte */}
        <div className="order-last mx-auto w-full max-w-7xl lg:order-first">
          <div className="px-6 py-12 sm:py-16 lg:w-1/2 lg:px-8 lg:py-20 lg:pr-16">
            <Link
              href={`/sport/${department.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              <Icon name="chevron_left" className="size-5" />
              {department.name}
            </Link>
            <p className="mt-8 text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
              {department.name} · {group.section}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance text-white uppercase sm:text-6xl">{group.name}</h1>
            {group.notice && <p className="mt-5 inline-block bg-red px-3 py-1.5 text-sm font-semibold text-white">{group.notice}</p>}
            {group.teaser && <p className="mt-5 max-w-xl text-base/7 text-white/75 sm:text-lg/8">{group.teaser}</p>}
            {facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-semibold tracking-[0.15em] text-white/50 uppercase">{fact.label}</dt>
                    <dd className="mt-1 font-semibold text-white">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
        <div className="relative aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
          {group.image ? (
            <>
              <Image
                src={group.image.url}
                alt={group.image.alt}
                fill
                preload
                loading="eager"
                sizes="(min-width: 1024px) 50vw, 100vw"
                style={{ objectPosition: group.image.focus }}
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 hidden bg-linear-to-r from-navy to-transparent to-30% lg:block" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-navy-800 to-navy">
              <Icon name={department.icon} className="size-40 text-white/10" />
            </div>
          )}
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-red" />
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="min-w-0 space-y-14">
            {group.description && (
              <div>
                <Eyebrow>Über das Team</Eyebrow>
                <RichText content={group.description} className="mt-4 text-lg/8" />
              </div>
            )}

            <div>
              <SectionHeading eyebrow="Trainerteam" title={group.coaches.length > 0 ? 'Eure Ansprechpartner' : 'Trainer gesucht'} />
              {group.coaches.length > 0 ? (
                <CoachList coaches={group.coaches} />
              ) : (
                <p className="text-slate-blue">Für diese Gruppe suchen wir aktuell Verstärkung im Trainerteam. Interesse? Meldet euch beim Kontakt rechts.</p>
              )}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-26 lg:self-start">
            <div className="border border-line bg-paper p-6">
              <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-red uppercase">
                <Icon name="schedule" className="size-4" />
                Training
              </h2>
              {group.sessions.length > 0 ? (
                <ul className="mt-4 divide-y divide-line">
                  {group.sessions.map((session) => (
                    <li key={`${session.day}-${session.start}-${session.location}`} className="py-3 first:pt-0 last:pb-0">
                      <p className="flex justify-between gap-4 font-bold text-navy">
                        {weekdayLabel(session.day)}
                        <span className="tabular-nums">{sessionTime(session)}</span>
                      </p>
                      {session.location && (
                        <p className="mt-1 flex items-start gap-1 text-sm text-slate-blue">
                          <Icon name="location_on" className="mt-0.5 size-4 shrink-0 text-navy/40" />
                          {session.location}
                        </p>
                      )}
                      {session.note && <p className="mt-1 text-sm text-slate-blue">{session.note}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm/6 text-slate-blue">Die Trainingszeiten werden saisonweise abgestimmt. Fragt einfach beim Trainerteam nach.</p>
              )}
            </div>

            {contact && (
              <div>
                <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] text-red uppercase">Kontakt fürs Probetraining</h2>
                <PersonCard person={contact} />
              </div>
            )}

            <ActionLinks links={[{ label: 'Mitglied werden', href: '/mitglied-werden' }, ...(group.links ?? [])]} className="sm:flex-col" />
          </aside>
        </div>
      </Section>

      {siblings.length > 0 && (
        <Section tone="muted">
          <SectionHeading
            eyebrow={`${department.name} · ${group.section}`}
            title="Weitere Teams"
            action={<ActionLink link={{ label: `Alle Teams ${department.name}`, href: `/sport/${department.slug}` }} variant="text" />}
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.slice(0, 3).map((other) => (
              <li key={other.slug}>
                <GroupTile group={other} fallbackIcon={department.icon} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
