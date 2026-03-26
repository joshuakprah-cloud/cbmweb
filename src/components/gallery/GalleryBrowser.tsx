'use client';

import { useState, useEffect, useMemo } from 'react';
import PhotoCard from './PhotoCard';
import Lightbox from './Lightbox';

interface Album {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: any;
  eventDate?: string;
  photoCount?: number;
}

interface Photo {
  _id: string;
  title: string;
  image?: any;
  caption?: string;
  event?: string;
  dateTaken?: string;
  albumTitle?: string;
  albumSlug?: string;
}

interface GalleryBrowserProps {
  albums: Album[];
  photos?: Photo[];
}

const GalleryBrowser: React.FC<GalleryBrowserProps> = ({ albums, photos = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Load saved view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('galleryViewMode');
    if (savedViewMode === 'list') setViewMode('list');
  }, []);

  // Save view mode to localStorage
  useEffect(() => {
    localStorage.setItem('galleryViewMode', viewMode);
  }, [viewMode]);

  // Extract all unique years from photos
  const allYears = useMemo(() => {
    const years = new Set<string>();
    photos.forEach(photo => {
      if (photo.dateTaken) {
        const year = new Date(photo.dateTaken).getFullYear().toString();
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [photos]);

  // Filter photos
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesSearch = !searchTerm || 
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.event?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAlbum = !selectedAlbum || photo.albumTitle === selectedAlbum;

      const matchesYear = !selectedYear || 
        (photo.dateTaken && new Date(photo.dateTaken).getFullYear().toString() === selectedYear);

      return matchesSearch && matchesAlbum && matchesYear;
    });
  }, [photos, searchTerm, selectedAlbum, selectedYear]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedAlbum('');
    setSelectedYear('');
  };

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        {/* Search Input */}
        <div className="relative" role="search" aria-label="Search gallery photos">
          <input
            type="text"
            placeholder="Search photos by title, caption, or event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            aria-label="Search gallery photos"
          />
          <svg 
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Album Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedAlbum('')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedAlbum === ''
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={selectedAlbum === ''}
            >
              All Albums
            </button>
            {albums.map(album => (
              <button
                key={album._id}
                onClick={() => setSelectedAlbum(album.title)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedAlbum === album.title
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedAlbum === album.title}
              >
                {album.title} ({album.photoCount || 0})
              </button>
            ))}
          </div>

          {/* Year Filter and View Toggle */}
          <div className="flex gap-4 items-center">
            {allYears.length > 0 && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="">All Years</option>
                {allYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            )}

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-600">
        {filteredPhotos.length > 0 ? (
          <p>Showing {filteredPhotos.length} photos</p>
        ) : (
          <p>No photos found matching your criteria.</p>
        )}
      </div>

      {/* Photos Grid/List */}
      {filteredPhotos.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }>
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo._id}
              title={photo.title}
              image={photo.image}
              caption={photo.caption}
              event={photo.event}
              dateTaken={photo.dateTaken}
              albumTitle={photo.albumTitle}
              albumSlug={photo.albumSlug}
              variant={viewMode}
              onClick={() => openLightbox(photo)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No photos found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>Clear Filters</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={filteredPhotos}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

export default GalleryBrowser;
