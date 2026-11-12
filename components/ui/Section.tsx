import type { ReactNode } from 'react'

export type Tone = 'white' | 'muted' | 'navy'

const toneClasses: Record<Tone, string> = {
  white: 'bg-white',
  muted: 'bg-paper',
  navy: 'bg-navy text-white',
}

// Äußerer Rahmen jedes Blocks: Hintergrund, Abstände, maximale Breite
export function Section({
  children,
  tone = 'white',
  id,
  className = '',
}: {
  children: ReactNode
  tone?: Tone
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${toneClasses[tone]} ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">{children}</div>
    </section>
  )
}

// Einheitliche Überschrift mit kleiner Dachzeile, rechts optional ein Link
export function SectionHeading({
  eyebrow,
  title,
  text,
  action,
  inverted = false,
}: {
  eyebrow?: string
  title?: string
  text?: string
  action?: ReactNode
  inverted?: boolean
}) {
  if (!eyebrow && !title && !text) return null
  return (
    <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>}
        {title && (
          <h2 className={`mt-3 text-3xl font-extrabold tracking-tight text-pretty uppercase sm:text-4xl ${inverted ? 'text-white' : 'text-navy'}`}>
            {title}
          </h2>
        )}
        {text && <p className={`mt-4 text-base/7 text-pretty ${inverted ? 'text-white/70' : 'text-slate-blue'}`}>{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function Eyebrow({ children, inverted = false }: { children: ReactNode; inverted?: boolean }) {
  return (
    <p className={`text-xs font-semibold tracking-[0.25em] uppercase ${inverted ? 'text-white/60' : 'text-red'}`}>{children}</p>
  )
}
