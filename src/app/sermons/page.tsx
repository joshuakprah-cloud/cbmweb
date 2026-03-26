import { Metadata } from 'next';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import LazyYouTubeWrapper from '@/components/sermons/LazyYouTubeWrapper';
import SermonBrowserWrapper from '@/components/sermons/SermonBrowserWrapper';
import { client } from '@/sanity/lib/client';
import { featuredSermonQuery, allSermonsQuery, sermonsPageQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { SERMONS_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  let sermonsPageData = null;

  try {
    sermonsPageData = await client.fetch(sermonsPageQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching sermons metadata:', error);
  }

  const seoData = sermonsPageData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || `${SEO_FALLBACKS.metaTitle} - Sermons`;
  const metaDescription = seoData.metaDescription || 'Listen to our latest sermons and messages from ThaGospel Church.';
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: !seoData.noIndex,
      follow: true,
    },
  };
}

export default async function SermonsPage() {
  let sermonsPageData = null;
  let featuredSermonData = null;
  let allSermonsData = null;

  try {
    const [sermonsPage, featuredSermon, allSermons] = await Promise.all([
      client.fetch(sermonsPageQuery, {}, { next: { revalidate: 3600 } }),
      client.fetch(featuredSermonQuery, {}, { next: { revalidate: 3600 } }),
      client.fetch(allSermonsQuery, {}, { next: { revalidate: 3600 } }),
    ]);

    sermonsPageData = sermonsPage;
    featuredSermonData = featuredSermon;
    allSermonsData = allSermons;
  } catch (error) {
    console.error('Error fetching sermons data:', error);
    // Continue with null data - will use fallbacks
  }

  const heroTitle = sermonsPageData?.heroTitle || SERMONS_FALLBACKS.heroTitle;
  const heroSubtitle = sermonsPageData?.heroSubtitle || SERMONS_FALLBACKS.heroSubtitle;
  const heroImage = sermonsPageData?.heroImage;
  const featuredSermon = featuredSermonData || SERMONS_FALLBACKS.featuredSermon;
  const sermons = allSermonsData || [];

  // Generate JSON-LD structured data for sermons
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest Sermons',
    description: 'Latest sermons from ThaGospel Church',
    url: 'https://thagospel.com/sermons',
    itemListElement: sermons.slice(0, 10).map((sermon: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: sermon.title,
        description: sermon.description,
        datePublished: sermon.publishedAt,
        author: {
          '@type': 'Person',
          name: sermon.speaker.name,
        },
        url: `https://thagospel.com/sermons/${sermon.slug}`,
      },
    })),
  };

  return (
    <>
      <Script
        id="sermons-json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <PageHero 
        title={heroTitle} 
        subtitle={heroSubtitle}
        image={heroImage}
      />

      {/* Quick Navigation Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Browse by Series Card */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browse by Series</h3>
              <p className="text-gray-600 mb-6">Explore sermon series and themes</p>
              <Link
                href="/sermons/series"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                View Series
              </Link>
            </div>

            {/* Browse by Speaker Card */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browse by Speaker</h3>
              <p className="text-gray-600 mb-6">Find messages by your favorite speakers</p>
              <Link
                href="/sermons/preachers"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                View Speakers
              </Link>
            </div>

            {/* Full Archive Card */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Full Archive</h3>
              <p className="text-gray-600 mb-6">Access all past sermons and messages</p>
              <Link
                href="/sermons/archive"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                View Archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sermon Section */}
      {featuredSermon && featuredSermon.title !== 'No featured sermon available' ? (
        <section id="latest" className="py-20 bg-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              label="Featured Sermon"
              title={featuredSermon.title}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Video Player */}
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <LazyYouTubeWrapper 
                  videoUrl={featuredSermon.videoUrl} 
                  title={featuredSermon.title} 
                  thumbnail={featuredSermon.thumbnail}
                />
              </div>
              
              {/* Sermon Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{featuredSermon.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {featuredSermon.description || featuredSermon.excerpt}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-400">Speaker:</span>
                    <span>{featuredSermon.preacher?.name || featuredSermon.speaker?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-400">Date:</span>
                    <span>{new Date(featuredSermon.publishedAt).toLocaleDateString()}</span>
                  </div>
                  {(featuredSermon.seriesTitle || featuredSermon.series?.title) && (
                    <div className="flex items-center space-x-2">
                      <span className="text-teal-400">Series:</span>
                      <span>{featuredSermon.seriesTitle || featuredSermon.series?.title}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`/sermons/${featuredSermon.slug}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Watch Full Sermon
                  </a>
                  {featuredSermon.audioUrl && (
                    <a
                      href={featuredSermon.audioUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border border-teal-600 text-teal-400 font-semibold rounded-lg hover:bg-teal-900 transition-colors"
                    >
                      Download Audio
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="latest" className="py-20 bg-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Featured Sermon</h2>
            <p className="text-gray-300 text-lg">No featured sermon at this time. Check back soon.</p>
          </div>
        </section>
      )}

      {/* All Sermons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="All Sermons"
            subtitle="Browse our complete collection of messages"
          />
          
          <SermonBrowserWrapper sermons={sermons} />
        </div>
      </section>
    </>
  );
}
