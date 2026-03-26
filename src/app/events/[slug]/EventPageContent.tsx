import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { eventBySlugQuery, adjacentEventsQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';
import EventCard from '@/components/events/EventCard';
import dynamic from 'next/dynamic';

// Dynamic imports for client components
const EventCountdown = dynamic(() => import('@/components/events/EventCountdown'), {
  loading: () => <div className="text-center py-8">Loading countdown...</div>,
});

const MinistryLightbox = dynamic(() => import('@/components/ministries/MinistryLightbox'), {
  loading: () => <div className="text-center py-8">Loading gallery...</div>,
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
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-50 px-4 py-3" aria-label="Breadcrumb">
        <div className="max-w-6xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/events" className="hover:text-gray-900">Events</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{event.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
              {event.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            {event.title}
          </h1>
          <div className="space-y-2 text-lg">
            <div>📅 {formatDate(event.date)}</div>
            <div>⏰ {formatTime(event.date)}</div>
            {event.location && <div>📍 {event.location}</div>}
          </div>
          {event.isFree ? (
            <div className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-full">
              {EVENTS_FALLBACKS.free}
            </div>
          ) : event.ticketPrice && (
            <div className="mt-4 inline-block px-4 py-2 bg-yellow-600 text-white rounded-full">
              {event.ticketPrice}
            </div>
          )}
        </div>
        {event.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(event.coverImage).url()}
              alt={event.title}
              fill
              className="object-cover"
              priority={true}
              sizes="100vw"
            />
          </div>
        )}
      </section>

      {/* Event Details */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Event</h2>
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
            
            <div className="space-y-6">
              {/* Social Share */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Event</h3>
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
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Share Event
                </button>
              </div>

              {/* Calendar Export */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add to Calendar</h3>
                <div className="space-y-2">
                  <a
                    href={generateGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    {EVENTS_FALLBACKS.export.googleCalendar}
                  </a>
                  <Link
                    href={`/api/events/ics/${params.slug}`}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    {EVENTS_FALLBACKS.export.appleCalendar}
                  </Link>
                </div>
              </div>

              {/* Countdown */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Starts In</h3>
                <EventCountdown date={event.date} endDate={event.endDate} />
              </div>
            </div>
          </div>

          {/* Registration Form */}
          {event.requiresRegistration && (
            <div id="register" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Register for This Event</h2>
              
              {submitMessage && (
                <div className={`p-4 rounded-lg mb-6 ${
                  submitMessage.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              {event.registrationUrl ? (
                <div className="text-center">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Register on External Site
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9V6l4 4m0 0l-4-4" />
                    </svg>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Attendees *
                    </label>
                    <select
                      id="attendees"
                      name="attendees"
                      required
                      value={formData.attendees}
                      onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Related Events */}
          {event.relatedEvents && event.relatedEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Events</h2>
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
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-12 border-t">
            <Link
              href="/events"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Events
            </Link>
            {adjacentEvents && (
              <>
                {adjacentEvents.previous ? (
                  <Link
                    href={`/events/${adjacentEvents.previous.slug}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Event: {adjacentEvents.previous.title}
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {adjacentEvents.next && (
                  <Link
                    href={`/events/${adjacentEvents.next.slug}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Next Event: {adjacentEvents.next.title}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
