// Platzhalter, solange eine Seite aus der Adresse geladen wird: Navy-Kopf wie beim Seiten-Hero
export default function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Seite wird geladen">
      <div className="relative bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="h-3 w-40 animate-pulse bg-white/15" />
          <div className="mt-6 h-10 w-full max-w-md animate-pulse bg-white/15 sm:h-12" />
          <div className="mt-8 h-4 w-full max-w-xl animate-pulse bg-white/10" />
          <div className="mt-3 h-4 w-2/3 max-w-lg animate-pulse bg-white/10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-red" />
      </div>
      <div className="min-h-96 bg-white" />
    </div>
  )
}
