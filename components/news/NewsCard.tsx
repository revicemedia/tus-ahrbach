import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import type { NewsPost } from '@/lib/cms/types'
import { formatDate, newsCategoryLabels } from '@/lib/format'

export default function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-white transition-colors hover:border-navy">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        {post.image ? (
          <Image
            src={post.image.url}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectPosition: post.image.focus }}
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          // Platzhalter ohne Foto: Wappen auf Vereinsgrau
          <div className="flex h-full items-center justify-center opacity-60 grayscale">
            <Logo />
          </div>
        )}
        <span className="absolute top-4 left-4 bg-red px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">{newsCategoryLabels[post.category]}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time dateTime={post.date} className="text-sm text-slate-blue">
          {formatDate(post.date)}
        </time>
        <h3 className="mt-2 text-lg/6 font-extrabold tracking-tight text-pretty text-navy group-hover:text-red">
          <Link href={`/aktuelles/${post.slug}`}>
            {/* ganze Karte klickbar */}
            <span aria-hidden="true" className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm/6 text-slate-blue">{post.excerpt}</p>
      </div>
    </article>
  )
}
