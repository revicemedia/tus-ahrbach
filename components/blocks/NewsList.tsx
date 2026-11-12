import NewsCard from '@/components/news/NewsCard'
import ActionLink from '@/components/ui/ActionLink'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getNews } from '@/lib/cms'
import type { NewsListBlock } from '@/lib/cms/types'

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
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <NewsCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
