'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EventCard from './EventCard';
import EventsCalendar from './EventsCalendar';
import QuickViewModal from './QuickViewModal';
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

interface EventsBrowserProps {
  events: Event[];
}

const EventsBrowser: React.FC<EventsBrowserProps> = ({ events }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Debug: Log events data
  console.log('EventsBrowser received events:', events);
  console.log('Events count:', events?.length || 0);
  
  // State from URL params or localStorage
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'soonest');
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('eventsViewMode') || 'grid';
    }
    return 'grid';
  });
  
  // Modal state
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewEvents, setQuickViewEvents] = useState<Event[]>([]);

  // Debounced search
  const debouncedSearchQuery = useMemo(() => searchQuery, [searchQuery]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get unique categories from events
  const categories = useMemo(() => {
    const cats = Array.from(new Set(events.map(event => event.category)));
    return cats.sort();
  }, [events]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (activeCategory !== 'all') params.set('category', activeCategory);
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
    let filtered = events;

    // Search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        (event.excerpt && event.excerpt.toLowerCase().includes(query)) ||
        (event.location && event.location.toLowerCase().includes(query)) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
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
  }, [events, debouncedSearchQuery, activeCategory, sortOrder]);

  // Handle search with debounce
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    
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
    setActiveCategory('all');
    setSortOrder('soonest');
  }, []);

  // Handle calendar day click
  const handleDayClick = useCallback((date: Date, dayEvents: Event[]) => {
    setSelectedDay(date);
    setQuickViewEvents(dayEvents);
    setShowQuickView(true);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = searchQuery || activeCategory !== 'all' || sortOrder !== 'soonest';

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4" role="search" aria-label="Search events">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder={EVENTS_FALLBACKS.searchEvents}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => handleViewModeChange('grid')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={EVENTS_FALLBACKS.views.grid}
              aria-pressed={viewMode === 'grid'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => handleViewModeChange('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={EVENTS_FALLBACKS.views.list}
              aria-pressed={viewMode === 'list'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => handleViewModeChange('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Switch to calendar view"
              aria-pressed={viewMode === 'calendar'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category and Sort Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-pressed={activeCategory === 'all'}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="soonest">{EVENTS_FALLBACKS.sortOptions.soonest}</option>
            <option value="latest">{EVENTS_FALLBACKS.sortOptions.latest}</option>
            <option value="thisWeek">{EVENTS_FALLBACKS.sortOptions.thisWeek}</option>
            <option value="thisMonth">{EVENTS_FALLBACKS.sortOptions.thisMonth}</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {EVENTS_FALLBACKS.clearFilters}
            </button>
          )}
        </div>

        {/* Event Counter */}
        <div className="text-sm text-gray-600">
          {EVENTS_FALLBACKS.showingEvents.replace('{count}', filteredEvents.length.toString())}
        </div>
      </div>

      {/* Events Display */}
      {filteredEvents.length > 0 ? (
        <>
          {viewMode === 'grid' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Events Found
          </h3>
          <p className="text-gray-600 mb-4">
            {EVENTS_FALLBACKS.noResults}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {EVENTS_FALLBACKS.clearFilters}
            </button>
          )}
        </div>
      )}

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
