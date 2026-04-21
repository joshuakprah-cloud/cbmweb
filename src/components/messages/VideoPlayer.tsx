'use client'

import { useState } from 'react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface VideoPlayerProps {
  videoSource?: 'youtube' | 'upload' | 'external' | string
  videoUrl?: string
  videoFile?: any // Sanity file reference
  externalVideoUrl?: string
  title: string
  thumbnail?: any
  autoPlay?: boolean
}

// Extract YouTube video ID from various URL formats
const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

// Check if URL is a video file
const isVideoFile = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.mov', '.webm', '.m4v', '.mkv', '.avi']
  const lowerUrl = url.toLowerCase()
  return videoExtensions.some(ext => lowerUrl.includes(ext))
}

export default function VideoPlayer({
  videoSource = 'youtube',
  videoUrl,
  videoFile,
  externalVideoUrl,
  title,
  thumbnail,
  autoPlay = false
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Determine the actual video URL
  let finalVideoUrl: string | null = null
  let videoType: 'youtube' | 'direct' | 'external' = 'youtube'

  if (videoSource === 'youtube' && videoUrl) {
    const youtubeId = getYouTubeId(videoUrl)
    if (youtubeId) {
      finalVideoUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1${autoPlay ? '&autoplay=1' : ''}`
      videoType = 'youtube'
    }
  } else if (videoSource === 'upload' && videoFile?.asset?.url) {
    finalVideoUrl = videoFile.asset.url
    videoType = 'direct'
  } else if ((videoSource === 'external' || videoSource === 'upload') && externalVideoUrl) {
    finalVideoUrl = externalVideoUrl
    videoType = isVideoFile(externalVideoUrl) ? 'direct' : 'external'
  }

  // Fallback to YouTube URL if specific source not available
  if (!finalVideoUrl && videoUrl) {
    const youtubeId = getYouTubeId(videoUrl)
    if (youtubeId) {
      finalVideoUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1${autoPlay ? '&autoplay=1' : ''}`
      videoType = 'youtube'
    }
  }

  if (!finalVideoUrl) {
    return (
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No video available</p>
        </div>
      </div>
    )
  }

  // YouTube embed
  if (videoType === 'youtube') {
    return (
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            {thumbnail ? (
              <Image
                src={urlFor(thumbnail).url()}
                alt={title}
                fill
                className="object-cover opacity-50"
              />
            ) : (
              <div className="animate-pulse w-full h-full bg-gray-800" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
            </div>
          </div>
        )}
        <iframe
          src={finalVideoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    )
  }

  // Direct video file (HTML5 video)
  if (videoType === 'direct') {
    return (
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            {thumbnail ? (
              <Image
                src={urlFor(thumbnail).url()}
                alt={title}
                fill
                className="object-cover opacity-50"
              />
            ) : (
              <div className="w-full h-full bg-gray-800" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
            </div>
          </div>
        )}
        <video
          src={finalVideoUrl}
          controls
          playsInline
          poster={thumbnail ? urlFor(thumbnail).url() : undefined}
          className="w-full h-full"
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        >
          Your browser does not support the video tag.
        </video>
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
            <div className="text-center text-red-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p>Failed to load video</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // External video (Vimeo, Facebook, etc.) - use iframe
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          {thumbnail ? (
            <Image
              src={urlFor(thumbnail).url()}
              alt={title}
              fill
              className="object-cover opacity-50"
            />
          ) : (
            <div className="animate-pulse w-full h-full bg-gray-800" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
          </div>
        </div>
      )}
      <iframe
        src={finalVideoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
