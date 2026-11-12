import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { CardsBlock } from '@/lib/cms/types'

const columnClasses = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }

// Kacheln mit Icon, Titel und Text, optional verlinkt (z. B. Unterseiten, Schritte, Jahresplan)
export default function Cards({ block }: { block: CardsBlock }) {
  return (
    <Section tone={block.tone}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} text={block.text} />
      <ul className={`grid gap-6 ${columnClasses[block.columns ?? 3]}`}>
        {block.items.map((item) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-4">
                {item.icon && (
                  <span className="flex size-12 items-center justify-center bg-navy text-white transition-colors group-hover:bg-red">
                    <Icon name={item.icon} className="size-6" />
                  </span>
                )}
                {item.meta && <span className="text-xs font-semibold tracking-[0.2em] text-red uppercase">{item.meta}</span>}
              </div>
              <h3 className="mt-6 flex items-center gap-2 text-lg font-extrabold tracking-tight text-navy uppercase group-hover:text-red">
                {item.title}
                {item.href && <Icon name="arrow_forward" className="size-5 transition-transform group-hover:translate-x-1" />}
              </h3>
              <p className="mt-2 text-sm/6 text-slate-blue">{item.text}</p>
            </>
          )
          const classes = 'group block h-full border border-line bg-white p-6 transition-colors'
          return (
            <li key={item.title}>
              {item.href ? (
                item.href.startsWith('/') && !item.href.endsWith('.pdf') ? (
                  <Link href={item.href} className={`${classes} hover:border-navy`}>
                    {content}
                  </Link>
                ) : (
                  <a href={item.href} className={`${classes} hover:border-navy`}>
                    {content}
                  </a>
                )
              ) : (
                <div className={classes}>{content}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
