import { Section, SectionHeading } from '@/components/ui/Section'
import type { TimelineBlock } from '@/lib/cms/types'

// Zeitleiste, links bündig: am Desktop Jahr | Linie mit Marker | Text, mobil Linie links und Jahr über dem Text.
// Die Linie läuft durch die Mitte der Marker-Spalte (Marker 0,75 rem breit).
export default function Timeline({ block }: { block: TimelineBlock }) {
  return (
    <Section>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} />
      <ol className="relative max-w-4xl">
        <span aria-hidden="true" className="absolute top-3.5 bottom-2 left-[calc(0.375rem-0.5px)] w-px bg-line sm:left-[calc(5rem+1.5rem+0.375rem-0.5px)]" />
        {block.items.map((item) => (
          <li key={item.year + item.title} className="relative grid grid-cols-[0.75rem_1fr] gap-x-5 pb-10 last:pb-0 sm:grid-cols-[5rem_0.75rem_1fr] sm:gap-x-6">
            <span aria-hidden="true" className="col-start-1 row-start-1 mt-2 size-3 bg-red sm:col-start-2" />
            <p className="col-start-2 row-start-1 text-2xl/7 font-extrabold text-red tabular-nums sm:col-start-1">{item.year}</p>
            <div className="col-start-2 mt-1 sm:col-start-3 sm:row-start-1 sm:mt-0">
              <h3 className="text-lg/7 font-extrabold tracking-tight text-navy">{item.title}</h3>
              <p className="mt-1 text-base/7 text-slate-blue">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
