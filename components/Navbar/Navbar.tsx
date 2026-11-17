'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from '@/components/Icon/Icon'
import Logo from '@/components/Logo/Logo'
import type { LinkItem, NavItem, NewsPost } from '@/lib/cms/types'
import { formatDate, newsCategoryLabels } from '@/lib/format'

export type NewsTeaser = Pick<NewsPost, 'slug' | 'title' | 'date' | 'category' | 'image'>

// Ein Punkt ist aktiv, wenn die aktuelle Seite er selbst oder eine seiner Unterseiten ist
function isActive(item: NavItem, pathname: string): boolean {
  const path = item.href.split('#')[0]
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`) || (item.children ?? []).some((child) => isActive(child, pathname))
}

// Sperrt das Scrollen der Seite, solange das Menü offen ist, und schließt es mit Escape
function useMenuLayer(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (keyEvent: KeyboardEvent) => keyEvent.key === 'Escape' && close()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])
}

export default function Navbar({ navigation, cta, latestNews }: { navigation: NavItem[]; cta: LinkItem; latestNews: NewsTeaser[] }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  // Im mobilen Menü ist immer höchstens ein Bereich aufgeklappt, beim Öffnen der der aktuellen Seite
  const [expanded, setExpanded] = useState<string | null>(null)
  const openMobile = () => {
    setExpanded(navigation.find((item) => item.children && isActive(item, pathname))?.label ?? null)
    setMobileOpen(true)
  }
  const closeMobile = useCallback(() => setMobileOpen(false), [])
  useMenuLayer(mobileOpen, closeMobile)

  // Nach einem Seitenwechsel alle Menüs schließen
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpenDropdown(null)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Höhe h-18 (4,5 rem): Sticky-Leisten darunter nutzen top-18 */}
      <header className="sticky top-0 z-40 bg-white/90 shadow-[0_1px_0] shadow-line backdrop-blur">
        <nav aria-label="Hauptmenü" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
          <Link href="/" className="-m-1.5 shrink-0 p-1.5">
            <span className="sr-only">TuS Ahrbach, zur Startseite</span>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-x-1 lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <Dropdown
                  key={item.label}
                  item={item}
                  news={item.featureNews ? latestNews : undefined}
                  active={isActive(item, pathname)}
                  open={openDropdown === item.label}
                  onOpenChange={(open) => setOpenDropdown(open ? item.label : null)}
                />
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item, pathname) ? 'page' : undefined}
                    className="block px-3 py-2 text-sm font-semibold text-navy uppercase transition-colors hover:text-red aria-[current]:text-red"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="hidden lg:block">
            <Link href={cta.href} className="bg-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy">
              {cta.label}
            </Link>
          </div>

          <button
            type="button"
            onClick={openMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-navy lg:hidden"
          >
            <span className="sr-only">Menü öffnen</span>
            <Icon name="menu" />
          </button>
        </nav>
      </header>

      {/* Vollbild-Ebene außerhalb des Headers: dessen backdrop-blur würde fixed auf die Headerhöhe begrenzen */}
      {mobileOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menü" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white lg:hidden">
          {/* Gleiche Höhe und Trennlinie (Schatten statt Rahmen) wie die Navbar, damit beim Öffnen nichts springt */}
          <div className="flex h-18 shrink-0 items-center justify-between px-6 shadow-[0_1px_0] shadow-line">
            <Link href="/" onClick={closeMobile} className="-m-1.5 p-1.5">
              <span className="sr-only">TuS Ahrbach, zur Startseite</span>
              <Logo />
            </Link>
            <button type="button" onClick={closeMobile} autoFocus className="-m-2.5 inline-flex items-center justify-center p-2.5 text-navy">
              <span className="sr-only">Menü schließen</span>
              <Icon name="close" />
            </button>
          </div>

          <nav aria-label="Mobil" className="flex flex-1 flex-col px-6 py-6">
            <ul className="divide-y divide-line">
              {navigation.map((item) =>
                item.children ? (
                  <MobileSection
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    expanded={expanded === item.label}
                    onToggle={() => setExpanded((current) => (current === item.label ? null : item.label))}
                    onNavigate={closeMobile}
                  />
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      aria-current={isActive(item, pathname) ? 'page' : undefined}
                      className={mobileTopLevel}
                    >
                      {item.label}
                      <Icon name="chevron_right" className="size-6 text-navy/25" />
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-auto pt-10">
              <Link href={cta.href} onClick={closeMobile} className="block bg-red px-4 py-3.5 text-center text-base font-semibold text-white">
                {cta.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

const mobileTopLevel =
  'flex w-full items-center justify-between py-4 text-left text-2xl font-extrabold tracking-tight text-navy uppercase transition-colors hover:text-red aria-[current]:text-red'

// Mobiler Bereich mit Unterpunkten (z. B. Sport, Verein): Klick auf den Oberbegriff klappt auf, die Übersichtsseite ist der erste Unterpunkt
function MobileSection({
  item,
  pathname,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  pathname: string
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  const panelId = `mobile-nav-${item.label.toLowerCase()}`
  const active = isActive(item, pathname)
  return (
    <li>
      <button type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={panelId} className={`${mobileTopLevel} ${active ? 'text-red' : ''}`}>
        {item.label}
        <Icon name="keyboard_arrow_down" className={`size-7 transition-transform duration-200 motion-reduce:transition-none ${expanded ? 'rotate-180 text-red' : 'text-navy/25'}`} />
      </button>
      {/* Aufklappen per grid-template-rows, damit die Höhe ohne feste Werte animiert */}
      <div
        id={panelId}
        inert={!expanded}
        className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <ul className="overflow-hidden">
          {item.children?.map((child, index) => {
            const current = child.href === pathname
            return (
              <li key={child.label} className={index === item.children!.length - 1 ? 'pb-4' : ''}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  aria-current={current ? 'page' : undefined}
                  className="group flex items-center gap-3 border-l border-line py-2.5 pl-4 transition-colors hover:border-red aria-[current]:border-red"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold text-navy group-hover:text-red group-aria-[current]:text-red">{child.label}</span>
                    {child.description && <span className="block text-sm text-slate-blue">{child.description}</span>}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

// Aufklappmenü am Desktop: öffnet per Klick oder Tastatur, schließt bei Klick daneben oder Escape
function Dropdown({
  item,
  news,
  active,
  open,
  onOpenChange,
}: {
  item: NavItem
  news?: NewsTeaser[]
  active: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const panelId = `nav-${item.label.toLowerCase()}`

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) onOpenChange(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
        ref.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  return (
    <li
      ref={ref}
      // Mega-Menü richtet sich am Header aus (sticky, also positioniert), das kleine Menü am Menüpunkt
      className={news ? undefined : 'relative'}
      onBlur={(event) => {
        // schließen, sobald der Fokus das Menü per Tab verlässt
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onOpenChange(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold uppercase transition-colors hover:text-red ${active || open ? 'text-red' : 'text-navy'}`}
      >
        {item.label}
        <Icon name="keyboard_arrow_down" className={`size-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && news && <MegaPanel id={panelId} item={item} news={news} onNavigate={() => onOpenChange(false)} />}
      {open && !news && (
        <div id={panelId} className="absolute top-full left-1/2 mt-3 w-80 -translate-x-1/2 border border-line bg-white p-2 shadow-xl shadow-navy/10">
          <ul>
            {item.children?.map((child) => (
              <li key={child.label}>
                <Link href={child.href} className="group block px-4 py-3 transition-colors hover:bg-paper">
                  <span className="flex items-center justify-between text-sm font-bold text-navy group-hover:text-red">
                    {child.label}
                    <Icon name="arrow_forward" className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  {child.description && <span className="mt-0.5 block text-sm text-slate-blue">{child.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

// Mega-Menü über die volle Breite: links die Unterseiten in zwei Spalten, rechts die neuesten News
function MegaPanel({ id, item, news, onNavigate }: { id: string; item: NavItem; news: NewsTeaser[]; onNavigate: () => void }) {
  const pathname = usePathname()
  return (
    <div
      id={id}
      // Auch bei Links auf die aktuelle Seite schließen (dort gibt es keinen Seitenwechsel)
      onClick={(event) => (event.target as HTMLElement).closest('a') && onNavigate()}
      className="absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-line bg-white shadow-xl shadow-navy/10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-6 py-8 lg:px-8">
        <ul className="col-span-6 grid grid-cols-2 content-start gap-x-6 gap-y-1">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={child.href === pathname ? 'page' : undefined}
                className="group -mx-4 block px-4 py-3 transition-colors hover:bg-paper"
              >
                <span className="flex items-center justify-between text-sm font-bold text-navy group-hover:text-red group-aria-[current]:text-red">
                  {child.label}
                  <Icon name="arrow_forward" className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                {child.description && <span className="mt-0.5 block text-sm text-slate-blue">{child.description}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {news.length > 0 && (
          <div className="col-span-6 bg-paper p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-semibold tracking-[0.25em] text-slate-blue uppercase">Neueste Beiträge</p>
              <Link href="/aktuelles" className="group inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-red">
                Alle News
                <Icon name="arrow_forward" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {news.map((post) => (
                <li key={post.slug}>
                  <Link href={`/aktuelles/${post.slug}`} className="group flex h-full flex-col border border-line bg-white transition-colors hover:border-navy">
                    <div className="relative aspect-[2/1] overflow-hidden bg-paper">
                      {post.image ? (
                        <Image
                          src={post.image.url}
                          alt=""
                          fill
                          sizes="280px"
                          style={{ objectPosition: post.image.focus }}
                          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                        />
                      ) : (
                        // Platzhalter ohne Foto wie bei den News-Karten
                        <div className="flex h-full items-center justify-center opacity-60 grayscale">
                          <Logo />
                        </div>
                      )}
                      <span className="absolute top-2 left-2 bg-red px-1.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-white uppercase">
                        {newsCategoryLabels[post.category]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-3">
                      <time dateTime={post.date} className="text-xs text-slate-blue">
                        {formatDate(post.date)}
                      </time>
                      <p className="mt-1 line-clamp-2 text-sm/5 font-extrabold tracking-tight text-pretty text-navy group-hover:text-red">{post.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
