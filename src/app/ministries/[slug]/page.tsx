import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { ministryBySlugQuery, allMinistriesQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { MINISTRIES_FALLBACKS } from '@/constants/fallbacks';
import StatsBar from '@/components/ministries/StatsBar';
import MinistryCard from '@/components/ministries/MinistryCard';
import dynamic from 'next/dynamic';

// Dynamic imports for client components
const MinistryLightbox = dynamic(() => import('@/components/ministries/MinistryLightbox'), {
  loading: () => <div className="text-center py-8">Loading gallery...</div>,
});

const MinistryJoinForm = dynamic(() => import('@/components/ministries/MinistryJoinForm'), {
  loading: () => <div className="text-center py-8">Loading form...</div>,
});

export const dynamicParams = true;
export const revalidate = 3600; // 1 hour cache

export async function generateStaticParams() {
  try {
    const ministries = await client.fetch(allMinistriesQuery, {}, { next: { revalidate: 3600 } });
    
    return (ministries || []).map((ministry: any) => ({
      slug: ministry.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const ministry = await client.fetch(ministryBySlugQuery, { slug: params.slug }, { next: { revalidate: 3600 } });
    
    if (!ministry) {
      return {
        title: 'Ministry Not Found - ThaGospel Church',
        description: 'This ministry could not be found.',
      };
    }

    return {
      title: `${ministry.name} - ThaGospel Church`,
      description: ministry.tagline,
      openGraph: {
        title: `${ministry.name} - ThaGospel Church`,
        description: ministry.tagline,
        images: ministry.heroImage ? [urlFor(ministry.heroImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Ministry - ThaGospel Church',
      description: 'Learn more about our ministries.',
    };
  }
}

export default async function MinistryPage({ params }: { params: { slug: string } }) {
  let ministry = null;

  try {
    ministry = await client.fetch(ministryBySlugQuery, { slug: params.slug }, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching ministry:', error);
  }

  if (!ministry) {
    notFound();
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ministry.name,
    description: ministry.tagline,
    image: ministry.heroImage ? urlFor(ministry.heroImage).url() : undefined,
    url: `https://thagospel.com/ministries/${params.slug}`,
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="text-sm uppercase tracking-wider mb-4">{ministry.label}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {ministry.tagline}
          </h1>
        </div>
        {ministry.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(ministry.heroImage).url()}
              alt={`${ministry.name} ministry`}
              fill
              className="object-cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </section>

      {/* Stats Bar */}
      {ministry.stats && ministry.stats.length > 0 && (
        <StatsBar stats={ministry.stats} />
      )}

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About {ministry.name}</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            {ministry.body ? (
              <PortableText value={ministry.body} />
            ) : ministry.description ? (
              <p>{ministry.description}</p>
            ) : (
              <p>Learn more about {ministry.name} and how you can get involved.</p>
            )}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      {ministry.expectations && ministry.expectations.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {MINISTRIES_FALLBACKS.whatToExpect}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {ministry.expectations.map((expectation: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {expectation.title}
                  </h3>
                  <p className="text-gray-600">{expectation.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership Section */}
      {ministry.leaders && ministry.leaders.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {MINISTRIES_FALLBACKS.leadership}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministry.leaders.map((leader: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    {leader.photo ? (
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-2xl">👤</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-gray-600 mb-2">{leader.role}</p>
                  {leader.bio && <p className="text-sm text-gray-500">{leader.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {ministry.gallery && ministry.gallery.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {MINISTRIES_FALLBACKS.gallery}
            </h2>
            <MinistryLightbox
              photos={ministry.gallery.map((item: any) => ({
                src: item.image,
                alt: item.caption || `${ministry.name} gallery photo`,
                caption: item.caption,
              }))}
            />
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      {ministry.events && ministry.events.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {MINISTRIES_FALLBACKS.upcomingEvents}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministry.events.map((event: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {event.image && (
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-2 text-gray-600">
                      {event.date && <div>📅 {event.date}</div>}
                      {event.time && <div>⏰ {event.time}</div>}
                      {event.location && <div>📍 {event.location}</div>}
                    </div>
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Ministries Section */}
      {ministry.relatedMinistries && ministry.relatedMinistries.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {MINISTRIES_FALLBACKS.relatedMinistries}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministry.relatedMinistries.map((relatedMinistry: any, index: number) => (
                <MinistryCard
                  key={index}
                  name={relatedMinistry.name}
                  slug={relatedMinistry.slug}
                  tagline={relatedMinistry.tagline}
                  heroImage={relatedMinistry.heroImage}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <MinistryJoinForm
            ministryName={ministry.name}
            ministrySlug={params.slug}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
