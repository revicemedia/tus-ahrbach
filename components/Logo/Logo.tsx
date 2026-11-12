import Image from 'next/image'

// TODO: Wappen als SVG nachbauen lassen, das PNG ist nur 88 × 100 Pixel groß
export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image alt="" src="/logo.png" width={88} height={100} preload className="h-11 w-auto" />
      <span className={`text-lg/5 font-extrabold tracking-tight uppercase ${inverted ? 'text-white' : 'text-navy'}`}>
        TuS Ahrbach
        <span className="block text-[0.65rem]/4 font-semibold tracking-[0.2em] text-red">1921 e.V. · #miteinander</span>
      </span>
    </span>
  )
}
