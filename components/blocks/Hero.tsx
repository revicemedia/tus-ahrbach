import Image from 'next/image'
import { ActionLinks } from '@/components/ui/ActionLink'
import type { HeroBlock } from '@/lib/cms/types'

const rise = 'animate-[hero-rise_0.7s_ease-out_both] motion-reduce:animate-none'

export default function Hero({ block, priority = false }: { block: HeroBlock; priority?: boolean }) {
  return block.variant === 'home' ? <HomeHero block={block} priority={priority} /> : <PageHero block={block} priority={priority} />
}

// Großes Foto über die volle Breite, Text links auf dunklem Verlauf
function HomeHero({ block, priority }: { block: HeroBlock; priority: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {block.image && (
        <Image
          alt=""
          src={block.image.url}
          fill
          sizes="100vw"
          preload={priority}
          loading={priority ? 'eager' : undefined}
          style={{ objectPosition: block.image.focus }}
          className="-z-20 animate-[hero-zoom_1.4s_ease-out_both] object-cover motion-reduce:animate-none"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/75 to-navy/20 lg:bg-linear-to-r lg:via-navy/60 lg:to-transparent" />
      <div className="mx-auto flex min-h-[34rem] max-w-7xl items-end px-6 pt-32 pb-16 lg:min-h-[min(44rem,calc(100svh-5rem))] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          {block.eyebrow && <p className={`text-xs font-semibold tracking-[0.25em] text-white/70 uppercase [animation-delay:150ms] ${rise}`}>{block.eyebrow}</p>}
          <h1 className={`mt-5 text-4xl font-extrabold tracking-tight text-balance text-white uppercase [animation-delay:300ms] sm:text-6xl ${rise}`}>
            {block.title}
          </h1>
          {block.text && <p className={`mt-6 max-w-xl text-base/7 text-white/80 [animation-delay:450ms] sm:text-lg/8 ${rise}`}>{block.text}</p>}
          {block.facts && (
            <ul className={`mt-6 flex flex-wrap gap-2 [animation-delay:525ms] ${rise}`}>
              {block.facts.map((fact) => (
                <li key={fact} className="border border-white/30 px-3 py-1 text-xs font-medium text-white/90">
                  {fact}
                </li>
              ))}
            </ul>
          )}
          <ActionLinks links={block.actions} inverted className={`mt-10 [animation-delay:600ms] ${rise}`} />
        </div>
      </div>
      {/* rote Kante als Markenakzent */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-red" />
    </section>
  )
}

// Kompakter Seitenkopf in Navy, mit Foto in der rechten Hälfte
function PageHero({ block, priority }: { block: HeroBlock; priority: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {block.image && (
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-20 hidden w-1/2 lg:block">
          <Image alt="" src={block.image.url} fill sizes="50vw" preload={priority} loading={priority ? 'eager' : undefined} style={{ objectPosition: block.image.focus }} className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/40 to-transparent" />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          {block.eyebrow && <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">{block.eyebrow}</p>}
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-white uppercase sm:text-5xl">{block.title}</h1>
          {block.text && <p className="mt-6 text-base/7 text-pretty text-white/75 sm:text-lg/8">{block.text}</p>}
          {block.facts && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {block.facts.map((fact) => (
                <li key={fact} className="border border-white/30 px-3 py-1 text-xs font-medium text-white/90">
                  {fact}
                </li>
              ))}
            </ul>
          )}
          <ActionLinks links={block.actions} inverted className="mt-8" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-red" />
    </section>
  )
}
