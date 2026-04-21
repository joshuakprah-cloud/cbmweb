import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { eventBySlugQuery, adjacentEventsQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';
import EventCard from '@/components/events/EventCard';
import EventBadge from '@/components/events/EventBadge';
import dynamic from 'next/dynamic';

// Dynamic imports for client components
const EventCountdown = dynamic(() => import('@/components/events/EventCountdown'), {
  loading: () => <div className="text-center py-8">Loading countdown...</div>,
});

interface EventPageContentProps {
  params: { slug: string };
  formData: {
    fullName: string;
    email: string;
    phone: string;
    attendees: string;
  };
  setFormData: (data: any) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  submitMessage: string;
  setSubmitMessage: (message: string) => void;
}

export default async function EventPageContent({ 
  params, 
  formData, 
  setFormData, 
  isSubmitting, 
  setIsSubmitting, 
  submitMessage, 
  setSubmitMessage 
}: EventPageContentProps) {
  let event = null;
  let adjacentEvents = null;

  try {
    const [eventData, adjacentData] = await Promise.all([
      client.fetch(eventBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } }),
      client.fetch(adjacentEventsQuery, { currentDate: new Date().toISOString() }, { next: { revalidate: 60 } }),
    ]);

    event = eventData;
    adjacentEvents = adjacentData;
  } catch (error) {
    console.error('Error fetching event:', error);
  }

  if (!event) {
    notFound();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/register-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventSlug: params.slug,
        }),
      });

      if (response.ok) {
        setSubmitMessage('Registration successful! We\'ll contact you soon.');
        setFormData({ fullName: '', email: '', phone: '', attendees: '1' });
      } else {
        setSubmitMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitMessage('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.excerpt,
    startDate: event.date,
    endDate: event.endDate || event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: event.location,
    },
    image: event.coverImage ? urlFor(event.coverImage).url() : undefined,
    url: `https://thagospel.com/events/${params.slug}`,
    organizer: {
      '@type': 'Organization',
      name: 'ThaGospel Church',
    },
    eventStatus: 'EventScheduled',
  };

  // Generate calendar export URLs
  const generateGoogleCalendarUrl = () => {
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${new Date(event.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${new Date(event.endDate || event.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      details: event.excerpt,
      location: event.location || '',
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        {event.coverImage ? (
          <div className="absolute inset-0">
            <Image
              src={urlFor(event.coverImage).url()}
              alt={event.title}
              fill
              className="object-cover"
              priority={true}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/70 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#0B1F3A]" />
        )}
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-white/70">
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">Events</Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-white">{event.title}</li>
              </ol>
            </nav>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <EventBadge type="category" label={event.category} />
              {event.isFree ? (
                <EventBadge type="free" label={EVENTS_FALLBACKS.free} />
              ) : event.ticketPrice ? (
                <EventBadge type="paid" label={`$${event.ticketPrice}`} />
              ) : null}
              {event.requiresRegistration && (
                <EventBadge 
                  type="registration" 
                  label={event.registrationStatus === 'sold_out' ? 'Sold Out' : 
                         event.registrationStatus === 'limited' ? 'Limited Spots' : 
                         'Registration Open'}
                />
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            
            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-white/80 text-lg">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(event.date)}
              </span>
              {event.location && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">About This Event</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {event.body ? (
                  <PortableText value={event.body} />
                ) : event.excerpt ? (
                  <p>{event.excerpt}</p>
                ) : (
                  <p>Join us for this special event.</p>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Share */}
              <div className="bg-[#F8F9FB] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0B1F3A] mb-4">Share This Event</h3>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: event.title,
                        text: event.excerpt,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Event link copied to clipboard!');
                    }
                  }}
                  className="w-full px-4 py-2.5 bg-[#0B1F3A] text-white rounded-lg hover:bg-[#0B1F3A]/90 transition-colors font-medium"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Event
                  </span>
                </button>
              </div>

              {/* Calendar Export */}
              <div className="bg-[#F8F9FB] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0B1F3A] mb-4">Add to Calendar</h3>
                <div className="space-y-2">
                  <a
                    href={generateGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2.5 border border-[#0B1F3A] text-[#0B1F3A] rounded-lg hover:bg-[#0B1F3A] hover:text-white transition-colors text-center font-medium"
                  >
                    {EVENTS_FALLBACKS.export.googleCalendar}
                  </a>
                  <Link
                    href={`/api/events/ics/${params.slug}`}
                    className="block w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
                  >
                    {EVENTS_FALLBACKS.export.appleCalendar}
                  </Link>
                </div>
              </div>

              {/* Countdown */}
              <div className="bg-[#F8F9FB] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0B1F3A] mb-4">Event Starts In</h3>
                <EventCountdown date={event.date} endDate={event.endDate} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      {event.requiresRegistration && (
        <section id="register" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB]">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-2 text-center">Register for This Event</h2>
            <p className="text-gray-600 text-center mb-8">
              Secure your spot and join us for this special occasion.
            </p>
            
            {submitMessage && (
              <div className={`p-4 rounded-lg mb-6 ${
                submitMessage.includes('successful') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  {submitMessage.includes('successful') ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {submitMessage}
                </div>
              </div>
            )}
            
            {event.registrationUrl ? (
              <div className="text-center bg-white rounded-xl p-8 shadow-sm">
                <p className="text-gray-600 mb-6">
                  This event requires registration through an external site.
                </p>
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-[#0B1F3A] text-white font-semibold rounded-lg hover:bg-[#0B1F3A]/90 transition-colors"
                >
                  Register Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9V6l4 4m0 0l-4-4" />
                  </svg>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm">
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A75E] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A75E] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A75E] focus:border-transparent"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Attendees *
                  </label>
                  <select
                    id="attendees"
                    name="attendees"
                    required
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A75E] focus:border-transparent bg-white"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-[#0B1F3A] text-white font-semibold rounded-lg hover:bg-[#0B1F3A]/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Register Now'}
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* RELATED EVENTS */}
      {event.relatedEvents && event.relatedEvents.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-2">You Might Also Like</h2>
            <p className="text-gray-600 mb-8">Similar events you may be interested in.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.relatedEvents.map((relatedEvent: any, index: number) => (
                <EventCard
                  key={index}
                  event={relatedEvent}
                  variant="related"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NAVIGATION */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/events"
              className="flex items-center gap-2 text-[#C6A75E] hover:text-[#0B1F3A] font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Events
            </Link>
            
            {adjacentEvents && (
              <div className="flex items-center gap-4">
                {adjacentEvents.previous && (
                  <Link
                    href={`/events/${adjacentEvents.previous.slug}`}
                    className="flex items-center gap-2 text-[#0B1F3A] hover:text-[#C6A75E] font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </Link>
                )}
                
                {adjacentEvents.next && (
                  <Link
                    href={`/events/${adjacentEvents.next.slug}`}
                    className="flex items-center gap-2 text-[#0B1F3A] hover:text-[#C6A75E] font-medium transition-colors"
                  >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
