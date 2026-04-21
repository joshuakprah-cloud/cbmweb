import { createClient } from 'next-sanity'
import { NextRequest, NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

interface YouTubeVideo {
  id: string
  snippet: {
    title: string
    description: string
    publishedAt: string
    thumbnails: {
      high?: { url: string }
      medium?: { url: string }
      default?: { url: string }
    }
    resourceId?: {
      videoId: string
    }
  }
  contentDetails?: {
    videoId: string
    duration?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    const youtubeApiKey = process.env.YOUTUBE_API_KEY
    if (!youtubeApiKey) {
      return NextResponse.json(
        { error: 'YouTube API key not configured' },
        { status: 500 }
      )
    }

    // Get YouTube settings from Sanity
    const settings = await client.fetch(`
      *[_type == "youtubeSettings"][0] {
        playlistId,
        channelId,
        defaultPreacher,
        autoPublish,
        syncEnabled
      }
    `)

    if (!settings) {
      return NextResponse.json(
        { error: 'YouTube settings not configured in Sanity' },
        { status: 400 }
      )
    }

    if (!settings.syncEnabled) {
      return NextResponse.json(
        { error: 'YouTube sync is disabled' },
        { status: 400 }
      )
    }

    if (!settings.playlistId) {
      return NextResponse.json(
        { error: 'YouTube playlist ID not configured' },
        { status: 400 }
      )
    }

    // Fetch videos from YouTube playlist
    const playlistUrl = `${YOUTUBE_API_BASE}/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${settings.playlistId}&key=${youtubeApiKey}`
    
    const playlistResponse = await fetch(playlistUrl)
    if (!playlistResponse.ok) {
      const error = await playlistResponse.text()
      throw new Error(`YouTube API error: ${error}`)
    }

    const playlistData = await playlistResponse.json()
    const videos: YouTubeVideo[] = playlistData.items || []

    // Get existing sermon video IDs to avoid duplicates
    const existingSermons = await client.fetch(`
      *[_type == "sermon" && defined(videoUrl)] {
        "videoId": videoUrl
      }
    `)
    
    const existingVideoIds = new Set(
      existingSermons.map((s: any) => {
        // Extract video ID from various YouTube URL formats
        const match = s.videoId?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
        return match?.[1]
      }).filter(Boolean)
    )

    // Filter out already synced videos
    const newVideos = videos.filter((video: YouTubeVideo) => {
      const videoId = video.contentDetails?.videoId || video.snippet?.resourceId?.videoId
      return videoId && !existingVideoIds.has(videoId)
    })

    if (newVideos.length === 0) {
      // Update last sync time
      await client.patch(settings._id).set({ lastSyncAt: new Date().toISOString() })
      
      return NextResponse.json({
        message: 'No new sermons to sync',
        synced: 0,
        totalInPlaylist: videos.length
      })
    }

    // Get video details for duration
    const videoIds = newVideos.map((v: YouTubeVideo) => 
      v.contentDetails?.videoId || v.snippet?.resourceId?.videoId
    ).join(',')

    const videosUrl = `${YOUTUBE_API_BASE}/videos?part=contentDetails&id=${videoIds}&key=${youtubeApiKey}`
    const videosResponse = await fetch(videosUrl)
    const videosData = await videosResponse.json()
    
    const videoDetails = new Map<string, { duration?: string }>(
      videosData.items?.map((v: any) => [v.id, v.contentDetails as { duration?: string }]) || []
    )

    // Create sermon documents
    const createdSermons = []
    for (const video of newVideos) {
      const videoId = video.contentDetails?.videoId || video.snippet?.resourceId?.videoId
      if (!videoId) continue

      const contentDetails = videoDetails.get(videoId)
      const duration = contentDetails?.duration || 'PT0M0S'
      
      // Parse ISO 8601 duration to readable format
      const durationMatch = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
      const hours = parseInt(durationMatch?.[1] || '0')
      const minutes = parseInt(durationMatch?.[2] || '0')
      const seconds = parseInt(durationMatch?.[3] || '0')
      const formattedDuration = hours > 0 
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes}:${seconds.toString().padStart(2, '0')}`

      // Generate slug from title
      const slug = video.snippet.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 50)

      // Extract scripture reference if mentioned in title/description
      const scriptureMatch = (video.snippet.title + ' ' + video.snippet.description)
        .match(/(\d?\s*[A-Za-z]+)\s+(\d+)(?::(\d+(?:-\d+)?))?/)
      const scriptureReference = scriptureMatch 
        ? `${scriptureMatch[1]} ${scriptureMatch[2]}${scriptureMatch[3] ? ':' + scriptureMatch[3] : ''}`
        : undefined

      const sermonDoc = {
        _type: 'sermon',
        title: video.snippet.title,
        slug: { current: slug },
        description: video.snippet.description.slice(0, 500),
        excerpt: video.snippet.description.slice(0, 150) + '...',
        videoUrl: `https://youtube.com/watch?v=${videoId}`,
        publishedAt: video.snippet.publishedAt,
        duration: formattedDuration,
        scriptureReference,
        isPublished: settings.autoPublish ?? false,
        isFeatured: false,
        ...(settings.defaultPreacher?._ref && {
          preacher: { _type: 'reference', _ref: settings.defaultPreacher._ref }
        }),
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            // Note: YouTube thumbnails are external URLs
            // You may want to download and upload to Sanity
            _ref: video.snippet.thumbnails?.high?.url || 
                  video.snippet.thumbnails?.medium?.url ||
                  video.snippet.thumbnails?.default?.url
          }
        }
      }

      const result = await client.create(sermonDoc)
      createdSermons.push({
        id: result._id,
        title: result.title,
        slug: result.slug?.current
      })
    }

    // Update last sync time
    const settingsDoc = await client.fetch(`*[_type == "youtubeSettings"][0]._id`)
    if (settingsDoc) {
      await client.patch(settingsDoc).set({ lastSyncAt: new Date().toISOString() })
    }

    return NextResponse.json({
      message: `Successfully synced ${createdSermons.length} sermons`,
      synced: createdSermons.length,
      totalInPlaylist: videos.length,
      sermons: createdSermons
    })

  } catch (error) {
    console.error('YouTube sync error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check sync status
export async function GET() {
  try {
    const settings = await client.fetch(`
      *[_type == "youtubeSettings"][0] {
        playlistId,
        syncEnabled,
        lastSyncAt,
        autoPublish,
        "defaultPreacherName": defaultPreacher->name
      }
    `)

    if (!settings) {
      return NextResponse.json({
        configured: false,
        message: 'YouTube settings not configured'
      })
    }

    return NextResponse.json({
      configured: true,
      settings: {
        playlistId: settings.playlistId,
        syncEnabled: settings.syncEnabled,
        lastSyncAt: settings.lastSyncAt,
        autoPublish: settings.autoPublish,
        defaultPreacher: settings.defaultPreacherName
      }
    })
  } catch (error) {
    console.error('Error checking sync status:', error)
    return NextResponse.json(
      { error: 'Failed to check sync status' },
      { status: 500 }
    )
  }
}
