import { client } from 'sanity/lib/client'
import { sermonsQuery } from 'sanity/lib/queries'
import SermonsClient from '../../components/SermonsClient'

export const revalidate = 60

interface Sermon {
  _id: string
  title: string
  slug: { current: string }
  preacher: { name: string; _id: string }
  date: string
  videoUrl?: string
  audioUrl?: string
  series: string
  scripture?: string
}

export default async function SermonsPage() {
  const sermons = await client.fetch(sermonsQuery, {}, { next: { revalidate: 60 } }) as Sermon[]

  return <SermonsClient initialSermons={sermons} />
}
