import type { SiteSettings } from '@/lib/cms/types'

// Globale Einstellungen (im CMS ein "Global"): Stammdaten, Navigation, Footer
export const site: SiteSettings = {
  name: 'TuS Ahrbach',
  legalName: 'TuS Ahrbach 1921 e.V.',
  claim: 'Der lebendige Sportverein im Westerwald',
  hashtag: '#miteinander',
  description:
    'Fußball, Handball, Tanzen und Turnen in Ruppach-Goldhausen: Der TuS Ahrbach 1921 e.V. ist der Familiensportverein im Westerwald. Mannschaften, Termine und Mitgliedschaft.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tus-ahrbach.de',
  address: { street: 'Schäfergasse 3', zip: '56412', city: 'Ruppach-Goldhausen' },
  email: 'vorsitz@tus-ahrbach.de',
  phone: '02602 80644',
  venue: {
    name: 'Sportanlage „Glück Auf“ mit Sportlerheim',
    street: 'Ruppach-Goldhausen',
    city: '56412 Ruppach-Goldhausen',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sportplatz+Ruppach-Goldhausen',
  },
  socials: [
    { platform: 'instagram', label: '@sgahrbach', href: 'https://www.instagram.com/sgahrbach/' },
    { platform: 'facebook', label: 'TuS Ahrbach', href: 'https://www.facebook.com/tusahrbach.de/' },
  ],
  navigation: [
    {
      label: 'Sport',
      href: '/sport',
      children: [
        { label: 'Alle Abteilungen', href: '/sport', description: 'Alle Teams und Gruppen im Überblick' },
        { label: 'Fußball', href: '/sport/fussball', description: 'Bambini bis Alte Herren, Frauen und Mädchen' },
        { label: 'Handball', href: '/sport/handball', description: 'Minis, Jugend, Frauen und Herren' },
        { label: 'Tanzen & Turnen', href: '/sport/tanzen-turnen', description: 'Kinderturnen, Showtanz, Gymnastik' },
      ],
    },
    {
      label: 'Verein',
      href: '/verein',
      children: [
        { label: 'Über uns', href: '/verein', description: 'Der TuS Ahrbach auf einen Blick' },
        { label: 'Vorstand', href: '/verein/vorstand', description: 'Ansprechpartner im Verein' },
        { label: 'Geschichte', href: '/verein/geschichte', description: 'Seit 1921 in Ruppach und Goldhausen' },
        { label: 'Ahrbach-Cup', href: '/verein/ahrbach-cup', description: 'Unser Hallenturnier im Januar' },
        { label: 'Anpfiff', href: '/verein/anpfiff', description: 'Unsere Vereinszeitschrift' },
        { label: 'Sponsoren', href: '/sponsoren', description: 'Danke an unsere Partner' },
      ],
    },
    { label: 'Aktuelles', href: '/aktuelles' },
    { label: 'Termine', href: '/termine' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  cta: { label: 'Mitglied werden', href: '/mitglied-werden' },
  footerLinks: [
    {
      title: 'Sport',
      links: [
        { label: 'Übersicht', href: '/sport' },
        { label: 'Fußball', href: '/sport/fussball' },
        { label: 'Handball', href: '/sport/handball' },
        { label: 'Tanzen & Turnen', href: '/sport/tanzen-turnen' },
      ],
    },
    {
      title: 'Verein',
      links: [
        { label: 'Über uns', href: '/verein' },
        { label: 'Vorstand', href: '/verein/vorstand' },
        { label: 'Ahrbach-Cup', href: '/verein/ahrbach-cup' },
        { label: 'Mitglied werden', href: '/mitglied-werden' },
        { label: 'Sponsoren', href: '/sponsoren' },
        { label: 'Aktuelles', href: '/aktuelles' },
        { label: 'Termine', href: '/termine' },
      ],
    },
    {
      title: 'Partner',
      // TODO: endgültige Adresse der JSG Wäller United eintragen
      links: [
        { label: 'JSG Wäller United', href: 'https://jsgwaellerunited.vercel.app', external: true },
        { label: 'Brinkenlauf', href: 'https://www.brinkenlauf.de', external: true },
      ],
    },
  ],
  legalLinks: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
}
