import type { Person } from '@/lib/cms/types'

// Sammlung "Personen". Auf der Webseite stehen nur Vereinsadressen (@tus-ahrbach.de),
// keine privaten Anschriften.
export const people: Person[] = [
  // Geschäftsführender Vorstand
  { id: 'rudolf-bauch', name: 'Rudolf Bauch', role: '1. Vorsitzender', group: 'vorstand', email: 'vorsitz@tus-ahrbach.de', phone: '02602 80644' },
  { id: 'volker-wetzlar', name: 'Volker Wetzlar', role: 'Stellv. Vorsitzender', group: 'vorstand', email: 'volker.wetzlar@tus-ahrbach.de' },
  { id: 'raimund-schaefer', name: 'Raimund Schäfer', role: 'Geschäftsführer', group: 'vorstand', email: 'geschaeftsf@tus-ahrbach.de' },
  { id: 'wolfgang-schmitt', name: 'Wolfgang Schmitt', role: 'Schatzmeister', group: 'vorstand', email: 'finanz@tus-ahrbach.de' },
  { id: 'christof-schmidt', name: 'Christof Schmidt', role: 'Stellv. Schatzmeister, Mitgliederverwaltung', group: 'vorstand', email: 'mitglieder@tus-ahrbach.de' },

  // Erweiterter Vorstand: Abteilungsleitungen
  { id: 'peter-olbrich', name: 'Peter Olbrich', role: 'Seniorenfußball', group: 'abteilungsleitung', email: 'peter.olbrich@tus-ahrbach.de' },
  { id: 'carlos-bauch', name: 'Carlos Bauch', role: 'Jugendfußball', group: 'abteilungsleitung', email: 'jugendleiter@tus-ahrbach.de' },
  { id: 'meike-roeser', name: 'Meike Röser', role: 'Frauenfußball', group: 'abteilungsleitung' },
  { id: 'olaf-stamm', name: 'Olaf Stamm', role: 'Alte Herren', group: 'abteilungsleitung', email: 'alteherren@tus-ahrbach.de' },
  { id: 'oliver-kollig', name: 'Oliver Kollig', role: 'Handball', group: 'abteilungsleitung', email: 'handball@tus-ahrbach.de' },
  { id: 'julija-ismajli', name: 'Julija Ismajli', role: 'Tanzen & Turnen', group: 'abteilungsleitung', email: 'julija.ismajli@tus-ahrbach.de' },

  // Weitere Ämter
  { id: 'joerg-simon', name: 'Jörg Simon', role: 'Ehrenamtsbeauftragter', group: 'ehrenamt', email: 'ehrenamt@tus-ahrbach.de' },
  { id: 'redaktion-anpfiff', name: 'Raimund Schäfer', role: 'Redaktion anpfiff', group: 'ehrenamt', email: 'anpfiff@tus-ahrbach.de' },

  // Turnierleitung Ahrbach-Cup (Nummern laut anpfiff 2026/27 und Turnierplakat)
  { id: 'cup-rudolf-bauch', name: 'Rudolf Bauch', role: 'Turnierleitung Ahrbach-Cup', group: 'ahrbach-cup', email: 'ahrbach-cup@tus-ahrbach.de', phone: '0160 5502383' },
  { id: 'cup-raimund-schaefer', name: 'Raimund Schäfer', role: 'Turnierleitung Ahrbach-Cup', group: 'ahrbach-cup', email: 'ahrbach-cup@tus-ahrbach.de', phone: '0173 7251086' },
]
