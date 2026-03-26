import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { connectPageQuery, serviceTimesQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { EnvelopeIcon, HandRaisedIcon, UsersIcon } from '@heroicons/react/24/outline';

export const revalidate = 60; // 1 minute cache

export async function generateMetadata(): Promise<Metadata> {
  try {
    const connectPageData = await client.fetch(connectPageQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: connectPageData?.seo?.metaTitle || 'Connect | ThaGospel Church',
      description: connectPageData?.seo?.metaDescription || 'Get connected with ThaGospel Church. Contact us, submit prayer requests, and find your community.',
      openGraph: {
        title: connectPageData?.seo?.metaTitle || 'Connect | ThaGospel Church',
        description: connectPageData?.seo?.metaDescription || 'Get connected with ThaGospel Church. Contact us, submit prayer requests, and find your community.',
        images: connectPageData?.heroImage ? [urlFor(connectPageData.heroImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching connect metadata:', error);
    return {
      title: 'Connect | ThaGospel Church',
      description: 'Get connected with ThaGospel Church. Contact us, submit prayer requests, and find your community.',
    };
  }
}

export default async function ConnectPage() {
  let connectPageData = null;
  let serviceTimes = [];

  try {
    const [pageData, timesData] = await Promise.all([
      client.fetch(connectPageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(serviceTimesQuery, {}, { next: { revalidate: 60 } }),
    ]);

    connectPageData = pageData;
    serviceTimes = timesData || [];
  } catch (error) {
    console.error('Error fetching connect page data:', error);
  }

  const connectCards = [
    {
      title: 'Contact Us',
      description: 'Send us a message',
      icon: EnvelopeIcon,
      href: '/contact',
      color: 'bg-blue-500',
    },
    {
      title: 'Prayer Request',
      description: "We'd love to pray with you",
      icon: HandRaisedIcon,
      href: '/prayer',
      color: 'bg-purple-500',
    },
    {
      title: 'Get Connected',
      description: 'Find your community',
      icon: UsersIcon,
      href: '/new-here',
      color: 'bg-green-500',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {connectPageData?.heroTitle || 'Get Connected'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {connectPageData?.heroSubtitle || 'We\'d love to connect with you. Whether you\'re new to church or have been around for a while, there\'s a place for you here.'}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {connectCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={index}
                  href={card.href}
                  className="group block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center"
                >
                  <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <span className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Learn more
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Times Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Times</h2>
          
          {serviceTimes.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Day</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {serviceTimes.map((service: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{service.day}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{service.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{service.time}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{service.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Service times coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
