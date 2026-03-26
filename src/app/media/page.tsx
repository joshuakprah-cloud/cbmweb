import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import { groq } from 'next-sanity';
import { mediaPageQuery, featuredPostQuery } from 'sanity/lib/queries';

export const revalidate = 60; // 1 minute cache

export async function generateMetadata(): Promise<Metadata> {
  let mediaPageData = null;
  let featuredPost = null;

  try {
    const [pageData, featured] = await Promise.all([
      client.fetch(mediaPageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(featuredPostQuery, {}, { next: { revalidate: 60 } }),
    ]);

    mediaPageData = pageData;
    featuredPost = featured;
  } catch (error) {
    console.error('Error fetching media metadata:', error);
  }

  const seoData = mediaPageData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'Media | ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Explore our media library including sermons, galleries, blog posts, and more from ThaGospel Church.';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: featuredPost?.coverImage ? [urlFor(featuredPost.coverImage).url()] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MediaPage() {
  let mediaPageData = null;
  let featuredPost = null;

  try {
    const [pageData, featured] = await Promise.all([
      client.fetch(mediaPageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(featuredPostQuery, {}, { next: { revalidate: 60 } }),
    ]);

    mediaPageData = pageData;
    featuredPost = featured;
  } catch (error) {
    console.error('Error fetching media data:', error);
    // Continue with null data - will use fallbacks
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Media Hub - ThaGospel Church',
    description: 'Explore our collection of sermons, galleries, blog posts, and more from ThaGospel Church.',
    url: 'https://thagospel.com/media',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 1, // Featured post count
      itemListElement: featuredPost ? [{
        '@type': 'CreativeWork',
        name: featuredPost.title,
        url: `https://thagospel.com/media/blog/${featuredPost.slug}`,
        datePublished: featuredPost.publishedAt,
      }] : [],
    },
  };

  return (
    <>
      <Script
        id="media-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-700 to-purple-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            {mediaPageData?.heroTitle || 'Media Hub'}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg mb-12">
            {mediaPageData?.heroSubtitle || 'Discover our collection of sermons, galleries, blog posts, and inspiration'}
          </p>
        </div>
      </section>

      {/* Media Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Our Content
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From powerful sermons to inspiring stories, find content that feeds your faith and keeps you connected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Sermons Card */}
            <Link href="/sermons" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 0 6 0m0 6a3 3 0 0 6 0m-3 3a3 3 0 0 6 0" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l6 6-6 6" />
                    </svg>
                    <h3 className="text-2xl font-bold">Sermons</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Watch and listen to our latest messages and browse through our complete sermon archive.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Watch Now</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Gallery Card */}
            <Link href="/media/gallery" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16l4.586-4.586a2 2 0 0 2-2m0 4a2 2 0 0 2m0 6a2 2 0 0 2zm2 2a2 2 0 0 6 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.341 14.341a9 9 0 1 1 1m0 18a9 9 0 1 1 1 1" />
                    </svg>
                    <h3 className="text-2xl font-bold">Gallery</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Browse through photos from our events, services, and community activities.
                  </p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    <span>View Gallery</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Blog Card */}
            <Link href="/media/blog" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 6.25a1 1 0 0 1 1m0 1.75a1 1 0 0 1 1m0 2.25a1 1 0 0 1 1M3 4.5a1 1 0 0 1 1m0 1.75a1 1 0 0 1 1" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l6 6-6 6" />
                    </svg>
                    <h3 className="text-2xl font-bold">Blog</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Read inspiring stories, devotionals, and updates from our church community.
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700">
                    <span>Read Stories</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Podcast Card - Disabled */}
            <div 
              className="group opacity-50 cursor-not-allowed"
              aria-disabled="true"
              aria-label="Podcast - Coming Soon"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
                {/* Coming Soon Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gray-800 text-white text-xs font-semibold rounded-full">
                    Coming Soon
                  </span>
                </div>
                
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V4a3 3 0 0 1 3-3z" />
                      <path d="M12 14a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" />
                    </svg>
                    <h3 className="text-2xl font-bold">Podcast</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Listen to our latest sermons and messages on the go.
                  </p>
                  <div className="flex items-center text-gray-400 font-semibold">
                    <span>Coming Soon</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      {featuredPost ? (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Featured Content
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Check out our latest and most popular media content.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link 
                  href={`/media/blog/${featuredPost.slug}`}
                  className="group block"
                >
                  <div className="aspect-video bg-gray-300 flex items-center justify-center relative overflow-hidden">
                    {featuredPost.coverImage ? (
                      <img
                        src={urlFor(featuredPost.coverImage).width(400).height(225).url()}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500 text-center">
                        <div className="text-3xl mb-2">📝</div>
                        <p>No Image</p>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {featuredPost.categoryTitles?.[0] || 'Featured'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{featuredPost.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                    
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      {featuredPost.authorPhoto && (
                        <img
                          src={urlFor(featuredPost.authorPhoto).width(40).height(40).url()}
                          alt={featuredPost.authorName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 font-medium">{featuredPost.authorName}</p>
                        <p className="text-xs text-gray-500">{featuredPost.authorRole}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <time dateTime={featuredPost.publishedAt}>
                        {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span>•</span>
                      <span>{featuredPost.readTime} min read</span>
                      <span>•</span>
                      {featuredPost.categoryTitles?.slice(0, 2).map((category: string, index: number) => (
                        <span key={index}>{category}</span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 mt-4">
                      <span>Read Article</span>
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600">
              No featured content at this time. Check back soon.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
