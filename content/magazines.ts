import type { Magazine } from '@/lib/cms/types'

// Sammlung "anpfiff-Ausgaben". Neue Ausgabe: PDF und gerenderte Seiten nach /public/anpfiff/<saison>/
// legen (siehe README) und hier vorne eintragen. Im CMS übernimmt das später ein Upload-Hook.
export const magazines: Magazine[] = [
  {
    slug: '2026-27',
    title: 'anpfiff 2026/27',
    season: '2026/27',
    pdf: { url: '/anpfiff/2026-27/anpfiff-2026-27.pdf', size: '9,4 MB' },
    pageCount: 60,
    pagePattern: '/anpfiff/2026-27/seite-{n}.jpg',
    thumbPattern: '/anpfiff/2026-27/vorschau/seite-{n}.jpg',
    pageWidth: 1600,
    pageHeight: 2245,
    contents: [
      { page: 2, title: '40. Ahrbach-Cup', teaser: 'Das Programm vom 8. bis 10. Januar 2027' },
      { page: 3, title: 'Vorwort', teaser: 'Ein Heft mit neuem Gesicht' },
      { page: 5, title: 'Grußworte', teaser: 'Rudolf Bauch und Bürgermeister Sascha Stein' },
      { page: 7, title: 'Mitmachen', teaser: 'Hier ist noch Platz für dich!' },
      { page: 8, title: 'Ahrbach-Cup 2026', teaser: 'Sieben Wettbewerbe an drei Tagen' },
      { page: 12, title: '50 Jahre Frauenfußball', teaser: 'Vom Finale 1989 bis heute' },
      { page: 16, title: 'Jugendfußball', teaser: 'Von den Bambini bis zur A-Jugend' },
      { page: 30, title: 'Grundschulturnier' },
      { page: 32, title: 'Seniorenfußball' },
      { page: 36, title: 'Alte Herren', teaser: 'Legenden helfen: Ü40 gegen die Lotto-Elf' },
      { page: 38, title: 'Mädchenfußball' },
      { page: 40, title: 'Frauenfußball' },
      { page: 42, title: 'Handball', teaser: 'Mit 110 im Bus zum Länderspiel nach Köln' },
      { page: 47, title: 'Tanzen & Turnen', teaser: 'Neue Tänze, neue Kostüme' },
      { page: 54, title: 'Kinderfreizeit', teaser: '35 Kinder, drei Tage Weibern' },
      { page: 56, title: 'Brinkenlauf' },
      { page: 58, title: 'Termine 2027, Impressum & Danke' },
    ],
  },
]
