import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { albumBySlugQuery, allAlbumsQuery } from 'sanity/lib/queries';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

export const revalidate = 60; // 1 minute cache

interface GalleryPageProps {
  params: { slug: string };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  let album = null;
  let relatedAlbums = [];

  try {
    const [albumData, relatedData] = await Promise.all([
      client.fetch(albumBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } }),
      client.fetch(allAlbumsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    album = albumData;
    relatedAlbums = relatedData?.filter((a: any) => a.slug !== params.slug).slice(0, 3) || [];
  } catch (error) {
    console.error('Error fetching gallery data:', error);
  }

  if (!album) {
    notFound();
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: album.title,
    description: album.description,
    url: `https://thagospel.com/media/gallery/${album.slug}`,
    image: album.photos?.map((photo: any) => photo.image?.url).filter(Boolean),
    datePublished: album.eventDate,
  };

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="my-8">
            <div className="relative w-full h-96">
              <Image
                src={urlFor(value).url()}
                alt={value.alt || 'Gallery image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
            {value.caption && (
              <p className="text-center text-sm text-gray-600 mt-2 italic">
                {value.caption}
              </p>
            )}
          </div>
        );
      },
    },
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-green-500 pl-4 py-2 my-4 bg-green-50 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="text-blue-600 hover:text-blue-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/media" className="text-gray-600 hover:text-gray-900">Media</Link>
            <span className="text-gray-400">/</span>
            <Link href="/media/gallery" className="text-gray-600 hover:text-gray-900">Gallery</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{album.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        {album.coverImage ? (
          <div className="relative h-96">
            <Image
              src={urlFor(album.coverImage).url()}
              alt={album.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
                  {album.title}
                </h1>
                {album.eventDate && (
                  <p className="text-lg mb-2">
                    {new Date(album.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                {album.description && (
                  <p className="text-gray-300 max-w-2xl">{album.description}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-64 bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
                {album.title}
              </h1>
              {album.eventDate && (
                <p className="text-lg mb-2">
                  {new Date(album.eventDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Album Description */}
      {album.description && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={album.description}
              components={portableTextComponents}
            />
          </div>
        </section>
      )}

      {/* Photo Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Photos ({album.photos?.length || 0})
          </h2>
          {album.photos && album.photos.length > 0 && (
            <button
              onClick={() => {
                // Download all photos functionality
                console.log('Download all photos');
              }}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download All
            </button>
          )}
        </div>

        {album.photos && album.photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {album.photos.map((photo: any, index: number) => (
              <div key={photo._id || index} className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={urlFor(photo.image).width(400).height(400).url()}
                  alt={photo.title || 'Gallery photo'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => {
                      // Lightbox functionality would go here
                      console.log('Open lightbox for:', photo);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-900 p-2 rounded-full"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-xs truncate">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No photos in this gallery
            </h3>
            <p className="text-gray-600">
              Check back soon as we may add photos from this event.
            </p>
          </div>
        )}
      </section>

      {/* Social Share */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this gallery</h3>
          <div className="flex flex-wrap gap-4">
            <ShareButton url={`https://thagospel.com/media/gallery/${album.slug}`} title={album.title} />
          </div>
        </div>
      </section>

      {/* Related Galleries */}
      {relatedAlbums.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Galleries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedAlbums.map((relatedAlbum: any) => (
                <div key={relatedAlbum.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <Link href={`/media/gallery/${relatedAlbum.slug}`} className="block">
                    <div className="relative aspect-video">
                      {relatedAlbum.coverImage ? (
                        <Image
                          src={urlFor(relatedAlbum.coverImage).width(400).height(225).url()}
                          alt={relatedAlbum.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-4xl">📸</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedAlbum.title}</h3>
                      {relatedAlbum.eventDate && (
                        <p className="text-sm text-gray-600 mb-2">
                          {new Date(relatedAlbum.eventDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {relatedAlbum.description}
                      </p>
                      <div className="flex items-center text-green-600 font-semibold">
                        <span>View Gallery</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Gallery */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/media/gallery"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}

// Share Button Component
function ShareButton({ url, title }: { url: string; title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this photo gallery from ThaGospel Church: ${title}`,
          url,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
      </svg>
      Share Gallery
    </button>
  );
}

// Generate static params for all albums
export async function generateStaticParams() {
  try {
    const albums = await client.fetch(allAlbumsQuery, {}, { next: { revalidate: 60 } });
    
    return albums.map((album: any) => ({
      slug: album.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for individual galleries
export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  try {
    const album = await client.fetch(albumBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } });

    if (!album) {
      return {
        title: 'Gallery Not Found - ThaGospel Church',
      };
    }

    return {
      title: `${album.title} - Gallery - ThaGospel Church`,
      description: album.description || `Browse photos from ${album.title} at ThaGospel Church.`,
      openGraph: {
        title: album.title,
        description: album.description || `Browse photos from ${album.title} at ThaGospel Church.`,
        type: 'website',
        images: album.coverImage ? [urlFor(album.coverImage).url()] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: album.title,
        description: album.description || `Browse photos from ${album.title} at ThaGospel Church.`,
        images: album.coverImage ? [urlFor(album.coverImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Gallery - ThaGospel Church',
    };
  }
}
