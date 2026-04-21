import { NextResponse } from 'next/server'
import { client } from '../../../../../sanity/lib/client'

export const revalidate = 3600

export async function GET() {
  try {
    // Fetch preachers
    const preachers = await client.fetch(`
      *[_type == "preacher" && isActive == true] | order(name asc) {
        _id,
        name
      }
    `)

    // Fetch series
    const series = await client.fetch(`
      *[_type == "sermonSeries"] | order(title asc) {
        _id,
        title
      }
    `)

    return NextResponse.json({
      preachers: preachers || [],
      series: series || []
    })
  } catch (error) {
    console.error('Error fetching upload options:', error)
    return NextResponse.json(
      { error: 'Failed to fetch options' },
      { status: 500 }
    )
  }
}
