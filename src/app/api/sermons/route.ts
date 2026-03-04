import { createClient } from 'next-sanity'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function GET() {
  try {
    const sermons = await client.fetch(`
      *[_type == "sermon"] | order(date desc) {
        _id,
        title,
        slug,
        preacher->{
          _id,
          name,
          slug,
          photo,
          bio
        },
        date,
        videoUrl,
        audioUrl,
        series,
        scripture,
        notes,
        branch
      }
    `)

    return NextResponse.json({ sermons })
  } catch (error) {
    console.error('Error fetching sermons:', error)
    return NextResponse.json({ error: 'Failed to fetch sermons' }, { status: 500 })
  }
}
