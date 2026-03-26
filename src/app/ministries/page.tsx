import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { ministriesPageQuery, allMinistriesQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { MINISTRIES_FALLBACKS } from '@/constants/fallbacks';
import StatsBar from '@/components/ministries/StatsBar';
import MinistryCard from '@/components/ministries/MinistryCard';

export const revalidate = 3600; // 1 hour cache

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ministriesPageData = await client.fetch(ministriesPageQuery, {}, { next: { revalidate: 3600 } });
    
    return {
      title: ministriesPageData?.seo?.metaTitle || 'Ministries - ThaGospel Church',
      description: ministriesPageData?.seo?.metaDescription || 'Find your place to serve and grow in our various ministries.',
      openGraph: {
        title: ministriesPageData?.seo?.metaTitle || 'Ministries - ThaGospel Church',
        description: ministriesPageData?.seo?.metaDescription || 'Find your place to serve and grow in our various ministries.',
        images: ministriesPageData?.seo?.ogImage ? [urlFor(ministriesPageData.seo.ogImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching ministries metadata:', error);
    return {
      title: 'Ministries - ThaGospel Church',
      description: 'Find your place to serve and grow in our various ministries.',
    };
  }
}

export default async function MinistriesPage() {
  let ministriesPageData = null;
  let ministries = [];

  try {
    const [pageData, ministriesData] = await Promise.all([
      client.fetch(ministriesPageQuery, {}, { next: { revalidate: 3600 } }),
      client.fetch(allMinistriesQuery, {}, { next: { revalidate: 3600 } }),
    ]);

    ministriesPageData = pageData;
    ministries = ministriesData || [];
  } catch (error) {
    console.error('Error fetching ministries data:', error);
    // Continue with empty arrays - will show fallback content
  }

  // Group ministries by category
  const peopleMinistries = ministries.filter((m: any) => 
    ['kids', 'youth', 'women', 'men'].includes(m.slug)
  );
  
  const serveMinistries = ministries.filter((m: any) => 
    ['outreach', 'tech-media'].includes(m.slug)
  );

  // Prepare stats data with null safety
  const statsData = ministriesPageData?.stats || [];
  const defaultStats = [
    { label: 'Active Members', value: '—' },
    { label: 'Ministries', value: ministries.length.toString() || '—' },
    { label: 'Volunteers', value: '—' },
    { label: 'Years of Service', value: '—' }
  ];
  
  const stats = statsData.length > 0 ? statsData.map((stat: any) => ({
    label: stat.label || '—',
    value: stat.value || '—'
  })) : defaultStats;

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ministries',
    description: ministriesPageData?.heroTagline || 'Find your place to serve and grow',
    itemListElement: ministries.map((ministry: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: ministry.name,
        description: ministry.tagline,
        url: `https://thagospel.com/ministries/${ministry.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {ministriesPageData?.heroTitle || MINISTRIES_FALLBACKS.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            {ministriesPageData?.heroTagline || MINISTRIES_FALLBACKS.heroTagline}
          </p>
        </div>
        {ministriesPageData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(ministriesPageData.heroImage).url()}
              alt="Ministries"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </section>

      {/* Stats Bar */}
      <StatsBar stats={stats} showDisclaimer={true} />

      {/* People Ministries Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              People Ministries
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ministries focused on personal growth and community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {peopleMinistries.map((ministry: any) => (
              <MinistryCard
                key={ministry._id}
                name={ministry.name}
                slug={ministry.slug}
                tagline={ministry.tagline || ministry.description}
                heroImage={ministry.heroImage}
                color={ministry.color}
                meetingDay={ministry.meetingDay}
                meetingTime={ministry.meetingTime}
                ageRange={ministry.ageRange}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Serve Ministries Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serve Ministries
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Opportunities to serve and use your gifts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {serveMinistries.map((ministry: any) => (
              <MinistryCard
                key={ministry._id}
                name={ministry.name}
                slug={ministry.slug}
                tagline={ministry.tagline || ministry.description}
                heroImage={ministry.heroImage}
                color={ministry.color}
                meetingDay={ministry.meetingDay}
                meetingTime={ministry.meetingTime}
                ageRange={ministry.ageRange}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {ministriesPageData?.closingCtaTitle || 'Get Involved'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {ministriesPageData?.closingCtaSubtitle || 'Ready to make a difference? Join one of our ministries today'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/connect/prayer"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Submit a Prayer Request
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
