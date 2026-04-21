import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import { client } from '../../../../sanity/lib/client';
import { overviewPageQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { CORE_VALUES_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';
import { PortableText } from '@portabletext/react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  let overviewData = null;

  try {
    overviewData = await client.fetch(overviewPageQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching overview metadata:', error);
  }

  const seoData = overviewData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'Church Overview - ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Learn about ThaGospel Church\'s story, mission, vision, and core values.';
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

export default async function Overview() {
  let overviewData = null;

  try {
    overviewData = await client.fetch(overviewPageQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching overview data:', error);
    // Continue with null data - will use fallbacks
  }

  const featuredImage = overviewData?.featuredImage;
  const coreValues = overviewData?.coreValues || CORE_VALUES_FALLBACKS;

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Church Overview"
        subtitle="Discover our story, mission, and community"
      />

      {/* Featured Image Section */}
      {featuredImage && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full h-64 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(featuredImage).width(1200).height(600).url()}
                alt="Church overview featured image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={false}
              />
            </div>
          </div>
        </section>
      )}

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value: any, index: number) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{value.icon || '💎'}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.label}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="vision-mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {overviewData?.missionStatement || 'To raise believers and impact nations through the power of the gospel.'}
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {overviewData?.visionStatement || 'To be a beacon of hope and transformation in our community and beyond.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Story"
            subtitle="How ThaGospel Church began and grew"
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              ThaGospel Church was founded with a vision to create a vibrant community where faith comes alive and lives are transformed through the power of God's word. From humble beginnings to a thriving congregation, we've remained committed to our calling to make disciples and impact our community with the love and message of Jesus Christ.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Through every season of growth and change, our core mission has remained the same: to be a place where people can encounter God's presence, grow in their faith, and find purpose in serving others. We believe that the church is not just a building, but a family of believers committed to making Jesus known in every sphere of life.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader 
            label="Join Our Community"
            title="This Family Has a Place for You."
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/plan-your-visit"
              className="inline-flex items-center px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold uppercase tracking-wide rounded-full transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              Plan Your Visit
            </a>
            <a
              href="/connect/groups"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold uppercase tracking-wide rounded-full transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              Get Connected
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
