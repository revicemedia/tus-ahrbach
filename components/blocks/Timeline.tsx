import { Section, SectionHeading } from '@/components/ui/Section'
import type { TimelineBlock } from '@/lib/cms/types'

export default function Timeline({ block }: { block: TimelineBlock }) {
  return (
    <Section>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} />
      <ol className="relative max-w-4xl border-l-2 border-line">
        {block.items.map((item) => (
          <li key={item.year + item.title} className="relative pb-10 pl-8 last:pb-0 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-6 sm:pl-10">
            <span aria-hidden="true" className="absolute top-1.5 -left-[7px] size-3 bg-red" />
            <p className="text-2xl/7 font-extrabold text-red tabular-nums">{item.year}</p>
            <div className="mt-1 sm:mt-0">
              <h3 className="text-lg/7 font-extrabold tracking-tight text-navy">{item.title}</h3>
              <p className="mt-1 text-base/7 text-slate-blue">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
