import type { Department } from '@/lib/cms/types'
import { media } from './media'

// Sammlung "Abteilungen"
export const departments: Department[] = [
  {
    slug: 'fussball',
    name: 'Fußball',
    icon: 'sports_soccer',
    tagline: 'Von den Bambini bis zu den Alten Herren, mit Frauen- und Mädchenfußball seit 1976.',
    image: media.fussballFinale,
    intro: [
      {
        type: 'paragraph',
        text: 'Fußball ist seit der Gründung 1921 das Herz des TuS Ahrbach. Heute spielen bei uns **alle Altersklassen**: von den Bambini über die Jugend bis zu drei Seniorenmannschaften, den Frauen und den Alten Herren.',
      },
      {
        type: 'paragraph',
        text: 'Damit jedes Kind in seiner Altersklasse spielen kann, bündeln wir die Kräfte mit unseren Nachbarvereinen in Spielgemeinschaften. Neue Spielerinnen und Spieler sind jederzeit willkommen, ein Probetraining geht immer.',
      },
    ],
    partnerships: [
      { name: 'SG Ahrbach', description: 'Seniorenfußball, 1. bis 3. Mannschaft' },
      {
        name: 'JSG Wäller United',
        description: 'A- bis C-Junioren',
        link: { label: 'Zur JSG Wäller United', href: 'https://jsgwaellerunited.vercel.app', external: true },
      },
      { name: 'JSG Ahrbach-Steinefrenz-Staudt', description: 'D-Junioren bis Bambini, mit Spvgg. Steinefrenz/Weroth, SV Staudt, SV Heiligenroth und TuS Girod/Kleinholbach' },
      { name: 'MSG Ahrbach-Montabaur', description: 'Juniorinnen, gemeinsam mit dem 1. FFC Montabaur' },
      { name: 'SG Ahrbach/Höhr-Grenzhausen', description: 'Frauenfußball' },
    ],
    leads: ['peter-olbrich', 'carlos-bauch', 'meike-roeser', 'olaf-stamm'],
  },
  {
    slug: 'handball',
    name: 'Handball',
    icon: 'sports_handball',
    tagline: 'Von den Super Minis bis zur Verbandsliga, gemeinsam mit starken Partnern.',
    image: media.handballFrauen,
    intro: [
      {
        type: 'paragraph',
        text: 'Handball beim TuS Ahrbach heißt Teamgeist in jeder Altersklasse. Die Jugend spielt in der **JSG Ahrbach/Bannberscheid**, die Frauen in der SG Ahrbach/Bannberscheid und die Herren in der **HSG Westerwald**.',
      },
      {
        type: 'paragraph',
        text: 'Trainiert wird in den Kreissporthallen Montabaur, in Westerburg, Wirges, Siershahn, Bannberscheid und in der Schulturnhalle Ruppach-Goldhausen. Wer reinschnuppern möchte, meldet sich einfach bei den Trainerinnen und Trainern.',
      },
    ],
    partnerships: [
      { name: 'JSG Ahrbach/Bannberscheid', description: 'Handballjugend' },
      { name: 'SG Ahrbach/Bannberscheid', description: 'Frauen' },
      { name: 'HSG Westerwald', description: 'Herren, 1. und 2. Mannschaft' },
    ],
    leads: ['oliver-kollig'],
  },
  {
    slug: 'tanzen-turnen',
    name: 'Tanzen & Turnen',
    icon: 'sports_gymnastics',
    tagline: 'Kinderturnen, Showtanz und Gymnastik: Bewegung mit Spaß für alle Generationen.',
    image: media.kinderturnen,
    intro: [
      {
        type: 'paragraph',
        text: 'Ob die ersten Purzelbäume beim Eltern-Kind-Turnen, Choreografien für die Fastnachtsbühne oder ein Ganzkörpertraining in geselliger Runde: In der Abteilung Tanzen & Turnen findet jede Generation ihren Platz.',
      },
      {
        type: 'paragraph',
        text: 'Unsere Tanzgruppen begeistern jedes Jahr bei der **Ruppisch-Golser Fassenacht** und auf den Bühnen im Westerwald.',
      },
    ],
    leads: ['julija-ismajli'],
  },
]
