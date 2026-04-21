import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import SermonCard from '@/components/messages/SermonCard';
import LazyYouTubeWrapper from '@/components/messages/LazyYouTubeWrapper';
import { client } from '../../../../../sanity/lib/client';
import { urlFor } from '../../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import { groq } from 'next-sanity';

export const revalidate = 3600;

// Query to get sermons by series slug
const sermonsBySeriesQuery = groq`
  *[_type == "sermon" && isPublished == true && seriesSlug == $seriesSlug] | order(publishedAt desc) {
    title,
    slug,
    description,
    scriptureReference,
    duration,
    publishedAt,
    videoUrl,
    audioUrl,
    thumbnail,
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    "speaker": speaker->{
      name,
      photo,
      slug
    }
  }
`;

// Query to get series info
const seriesBySlugQuery = groq`
  *[_type == "sermon" && isPublished == true && seriesSlug == $seriesSlug][0] {
    seriesTitle,
    seriesSlug,
    seriesCoverImage
  }
`;

export async function generateMetadata({ params }: { params: { series: string } }): Promise<Metadata> {
  const seriesSlug = params.series;
  let seriesData = null;

  try {
    seriesData = await client.fetch(seriesBySlugQuery, { seriesSlug }, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching series metadata:', error);
  }

  if (!seriesData) {
    return {
      title: 'Series Not Found - ThaGospel Church',
      description: 'This sermon series could not be found.',
    };
  }

  const metaTitle = `${seriesData.seriesTitle} Series - ThaGospel Church`;
  const metaDescription = `Browse all sermons in the ${seriesData.seriesTitle} series from ThaGospel Church.`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: seriesData.seriesCoverImage ? [{
        url: urlFor(seriesData.seriesCoverImage).width(1200).height(630).url(),
        alt: seriesData.seriesTitle,
      }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: seriesData.seriesCoverImage ? [urlFor(seriesData.seriesCoverImage).width(1200).height(630).url()] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SeriesDetail({ params }: { params: { series: string } }) {
  const seriesSlug = params.series;
  let seriesData = null;
  let sermonsData = null;

  try {
    const [series, sermons] = await Promise.all([
      client.fetch(seriesBySlugQuery, { seriesSlug }, { next: { revalidate: 3600 } }),
      client.fetch(sermonsBySeriesQuery, { seriesSlug }, { next: { revalidate: 3600 } }),
    ]);

    seriesData = series;
    sermonsData = sermons;
  } catch (error) {
    console.error('Error fetching series data:', error);
  }

  if (!seriesData) {
    notFound();
  }

  // Generate JSON-LD structured data for the series
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${seriesData.seriesTitle} Series`,
    description: `Sermons in the ${seriesData.seriesTitle} series from ThaGospel Church`,
    url: `https://thagospel.com/messages/series/${seriesSlug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sermonsData?.length || 0,
      itemListElement: sermonsData?.map((sermon: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: sermon.title,
          url: `https://thagospel.com/messages/${sermon.slug}`,
          datePublished: sermon.publishedAt,
        },
      })) || [],
    },
  };

  return (
    <div className="min-h-screen">
      <Script
        id="series-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
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
              <a href="/messages" className="hover:text-teal-600 transition-colors">Sermons</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <a href="/messages/series" className="hover:text-teal-600 transition-colors">Series</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">{seriesData.seriesTitle}</span>
            </li>
          </ol>
        </div>
      </nav>
      
      {/* Hero Section */}
      <PageHero 
        title={`${seriesData.seriesTitle} Series`} 
        subtitle={`Sermons from the ${seriesData.seriesTitle} series`}
      />

      {/* Sermons Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={`${seriesData.seriesTitle} Series`}
            subtitle={`${sermonsData?.length || 0} sermons in this series`}
          />
          
          {sermonsData && sermonsData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermonsData.map((sermon: any) => (
                <SermonCard
                  key={sermon.slug}
                  sermon={sermon}
                  variant="grid"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No sermons found in this series yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Back to All Series */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/messages/series"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Series
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
