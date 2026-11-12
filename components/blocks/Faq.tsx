import Icon from '@/components/Icon/Icon'
import RichText from '@/components/RichText/RichText'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { FaqBlock } from '@/lib/cms/types'

// Aufklappbare Fragen ohne JavaScript (details/summary)
export default function Faq({ block }: { block: FaqBlock }) {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="self-start">
          <SectionHeading eyebrow={block.eyebrow} title={block.title} />
        </div>
        <div className="divide-y divide-line border-y border-line">
          {block.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg/7 font-bold text-navy transition-colors hover:text-red [&::-webkit-details-marker]:hidden">
                {item.question}
                <Icon name="keyboard_arrow_down" className="size-6 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <RichText content={[{ type: 'paragraph', text: item.answer }]} className="pb-6" />
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
