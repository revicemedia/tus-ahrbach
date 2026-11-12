import type { NewsPost } from '@/lib/cms/types'
import { media } from './media'

// Sammlung "News", übernommen von der bisherigen Webseite
export const news: NewsPost[] = [
  {
    slug: 'anpfiff-saison-2026-27',
    title: 'Der neue anpfiff für die Saison 2026/27 ist da',
    date: '2026-11-06',
    category: 'verein',
    excerpt: 'Unsere Vereinszeitschrift ist erschienen: mit dem 40. Ahrbach-Cup, 50 Jahren Frauenfußball, allen Abteilungen und den Terminen für 2027.',
    image: media.anpfiff2026,
    content: [
      { type: 'paragraph', text: 'Die neue Ausgabe unserer Vereinszeitschrift **anpfiff** ist da. Auf vielen Seiten zeigen wir, was im TuS Ahrbach in der vergangenen Saison los war und was uns in der neuen erwartet.' },
      { type: 'heading', level: 2, text: 'Das steht drin' },
      {
        type: 'list',
        items: [
          '40. Ahrbach-Cup',
          'Vorwort und Grußworte',
          'Mitmachen im TuS Ahrbach',
          'Rückblick Ahrbach-Cup 2026',
          '50 Jahre Frauenfußball',
          'Jugend-, Mädchen-, Frauen-, Senioren- und Alte-Herren-Fußball',
          'Grundschulturnier',
          'Handball, Tanzen & Turnen',
          'Kinderfreizeit und Brinkenlauf',
          'Termine 2027',
        ],
      },
      { type: 'paragraph', text: 'Ihr könnt die neue Ausgabe auf der [anpfiff-Seite](/verein/anpfiff) online durchblättern oder als PDF herunterladen. Danke an alle, die Beiträge und Fotos geliefert haben, und an unsere Sponsoren, die den anpfiff möglich machen.' },
    ],
  },
  {
    slug: '40-ahrbach-cup-2027',
    title: '40. Ahrbach-Cup vom 8. bis 10. Januar 2027',
    date: '2026-09-19',
    category: 'fussball',
    excerpt: 'Das Jubiläumsturnier in den Kreissporthallen Montabaur: drei Tage Hallenfußball für Junioren, Frauen, Senioren und Alte Herren.',
    image: media.fussballFinale,
    content: [
      { type: 'paragraph', text: 'Der TuS Ahrbach lädt zum **40. Ahrbacher Hallen-Fußball-Turnier** ein. Die Planungen für unser überregional beliebtes Hallenfußball-Spektakel laufen, die Gruppenauslosung findet Anfang Dezember statt.' },
      { type: 'heading', level: 2, text: 'Vorgesehener Turnierablauf' },
      {
        type: 'list',
        items: [
          '**Freitag, 8. Januar:** 14:00 bis 18:00 Uhr D-Junioren, 18:00 bis 21:30 Uhr Alte Herren',
          '**Samstag, 9. Januar:** 9:00 bis 18:00 Uhr C-, B- und A-Junioren',
          '**Sonntag, 10. Januar:** ab 9:00 Uhr Frauen, ab 12:00 Uhr Senioren',
        ],
      },
      { type: 'paragraph', text: 'Das Startgeld beträgt 30 € für Juniorenmannschaften und 40 € für Senioren- und Frauenmannschaften. Der genaue Zeitplan folgt nach Eingang der Meldungen.' },
    ],
    links: [{ label: 'Alles zum Ahrbach-Cup', href: '/verein/ahrbach-cup' }],
  },
  {
    slug: '50-jahre-frauenfussball',
    title: '50 Jahre Frauenfußball im TuS Ahrbach',
    date: '2026-05-26',
    category: 'fussball',
    excerpt: 'Am 30. und 31. Mai 2026 haben wir ein halbes Jahrhundert Frauenfußball gefeiert, mit vielen Ehemaligen und Gästen der Eindse Boys.',
    image: media.fussballFrauenJubilaeum,
    content: [
      { type: 'paragraph', text: 'Seit 1976 spielen beim TuS Ahrbach Frauen Fußball. Am 30. und 31. Mai 2026 haben wir das Jubiläum auf unserem Sportgelände gefeiert.' },
      { type: 'quote', text: '50 bewegte Jahre Frauenfußball: Als der TuS Ahrbach fast Deutscher Meister wurde.', cite: 'Westerwälder Zeitung, 30. Mai 2026' },
      { type: 'paragraph', text: 'Heute spielen unsere Frauen als SG Ahrbach/Höhr-Grenzhausen in der Bezirksliga. Lust mitzuspielen? Alle Infos stehen auf der [Teamseite der Frauen](/sport/fussball/frauen).' },
    ],
  },
  {
    slug: '13-brinkenlauf',
    title: '13. Brinkenlauf am 24. April 2026',
    date: '2026-03-12',
    category: 'veranstaltung',
    excerpt: 'Gemeinsam mit der Ortsgemeinde Boden laden wir zum Brinkenlauf ein: 10 und 5 Kilometer, Bambini- und Schülerlauf, Walking und Nordic Walking.',
    content: [
      { type: 'paragraph', text: 'Der TuS Ahrbach und die Ortsgemeinde Boden laden zum 13. Brinkenlauf ein.' },
      {
        type: 'list',
        items: ['10 km Volkslauf (Wäller Laufcup)', '5 km Volkslauf', 'Bambinilauf', 'Schülerlauf', 'Walking und Nordic Walking'],
      },
      { type: 'paragraph', text: 'Infos und Anmeldung unter [brinkenlauf.de](https://www.brinkenlauf.de) oder per Mail an info@brinkenlauf.de.' },
    ],
    links: [{ label: 'brinkenlauf.de', href: 'https://www.brinkenlauf.de', external: true }],
  },
  {
    slug: 'ruppisch-golser-fassenacht-2026',
    title: 'Ruppisch-Golser Fassenacht am 14. Februar 2026',
    date: '2026-01-13',
    category: 'veranstaltung',
    excerpt: 'Um 20:11 Uhr geht es los in der Schulturnhalle Ruppach-Goldhausen, danach Aftershow-Party mit PS Beatz.',
    image: media.wakeUpper,
    content: [
      { type: 'paragraph', text: '**Samstag, 14. Februar 2026, 20:11 Uhr** in der Schulturnhalle Ruppach-Goldhausen. Danach Aftershow-Party mit PS Beatz, für das Essen sorgt der Frenzer Grill.' },
      { type: 'paragraph', text: 'Kartenvorverkauf am Samstag, 31. Januar, von 9 bis 12 Uhr im Sportlerheim. Eintritt 10 €, Jugendliche 5 €.' },
    ],
  },
  {
    slug: 'spende-alte-herren-kinderhospiz',
    title: 'Alte Herren spenden 3.500 € an das Kinderhospiz Westerwald',
    date: '2025-10-13',
    category: 'fussball',
    excerpt: 'Der Erlös des Kirmesfrühschoppens geht wie im Vorjahr an den ambulanten Kinder- und Jugendhospizdienst Westerwald.',
    content: [
      { type: 'paragraph', text: 'Der Erlös des Kirmesfrühschoppens 2025, wieder von den Alten Herren am Sportlerheim ausgerichtet, ging wie 2024 an den **ambulanten Kinder- und Jugendhospizdienst Westerwald**. Sage und schreibe 3.500 € konnten übergeben werden.' },
      { type: 'quote', text: 'Wir sind überwältigt und freuen uns auch in diesem Jahr ganz besonders über Ihre tolle Spende. Im Namen der betroffenen Familien möchten wir uns für Ihre Großzügigkeit von Herzen bedanken.', cite: 'Förderverein Kinderhospizarbeit Westerwald' },
    ],
  },
]
