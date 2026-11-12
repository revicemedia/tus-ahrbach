'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Icon from '@/components/Icon/Icon'
import { Eyebrow } from '@/components/ui/Section'
import type { FlipbookBlock, Magazine } from '@/lib/cms/types'
import MagazineReader, { pageUrl } from './MagazineReader'

// Titelbild, Text und Inhaltsverzeichnis; „Online lesen“ öffnet den Leser über den ganzen Bildschirm
export default function MagazineTeaser({ magazine, block }: { magazine: Magazine; block: FlipbookBlock }) {
  const [openAt, setOpenAt] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const open = (page: number, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setOpenAt(page)
    window.history.replaceState(null, '', `#seite-${page}`)
  }

  const close = useCallback(() => {
    setOpenAt(null)
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    triggerRef.current?.focus()
  }, [])

  // Direktlink, z. B. /verein/anpfiff#seite-12, öffnet den Leser auf dieser Seite
  useEffect(() => {
    const match = window.location.hash.match(/^#seite-(\d+)$/)
    if (!match) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- einmalig aus der Adresse übernehmen
    setOpenAt(Math.min(Math.max(Number(match[1]), 1), magazine.pageCount))
  }, [magazine.pageCount])

  return (
    <>
      <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <button
          type="button"
          onClick={(event) => open(1, event.currentTarget)}
          className="group relative mx-auto block w-full max-w-sm text-left lg:sticky lg:top-26"
        >
          <span className="sr-only">{magazine.title} online lesen</span>
          {/* versetzter roter Rahmen wie bei den Bild-Text-Blöcken */}
          <span aria-hidden="true" className="absolute -right-3 -bottom-3 h-full w-full border-2 border-red" />
          <span className="relative block overflow-hidden shadow-2xl shadow-navy/25">
            <Image
              src={pageUrl(magazine.pagePattern, 1)}
              alt=""
              width={magazine.pageWidth}
              height={magazine.pageHeight}
              sizes="(min-width: 1024px) 384px, 90vw"
              loading="eager"
              className="w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors group-hover:bg-navy/40">
              <span className="flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-semibold text-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Icon name="menu_book" className="size-5" />
                Online lesen
              </span>
            </span>
          </span>
        </button>

        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.title && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-pretty uppercase sm:text-4xl">{block.title}</h2>}
          {block.text && <p className="mt-5 text-base/7 text-pretty text-slate-blue sm:text-lg/8">{block.text}</p>}
          <ul className="mt-6 flex flex-wrap gap-2">
            {[`Saison ${magazine.season}`, `${magazine.pageCount} Seiten`, `PDF ${magazine.pdf.size}`].map((fact) => (
              <li key={fact} className="border border-line bg-white px-3 py-1 text-xs font-semibold text-slate-blue">
                {fact}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={(event) => open(1, event.currentTarget)}
              className="inline-flex items-center justify-center gap-2 bg-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              <Icon name="menu_book" className="size-5" />
              Online lesen
            </button>
            <a
              href={magazine.pdf.url}
              download
              className="inline-flex items-center justify-center gap-2 border border-navy px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <Icon name="download" className="size-5" />
              PDF herunterladen
            </a>
          </div>

          {magazine.contents && (
            <div className="mt-12">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-red uppercase">Inhalt</h3>
              <ul className="mt-4 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                {magazine.contents.map((entry) => (
                  <li key={entry.page} className="border-b border-line">
                    <button
                      type="button"
                      onClick={(event) => open(entry.page, event.currentTarget)}
                      className="group flex w-full items-baseline gap-4 py-3 text-left"
                    >
                      <span className="w-6 shrink-0 text-lg font-extrabold text-red tabular-nums">{entry.page}</span>
                      <span className="min-w-0">
                        <span className="block font-bold text-navy group-hover:text-red">{entry.title}</span>
                        {entry.teaser && <span className="block text-sm text-slate-blue">{entry.teaser}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {openAt !== null && <MagazineReader magazine={magazine} initialPage={openAt} onClose={close} />}
    </>
  )
}
