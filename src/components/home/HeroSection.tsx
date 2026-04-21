'use client';

import { useState, useEffect, useCallback } from 'react';
import HeroGallery from '../HeroGallery';
import Link from 'next/link';

interface HeroSlide {
  title: string;
  subtitle: string;
  label?: string;
  cta: string;
  ctaLink?: string;
  cta2?: string;
  cta2Link?: string;
  image?: any;
  order: number;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
}

const HeroSection = ({ slides }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (slides?.length || 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [slides?.length]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Get current slide data
  const slide = slides?.[currentSlide] || slides?.[0];

  // Content with fallbacks
  const label = slide?.label || 'Love & Humility';
  const title = slide?.title || 'BUILDING A NATION OF CHRIST MINDED PEOPLE';
  const subtitle = slide?.subtitle || "Join us this Sunday and find your place among a people on mission.";
  const cta1Text = slide?.cta || 'Plan Your Visit';
  const cta1Link = slide?.ctaLink || '/plan-your-visit';
  const cta2Text = slide?.cta2 || 'About Us';
  const cta2Link = slide?.cta2Link || '/about';

  // Single line tagline - no color split needed
  const titleText = title;

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Full-bleed Background Image */}
      <div className="absolute inset-0 z-0">
        {slides && slides.length > 0 ? (
          <HeroGallery
            slides={slides}
            currentSlide={currentSlide}
            onSlideChange={handleSlideChange}
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
      </div>

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.2) 100%)'
        }}
      />
      {/* Mobile overlay - flat */}
      <div
        className="absolute inset-0 z-10 pointer-events-none md:hidden"
        style={{
          background: 'rgba(0,0,0,0.65)'
        }}
      />

      {/* Left Side Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-20 lg:pb-28 px-6 sm:px-10 lg:px-20 xl:px-24 pt-[72px] lg:pt-[76px]">
        <div className="max-w-[680px]">
          {/* H1 Headline */}
          <h1
            className={`max-w-[700px] transition-all duration-500 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <span className="block text-white text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.25] tracking-[-0.01em] uppercase">
              {titleText}
            </span>
          </h1>

          {/* CTA Button Row */}
          <div
            className={`flex flex-col sm:flex-row gap-3 mt-9 transition-all duration-500 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '550ms' }}
          >
            {/* Primary Button */}
            <Link
              href={cta1Link}
              className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-200 text-[15px]"
              aria-label={`${cta1Text} - Plan your first visit to ThaGospel Church`}
            >
              {cta1Text}
            </Link>

            {/* Secondary Button - Outlined style */}
            <Link
              href={cta2Link}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-medium py-3.5 px-8 rounded-lg border-[1.5px] border-white/50 hover:border-white transition-all duration-200 text-[15px]"
              aria-label={`${cta2Text} - Learn more about our church`}
            >
              {cta2Text}
            </Link>
          </div>

          {/* Slide Indicator Dots */}
          <div
            className={`flex gap-2 mt-12 transition-all duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            {slides?.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-7 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
