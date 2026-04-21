'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import SermonBrowser to avoid SSR issues
const SermonBrowser = dynamic(() => import('./SermonBrowser'), {
  ssr: false,
  loading: () => <div className="space-y-4 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  </div>,
});

interface SermonBrowserWrapperProps {
  sermons: any[];
}

const SermonBrowserWrapper: React.FC<SermonBrowserWrapperProps> = ({ sermons }) => {
  return <SermonBrowser sermons={sermons} />;
};

export default SermonBrowserWrapper;
