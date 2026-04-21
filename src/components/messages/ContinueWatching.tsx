'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlayIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/solid';
import { useContinueWatching, formatDuration, getRemainingTime } from '@/hooks/useContinueWatching';

interface ContinueWatchingProps {
  className?: string;
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ className = '' }) => {
  const { lastWatched, removeFromHistory, isLoaded } = useContinueWatching();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isLoaded || !lastWatched || isDismissed) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    removeFromHistory(lastWatched.sermonId);
  };

  const progressPercent = Math.min(
    Math.round((lastWatched.currentTime / lastWatched.duration) * 100),
    100
  );
  const remainingTime = getRemainingTime(lastWatched.currentTime, lastWatched.duration);

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-teal-500" />
          Continue Watching
        </h3>
        <button
          onClick={handleDismiss}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Dismiss continue watching"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>

      <Link
        href={`/sermons/${lastWatched.slug}?t=${Math.floor(lastWatched.currentTime)}`}
        className="group flex items-start gap-3 hover:bg-white hover:shadow-sm rounded-lg p-2 -mx-2 transition-all"
      >
        {/* Thumbnail */}
        <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
          {lastWatched.thumbnail ? (
            <Image
              src={lastWatched.thumbnail}
              alt={lastWatched.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-teal-100">
              <PlayIcon className="w-6 h-6 text-teal-500" />
            </div>
          )}
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <PlayIcon className="w-4 h-4 text-teal-600 ml-0.5" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full bg-teal-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
            {lastWatched.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{lastWatched.speaker}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-teal-600 font-medium">
              {progressPercent}% watched
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {remainingTime} left
            </span>
          </div>
        </div>

        {/* Resume button */}
        <div className="flex-shrink-0 self-center">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center group-hover:bg-teal-600 transition-colors">
            <PlayIcon className="w-4 h-4 text-white ml-0.5" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContinueWatching;
