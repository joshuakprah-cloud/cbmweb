import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { contactPageQuery, serviceTimesQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';
import ContactInfoPanel from '@/components/contact/ContactInfoPanel';
import ImprovedContactForm from '@/components/contact/ImprovedContactForm';

export const revalidate = 60; // 1 minute cache

export async function generateMetadata(): Promise<Metadata> {
  try {
    const contactPageData = await client.fetch(contactPageQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: 'Contact Us | ThaGospel Church',
      description: contactPageData?.seo?.metaDescription || 'Get in touch with ThaGospel Church. We\'d love to hear from you.',
      openGraph: {
        title: 'Contact Us | ThaGospel Church',
        description: contactPageData?.seo?.metaDescription || 'Get in touch with ThaGospel Church. We\'d love to hear from you.',
        images: contactPageData?.seo?.ogImage ? [urlFor(contactPageData.seo.ogImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching contact metadata:', error);
    return {
      title: 'Contact Us | ThaGospel Church',
      description: 'Get in touch with ThaGospel Church. We\'d love to hear from you.',
    };
  }
}

export default async function ContactPage() {
  let contactPageData = null;

  try {
    contactPageData = await client.fetch(contactPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching contact data:', error);
    // Continue with fallbacks
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    description: contactPageData?.heroTagline || 'We\'d Love to Hear From You',
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
        name: 'Contact Us',
        item: 'https://thagospel.com/connect/contact',
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
            <li className="text-gray-900 font-medium">Contact Us</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl">
            {contactPageData?.heroTitle || 'Contact Us'}
          </h2>
          <p className="text-lg md:text-xl font-light drop-shadow-lg">
            {contactPageData?.heroTagline || 'We\'d love to hear from you'}
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

      {/* Contact Form and Info Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <ImprovedContactForm />
            </div>

            {/* Right Column: Contact Info Panel */}
            <ContactInfoPanel />
          </div>
        </div>
      </section>
    </>
  );
}
