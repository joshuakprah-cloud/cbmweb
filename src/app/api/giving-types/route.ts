import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN!,
})

export async function GET() {
  try {
    const givingTypes = await client.fetch(`
      *[_type == "givingType" && isActive == true]{
        _id,
        title,
        description,
        suggestedAmounts
      }
    `)
    return NextResponse.json(givingTypes)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch giving types' }, { status: 500 })
  }
}
