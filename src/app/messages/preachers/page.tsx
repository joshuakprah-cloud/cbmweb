import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
    url: 'https://thagospel.com/messages/preachers',
    itemListElement: preachers.map((preacher: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: preacher.name,
        description: preacher.role || 'Speaker at ThaGospel Church',
        url: `https://thagospel.com/messages/preachers/${preacher.slug}`,
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
            {PREACHERS_FALLBACKS.title}
          </h1>
          {PREACHERS_FALLBACKS.subtitle && (
            <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              {PREACHERS_FALLBACKS.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Preachers Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Speakers"
            subtitle="Meet the people who share God&apos;s word"
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
                      href={`/messages/preachers/${preacher.slug}`}
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
