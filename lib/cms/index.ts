import { cacheLife, cacheTag } from 'next/cache'
import { departments } from '@/content/departments'
import { events } from '@/content/events'
import { groups } from '@/content/groups'
import { magazines } from '@/content/magazines'
import { news } from '@/content/news'
import { pages } from '@/content/pages'
import { people } from '@/content/people'
import { site } from '@/content/site'
import { sponsors } from '@/content/sponsors'
import type { ClubEvent, DepartmentSlug, PersonGroup } from './types'

// Einziger Zugriffspunkt auf Inhalte. Heute kommen sie aus /content, später aus dem CMS:
// Dann ändern sich nur die Funktionsrümpfe hier (z. B. payload.find({ collection: 'news' })),
// Seiten und Komponenten bleiben gleich. Die Cache-Tags passen zu den späteren
// revalidateTag-Aufrufen in den afterChange-Hooks des CMS.

export async function getSite() {
  'use cache'
  cacheLife('days')
  cacheTag('site')
  return site
}

export async function getPage(slug: string) {
  'use cache'
  cacheLife('days')
  cacheTag('pages')
  return pages.find((page) => page.slug === slug) ?? null
}

export async function getPageSlugs() {
  'use cache'
  cacheLife('days')
  cacheTag('pages')
  return pages.map((page) => page.slug)
}

export async function getDepartments() {
  'use cache'
  cacheLife('days')
  cacheTag('departments')
  return departments
}

export async function getDepartment(slug: string) {
  'use cache'
  cacheLife('days')
  cacheTag('departments')
  return departments.find((department) => department.slug === slug) ?? null
}

export async function getGroups(department?: DepartmentSlug) {
  'use cache'
  cacheLife('days')
  cacheTag('groups')
  return department ? groups.filter((group) => group.department === department) : groups
}

export async function getGroup(department: string, slug: string) {
  'use cache'
  cacheLife('days')
  cacheTag('groups')
  return groups.find((group) => group.department === department && group.slug === slug) ?? null
}

export async function getPeople(ids?: string[]) {
  'use cache'
  cacheLife('days')
  cacheTag('people')
  if (!ids) return people
  // Reihenfolge der übergebenen IDs beibehalten
  return ids.flatMap((id) => people.find((person) => person.id === id) ?? [])
}

export async function getPeopleByGroup(group: PersonGroup) {
  'use cache'
  cacheLife('days')
  cacheTag('people')
  return people.filter((person) => person.group === group)
}

export async function getNews(limit?: number) {
  'use cache'
  cacheLife('hours')
  cacheTag('news')
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date))
  return limit ? sorted.slice(0, limit) : sorted
}

export async function getNewsPost(slug: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('news')
  return news.find((post) => post.slug === slug) ?? null
}

// Kommende und vergangene Termine. Das heutige Datum wird mit gecacht; durch cacheLife('hours')
// rutschen vergangene Termine spätestens nach ein paar Stunden aus "Demnächst".
export async function getEvents() {
  'use cache'
  cacheLife('hours')
  cacheTag('events')
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' })
  const lastDay = (event: ClubEvent) => event.end ?? event.start
  const upcoming = events.filter((event) => lastDay(event) >= today).sort((a, b) => a.start.localeCompare(b.start))
  const past = events.filter((event) => lastDay(event) < today).sort((a, b) => b.start.localeCompare(a.start))
  return { upcoming, past }
}

export async function getSponsors() {
  'use cache'
  cacheLife('days')
  cacheTag('sponsors')
  return sponsors
}

export async function getMagazine(slug: string) {
  'use cache'
  cacheLife('days')
  cacheTag('magazines')
  return magazines.find((magazine) => magazine.slug === slug) ?? null
}
