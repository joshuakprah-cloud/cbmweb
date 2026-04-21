import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
      
      {/* Hero Section - Full width image with ministry name overlay */}
      <section className="relative h-[400px] md:h-[450px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {ministry.heroImage ? (
            <Image
              src={urlFor(ministry.heroImage).url()}
              alt={`${ministry.name} ministry`}
              fill
              className="object-cover"
              priority={true}
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c]" />
          )}
        </div>
        
        {/* Teal/Navy overlay for brand consistency */}
        <div className="absolute inset-0 bg-[#0B1F3A]/50 z-10"></div>
        
        {/* Ministry Name - Centered overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide uppercase drop-shadow-lg">
            {ministry.name}
          </h1>
        </div>
      </section>

      {/* Content Section - Two Column Layout */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] uppercase tracking-wide">
                {ministry.tagline || `${ministry.name} Team`}
              </h2>
              
              <div className="prose prose-lg text-gray-600 max-w-none">
                {ministry.body ? (
                  <PortableText value={ministry.body} />
                ) : ministry.description ? (
                  <p>{ministry.description}</p>
                ) : (
                  <p>The {ministry.name} ministry at ThaGospel Church seeks to create an environment where everyone who comes through the doors is seen and loved. Our desire is to make authentic connections with the people we meet and help them feel at home at ThaGospel.</p>
                )}
              </div>
              
              <p className="text-gray-600">
                If you feel led to be one of the first things people see when they walk in the door, we are always looking for team members to welcome new and returning congregants to the church.
              </p>
              
              <div className="pt-4">
                <Link
                  href="#join-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#0d9488] text-white font-semibold rounded-lg hover:bg-[#0f766e] transition-all duration-200 uppercase tracking-wide text-sm"
                >
                  Join the Team
                </Link>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {ministry.gallery && ministry.gallery.length > 0 ? (
                  <Image
                    src={ministry.gallery[0].image}
                    alt={`${ministry.name} in action`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : ministry.heroImage ? (
                  <Image
                    src={urlFor(ministry.heroImage).url()}
                    alt={`${ministry.name} ministry`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center">
                    <span className="text-white/30 text-6xl">👥</span>
                  </div>
                )}
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#0d9488]/20 rounded-full -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#0B1F3A]/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {ministry.stats && ministry.stats.length > 0 && (
        <section className="bg-[#0d9488] py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {ministry.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/80 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What to Expect Section */}
      {ministry.expectations && ministry.expectations.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
                What to Expect
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
                {MINISTRIES_FALLBACKS.whatToExpect}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {ministry.expectations.map((expectation: any, index: number) => (
                <div key={index} className="bg-[#F8F9FB] rounded-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
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
        <section className="py-20 px-4 bg-[#F8F9FB]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
                {MINISTRIES_FALLBACKS.leadership}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministry.leaders.map((leader: any, index: number) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-[#0d9488] transition-colors">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-100 hover:border-[#0d9488] transition-colors">
                    {leader.photo ? (
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F8F9FB] flex items-center justify-center">
                        <span className="text-[#0B1F3A]/30 text-2xl">👤</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">{leader.name}</h3>
                  <p className="text-[#0d9488] font-medium text-sm mb-2">{leader.role}</p>
                  {leader.bio && <p className="text-sm text-gray-500">{leader.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {ministry.gallery && ministry.gallery.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
                Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
                {MINISTRIES_FALLBACKS.gallery}
              </h2>
            </div>
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
      <section id="join-form" className="py-20 px-4 bg-[#F8F9FB]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
                Get Involved
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
                Join {ministry.name}
              </h2>
            </div>
            <MinistryJoinForm
              ministryName={ministry.name}
              ministrySlug={params.slug}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
