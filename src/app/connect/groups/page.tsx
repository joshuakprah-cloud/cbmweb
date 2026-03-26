import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { connectPageQuery, smallGroupsQuery, nextStepsQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { UsersIcon, CalendarIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

export const revalidate = 60; // 1 minute cache

export async function generateMetadata(): Promise<Metadata> {
  try {
    const connectPageData = await client.fetch(connectPageQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: 'Get Connected | ThaGospel Church',
      description: connectPageData?.seo?.metaDescription || 'Find your community at ThaGospel Church. Join small groups and take your next steps in faith.',
      openGraph: {
        title: 'Get Connected | ThaGospel Church',
        description: connectPageData?.seo?.metaDescription || 'Find your community at ThaGospel Church. Join small groups and take your next steps in faith.',
        images: connectPageData?.heroImage ? [urlFor(connectPageData.heroImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching get connected metadata:', error);
    return {
      title: 'Get Connected | ThaGospel Church',
      description: 'Find your community at ThaGospel Church. Join small groups and take your next steps in faith.',
    };
  }
}

export default async function GetConnectedPage() {
  let connectPageData = null;
  let smallGroups = [];
  let nextSteps = [];

  try {
    const [pageData, groupsData, stepsData] = await Promise.all([
      client.fetch(connectPageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(smallGroupsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(nextStepsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    connectPageData = pageData;
    smallGroups = groupsData || [];
    nextSteps = stepsData || [];
  } catch (error) {
    console.error('Error fetching get connected data:', error);
    // Continue with fallbacks
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Get Connected',
    description: 'Find your community at ThaGospel Church',
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
        name: 'Get Connected',
        item: 'https://thagospel.com/connect/groups',
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
            <li className="text-gray-900 font-medium">Get Connected</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl">
            Get Connected
          </h1>
          <p className="text-lg md:text-xl font-light drop-shadow-lg">
            {connectPageData?.heroSubtitle || 'Find your community and take your next steps in faith'}
          </p>
        </div>
        {connectPageData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(connectPageData.heroImage).url()}
              alt="Get Connected"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </section>

      {/* New Here Welcome Block */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">New Here?</h2>
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  We're so glad you're here! Whether you're exploring faith for the first time 
                  or looking for a new church home, you'll find a warm, welcoming community 
                  ready to embrace you at ThaGospel Church.
                </p>
                <p>
                  Our church is more than just a Sunday service - it's a family of people 
                  who support each other, grow together, and make a difference in our community.
                </p>
              </div>
              <Link
                href="/plan-your-visit"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Plan Your Visit
              </Link>
            </div>
            
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://placehold.co/800x450/green/white?text=Church+Community"
                alt="Church Community"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Small Groups Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Community</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Small groups are the heart of our church family. They're where real relationships 
              happen, where we support each other, and where we grow together in faith.
            </p>
          </div>

          {smallGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {smallGroups.map((group: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <UsersIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {group.day} at {group.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {group.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {group.demographic}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Leader:</span> {group.leader}
                    </div>
                  </div>

                  {group.description && (
                    <p className="text-gray-600 mb-6 text-sm">{group.description}</p>
                  )}

                  <Link
                    href="/connect/contact?subject=Small%20Group%20Inquiry"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Join This Group
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Small Groups Are Forming Soon</h3>
              <p className="text-gray-600 mb-6">
                We're currently launching new small groups. Contact us to express your interest 
                and we'll help you find the perfect group for you.
              </p>
              <Link
                href="/connect/contact?subject=Small%20Group%20Interest"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Express Interest
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Next Steps</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your journey with God is unique, and we're here to help you take the next step, 
              whatever that may be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nextSteps.length > 0 ? (
              nextSteps.map((step: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-green-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  {step.ctaText && step.ctaLink && (
                    <Link
                      href={step.ctaLink}
                      className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
                    >
                      {step.ctaText}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              ))
            ) : (
              // Fallback next steps
              [
                { number: 1, title: 'Attend a Sunday Service', description: 'Join us for worship and teaching' },
                { number: 2, title: 'Join a Small Group', description: 'Find community and grow in faith' },
                { number: 3, title: 'Serve in a Ministry', description: 'Use your gifts to make a difference' },
                { number: 4, title: 'Get Baptized', description: 'Take the next step in your faith journey' },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-green-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
