import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Maximum file size: 500MB for videos
const MAX_FILE_SIZE = 500 * 1024 * 1024

// Allowed video types
const ALLOWED_TYPES = [
  'video/mp4',
  'video/quicktime', // MOV
  'video/webm',
  'video/x-matroska', // MKV
  'video/avi',
  'video/x-msvideo',
]

export async function POST(request: NextRequest) {
  try {
    // Check authentication - you should add your auth logic here
    // For now, we'll just check for a simple API key
    const authHeader = request.headers.get('authorization')
    const apiKey = process.env.UPLOAD_API_KEY
    
    if (apiKey && authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    
    // Get the video file
    const videoFile = formData.get('video') as File | null
    const thumbnailFile = formData.get('thumbnail') as File | null
    const audioFile = formData.get('audio') as File | null
    
    if (!videoFile) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(videoFile.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${videoFile.type}. Allowed: MP4, MOV, WebM, MKV, AVI` },
        { status: 400 }
      )
    }

    // Validate file size
    if (videoFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large: ${(videoFile.size / 1024 / 1024).toFixed(2)}MB. Max: 500MB` },
        { status: 400 }
      )
    }

    // Get sermon metadata from form
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const scriptureReference = formData.get('scriptureReference') as string
    const preacherId = formData.get('preacherId') as string
    const seriesId = formData.get('seriesId') as string
    const duration = formData.get('duration') as string
    const publishedAt = formData.get('publishedAt') as string
    
    if (!title || !preacherId) {
      return NextResponse.json(
        { error: 'Title and preacher are required' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 50)

    // Upload video to Sanity (or external storage)
    // Note: For large files, you should use external storage like Cloudinary, AWS S3, or Mux
    // Here we'll use Sanity's asset upload for simplicity, but with a note about limitations
    
    let videoAsset = null
    let thumbnailAsset = null
    let audioAsset = null

    // Upload video file
    try {
      const videoBuffer = Buffer.from(await videoFile.arrayBuffer())
      videoAsset = await client.assets.upload('file', videoBuffer, {
        filename: videoFile.name,
        contentType: videoFile.type,
      })
    } catch (uploadError) {
      console.error('Video upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload video. Large files should use external storage.' },
        { status: 500 }
      )
    }

    // Upload thumbnail if provided
    if (thumbnailFile) {
      try {
        const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer())
        thumbnailAsset = await client.assets.upload('image', thumbnailBuffer, {
          filename: thumbnailFile.name,
        })
      } catch (err) {
        console.error('Thumbnail upload error:', err)
        // Continue without thumbnail
      }
    }

    // Upload audio if provided
    if (audioFile) {
      try {
        const audioBuffer = Buffer.from(await audioFile.arrayBuffer())
        audioAsset = await client.assets.upload('file', audioBuffer, {
          filename: audioFile.name,
          contentType: audioFile.type,
        })
      } catch (err) {
        console.error('Audio upload error:', err)
        // Continue without audio
      }
    }

    // Create sermon document
    const sermonDoc: any = {
      _type: 'sermon',
      title,
      slug: { current: slug },
      description: description || '',
      excerpt: description ? description.slice(0, 150) + '...' : '',
      scriptureReference: scriptureReference || '',
      videoSource: 'upload',
      videoFile: videoAsset ? {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset._id,
        },
      } : undefined,
      duration: duration || '',
      publishedAt: publishedAt || new Date().toISOString(),
      isPublished: true,
      isFeatured: false,
      preacher: {
        _type: 'reference',
        _ref: preacherId,
      },
    }

    // Add optional fields
    if (seriesId) {
      sermonDoc.series = {
        _type: 'reference',
        _ref: seriesId,
      }
    }

    if (thumbnailAsset) {
      sermonDoc.coverImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: thumbnailAsset._id,
        },
      }
    }

    if (audioAsset) {
      sermonDoc.audioFile = {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: audioAsset._id,
        },
      }
    }

    // Create the sermon in Sanity
    const result = await client.create(sermonDoc)

    return NextResponse.json({
      success: true,
      message: 'Sermon uploaded successfully',
      sermon: {
        id: result._id,
        title: result.title,
        slug: result.slug?.current,
      },
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}

// Alternative: Get upload URL for direct browser-to-storage upload
// This is better for large files
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const provider = searchParams.get('provider') || 'sanity'

  if (provider === 'cloudinary') {
    // Return Cloudinary upload signature
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 500 }
      )
    }

    const timestamp = Math.round(new Date().getTime() / 1000)
    const folder = 'sermons'
    
    // Generate signature (you'd typically do this server-side)
    // This is a simplified version
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
    const crypto = require('crypto')
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex')

    return NextResponse.json({
      uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      params: {
        api_key: apiKey,
        timestamp,
        folder,
        signature,
      },
    })
  }

  // Default: Direct Sanity upload
  return NextResponse.json({
    uploadUrl: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/assets/files/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    requiresAuth: true,
  })
}
