'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

interface StaffCarouselProps {
  staffMembers: any[];
}

const StaffCarousel: React.FC<StaffCarouselProps> = ({ staffMembers }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentStaff = staffMembers[currentSlide];

  // IntersectionObserver for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        setAutoRotate(entry.isIntersecting && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // Auto-rotation logic
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % staffMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate, staffMembers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % staffMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + staffMembers.length) % staffMembers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (staffMembers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No team members available at this time.</p>
      </div>
    );
  }

  return (
    <div 
      ref={carouselRef}
      className="rounded-3xl p-12 lg:p-16 relative bg-[#e8e6df]"
    >
      {/* Slide Content */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Text */}
        <div>
          {currentStaff.department && (
            <div className="text-gray-600 italic mb-3" style={{ fontSize: '18px', fontFamily: 'Georgia, serif' }}>
              {currentStaff.department}
            </div>
          )}

          <h3 className="text-black font-bold mb-2" style={{ fontSize: '40px', lineHeight: '1.1' }}>
            {currentStaff.name}
          </h3>

          {currentStaff.role && (
            <p className="text-gray-600 mb-4" style={{ fontSize: '20px' }}>
              {currentStaff.role}
            </p>
          )}

          {currentStaff.bio && (
            <p className="text-gray-700 mb-8 max-w-md" style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {currentStaff.bio}
            </p>
          )}
        </div>

        {/* Right Column - Image */}
        <div>
          <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-200">
            {currentStaff.photo ? (
              <Image
                src={urlFor(currentStaff.photo).width(480).height(500).url()}
                alt={currentStaff.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span>No photo available</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex space-x-4">
        <button
          onClick={prevSlide}
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-2xl"
          style={{ fontSize: '24px', fontWeight: '300' }}
          aria-label="Previous team member"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-2xl"
          style={{ fontSize: '24px', fontWeight: '300' }}
          aria-label="Next team member"
        >
          →
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {staffMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-teal-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to ${staffMembers[index].name}`}
          />
        ))}
      </div>

      {/* Pause/Play Button - Hidden but functional */}
      <button
        onClick={() => setAutoRotate(!autoRotate)}
        className="sr-only"
        aria-label={autoRotate ? 'Pause auto-rotation' : 'Start auto-rotation'}
      >
        {autoRotate ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default StaffCarousel;
