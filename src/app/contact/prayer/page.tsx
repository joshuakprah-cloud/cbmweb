import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { contactPageQuery } from 'sanity/lib/queries';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';
import PrayerRequestForm from '@/components/contact/PrayerRequestForm';

export const revalidate = 86400; // 1 day cache

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Prayer Request - ThaGospel Church',
    description: 'Submit your prayer request to ThaGospel Church. We are here to pray with you and support you in your faith journey.',
  };
}

export default async function PrayerRequestPage() {
  let contactPageData = null;

  try {
    contactPageData = await client.fetch(contactPageQuery, {}, { next: { revalidate: 86400 } });
  } catch (error) {
    console.error('Error fetching contact data:', error);
    // Continue with fallbacks
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Prayer Request
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            We believe in the power of prayer and would be honored to pray with you
          </p>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Philippians 4:6
            </h2>
            <blockquote className="text-xl text-gray-700 italic font-serif mb-8">
              "{CONTACT_FALLBACKS.scriptureText}"
            </blockquote>
            <p className="text-gray-600">
              {CONTACT_FALLBACKS.scriptureReference}
            </p>
          </div>
        </div>
      </section>

      {/* Prayer Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Prayer Request</h2>
            <p className="text-gray-600">
              We believe in the power of prayer and would be honored to pray with you. 
              Share your request below, and our prayer team will lift you up in prayer.
            </p>
          </div>
          
          <PrayerRequestForm />
        </div>
      </section>
    </>
  );
}
