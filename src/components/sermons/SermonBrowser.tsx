'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SermonCard from './SermonCard';
import { SERMONS_FALLBACKS } from '@/constants/fallbacks';
import { useDebounce } from '@/hooks/useDebounce';

interface SermonBrowserProps {
  sermons: any[];
}

const SermonBrowser: React.FC<SermonBrowserProps> = ({ sermons }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedSeries, setSelectedSeries] = useState(searchParams.get('series') || 'all');
  const [selectedSpeaker, setSelectedSpeaker] = useState(searchParams.get('speaker') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Load view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('sermon-view-mode') as 'grid' | 'list';
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode to localStorage
  useEffect(() => {
    localStorage.setItem('sermon-view-mode', viewMode);
  }, [viewMode]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
    if (selectedSeries !== 'all') params.set('series', selectedSeries);
    if (selectedSpeaker !== 'all') params.set('speaker', selectedSpeaker);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [debouncedSearchTerm, selectedSeries, selectedSpeaker, sortBy, pathname, router]);

  // Extract unique series and speakers from sermons
  const seriesList = useMemo(() => {
    const series = new Set<string>();
    sermons.forEach(sermon => {
      if (sermon.seriesTitle) {
        series.add(sermon.seriesTitle);
      }
    });
    return Array.from(series).sort();
  }, [sermons]);

  const speakersList = useMemo(() => {
    const speakers = new Set<string>();
    sermons.forEach(sermon => {
      if (sermon.speaker?.name) {
        speakers.add(sermon.speaker.name);
      }
    });
    return Array.from(speakers).sort();
  }, [sermons]);

  // Filter and sort sermons
  const filteredAndSortedSermons = useMemo(() => {
    let filtered = sermons.filter(sermon => {
      const matchesSearch = debouncedSearchTerm === '' || 
        sermon.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        sermon.speaker?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (sermon.seriesTitle && sermon.seriesTitle.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        (sermon.scriptureReference && sermon.scriptureReference.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

      const matchesSeries = selectedSeries === 'all' || sermon.seriesTitle === selectedSeries;
      const matchesSpeaker = selectedSpeaker === 'all' || sermon.speaker?.name === selectedSpeaker;

      return matchesSearch && matchesSeries && matchesSpeaker;
    });

    // Sort sermons
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'series':
          return (a.seriesTitle || '').localeCompare(b.seriesTitle || '');
        default:
          return 0;
      }
    });

    return sorted;
  }, [sermons, debouncedSearchTerm, selectedSeries, selectedSpeaker, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSeries('all');
    setSelectedSpeaker('all');
    setSortBy('newest');
    router.replace(pathname);
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div 
        role="search"
        aria-label="Filter sermons"
        className="sticky top-0 z-10 bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder={SERMONS_FALLBACKS.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Search sermons"
            />
          </div>

          {/* Series Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedSeries('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSeries === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={selectedSeries === 'all'}
            >
              {SERMONS_FALLBACKS.allSeries}
            </button>
            
            {seriesList.map(series => (
              <button
                key={series}
                onClick={() => setSelectedSeries(series)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSeries === series
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedSeries === series}
              >
                {series}
              </button>
            ))}
          </div>

          {/* Speaker Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedSpeaker('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSpeaker === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={selectedSpeaker === 'all'}
            >
              All Speakers
            </button>
            
            {speakersList.map(speaker => (
              <button
                key={speaker}
                onClick={() => setSelectedSpeaker(speaker)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSpeaker === speaker
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedSpeaker === speaker}
              >
                {speaker}
              </button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="newest">{SERMONS_FALLBACKS.newestFirst}</option>
              <option value="oldest">{SERMONS_FALLBACKS.oldestFirst}</option>
              <option value="series">{SERMONS_FALLBACKS.bySeries}</option>
            </select>

            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={SERMONS_FALLBACKS.viewGrid}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm0 9h7v7H3v-7zm9-9h7v7h-7V3zm0 9h7v7h-7v-7z" />
              </svg>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={SERMONS_FALLBACKS.viewList}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {filteredAndSortedSermons.length} sermon{filteredAndSortedSermons.length !== 1 ? 's' : ''} found
        </p>
        
        {(debouncedSearchTerm || selectedSeries !== 'all' || selectedSpeaker !== 'all') && (
          <button
            onClick={clearFilters}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            {SERMONS_FALLBACKS.clearFilters}
          </button>
        )}
      </div>

      {/* Sermons Grid/List */}
      {filteredAndSortedSermons.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredAndSortedSermons.map((sermon) => (
            <SermonCard
              key={sermon.slug}
              sermon={sermon}
              variant={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            {SERMONS_FALLBACKS.noResults}
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            {SERMONS_FALLBACKS.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
};

export default SermonBrowser;
