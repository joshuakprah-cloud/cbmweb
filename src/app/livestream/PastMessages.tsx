'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Sermon {
  title: string;
  slug: string;
  publishedAt: string;
  seriesTitle?: string;
  thumbnail?: {
    asset?: {
      url?: string;
    };
  };
  speaker?: {
    name: string;
  };
}

interface PastMessagesProps {
  messages: Sermon[];
}

export function PastMessages({ messages }: PastMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No previous messages available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Past Messages
        </h2>
        <p className="text-gray-600">
          Catch up on recent messages you might have missed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {messages.map((sermon) => (
          <Link
            key={sermon.slug}
            href={`/messages/${sermon.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="aspect-video relative bg-gray-100">
              {sermon.thumbnail?.asset?.url ? (
                <Image
                  src={sermon.thumbnail.asset.url}
                  alt={sermon.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {sermon.seriesTitle && (
                <div className="absolute top-3 left-3 bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                  {sermon.seriesTitle}
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-teal-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2 mb-1">
                {sermon.title}
              </h3>
              <p className="text-sm text-gray-500">
                {sermon.speaker?.name} • {new Date(sermon.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/messages"
          className="inline-flex items-center gap-2 text-teal-600 font-medium hover:underline"
        >
          View All Messages
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
