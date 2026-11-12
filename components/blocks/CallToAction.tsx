import Image from 'next/image'
import { ActionLinks } from '@/components/ui/ActionLink'
import type { CallToActionBlock } from '@/lib/cms/types'

// Auffälliges Band, z. B. für den Ahrbach-Cup oder einen Aufruf zum Mitmachen
export default function CallToAction({ block }: { block: CallToActionBlock }) {
  const red = block.tone === 'red'
  return (
    <section className={`relative isolate overflow-hidden ${red ? 'bg-red' : 'bg-navy'}`}>
      {block.image && (
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-2/5 lg:block">
          <Image alt="" src={block.image.url} fill sizes="40vw" style={{ objectPosition: block.image.focus }} className="object-cover" />
          <div className={`absolute inset-0 bg-linear-to-r ${red ? 'from-red' : 'from-navy'} via-transparent to-transparent`} />
        </div>
      )}
      {block.highlight && !block.image && (
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-[-3%] -z-10 -translate-y-1/2 text-[16rem] leading-none font-black tracking-tighter text-white/10 select-none sm:text-[24rem] lg:right-[4%] lg:text-red"
        >
          {block.highlight}
        </span>
      )}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className={block.image || block.highlight ? 'max-w-2xl lg:max-w-[55%]' : 'max-w-3xl'}>
          {block.eyebrow && <p className="text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">{block.eyebrow}</p>}
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-pretty text-white uppercase sm:text-5xl">{block.title}</h2>
          {block.text && <p className="mt-5 max-w-2xl text-base/7 text-pretty text-white/80 sm:text-lg/8">{block.text}</p>}
          {block.facts && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {block.facts.map((fact) => (
                <li key={fact} className="border border-white/30 px-3 py-1 text-xs font-medium text-white/90">
                  {fact}
                </li>
              ))}
            </ul>
          )}
          <ActionLinks links={block.actions} inverted onRed={red} className="mt-8" />
        </div>
      </div>
    </section>
  )
}
