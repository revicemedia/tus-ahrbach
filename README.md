# TuS Ahrbach – Webseite

Neue Webseite des TuS Ahrbach 1921 e.V. (Ersatz für die WordPress-Seite tus-ahrbach.de).
Next.js 16, Tailwind 4, gleiche Formensprache wie der [Ahrbach Cup](../ahrbachcup).

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Aufbau

| Ordner | Inhalt |
| --- | --- |
| `content/` | Alle Inhalte als Daten: Einstellungen, Seiten, Abteilungen, Gruppen, Personen, News, Termine, Sponsoren |
| `lib/cms/types.ts` | Datenmodell inkl. aller Block-Typen |
| `lib/cms/index.ts` | Einziger Zugriffspunkt auf Inhalte (`getPage`, `getNews`, …) mit `'use cache'` |
| `components/blocks/` | Ein Baustein je Block-Typ, verteilt über `RenderBlocks.tsx` |
| `app/[[...slug]]` | Alle frei gestalteten Seiten inkl. Startseite |
| `app/sport/[abteilung]` | Abteilungsseiten, automatisch aus Abteilung + Gruppen erzeugt |
| `app/aktuelles/[slug]` | News-Beiträge |
| `lib/legacyRedirects.ts` | 301-Weiterleitungen von alten WordPress-Adressen |

### Seiten bestehen aus Blöcken

Jede Seite ist eine Liste von Blöcken (`hero`, `richText`, `imageText`, `stats`, `departments`,
`newsList`, `eventList`, `callToAction`, `cards`, `people`, `feeTable`, `downloads`,
`sponsors`, `timeline`, `faq`, `contact`, `flipbook`). Reihenfolge und Inhalt stehen in `content/pages.ts`.
Blöcke wie `newsList` oder `departments` holen ihre Daten selbst aus den Sammlungen, d. h. eine neue
Gruppe oder ein neuer Termin erscheint automatisch überall.

## anpfiff online

Jede Ausgabe ist ein Eintrag in `content/magazines.ts` und wird mit dem Block `flipbook` blätterbar
angezeigt (Doppelseiten am Desktop, Wischen am Handy, Vollbild, PDF-Download). Neue Ausgabe:

```bash
mkdir -p public/anpfiff/2027-28
cp ~/Downloads/anpfiff.pdf public/anpfiff/2027-28/anpfiff-2027-28.pdf
swift scripts/render-pdf-pages.swift public/anpfiff/2027-28/anpfiff-2027-28.pdf public/anpfiff/2027-28 1600 seite 0.55
swift scripts/render-pdf-pages.swift public/anpfiff/2027-28/anpfiff-2027-28.pdf public/anpfiff/2027-28/vorschau 200 seite 0.6
```

Danach Seitenzahl und Seitenmaße (Ausgabe des Skripts) in `content/magazines.ts` eintragen.
Mit dem CMS übernimmt das ein Upload-Hook: PDF hochladen, Seiten werden automatisch erzeugt.

## Ahrbach-Cup

Der Cup hat keine eigene Webseite mehr, sondern lebt unter `/verein/ahrbach-cup`. Spielpläne,
Live-Ergebnisse und Anmeldeformular aus dem Projekt `../ahrbachcup` werden später hier integriert.

## Plan: CMS für den Vorstand

Geplant ist [Payload CMS](https://payloadcms.com) (wie bei westwoodgaming): läuft in derselben
Next.js-App unter `/admin`, deutsche Oberfläche, Blocks-Feld zum freien Anordnen.

1. Payload installieren, `(frontend)`- und `(payload)`-Route-Groups anlegen (siehe westwoodgaming)
2. Sammlungen 1:1 aus `lib/cms/types.ts` anlegen: `pages` (mit `blocks`-Feld), `departments`, `groups`,
   `people`, `news`, `events`, `sponsors`, `media`, Global `site`
3. Inhalte aus `content/` per Seed-Skript importieren
4. Funktionsrümpfe in `lib/cms/index.ts` auf `payload.find(...)` umstellen, `revalidateTag` in den
   `afterChange`-Hooks (Tags sind schon gesetzt)
5. `components/RichText` durch den Lexical-Renderer ersetzen
6. Rollen: Admin, Vorstand (alles), Abteilung (nur eigene Gruppen/News)

## Offen vor dem Livegang

- Impressum (vertretungsberechtigter Vorstand, Vereinsregister) und Datenschutzerklärung prüfen
- Wappen als SVG (aktuell nur 88 × 100 px PNG)
- Trainingszeiten im Fußball ergänzen, Handball-Daten auf Saison 2026/27 prüfen
- Adresse der JSG-Wäller-United-Seite und endgültige Domain des Ahrbach Cups eintragen
- Fotos je Gruppe ergänzen
