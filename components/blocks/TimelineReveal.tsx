'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

// Scroll-Animation der Zeitleiste: Meilensteine blenden beim Hineinscrollen ein, die rote Linie wächst mit.
// Ohne JavaScript oder bei reduzierter Bewegung ist sofort alles sichtbar (Startzustand kommt erst mit data-ready).
export default function TimelineReveal({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    const progress = progressRef.current
    if (!list || !progress || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = [...list.querySelectorAll<HTMLElement>(':scope > li')]
    // Was beim Laden im Fenster ist, bleibt einfach stehen. Der Rest wird ohne Übergang versteckt (liegt außerhalb
    // des Bildschirms, man sieht es also nicht); erst danach werden die Übergänge eingeschaltet (data-animate).
    // Sonst würde das Verstecken selbst animiert und die Einträge schwebten sichtbar weg.
    for (const item of items) if (item.getBoundingClientRect().top < window.innerHeight) item.dataset.visible = ''
    list.dataset.ready = ''
    let enable = requestAnimationFrame(() => {
      enable = requestAnimationFrame(() => (list.dataset.animate = ''))
    })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.visible = ''
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    for (const item of items) if (!('visible' in item.dataset)) observer.observe(item)

    // Rote Linie bis zur Höhe von 60 % des Fensters füllen
    let frame = 0
    const update = () => {
      frame = 0
      const line = progress.getBoundingClientRect()
      const share = (window.innerHeight * 0.6 - line.top) / progress.offsetHeight
      progress.style.transform = `scaleY(${Math.min(Math.max(share, 0), 1)})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(enable)
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <ol ref={listRef} className="group/timeline relative max-w-4xl">
      {/* graue Linie und darüber die rote, die beim Scrollen wächst; Position = Mitte der Marker-Spalte */}
      <span aria-hidden="true" className="absolute top-3.5 bottom-2 left-[calc(0.375rem-0.5px)] w-px bg-line sm:left-[calc(5rem+1.5rem+0.375rem-0.5px)]" />
      <span
        ref={progressRef}
        aria-hidden="true"
        style={{ transform: 'scaleY(0)' }}
        className="absolute top-3.5 bottom-2 left-[calc(0.375rem-0.5px)] hidden w-px origin-top bg-red group-data-ready/timeline:block sm:left-[calc(5rem+1.5rem+0.375rem-0.5px)]"
      />
      {children}
    </ol>
  )
}
