'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import type { Media } from '@/lib/cms/types'

// Anzeigedauer je Bild, passend zur Animation hero-progress in globals.css
const SLIDE_MS = 7000

// Bei „Bewegung reduzieren“ wechseln die Bilder nicht von selbst
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  )

// Hintergrundbilder des Start-Heros: überblenden mit leichtem Zoom, Text und Buttons bleiben stehen.
// Nur das erste Bild wird vorgeladen, die übrigen erst, wenn es geladen ist.
export default function HeroSlideshow({ images, priority }: { images: Media[]; priority: boolean }) {
  const [active, setActive] = useState(0)
  const [restReady, setRestReady] = useState(false)
  const reducedMotion = useReducedMotion()
  const running = !reducedMotion

  useEffect(() => {
    if (!running) return
    // active als Abhängigkeit: Nach einem Klick auf ein Bild beginnt die Anzeigedauer neu
    const timer = setInterval(() => {
      if (document.hidden) return
      setRestReady(true)
      setActive((current) => (current + 1) % images.length)
    }, SLIDE_MS)
    return () => clearInterval(timer)
  }, [running, active, images.length])

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20 animate-[hero-zoom_1.4s_ease-out_both] motion-reduce:animate-none">
        {images.map((image, index) =>
          index === 0 || restReady || index === active ? (
            <Image
              key={image.url}
              alt=""
              src={image.url}
              fill
              sizes="100vw"
              preload={index === 0 && priority}
              loading={index === 0 && priority ? 'eager' : undefined}
              onLoad={index === 0 ? () => setRestReady(true) : undefined}
              style={{ objectPosition: image.focus }}
              className={`object-cover transition-[opacity,scale] duration-[1500ms,9000ms] ease-out motion-reduce:scale-100 motion-reduce:transition-opacity ${
                index === active ? 'scale-108 opacity-100' : 'scale-100 opacity-0'
              }`}
            />
          ) : null,
        )}
      </div>

      {/* Steuerung unten rechts, über dem Verlauf; die Leiste selbst lässt Klicks durch */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10">
        <div className="mx-auto flex max-w-7xl justify-end px-6 lg:px-8">
          <div role="group" aria-label="Hintergrundbilder" className="pointer-events-auto flex items-center">
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                onClick={() => {
                  setRestReady(true)
                  setActive(index)
                }}
                aria-label={`Bild ${index + 1} von ${images.length}`}
                aria-current={index === active ? 'true' : undefined}
                className="group p-1.5"
              >
                {/* Punkt, der aktive wird zur Pille und füllt sich während der Anzeigedauer */}
                <span
                  className={`block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                    index === active ? 'w-6 bg-white/50' : 'w-2 bg-white/60 group-hover:bg-white'
                  }`}
                >
                  {index === active && (
                    <span
                      key={`${active}-${running}`}
                      className={`block h-full origin-left bg-white ${running ? 'animate-[hero-progress_7s_linear_both]' : ''}`}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
