import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { contactPageQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import ImprovedPrayerForm from '@/components/prayer/ImprovedPrayerForm';

export const revalidate = 60; // 1 minute cache

export async function generateMetadata(): Promise<Metadata> {
  try {
    const contactPageData = await client.fetch(contactPageQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: 'Prayer Request | ThaGospel Church',
      description: 'Submit a prayer request to the ThaGospel pastoral team. We would love to pray with you.',
      openGraph: {
        title: 'Prayer Request | ThaGospel Church',
        description: 'Submit a prayer request to the ThaGospel pastoral team. We would love to pray with you.',
        images: contactPageData?.seo?.ogImage ? [urlFor(contactPageData.seo.ogImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching prayer metadata:', error);
    return {
      title: 'Prayer Request | ThaGospel Church',
      description: 'Submit a prayer request to the ThaGospel pastoral team. We would love to pray with you.',
    };
  }
}

export default async function PrayerPage() {
  let contactPageData = null;

  try {
    contactPageData = await client.fetch(contactPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching prayer page data:', error);
    // Continue with fallbacks
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Prayer Request',
    description: 'Submit a prayer request to the ThaGospel pastoral team',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thagospel.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Connect',
        item: 'https://thagospel.com/connect',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Prayer Request',
        item: 'https://thagospel.com/connect/prayer',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/connect" className="hover:text-gray-900">Connect</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Prayer Request</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl">
            Prayer Request
          </h2>
          <p className="text-lg md:text-xl font-light drop-shadow-lg">
            {contactPageData?.heroTagline || 'We would love to pray with you'}
          </p>
        </div>
        {contactPageData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(contactPageData.heroImage).url()}
              alt="Prayer Request"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </section>

      {/* Privacy Notice */}
      <section className="py-8 px-4 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-amber-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Privacy Notice</h3>
              <p className="text-amber-800 leading-relaxed">
                Your prayer request is kept confidential and shared only with our pastoral team. 
                We take your trust seriously and will handle your request with the utmost care and sensitivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Request Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Prayer Request</h3>
              <p className="text-gray-600">
                Our pastoral team is here to support you in prayer. Whatever you're facing, you're not alone.
              </p>
            </div>
            
            <ImprovedPrayerForm />
          </div>
        </div>
      </section>

      {/* Additional Support Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Immediate Support?</h3>
          <p className="text-gray-600 mb-8">
            If you're facing an urgent situation and need to speak with someone immediately, 
            please don't hesitate to reach out to our pastoral team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect/contact"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Pastoral Team
            </Link>
            <Link
              href="tel:+1234567890"
              className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
