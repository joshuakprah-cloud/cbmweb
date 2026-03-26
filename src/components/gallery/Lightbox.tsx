'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../../../sanity/lib/image';

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

interface LightboxProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photo, photos, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find current photo index
  useEffect(() => {
    const index = photos.findIndex(p => p._id === photo._id);
    setCurrentIndex(index >= 0 ? index : 0);
  }, [photo._id, photos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigatePhoto(-1);
          break;
        case 'ArrowRight':
          navigatePhoto(1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Trap focus within lightbox
  useEffect(() => {
    const focusableElements = document.querySelectorAll(
      '[data-lightbox-focusable="true"]'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  const navigatePhoto = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
      setCurrentIndex(newIndex);
    }
  };

  const currentPhoto = photos[currentIndex];
  const imageUrl = currentPhoto?.image ? urlFor(currentPhoto.image).url() : null;

  const handleShare = async () => {
    if (navigator.share && imageUrl) {
      try {
        await navigator.share({
          title: currentPhoto?.title || 'Gallery Photo',
          text: currentPhoto?.caption || `Photo from ${currentPhoto?.event || 'ThaGospel Church'}`,
          url: imageUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else if (imageUrl) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(imageUrl);
        alert('Image link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${currentPhoto?.title || 'photo'}-${currentPhoto?._id}.jpg`;
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
      onClick={onClose}
    >
      <div 
        className="relative max-w-6xl w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 text-white">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">
              {currentPhoto?.title || 'Untitled'}
            </h2>
            {currentPhoto?.event && (
              <p className="text-sm text-gray-300">{currentPhoto.event}</p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              data-lightbox-focusable="true"
              aria-label="Share photo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </button>
            
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Download photo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              data-lightbox-focusable="true"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Image */}
        <div className="flex-1 relative flex items-center justify-center">
          {imageUrl ? (
            <div className="relative w-full h-full max-h-[70vh]">
              <Image
                src={imageUrl}
                alt={currentPhoto?.title || 'Gallery photo'}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-gray-400 text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p>No Image Available</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {photos.length > 1 && (
            <>
              <button
                onClick={() => navigatePhoto(-1)}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigatePhoto(1)}
                disabled={currentIndex === photos.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 text-white">
          {currentPhoto?.caption && (
            <p className="text-center text-gray-300 mb-2">{currentPhoto.caption}</p>
          )}
          
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>
              {currentPhoto?.albumTitle && (
                <span>Album: {currentPhoto.albumTitle}</span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {currentPhoto?.dateTaken && (
                <time dateTime={currentPhoto.dateTaken}>
                  {new Date(currentPhoto.dateTaken).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              
              {photos.length > 1 && (
                <span>
                  {currentIndex + 1} / {photos.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
