import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { client } from '@/sanity/lib/client';
import { 
  eventsPageQuery, 
  featuredEventQuery, 
  upcomingEventsQuery, 
  pastEventsQuery 
} from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';
import EventCard from '@/components/events/EventCard';
import EventsBrowser from '@/components/events/EventsBrowser';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const revalidate = 60; // 1 minute cache for real-time updates

export async function generateMetadata(): Promise<Metadata> {
  try {
    const eventsPageData = await client.fetch(eventsPageQuery, {}, { next: { revalidate: 60 } });
    
    return {
      title: 'Events | ThaGospel Church',
      description: eventsPageData?.seo?.metaDescription || 'Join us for upcoming events and gatherings at ThaGospel Church.',
      openGraph: {
        title: 'Events | ThaGospel Church',
        description: eventsPageData?.seo?.metaDescription || 'Join us for upcoming events and gatherings at ThaGospel Church.',
        images: eventsPageData?.seo?.ogImage ? [urlFor(eventsPageData.seo.ogImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching events metadata:', error);
    return {
      title: 'Events | ThaGospel Church',
      description: 'Join us for upcoming events and gatherings at ThaGospel Church.',
    };
  }
}

export default async function EventsPage() {
  let eventsPageData = null;
  let featuredEvent = null;
  let upcomingEvents = [];
  let pastEvents = [];

  try {
    const [pageData, featured, upcoming, past] = await Promise.all([
      client.fetch(eventsPageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(featuredEventQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(upcomingEventsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(pastEventsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    eventsPageData = pageData;
    featuredEvent = featured;
    upcomingEvents = upcoming || [];
    pastEvents = past || [];
  } catch (error) {
    console.error('Error fetching events data:', error);
  }

  // Filter out past events from upcoming events
  const now = new Date();
  const filteredUpcomingEvents = upcomingEvents.filter((event: any) => 
    new Date(event.date) >= now
  );

  return (
    <>
      <Script
        id="events-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Events | ThaGospel Church',
          description: 'Join us for upcoming events and gatherings at ThaGospel Church.',
          url: 'https://thagospel.com/events',
        }) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0B1F3A]">
        {/* Background Image */}
        {eventsPageData?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(eventsPageData.heroImage).url()}
              alt="Events"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0B1F3A]/75" />
          </div>
        )}
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {eventsPageData?.heroTitle || "Upcoming Events"}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {eventsPageData?.heroTagline || "Join us for worship, community, outreach, and more. There's a place for you."}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="w-8 h-8 text-[#C6A75E]" />
        </div>
      </section>

      {/* 2. FEATURED EVENT */}
      {featuredEvent && (
        <section className="relative min-h-[480px] overflow-hidden">
          {featuredEvent.coverImage && (
            <div className="absolute inset-0">
              <Image
                src={urlFor(featuredEvent.coverImage).url()}
                alt={featuredEvent.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent" />
            </div>
          )}
          
          <div className="relative z-10 h-full min-h-[480px] flex flex-col justify-end px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[#0d9488] text-white text-sm font-medium rounded-full">
                  {featuredEvent.category}
                </span>
                {featuredEvent.isFree ? (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    Free
                  </span>
                ) : featuredEvent.ticketPrice ? (
                  <span className="px-3 py-1 bg-[#C6A75E] text-[#0B1F3A] text-sm font-medium rounded-full">
                    ${featuredEvent.ticketPrice}
                  </span>
                ) : null}
                {featuredEvent.requiresRegistration && (
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    featuredEvent.registrationStatus === 'sold_out' ? 'bg-red-500 text-white' :
                    featuredEvent.registrationStatus === 'limited' ? 'bg-orange-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {featuredEvent.registrationStatus === 'sold_out' ? 'Sold Out' :
                     featuredEvent.registrationStatus === 'limited' ? 'Limited' :
                     'Open'}
                  </span>
                )}
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {featuredEvent.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-white/80 mb-4">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(featuredEvent.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(featuredEvent.date).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  })}
                </span>
                {featuredEvent.location && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {featuredEvent.location}
                  </span>
                )}
              </div>
              
              {featuredEvent.excerpt && (
                <p className="text-white/70 max-w-2xl mb-6 line-clamp-2">
                  {featuredEvent.excerpt}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/events/${featuredEvent.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-[#0B1F3A] text-white font-semibold rounded-lg hover:bg-[#0B1F3A]/90 transition-colors"
                >
                  Register Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/events/${featuredEvent.slug}`}
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. FILTER BAR + EVENTS BROWSER */}
      <section className="bg-white">
        <EventsBrowser events={filteredUpcomingEvents} pastEvents={pastEvents} />
      </section>
    </>
  );
}
