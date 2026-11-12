import type { MetadataRoute } from 'next'
import { getDepartments, getGroups, getNews, getPageSlugs, getSite } from '@/lib/cms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, slugs, departments, groups, posts] = await Promise.all([getSite(), getPageSlugs(), getDepartments(), getGroups(), getNews()])
  const url = (path: string) => new URL(path, site.url).toString()
  return [
    ...slugs.map((slug) => ({ url: url(`/${slug}`) })),
    ...departments.map((department) => ({ url: url(`/sport/${department.slug}`) })),
    ...groups.map((group) => ({ url: url(`/sport/${group.department}/${group.slug}`) })),
    ...posts.map((post) => ({ url: url(`/aktuelles/${post.slug}`), lastModified: post.date })),
  ]
}
