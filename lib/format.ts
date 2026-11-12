import type { ClubEvent, Coach, CoachRole, NewsCategory, Session, Weekday } from './cms/types'

export const weekdays: { key: Weekday; short: string; long: string }[] = [
  { key: 'mo', short: 'Mo', long: 'Montag' },
  { key: 'di', short: 'Di', long: 'Dienstag' },
  { key: 'mi', short: 'Mi', long: 'Mittwoch' },
  { key: 'do', short: 'Do', long: 'Donnerstag' },
  { key: 'fr', short: 'Fr', long: 'Freitag' },
  { key: 'sa', short: 'Sa', long: 'Samstag' },
  { key: 'so', short: 'So', long: 'Sonntag' },
]

export const newsCategoryLabels: Record<NewsCategory, string> = {
  verein: 'Verein',
  fussball: 'Fußball',
  handball: 'Handball',
  'tanzen-turnen': 'Tanzen & Turnen',
  veranstaltung: 'Veranstaltung',
}

export const coachRoles: { key: CoachRole; label: string }[] = [
  { key: 'trainer', label: 'Trainer' },
  { key: 'spielertrainer', label: 'Spielertrainer' },
  { key: 'co-trainer', label: 'Co-Trainer' },
  { key: 'torwarttrainer', label: 'Torwarttrainer' },
  { key: 'uebungsleitung', label: 'Übungsleitung' },
  { key: 'betreuung', label: 'Betreuung' },
  { key: 'kontakt', label: 'Ansprechpartner' },
]

export function coachLabel(coach: Coach) {
  return coach.label ?? coachRoles.find((role) => role.key === coach.role)?.label ?? coach.role
}

// Trainerteam nach Teilteam (D1, D2, …) gruppieren, innerhalb nach Rolle sortieren
export function groupCoaches(coaches: Coach[]) {
  const rank = (coach: Coach) => coachRoles.findIndex((role) => role.key === coach.role)
  const squads: { squad?: string; coaches: Coach[] }[] = []
  for (const coach of coaches) {
    const entry = squads.find((item) => item.squad === coach.squad)
    if (entry) entry.coaches.push(coach)
    else squads.push({ squad: coach.squad, coaches: [coach] })
  }
  for (const entry of squads) entry.coaches.sort((a, b) => rank(a) - rank(b))
  return squads
}

export function weekdayLabel(day: Weekday, length: 'short' | 'long' = 'long') {
  return weekdays.find((weekday) => weekday.key === day)?.[length] ?? day
}

const isClockTime = (value: string) => /^\d{1,2}:\d{2}$/.test(value)

// "19:30–21:30 Uhr", "ab 19:30 Uhr" oder freie Angaben wie "vormittags"
export function sessionTime(session: Session) {
  if (!isClockTime(session.start)) return session.start
  return session.end ? `${session.start}–${session.end} Uhr` : `ab ${session.start} Uhr`
}

// Datumsangaben ohne Zeitzonenverschiebung: ISO-Datum mittags in UTC interpretieren
const asDate = (iso: string) => new Date(`${iso}T12:00:00Z`)

export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return asDate(iso).toLocaleDateString('de-DE', { ...options, timeZone: 'UTC' })
}

export function eventDateParts(event: ClubEvent) {
  const start = asDate(event.start)
  return {
    day: start.toLocaleDateString('de-DE', { day: '2-digit', timeZone: 'UTC' }),
    month: start.toLocaleDateString('de-DE', { month: 'short', timeZone: 'UTC' }).replace('.', ''),
    weekday: start.toLocaleDateString('de-DE', { weekday: 'short', timeZone: 'UTC' }).replace('.', ''),
  }
}

// "8. bis 10. Januar 2027" oder "20. Mai 2027"
export function formatEventRange(event: ClubEvent) {
  if (!event.end || event.end === event.start) return formatDate(event.start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const sameMonth = event.start.slice(0, 7) === event.end.slice(0, 7)
  // { day: 'numeric' } allein liefert "8" ohne Punkt
  const from = sameMonth ? `${formatDate(event.start, { day: 'numeric' }).replace(/\.$/, '')}.` : formatDate(event.start, { day: 'numeric', month: 'long' })
  return `${from} bis ${formatDate(event.end)}`
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '').replace(/^0/, '+49')}`
}
