'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  Squares2X2Icon, 
  RectangleGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline';
import Navbar from '../navbar/Navbar';
import { Footer } from '../footer/Footer';

interface Photo {
  _id: string;
  title: string;
  image?: any;
  event: string;
  date: string;
  album?: {
    _id: string;
    title: string;
    slug: string;
  };
  caption?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}

interface Album {
  _id: string;
  title: string;
  slug: string;
  coverImage?: any;
  photoCount: number;
}

interface GalleryClientProps {
  initialPhotos: Photo[];
  initialAlbums: Album[];
}

export default function GalleryClient({ initialPhotos, initialAlbums }: GalleryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAlbum, setActiveAlbum] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(24);
  const [photos, setPhotos] = useState(initialPhotos);
  const [albums, setAlbums] = useState(initialAlbums);

  // Filter photos based on search, album, and year
  const filteredPhotos = useCallback(() => {
    let filtered = photos;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.album?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.caption?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Album filter
    if (activeAlbum !== 'all') {
      filtered = filtered.filter(photo => photo.album?._id === activeAlbum);
    }

    // Year filter
    if (activeYear !== 'all') {
      filtered = filtered.filter(photo => {
        const photoYear = new Date(photo.date).getFullYear().toString();
        return photoYear === activeYear;
      });
    }

    return filtered;
  }, [photos, searchQuery, activeAlbum, activeYear]);

  // Lightbox navigation
  const nextPhoto = useCallback(() => {
    const filtered = filteredPhotos();
    if (lightboxIndex < filtered.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
      setLightboxPhoto(filtered[lightboxIndex + 1]);
    }
  }, [lightboxIndex, filteredPhotos]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
      setLightboxPhoto(filteredPhotos()[lightboxIndex - 1]);
    }
  }, [lightboxIndex, filteredPhotos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') setLightboxPhoto(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxPhoto, lightboxIndex, nextPhoto, prevPhoto]);

  // Load more photos
  const loadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  // Share photo
  const sharePhoto = (photo: Photo) => {
    if (navigator.share) {
      navigator.share({
        title: photo.title || 'Gallery Photo',
        text: `Check out this photo from ${photo.event}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Download photo
  const downloadPhoto = (photo: Photo) => {
    if (photo.imageUrl) {
      const link = document.createElement('a');
      link.href = photo.imageUrl;
      link.download = photo.title || 'photo.jpg';
      link.click();
    }
  };

  const displayedPhotos = filteredPhotos().slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#f0f0ee]">
      <Navbar />
      
      {/* 1. PAGE HERO — SPLIT LAYOUT */}
      <section className="flex flex-col lg:flex-row pt-[72px]">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-2/5 bg-[#f0f0ee] p-16 lg:p-20 flex flex-col justify-center">
          {/* Large page label */}
          <h1 
            className="text-black font-bold mb-8 text-center lg:text-left"
            style={{ 
              fontSize: '65px',
              lineHeight: '1',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            GALLERY
          </h1>
          
          {/* Tagline */}
          <h2 
            className="text-black font-serif italic mb-8 text-center lg:text-left"
            style={{ 
              fontSize: '60px',
              lineHeight: '1.1',
              maxWidth: '420px'
            }}
          >
            Moments That Matter.
          </h2>
          
          {/* Intro copy */}
          <p 
            className="text-gray-700 mb-8 text-center lg:text-left"
            style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              maxWidth: '420px'
            }}
          >
            A visual journey through our community. Every photo tells a story of faith in action.
          </p>
          
          {/* Two pill buttons */}
          <div className="flex gap-3 justify-center lg:justify-start">
            <button 
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
              onClick={() => {
                const element = document.getElementById('photo-grid');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              VIEW ALL PHOTOS
            </button>
            <button 
              className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
              onClick={() => {
                const element = document.getElementById('videos-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              VIEW VIDEOS
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-3/5 p-16 lg:p-20 flex items-center justify-center">
          <div style={{
            background: '#2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            aspectRatio: '4/3',
            borderRadius: '20px',
            color: '#888',
            fontSize: '14px',
          }}>
            Gallery Hero Image — 860 x 645px
          </div>
          {/* TODO: Replace with featured gallery photo — 860 x 645px */}
        </div>
      </section>

      {/* 2. FILTER BAR */}
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
              placeholder="Search photos, events..."
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

          {/* CENTER — EVENT/ALBUM TABS */}
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
              onClick={() => setActiveAlbum('all')}
              style={{
                background: activeAlbum === 'all' ? '#14b8a6' : 'transparent',
                border: '1px solid #e5e7eb',
                color: activeAlbum === 'all' ? '#ffffff' : '#555555',
                borderRadius: '50px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: activeAlbum === 'all' ? 'bold' : 'normal',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (activeAlbum !== 'all') {
                  (e.target as HTMLButtonElement).style.borderColor = '#14b8a6';
                  (e.target as HTMLButtonElement).style.color = '#14b8a6';
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (activeAlbum !== 'all') {
                  (e.target as HTMLButtonElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLButtonElement).style.color = '#555555';
                }
              }}
            >
              All
            </button>
            {albums.map((album) => (
              <button
                key={album._id}
                onClick={() => setActiveAlbum(album._id)}
                style={{
                  background: activeAlbum === album._id ? '#14b8a6' : 'transparent',
                  border: '1px solid #e5e7eb',
                  color: activeAlbum === album._id ? '#ffffff' : '#555555',
                  borderRadius: '50px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: activeAlbum === album._id ? 'bold' : 'normal',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (activeAlbum !== album._id) {
                    (e.target as HTMLButtonElement).style.borderColor = '#14b8a6';
                    (e.target as HTMLButtonElement).style.color = '#14b8a6';
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (activeAlbum !== album._id) {
                    (e.target as HTMLButtonElement).style.borderColor = '#e5e7eb';
                    (e.target as HTMLButtonElement).style.color = '#555555';
                  }
                }}
              >
                {album.title}
              </button>
            ))}
          </div>

          {/* RIGHT — FILTER CONTROLS */}
          <div style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {/* Year selector */}
            <select
              value={activeYear}
              onChange={(e) => setActiveYear(e.target.value)}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                backgroundColor: '#ffffff',
                outline: 'none',
              }}
            >
              <option value="all">All Time</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>

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
                onClick={() => setViewMode('masonry')}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: viewMode === 'masonry' ? '#14b8a6' : '#aaaaaa',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.color = viewMode === 'masonry' ? '#14b8a6' : '#14b8a6';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.color = viewMode === 'masonry' ? '#14b8a6' : '#aaaaaa';
                }}
              >
                <RectangleGroupIcon style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ALBUMS SECTION */}
      <section className="bg-[#f0f0ee] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <span 
                className="text-gray-600 italic"
                style={{ 
                  fontSize: '18px',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Browse by Album
              </span>
              <h2 
                className="text-black font-bold mt-2"
                style={{ fontSize: '32px' }}
              >
                Photo Albums
              </h2>
            </div>
            <button 
              className="text-teal-600 hover:text-teal-700 font-medium text-[14px]"
              style={{ fontSize: '14px' }}
            >
              View All →
            </button>
          </div>

          {/* ALBUM CARDS */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '8px 0',
          }}>
            {albums.map((album) => (
              <div
                key={album._id}
                onClick={() => setActiveAlbum(album._id)}
                style={{
                  width: '220px',
                  flexShrink: 0,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Album cover */}
                <div style={{
                  background: '#9ca3af',
                  width: '220px',
                  height: '220px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '13px',
                  position: 'relative',
                }}>
                  Album Cover — 220 x 220px
                </div>
                {/* TODO: Replace with album cover from Sanity CMS */}

                {/* Dark gradient overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '80px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  borderRadius: '0 0 12px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '12px',
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginBottom: '4px',
                  }}>
                    {album.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#cccccc',
                  }}>
                    {album.photoCount} photos
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAIN PHOTO GRID */}
      <section id="photo-grid" className="bg-[#f0f0ee] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="mb-8">
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Our Moments
            </span>
            <div className="flex items-center gap-4 mt-2">
              <h2 
                className="text-black font-bold"
                style={{ fontSize: '32px' }}
              >
                {activeAlbum === 'all' ? 'All Photos' : albums.find(a => a._id === activeAlbum)?.title}
              </h2>
              <span 
                className="text-gray-600"
                style={{ fontSize: '14px' }}
              >
                ({filteredPhotos().length} photos)
              </span>
            </div>
          </div>

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayedPhotos.map((photo, index) => (
                <div
                  key={photo._id}
                  onClick={() => {
                    setLightboxPhoto(photo);
                    setLightboxIndex(index);
                  }}
                  className="relative group cursor-pointer overflow-hidden rounded-[12px] transition-all duration-200"
                  style={{
                    aspectRatio: '1/1',
                  }}
                >
                  {/* Photo placeholder */}
                  <div style={{
                    background: '#d1d5db',
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    fontSize: '12px',
                  }}>
                    Photo — 400 x 400px
                  </div>
                  {/* TODO: Replace with photo from Sanity CMS — 400 x 400px */}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <MagnifyingGlassPlusIcon 
                      className="text-white" 
                      style={{ width: '28px', height: '28px' }} 
                    />
                  </div>
                  
                  {/* Photo info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="text-white text-[13px] font-medium">
                      {photo.event}
                    </div>
                    <div className="text-[#cccccc] text-[12px]">
                      {new Date(photo.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MASONRY VIEW */}
          {viewMode === 'masonry' && (
            <div style={{
              columnCount: '3',
              columnGap: '12px',
            }}>
              {displayedPhotos.map((photo, index) => (
                <div
                  key={photo._id}
                  onClick={() => {
                    setLightboxPhoto(photo);
                    setLightboxIndex(index);
                  }}
                  className="relative group cursor-pointer overflow-hidden rounded-[12px] transition-all duration-200 mb-3 break-inside-avoid"
                  style={{
                    width: '100%',
                    // Variable height for masonry effect
                    height: `${200 + (index % 3) * 100}px`,
                  }}
                >
                  {/* Photo placeholder */}
                  <div style={{
                    background: '#d1d5db',
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    fontSize: '12px',
                  }}>
                    Photo — Variable height
                  </div>
                  {/* TODO: Replace with photo from Sanity CMS — variable height */}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <MagnifyingGlassPlusIcon 
                      className="text-white" 
                      style={{ width: '28px', height: '28px' }} 
                    />
                  </div>
                  
                  {/* Photo info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="text-white text-[13px] font-medium">
                      {photo.event}
                    </div>
                    <div className="text-[#cccccc] text-[12px]">
                      {new Date(photo.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. LIGHTBOX VIEWER */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-[1000] flex items-center justify-center"
          onClick={() => setLightboxPhoto(null)}
        >
          {/* Large photo display */}
          <div style={{
            background: '#2a2a2a',
            width: '90vw',
            maxWidth: '1000px',
            height: '70vh',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '14px',
          }}>
            Full Size Photo — 1200 x 800px
          </div>
          {/* TODO: Replace with actual photo */}

          {/* Previous arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronLeftIcon className="text-white" style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronRightIcon className="text-white" style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxPhoto(null);
            }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
          >
            <XMarkIcon className="text-white" style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Bottom info bar */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="text-white text-[15px] mb-1">
                {lightboxPhoto.title || 'Gallery Photo'}
              </div>
              <div className="text-teal-500 text-[14px] mb-1">
                {lightboxPhoto.event}
              </div>
              <div className="text-[#888888] text-[13px]">
                {new Date(lightboxPhoto.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadPhoto(lightboxPhoto);
                }}
                className="border border-white text-white px-4 py-2 rounded-[50px] text-[12px] font-medium hover:bg-white hover:text-black transition-colors duration-200 flex items-center gap-2"
              >
                <ArrowDownTrayIcon style={{ width: '14px', height: '14px' }} />
                DOWNLOAD
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sharePhoto(lightboxPhoto);
                }}
                className="border border-white text-white px-4 py-2 rounded-[50px] text-[12px] font-medium hover:bg-white hover:text-black transition-colors duration-200 flex items-center gap-2"
              >
                <ShareIcon style={{ width: '14px', height: '14px' }} />
                SHARE
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto">
            {filteredPhotos().map((photo, index) => (
              <button
                key={photo._id}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhoto(photo);
                  setLightboxIndex(index);
                }}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors duration-200 ${
                  index === lightboxIndex ? 'border-teal-500' : 'border-transparent'
                }`}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '6px',
                }}
              >
                <div style={{
                  background: '#666',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '10px',
                }}>
                  Thumb
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. LOAD MORE / PAGINATION */}
      <section className="bg-[#f0f0ee] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {visibleCount < filteredPhotos().length && (
            <button 
              onClick={loadMore}
              className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3.5 px-10 rounded-[50px] transition-all duration-200 mb-4"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
            >
              LOAD MORE PHOTOS
            </button>
          )}
          
          <p className="text-gray-600 text-[13px]">
            {/* TODO: Implement Sanity CMS pagination with offset/limit queries */}
            Showing {displayedPhotos.length} of {filteredPhotos().length} photos
          </p>
        </div>
      </section>

      {/* 7. CLOSING CTA */}
      <section className="bg-[#1a1a1a] py-20" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Small italic label */}
          <span 
            className="text-[#aaaaaa] italic block mb-6"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Georgia, serif'
            }}
          >
            Come See For Yourself
          </span>
          
          {/* Large heading */}
          <h2 
            className="text-white font-bold mb-6"
            style={{ 
              fontSize: '52px',
              lineHeight: '1.2'
            }}
          >
            These Moments Could Be Yours.
          </h2>
          
          {/* Supporting paragraph */}
          <p 
            className="text-[#888] mb-8"
            style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              maxWidth: '520px',
              margin: '0 auto 32px auto'
            }}
          >
            Every photo in this gallery is a Sunday someone showed up for the first time. We'd love for your story to be next.
          </p>
          
          {/* Two pill buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ gap: '16px', marginTop: '32px' }}>
            <Link 
              href="/plan-your-visit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold uppercase tracking-wide rounded-full transition-colors duration-200"
              style={{ 
                fontSize: '13px',
                padding: '14px 32px',
                borderRadius: '50px'
              }}
            >
              PLAN YOUR VISIT
            </Link>
            {/* TODO: Confirm Plan Your Visit route */}
            <Link 
              href="/connect/groups"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-[#1a1a1a] font-bold uppercase tracking-wide rounded-full transition-colors duration-200"
              style={{ 
                fontSize: '13px',
                padding: '14px 32px',
                borderRadius: '50px',
                borderWidth: '1.5px'
              }}
            >
              GET CONNECTED
            </Link>
          </div>
        </div>
      </section>

      {/* Videos Section (placeholder for VIEW VIDEOS button) */}
      <section id="videos-section" className="bg-[#f0f0ee] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-black font-bold text-2xl mb-4">Videos</h2>
          <p className="text-gray-600">Video content coming soon...</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
