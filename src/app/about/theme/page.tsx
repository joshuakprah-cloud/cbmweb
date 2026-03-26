import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import { client } from '../../../../sanity/lib/client';
import { themePageQuery } from '../../../../sanity/lib/queries';
import { THEME_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  let themeData = null;

  try {
    themeData = await client.fetch(themePageQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching theme metadata:', error);
  }

  const seoData = themeData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'This Year\'s Theme - ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Discover this year\'s spiritual theme and focus at ThaGospel Church.';

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
      index: !seoData.noIndex,
      follow: true,
    },
  };
}

export default async function ThemePage() {
  let themeData = null;

  try {
    themeData = await client.fetch(themePageQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching theme data:', error);
    // Continue with null data - will use fallbacks
  }

  const year = themeData?.year || new Date().getFullYear();
  const themeTitle = themeData?.themeTitle || THEME_FALLBACKS.themeTitle;
  const themeSubtitle = themeData?.themeSubtitle || THEME_FALLBACKS.themeSubtitle;
  const scripture = themeData?.scripture || {
    text: themeData?.scriptureText || THEME_FALLBACKS.scriptureText,
    reference: themeData?.scriptureReference || THEME_FALLBACKS.scriptureReference
  };
  const pillars = themeData?.pillars || THEME_FALLBACKS.pillars;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <PageHero 
        title={`${year} Theme`} 
        subtitle="Our spiritual focus and vision for this year"
      />

      {/* Theme Display */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-8 leading-tight">
              {themeTitle}
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              {themeSubtitle}
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12">
              This year, we are called to rise up as leaders who make a lasting impact
              in God's kingdom. Through discipleship, mentorship, and bold faith,
              we will equip the next generation to carry forward the mission of Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Theme Pillars"
            subtitle="The three foundations of our focus this year"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white font-bold">{index + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{pillar.title}</h4>
                <p className="text-gray-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">📖</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Scripture Foundation</h2>
          </div>

          <blockquote className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
            "{scripture.text}"
          </blockquote>

          <cite className="text-xl text-yellow-400 font-semibold">
            — {scripture.reference}
          </cite>
        </div>
      </section>

      {/* Explanation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Spiritual Focus"
            subtitle="Understanding this year's theme"
          />
          
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              This year's theme, "{themeTitle} {themeSubtitle}," is rooted in our
              commitment to developing godly leaders who will carry forward the mission
              of Jesus Christ. We believe that every believer is called to leadership in
              some capacity, whether in the church, workplace, family, or community.
            </p>

            <p>
              Throughout this year, we will focus on the key pillars of our theme:
              equipping leaders with biblical knowledge and practical skills, empowering them 
              with authority and resources to fulfill their calling, and mobilizing them to make a
              meaningful impact in God's kingdom.
            </p>

            <p>
              Our prayer is that this year will see a new generation of leaders emerge,
              equipped and empowered to advance God's purposes on earth. We invite you
              to join us in this important work of leadership development and kingdom
              advancement.
            </p>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
              {year}: Year of Kingdom Impact
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Join the Movement
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Be part of raising leaders who will impact the kingdom of God this year.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/about/leadership"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Meet Our Leaders
            </a>
            <a
              href="/connect/groups"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get Connected
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
