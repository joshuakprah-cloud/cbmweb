'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface MinistryLightboxProps {
  photos: Photo[];
}

const MinistryLightbox: React.FC<MinistryLightboxProps> = ({ photos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={false}
            />
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {isOpen && currentPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-6xl w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 text-white">
              <div className="text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                data-lightbox-focusable="true"
                aria-label="Close gallery"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 relative flex items-center justify-center">
              <div className="relative w-full h-full max-h-[70vh]">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority={true}
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                data-lightbox-focusable="true"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                data-lightbox-focusable="true"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Caption */}
            {currentPhoto.caption && (
              <div className="p-4 text-center text-white">
                <p>{currentPhoto.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MinistryLightbox;
