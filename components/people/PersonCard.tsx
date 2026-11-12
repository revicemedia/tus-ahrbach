import Image from 'next/image'
import Icon from '@/components/Icon/Icon'
import type { Contact, Person } from '@/lib/cms/types'
import { telHref } from '@/lib/format'

// Visitenkarte für Vorstand, Abteilungsleitung oder Trainer. Ohne Foto erscheinen die Initialen.
export default function PersonCard({ person, compact = false }: { person: Person | Contact; compact?: boolean }) {
  const image = 'image' in person ? person.image : undefined
  const initials = person.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <div className={`flex h-full gap-4 border border-line bg-white ${compact ? 'p-4' : 'p-5'}`}>
      <div className={`relative shrink-0 overflow-hidden bg-navy ${compact ? 'size-12' : 'size-16'}`}>
        {image ? (
          <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
        ) : (
          <span aria-hidden="true" className={`flex h-full items-center justify-center font-extrabold text-white ${compact ? 'text-base' : 'text-xl'}`}>
            {initials}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-extrabold text-navy">{person.name}</p>
        {person.role && <p className="text-sm text-slate-blue">{person.role}</p>}
        {(person.email || person.phone) && (
          <ul className="mt-2 space-y-1 text-sm">
            {person.email && (
              <li>
                <a href={`mailto:${person.email}`} className="flex items-center gap-1.5 font-semibold [overflow-wrap:anywhere] text-red transition-colors hover:text-navy">
                  <Icon name="mail" className="size-4 shrink-0" />
                  {person.email}
                </a>
              </li>
            )}
            {person.phone && (
              <li>
                <a href={telHref(person.phone)} className="flex items-center gap-1.5 font-semibold text-red tabular-nums transition-colors hover:text-navy">
                  <Icon name="call" className="size-4 shrink-0" />
                  {person.phone}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
