import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Script from 'next/script';
import { groq } from 'next-sanity';

export const revalidate = 60;

// Query for Youth Ministry data
const youthMinistryQuery = groq`
  *[_type == "ministry" && slug.current == "youth" && isPublished == true][0] {
    name,
    slug,
    heroImage { asset->{ url } },
    description,
    body,
    programs[] {
      title,
      description,
      schedule,
      ageRange
    },
    leaders[] {
      name,
      role,
      photo { asset->{ url } }
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// Query for upcoming youth events
const youthEventsQuery = groq`
  *[_type == "event" && $category in categories[] && isPublished == true] | order(date asc) [0...3] {
    title,
    slug,
    date,
    time,
    location,
    description,
    image { asset->{ url } }
  }
`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ministryData = await client.fetch(youthMinistryQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: ministryData?.seo?.metaTitle || 'Youth Ministry | ThaGospel Church',
      description: ministryData?.seo?.metaDescription || 'Join our Youth Ministry for students to grow in faith and build lasting friendships.',
    };
  } catch (error) {
    console.error('Error fetching youth ministry metadata:', error);
    return {
      title: 'Youth Ministry | ThaGospel Church',
      description: 'Join our Youth Ministry for students to grow in faith and build lasting friendships.',
    };
  }
}

export default async function YouthMinistryPage() {
  let ministryData = null;
  let youthEvents = [];

  try {
    const [ministry, events] = await Promise.all([
      client.fetch(youthMinistryQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(youthEventsQuery, { category: 'youth' }, { next: { revalidate: 60 } }),
    ]);
    
    ministryData = ministry;
    youthEvents = events || [];
  } catch (error) {
    console.error('Error fetching youth ministry data:', error);
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
        name: 'Youth Ministry',
        item: 'https://thagospel.com/ministries/youth',
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
              <span className="text-gray-900 font-medium">Youth Ministry</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {ministryData?.name || 'Youth Ministry'}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            {ministryData?.description || 'Where students discover their purpose and build lasting friendships'}
          </p>
        </div>
        {ministryData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(ministryData.heroImage).url()}
              alt="Youth Ministry"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Our Youth Ministry</h2>
          <div className="prose prose-lg max-w-none">
            {ministryData?.body ? (
              <PortableText value={ministryData.body} />
            ) : (
              <p className="text-gray-600 text-center">
                Our Youth Ministry is designed to help students (grades 6-12) grow in their faith, build meaningful relationships, and discover their God-given purpose. Through engaging teaching, small groups, service opportunities, and fun events, we create an environment where students can be authentic, ask questions, and experience God's love.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryData?.programs && ministryData.programs.length > 0 ? (
              ministryData.programs.map((program: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-blue-600 font-medium mb-2">{program.ageRange}</p>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <p className="text-sm text-gray-500">{program.schedule}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Youth Group</h3>
                  <p className="text-blue-600 font-medium mb-2">Grades 6-12</p>
                  <p className="text-gray-600 mb-4">Weekly gatherings with games, teaching, and small groups for students to connect and grow.</p>
                  <p className="text-sm text-gray-500">Wednesdays at 7:00 PM</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sunday School</h3>
                  <p className="text-blue-600 font-medium mb-2">Grades 6-12</p>
                  <p className="text-gray-600 mb-4">Bible study and discussion groups tailored for middle and high school students.</p>
                  <p className="text-sm text-gray-500">Sundays at 9:00 AM</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership Team</h3>
                  <p className="text-blue-600 font-medium mb-2">Grades 9-12</p>
                  <p className="text-gray-600 mb-4">Student leadership development program for high school students wanting to serve and lead.</p>
                  <p className="text-sm text-gray-500">Monthly meetings</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Youth Events</h2>
            <Link
              href="/events?category=youth"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              See All Events →
            </Link>
          </div>
          
          {youthEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {youthEvents.map((event: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                  {event.image && (
                    <div className="relative h-48">
                      <Image
                        src={urlFor(event.image).url()}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                      <p>⏰ {event.time}</p>
                      <p>📍 {event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No upcoming youth events scheduled. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Leaders Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Youth Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministryData?.leaders && ministryData.leaders.length > 0 ? (
              ministryData.leaders.map((leader: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {leader.photo ? (
                      <Image
                        src={urlFor(leader.photo).url()}
                        alt={leader.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="128px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {leader.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{leader.name}</h3>
                  <p className="text-gray-600">{leader.role}</p>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full">
                <p className="text-gray-600">Our youth leaders are passionate about helping students grow in their faith and navigate the challenges of adolescence.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're a student looking to join or an adult interested in volunteering, we'd love to connect with you!
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Youth Ministry
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Back to Ministries */}
      <section className="py-12 px-4 bg-gray-50">
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
