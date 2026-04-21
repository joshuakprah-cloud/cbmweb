'use client';

import React, { useState, useMemo } from 'react';
import PreacherCard from './PreacherCard';

interface Preacher {
  slug: string;
  name: string;
  photo?: any;
  role?: string;
  tagline?: string;
  bio?: string;
  sermonCount?: number;
  lastActive?: string;
  ministries?: string[];
}

interface PreacherGridProps {
  preachers: Preacher[];
}

type SortOption = 'most-sermons' | 'recently-active' | 'alphabetical';

const PreacherGrid: React.FC<PreacherGridProps> = ({ preachers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');
  const [selectedMinistry, setSelectedMinistry] = useState<string | null>(null);

  // Extract unique ministries from all preachers
  const allMinistries = useMemo(() => {
    const ministriesSet = new Set<string>();
    preachers.forEach((p) => {
      p.ministries?.forEach((m) => ministriesSet.add(m));
    });
    return Array.from(ministriesSet).sort();
  }, [preachers]);

  // Filter and sort preachers
  const filteredAndSortedPreachers = useMemo(() => {
    let filtered = preachers.filter((p) => {
      const matchesSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.bio?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMinistry =
        selectedMinistry === null || p.ministries?.includes(selectedMinistry);

      return matchesSearch && matchesMinistry;
    });

    // Sort preachers
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'most-sermons':
          return (b.sermonCount || 0) - (a.sermonCount || 0);
        case 'recently-active':
          return (
            new Date(b.lastActive || 0).getTime() -
            new Date(a.lastActive || 0).getTime()
          );
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [preachers, searchTerm, selectedMinistry, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMinistry(null);
    setSortBy('alphabetical');
  };

  const hasActiveFilters = searchTerm || selectedMinistry;

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div
        role="search"
        aria-label="Filter preachers"
        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search speakers by name, role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Search speakers"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Ministry Filter */}
          {allMinistries.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedMinistry(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedMinistry === null
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedMinistry === null}
              >
                All
              </button>

              {allMinistries.map((ministry) => (
                <button
                  key={ministry}
                  onClick={() => {
                    setSelectedMinistry(ministry);
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'ministry_filter_click', {
                        event_category: 'preacher_page',
                        event_label: ministry,
                      });
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedMinistry === ministry
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={selectedMinistry === ministry}
                >
                  {ministry}
                </button>
              ))}
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              aria-label="Sort speakers"
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="most-sermons">Most Sermons</option>
              <option value="recently-active">Recently Active</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-teal-600 hover:text-teal-700 font-medium transition-colors whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {filteredAndSortedPreachers.length} speaker
          {filteredAndSortedPreachers.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Preachers Grid */}
      {filteredAndSortedPreachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPreachers.map((preacher) => (
            <PreacherCard key={preacher.slug} preacher={preacher} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-5xl mb-4">🎤</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No speakers found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PreacherGrid;
