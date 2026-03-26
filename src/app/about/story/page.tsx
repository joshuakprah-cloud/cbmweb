import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import { client } from '../../../../sanity/lib/client';
import { storyPageQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { STORY_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let storyData = null;

  try {
    storyData = await client.fetch(storyPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching story metadata:', error);
  }

  const seoData = storyData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'Our Story | ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Learn about the history, mission, and vision of ThaGospel Church. Discover our journey of faith and community.';
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
      url: 'https://thagospel.com/about/story',
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

export default async function StoryPage() {
  let storyData = null;

  try {
    storyData = await client.fetch(storyPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching story data:', error);
  }

  const title = storyData?.title || STORY_FALLBACKS.title;
  const body = storyData?.body;
  const foundingYear = storyData?.foundingYear || STORY_FALLBACKS.foundingYear;
  const founderName = storyData?.founderName || STORY_FALLBACKS.founderName;
  const heroImage = storyData?.heroImage;
  const missionStatement = storyData?.missionStatement || 'To raise believers and impact nations through the power of the Gospel.';
  const visionStatement = storyData?.visionStatement || 'To be a beacon of hope, love, and transformation in our community and beyond.';
  const historyMilestones = storyData?.historyMilestones || [];

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thagospel.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://thagospel.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Our Story', item: 'https://thagospel.com/about/story' },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/about" className="hover:text-teal-600 transition-colors">About</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gray-900 font-medium">Our Story</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <PageHero 
        title={title} 
        subtitle="The journey of faith, growth, and community"
        image={heroImage}
      />

      {/* Story Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Journey"
            subtitle="How ThaGospel Church began and grew"
          />
          
          <div className="prose prose-lg max-w-none">
            {body ? (
              <PortableText value={body} />
            ) : (
              <p className="text-gray-400 italic">Content coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 lg:p-12 border-2 border-teal-200">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {missionStatement}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-12 border-2 border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {visionStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {historyMilestones.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title="Our Timeline"
              subtitle="Key moments in our journey"
            />
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-teal-200 transform md:-translate-x-1/2" />
              
              <div className="space-y-12">
                {historyMilestones.map((milestone: any, index: number) => (
                  <div key={index} className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-teal-600 rounded-full transform md:-translate-x-1/2 mt-1.5 z-10" />
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-md">
                        <span className="text-teal-600 font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Founding Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader 
                title="Our Foundation"
                subtitle="The beginning of our story"
              />
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Founded</h3>
                    <p className="text-gray-600">{foundingYear}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Founder</h3>
                    <p className="text-gray-600">{founderName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-200">
              {heroImage ? (
                <Image
                  src={urlFor(heroImage).width(600).height(400).url()}
                  alt="Church story hero image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Church story image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader 
            label="Join Our Story"
            title="Be Part of Our Story"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/connect"
              className="inline-flex items-center px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold uppercase tracking-wide rounded-full transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              Be Part of Our Story
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600 font-bold uppercase tracking-wide rounded-full transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
