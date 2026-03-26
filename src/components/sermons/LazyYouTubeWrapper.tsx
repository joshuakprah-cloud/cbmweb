'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import LazyYouTube to avoid SSR issues
const LazyYouTube = dynamic(() => import('../media/LazyYouTube'), {
  ssr: false,
  loading: () => <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />,
});

interface LazyYouTubeWrapperProps {
  videoUrl?: string;
  title?: string;
  thumbnail?: any;
}

const LazyYouTubeWrapper: React.FC<LazyYouTubeWrapperProps> = ({ videoUrl, title, thumbnail }) => {
  return <LazyYouTube videoUrl={videoUrl} title={title} thumbnail={thumbnail} />;
};

export default LazyYouTubeWrapper;
