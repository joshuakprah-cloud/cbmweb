import Image from 'next/image';
import Link from 'next/link';
import EventBadge from './EventBadge';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';

interface EventCardProps {
  event: {
    title: string;
    slug: string;
    date: string;
    endDate?: string;
    location?: string;
    excerpt?: string;
    coverImage?: string;
    category: string;
    isFree?: boolean;
    ticketPrice?: string;
    requiresRegistration?: boolean;
    tags?: string[];
  };
  variant: 'upcoming' | 'past' | 'related' | 'list';
}

const EventCard: React.FC<EventCardProps> = ({ event, variant }) => {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
  const year = eventDate.getFullYear();
  
  const formatDate = () => {
    if (variant === 'list') {
      return eventDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return `${month} ${day}, ${year}`;
  };

  const formatTime = () => {
    return eventDate.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  if (variant === 'list') {
    return (
      <Link
        href={`/events/${event.slug}`}
        className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
        aria-label={`${event.title}, ${formatDate()}, ${event.category}`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="md:w-32">
            <div className="text-sm text-gray-500">{formatDate()}</div>
            <div className="text-sm text-gray-500">{formatTime()}</div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <EventBadge type="category" label={event.category} />
              {event.isFree && (
                <EventBadge type="free" label={EVENTS_FALLBACKS.free} />
              )}
              {!event.isFree && event.ticketPrice && (
                <EventBadge type="paid" label={event.ticketPrice} />
              )}
              {event.requiresRegistration && (
                <EventBadge type="registration" label={EVENTS_FALLBACKS.registrationRequired} />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
            {event.excerpt && (
              <p className="text-gray-600 line-clamp-2">{event.excerpt}</p>
            )}
            {event.location && (
              <div className="text-sm text-gray-500 mt-2">📍 {event.location}</div>
            )}
          </div>
          
          <div className="md:w-8 flex justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/events/${event.slug}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
      aria-label={`${event.title}, ${formatDate()}, ${event.category}`}
    >
      <div className="relative h-48">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">📅</span>
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2 text-center">
          <div className="text-lg font-bold text-gray-900">{day}</div>
          <div className="text-xs text-gray-600">{month}</div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <EventBadge type="category" label={event.category} />
          {event.isFree && (
            <EventBadge type="free" label={EVENTS_FALLBACKS.free} />
          )}
          {!event.isFree && event.ticketPrice && (
            <EventBadge type="paid" label={event.ticketPrice} />
          )}
          {event.requiresRegistration && (
            <EventBadge type="registration" label={EVENTS_FALLBACKS.registrationRequired} />
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        
        {event.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{event.excerpt}</p>
        )}
        
        <div className="space-y-2 text-sm text-gray-600">
          <div>📅 {formatDate()}</div>
          <div>⏰ {formatTime()}</div>
          {event.location && <div>📍 {event.location}</div>}
        </div>
        
        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            {EVENTS_FALLBACKS.learnMore}
          </button>
          {event.requiresRegistration && variant === 'upcoming' && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              {EVENTS_FALLBACKS.registerNow}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
