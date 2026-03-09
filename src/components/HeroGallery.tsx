'use client';

import { useState, useEffect } from 'react';

interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  image?: string;
  order: number;
}

interface HeroGalleryProps {
  slides?: HeroSlide[];
}

const HeroGallery = ({ slides = [] }: HeroGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use Sanity slides or fallback to default slides
  const heroSlides = slides.length > 0 ? slides : [
    {
      title: "Welcome to ThaGospel Church",
      subtitle: "Raising Believers. Impacting Nations.",
      cta: "Plan Your Visit",
      image: "/hero-1.jpg",
      order: 1
    },
    {
      title: "Join Our Sunday Service",
      subtitle: "Experience Powerful Worship & Biblical Teaching",
      cta: "Watch Live",
      image: "/hero-2.jpg",
      order: 2
    },
    {
      title: "Growing Together in Faith",
      subtitle: "Building a Strong Church Community",
      cta: "Learn More",
      image: "/hero-3.jpg",
      order: 3
    }
  ];

  // Sort slides by order
  const sortedSlides = [...heroSlides].sort((a, b) => a.order - b.order);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sortedSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sortedSlides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sortedSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sortedSlides.length) % sortedSlides.length);

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {sortedSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-6xl text-gray-600">🖼️</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                {/* Text content removed */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {sortedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroGallery;
