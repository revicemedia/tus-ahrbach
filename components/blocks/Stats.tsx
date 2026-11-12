import type { StatsBlock } from '@/lib/cms/types'

export default function Stats({ block }: { block: StatsBlock }) {
  return (
    <section className="border-b border-line bg-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-line px-6 lg:grid-cols-4 lg:divide-x lg:px-8">
        {block.items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse gap-1 py-8 lg:px-8 lg:first:pl-0">
            <dt className="text-sm text-slate-blue">{item.label}</dt>
            <dd className="text-4xl font-extrabold tracking-tight text-navy">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
