'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Icon from '@/components/Icon/Icon'
import type { Magazine } from '@/lib/cms/types'

export const pageUrl = (pattern: string, page: number) => pattern.replace('{n}', String(page).padStart(2, '0'))

// Wie im gedruckten Heft: Titelseite allein, dann 2|3, 4|5, … und bei gerader Seitenzahl die Rückseite allein
function buildSpreads(pageCount: number, double: boolean) {
  if (!double) return Array.from({ length: pageCount }, (_, index) => [index + 1])
  const spreads = [[1]]
  for (let page = 2; page <= pageCount; page += 2) spreads.push(page + 1 <= pageCount ? [page, page + 1] : [page])
  return spreads
}

// Doppelseiten erst ab Desktop-Breite, darunter Seite für Seite
function useWideScreen() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia('(min-width: 1024px)')
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(min-width: 1024px)').matches,
    () => false,
  )
}

// Platz für Kopf- und Fußleiste, damit eingepasste Seiten nie abgeschnitten werden
const RESERVED_HEIGHT = '13rem'

// Leseansicht über den ganzen Bildschirm. Zoom verdoppelt die Seitengröße, dann wird gescrollt statt gewischt.
export default function MagazineReader({ magazine, initialPage, onClose }: { magazine: Magazine; initialPage: number; onClose: () => void }) {
  const wide = useWideScreen()
  const spreads = useMemo(() => buildSpreads(magazine.pageCount, wide), [magazine.pageCount, wide])
  // Gemerkt wird die Seite, nicht die Doppelseite: so bleibt die Stelle beim Drehen des Handys erhalten
  const [page, setPage] = useState(initialPage)
  const [zoom, setZoom] = useState(false)
  const index = Math.max(0, spreads.findIndex((spread) => spread.includes(page)))
  const spread = spreads[index]

  const stageRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLUListElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const stripAnimated = useRef(false)

  // Seite wechseln und in der Adresse festhalten, damit man sie teilen kann
  const show = useCallback((target: number) => {
    stripAnimated.current = true
    setPage(target)
    window.history.replaceState(null, '', `#seite-${target}`)
  }, [])

  const goTo = useCallback((target: number) => show(spreads[Math.min(Math.max(target, 0), spreads.length - 1)][0]), [spreads, show])

  // Seite unter dem Leser sperren, Fokus in den Dialog
  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      root.style.overflow = previous
    }
  }, [])

  // Tastatur: Pfeile blättern, Escape schließt
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') goTo(index + 1)
      if (event.key === 'ArrowLeft') goTo(index - 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goTo, index, onClose])

  // Nach dem Blättern oben beginnen; im Zoom horizontal mittig
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    stage.scrollTo({ top: 0, left: (stage.scrollWidth - stage.clientWidth) / 2 })
  }, [page, zoom])

  // Aktive Vorschau in der Leiste mittig halten: beim Öffnen sofort, beim Blättern weich
  useEffect(() => {
    const strip = stripRef.current
    const active = strip?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!strip || !active) return
    strip.scrollTo({
      left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
      behavior: stripAnimated.current ? 'smooth' : 'instant',
    })
  }, [page, wide])

  // Wischen am Touchscreen, nicht im Zoom (dort wird gescrollt)
  const swipeStart = useRef<number | null>(null)
  const onPointerDown = (event: React.PointerEvent) => {
    if (!zoom && event.pointerType !== 'mouse') swipeStart.current = event.clientX
  }
  const onPointerUp = (event: React.PointerEvent) => {
    if (swipeStart.current === null) return
    const delta = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(delta) > 50) goTo(index + (delta < 0 ? 1 : -1))
  }

  // Bühne immer so breit wie eine Doppelseite (Desktop) bzw. eine Seite (Handy)
  const columns = wide ? 2 : 1
  const ratio = (columns * magazine.pageWidth) / magazine.pageHeight
  const fitWidth = `min(100%, calc((100dvh - ${RESERVED_HEIGHT}) * ${ratio}))`
  // Seiten sind etwas schmaler als der Bildschirm (Ränder), daher knapp unter 100vw bzw. 200vw im Zoom
  const sizes = zoom ? (wide ? '95vw' : '190vw') : wide ? '50vw' : '95vw'
  const alignSingle = spread[0] === 1 ? 'justify-end' : 'justify-start'
  const label = spread.length === 2 ? `Seiten ${spread[0]}–${spread[1]}` : `Seite ${spread[0]}`
  const neighbours = [...(spreads[index - 1] ?? []), ...(spreads[index + 1] ?? [])]
  const toolButton = 'inline-flex size-10 items-center justify-center gap-2 border border-white/20 transition-colors hover:bg-white/10 sm:w-auto sm:px-3'

  return (
    <div role="dialog" aria-modal="true" aria-label={magazine.title} className="fixed inset-0 z-50 flex flex-col bg-navy text-white">
      <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold tracking-tight uppercase">{magazine.title}</p>
          <p aria-live="polite" className="text-xs text-white/60 tabular-nums">
            {label} von {magazine.pageCount}
          </p>
        </div>
        <div className="flex shrink-0 gap-2 text-sm font-semibold">
          <button type="button" onClick={() => setZoom((value) => !value)} aria-pressed={zoom} className={toolButton}>
            <Icon name={zoom ? 'zoom_out' : 'zoom_in'} className="size-5" />
            <span className="hidden sm:inline">{zoom ? 'Verkleinern' : 'Vergrößern'}</span>
            <span className="sr-only sm:hidden">{zoom ? 'Verkleinern' : 'Vergrößern'}</span>
          </button>
          <a href={magazine.pdf.url} download className={toolButton}>
            <Icon name="download" className="size-5" />
            <span className="hidden sm:inline">PDF</span>
            <span className="sr-only sm:hidden">PDF herunterladen</span>
          </a>
          <button ref={closeRef} type="button" onClick={onClose} className={`${toolButton} bg-white text-navy hover:bg-red hover:text-white`}>
            <Icon name="close" className="size-5" />
            <span className="hidden sm:inline">Schließen</span>
            <span className="sr-only sm:hidden">Schließen</span>
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onDoubleClick={() => setZoom((value) => !value)}
          className={`h-full ${zoom ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in touch-pan-y overflow-hidden'}`}
        >
          <div className={`flex min-h-full p-3 sm:p-6 ${zoom ? 'w-max min-w-full justify-center' : 'items-center justify-center'}`}>
            <div
              style={{ aspectRatio: ratio, width: zoom ? `calc(${fitWidth.replace('100%', '(100vw - 3rem)')} * 2)` : fitWidth }}
              className="relative shrink-0 select-none"
            >
              <div key={spread.join('-')} className={`absolute inset-0 flex animate-[page-in_0.25s_ease-out] motion-reduce:animate-none ${spread.length === 1 ? alignSingle : ''}`}>
                {spread.map((number, position) => (
                  <div key={number} style={{ width: `${100 / columns}%` }} className="relative h-full bg-white shadow-2xl shadow-black/40">
                    <Image
                      src={pageUrl(magazine.pagePattern, number)}
                      alt={`${magazine.title}, Seite ${number}`}
                      fill
                      sizes={sizes}
                      loading="eager"
                      className="object-contain"
                      draggable={false}
                    />
                    {/* Falz in der Mitte der Doppelseite */}
                    {spread.length === 2 && (
                      <div
                        aria-hidden="true"
                        className={`absolute inset-y-0 w-10 from-black/20 to-transparent ${position === 0 ? 'right-0 bg-linear-to-l' : 'left-0 bg-linear-to-r'}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <NavButton direction="prev" disabled={index === 0} onClick={() => goTo(index - 1)} />
        <NavButton direction="next" disabled={index === spreads.length - 1} onClick={() => goTo(index + 1)} />
      </div>

      {/* Nachbarseiten vorladen, damit das Blättern ohne Wartezeit klappt */}
      <div aria-hidden="true" className="hidden">
        {neighbours.map((number) => (
          <Image key={number} src={pageUrl(magazine.pagePattern, number)} alt="" width={magazine.pageWidth} height={magazine.pageHeight} sizes={sizes} loading="eager" />
        ))}
      </div>

      {/* Seitenübersicht; relative, damit versteckte Texte darin nicht aus der Leiste herausfallen */}
      <ul ref={stripRef} aria-label="Seitenübersicht" className="relative flex shrink-0 gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 sm:px-6">
        {Array.from({ length: magazine.pageCount }, (_, offset) => offset + 1).map((number) => {
          const current = spread.includes(number)
          return (
            <li key={number} aria-current={current} className="relative shrink-0">
              <button type="button" onClick={() => show(number)} className={`block w-10 transition-opacity sm:w-12 ${current ? '' : 'opacity-50 hover:opacity-100'}`}>
                <span className={`relative block aspect-[1100/1543] border-2 ${current ? 'border-red' : 'border-transparent'}`}>
                  <Image src={pageUrl(magazine.thumbPattern, number)} alt="" fill sizes="48px" unoptimized className="object-cover" />
                </span>
                <span className="mt-1 block text-center text-[0.7rem] text-white/70 tabular-nums">
                  <span className="sr-only">Seite </span>
                  {number}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function NavButton({ direction, disabled, onClick }: { direction: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-navy/80 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-navy disabled:pointer-events-none disabled:opacity-0 ${
        direction === 'prev' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'
      }`}
    >
      <span className="sr-only">{direction === 'prev' ? 'Vorherige Seite' : 'Nächste Seite'}</span>
      <Icon name={direction === 'prev' ? 'chevron_left' : 'chevron_right'} className="size-6" />
    </button>
  )
}
