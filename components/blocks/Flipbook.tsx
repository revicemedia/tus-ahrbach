import MagazineTeaser from '@/components/magazine/MagazineTeaser'
import { Section } from '@/components/ui/Section'
import { getMagazine } from '@/lib/cms'
import type { FlipbookBlock } from '@/lib/cms/types'

// Ausgabe der Vereinszeitschrift: Titelbild mit Inhalt, Lesen im Vollbild-Leser
export default async function Flipbook({ block }: { block: FlipbookBlock }) {
  const magazine = await getMagazine(block.magazine)
  if (!magazine) return null
  return (
    <Section tone="muted" id="lesen">
      <MagazineTeaser magazine={magazine} block={block} />
    </Section>
  )
}
