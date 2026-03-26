import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
import dynamic from 'next/dynamic';

// Dynamic imports for client components
const EventsBrowser = dynamic(() => import('@/components/events/EventsBrowser'), {
  loading: () => <div className="text-center py-8">Loading events...</div>,
});

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
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {eventsPageData?.heroTitle || 'Events'}
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg">
            {eventsPageData?.heroTagline || 'Join us for upcoming events and gatherings'}
          </p>
        </div>
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
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              {featuredEvent.coverImage && (
                <div className="relative h-64 md:h-96">
                  <Image
                    src={urlFor(featuredEvent.coverImage).url()}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              )}
              <div className="p-8 md:p-12 bg-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {featuredEvent.title}
                    </h2>
                    <div className="space-y-2 text-gray-600 mb-6">
                      <p className="flex items-center gap-2">
                        <span className="text-lg">📅</span>
                        {new Date(featuredEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-lg">⏰</span>
                        {new Date(featuredEvent.date).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true 
                        })}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        {featuredEvent.location}
                      </p>
                    </div>
                    {featuredEvent.excerpt && (
                      <p className="text-gray-700 mb-6">
                        {featuredEvent.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                      {featuredEvent.isFree ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Free
                        </span>
                      ) : featuredEvent.ticketPrice ? (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                          ${featuredEvent.ticketPrice}
                        </span>
                      ) : null}
                      
                      {featuredEvent.requiresRegistration && (
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          featuredEvent.registrationStatus === 'sold_out' ? 'bg-red-100 text-red-800' :
                          featuredEvent.registrationStatus === 'limited' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {featuredEvent.registrationStatus === 'sold_out' ? 'Sold Out' :
                           featuredEvent.registrationStatus === 'limited' ? 'Limited Spots' :
                           'Open'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      href={`/events/${featuredEvent.slug}`}
                      className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {featuredEvent.requiresRegistration ? 'Register Now' : 'Learn More'}
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Featured Event Fallback */}
      {!featuredEvent && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600">
              No featured event at this time. Check back soon.
            </p>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              All
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Service
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Study
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Social
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Outreach
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Youth
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Women
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Men
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Special
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <input
              type="text"
              placeholder="Search events..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Dates</option>
              <option value="2024-12">December 2024</option>
              <option value="2025-01">January 2025</option>
            </select>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Upcoming Events</h2>
          
          {filteredUpcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpcomingEvents.map((event: any) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  variant="upcoming"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No events found. Try a different category or date.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Archive */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              View Past Events
            </button>
          </div>
          
          {pastEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.slice(0, 9).map((event: any) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  variant="past"
                />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {pastEvents.length > 9 && (
            <div className="flex justify-center mt-8 gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors">
                1
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors">
                3
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
