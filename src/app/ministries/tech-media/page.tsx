import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Script from 'next/script';
import { groq } from 'next-sanity';

export const revalidate = 60;

// Query for Tech & Media Ministry data
const techMediaMinistryQuery = groq`
  *[_type == "ministry" && slug.current == "tech-media" && isPublished == true][0] {
    name,
    slug,
    heroImage { asset->{ url } },
    description,
    body,
    serviceAreas[] {
      title,
      description,
      icon
    },
    leaders[] {
      name,
      role,
      photo { asset->{ url } }
    },
    equipmentList,
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ministryData = await client.fetch(techMediaMinistryQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: ministryData?.seo?.metaTitle || 'Tech & Media Ministry | ThaGospel Church',
      description: ministryData?.seo?.metaDescription || 'Join our Tech & Media team and use your technical skills to serve the church.',
    };
  } catch (error) {
    console.error('Error fetching tech media metadata:', error);
    return {
      title: 'Tech & Media Ministry | ThaGospel Church',
      description: 'Join our Tech & Media team and use your technical skills to serve the church.',
    };
  }
}

export default async function TechMediaPage() {
  let ministryData = null;

  try {
    ministryData = await client.fetch(techMediaMinistryQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching tech media data:', error);
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
        name: 'Tech & Media',
        item: 'https://thagospel.com/ministries/tech-media',
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
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <Link href="/ministries" className="hover:text-indigo-600 transition-colors">Ministries</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Tech & Media</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {ministryData?.name || 'Tech & Media Ministry'}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            {ministryData?.description || 'Using technology and creativity to share the Gospel and enhance worship'}
          </p>
        </div>
        {ministryData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(ministryData.heroImage).url()}
              alt="Tech & Media Ministry"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Our Tech & Media Ministry</h2>
          <div className="prose prose-lg max-w-none">
            {ministryData?.body ? (
              <PortableText value={ministryData.body} />
            ) : (
              <p className="text-gray-600 text-center">
                Our Tech & Media Ministry is the creative and technical engine that powers our church services and online presence. From live production and streaming to graphic design and social media, we use technology and creativity to create engaging worship experiences and share the Gospel with our community and beyond.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryData?.serviceAreas && ministryData.serviceAreas.length > 0 ? (
              ministryData.serviceAreas.map((area: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    {area.icon ? (
                      <span className="text-2xl">{area.icon}</span>
                    ) : (
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Live Production</h3>
                  <p className="text-gray-600">Operating cameras, sound systems, and lighting for engaging worship services.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Photography</h3>
                  <p className="text-gray-600">Capturing moments from services and events to tell our church's story.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Videography</h3>
                  <p className="text-gray-600">Creating high-quality video content for services, announcements, and online platforms.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Social Media</h3>
                  <p className="text-gray-600">Managing our online presence and engaging our community across social platforms.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Web & Design</h3>
                  <p className="text-gray-600">Designing graphics, maintaining the website, and creating digital content.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Team Members</h2>
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
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">
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
                <p className="text-gray-600">Our Tech & Media team is led by passionate volunteers who combine technical expertise with a heart for ministry.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Equipment & Tools */}
      {ministryData?.equipmentList && ministryData.equipmentList.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Equipment & Tools</h2>
            <div className="prose prose-lg max-w-none">
              <PortableText value={ministryData.equipmentList} />
            </div>
          </div>
        </section>
      )}

      {/* Join The Team CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join The Team</h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're experienced or just starting out, we have a place for you on our Tech & Media team!
          </p>
          <Link
            href="/connect/contact?subject=Tech%20%26%20Media%20Team"
            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Join Tech & Media Team
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
