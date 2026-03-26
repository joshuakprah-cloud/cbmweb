import Link from 'next/link';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import BeliefsClient from '@/components/about/BeliefsClient';
import { client } from '../../../../sanity/lib/client';
import { beliefsPageQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';

interface Belief {
  title: string;
  scriptureReference: string;
  description: string;
}

interface BeliefsData {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImage?: any;
  introText?: string;
  beliefs?: Belief[];
  beliefsPdf?: {
    asset?: {
      url?: string;
    };
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
    noIndex?: boolean;
  };
}

async function getBeliefsData(): Promise<BeliefsData | null> {
  try {
    const data = await client.fetch(beliefsPageQuery, {}, { next: { revalidate: 60 } });
    return data;
  } catch (error) {
    console.error('Error fetching beliefs data:', error);
    return null;
  }
}

export default async function BeliefsPage() {
  const beliefsData = await getBeliefsData();

  const heroTitle = beliefsData?.heroTitle || 'What We Believe';
  const heroSubtitle = beliefsData?.heroSubtitle || 'Our core beliefs and foundational doctrines';
  const heroImage = beliefsData?.heroBackgroundImage;
  const introText = beliefsData?.introText || 'Here are the foundational beliefs that guide our faith and practice as a church community.';
  const beliefs = beliefsData?.beliefs || [];
  const beliefsPdf = beliefsData?.beliefsPdf?.asset?.url;

  const seoData = beliefsData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || `${heroTitle} | ThaGospel Church`;
  const metaDescription = seoData.metaDescription || introText;
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: heroTitle,
    description: metaDescription,
    url: 'https://thagospel.com/about/beliefs',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: beliefs.length,
      itemListElement: beliefs.map((belief, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: belief.title,
          description: belief.description,
        },
      })),
    },
  };

  return (
    <>
      <Script
        id="beliefs-json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-4 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Beliefs</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <PageHero 
        title={heroTitle} 
        subtitle={heroSubtitle}
        image={heroImage}
      />

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-gray-700 leading-relaxed">{introText}</p>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Core Beliefs"
            subtitle="Explore the foundational doctrines that guide our faith"
          />
          
          <BeliefsClient beliefs={beliefs} beliefsPdf={beliefsPdf} />
        </div>
      </section>

      {/* Back to About */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to About
          </Link>
        </div>
      </section>
    </>
  );
}
