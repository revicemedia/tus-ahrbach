import type { ComponentType } from 'react'
import type { Block, BlockType } from '@/lib/cms/types'
import CallToAction from './CallToAction'
import Cards from './Cards'
import Contact from './Contact'
import Departments from './Departments'
import Downloads from './Downloads'
import EventList from './EventList'
import Faq from './Faq'
import Flipbook from './Flipbook'
import FeeTable from './FeeTable'
import Hero from './Hero'
import ImageText from './ImageText'
import NewsList from './NewsList'
import People from './People'
import RichTextSection from './RichTextSection'
import Sponsors from './Sponsors'
import Stats from './Stats'
import Timeline from './Timeline'

// Zuordnung blockType → Komponente. Ein neuer Block braucht: Typ in lib/cms/types.ts,
// Komponente hier eintragen und (später) die Block-Definition im CMS.
const components: { [Type in BlockType]: ComponentType<{ block: Extract<Block, { blockType: Type }>; priority?: boolean }> } = {
  hero: Hero,
  richText: RichTextSection,
  imageText: ImageText,
  stats: Stats,
  departments: Departments,
  newsList: NewsList,
  eventList: EventList,
  callToAction: CallToAction,
  cards: Cards,
  people: People,
  feeTable: FeeTable,
  downloads: Downloads,
  sponsors: Sponsors,
  timeline: Timeline,
  faq: Faq,
  contact: Contact,
  flipbook: Flipbook,
}

export default function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => {
    const Component = components[block.blockType] as ComponentType<{ block: Block; priority?: boolean }>
    // Das erste Bild der Seite (meist der Hero) wird vorgeladen
    return <Component key={block.id} block={block} priority={index === 0} />
  })
}
