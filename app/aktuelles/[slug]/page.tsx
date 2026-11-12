import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Icon from '@/components/Icon/Icon'
import NewsCard from '@/components/news/NewsCard'
import RichText from '@/components/RichText/RichText'
import { ActionLinks } from '@/components/ui/ActionLink'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getNews, getNewsPost } from '@/lib/cms'
import { formatDate, newsCategoryLabels } from '@/lib/format'
import PageSkeleton from '@/components/ui/PageSkeleton'

export async function generateStaticParams() {
  const posts = await getNews()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<'/aktuelles/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = await getNewsPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/aktuelles/${post.slug}` },
    openGraph: { type: 'article', publishedTime: post.date, images: post.image ? [post.image.url] : undefined },
  }
}

// Die Adresse (params) wird erst hinter Suspense gelesen, damit die Navigation sofort startet
export default function NewsPostPage({ params }: PageProps<'/aktuelles/[slug]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NewsPostPageContent params={params} />
    </Suspense>
  )
}

async function NewsPostPageContent({ params }: Pick<PageProps<'/aktuelles/[slug]'>, 'params'>) {
  const { slug } = await params
  const post = await getNewsPost(slug)
  if (!post) notFound()
  const more = (await getNews()).filter((other) => other.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article>
        <header className="relative bg-navy">
          <div className="mx-auto max-w-3xl px-6 pt-14 pb-12 lg:px-0">
            <Link href="/aktuelles" className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition-colors hover:text-white">
              <Icon name="chevron_left" className="size-5" />
              Aktuelles
            </Link>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="bg-red px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">{newsCategoryLabels[post.category]}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-balance text-white uppercase sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-lg/8 text-white/75">{post.excerpt}</p>
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-red" />
        </header>

        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-0">
          {post.image && (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(min-width: 768px) 768px, 100vw"
              preload
              className={`mb-10 w-full ${post.image.height > post.image.width ? 'mx-auto max-w-sm' : ''}`}
            />
          )}
          <RichText content={post.content} className="text-lg/8" />
          <ActionLinks links={post.links} className="mt-10" />
        </div>
      </article>

      {more.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="Weiterlesen" title="Mehr aus dem Verein" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((other) => (
              <li key={other.slug}>
                <NewsCard post={other} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
