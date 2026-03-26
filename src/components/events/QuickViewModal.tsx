'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';

interface Event {
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
}

interface QuickViewModalProps {
  events: Event[];
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ events, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={EVENTS_FALLBACKS.quickView.title}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {EVENTS_FALLBACKS.quickView.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={EVENTS_FALLBACKS.quickView.close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event._id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>📅 {formatDate(event.date)}</div>
                        <div>⏰ {formatTime(event.date)}</div>
                        {event.location && <div>📍 {event.location}</div>}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-2">
                        {event.category}
                      </span>
                      <div>
                        {event.isFree ? (
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            {EVENTS_FALLBACKS.free}
                          </span>
                        ) : event.ticketPrice && (
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                            {event.ticketPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {event.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {event.excerpt}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <Link
                      href={`/events/${event.slug}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      {EVENTS_FALLBACKS.viewEvent}
                    </Link>
                    {event.requiresRegistration && (
                      <Link
                        href={`/events/${event.slug}#register`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        {EVENTS_FALLBACKS.registerNow}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Events
              </h3>
              <p className="text-gray-600">
                {EVENTS_FALLBACKS.calendar.noEventsToday}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
