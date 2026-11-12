import type { Metadata } from 'next'
import { Google_Sans_Flex } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { getSite } from '@/lib/cms'

// Gleiche Schrift wie der Ahrbach Cup; next/font liefert sie vom eigenen Server aus.
// Für Google Sans Flex kennt Next.js keine Metriken für eine angepasste Ersatzschrift,
// daher eigene Ersatzschriften statt adjustFontFallback (sonst Warnung bei jedem Build).
const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} · ${site.claim}`, template: `%s · ${site.name}` },
    description: site.description,
    openGraph: { siteName: site.legalName, locale: 'de_DE', type: 'website' },
  }
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const site = await getSite()
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${googleSansFlex.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#inhalt" className="sr-only z-50 bg-red px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Zum Inhalt springen
        </a>
        <Navbar navigation={site.navigation} cta={site.cta} />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer site={site} />
      </body>
    </html>
  )
}
