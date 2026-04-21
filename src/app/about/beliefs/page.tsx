import Link from 'next/link';
import BeliefsHero from '@/components/about/BeliefsHero';
import BeliefsClient from '@/components/about/BeliefsClient';
import CodePrinciples from '@/components/about/CodePrinciples';
import AboutCTA from '@/components/about/AboutCTA';
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
      
      {/* Hero Section */}
      <BeliefsHero />

      {/* Beliefs Section */}
      <section className="bg-[#0a0a0a] py-16 md:py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <BeliefsClient beliefs={beliefs} />
        </div>
      </section>

      {/* Code Principles Section */}
      <CodePrinciples />

      {/* Final CTA */}
      <AboutCTA />
    </>
  );
}
