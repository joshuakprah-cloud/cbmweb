import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret
    const secret = request.headers.get('sanity-webhook-secret') || request.headers.get('x-revalidate-secret') || request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET || process.env.REVALIDATE_SECRET

    if (!secret) {
      return NextResponse.json({ error: 'Missing revalidation secret' }, { status: 400 })
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid revalidation secret' }, { status: 401 })
    }

    // Parse the webhook payload
    const body = await request.json()
    const { _type, slug } = body

    console.log('Webhook received:', { _type, slug })

    // Revalidate based on document type
    if (_type === 'post') {
      // Revalidate individual blog post
      if (slug) {
        revalidatePath(`/media/blog/${slug}`)
        console.log(`Revalidated blog post: /media/blog/${slug}`)
      }
      // Revalidate blog index
      revalidatePath('/media/blog')
      console.log('Revalidated blog index: /media/blog')
    } else if (_type === 'album') {
      // Revalidate individual gallery
      if (slug) {
        revalidatePath(`/media/gallery/${slug}`)
        console.log(`Revalidated gallery: /media/gallery/${slug}`)
      }
      // Revalidate gallery index
      revalidatePath('/media/gallery')
      console.log('Revalidated gallery index: /media/gallery')
    } else if (_type === 'mediaPage') {
      // Revalidate media hub
      revalidatePath('/media')
      console.log('Revalidated media hub: /media')
    } else if (_type === 'event') {
      // Revalidate event pages
      if (slug) {
        revalidatePath(`/events/${slug}`)
        console.log(`Revalidated event: /events/${slug}`)
      }
      // Revalidate events index
      revalidatePath('/events')
      console.log('Revalidated events index: /events')
    } else if (_type === 'ministry') {
      // Revalidate ministry pages
      if (slug) {
        revalidatePath(`/ministries/${slug}`)
        console.log(`Revalidated ministry: /ministries/${slug}`)
      }
      // Revalidate ministries index
      revalidatePath('/ministries')
      console.log('Revalidated ministries index: /ministries')
    } else if (_type === 'blogPage') {
      // Revalidate blog page settings
      revalidatePath('/media/blog')
      console.log('Revalidated blog page: /media/blog')
    } else if (_type === 'galleryPage') {
      // Revalidate gallery page settings
      revalidatePath('/media/gallery')
      console.log('Revalidated gallery page: /media/gallery')
    } else {
      // Revalidate all main paths for unknown types
      revalidatePath('/')
      revalidatePath('/media')
      revalidatePath('/media/blog')
      revalidatePath('/media/gallery')
      revalidatePath('/events')
      revalidatePath('/ministries')
      console.log('Revalidated all pages for unknown type:', _type)
    }

    // Also revalidate by tags if available
    if (body.tags && Array.isArray(body.tags)) {
      console.log('Tags received:', body.tags)
      // Tag-based revalidation can be implemented later if needed
    }

    // Revalidate all main paths (fallback)
    revalidatePath('/')
    revalidatePath('/media')
    revalidatePath('/media/blog')
    revalidatePath('/media/gallery')
    revalidatePath('/ministries')
    revalidatePath('/sermons')
    revalidatePath('/events')
    revalidatePath('/blog')
    revalidatePath('/contact')

    // Revalidate layout for navbar changes
    revalidatePath('/', 'layout')

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: {
        type: _type,
        slug: slug,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
