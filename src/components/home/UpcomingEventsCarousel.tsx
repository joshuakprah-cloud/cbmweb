'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  excerpt: string;
  coverImage?: any;
  slug?: {
    current: string;
  };
  isFeatured?: boolean;
  registrationUrl?: string;
}

interface UpcomingEventsCarouselProps {
  events?: Event[];
  sectionTitle?: string;
}

const formatDayMonth = (dateString: string): { day: string; month: string } => {
  const date = new Date(dateString);
  const day = date.getDate().toString();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return { day, month };
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const UpcomingEventsCarousel = ({ 
  events,
  sectionTitle = 'Upcoming Events'
}: UpcomingEventsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const minSwipeDistance = 50;

  // Swipe handlers (mobile only)
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && events && currentIndex < events.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Empty state
  if (!events || events.length === 0) {
    return (
      <section id="events" className="bg-white border-t border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
          {/* Section Header */}
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#0d9488] font-medium">
              What&apos;s On
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111111] leading-[1.15] mt-2">
              {sectionTitle}
            </h2>
          </div>

          <div className="text-center py-14 px-6" aria-live="polite">
            <div className="w-16 h-16 bg-[#f0fdf4] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <CalendarIcon className="w-7 h-7 text-[#0d9488]" aria-hidden="true" />
            </div>
            <h3 className="text-[22px] font-bold text-[#111111]">No Upcoming Events</h3>
            <p className="text-[15px] text-[#666666] mt-2 max-w-[400px] mx-auto">
              We&apos;re planning something great. Check back soon or follow us on social media for the latest updates.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-[#0d9488] text-[14px] font-semibold mt-5 hover:text-[#0f766e] transition-colors"
            >
              View Past Events
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Mobile active event
  const activeEvent = events[currentIndex];

  return (
    <section id="events" className="bg-white border-t border-[#e5e7eb]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#0d9488] font-medium">
              What&apos;s On
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111111] leading-[1.15] mt-2">
              {sectionTitle}
            </h2>
          </div>
          
          <Link
            href="/events"
            className="hidden md:inline-flex items-center gap-1 text-[14px] font-medium text-[#0d9488] hover:text-[#0f766e] transition-colors"
          >
            View All Events
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop Static Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.slug?.current || event.title} event={event} />
          ))}
        </div>

        {/* Tablet Grid - 2 columns */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
          {events.slice(0, 2).map((event) => (
            <EventCard key={event.slug?.current || event.title} event={event} />
          ))}
          {events[2] && (
            <div className="md:col-span-2 max-w-[calc(50%-12px)] mx-auto">
              <EventCard event={events[2]} />
            </div>
          )}
        </div>

        {/* Mobile Carousel */}
        <div 
          ref={containerRef}
          className="md:hidden relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-label="Upcoming events carousel"
        >
          <div 
            className="transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="flex">
              {events.map((event, index) => (
                <div 
                  key={event.slug?.current || event.title}
                  className="w-full flex-shrink-0 px-1"
                  aria-live={index === currentIndex ? 'polite' : undefined}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#0d9488]' : 'bg-gray-300'
              }`}
              aria-label={`Go to event ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="flex justify-center mt-6 md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-[14px] font-medium text-[#0d9488] hover:text-[#0f766e] transition-colors"
          >
            View All Events
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Event Card Component
interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const { day, month } = formatDayMonth(event.date);
  const hasRegistration = !!event.registrationUrl;
  const ctaText = hasRegistration ? 'Register Now' : 'View Event';
  const ctaHref = event.registrationUrl || `/events/${event.slug?.current || '#'}`;
  const isExternal = hasRegistration;

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden transition-all duration-200 hover:translate-y-[-3px] hover:border-[#0d9488]">
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden bg-[#111111]">
        {event.coverImage ? (
          <Image
            src={urlFor(event.coverImage).width(600).height(338).url()}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a2e2e 0%, #0d2020 100%)' }}
          >
            <CalendarIcon className="w-8 h-8 text-white/30" aria-hidden="true" />
          </div>
        )}
        
        {/* Featured Badge */}
        {event.isFeatured && (
          <div className="absolute top-3 left-3" aria-hidden="true">
            <span className="bg-[#0d9488] text-white text-[11px] uppercase tracking-[0.08em] font-semibold px-2.5 py-1 rounded-md">
              Featured
            </span>
          </div>
        )}

        {/* Date Chip */}
        <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-center">
          <div className="text-[22px] font-bold leading-none">{day}</div>
          <div className="text-[11px] uppercase opacity-80 leading-tight">{month}</div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-[18px] font-bold text-[#111111] leading-[1.4] line-clamp-2 mb-2.5">
          {event.title}
        </h3>

        {/* Meta Row */}
        <div className="flex flex-wrap gap-4 mb-3">
          <div className="flex items-center gap-1 text-[13px] text-[#666666]">
            <ClockIcon className="w-3.5 h-3.5 text-[#0d9488]" aria-hidden="true" />
            <span>{formatTime(event.date)}</span>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-[#666666] max-w-[200px]">
            <MapPinIcon className="w-3.5 h-3.5 text-[#0d9488] flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-[14px] text-[#666666] leading-[1.6] line-clamp-2 mb-4">
          {event.excerpt}
        </p>

        {/* Card Footer */}
        <div className="pt-3.5 border-t border-[#e5e7eb]">
          {isExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[#0d9488] hover:text-[#0f766e] transition-all duration-200"
              aria-label={`Register for ${event.title}`}
            >
              {ctaText}
              <ArrowRightIcon className="w-3.5 h-3.5 transition-all duration-200 group-hover:translate-x-1" />
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[#0d9488] hover:text-[#0f766e] transition-all duration-200"
              aria-label={`View event: ${event.title}`}
            >
              {ctaText}
              <ArrowRightIcon className="w-3.5 h-3.5 transition-all duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsCarousel;
