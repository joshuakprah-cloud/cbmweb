'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

interface LazyYouTubeProps {
  videoUrl?: string | null;
  title?: string;
  thumbnail?: any;
}

const LazyYouTube: React.FC<LazyYouTubeProps> = ({ videoUrl, title, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string | null): string | null => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  const videoId = getYouTubeId(videoUrl || '');

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (!videoId) {
    return (
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Video not available</p>
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title || 'Sermon video'}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  // Use custom thumbnail if provided, otherwise use YouTube thumbnail
  const thumbnailUrl = thumbnail 
    ? urlFor(thumbnail).width(1280).height(720).url()
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer" onClick={handlePlay}>
      <Image
        src={thumbnailUrl}
        alt={title || 'Sermon thumbnail'}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        priority={true}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      
      {/* Play Button */}
      <button
        className="absolute inset-0 flex items-center justify-center"
        aria-label="Play sermon video"
      >
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg
            className="w-8 h-8 text-gray-900 ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default LazyYouTube;
