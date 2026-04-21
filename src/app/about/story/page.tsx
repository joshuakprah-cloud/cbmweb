import React from 'react';
import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutCTA from '@/components/about/AboutCTA';
import StoryPortableText from '@/components/about/StoryPortableText';
import { client } from '../../../../sanity/lib/client';
import { storyPageQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { STORY_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';

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
  const foundingYear = storyData?.foundingYear || STORY_FALLBACKS.foundingYear || '2006';
  const founderName = storyData?.founderName || STORY_FALLBACKS.founderName || 'Prophet Powerman Bekoe';
  const heroImage = storyData?.heroImage;
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <AboutHero
        headline="Where It All Began"
        subheadline="Our journey of faith, growth, and community impact."
        bodyText={`Since ${foundingYear}, ThaGospel Church has been on a remarkable journey of faith under the leadership of ${founderName}. What began as a small gathering of believers has blossomed into a vibrant church family with multiple locations and a global online presence.`}
      />

      {/* Story Content */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-20 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          {body ? (
            <StoryPortableText value={body} />
          ) : (
            <div className="space-y-6">
              <p className="text-[17px] text-[#333333] leading-[1.9]">
                Since 2006, ThaGospel Church has been on a remarkable journey of faith, growth, and community impact. What began as a small gathering of believers has blossomed into a vibrant church family with multiple locations and a global online presence.
              </p>
              <p className="text-[17px] text-[#333333] leading-[1.9]">
                Our story is one of God's faithfulness and the power of a community united by love and the Gospel. From humble beginnings to where we are today, every step has been guided by faith and a commitment to raising believers who impact nations.
              </p>
              <blockquote className="border-l-4 border-[#0d9488] pl-6 text-[20px] italic text-[#111111] my-8">
                "Through seasons of challenge and triumph, our church has remained steadfast in its mission. We've witnessed countless lives transformed, families restored, and communities impacted by the power of the Gospel."
              </blockquote>
              <p className="text-[17px] text-[#333333] leading-[1.9]">
                Through seasons of challenge and triumph, our church has remained steadfast in its mission. We've witnessed countless lives transformed, families restored, and communities impacted by the power of the Gospel.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      {historyMilestones.length > 0 && (
        <section className="bg-[#f9fafb] py-20 md:py-24 px-6 md:px-20 border-t border-[#e5e7eb]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <span className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-semibold">Key Milestones</span>
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111] leading-[1.1] mt-3">Our Journey So Far</h2>
            </div>
            
            <div className="relative" role="list">
              {/* Timeline line - gradient */}
              <div 
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] transform md:-translate-x-1/2"
                style={{
                  background: 'linear-gradient(to bottom, #0d9488, rgba(13,148,136,0.1))',
                }}
                aria-hidden="true"
              />
              
              <div className="space-y-12">
                {historyMilestones.map((milestone: any, index: number) => (
                  <div 
                    key={index} 
                    className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    role="listitem"
                  >
                    {/* Year Badge - Circle on timeline */}
                    <div className="absolute left-4 md:left-1/2 w-14 h-14 bg-[#0d9488] rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg">
                      <span className="text-white text-[13px] font-bold">{milestone.year}</span>
                    </div>
                    
                    {/* Content Card */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div className="bg-white rounded-2xl p-7 border border-[#e5e7eb] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                        <h3 className="text-[18px] font-bold text-[#111111]">{milestone.title}</h3>
                        <p className="text-[15px] text-[#555555] leading-[1.7] mt-2">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Final CTA */}
      <AboutCTA />
    </>
  );
}
