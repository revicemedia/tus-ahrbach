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
    return (
      <Section>
        <SectionHeading
          eyebrow={block.eyebrow}
          title={block.title}
          text={block.text}
          action={<ActionLink link={{ label: 'Alle Sponsoren', href: '/sponsoren' }} variant="text" />}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-center">
          <ul className="grid gap-4">
            {premium.map((sponsor) => (
              <li key={sponsor.name}>
                <SponsorTile sponsor={sponsor} large />
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-blue">
            {partners.map((sponsor) => (
              <li key={sponsor.name}>{sponsor.name}</li>
            ))}
          </ul>
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
