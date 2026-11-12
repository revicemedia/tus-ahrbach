import Image from 'next/image'
import RichText from '@/components/RichText/RichText'
import { ActionLinks } from '@/components/ui/ActionLink'
import { Eyebrow, Section } from '@/components/ui/Section'
import type { ImageTextBlock } from '@/lib/cms/types'

export default function ImageText({ block }: { block: ImageTextBlock }) {
  const imageLeft = block.imagePosition === 'left'
  const portrait = block.image.height > block.image.width
  return (
    <Section tone={block.tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={`relative ${imageLeft ? '' : 'lg:order-last'} ${portrait ? 'mx-auto w-full max-w-sm' : ''}`}>
          {/* versetzter roter Rahmen als Markenakzent */}
          <div aria-hidden="true" className="absolute -right-3 -bottom-3 h-full w-full border-2 border-red" />
          <Image
            src={block.image.url}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className={`relative w-full object-cover ${portrait ? '' : 'aspect-[4/3]'}`}
          />
        </div>
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-pretty uppercase sm:text-4xl">{block.title}</h2>
          <RichText content={block.content} className="mt-6" />
          <ActionLinks links={block.actions} className="mt-8" />
        </div>
      </div>
    </Section>
  )
}
