'use client'

import { useId, useState, type ReactNode } from 'react'
import Icon from '@/components/Icon/Icon'

export type SearchableNews = { key: string; text: string; card: ReactNode }

// Groß-/Kleinschreibung und Akzente ignorieren, ß wie ss behandeln
function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss')
}

// Texteingabe über der Beitragsliste, filtert sofort beim Tippen
export default function NewsSearch({ items }: { items: SearchableNews[] }) {
  const [query, setQuery] = useState('')
  const inputId = useId()

  const terms = normalize(query).split(/\s+/).filter(Boolean)
  // alle Suchbegriffe müssen vorkommen, egal in welcher Reihenfolge
  const results = terms.length === 0 ? items : items.filter((item) => terms.every((term) => normalize(item.text).includes(term)))

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor={inputId} className="sr-only">
          Beiträge durchsuchen
        </label>
        <div className="relative w-full sm:max-w-sm">
          <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-blue" />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Beiträge durchsuchen"
            autoComplete="off"
            className="w-full border border-line bg-white py-2.5 pr-10 pl-10 text-base text-navy placeholder:text-slate-blue focus:border-navy focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Suche leeren"
              className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-slate-blue transition-colors hover:text-navy"
            >
              <Icon name="close" className="size-5" />
            </button>
          )}
        </div>
        <p aria-live="polite" className="text-sm text-slate-blue">
          {terms.length > 0 && `${results.length} ${results.length === 1 ? 'Beitrag' : 'Beiträge'} gefunden`}
        </p>
      </div>

      {results.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <li key={item.key}>{item.card}</li>
          ))}
        </ul>
      ) : (
        <div className="border border-line bg-paper px-6 py-12 text-center">
          <p className="font-semibold text-navy">Keine Beiträge zu „{query.trim()}“ gefunden.</p>
          <button type="button" onClick={() => setQuery('')} className="mt-3 text-sm font-semibold text-red transition-colors hover:text-navy">
            Suche zurücksetzen
          </button>
        </div>
      )}
    </div>
  )
}
