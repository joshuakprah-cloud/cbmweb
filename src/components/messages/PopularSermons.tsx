'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FireIcon, PlayIcon, EyeIcon } from '@heroicons/react/24/solid';

interface Sermon {
  _id: string;
  title: string;
  slug: string;
  speaker: string;
  thumbnail?: string;
  views?: number;
  publishedAt: string;
  duration?: string;
  seriesTitle?: string;
}

interface PopularSermonsProps {
  messages: Sermon[];
  className?: string;
  maxDisplay?: number;
}

const PopularSermons: React.FC<PopularSermonsProps> = ({ 
  messages, 
  className = '',
  maxDisplay = 4 
}) => {
  // Sort by views (fallback to recent if no views)
  const sortedSermons = [...messages]
    .sort((a, b) => {
      const viewsA = a.views || 0;
      const viewsB = b.views || 0;
      return viewsB - viewsA;
    })
    .slice(0, maxDisplay);

  // If no messages with views, fall back to recent messages
  const displaySermons = sortedSermons.length > 0 
    ? sortedSermons 
    : messages.slice(0, maxDisplay);

  if (displaySermons.length === 0) {
    return null;
  }

  const formatViewCount = (count?: number): string => {
    if (!count) return '0';
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <FireIcon className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="font-semibold text-gray-900">Popular Sermons</h3>
        </div>
        <Link 
          href="/messages" 
          className="text-sm text-teal-600 hover:text-teal-700 font-medium"
        >
          View All
        </Link>
      </div>

      {/* Sermon List */}
      <div className="space-y-3">
        {displaySermons.map((sermon, index) => (
          <Link
            key={sermon._id}
            href={`/messages/${sermon.slug}`}
            className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white hover:shadow-sm transition-all"
          >
            {/* Rank / Thumbnail */}
            <div className="relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
              {sermon.thumbnail ? (
                <Image
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                  <span className="text-lg font-bold text-teal-600">{index + 1}</span>
                </div>
              )}
              
              {/* Play overlay on hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayIcon className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
                {sermon.title}
              </h4>
              <p className="text-xs text-gray-500">{sermon.speaker}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {sermon.seriesTitle && (
                  <span className="text-xs text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                    {sermon.seriesTitle}
                  </span>
                )}
                {sermon.duration && (
                  <span className="text-xs text-gray-400">{sermon.duration}</span>
                )}
              </div>
            </div>

            {/* Views */}
            {sermon.views !== undefined && sermon.views > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                <EyeIcon className="w-3.5 h-3.5" />
                {formatViewCount(sermon.views)}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <Link
        href="/messages/series"
        className="mt-4 block w-full text-center py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-teal-600 transition-colors"
      >
        Browse by Series
      </Link>
    </div>
  );
};

export default PopularSermons;
