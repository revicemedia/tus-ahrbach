import Image from 'next/image'
import ActionLink from '@/components/ui/ActionLink'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getSponsors } from '@/lib/cms'
import type { Sponsor, SponsorsBlock } from '@/lib/cms/types'

export default async function Sponsors({ block }: { block: SponsorsBlock }) {
  const sponsors = await getSponsors()
  const premium = sponsors.filter((sponsor) => sponsor.tier === 'premium')
  const partners = sponsors.filter((sponsor) => sponsor.tier === 'partner')

  if (block.variant === 'compact') {
    // Partner abwechselnd auf zwei Reihen verteilt, die gegenläufig laufen
    const rows = [partners.filter((_, index) => index % 2 === 0), partners.filter((_, index) => index % 2 === 1)]
    return (
      <Section>
        <SectionHeading
          eyebrow={block.eyebrow}
          title={block.title}
          text={block.text}
          action={<ActionLink link={{ label: 'Alle Sponsoren', href: '/sponsoren' }} variant="text" />}
        />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-stretch">
          {premium.map((sponsor) => (
            <div key={sponsor.name} className="flex flex-col">
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-slate-blue uppercase">Hauptsponsor</p>
              <div className="flex-1">
                <SponsorTile sponsor={sponsor} large />
              </div>
            </div>
          ))}
          <div className="flex min-w-0 flex-col">
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-slate-blue uppercase">Partner und Förderer</p>
            <div className="group flex flex-1 flex-col justify-center gap-3 border border-line bg-paper py-5">
              {rows.map((row, index) => (
                <Marquee key={index} items={row.map((sponsor) => sponsor.name)} reverse={index === 1} />
              ))}
            </div>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} text={block.text} />
      <ul className="grid gap-4 sm:grid-cols-2">
        {premium.map((sponsor) => (
          <li key={sponsor.name}>
            <SponsorTile sponsor={sponsor} large />
          </li>
        ))}
      </ul>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((sponsor) => (
          <li key={sponsor.name}>
            <SponsorTile sponsor={sponsor} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

// Mit Logo als Bildkachel, ohne Logo als Namenskarte
function SponsorTile({ sponsor, large = false }: { sponsor: Sponsor; large?: boolean }) {
  const body = sponsor.logo ? (
    <div className={`flex items-center justify-center p-6 ${large ? 'h-36' : 'h-28'}`} style={{ background: sponsor.background }}>
      <Image src={sponsor.logo.url} alt={sponsor.name} width={sponsor.logo.width} height={sponsor.logo.height} className="max-h-full w-auto object-contain" />
    </div>
  ) : (
    <div className={`flex flex-col justify-center p-5 ${large ? 'h-36' : 'h-28'}`}>
      <p className="font-extrabold text-pretty text-navy">{sponsor.name}</p>
      {sponsor.description && <p className="mt-1 text-sm text-slate-blue">{sponsor.description}</p>}
    </div>
  )
  const classes = 'block h-full border border-line bg-white transition-colors'
  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener" className={`${classes} hover:border-navy`}>
      {body}
    </a>
  ) : (
    <div className={classes}>{body}</div>
  )
}

// Endlos laufende Namensleiste. Hält bei Hover an; bei reduzierter Bewegung steht sie und lässt sich seitlich wischen.
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // ca. 4 Sekunden pro Name, damit beide Reihen gleich ruhig laufen
  const duration = `${items.length * 4}s`
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? 'motion-reduce:hidden' : ''}`}>
      {items.map((name) => (
        <li key={name} className="flex items-center text-sm font-bold whitespace-nowrap text-navy sm:text-base">
          {name}
          <span aria-hidden="true" className="mx-6 size-1.5 rotate-45 bg-red" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="relative overflow-hidden mask-x-from-90% motion-reduce:overflow-x-auto">
      <div
        style={{ animationDuration: duration }}
        className={`flex w-max animate-[marquee_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none ${reverse ? '[animation-direction:reverse]' : ''}`}
      >
        {list(false)}
        {/* zweite Kopie für den nahtlosen Übergang, für Screenreader ausgeblendet */}
        {list(true)}
      </div>
    </div>
  )
}
