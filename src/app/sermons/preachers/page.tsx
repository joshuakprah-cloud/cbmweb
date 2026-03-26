import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import { client } from '../../../../sanity/lib/client';
import { allPreachersQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { PREACHERS_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const metaTitle = 'Our Speakers | ThaGospel Church';
  const metaDescription = 'Meet the pastors and teachers at ThaGospel Church. Learn about our speakers and their ministries.';

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

export default async function PreachersPage() {
  let preachersData = null;

  try {
    preachersData = await client.fetch(allPreachersQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching preachers data:', error);
    // Continue with null data - will use fallbacks
  }

  const preachers = preachersData || [];

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Our Speakers',
    description: 'Meet the pastors and teachers at ThaGospel Church',
    url: 'https://thagospel.com/sermons/preachers',
    itemListElement: preachers.map((preacher: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: preacher.name,
        description: preacher.role || 'Speaker at ThaGospel Church',
        url: `https://thagospel.com/sermons/preachers/${preacher.slug}`,
      },
    })),
  };

  return (
    <>
      <Script
        id="preachers-json-ld"
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
              <span className="text-gray-900 font-medium">Speakers</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <PageHero 
        title={PREACHERS_FALLBACKS.title} 
        subtitle={PREACHERS_FALLBACKS.subtitle}
      />

      {/* Preachers Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={PREACHERS_FALLBACKS.title}
            subtitle={PREACHERS_FALLBACKS.subtitle}
          />
          
          {preachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preachers.map((preacher: any) => (
                <div key={preacher.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Photo */}
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    {preacher.photo ? (
                      <Image
                        src={urlFor(preacher.photo).width(96).height(96).url()}
                        alt={preacher.name}
                        width={96}
                        height={96}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 text-lg font-bold">
                          {preacher.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{preacher.name}</h3>
                    
                    {preacher.role && (
                      <p className="text-sm text-gray-600 mb-4">{preacher.role}</p>
                    )}
                    
                    {preacher.bio && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{preacher.bio}</p>
                    )}
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        {preacher.sermonCount || 0} {preacher.sermonCount === 1 ? 'sermon' : 'sermons'}
                      </p>
                    </div>

                    <Link
                      href={`/sermons/preachers/${preacher.slug}`}
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
                    >
                      {PREACHERS_FALLBACKS.viewSermons}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {PREACHERS_FALLBACKS.noPreachers}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
