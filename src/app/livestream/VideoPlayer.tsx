'use client';

import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  videoId: string;
  isLive?: boolean;
}

export function VideoPlayer({ videoId, isLive = false }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Construct YouTube embed URL with appropriate parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${
    isLive 
      ? 'autoplay=1&mute=1' 
      : 'rel=0&modestbranding=1'
  }`;

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white">Loading stream...</p>
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        title="Live Stream"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
