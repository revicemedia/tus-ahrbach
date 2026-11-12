import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getDepartments, getGroups } from '@/lib/cms'
import type { DepartmentsBlock } from '@/lib/cms/types'

// Große Bildkacheln für jede Abteilung, Inhalte kommen aus der Sammlung "Abteilungen"
export default async function Departments({ block }: { block: DepartmentsBlock }) {
  const [departments, groups] = await Promise.all([getDepartments(), getGroups()])

  return (
    <Section>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} text={block.text} />
      <ul className="grid gap-6 md:grid-cols-3">
        {departments.map((department) => {
          const count = groups.filter((group) => group.department === department.slug).length
          return (
            <li key={department.slug}>
              <Link href={`/sport/${department.slug}`} className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-navy p-6 sm:aspect-[3/4]">
                <Image
                  src={department.image.url}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  style={{ objectPosition: department.image.focus }}
                  className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/60 to-navy/0" />
                <span className="mb-auto flex size-12 items-center justify-center bg-red text-white">
                  <Icon name={department.icon} className="size-7" />
                </span>
                <p className="text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">{count} Teams & Gruppen</p>
                <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-white uppercase">{department.name}</h3>
                <p className="mt-3 text-sm/6 text-white/80">{department.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Mehr erfahren
                  <Icon name="arrow_forward" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
