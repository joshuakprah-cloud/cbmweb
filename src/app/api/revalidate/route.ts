import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const secret = body.secret || request.headers.get('x-revalidate-secret')

    if (!secret) {
      return NextResponse.json({ error: 'Missing revalidation secret' }, { status: 400 })
    }

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid revalidation secret' }, { status: 401 })
    }

    revalidatePath('/')
    revalidatePath('/sermons')
    revalidatePath('/events')
    revalidatePath('/blog')
    revalidatePath('/ministries')

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
