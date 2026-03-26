import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { contactPageQuery, serviceTimesQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';
import ContactInfoPanel from '@/components/contact/ContactInfoPanel';
import ContactForm from '@/components/contact/ContactForm';

export const revalidate = 3600; // 1 hour cache

export async function generateMetadata(): Promise<Metadata> {
  try {
    const contactPageData = await client.fetch(contactPageQuery, {}, { next: { revalidate: 3600 } });
    
    return {
      title: contactPageData?.seo?.metaTitle || 'Contact - ThaGospel Church',
      description: contactPageData?.seo?.metaDescription || 'Get in touch with ThaGospel Church. We\'d love to hear from you.',
      openGraph: {
        title: contactPageData?.seo?.metaTitle || 'Contact - ThaGospel Church',
        description: contactPageData?.seo?.metaDescription || 'Get in touch with ThaGospel Church. We\'d love to hear from you.',
        images: contactPageData?.seo?.ogImage ? [urlFor(contactPageData.seo.ogImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching contact metadata:', error);
    return {
      title: 'Contact - ThaGospel Church',
      description: 'Get in touch with ThaGospel Church. We\'d love to hear from you.',
    };
  }
}

export default async function ContactPage() {
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
    console.error('Error fetching contact data:', error);
    // Continue with fallbacks
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: contactPageData?.heroTitle || 'CONTACT',
    description: contactPageData?.heroTagline || 'We\'d Love to Hear From You',
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'ThaGospel Church',
    address: contactPageData?.address || CONTACT_FALLBACKS.address,
    telephone: contactPageData?.phone || CONTACT_FALLBACKS.phone,
    email: contactPageData?.email || CONTACT_FALLBACKS.email,
    openingHours: contactPageData?.officeHours?.map((hour: any) => `${hour.days}: ${hour.hours}`) || [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {contactPageData?.heroTitle || CONTACT_FALLBACKS.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            {contactPageData?.heroTagline || CONTACT_FALLBACKS.heroTagline}
          </p>
        </div>
        {contactPageData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(contactPageData.heroImage).url()}
              alt={contactPageData?.heroTitle || 'Contact Us'}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfoPanel />
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Us
              </h2>
              <ContactForm formType="general" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      {serviceTimesData && serviceTimesData.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Service Times
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTimesData.map((service: any, index: number) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600 mb-2">
                    {service.day}
                  </div>
                  <div className="text-lg text-gray-700">
                    {service.timeRange}
                  </div>
                  {service.description && (
                    <div className="text-sm text-gray-600 mt-2">
                      {service.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {(contactPageData?.closingCtaTitle || contactPageData?.closingCtaSubtitle) && (
        <section className="bg-stone-100 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {contactPageData?.closingCtaTitle || CONTACT_FALLBACKS.closingCtaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {contactPageData?.closingCtaSubtitle || CONTACT_FALLBACKS.closingCtaSubtitle}
            </p>
            <Link
              href="/ministries"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Ministries
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
