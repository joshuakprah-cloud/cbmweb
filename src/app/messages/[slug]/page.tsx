import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import VideoPlayer from '@/components/messages/VideoPlayer';
import { client } from '../../../../sanity/lib/client';
import { urlFor } from '../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';
import { PortableText } from '@portabletext/react';
import Script from 'next/script';
import { groq } from 'next-sanity';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

// Query to get all sermon slugs for static generation
const sermonSlugsQuery = groq`
  *[_type == "sermon" && isPublished == true] {
    "slug": slug.current
  }
`;

export async function generateStaticParams() {
  try {
    const sermons = await client.fetch(sermonSlugsQuery, {}, { next: { revalidate: 60 } });
    return sermons.map((sermon: any) => ({
      slug: String(sermon.slug || ''),
    })).filter((item: any) => item.slug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Query to get a single sermon by slug
const sermonBySlugQuery = groq`
  *[_type == "sermon" && slug.current == $slug && isPublished == true][0] {
    title,
    slug,
    description,
    scriptureReference,
    duration,
    publishedAt,
    videoSource,
    videoUrl,
    videoFile,
    externalVideoUrl,
    audioUrl,
    thumbnail,
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    "speaker": preacher->{
      name,
      slug,
      photo,
      bio
    }
  }
`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let sermonData = null;

  try {
    sermonData = await client.fetch(sermonBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching sermon metadata:', error);
  }

  if (!sermonData) {
    return {
      title: 'Sermon Not Found - ThaGospel Church',
      description: 'This sermon could not be found.',
    };
  }

  const metaTitle = `${sermonData.title} - ThaGospel Church`;
  const metaDescription = sermonData.description 
    ? `Listen to "${sermonData.title}" by ${sermonData.speaker.name} at ThaGospel Church. ${sermonData.description.slice(0, 150)}...`
    : `Listen to "${sermonData.title}" by ${sermonData.speaker.name} at ThaGospel Church.`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: sermonData.thumbnail ? [{
        url: urlFor(sermonData.thumbnail).width(1200).height(630).url(),
        alt: sermonData.title,
      }] : undefined,
      type: 'article',
      publishedTime: sermonData.publishedAt,
      authors: [sermonData.speaker.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: sermonData.thumbnail ? [urlFor(sermonData.thumbnail).width(1200).height(630).url()] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SermonDetail({ params }: { params: { slug: string } }) {
  let sermonData = null;

  try {
    sermonData = await client.fetch(sermonBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching sermon data:', error);
  }

  if (!sermonData) {
    notFound();
  }

  // Helper function to extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
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

  // Generate JSON-LD structured data for the sermon
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: sermonData.title,
    description: sermonData.description,
    thumbnailUrl: sermonData.thumbnail ? urlFor(sermonData.thumbnail).url() : undefined,
    uploadDate: sermonData.publishedAt,
    embedUrl: sermonData.videoUrl ? `https://www.youtube-nocookie.com/embed/${getYouTubeId(sermonData.videoUrl)}` : undefined,
    author: {
      '@type': 'Person',
      name: sermonData.speaker.name,
      image: sermonData.speaker.photo ? urlFor(sermonData.speaker.photo).url() : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ThaGospel Church',
      url: 'https://thagospel.com',
    },
  };

  // Generate breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thagospel.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sermons',
        item: 'https://thagospel.com/messages',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: sermonData.title,
        item: `https://thagospel.com/messages/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="sermon-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-4 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <Link href="/messages" className="hover:text-teal-600 transition-colors">Sermons</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">{sermonData.title}</span>
            </li>
          </ol>
        </div>
      </nav>
      
      {/* Hero Section with Video */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
            {/* Video/Content */}
            <div className="order-2 lg:order-1">
              {sermonData.videoUrl || sermonData.videoFile || sermonData.externalVideoUrl ? (
                <VideoPlayer 
                  videoSource={sermonData.videoSource || 'youtube'}
                  videoUrl={sermonData.videoUrl}
                  videoFile={sermonData.videoFile}
                  externalVideoUrl={sermonData.externalVideoUrl}
                  title={sermonData.title}
                  thumbnail={sermonData.thumbnail}
                />
              ) : sermonData.audioUrl ? (
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Audio Sermon</h3>
                    <p className="text-gray-400 mb-4">This sermon is available as audio only</p>
                    <a 
                      href={sermonData.audioUrl}
                      className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
                      download
                    >
                      Download Audio
                    </a>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <p>No media available for this sermon</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              {sermonData.seriesTitle && (
                <span className="inline-block px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded-full">
                  {sermonData.seriesTitle}
                </span>
              )}
              {sermonData.videoSource && sermonData.videoSource !== 'youtube' && (
                <div className="flex items-center space-x-2">
                  <span className="text-teal-400">Source:</span>
                  <span className="capitalize">{sermonData.videoSource}</span>
                </div>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {sermonData.title}
              </h1>
              
              <div className="flex items-center gap-4">
                {sermonData.speaker.photo && (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(sermonData.speaker.photo).width(48).height(48).url()}
                      alt={sermonData.speaker.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium">{sermonData.speaker.name}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(sermonData.publishedAt).toLocaleDateString()}
                    {sermonData.duration && ` • ${sermonData.duration}`}
                  </p>
                </div>
              </div>
              
              {sermonData.scriptureReference && (
                <p className="text-gray-300 italic">
                  {sermonData.scriptureReference}
                </p>
              )}
              
              {sermonData.description && (
                <p className="text-gray-300 leading-relaxed">
                  {sermonData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Speaker Bio */}
            {sermonData.speaker.bio && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Speaker</h2>
                <div className="prose prose-lg max-w-none">
                  {typeof sermonData.speaker.bio === 'object' ? (
                    <PortableText value={sermonData.speaker.bio} />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{sermonData.speaker.bio}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Series Information */}
            {sermonData.seriesTitle && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Series Information</h2>
                {sermonData.seriesCoverImage && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={urlFor(sermonData.seriesCoverImage).width(400).height(200).url()}
                      alt={sermonData.seriesTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <p className="text-gray-700 mb-4">
                  This sermon is part of the "{sermonData.seriesTitle}" series.
                </p>
                <a
                  href={`/messages?series=${sermonData.seriesSlug}`}
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  View Series
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Sermons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More from {sermonData.speaker.name}</h2>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">More sermons coming soon...</p>
            <a
              href={`/messages/preachers/${sermonData.speaker.slug}`}
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              View All Sermons
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
