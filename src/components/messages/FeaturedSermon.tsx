'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../../sanity/lib/image';
import LazyYouTubeWrapper from './LazyYouTubeWrapper';

interface FeaturedSermonProps {
  sermon: {
    title: string;
    slug?: string;
    description?: string;
    excerpt?: string;
    publishedAt: string;
    videoUrl?: string;
    audioUrl?: string;
    thumbnail?: any;
    seriesTitle?: string;
    series?: { title?: string };
    preacher?: { name?: string };
    speaker?: { name?: string };
    duration?: string;
    scriptureReference?: string;
  };
  label?: string;
  contextText?: string;
}

export default function FeaturedSermon({ 
  sermon, 
  label = "Latest Message",
  contextText = "Watch our most recent message"
}: FeaturedSermonProps) {
  if (!sermon || sermon.title === 'No featured sermon available') {
    return null;
  }

  const speakerName = sermon.preacher?.name || sermon.speaker?.name || 'Unknown Speaker';
  const seriesName = sermon.seriesTitle || sermon.series?.title;
  const thumbnailUrl = sermon.thumbnail ? urlFor(sermon.thumbnail).url() : null;

  return (
    <section 
      id="featured-sermon" 
      className="py-16 md:py-24 bg-neutral-900 text-white"
      aria-labelledby="featured-sermon-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-full mb-4">
            {label}
          </span>
          <p className="text-gray-400 text-lg">{contextText}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Player */}
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow-2xl">
            {sermon.videoUrl ? (
              <LazyYouTubeWrapper 
                videoUrl={sermon.videoUrl} 
                title={sermon.title} 
                thumbnail={sermon.thumbnail}
              />
            ) : thumbnailUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={thumbnailUrl}
                  alt={sermon.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Link
                    href={`/messages/${sermon.slug}`}
                    className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label={`Watch ${sermon.title}`}
                  >
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">No video available</span>
              </div>
            )}
          </div>
          
          {/* Sermon Details */}
          <div className="space-y-6">
            {/* Speaker - Emphasized */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-teal-400 uppercase tracking-wider font-semibold">Speaker</p>
                <p className="text-xl font-semibold">{speakerName}</p>
              </div>
            </div>

            {/* Title - Emphasized */}
            <h2 id="featured-sermon-heading" className="text-3xl md:text-4xl font-bold leading-tight">
              {sermon.title}
            </h2>
            
            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              {sermon.description || sermon.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(sermon.publishedAt).toLocaleDateString()}</span>
              </div>
              {sermon.duration && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{sermon.duration}</span>
                </div>
              )}
              {seriesName && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{seriesName}</span>
                </div>
              )}
              {sermon.scriptureReference && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{sermon.scriptureReference}</span>
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/messages/${sermon.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'sermon_play', {
                      event_category: 'featured_sermon',
                      event_label: sermon.title,
                    });
                  }
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </Link>
              {sermon.audioUrl && (
                <a
                  href={sermon.audioUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-600 text-teal-400 font-semibold rounded-lg hover:bg-teal-900 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Audio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
