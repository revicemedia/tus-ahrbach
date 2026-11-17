import NewsCard from '@/components/news/NewsCard'
import NewsSearch from '@/components/news/NewsSearch'
import ActionLink from '@/components/ui/ActionLink'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getNews } from '@/lib/cms'
import type { NewsListBlock, NewsPost } from '@/lib/cms/types'
import { formatDate, newsCategoryLabels } from '@/lib/format'

export default async function NewsList({ block }: { block: NewsListBlock }) {
  const posts = await getNews(block.limit)
  if (posts.length === 0) return null

  return (
    <Section>
      <SectionHeading
        eyebrow={block.eyebrow}
        title={block.title}
        action={block.showAllLink && <ActionLink link={{ label: 'Alle Beiträge', href: '/aktuelles' }} variant="text" />}
      />
      {block.searchable ? (
        <NewsSearch items={posts.map((post) => ({ key: post.slug, text: searchText(post), card: <NewsCard post={post} /> }))} />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <NewsCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}

// Durchsuchbar: Titel, Kategorie, Datum, Anreißer und Fließtext des Beitrags
function searchText(post: NewsPost) {
  const body: string[] = []
  JSON.stringify(post.content, (key, value) => {
    if (key === 'text' && typeof value === 'string') body.push(value.replace(/\*\*/g, ''))
    return value
  })
  return [post.title, newsCategoryLabels[post.category], formatDate(post.date), post.excerpt, ...body].join(' ')
}
