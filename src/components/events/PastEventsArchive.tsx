'use client';

import { useState } from 'react';
import EventCard from './EventCard';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';
import { ChevronDownIcon, ChevronUpIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

interface PastEventsArchiveProps {
  pastEvents: {
    _id: string;
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
  }[];
}

const PastEventsArchive: React.FC<PastEventsArchiveProps> = ({ pastEvents }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (pastEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50" aria-labelledby="past-events-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ArchiveBoxIcon className="w-6 h-6 text-gray-500" />
          <h2 
            id="past-events-heading" 
            className="text-2xl md:text-3xl font-bold text-gray-900"
          >
            {EVENTS_FALLBACKS.pastEventsArchive}
          </h2>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors mb-6"
          aria-expanded={isExpanded}
          aria-controls="past-events-content"
        >
          <span className="text-gray-700 font-medium">
            {isExpanded 
              ? EVENTS_FALLBACKS.hideArchive 
              : `${EVENTS_FALLBACKS.viewArchive} (${pastEvents.length} ${pastEvents.length === 1 ? 'event' : 'events'})`
            }
          </span>
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {/* Past Events Grid - Collapsible */}
        {isExpanded && (
          <div 
            id="past-events-content"
            className="animate-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.slice(0, 12).map((event) => (
                <EventCard
                  key={event._id || event.slug}
                  event={event}
                  variant="past"
                />
              ))}
            </div>

            {/* Load More / Show All button if there are more than 12 events */}
            {pastEvents.length > 12 && (
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Showing 12 of {pastEvents.length} past events
                </p>
                <button
                  className="mt-2 text-teal-600 hover:text-teal-700 font-medium"
                  onClick={() => {
                    // In a real app, this would load more or navigate to a dedicated archive page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  View all past events on archive page →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PastEventsArchive;

