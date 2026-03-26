import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import { client } from '../../../sanity/lib/client';
import { aboutPageQuery, locationsQuery } from '../../../sanity/lib/queries';
import { urlFor } from '../../../sanity/lib/image';
import { ABOUT_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';
import { PortableText } from '@portabletext/react';
import { BookOpenIcon, UsersIcon, HeartIcon } from '@heroicons/react/24/outline';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let aboutData = null;

  try {
    aboutData = await client.fetch(aboutPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching about metadata:', error);
  }

  const seoData = aboutData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'About Us | ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Learn about ThaGospel Church\'s story, mission, vision, and the community that makes us who we are.';
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
      url: 'https://thagospel.com/about',
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

// Navigation cards data
const navigationCards = [
  {
    title: 'Our Story',
    href: '/about/story',
    description: 'Discover our journey of faith, growth, and community since our founding.',
    icon: BookOpenIcon,
  },
  {
    title: 'Our Beliefs',
    href: '/about/beliefs',
    description: 'Explore the biblical foundations and core doctrines that guide our faith.',
    icon: HeartIcon,
  },
  {
    title: 'Meet the Team',
    href: '/about/leadership',
    description: 'Get to know our pastors and leaders who serve our community.',
    icon: UsersIcon,
  },
];

export default async function AboutOverview() {
  let aboutData = null;
  let locationsData = null;

  try {
    const [about, locations] = await Promise.all([
      client.fetch(aboutPageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(locationsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    aboutData = about;
    locationsData = locations;
  } catch (error) {
    console.error('Error fetching about data:', error);
  }

  const heroTitle = aboutData?.heroTitle || ABOUT_FALLBACKS.heroTitle;
  const heroSubtitle = aboutData?.heroSubtitle || ABOUT_FALLBACKS.heroSubtitle;
  const heroImage = aboutData?.heroImage;
  const historyTitle = aboutData?.historyTitle || ABOUT_FALLBACKS.historyTitle;
  const historyBody = aboutData?.historyBody;
  const missionStatement = aboutData?.missionStatement || ABOUT_FALLBACKS.missionStatement;
  const visionStatement = aboutData?.visionStatement || ABOUT_FALLBACKS.visionStatement;

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: heroTitle,
    description: aboutData?.seo?.metaDescription || SEO_FALLBACKS.metaDescription,
    url: 'https://thagospel.com/about',
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thagospel.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://thagospel.com/about' },
    ],
  };

  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gray-900 font-medium">About</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section with h1 */}
      <PageHero 
        title={heroTitle} 
        subtitle={heroSubtitle}
        image={heroImage}
      />

      {/* Navigation Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Learn More About Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {navigationCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group block bg-gray-50 rounded-2xl p-8 hover:bg-teal-50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors">
                    <IconComponent className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={historyTitle} />
          
          <div className="max-w-4xl mx-auto">
            {historyBody ? (
              <div className="prose prose-lg max-w-none">
                <PortableText value={historyBody} />
              </div>
            ) : (
              <p className="text-gray-700 text-lg leading-relaxed">
                {ABOUT_FALLBACKS.historyBody}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Card Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 lg:p-12">
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
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-12">
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

      {/* Locations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Locations" 
            subtitle="Find a campus near you"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locationsData && locationsData.length > 0 ? (
              locationsData.map((location: any) => (
                <div key={location._id} className="bg-white rounded-lg shadow-md p-6">
                  {location.photo ? (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(location.photo).width(400).height(300).url()}
                        alt={location.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {location.name}
                    {location.isMainCampus && (
                      <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                        Main Campus
                      </span>
                    )}
                  </h4>
                  
                  <p className="text-gray-600 mb-2">{location.address}</p>
                  <p className="text-gray-600 mb-2">{location.city}</p>
                  
                  {location.phone && (
                    <p className="text-gray-600 mb-2">
                      <a href={`tel:${location.phone}`} className="text-teal-600 hover:text-teal-700">
                        {location.phone}
                      </a>
                    </p>
                  )}
                  
                  {location.email && (
                    <p className="text-gray-600 mb-2">
                      <a href={`mailto:${location.email}`} className="text-teal-600 hover:text-teal-700">
                        {location.email}
                      </a>
                    </p>
                  )}
                  
                  {location.mapLink && (
                    <a 
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Get Directions →
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                <p>No locations available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
