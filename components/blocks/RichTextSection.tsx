import RichText from '@/components/RichText/RichText'
import { Eyebrow, Section } from '@/components/ui/Section'
import type { RichTextBlock } from '@/lib/cms/types'

// Fließtext in angenehmer Lesebreite, Überschrift links daneben ab Desktop
export default function RichTextSection({ block }: { block: RichTextBlock }) {
  const hasHeading = block.eyebrow || block.title
  return (
    <Section tone={block.tone}>
      <div className={hasHeading ? 'grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16' : 'max-w-3xl'}>
        {hasHeading && (
          <div>
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            {block.title && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-pretty uppercase">{block.title}</h2>}
          </div>
        )}
        <RichText content={block.content} className="max-w-3xl" />
      </div>
    </Section>
  )
}
