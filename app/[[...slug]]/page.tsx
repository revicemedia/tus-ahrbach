import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RenderBlocks from '@/components/blocks/RenderBlocks'
import { getPage, getPageSlugs } from '@/lib/cms'

// Alle frei gestalteten Seiten aus der Sammlung "Seiten", inklusive Startseite (slug '').
// Spezielle Routen wie /sport/[abteilung] oder /aktuelles/[slug] liegen in eigenen Ordnern
// und haben Vorrang vor diesem Catch-all.

export async function generateStaticParams() {
  const slugs = await getPageSlugs()
  return slugs.map((slug) => ({ slug: slug ? slug.split('/') : [] }))
}

export async function generateMetadata({ params }: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug?.join('/') ?? '')
  if (!page) return {}
  return {
    // Startseite nutzt den Standardtitel aus dem Layout
    title: page.slug ? page.title : undefined,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
  }
}

export default async function Page({ params }: PageProps<'/[[...slug]]'>) {
  const { slug } = await params
  const page = await getPage(slug?.join('/') ?? '')
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}
