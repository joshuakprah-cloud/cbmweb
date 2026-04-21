'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../../sanity/lib/image';

interface PreacherCardProps {
  preacher: {
    slug: string;
    name: string;
    photo?: any;
    role?: string;
    tagline?: string;
    bio?: string;
    sermonCount?: number;
  };
}

const PreacherCard: React.FC<PreacherCardProps> = ({ preacher }) => {
  const { slug, name, photo, role, tagline, bio, sermonCount = 0 } = preacher;

  // Generate initials from name
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
      onMouseEnter={() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'preacher_hover', {
            event_category: 'preacher_card',
            event_label: name,
          });
        }
      }}
    >
      {/* Photo Section */}
      <div className="relative pt-8 pb-4 bg-gradient-to-b from-gray-50 to-white flex justify-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
          {photo ? (
            <Image
              src={urlFor(photo).width(112).height(112).url()}
              alt={`${name} photo`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="112px"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{initials}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex flex-col flex-grow text-center">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
          {name}
        </h3>

        {/* Role */}
        {role && (
          <p className="text-sm text-teal-600 font-medium mb-2">{role}</p>
        )}

        {/* Tagline */}
        {tagline && (
          <p className="text-xs text-gray-500 italic mb-3">{tagline}</p>
        )}

        {/* Bio Preview */}
        {bio && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
            {bio}
          </p>
        )}

        {/* Sermon Count */}
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {sermonCount} {sermonCount === 1 ? 'sermon' : 'sermons'}
          </span>
        </div>

        {/* View Sermons Button */}
        <Link
          href={`/sermons/preachers/${slug}`}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 group-hover:shadow-md"
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'preacher_click', {
                event_category: 'preacher_card',
                event_label: name,
                value: sermonCount,
              });
              (window as any).gtag('event', 'view_sermons_per_preacher', {
                event_category: 'engagement',
                event_label: name,
              });
            }
          }}
        >
          View Sermons
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PreacherCard;
