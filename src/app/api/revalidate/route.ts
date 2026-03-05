import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'Revalidation secret not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { secret: bodySecret } = body

    if (bodySecret !== secret) {
      return NextResponse.json({ error: 'Invalid revalidation secret' }, { status: 401 })
    }

    revalidatePath('/')
    revalidatePath('/sermons')
    revalidatePath('/events')
    revalidatePath('/blog')

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
