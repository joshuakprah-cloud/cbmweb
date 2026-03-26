import React from 'react';
import { Metadata } from 'next';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import { client } from '../../../../sanity/lib/client';
import { connectedPageQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { CONNECTED_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  let connectedData = null;

  try {
    connectedData = await client.fetch(connectedPageQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching connected metadata:', error);
  }

  const seoData = connectedData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'Get Connected - ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Find your place in our community. Join our church family, request prayer, or get involved in ministry at ThaGospel Church.';
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

export default async function ConnectedPage() {
  let connectedData = null;

  try {
    connectedData = await client.fetch(connectedPageQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching connected data:', error);
    // Continue with null data - will use fallbacks
  }

  const heroTitle = connectedData?.heroTitle || CONNECTED_FALLBACKS.heroTitle;
  const heroSubtitle = connectedData?.heroSubtitle || CONNECTED_FALLBACKS.heroSubtitle;
  const pathways = connectedData?.pathways || CONNECTED_FALLBACKS.pathways;

  return (
    <>
      {/* Hero Section */}
      <PageHero 
        title={heroTitle} 
        subtitle={heroSubtitle}
      />

      {/* Connection Pathways */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Find Your Path"
            subtitle="Discover ways to connect and grow with our community"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {pathways.map((pathway: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{pathway.title}</h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{pathway.description}</p>
                
                <a
                  href={pathway.ctaLink}
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  {pathway.ctaLabel}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Connection Options */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="More Ways to Connect"
            subtitle="Explore additional opportunities for involvement"
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Small Groups</h3>
              <p className="text-gray-600 mb-4">Join a small group to build meaningful relationships and grow together in faith.</p>
              <a href="/small-groups" className="text-teal-600 hover:text-teal-700 font-medium">Learn More →</a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Volunteer</h3>
              <p className="text-gray-600 mb-4">Use your gifts to serve others and make a difference in our community.</p>
              <a href="/volunteer" className="text-teal-600 hover:text-teal-700 font-medium">Learn More →</a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prayer Request</h3>
              <p className="text-gray-600 mb-4">Let us pray with you and for you. Share your prayer needs with our team.</p>
              <a href="/prayer" className="text-teal-600 hover:text-teal-700 font-medium">Submit Request →</a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Membership</h3>
              <p className="text-gray-600 mb-4">Become an official member and commit to our church family.</p>
              <a href="/membership" className="text-teal-600 hover:text-teal-700 font-medium">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader 
            label="Ready to Connect?"
            title="Take the Next Step Today"
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
              href="/connect/contact"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold uppercase tracking-wide rounded-full transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
