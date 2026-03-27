'use client';

import { useState, useEffect } from 'react';
import HeroGallery from '../HeroGallery';
import { urlFor } from '../../sanity/lib/image';
import Link from 'next/link';

interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  image?: any;
  order: number;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
}

const HeroSection = ({ slides }: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fade in overlay text after component mounts to prevent flash
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const pageTitle = slides?.[0]?.title || 'WELCOME';
  const tagline = slides?.[0]?.subtitle || 'Raising Believers. Impacting Nations.';
  const ctaText = slides?.[0]?.cta || 'PLAN YOUR VISIT';

  return (
    <section className="grid h-screen pt-8 bg-[#fafafa] grid-cols-1 md:grid-cols-[2fr_3fr]" style={{ height: '100vh' }}>
      {/* Left Column - Text */}
      <div className="bg-[#fafafa] p-16 lg:p-20 flex flex-col justify-center pt-8 lg:pt-20">
        {/* Page Label */}
        <div className="text-black font-bold mb-8 text-center" style={{ fontSize: '70px', lineHeight: '1' }}>
          {pageTitle}
        </div>
        
        {/* Tagline */}
        <h1 
          className="text-black font-serif italic mb-8" 
          style={{ fontSize: '48px', lineHeight: '1.1' }}
          dangerouslySetInnerHTML={{ 
            __html: tagline.includes('.') ? tagline.replace('. ', '.<br/>') : tagline 
          }}
        />
        
        {/* Supporting Copy */}
        <p className="text-gray-700 mb-8" style={{ fontSize: '16px', lineHeight: '1.7', maxWidth: '420px' }}>
          Join us this Sunday and find your place among a people on mission.
        </p>
        
        {/* CTA Button */}
        <Link
          href="/plan-your-visit"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-[50px] transition-all duration-200 hover:scale-105"
          style={{ fontSize: '13px', letterSpacing: '0.05em' }}
        >
          {ctaText}
        </Link>
      </div>
      
      {/* Right Column - Image Carousel */}
      <div className="p-16 lg:p-20 flex items-center justify-center mt-10 mb-10 md:mt-16 md:mb-16">
        {slides && slides.length > 0 ? (
          <div className="w-full rounded-[20px] overflow-hidden">
            <HeroGallery slides={slides} />
          </div>
        ) : (
          // TODO: Replace with real congregation photos from Sanity CMS — 860 x 680px
          <div className="bg-[#fafafa] flex items-center justify-center w-full min-h-[600px] rounded-[20px] text-gray-400 text-sm font-sans">
            Hero Gallery Image — 860 x 680px
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
