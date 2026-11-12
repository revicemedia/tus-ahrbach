import Image from 'next/image'
import Link from 'next/link'
import Icon, { type IconName } from '@/components/Icon/Icon'
import type { Group } from '@/lib/cms/types'
import { coachLabel, groupCoaches } from '@/lib/format'

// Kachel einer Mannschaft auf der Abteilungsseite, führt zur Teamseite
export default function GroupTile({ group, fallbackIcon }: { group: Group; fallbackIcon: IconName }) {
  const facts = [group.ageLabel, group.league].filter(Boolean)
  const lead = groupCoaches(group.coaches)[0]?.coaches[0]

  return (
    <article className="group relative flex h-full flex-col border border-line bg-white transition-colors hover:border-navy">
      <div className="relative aspect-[3/2] overflow-hidden bg-navy">
        {group.image ? (
          <Image
            src={group.image.url}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectPosition: group.image.focus }}
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          // Ohne Foto: großes Sport-Icon auf Navy
          <div className="flex h-full items-center justify-center bg-linear-to-br from-navy-800 to-navy">
            <Icon name={fallbackIcon} className="size-20 text-white/15" />
          </div>
        )}
        {group.team && <span className="absolute bottom-0 left-0 bg-navy/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">{group.team}</span>}
        {group.notice && <span className="absolute top-3 right-3 bg-red px-2.5 py-1 text-xs font-semibold text-white">{group.notice}</span>}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold tracking-tight text-navy uppercase group-hover:text-red">
          <Link href={`/sport/${group.department}/${group.slug}`}>
            {/* ganze Kachel klickbar */}
            <span aria-hidden="true" className="absolute inset-0" />
            {group.name}
          </Link>
        </h3>
        {facts.length > 0 && <p className="mt-1 text-sm text-slate-blue">{facts.join(' · ')}</p>}
        {group.teaser && <p className="mt-3 text-sm/6 text-slate-blue">{group.teaser}</p>}

        {/* Trainingszeiten stehen bewusst nur auf der Teamseite */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
            {lead ? (
              <p className="flex min-w-0 items-center gap-2 text-slate-blue">
                <Icon name="person" className="size-4 shrink-0 text-navy/40" />
                <span className="truncate">
                  <span className="font-semibold text-navy">{lead.name}</span> ({coachLabel(lead)})
                  {group.coaches.length > 1 && ` + ${group.coaches.length - 1}`}
                </span>
              </p>
            ) : (
              <span />
            )}
            <span className="flex shrink-0 items-center gap-1 font-semibold text-red">
              Zum Team
              <Icon name="arrow_forward" className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
