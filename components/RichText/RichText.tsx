import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import type { RichText as RichTextValue } from '@/lib/cms/types'

// Rendert das einfache Fließtext-Format aus lib/cms/types.ts.
// Beim Umstieg auf das CMS wird hier der Lexical-Renderer von Payload eingesetzt.
export default function RichText({ content, inverted = false, className = '' }: { content: RichTextValue; inverted?: boolean; className?: string }) {
  const text = inverted ? 'text-white/80' : 'text-slate-blue'
  const strong = inverted ? 'text-white' : 'text-navy'

  return (
    <div className={`space-y-5 text-base/7 ${text} ${className}`}>
      {content.map((node, index) => {
        switch (node.type) {
          case 'heading':
            return node.level === 2 ? (
              <h2 key={index} className={`pt-4 text-xl font-extrabold tracking-tight uppercase ${strong}`}>
                {node.text}
              </h2>
            ) : (
              <h3 key={index} className={`pt-2 text-lg font-bold ${strong}`}>
                {node.text}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={index} className="text-pretty">
                <Inline text={node.text} strongClass={strong} />
              </p>
            )
          case 'list': {
            const ListTag = node.ordered ? 'ol' : 'ul'
            return (
              <ListTag key={index} className="space-y-2">
                {node.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.75 size-1.5 shrink-0 bg-red" />
                    <span>
                      <Inline text={item} strongClass={strong} />
                    </span>
                  </li>
                ))}
              </ListTag>
            )
          }
          case 'quote':
            return (
              <figure key={index} className="border-l-4 border-red py-1 pl-6">
                <blockquote className={`text-lg/8 font-semibold text-pretty ${strong}`}>„{node.text}“</blockquote>
                {node.cite && <figcaption className="mt-2 text-sm">{node.cite}</figcaption>}
              </figure>
            )
        }
      })}
    </div>
  )
}

// **fett**, [Text](ziel) und Zeilenumbrüche
function Inline({ text, strongClass }: { text: string; strongClass: string }) {
  const parts: ReactNode[] = []
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|\n/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    const key = `${index}-${match[0]}`
    if (match[1]) {
      parts.push(
        <strong key={key} className={`font-semibold ${strongClass}`}>
          {match[1]}
        </strong>,
      )
    } else if (match[2] && match[3]) {
      const href = match[3]
      const className = 'font-semibold text-red underline decoration-red/30 underline-offset-4 transition-colors hover:decoration-red'
      parts.push(
        href.startsWith('/') ? (
          <Link key={key} href={href} className={className}>
            {match[2]}
          </Link>
        ) : (
          <a key={key} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className={className}>
            {match[2]}
          </a>
        ),
      )
    } else {
      parts.push(<br key={key} />)
    }
    last = index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <Fragment>{parts}</Fragment>
}
