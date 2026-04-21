'use client';

import React, { useState, useMemo } from 'react';
import SeriesCard from './SeriesCard';

interface Series {
  seriesTitle: string;
  seriesSlug: string;
  seriesCoverImage?: any;
  sermonCount: number;
  firstDate?: string;
  lastDate?: string;
  description?: string;
  tags?: string[];
}

interface SeriesGridProps {
  series: Series[];
}

type SortOption = 'newest' | 'oldest' | 'most-sermons';

const SeriesGrid: React.FC<SeriesGridProps> = ({ series }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags from all series
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    series.forEach((s) => {
      s.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [series]);

  // Filter and sort series
  const filteredAndSortedSeries = useMemo(() => {
    let filtered = series.filter((s) => {
      const matchesSearch =
        searchTerm === '' ||
        s.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag = selectedTag === null || s.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });

    // Sort series
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastDate || 0).getTime() - new Date(a.lastDate || 0).getTime();
        case 'oldest':
          return new Date(a.firstDate || 0).getTime() - new Date(b.firstDate || 0).getTime();
        case 'most-sermons':
          return b.sermonCount - a.sermonCount;
        default:
          return 0;
      }
    });

    return sorted;
  }, [series, searchTerm, selectedTag, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag(null);
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedTag;

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div
        role="search"
        aria-label="Filter series"
        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Search series"
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

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedTag === null}
              >
                All Topics
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'topic_filter_click', {
                        event_category: 'series_page',
                        event_label: tag,
                      });
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={selectedTag === tag}
                >
                  {tag}
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
              aria-label="Sort series"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-sermons">Most Sermons</option>
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
          {filteredAndSortedSeries.length} series
          {filteredAndSortedSeries.length !== 1 ? '' : ''} found
        </p>
      </div>

      {/* Series Grid */}
      {filteredAndSortedSeries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedSeries.map((seriesItem) => (
            <SeriesCard key={seriesItem.seriesSlug} series={seriesItem} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No series found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We&apos;re preparing new sermon series. Meanwhile, explore our other content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/messages"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Browse All Sermons
            </a>
            <a
              href="/messages/archive"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Archive
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriesGrid;
