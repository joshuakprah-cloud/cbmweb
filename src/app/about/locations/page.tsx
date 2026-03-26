'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import { client } from '../../../../sanity/lib/client';
import { locationsQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import Script from 'next/script';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  serviceTimes?: string[];
  photo?: any;
  mapEmbedUrl?: string;
  mapUrl?: string;
  isMainCampus?: boolean;
  description?: string;
}

async function getLocations(): Promise<Location[]> {
  try {
    const data = await client.fetch(locationsQuery, {}, { next: { revalidate: 60 } });
    return data || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

export default async function LocationsPage() {
  const locations = await getLocations();

  const metaTitle = 'Our Locations | ThaGospel Church';
  const metaDescription = 'Find a ThaGospel Church campus near you. View service times, directions, and location information.';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thagospel.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://thagospel.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Locations', item: 'https://thagospel.com/about/locations' },
    ],
  };

  return (
    <>
      <Script id="breadcrumb-data" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/about" className="hover:text-teal-600">About</Link></li>
            <li>/</li>
            <li aria-current="page" className="font-medium">Locations</li>
          </ol>
        </div>
      </nav>

      <PageHero 
        title="Our Locations" 
        subtitle="Find a campus near you"
      />

      {/* Locations with Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {locations.length > 0 ? (
            <LocationsTabs locations={locations} />
          ) : (
            <p className="text-center text-gray-500 text-lg">Location information coming soon.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <SectionHeader label="Join Us" title="We'd Love to See You" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/connect" className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full text-sm">
              Plan Your Visit
            </Link>
            <Link href="/about" className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-full text-sm hover:border-teal-600">
              Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Client component for interactive tabs
function LocationsTabs({ locations }: { locations: Location[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeLocation = locations[activeTab];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {locations.map((location, index) => (
          <button
            key={location._id}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === index 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {location.name}
            {location.isMainCampus && (
              <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">Main</span>
            )}
          </button>
        ))}
      </div>

      {/* Location Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {activeLocation.photo && (
            <div className="relative w-full h-64">
              <Image
                src={urlFor(activeLocation.photo).width(600).height(300).url()}
                alt={activeLocation.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {activeLocation.name}
              {activeLocation.isMainCampus && (
                <span className="ml-2 text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded">Main Campus</span>
              )}
            </h2>
            
            {activeLocation.description && (
              <p className="text-gray-600 mb-6">{activeLocation.description}</p>
            )}

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <p className="text-gray-900">{activeLocation.address}</p>
                  <p className="text-gray-600">{activeLocation.city}{activeLocation.state && `, ${activeLocation.state}`} {activeLocation.zipCode}</p>
                </div>
              </div>

              {/* Phone */}
              {activeLocation.phone && (
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-teal-600" />
                  <a href={`tel:${activeLocation.phone}`} className="text-gray-900 hover:text-teal-600">
                    {activeLocation.phone}
                  </a>
                </div>
              )}

              {/* Email */}
              {activeLocation.email && (
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-teal-600" />
                  <a href={`mailto:${activeLocation.email}`} className="text-gray-900 hover:text-teal-600">
                    {activeLocation.email}
                  </a>
                </div>
              )}

              {/* Service Times */}
              {activeLocation.serviceTimes && activeLocation.serviceTimes.length > 0 && (
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Service Times</p>
                    <ul className="space-y-1">
                      {activeLocation.serviceTimes.map((time, idx) => (
                        <li key={idx} className="text-gray-600">{time}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Get Directions Button */}
            {activeLocation.mapUrl && (
              <a
                href={activeLocation.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-colors"
              >
                <MapPinIcon className="w-5 h-5 mr-2" />
                Get Directions
              </a>
            )}
          </div>
        </div>

        {/* Embedded Map */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden h-[500px] lg:h-auto">
          {activeLocation.mapEmbedUrl ? (
            <iframe
              src={activeLocation.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${activeLocation.name} location map`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Map not available for this location</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
