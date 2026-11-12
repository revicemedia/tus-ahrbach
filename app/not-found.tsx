import { ActionLinks } from '@/components/ui/ActionLink'

export default function NotFound() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">Fehler 404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white uppercase sm:text-6xl">Abseits!</h1>
        <p className="mt-6 max-w-xl text-lg/8 text-white/75">
          Diese Seite gibt es nicht (mehr). Vielleicht hilft einer dieser Links weiter:
        </p>
        <ActionLinks
          inverted
          className="mt-10"
          links={[
            { label: 'Zur Startseite', href: '/' },
            { label: 'Sport & Teams', href: '/sport' },
          ]}
        />
      </div>
    </section>
  )
}
