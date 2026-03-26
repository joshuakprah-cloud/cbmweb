import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { allAlbumsQuery, galleryPageQuery } from 'sanity/lib/queries';
import GalleryBrowser from '@/components/gallery/GalleryBrowser';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60; // 1 minute cache

export async function generateMetadata(): Promise<Metadata> {
  let galleryPageData = null;

  try {
    galleryPageData = await client.fetch(galleryPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching gallery metadata:', error);
  }

  const metaTitle = 'Gallery | ThaGospel Church';
  const metaDescription = galleryPageData?.seo?.metaDescription || 
    'Browse through photos from our events, services, and community activities.';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default async function GalleryPage() {
  let albums = [];
  let galleryPageData = null;

  try {
    const [albumsData, pageData] = await Promise.all([
      client.fetch(allAlbumsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(galleryPageQuery, {}, { next: { revalidate: 60 } }),
    ]);

    albums = albumsData || [];
    galleryPageData = pageData;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    // Continue with empty arrays - will show no-content state
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'ThaGospel Church Gallery',
    description: 'Browse through photos from our events, services, and community activities.',
    url: 'https://thagospel.com/media/gallery',
    image: albums.map((album: any) => album.coverImage?.url).filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {galleryPageData?.heroTitle || 'Gallery'}
          </h1>
          <p className="text-lg md:text-xl font-light drop-shadow-lg">
            {galleryPageData?.heroSubtitle || 'Browse through photos from our events, services, and community activities'}
          </p>
        </div>
        {galleryPageData?.heroImage && (
          <div className="absolute inset-0">
            <img
              src={urlFor(galleryPageData.heroImage).url()}
              alt="Gallery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {albums.length > 0 ? (
          <GalleryBrowser albums={albums} />
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">
              No galleries yet. Check back after our next event.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
