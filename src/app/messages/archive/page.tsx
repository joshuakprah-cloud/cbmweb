import React from 'react';
import { Metadata } from 'next';
import SectionHeader from '@/components/about/SectionHeader';
import SermonCard from '@/components/messages/SermonCard';
import BackToTopButton from '@/components/ui/BackToTopButton';
import { client } from '../../../../sanity/lib/client';
import { archivePageQuery } from '../../../../sanity/lib/queries';
import { ARCHIVE_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const metaTitle = 'Sermon Archive | ThaGospel Church';
  const metaDescription = 'Browse our complete archive of past sermons and messages from ThaGospel Church. Explore teachings organized by date and year.';

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

interface ArchivePageProps {
  searchParams: { page?: string };
}

export default async function SermonArchive({ searchParams }: ArchivePageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const sermonsPerPage = 12;
  const offset = (currentPage - 1) * sermonsPerPage;

  let allSermonsData = null;

  try {
    allSermonsData = await client.fetch(archivePageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching archive data:', error);
    // Continue with null data - will use fallbacks
  }

  const sermons = allSermonsData || [];
  const totalSermons = sermons.length;
  const totalPages = Math.ceil(totalSermons / sermonsPerPage);
  const paginatedSermons = sermons.slice(offset, offset + sermonsPerPage);

  // Group sermons by year and month
  const groupedSermons = paginatedSermons.reduce((acc: any, sermon: any) => {
    const date = new Date(sermon.publishedAt);
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(sermon);
    
    return acc;
  }, {});

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sermon Archive',
    description: 'Browse our complete archive of past sermons and messages from ThaGospel Church',
    url: 'https://thagospel.com/messages/archive',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalSermons,
      itemListElement: paginatedSermons.map((sermon: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: sermon.title,
          url: `https://thagospel.com/messages/${sermon.slug}`,
          datePublished: sermon.publishedAt,
        },
      })),
    },
  };

  return (
    <>
      <Script
        id="archive-json-ld"
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
            {ARCHIVE_FALLBACKS.title}
          </h1>
          {ARCHIVE_FALLBACKS.description && (
            <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              {ARCHIVE_FALLBACKS.description}
            </p>
          )}
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Browse Archive"
            subtitle="Find messages by year and month"
          />
          
          {paginatedSermons.length > 0 ? (
            <div className="space-y-12">
              {/* Render grouped sermons by year and month */}
              {Object.entries(groupedSermons)
                .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
                .map(([year, months]: [string, any]) => (
                  <div key={year}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{year}</h2>
                    
                    {Object.entries(months)
                      .sort(([monthA], [monthB]) => {
                        const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
                      })
                      .map(([month, monthSermons]: [string, unknown]) => {
                        const sermons = monthSermons as any[];
                        return (
                          <div key={month} className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">{month}</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {sermons.map((sermon: any) => (
                                <SermonCard
                                  key={sermon.slug}
                                  sermon={sermon}
                                  variant="grid"
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  {currentPage > 1 && (
                    <Link
                      href={`/messages/archive?page=${currentPage - 1}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </Link>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/messages/archive?page=${page}`}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === currentPage
                          ? 'bg-teal-600 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                  
                  {currentPage < totalPages && (
                    <Link
                      href={`/messages/archive?page=${currentPage + 1}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No sermons found in the archive.
              </p>
            </div>
          )}
        </div>
      </section>

      <BackToTopButton />
    </>
  );
}
