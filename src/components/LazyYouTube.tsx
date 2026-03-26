'use client'

import { useState, useRef, useEffect } from 'react'

interface LazyYouTubeProps {
  videoId: string
  title: string
  className?: string
}

export default function LazyYouTube({ videoId, title, className = '' }: LazyYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsLoaded(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isLoaded])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isLoaded ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <p className="text-gray-500 text-sm">Click to load video</p>
            <button
              onClick={() => setIsLoaded(true)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Load Video
            </button>
          </div>
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}
