import React from 'react';
import { Metadata } from 'next';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import SeriesCard from '@/components/sermons/SeriesCard';
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
    url: 'https://thagospel.com/sermons/series',
    itemListElement: series.map((seriesItem: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWorkSeries',
        name: seriesItem.seriesTitle,
        description: `${seriesItem.sermons.length} sermons`,
        url: `https://thagospel.com/sermons/series/${seriesItem.seriesSlug}`,
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
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-4 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <a href="/sermons" className="hover:text-teal-600 transition-colors">Sermons</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Series</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <PageHero 
        title={SERIES_FALLBACKS.title} 
        subtitle={SERIES_FALLBACKS.subtitle}
      />

      {/* Series Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={SERIES_FALLBACKS.title}
            subtitle={SERIES_FALLBACKS.subtitle}
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
