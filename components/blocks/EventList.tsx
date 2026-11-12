import Icon from '@/components/Icon/Icon'
import ActionLink from '@/components/ui/ActionLink'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getEvents } from '@/lib/cms'
import type { ClubEvent, EventListBlock } from '@/lib/cms/types'
import { eventDateParts, formatEventRange } from '@/lib/format'

export default async function EventList({ block }: { block: EventListBlock }) {
  const { upcoming, past } = await getEvents()
  const shown = block.limit ? upcoming.slice(0, block.limit) : upcoming

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow={block.eyebrow}
        title={block.title}
        action={block.showAllLink && <ActionLink link={{ label: 'Alle Termine', href: '/termine' }} variant="text" />}
      />
      {shown.length > 0 ? (
        <ul className="divide-y divide-line border border-line bg-white">
          {shown.map((event) => (
            <EventRow key={event.slug} event={event} />
          ))}
        </ul>
      ) : (
        <p className="border border-line bg-white p-6 text-slate-blue">Aktuell stehen keine Termine an. Schaut bald wieder vorbei!</p>
      )}

      {block.showPast && past.length > 0 && (
        <div className="mt-14">
          <h3 className="text-lg font-extrabold tracking-tight uppercase">Rückblick</h3>
          <ul className="mt-4 divide-y divide-line border border-line bg-white opacity-80">
            {past.map((event) => (
              <EventRow key={event.slug} event={event} past />
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}

function EventRow({ event, past = false }: { event: ClubEvent; past?: boolean }) {
  const date = eventDateParts(event)
  return (
    <li className="grid grid-cols-[4.5rem_1fr] gap-5 p-5 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-8 sm:p-6">
      <div className={`flex aspect-square flex-col items-center justify-center text-white ${past ? 'bg-slate-blue' : 'bg-navy'}`}>
        <span className="text-2xl/7 font-extrabold tabular-nums">{date.day}</span>
        <span className="text-xs font-semibold tracking-wider uppercase">{date.month}</span>
      </div>
      <div>
        <h4 className="text-lg/6 font-extrabold tracking-tight text-navy">{event.title}</h4>
        <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-blue">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar_month" className="size-4 text-navy/40" />
            {formatEventRange(event)}
            {event.time && `, ${event.time}`}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="location_on" className="size-4 text-navy/40" />
            {event.location}
          </span>
        </p>
        {event.description && !past && <p className="mt-2 text-sm/6 text-slate-blue">{event.description}</p>}
      </div>
      {event.link && !past && (
        <div className="col-start-2 sm:col-start-auto">
          <ActionLink link={event.link} variant="secondary" />
        </div>
      )}
    </li>
  )
}
