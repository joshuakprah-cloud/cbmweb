'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  image?: any;
  videoUrl?: string;
  poster?: any;
  order: number;
}

interface HeroGalleryProps {
  slides?: HeroSlide[];
}

const HeroGallery = ({ slides = [] }: HeroGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set());
  
  // Use Sanity slides or fallback to default slides
  const heroSlides = slides.length > 0 ? slides : [
    {
      title: "Welcome to ThaGospel Church",
      subtitle: "Raising Believers. Impacting Nations.",
      cta: "Plan Your Visit",
      order: 1
    },
    {
      title: "Join Our Sunday Service",
      subtitle: "Experience Powerful Worship & Biblical Teaching",
      cta: "Watch Live",
      order: 2
    },
    {
      title: "Growing Together in Faith",
      subtitle: "Building a Strong Church Community",
      cta: "Learn More",
      order: 3
    }
  ];

  // Sort slides by order
  const sortedSlides = [...heroSlides].sort((a, b) => a.order - b.order);

  const handleSlideLoad = useCallback((index: number) => {
    setLoadedSlides(prev => new Set([...prev, index]));
    if (index === 0) {
      setIsLoading(false);
    }
  }, []);

  // Auto-rotation logic with play/pause control
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sortedSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, sortedSlides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sortedSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sortedSlides.length) % sortedSlides.length);
  const togglePlayPause = () => setIsPlaying(prev => !prev);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden bg-gray-200">
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" 
               style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
        </div>
      )}

      {/* Slides */}
      <div className="relative w-full h-full">
        {sortedSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative w-full h-full">
              {/* Video Slide */}
              {slide.videoUrl ? (
                <video
                  src={slide.videoUrl}
                  poster={slide.poster ? urlFor(slide.poster).url() : undefined}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay={false}
                  onLoadedData={() => handleSlideLoad(index)}
                />
              ) : (
                /* Image Slide */
                <>
                  {slide.image ? (
                    <Image
                      src={urlFor(slide.image).url()}
                      alt={slide.title || 'Hero slide'}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      onLoad={() => handleSlideLoad(index)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-6xl text-gray-600" aria-hidden="true">🖼️</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Play/Pause Toggle */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-6 right-20 z-30 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? (
          <PauseIcon className="w-5 h-5" />
        ) : (
          <PlayIcon className="w-5 h-5" />
        )}
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {sortedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default HeroGallery;
