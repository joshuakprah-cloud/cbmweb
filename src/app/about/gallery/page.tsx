import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutCTA from '@/components/about/AboutCTA';
import GalleryClient from '@/components/about/GalleryClient';
import { client } from '../../../../sanity/lib/client';
import { galleryPageQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';

interface GalleryImage {
  _id: string;
  title?: string;
  description?: string;
  image: any;
  category?: string;
}

async function getGalleryData(): Promise<{ pageData: any; images: GalleryImage[] }> {
  try {
    const pageData = await client.fetch(galleryPageQuery, {}, { next: { revalidate: 60 } });
    return { pageData: pageData || {}, images: pageData?.images || [] };
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return { pageData: {}, images: [] };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  let pageData = null;

  try {
    pageData = await client.fetch(galleryPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching gallery metadata:', error);
  }

  const seoData = pageData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'Photo Gallery | ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Explore photos of our church services, events, and community gatherings.';
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: !seoData.noIndex,
      follow: true,
    },
  };
}

function groupByCategory(images: GalleryImage[]) {
  const groups: { [key: string]: GalleryImage[] } = {};
  images.forEach(image => {
    const category = image.category || 'General';
    if (!groups[category]) groups[category] = [];
    groups[category].push(image);
  });
  return groups;
}

export default async function GalleryPage() {
  const { pageData, images } = await getGalleryData();
  const groupedImages = groupByCategory(images);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thagospel.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://thagospel.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Gallery', item: 'https://thagospel.com/about/gallery' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <AboutHero
        headline="Life at ThaGospel Church"
        subheadline="A glimpse into our worship, community, and ministry moments."
        bodyText="Explore photos from our services, events, and community gatherings. These images capture the heart of who we are - a church family united by love, worship, and a passion for Jesus."
      />

      {/* Gallery Grid with Filter Tabs */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-20 border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-semibold">Visual Journey</span>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111] leading-[1.1] mt-3">Photo Gallery</h2>
          </div>

          <GalleryClient images={images} />

          {images.length === 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-400 italic">More photos coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <AboutCTA 
        headline="Experience It In Person"
        subtext="Photos don't do it justice. Come see for yourself."
        primaryText="Plan Your Visit"
        primaryLink="/plan-your-visit"
      />
    </>
  );
}
