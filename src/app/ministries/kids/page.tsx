import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Script from 'next/script';
import { groq } from 'next-sanity';

export const revalidate = 60;

// Query for Kids Ministry data
const kidsMinistryQuery = groq`
  *[_type == "ministry" && slug.current == "kids" && isPublished == true][0] {
    name,
    slug,
    heroImage { asset->{ url } },
    description,
    body,
    ageGroups[] {
      title,
      description,
      ageRange
    },
    schedule[] {
      day,
      time,
      location
    },
    policies[] {
      title,
      content
    },
    checkInInfo,
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ministryData = await client.fetch(kidsMinistryQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: ministryData?.seo?.metaTitle || 'Kids Ministry | ThaGospel Church',
      description: ministryData?.seo?.metaDescription || 'Discover our Kids Ministry programs designed to help children grow in their faith.',
    };
  } catch (error) {
    console.error('Error fetching kids ministry metadata:', error);
    return {
      title: 'Kids Ministry | ThaGospel Church',
      description: 'Discover our Kids Ministry programs designed to help children grow in their faith.',
    };
  }
}

export default async function KidsMinistryPage() {
  let ministryData = null;

  try {
    ministryData = await client.fetch(kidsMinistryQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching kids ministry data:', error);
  }

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
        name: 'Kids Ministry',
        item: 'https://thagospel.com/ministries/kids',
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
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <Link href="/ministries" className="hover:text-blue-600 transition-colors">Ministries</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Kids Ministry</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {ministryData?.name || 'Kids Ministry'}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            {ministryData?.description || 'Nurturing faith in our youngest generation'}
          </p>
        </div>
        {ministryData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(ministryData.heroImage).url()}
              alt="Kids Ministry"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Our Kids Ministry</h2>
          <div className="prose prose-lg max-w-none">
            {ministryData?.body ? (
              <PortableText value={ministryData.body} />
            ) : (
              <p className="text-gray-600 text-center">
                Our Kids Ministry is dedicated to creating a fun, safe, and nurturing environment where children can learn about God's love and grow in their faith. Through age-appropriate teaching, engaging activities, and caring volunteers, we help kids build a strong foundation for their spiritual journey.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Age Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryData?.ageGroups && ministryData.ageGroups.length > 0 ? (
              ministryData.ageGroups.map((group: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{group.title}</h3>
                  <p className="text-purple-600 font-medium mb-4">{group.ageRange}</p>
                  <p className="text-gray-600">{group.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nursery</h3>
                  <p className="text-purple-600 font-medium mb-4">0-2 years</p>
                  <p className="text-gray-600">A safe and nurturing environment for our youngest children with caring volunteers.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Preschool</h3>
                  <p className="text-purple-600 font-medium mb-4">3-5 years</p>
                  <p className="text-gray-600">Interactive Bible stories, songs, and activities designed for preschoolers.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Elementary</h3>
                  <p className="text-purple-600 font-medium mb-4">6-11 years</p>
                  <p className="text-gray-600">Engaging teaching, small groups, and fun activities for elementary-aged kids.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Weekly Schedule</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Day</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Time</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {ministryData?.schedule && ministryData.schedule.length > 0 ? (
                  ministryData.schedule.map((item: any, index: number) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-6 py-4 text-gray-900">{item.day}</td>
                      <td className="px-6 py-4 text-gray-900">{item.time}</td>
                      <td className="px-6 py-4 text-gray-900">{item.location}</td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-gray-900">Sunday</td>
                      <td className="px-6 py-4 text-gray-900">9:00 AM & 11:00 AM</td>
                      <td className="px-6 py-4 text-gray-900">Kids Building</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-gray-900">Wednesday</td>
                      <td className="px-6 py-4 text-gray-900">7:00 PM</td>
                      <td className="px-6 py-4 text-gray-900">Kids Building</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Check-in Info */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">First-Time Check-In</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            {ministryData?.checkInInfo ? (
              <PortableText value={ministryData.checkInInfo} />
            ) : (
              <div>
                <p className="text-gray-700 mb-4">
                  If you're visiting for the first time, we'd love to help you get checked in smoothly. Here's what to expect:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Arrive 15 minutes early to allow time for check-in</li>
                  <li>Visit our Kids Check-in desk in the main lobby</li>
                  <li>We'll collect some basic information about your child</li>
                  <li>You'll receive matching security tags for pickup</li>
                  <li>We'll help you find the right classroom for your child</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Safety & Policies */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Safety & Policies</h2>
          <div className="space-y-4">
            {ministryData?.policies && ministryData.policies.length > 0 ? (
              ministryData.policies.map((policy: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{policy.title}</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="px-6 py-4 bg-white">
                    <PortableText value={policy.content} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">
                Detailed safety policies and procedures are available upon request. All our volunteers undergo background checks and training to ensure a safe environment for your children.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-8">
            Want to help make a difference in the lives of our children? Join our Kids Ministry team!
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Volunteer with Kids
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
