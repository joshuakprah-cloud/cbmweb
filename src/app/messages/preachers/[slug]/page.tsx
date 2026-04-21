import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import SectionHeader from '@/components/about/SectionHeader';
import PageHero from '@/components/about/PageHero';
import SermonCard from '@/components/messages/SermonCard';
import { client } from '../../../../../sanity/lib/client';
import { preacherBySlugQuery, sermonsByPreacherQuery, allPreachersQuery } from '../../../../../sanity/lib/queries';
import { urlFor } from '../../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import { PortableText } from '@portabletext/react';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const preachers = await client.fetch(allPreachersQuery, {}, { next: { revalidate: 3600 } });
    return preachers.map((preacher: any) => ({
      slug: String(preacher.slug?.current || ''),
    })).filter((item: any) => item.slug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let preacherData = null;

  try {
    preacherData = await client.fetch(preacherBySlugQuery, { slug: params.slug }, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching preacher metadata:', error);
  }

  if (!preacherData) {
    return {
      title: 'Preacher Not Found - ThaGospel Church',
      description: 'This preacher could not be found.',
    };
  }

  const metaTitle = `${preacherData.name} Sermons - ThaGospel Church`;
  const metaDescription = preacherData.bio 
    ? `Browse all sermons by ${preacherData.name} from ThaGospel Church. ${preacherData.bio.slice(0, 150)}...`
    : `Browse all sermons by ${preacherData.name} from ThaGospel Church.`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: preacherData.photo ? [{
        url: urlFor(preacherData.photo).width(1200).height(630).url(),
        alt: preacherData.name,
      }] : undefined,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: preacherData.photo ? [urlFor(preacherData.photo).width(1200).height(630).url()] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PreacherDetail({ params }: { params: { slug: string } }) {
  let preacherData: any = null;
  let sermonsData: any = null;

  try {
    const [preacherData, sermonsData] = await Promise.all([
      client.fetch(preacherBySlugQuery, { slug: params.slug }, { next: { revalidate: 3600 } }),
      client.fetch(sermonsByPreacherQuery, { preacherId: params.slug }, { next: { revalidate: 3600 } }),
    ]);
  } catch (error) {
    console.error('Error fetching preacher data:', error);
  }

  if (!preacherData) {
    notFound();
  }

  // Fetch sermons after we have the preacher ID
  let sermons = [];
  if (preacherData && preacherData._id) {
    try {
      sermons = await client.fetch(sermonsByPreacherQuery, { preacherId: preacherData._id }, { next: { revalidate: 3600 } });
    } catch (error) {
      console.error('Error fetching sermons:', error);
    }
  }

  // Generate JSON-LD structured data for the preacher
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: preacherData.name,
    description: preacherData.bio,
    image: preacherData.photo ? urlFor(preacherData.photo).url() : undefined,
    url: `https://thagospel.com/messages/preachers/${preacherData.slug}`,
    jobTitle: 'Preacher',
    worksFor: {
      '@type': 'Organization',
      name: 'ThaGospel Church',
      url: 'https://thagospel.com',
    },
  };

  return (
    <>
      <Script
        id="preacher-structured-data"
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
              <a href="/messages" className="hover:text-teal-600 transition-colors">Sermons</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <a href="/messages/preachers" className="hover:text-teal-600 transition-colors">Speakers</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">{preacherData.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <PageHero 
        title={preacherData.name} 
        subtitle={preacherData.role || 'Speaker at ThaGospel Church'}
      />

      {/* Bio Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            {preacherData.photo && (
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-teal-500">
                <Image
                  src={urlFor(preacherData.photo).width(128).height(128).url()}
                  alt={preacherData.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="max-w-2xl mx-auto" suppressHydrationWarning>
              {preacherData.bio && (
                <div className="prose prose-lg prose-invert max-w-none">
                  {typeof preacherData.bio === 'object' ? (
                    <PortableText value={preacherData.bio} />
                  ) : (
                    <p className="text-lg leading-relaxed" suppressHydrationWarning>{preacherData.bio}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={`Sermons by ${preacherData.name}`}
            subtitle={`Messages and teachings from ${preacherData.name}`}
          />
          
          {sermons.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon: any) => (
                <SermonCard
                  key={sermon.slug}
                  sermon={{
                    ...sermon,
                    speaker: {
                      name: preacherData.name,
                      photo: preacherData.photo,
                    },
                  }}
                  variant="grid"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No sermons found from this preacher yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
