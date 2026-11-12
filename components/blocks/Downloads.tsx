import Icon from '@/components/Icon/Icon'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { DownloadsBlock } from '@/lib/cms/types'

export default function Downloads({ block }: { block: DownloadsBlock }) {
  return (
    <Section>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} />
      <ul className="grid gap-4 sm:grid-cols-2">
        {block.items.map((item) => (
          <li key={item.href}>
            <a href={item.href} download className="group flex items-center gap-5 border border-line p-5 transition-colors hover:border-navy">
              <span className="flex size-12 shrink-0 items-center justify-center bg-red text-white transition-colors group-hover:bg-navy">
                <Icon name="download" className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-extrabold text-navy group-hover:text-red">{item.label}</span>
                {item.description && <span className="block text-sm text-slate-blue">{item.description}</span>}
              </span>
              <span className="text-xs font-semibold tracking-wider text-slate-blue">{item.fileType}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
