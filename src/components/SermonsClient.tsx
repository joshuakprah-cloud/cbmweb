'use client';

import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, PlayCircleIcon, Squares2X2Icon, ListBulletIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Navbar from './navbar/Navbar';
import Footer from './Footer';

interface Sermon {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  description?: string;
  scripture?: string;
  duration?: string;
  thumbnail?: any;
  videoUrl?: string;
  series?: {
    _id: string;
    title: string;
  };
}

interface Series {
  _id: string;
  title: string;
  description?: string;
  sermonCount?: number;
  coverImage?: any;
}

interface Speaker {
  _id: string;
  name: string;
  role?: string;
  photo?: any;
  sermonCount?: number;
}

interface SermonsClientProps {
  initialSermons: Sermon[];
}

export default function SermonsClient({ initialSermons }: SermonsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons || []);
  const [series, setSeries] = useState<Series[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  // Set initial data
  useEffect(() => {
    setSermons(initialSermons || []);
    // Generate fallback series from sermons
    const seriesMap = new Map<string, Series>();
    (initialSermons || []).forEach(sermon => {
      if (sermon.series && !seriesMap.has(sermon.series._id)) {
        seriesMap.set(sermon.series._id, {
          _id: sermon.series._id,
          title: sermon.series.title,
          sermonCount: 0
        });
      }
    });
    
    // Count sermons per series
    (initialSermons || []).forEach(sermon => {
      if (sermon.series) {
        const seriesItem = seriesMap.get(sermon.series._id);
        if (seriesItem) {
          seriesItem.sermonCount = (seriesItem.sermonCount || 0) + 1;
        }
      }
    });

    setSeries(Array.from(seriesMap.values()));
    
    // Generate fallback speakers from sermons
    const speakerMap = new Map<string, Speaker>();
    (initialSermons || []).forEach(sermon => {
      if (!speakerMap.has(sermon.speaker)) {
        speakerMap.set(sermon.speaker, {
          _id: sermon.speaker.toLowerCase().replace(/\s+/g, '-'),
          name: sermon.speaker,
          sermonCount: 0
        });
      }
    });
    
    // Count sermons per speaker
    (initialSermons || []).forEach(sermon => {
      const speakerItem = speakerMap.get(sermon.speaker);
      if (speakerItem) {
        speakerItem.sermonCount = (speakerItem.sermonCount || 0) + 1;
      }
    });

    setSpeakers(Array.from(speakerMap.values()));
  }, [initialSermons]);

  // Filter and sort logic
  const filteredSermons = useCallback(() => {
    let filtered = sermons;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(sermon =>
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sermon.series?.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sermon.scripture?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Series filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(sermon => sermon.series?._id === activeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return (b.title.length || 0) - (a.title.length || 0); // Fallback popularity metric
        default:
          return 0;
      }
    });

    return filtered;
  }, [sermons, searchQuery, activeFilter, sortOrder]);

  const latestSermon = sermons[0];

  return (
    <div className="min-h-screen bg-[#f0f0ee]">
      <Navbar />
      
      {/* 1. PAGE HERO — SPLIT LAYOUT */}
      <section className="flex flex-col lg:flex-row pt-[72px]">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-2/5 bg-[#f0f0ee] p-16 lg:p-20 flex flex-col justify-center h-screen lg:h-auto overflow-visible">
          {/* Large page label */}
          <h1 
            className="text-black font-bold mb-8 text-center lg:text-left"
            style={{ 
              fontSize: '65px',
              lineHeight: '1',
              whiteSpace: 'nowrap',
              overflow: 'visible'
            }}
          >
            SERMONS
          </h1>
          
          {/* Tagline */}
          <h2 
            className="text-black font-serif italic mb-8 text-center lg:text-left"
            style={{ 
              fontSize: '40px',
              lineHeight: '1.1',
              maxWidth: '420px'
            }}
          >
            Every Word. Every Week.
          </h2>
          
          {/* Intro copy */}
          <p 
            className="text-gray-700 text-center lg:text-left"
            style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              maxWidth: '420px'
            }}
          >
            Dive into our library of messages. Search by topic, browse by series, or pick up where you left off.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-3/5 p-16 lg:p-20 flex items-center justify-center">
          <div 
            style={{
              background: '#2a2a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: '600px',
              borderRadius: '20px',
              color: '#888',
              fontSize: '14px',
              fontFamily: 'sans-serif',
            }}
          >
            Sermons Hero Image — 860 x 680px
          </div>
        </div>
      </section>

      {/* 2. FEATURED LATEST SERMON */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT — VIDEO PLAYER */}
            <div>
              <div 
                style={{
                  background: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '16px',
                  color: '#888',
                  fontSize: '14px',
                }}
              >
                <PlayCircleIcon style={{
                  width: '64px',
                  height: '64px',
                  color: '#14b8a6',
                  opacity: 0.7,
                }} />
              </div>
            </div>

            {/* RIGHT — SERMON DETAILS */}
            <div className="text-white">
              {/* Small label */}
              <div 
                className="text-teal-500 uppercase tracking-wide mb-4"
                style={{ 
                  fontSize: '12px',
                  letterSpacing: '0.15em'
                }}
              >
                LATEST MESSAGE
              </div>
              
              {/* Sermon title */}
              <h3 
                className="text-white font-bold mb-3"
                style={{ 
                  fontSize: '36px',
                  lineHeight: '1.2'
                }}
              >
                {latestSermon?.title || 'Latest Sermon'}
              </h3>
              
              {/* Series name */}
              <div 
                className="text-[#aaaaaa] italic mb-3"
                style={{ 
                  fontSize: '16px'
                }}
              >
                Part of: {latestSermon?.series?.title || 'Stand-alone Message'}
              </div>
              
              {/* Speaker name + date */}
              <div 
                className="text-[#888] mb-4"
                style={{ 
                  fontSize: '14px'
                }}
              >
                {latestSermon?.speaker || 'Guest Speaker'} · {latestSermon ? new Date(latestSermon.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                }) : 'Recent Date'}
              </div>
              
              {/* Short description */}
              <p 
                className="text-[#cccccc] mb-6 leading-relaxed"
                style={{ 
                  fontSize: '15px',
                  lineHeight: '1.7',
                  maxWidth: '380px'
                }}
              >
                {latestSermon?.description || 'Join us for this powerful message that will transform your faith and deepen your understanding of God\'s word.'}
              </p>
              
              {/* Two pill buttons */}
              <div className="flex gap-3">
                <button 
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
                  style={{ 
                    fontSize: '13px',
                    letterSpacing: '0.05em'
                  }}
                >
                  WATCH NOW
                </button>
                <button 
                  className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
                  style={{ 
                    fontSize: '13px',
                    letterSpacing: '0.05em'
                  }}
                >
                  SHARE
                </button>
              </div>
              
              {/* Scripture reference */}
              {latestSermon?.scripture && (
                <div 
                  className="text-[#888] italic mt-4"
                  style={{ 
                    fontSize: '14px'
                  }}
                >
                  {latestSermon.scripture}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERIES FILTER BAR */}
      <div 
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 40,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 40px',
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1280px',
            margin: '0 auto',
            gap: '16px',
          }}
        >
          {/* LEFT — SEARCH INPUT */}
          <div style={{ 
            position: 'relative', 
            flexShrink: 0,
            width: '260px',
          }}>
            <MagnifyingGlassIcon style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#9ca3af',
            }} />
            <input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '50px',
                padding: '10px 16px 10px 40px',
                fontSize: '13px',
                color: '#1a1a1a',
                outline: 'none',
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => 
                (e.target as HTMLInputElement).style.borderColor = '#14b8a6'
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => 
                (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'
              }
            />
          </div>

          {/* CENTER — SERIES TABS */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                background: activeFilter === 'all' ? '#14b8a6' : 'transparent',
                border: '1px solid #e5e7eb',
                color: activeFilter === 'all' ? '#ffffff' : '#555555',
                borderRadius: '50px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: activeFilter === 'all' ? 'bold' : 'normal',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (activeFilter !== 'all') {
                  (e.target as HTMLButtonElement).style.borderColor = '#14b8a6';
                  (e.target as HTMLButtonElement).style.color = '#14b8a6';
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (activeFilter !== 'all') {
                  (e.target as HTMLButtonElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLButtonElement).style.color = '#555555';
                }
              }}
            >
              All Sermons
            </button>
            {series.map((s) => (
              <button
                key={s._id}
                onClick={() => setActiveFilter(s._id)}
                style={{
                  background: activeFilter === s._id ? '#14b8a6' : 'transparent',
                  border: '1px solid #e5e7eb',
                  color: activeFilter === s._id ? '#ffffff' : '#555555',
                  borderRadius: '50px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: activeFilter === s._id ? 'bold' : 'normal',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (activeFilter !== s._id) {
                    (e.target as HTMLButtonElement).style.borderColor = '#14b8a6';
                    (e.target as HTMLButtonElement).style.color = '#14b8a6';
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (activeFilter !== s._id) {
                    (e.target as HTMLButtonElement).style.borderColor = '#e5e7eb';
                    (e.target as HTMLButtonElement).style.color = '#555555';
                  }
                }}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* RIGHT — SORT + VIEW TOGGLE */}
          <div style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {/* Sort dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#666666' }}>
                Sort by:
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="series">By Series</option>
              </select>
            </div>

            {/* View toggle */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: viewMode === 'grid' ? '#14b8a6' : '#aaaaaa',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.color = viewMode === 'grid' ? '#14b8a6' : '#14b8a6';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.color = viewMode === 'grid' ? '#14b8a6' : '#aaaaaa';
                }}
              >
                <Squares2X2Icon style={{ width: '20px', height: '20px' }} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: viewMode === 'list' ? '#14b8a6' : '#aaaaaa',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.color = viewMode === 'list' ? '#14b8a6' : '#14b8a6';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.color = viewMode === 'list' ? '#14b8a6' : '#aaaaaa';
                }}
              >
                <ListBulletIcon style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SERMONS GRID / LIST */}
      <section className="bg-[#f0f0ee] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="mb-10">
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Browse Messages
            </span>
            <div className="flex items-center gap-4 mt-2">
              <h2 
                className="text-black font-bold"
                style={{ fontSize: '32px' }}
              >
                {activeFilter === 'all' ? 'All Sermons' : series.find(s => s._id === activeFilter)?.title}
              </h2>
              <span 
                className="text-gray-600"
                style={{ fontSize: '14px' }}
              >
                ({filteredSermons().length} messages)
              </span>
            </div>
          </div>

          {/* GRID VIEW (default) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSermons().map((sermon) => (
                <div
                  key={sermon._id}
                  className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Top: thumbnail image */}
                  <div 
                    className="relative"
                    style={{
                      background: '#d1d5db',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '12px 12px 0 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '13px',
                    }}
                  >
                    {/* TODO: Replace with sermon thumbnail from Sanity CMS — 400 x 225px */}
                    Sermon Thumbnail — 400 x 225px
                    {/* Hover play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-teal-600/80 rounded-full p-3">
                        <PlayCircleIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    {/* Series badge */}
                    <div 
                      className="inline-block bg-teal-600 text-white text-[11px] uppercase font-medium rounded-[50px] px-2.5 py-1 mb-3"
                      style={{ letterSpacing: '0.05em' }}
                    >
                      {sermon.series?.title || 'Stand-alone'}
                    </div>

                    {/* Sermon title */}
                    <h3 
                      className="text-black font-bold mb-3"
                      style={{ 
                        fontSize: '17px',
                        lineHeight: '1.3'
                      }}
                    >
                      {sermon.title}
                    </h3>

                    {/* Speaker + date row */}
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="bg-gray-400 rounded-full flex items-center justify-center text-white text-[12px] font-medium"
                        style={{
                          width: '32px',
                          height: '32px',
                          fontSize: '12px'
                        }}
                      >
                        {sermon.speaker.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span 
                        className="text-[#555] text-[13px] font-medium"
                      >
                        {sermon.speaker}
                      </span>
                      <span className="text-[#888] text-[13px]">·</span>
                      <span 
                        className="text-[#888] text-[13px]"
                      >
                        {new Date(sermon.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>

                    {/* Scripture reference */}
                    {sermon.scripture && (
                      <div 
                        className="text-[#888] italic mb-4"
                        style={{ 
                          fontSize: '13px'
                        }}
                      >
                        {sermon.scripture}
                      </div>
                    )}

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-auto">
                      {/* Duration pill */}
                      <div 
                        className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full"
                      >
                        <ClockIcon className="w-3 h-3 text-gray-600" />
                        <span 
                          className="text-gray-600 text-[12px]"
                        >
                          {sermon.duration || '45 min'}
                        </span>
                      </div>

                      {/* WATCH pill button */}
                      <button 
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-[50px] transition-all duration-200 text-[12px]"
                        style={{ letterSpacing: '0.05em' }}
                      >
                        WATCH
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LIST VIEW (toggle) */}
          {viewMode === 'list' && (
            <div className="space-y-0">
              {filteredSermons().map((sermon) => (
                <div
                  key={sermon._id}
                  className="bg-white border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row p-4 gap-4">
                    {/* Left: thumbnail */}
                    <div 
                      className="flex-shrink-0"
                      style={{
                        background: '#d1d5db',
                        width: '160px',
                        height: '90px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af',
                        fontSize: '13px',
                      }}
                    >
                      {/* TODO: Replace with sermon thumbnail from Sanity CMS — 160 x 90px */}
                      Sermon Thumbnail — 160 x 90px
                    </div>

                    {/* Right: sermon details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 
                          className="text-black font-bold text-[17px]"
                          style={{ lineHeight: '1.3' }}
                        >
                          {sermon.title}
                        </h3>
                        <button 
                          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-[50px] transition-all duration-200 text-[12px] flex-shrink-0"
                          style={{ letterSpacing: '0.05em' }}
                        >
                          WATCH
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-600">
                        <span>{sermon.speaker}</span>
                        <span>·</span>
                        <span>{sermon.series?.title || 'Stand-alone'}</span>
                        <span>·</span>
                        <span>{sermon.scripture}</span>
                        <span>·</span>
                        <span>{sermon.duration || '45 min'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. SERIES SHOWCASE */}
      <section className="bg-[#f0f0ee] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="text-center mb-12">
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Explore by Series
            </span>
            <h2 
              className="text-black font-bold mt-2 mb-4"
              style={{ fontSize: '32px' }}
            >
              Message Series
            </h2>
            <p 
              className="text-gray-600 text-[16px]"
              style={{ maxWidth: '480px', margin: '0 auto' }}
            >
              Each series is a journey. Pick one and go deep.
            </p>
          </div>

          {/* SERIES CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s) => (
              <div
                key={s._id}
                className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Series cover image */}
                <div 
                  style={{
                    background: '#374151',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    fontSize: '13px',
                  }}
                >
                  {/* TODO: Replace with series cover art from Sanity CMS — 400 x 225px */}
                  Series Cover — 400 x 225px
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 
                    className="text-black font-bold mb-2"
                    style={{ 
                      fontSize: '18px',
                      lineHeight: '1.3'
                    }}
                  >
                    {s.title}
                  </h3>
                  
                  <div className="space-y-1 mb-4">
                    <p 
                      className="text-[#888] text-[13px]"
                    >
                      {s.sermonCount} messages
                    </p>
                    <p 
                      className="text-[#888] text-[13px]"
                    >
                      {/* TODO: Add date range from Sanity CMS */}
                      Jan 2025 – Mar 2025
                    </p>
                  </div>

                  <button 
                    className="w-full border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
                    style={{ 
                      fontSize: '13px',
                      letterSpacing: '0.05em'
                    }}
                  >
                    VIEW SERIES
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPEAKERS SECTION */}
      <section className="bg-[#e8e6df] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="text-center mb-12">
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Voices
            </span>
            <h2 
              className="text-black font-bold mt-2 mb-4"
              style={{ fontSize: '32px' }}
            >
              Our Speakers
            </h2>
          </div>

          {/* SPEAKER CARDS */}
          <div className="flex flex-wrap justify-center gap-8">
            {speakers.map((speaker) => (
              <div
                key={speaker._id}
                className="text-center"
              >
                <div 
                  className="bg-gray-400 rounded-full flex items-center justify-center text-white mb-3 mx-auto"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    fontSize: '12px',
                  }}
                >
                  {/* TODO: Replace with speaker photo from Sanity CMS — 80 x 80px */}
                  80x80
                </div>
                
                <h3 
                  className="text-black font-bold mb-1"
                  style={{ 
                    fontSize: '15px',
                    lineHeight: '1.3'
                  }}
                >
                  {speaker.name}
                </h3>
                
                <p 
                  className="text-gray-600 mb-2"
                  style={{ 
                    fontSize: '13px'
                  }}
                >
                  {speaker.role || 'Speaker'}
                </p>
                
                <p 
                  className="text-teal-600 font-medium"
                  style={{ 
                    fontSize: '12px'
                  }}
                >
                  {speaker.sermonCount} messages
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PAGINATION / LOAD MORE */}
      <section className="bg-[#f0f0ee] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button 
            className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3.5 px-10 rounded-[50px] transition-all duration-200 mb-4"
            style={{ 
              fontSize: '13px',
              letterSpacing: '0.05em'
            }}
          >
            LOAD MORE SERMONS
          </button>
          
          <p 
            className="text-gray-600 text-[13px]"
          >
            {/* TODO: Implement real pagination with Sanity CMS offset/limit queries */}
            Showing 12 of {filteredSermons().length} sermons
          </p>
        </div>
      </section>

      {/* 8. NEWSLETTER / STAY UPDATED CTA */}
      <section className="bg-[#2a2a2a] py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span 
            className="text-[#aaaaaa] italic"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Georgia, serif'
            }}
          >
            Never Miss a Message
          </span>
          <h2 
            className="text-white font-bold mt-2 mb-6"
            style={{ 
              fontSize: '40px',
              lineHeight: '1.1'
            }}
          >
            Get New Sermons Delivered to Your Inbox.
          </h2>
          <p 
            className="text-[#888] text-[16px] mb-8"
            style={{ 
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}
          >
            Every week, a fresh word. Subscribe and stay connected.
          </p>
          
          {/* Single-row pill newsletter input */}
          <div className="flex justify-center items-center gap-2 max-w-[480px] mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-[#2a2a2a] text-white placeholder:text-gray-400 border border-gray-600 rounded-l-[50px] py-3.5 px-6 text-[15px] focus:outline-none focus:border-teal-500"
              style={{ 
                borderRadius: '50px 0 0 50px',
                borderRight: 'none'
              }}
            />
            <button 
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-r-[50px] transition-all duration-200"
              style={{ 
                fontSize: '13px',
                letterSpacing: '0.05em',
                borderRadius: '0 50px 50px 0'
              }}
            >
              SUBSCRIBE
            </button>
          </div>
          
          {/* TODO: Connect to real newsletter API or email service */}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
