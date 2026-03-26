import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Script from 'next/script';
import { groq } from 'next-sanity';

export const revalidate = 60;

// Query for Outreach Ministry data
const outreachMinistryQuery = groq`
  *[_type == "ministry" && slug.current == "outreach" && isPublished == true][0] {
    name,
    slug,
    heroImage { asset->{ url } },
    description,
    body,
    stats,
    initiatives[] {
      title,
      description,
      status,
      ctaText,
      ctaUrl
    },
    steps[] {
      title,
      description,
      order
    },
    partners[] {
      name,
      logo { asset->{ url } },
      website
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ministryData = await client.fetch(outreachMinistryQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: ministryData?.seo?.metaTitle || 'Outreach | ThaGospel Church',
      description: ministryData?.seo?.metaDescription || 'Learn about our outreach programs serving our local and global communities.',
    };
  } catch (error) {
    console.error('Error fetching outreach metadata:', error);
    return {
      title: 'Outreach | ThaGospel Church',
      description: 'Learn about our outreach programs serving our local and global communities.',
    };
  }
}

export default async function OutreachPage() {
  let ministryData = null;

  try {
    ministryData = await client.fetch(outreachMinistryQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching outreach data:', error);
  }

  // Prepare stats data with null safety
  const statsData = ministryData?.stats || [];
  const defaultStats = [
    { label: 'People Served', value: '—' },
    { label: 'Communities Reached', value: '—' },
    { label: 'Volunteer Hours', value: '—' },
    { label: 'Partner Organizations', value: '—' }
  ];
  
  const stats = statsData.length > 0 ? statsData.map((stat: any) => ({
    label: stat.label || '—',
    value: stat.value || '—'
  })) : defaultStats;

  // Generate breadcrumb JSON-LD
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
        name: 'Ministries',
        item: 'https://thagospel.com/ministries',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Outreach',
        item: 'https://thagospel.com/ministries/outreach',
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-4 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <Link href="/ministries" className="hover:text-green-600 transition-colors">Ministries</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Outreach</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {ministryData?.name || 'Outreach'}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            {ministryData?.description || 'Serving our community and sharing God\'s love through action'}
          </p>
        </div>
        {ministryData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(ministryData.heroImage).url()}
              alt="Outreach Ministry"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Our Outreach</h2>
          <div className="prose prose-lg max-w-none">
            {ministryData?.body ? (
              <PortableText value={ministryData.body} />
            ) : (
              <p className="text-gray-600 text-center">
                Our Outreach Ministry is dedicated to demonstrating God's love through practical service to our community. We believe that the church is called to be the hands and feet of Jesus, reaching out to those in need, serving the vulnerable, and making a tangible difference in the world around us.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat: { label: string; value: string }, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Figures are approximate and updated periodically.
            </p>
          </div>
        </div>
      </section>

      {/* Current Initiatives */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Current Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryData?.initiatives && ministryData.initiatives.length > 0 ? (
              ministryData.initiatives.map((initiative: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{initiative.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      initiative.status === 'Active' ? 'bg-green-100 text-green-800' :
                      initiative.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                      initiative.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {initiative.status || 'Active'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{initiative.description}</p>
                  {initiative.ctaText && initiative.ctaUrl && (
                    <a
                      href={initiative.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      {initiative.ctaText}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Food Bank</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                  </div>
                  <p className="text-gray-600 mb-4">Providing food assistance to families in need in our local community.</p>
                  <a href="#" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Community Garden</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                  </div>
                  <p className="text-gray-600 mb-4">Growing fresh produce for local food banks and teaching sustainable gardening practices.</p>
                  <a href="#" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    Get Involved
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Home Repair</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Upcoming</span>
                  </div>
                  <p className="text-gray-600 mb-4">Helping elderly and disabled homeowners with essential home repairs and maintenance.</p>
                  <a href="#" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    Volunteer
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How To Get Involved */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How To Get Involved</h2>
          <div className="space-y-6">
            {ministryData?.steps && ministryData.steps.length > 0 ? (
              ministryData.steps
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((step: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))
            ) : (
              <>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Attend an Orientation</h3>
                    <p className="text-gray-600">Join our monthly outreach orientation to learn about current opportunities and how you can help.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Focus</h3>
                    <p className="text-gray-600">Select an initiative that aligns with your passions and skills - from food assistance to home repairs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Serving</h3>
                    <p className="text-gray-600">Join a team and begin making a difference in our community through regular service opportunities.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Partner Organizations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {ministryData?.partners && ministryData.partners.length > 0 ? (
              ministryData.partners.map((partner: any, index: number) => (
                <div key={index} className="flex items-center justify-center">
                  {partner.logo ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Image
                        src={urlFor(partner.logo).url()}
                        alt={partner.name}
                        width={120}
                        height={60}
                        className="object-contain"
                      />
                    </a>
                  ) : (
                    <div className="w-full h-16 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500 text-center">{partner.name}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center col-span-full">
                <p className="text-gray-600">We partner with local organizations to maximize our impact in the community.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to make a difference in our community? Join our Outreach Ministry team!
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Serve with Outreach
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Back to Ministries */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/ministries"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Ministries
          </Link>
        </div>
      </section>
    </>
  );
}
