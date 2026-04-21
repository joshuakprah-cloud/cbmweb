import React from 'react';
import { Metadata } from 'next';
import SectionHeader from '@/components/about/SectionHeader';
import SeriesCard from '@/components/messages/SeriesCard';
import { client } from '../../../../sanity/lib/client';
import { uniqueSeriesQuery } from '../../../../sanity/lib/queries';
import { SERIES_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const metaTitle = 'Sermon Series | ThaGospel Church';
  const metaDescription = 'Browse sermon series from ThaGospel Church. Discover teachings organized by topic and theme.';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
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

export default async function SeriesPage() {
  let sermonsData = null;

  try {
    sermonsData = await client.fetch(uniqueSeriesQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching series data:', error);
    // Continue with null data - will use fallbacks
  }

  // Process series data to get unique series with counts and date ranges
  const seriesMap = new Map();
  
  if (sermonsData) {
    sermonsData.forEach((sermon: any) => {
      if (sermon.seriesTitle && sermon.seriesSlug) {
        if (!seriesMap.has(sermon.seriesSlug)) {
          seriesMap.set(sermon.seriesSlug, {
            seriesTitle: sermon.seriesTitle,
            seriesSlug: sermon.seriesSlug,
            seriesCoverImage: sermon.seriesCoverImage,
            sermons: [],
            firstDate: sermon.publishedAt,
            lastDate: sermon.publishedAt,
          });
        }
        
        const series = seriesMap.get(sermon.seriesSlug);
        series.sermons.push(sermon);
        
        // Update date range
        if (new Date(sermon.publishedAt) < new Date(series.firstDate)) {
          series.firstDate = sermon.publishedAt;
        }
        if (new Date(sermon.publishedAt) > new Date(series.lastDate)) {
          series.lastDate = sermon.publishedAt;
        }
      }
    });
  }

  const series = Array.from(seriesMap.values());

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sermon Series',
    description: 'Browse sermon series from ThaGospel Church',
    url: 'https://thagospel.com/messages/series',
    itemListElement: series.map((seriesItem: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWorkSeries',
        name: seriesItem.seriesTitle,
        description: `${seriesItem.sermons.length} sermons`,
        url: `https://thagospel.com/messages/series/${seriesItem.seriesSlug}`,
      },
    })),
  };

  return (
    <>
      <Script
        id="series-json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section
        className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden"
        role="banner"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
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
            {SERIES_FALLBACKS.title}
          </h1>
          {SERIES_FALLBACKS.subtitle && (
            <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              {SERIES_FALLBACKS.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Browse Series"
            subtitle="Explore our complete collection"
          />
          
          {series.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {series.map((seriesItem: any) => (
                <SeriesCard
                  key={seriesItem.seriesSlug}
                  series={{
                    ...seriesItem,
                    sermonCount: seriesItem.sermons.length,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {SERIES_FALLBACKS.noSeries}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
