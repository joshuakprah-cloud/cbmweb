'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import EventCard from './EventCard';
import EventsCalendar from './EventsCalendar';
import QuickViewModal from './QuickViewModal';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';
import { CalendarIcon, MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

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
  registrationStatus?: string;
  tags?: string[];
}

interface EventsBrowserProps {
  events: Event[];
  pastEvents?: Event[];
}

const CATEGORIES = ['All', 'Service', 'Study', 'Social', 'Outreach', 'Youth', 'Women', 'Men', 'Special'];

const EventsBrowser: React.FC<EventsBrowserProps> = ({ events, pastEvents = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State from URL params or localStorage
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'soonest');
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('eventsViewMode') || 'grid';
    }
    return 'grid';
  });
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [pastPage, setPastPage] = useState(1);
  
  // Modal state
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewEvents, setQuickViewEvents] = useState<Event[]>([]);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (activeCategory !== 'All') params.set('category', activeCategory);
    if (sortOrder !== 'soonest') params.set('sort', sortOrder);
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/events${newUrl}`, { scroll: false });
  }, [searchQuery, activeCategory, sortOrder, router]);

  // Save view mode to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('eventsViewMode', viewMode);
    }
  }, [viewMode]);

  // Handle URL hash for calendar view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#calendar') {
        setViewMode('calendar');
      }
    }
  }, []);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        (event.excerpt && event.excerpt.toLowerCase().includes(query)) ||
        (event.location && event.location.toLowerCase().includes(query)) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      switch (sortOrder) {
        case 'soonest':
          return dateA - dateB;
        case 'latest':
          return dateB - dateA;
        case 'thisWeek': {
          const now = new Date();
          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
          const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
          
          const aInWeek = dateA >= weekStart.getTime() && dateA <= weekEnd.getTime();
          const bInWeek = dateB >= weekStart.getTime() && dateB <= weekEnd.getTime();
          
          if (aInWeek && !bInWeek) return -1;
          if (!aInWeek && bInWeek) return 1;
          return dateA - dateB;
        }
        case 'thisMonth': {
          const now = new Date();
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          
          const aInMonth = dateA >= monthStart.getTime() && dateA <= monthEnd.getTime();
          const bInMonth = dateB >= monthStart.getTime() && dateB <= monthEnd.getTime();
          
          if (aInMonth && !bInMonth) return -1;
          if (!aInMonth && bInMonth) return 1;
          return dateA - dateB;
        }
        default:
          return dateA - dateB;
      }
    });

    return filtered;
  }, [events, searchQuery, activeCategory, sortOrder]);

  // Paginated past events
  const paginatedPastEvents = useMemo(() => {
    return pastEvents.slice(0, pastPage * 9);
  }, [pastEvents, pastPage]);

  // Handle search with debounce
  const handleSearch = useCallback((value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sort: string) => {
    setSortOrder(sort);
  }, []);

  // Handle view mode change
  const handleViewModeChange = useCallback((mode: string) => {
    setViewMode(mode);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveCategory('All');
    setSortOrder('soonest');
  }, []);

  // Handle calendar day click
  const handleDayClick = useCallback((date: Date, dayEvents: Event[]) => {
    setSelectedDay(date);
    setQuickViewEvents(dayEvents);
    setShowQuickView(true);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = searchQuery || activeCategory !== 'All' || sortOrder !== 'soonest';

  return (
    <div>
      {/* 3. FILTER BAR - Sticky */}
      <div 
        ref={filterBarRef}
        className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
        role="search" 
        aria-label="Search events"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Row 1: Category Tabs - horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-[#0B1F3A] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Row 2: Search, Sort, View Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={EVENTS_FALLBACKS.searchEvents}
                defaultValue={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A75E] focus:border-[#C6A75E] outline-none"
              />
            </div>

            <div className="flex gap-2">
              {/* Sort Dropdown */}
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A75E] focus:border-[#C6A75E] outline-none bg-white"
              >
                <option value="soonest">{EVENTS_FALLBACKS.sortOptions.soonest}</option>
                <option value="latest">{EVENTS_FALLBACKS.sortOptions.latest}</option>
                <option value="thisWeek">{EVENTS_FALLBACKS.sortOptions.thisWeek}</option>
                <option value="thisMonth">{EVENTS_FALLBACKS.sortOptions.thisMonth}</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`px-3 py-2 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-[#0B1F3A] text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={EVENTS_FALLBACKS.views.grid}
                  aria-pressed={viewMode === 'grid'}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`px-3 py-2 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-[#0B1F3A] text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={EVENTS_FALLBACKS.views.list}
                  aria-pressed={viewMode === 'list'}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange('calendar')}
                  className={`px-3 py-2 transition-colors ${
                    viewMode === 'calendar' 
                      ? 'bg-[#0B1F3A] text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label="Switch to calendar view"
                  aria-pressed={viewMode === 'calendar'}
                >
                  <CalendarDaysIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Clear Filters & Results Counter */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#C6A75E] hover:text-[#0B1F3A] font-medium transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. EVENTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEvents.length > 0 ? (
          <>
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                  <EventCard
                    key={event._id}
                    event={event}
                    variant="upcoming"
                  />
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredEvents.map(event => (
                  <EventCard
                    key={event._id}
                    event={event}
                    variant="list"
                  />
                ))}
              </div>
            )}

            {viewMode === 'calendar' && (
              <EventsCalendar
                events={filteredEvents}
                onDayClick={handleDayClick}
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-300 text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-4">
              No events found. Check back soon or clear your filters.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[#0B1F3A] text-white rounded-lg hover:bg-[#0B1F3A]/90 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* 5. CALENDAR DISCOVERY STRIP */}
      {viewMode !== 'calendar' && (
        <div className="bg-[#F8F9FB] border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[#0B1F3A] font-medium">
                Prefer to browse by date? Switch to Calendar View.
              </p>
              <button
                onClick={() => handleViewModeChange('calendar')}
                className="inline-flex items-center px-4 py-2 bg-white border border-[#0B1F3A] text-[#0B1F3A] rounded-lg hover:bg-[#0B1F3A] hover:text-white transition-colors"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Open Calendar
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. PAST EVENTS ARCHIVE */}
      {pastEvents.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span className="text-[#C6A75E] text-sm font-semibold tracking-[0.15em] uppercase">
                Past Events
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-2">
                Revisit What God Has Done
              </h2>
              <p className="text-gray-600 mt-2">
                A record of the moments that shaped our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPastEvents.map(event => (
                <EventCard
                  key={event._id}
                  event={event}
                  variant="past"
                />
              ))}
            </div>

            {/* Pagination */}
            {pastEvents.length > paginatedPastEvents.length && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setPastPage(p => p + 1)}
                  className="px-6 py-2 bg-[#0B1F3A] text-white rounded-lg hover:bg-[#0B1F3A]/90 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                href="/events/archive"
                className="text-[#C6A75E] hover:text-[#0B1F3A] font-medium transition-colors"
              >
                View All Past Events →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA SECTION */}
      <section className="bg-[#0B1F3A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don't Miss What's Next
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Stay connected and never miss an event at ThaGospel Church.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-[#0d9488] text-white font-semibold rounded-lg hover:bg-[#0f766e] transition-colors"
            >
              See All Events
            </button>
            <Link
              href="/connect/newsletter"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Subscribe for Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          events={quickViewEvents}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </div>
  );
};

export default EventsBrowser;
