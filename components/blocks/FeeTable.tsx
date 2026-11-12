import { Section, SectionHeading } from '@/components/ui/Section'
import type { FeeTableBlock } from '@/lib/cms/types'

export default function FeeTable({ block }: { block: FeeTableBlock }) {
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={block.eyebrow} title={block.title} text={block.text} />
      <div className="overflow-hidden border border-line bg-white">
        <table className="w-full text-left">
          <caption className="sr-only">{block.title}</caption>
          <thead className="bg-navy text-xs font-semibold tracking-[0.15em] text-white uppercase">
            <tr>
              <th scope="col" className="px-5 py-4">
                Beitrag
              </th>
              <th scope="col" className="px-5 py-4 text-right">
                Monatlich
              </th>
              <th scope="col" className="hidden px-5 py-4 text-right sm:table-cell">
                Halbjährlich
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {block.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="px-5 py-4 font-normal">
                  <span className="block font-bold text-navy">{row.label}</span>
                  {row.description && <span className="block text-sm text-slate-blue">{row.description}</span>}
                  <span className="block text-sm text-slate-blue sm:hidden">halbjährlich {row.halfYearly}</span>
                </th>
                <td className="px-5 py-4 text-right text-2xl font-extrabold text-navy tabular-nums">{row.monthly}</td>
                <td className="hidden px-5 py-4 text-right text-slate-blue tabular-nums sm:table-cell">{row.halfYearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.note && <p className="mt-4 text-sm text-slate-blue">{block.note}</p>}
    </Section>
  )
}
