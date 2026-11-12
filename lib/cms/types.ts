// Datenmodell der Webseite. Es ist so aufgebaut, wie ein Headless-CMS (geplant: Payload, siehe README)
// die Inhalte später liefert: Sammlungen (Abteilungen, Gruppen, News, Termine, ...) und Seiten, deren
// Inhalt eine frei sortierbare Liste von Blöcken ist. Jeder Block hat einen blockType, über den
// components/blocks/RenderBlocks.tsx die passende Komponente wählt.

import type { IconName } from '@/components/Icon/Icon'

// ---------- Grundbausteine ----------

export type Media = {
  url: string
  alt: string
  width: number
  height: number
  // Bildausschnitt bei object-cover, z. B. 'center 30%'
  focus?: string
}

export type LinkItem = {
  label: string
  href: string
  external?: boolean
}

// Einfacher Fließtext. Im Text sind **fett** und [Linktext](/ziel) erlaubt.
// Später ersetzt der Rich-Text-Editor des CMS dieses Format, gerendert wird dann über components/RichText.
export type RichTextNode =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; cite?: string }

export type RichText = RichTextNode[]

// ---------- Sammlungen ----------

export type DepartmentSlug = 'fussball' | 'handball' | 'tanzen-turnen'

export type Department = {
  slug: DepartmentSlug
  name: string
  icon: IconName
  tagline: string
  intro: RichText
  image: Media
  // Spielgemeinschaften und Kooperationen, in denen die Teams antreten
  partnerships?: { name: string; description: string; link?: LinkItem }[]
  // Personen-IDs der Abteilungsleitung (Sammlung people)
  leads: string[]
  // zusätzliche Blöcke unterhalb der Gruppenliste
  layout?: Block[]
}

export type AudienceKey = 'kinder' | 'jugend' | 'erwachsene'

export type Weekday = 'mo' | 'di' | 'mi' | 'do' | 'fr' | 'sa' | 'so'

export type Session = {
  day: Weekday
  start: string
  end?: string
  location?: string
  note?: string
}

export type Contact = {
  name: string
  role?: string
  phone?: string
  email?: string
  image?: Media
}

// Rollen im Trainerteam, Reihenfolge = Sortierung auf der Seite (siehe lib/format.ts)
export type CoachRole = 'trainer' | 'spielertrainer' | 'co-trainer' | 'torwarttrainer' | 'uebungsleitung' | 'betreuung' | 'kontakt'

export type Coach = {
  name: string
  role: CoachRole
  // abweichende Bezeichnung, z. B. 'Trainerin' oder 'Helferin'
  label?: string
  // Teilteam bei mehreren Mannschaften einer Altersklasse, z. B. 'D1'
  squad?: string
  phone?: string
  email?: string
  image?: Media
}

// Eine Mannschaft oder Trainingsgruppe
export type Group = {
  slug: string
  department: DepartmentSlug
  // Untergruppe innerhalb der Abteilung, z. B. 'Junioren' oder 'Kinder'
  section: string
  name: string
  audience: AudienceKey
  ageLabel?: string
  league?: string
  // Spielgemeinschaft, unter deren Namen das Team antritt
  team?: string
  // Anzahl Mannschaften dieser Altersklasse, z. B. 3 bei D1 bis D3
  squads?: number
  season?: string
  sessions: Session[]
  coaches: Coach[]
  // allgemeiner Kontakt, falls kein Trainer direkt erreichbar ist
  contact?: Contact
  // kurzer Anreißer für Kacheln
  teaser?: string
  // ausführliche Beschreibung auf der Teamseite
  description?: RichText
  image?: Media
  gallery?: Media[]
  links?: LinkItem[]
  // z. B. 'Trainerin gesucht' oder 'Neue Spieler willkommen'
  notice?: string
}

export type PersonGroup = 'vorstand' | 'abteilungsleitung' | 'ehrenamt' | 'ahrbach-cup'

export type Person = {
  id: string
  name: string
  role: string
  group: PersonGroup
  email?: string
  phone?: string
  image?: Media
}

export type NewsCategory = 'verein' | 'fussball' | 'handball' | 'tanzen-turnen' | 'veranstaltung'

export type NewsPost = {
  slug: string
  title: string
  date: string
  category: NewsCategory
  excerpt: string
  image?: Media
  content: RichText
  links?: LinkItem[]
}

export type ClubEvent = {
  slug: string
  title: string
  // ISO-Datum (YYYY-MM-DD), bei mehrtägigen Terminen zusätzlich end
  start: string
  end?: string
  time?: string
  location: string
  description?: string
  category: NewsCategory
  link?: LinkItem
}

export type SponsorTier = 'premium' | 'partner'

export type Sponsor = {
  name: string
  tier: SponsorTier
  description?: string
  url?: string
  logo?: Media
  // Hintergrund der Logo-Kachel, z. B. für weiße Logos
  background?: string
}

// Ausgabe der Vereinszeitschrift anpfiff. Die Seiten liegen als Bilder vor (aus der PDF gerendert),
// damit sie überall schnell laden und sich auch am Handy durchblättern lassen.
export type Magazine = {
  slug: string
  title: string
  season: string
  pdf: { url: string; size: string }
  pageCount: number
  // Pfad der Seitenbilder, {n} wird durch die zweistellige Seitenzahl ersetzt
  pagePattern: string
  thumbPattern: string
  pageWidth: number
  pageHeight: number
  // Inhaltsverzeichnis: Klick öffnet den Viewer direkt auf der Seite
  contents?: { title: string; page: number; teaser?: string }[]
}

export type Page = {
  slug: string
  title: string
  description: string
  layout: Block[]
}

export type NavItem = {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

export type SiteSettings = {
  name: string
  legalName: string
  claim: string
  hashtag: string
  description: string
  url: string
  address: { street: string; zip: string; city: string }
  email: string
  phone?: string
  venue: { name: string; street: string; city: string; mapsUrl: string }
  socials: { platform: 'instagram' | 'facebook'; label: string; href: string }[]
  navigation: NavItem[]
  cta: LinkItem
  footerLinks: { title: string; links: LinkItem[] }[]
  legalLinks: LinkItem[]
}

// ---------- Blöcke ----------
// Jeder Block entspricht später einem Payload-Block. Felder ohne Fragezeichen sind Pflichtfelder.

type BlockBase = { id: string }

export type HeroBlock = BlockBase & {
  blockType: 'hero'
  // home: großes Bild über die volle Breite, page: kompakter Seitenkopf
  variant: 'home' | 'page'
  eyebrow?: string
  title: string
  text?: string
  image?: Media
  facts?: string[]
  actions?: LinkItem[]
}

export type RichTextBlock = BlockBase & {
  blockType: 'richText'
  eyebrow?: string
  title?: string
  content: RichText
  // Hintergrund der Sektion
  tone?: 'white' | 'muted'
}

export type ImageTextBlock = BlockBase & {
  blockType: 'imageText'
  eyebrow?: string
  title: string
  content: RichText
  image: Media
  imagePosition?: 'left' | 'right'
  actions?: LinkItem[]
  tone?: 'white' | 'muted'
}

export type StatsBlock = BlockBase & {
  blockType: 'stats'
  items: { value: string; label: string }[]
}

export type DepartmentsBlock = BlockBase & {
  blockType: 'departments'
  eyebrow?: string
  title: string
  text?: string
}

export type NewsListBlock = BlockBase & {
  blockType: 'newsList'
  eyebrow?: string
  title: string
  // ohne limit alle Beiträge
  limit?: number
  showAllLink?: boolean
}

export type EventListBlock = BlockBase & {
  blockType: 'eventList'
  eyebrow?: string
  title: string
  limit?: number
  showAllLink?: boolean
  // zusätzlich vergangene Termine als Rückblick zeigen
  showPast?: boolean
}

export type CallToActionBlock = BlockBase & {
  blockType: 'callToAction'
  eyebrow?: string
  title: string
  text?: string
  facts?: string[]
  actions: LinkItem[]
  tone?: 'red' | 'navy'
  image?: Media
  // große Zahl oder kurzes Wort als Hintergrundmotiv, z. B. '40' für das Cup-Jubiläum
  highlight?: string
}

export type CardsBlock = BlockBase & {
  blockType: 'cards'
  eyebrow?: string
  title?: string
  text?: string
  columns?: 2 | 3 | 4
  items: { title: string; text: string; icon?: IconName; href?: string; image?: Media; meta?: string }[]
  tone?: 'white' | 'muted'
}

export type PeopleBlock = BlockBase & {
  blockType: 'people'
  eyebrow?: string
  title: string
  text?: string
  group: PersonGroup
}

export type FeeTableBlock = BlockBase & {
  blockType: 'feeTable'
  eyebrow?: string
  title: string
  text?: string
  rows: { label: string; description?: string; monthly: string; halfYearly: string }[]
  note?: string
}

export type DownloadsBlock = BlockBase & {
  blockType: 'downloads'
  eyebrow?: string
  title: string
  items: { label: string; description?: string; href: string; fileType: string }[]
}

export type SponsorsBlock = BlockBase & {
  blockType: 'sponsors'
  eyebrow?: string
  title: string
  text?: string
  // compact: Logo-/Namensleiste, z. B. auf der Startseite
  variant: 'full' | 'compact'
}

export type TimelineBlock = BlockBase & {
  blockType: 'timeline'
  eyebrow?: string
  title: string
  items: { year: string; title: string; text: string }[]
}

export type FaqBlock = BlockBase & {
  blockType: 'faq'
  eyebrow?: string
  title: string
  items: { question: string; answer: string }[]
}

export type FlipbookBlock = BlockBase & {
  blockType: 'flipbook'
  eyebrow?: string
  title?: string
  text?: string
  // slug der Ausgabe aus der Sammlung magazines
  magazine: string
}

export type ContactBlock = BlockBase & {
  blockType: 'contact'
  eyebrow?: string
  title: string
  text?: string
  // Personen-IDs, die als direkte Ansprechpartner erscheinen
  people: string[]
}

export type Block =
  | HeroBlock
  | RichTextBlock
  | ImageTextBlock
  | StatsBlock
  | DepartmentsBlock
  | NewsListBlock
  | EventListBlock
  | CallToActionBlock
  | CardsBlock
  | PeopleBlock
  | FeeTableBlock
  | DownloadsBlock
  | SponsorsBlock
  | TimelineBlock
  | FaqBlock
  | ContactBlock
  | FlipbookBlock

export type BlockType = Block['blockType']
