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
    registrationStatus?: string;
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
        className="group block bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
        aria-label={`${event.title}, ${formatDate()}, ${event.category}`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Date Box */}
          <div className="flex-shrink-0 sm:w-28 bg-[#0B1F3A] text-white p-4 flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold">{day}</div>
            <div className="text-sm uppercase tracking-wide">{month}</div>
            <div className="text-xs opacity-75">{year}</div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
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
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#C6A75E] transition-colors">
              {event.title}
            </h3>
            
            {event.excerpt && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{event.excerpt}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime()}
              </span>
              {event.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </span>
              )}
            </div>
          </div>
          
          {/* Arrow */}
          <div className="hidden sm:flex flex-shrink-0 w-16 items-center justify-center border-l border-gray-100">
            <svg className="w-6 h-6 text-gray-300 group-hover:text-[#C6A75E] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  const isPast = variant === 'past';
  const isRelated = variant === 'related';

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group block bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden relative ${
        isPast ? 'opacity-90' : ''
      }`}
      aria-label={`${event.title}, ${formatDate()}, ${event.category}`}
    >
      {/* Hover accent border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6A75E] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      
      <div className="relative h-48 overflow-hidden">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
              isPast ? 'grayscale-[0.5]' : ''
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">📅</span>
          </div>
        )}
        
        {/* Past event overlay */}
        {isPast && (
          <div className="absolute inset-0 bg-[#0B1F3A]/20" />
        )}
        
        {/* Date Badge - Navy with gold accent */}
        <div className="absolute top-4 left-4 bg-[#0B1F3A] rounded-lg shadow-lg p-3 text-center min-w-[60px]">
          <div className="text-xl font-bold text-white">{day}</div>
          <div className="text-xs text-[#C6A75E] uppercase font-medium">{month}</div>
          {isPast && (
            <div className="text-[10px] text-white/60 mt-0.5">{year}</div>
          )}
        </div>

        {/* Past badge */}
        {isPast && (
          <div className="absolute top-4 right-4 px-2 py-1 bg-gray-800/80 text-white text-xs font-medium rounded">
            Past
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <EventBadge type="category" label={event.category} />
          {!isPast && (
            <>
              {event.isFree ? (
                <EventBadge type="free" label={EVENTS_FALLBACKS.free} />
              ) : event.ticketPrice ? (
                <EventBadge type="paid" label={`$${event.ticketPrice}`} />
              ) : null}
              {event.requiresRegistration && (
                <EventBadge 
                  type="registration" 
                  label={event.registrationStatus === 'sold_out' ? 'Sold Out' : 
                         event.registrationStatus === 'limited' ? 'Limited' : 
                         'Open'}
                />
              )}
            </>
          )}
        </div>
        
        <h3 className={`text-lg font-bold mb-2 group-hover:text-[#C6A75E] transition-colors ${
          isPast ? 'text-gray-600' : 'text-[#0B1F3A]'
        }`}>
          {event.title}
        </h3>
        
        {event.excerpt && (
          <p className={`text-sm mb-4 line-clamp-2 ${
            isPast ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {event.excerpt}
          </p>
        )}
        
        <div className={`flex items-center gap-4 text-sm ${
          isPast ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime()}
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
