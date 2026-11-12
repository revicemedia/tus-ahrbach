import type { ClubEvent } from '@/lib/cms/types'

// Sammlung "Termine". Vergangene Termine verschwinden automatisch aus "Demnächst".
export const events: ClubEvent[] = [
  {
    slug: 'ahrbach-cup-2027',
    title: '40. Ahrbach-Cup',
    start: '2027-01-08',
    end: '2027-01-10',
    time: 'Fr ab 14 Uhr, Sa und So ab 9 Uhr',
    location: 'Kreissporthallen Montabaur',
    description: 'Das Jubiläumsturnier: drei Tage Hallenfußball für Junioren, Frauen, Senioren und Alte Herren.',
    category: 'fussball',
    link: { label: 'Mehr erfahren', href: '/verein/ahrbach-cup' },
  },
  {
    slug: 'lotto-elf-2027',
    title: 'Lotto-Elf zu Gast in Ruppach-Goldhausen',
    start: '2027-05-20',
    location: 'Sportanlage Ruppach-Goldhausen',
    description: 'Die Traditionsmannschaft Lotto-Elf mit ehemaligen Profis kommt nach Ruppach-Goldhausen.',
    category: 'veranstaltung',
  },
  {
    slug: 'frauenfussball-50-jahre',
    title: '50 Jahre Frauenfußball',
    start: '2026-05-30',
    end: '2026-05-31',
    location: 'Sportgelände TuS Ahrbach',
    category: 'fussball',
  },
  {
    slug: 'brinkenlauf-2026',
    title: '13. Brinkenlauf',
    start: '2026-04-24',
    location: 'Boden',
    category: 'veranstaltung',
    link: { label: 'brinkenlauf.de', href: 'https://www.brinkenlauf.de', external: true },
  },
  {
    slug: 'fassenacht-2026',
    title: 'Ruppisch-Golser Fassenacht',
    start: '2026-02-14',
    time: '20:11 Uhr',
    location: 'Schulturnhalle Ruppach-Goldhausen',
    category: 'veranstaltung',
  },
]
