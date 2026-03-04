import { createClient } from 'next-sanity'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for search
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return NextResponse.json({ results: [] })
    }

    const searchTerm = query.trim()

    // Search across posts, events, and sermons
    const results = await client.fetch(`
      *[_type in ["post", "event", "sermon"] && branch == "Ghana HQ" && (
        title match "*" + $searchTerm + "*" ||
        content match "*" + $searchTerm + "*" ||
        description match "*" + $searchTerm + "*" ||
        message match "*" + $searchTerm + "*"
      )] | order(_updatedAt desc)[0...10] {
        _type,
        title,
        slug,
        _updatedAt
      }
    `, { searchTerm })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
