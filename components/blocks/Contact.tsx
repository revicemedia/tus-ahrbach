import FacebookIcon from '@/components/Icon/FacebookIcon'
import Icon from '@/components/Icon/Icon'
import InstagramIcon from '@/components/Icon/InstagramIcon'
import PersonCard from '@/components/people/PersonCard'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getPeople, getSite } from '@/lib/cms'
import type { ContactBlock } from '@/lib/cms/types'

// Vereinsanschrift und Social Media links, direkte Ansprechpartner rechts
export default async function Contact({ block }: { block: ContactBlock }) {
  const [site, people] = await Promise.all([getSite(), getPeople(block.people)])

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={block.eyebrow} title={block.title} text={block.text} />
          <div className="space-y-6 border-t border-line pt-8 text-base/7">
            <div className="flex gap-3">
              <Icon name="location_on" className="mt-0.5 size-6 shrink-0 text-red" />
              <p>
                <span className="font-bold">{site.legalName}</span>
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </p>
            </div>
            <a href={`mailto:${site.email}`} className="flex gap-3 font-semibold transition-colors hover:text-red">
              <Icon name="mail" className="size-6 shrink-0 text-red" />
              {site.email}
            </a>
            <div className="flex gap-3">
              <Icon name="sports_soccer" className="mt-0.5 size-6 shrink-0 text-red" />
              <p>
                <span className="font-bold">{site.venue.name}</span>
                <br />
                {site.venue.city}
                <br />
                <a href={site.venue.mapsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm font-semibold text-red hover:text-navy">
                  Route planen
                  <Icon name="open_in_new" className="size-4" />
                </a>
              </p>
            </div>
            <ul className="flex flex-wrap gap-3 pt-2">
              {site.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2 border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:border-navy"
                  >
                    {social.platform === 'instagram' ? <InstagramIcon className="size-5" /> : <FacebookIcon className="size-5" />}
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="grid content-start gap-4 sm:grid-cols-2">
          {people.map((person) => (
            <li key={person.id}>
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
