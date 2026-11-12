import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import type { LinkItem } from '@/lib/cms/types'

type Variant = 'primary' | 'secondary' | 'inverted' | 'inverted-on-red' | 'outline-inverted' | 'text'

const variants: Record<Variant, string> = {
  primary: 'bg-red text-white hover:bg-navy',
  secondary: 'border border-navy text-navy hover:bg-navy hover:text-white',
  inverted: 'bg-white text-navy hover:bg-red hover:text-white',
  // auf roten Flächen würde der rote Hover-Zustand verschwinden
  'inverted-on-red': 'bg-white text-navy hover:bg-navy hover:text-white',
  'outline-inverted': 'border border-white/70 text-white hover:border-white hover:bg-white/10',
  text: 'px-0! py-0! text-red hover:text-navy',
}

// Ein Link im Button-Look. Externe Ziele öffnen in neuem Tab und zeigen ein Pfeil-Icon.
export default function ActionLink({ link, variant = 'primary', className = '' }: { link: LinkItem; variant?: Variant; className?: string }) {
  const isExternal = link.external || /^https?:/.test(link.href)
  const isPlain = isExternal || /^(mailto|tel):/.test(link.href) || link.href.endsWith('.pdf')
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`
  const content = (
    <>
      {link.label}
      {isExternal ? <Icon name="open_in_new" className="size-4" /> : variant === 'text' && <Icon name="arrow_forward" className="size-4" />}
    </>
  )

  if (isPlain) {
    return (
      <a href={link.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener' : undefined} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <Link href={link.href} className={classes}>
      {content}
    </Link>
  )
}

// Erster Link als Hauptbutton, alle weiteren zurückhaltender. onRed: Hintergrund ist rot statt navy.
export function ActionLinks({
  links,
  inverted = false,
  onRed = false,
  className = '',
}: {
  links?: LinkItem[]
  inverted?: boolean
  onRed?: boolean
  className?: string
}) {
  if (!links?.length) return null
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      {links.map((link, index) => (
        <ActionLink
          key={link.href + link.label}
          link={link}
          variant={index === 0 ? (inverted ? (onRed ? 'inverted-on-red' : 'inverted') : 'primary') : inverted ? 'outline-inverted' : 'secondary'}
        />
      ))}
    </div>
  )
}
