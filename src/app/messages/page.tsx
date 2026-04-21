import { Metadata } from 'next';
import SectionHeader from '@/components/about/SectionHeader';
import LazyYouTubeWrapper from '@/components/messages/LazyYouTubeWrapper';
import SermonBrowserWrapper from '@/components/messages/SermonBrowserWrapper';
import { client } from '@/sanity/lib/client';
import { featuredSermonQuery, allSermonsQuery, sermonsPageQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { SERMONS_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';

export const revalidate = 60; // Revalidate every 60 seconds

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
    name: 'Latest Messages',
    description: 'Latest messages from ThaGospel Church',
    url: 'https://thagospel.com/messages',
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
        url: `https://thagospel.com/messages/${sermon.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        id="sermons-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden"
        role="banner"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: heroImage 
              ? `url(${urlFor(heroImage).url()})` 
              : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        />
        
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              {heroSubtitle}
            </p>
          )}
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
                    href={`/messages/${featuredSermon.slug}`}
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
            title="Recent Messages"
            subtitle="Watch and listen to our latest teachings"
          />
          
          <SermonBrowserWrapper sermons={sermons} />
        </div>
      </section>
    </>
  );
}
