import React from 'react';
import { Metadata } from 'next';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import SermonCard from '@/components/sermons/SermonCard';
import BackToTopButton from '@/components/ui/BackToTopButton';
import { client } from '../../../../sanity/lib/client';
import { archivePageQuery } from '../../../../sanity/lib/queries';
import { ARCHIVE_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import Link from 'next/link';

export const revalidate = 3600; // 1 hour

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
    allSermonsData = await client.fetch(archivePageQuery, {}, { next: { revalidate: 3600 } });
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
    url: 'https://thagospel.com/sermons/archive',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalSermons,
      itemListElement: paginatedSermons.map((sermon: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: sermon.title,
          url: `https://thagospel.com/sermons/${sermon.slug}`,
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
              <Link href="/sermons" className="hover:text-teal-600 transition-colors">Sermons</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Archive</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <PageHero 
        title="Sermon Archive" 
        subtitle="Browse our complete collection of past sermons and messages"
      />

      {/* Archive Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Sermon Archive"
            subtitle={`${totalSermons} sermons in our collection`}
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
                      href={`/sermons/archive?page=${currentPage - 1}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </Link>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/sermons/archive?page=${page}`}
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
                      href={`/sermons/archive?page=${currentPage + 1}`}
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
