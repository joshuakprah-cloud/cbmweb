import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { contactPageQuery, serviceTimesQuery } from 'sanity/lib/queries';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';
import ContactInfoPanel from '@/components/contact/ContactInfoPanel';

export const revalidate = 3600; // 1 hour cache

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Visit Us - ThaGospel Church',
    description: 'Find your way to ThaGospel Church. Get directions, service times, and location information for your visit.',
  };
}

export default async function VisitUsPage() {
  let contactPageData = null;
  let serviceTimesData = null;

  try {
    const [pageData, timesData] = await Promise.all([
      client.fetch(contactPageQuery, {}, { next: { revalidate: 3600 } }),
      client.fetch(serviceTimesQuery, {}, { next: { revalidate: 3600 } }),
    ]);

    contactPageData = pageData;
    serviceTimesData = timesData;
  } catch (error) {
    console.error('Error fetching visit data:', error);
    // Continue with fallbacks
  }

  const churchAddress = contactPageData?.address || CONTACT_FALLBACKS.address;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchAddress)}`;

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'ThaGospel Church',
    address: churchAddress,
    description: 'Visit ThaGospel Church for inspiring worship and community.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Visit Us
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            We'd love for you to join us for a service
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Find Us
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Map Loading...</span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Address:</strong> {CONTACT_FALLBACKS.address}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {CONTACT_FALLBACKS.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {CONTACT_FALLBACKS.email}
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <ContactInfoPanel />
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What to Expect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Worship</h3>
              <p className="text-gray-600">
                Contemporary worship music that's both meaningful and engaging
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message</h3>
              <p className="text-gray-600">
                Practical biblical teaching that applies to everyday life
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                A warm, welcoming atmosphere where you can connect with others
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Experience</h3>
            <p className="text-gray-600 mb-4">
              Our services feature uplifting worship, practical biblical teaching, and a warm, welcoming atmosphere.
            </p>
            <p className="text-gray-600">
              Services typically last about 90 minutes, and we have programs available for children and youth during this time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
