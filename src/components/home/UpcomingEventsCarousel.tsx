'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import ContentCard from '../ui/ContentCard';
import { urlFor } from '../../sanity/lib/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
}

interface UpcomingEventsCarouselProps {
  events?: Event[];
}

const UpcomingEventsCarousel = ({ events }: UpcomingEventsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Minimum swipe distance
  const minSwipeDistance = 50;

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

  // Swipe handlers
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

  const nextSlide = () => {
    if (events && currentIndex < events.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!events || events.length === 0) {
    return (
      <section id="events" className="bg-[#f0f0ee] py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <span 
                className="text-gray-600 italic"
                style={{ 
                  fontSize: '18px',
                  fontFamily: 'Georgia, serif'
                }}
              >
                What&apos;s Coming
              </span>
              
              <h2 
                className="text-black font-bold mt-4" 
                style={{ fontSize: '52px', lineHeight: '1.1' }}
              >
                Upcoming Events
              </h2>
            </div>
            
            <Link
              href="/events"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
            >
              View All Events →
            </Link>
          </div>

          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-600 text-lg mb-2">No upcoming events at this time.</p>
            <p className="text-gray-500">Check back soon for new events and activities!</p>
          </div>
        </div>
      </section>
    );
  }

  // Calculate visible events for mobile swipe view
  const visibleEvents = events.slice(currentIndex, currentIndex + 3);

  return (
    <section id="events" className="bg-[#f0f0ee] py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              What&apos;s Coming
            </span>
            
            <h2 
              className="text-black font-bold mt-4" 
              style={{ fontSize: '52px', lineHeight: '1.1' }}
            >
              Upcoming Events
            </h2>
          </div>
          
          <Link
            href="/events"
            className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
          >
            View All Events →
          </Link>
        </div>

        {/* Navigation Arrows (Desktop) */}
        <div className="hidden md:flex justify-end gap-2 mb-6">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white shadow-md text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous events"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= events.length - 3}
            className="p-2 rounded-full bg-white shadow-md text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next events"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Events Grid with Swipe Support */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {events.map((event) => (
              <ContentCard
                key={event.slug?.current || event.title}
                image={event.coverImage ? urlFor(event.coverImage).url() : '/placeholder-event.jpg'}
                badge={event.isFeatured ? 'Featured' : undefined}
                title={event.title}
                meta={`${formatDate(event.date)} • ${formatTime(event.date)}`}
                description={event.excerpt}
                cta={{
                  label: 'Learn More',
                  href: `/events/${event.slug?.current || '#'}`
                }}
              />
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mt-8 md:hidden">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-teal-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to event ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsCarousel;
