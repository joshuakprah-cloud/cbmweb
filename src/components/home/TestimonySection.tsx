'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

interface Testimony {
  memberName: string;
  role: string;
  quote: string;
  photo?: any;
}

interface TestimonySectionProps {
  testimonies?: Testimony[];
}

const TestimonySection = ({ testimonies: cmsTestimonies }: TestimonySectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedQuotes, setExpandedQuotes] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const minSwipeDistance = 50;

  // Fallback testimonies if no CMS data
  const defaultTestimonies: Testimony[] = [
    {
      memberName: "Sarah Johnson",
      role: "Main Campus",
      quote: "This church has been a life-changing experience for me and my family. The community is so welcoming, and the teaching has helped me grow in my faith like never before.",
    },
    {
      memberName: "Michael Chen",
      role: "Member since 2020",
      quote: "I came here broken and lost, but found hope and purpose. The love and support I received from this church family helped me rebuild my life and restore my relationship with God.",
    },
    {
      memberName: "Maria Rodriguez",
      role: "North Campus",
      quote: "The youth ministry here is incredible! My teenagers have found their identity in Christ and made lifelong friends. I'm so grateful for a place that invests in the next generation.",
    }
  ];

  const testimonies = cmsTestimonies || defaultTestimonies;

  const goToTestimony = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleQuoteExpansion = (index: number) => {
    setExpandedQuotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentIndex < testimonies.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentTestimony = testimonies[currentIndex];
  const isQuoteExpanded = expandedQuotes.has(currentIndex);
  
  // Truncate quote to 3 lines (~150 chars) if not expanded
  const maxPreviewLength = 150;
  const shouldTruncate = currentTestimony?.quote.length > maxPreviewLength;
  const displayQuote = isQuoteExpanded || !shouldTruncate 
    ? currentTestimony?.quote 
    : currentTestimony?.quote.slice(0, maxPreviewLength) + '...';

  return (
    <section id="testimonies" className="bg-[#e8e6df] py-32" aria-live="polite" aria-atomic="true">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={containerRef}
          className="text-center relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Large Decorative Quote Mark */}
          <div 
            className="text-teal-600 mb-8 absolute top-0 left-1/2 -translate-x-1/2"
            style={{ 
              fontSize: '140px', 
              fontFamily: 'Georgia, serif',
              opacity: '0.3',
              lineHeight: '1'
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Testimonial Quote */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <blockquote 
              className="text-black italic transition-opacity duration-400"
              style={{ 
                fontSize: '28px', 
                lineHeight: '1.6',
                fontFamily: 'Georgia, serif'
              }}
            >
              {displayQuote}
            </blockquote>
            
            {/* Read More Toggle */}
            {shouldTruncate && (
              <button
                onClick={() => toggleQuoteExpansion(currentIndex)}
                className="mt-4 text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors"
                aria-label={isQuoteExpanded ? 'Show less' : 'Read full testimony'}
              >
                {isQuoteExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Member Info */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            {currentTestimony?.photo ? (
              <Image
                src={urlFor(currentTestimony.photo).width(64).height(64).url()}
                alt={`${currentTestimony.memberName} profile photo`}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="bg-gray-500 rounded-full w-16 h-16 flex items-center justify-center text-gray-200 text-xs font-sans">
                64x64
              </div>
            )}
            <div className="text-left">
              <div className="font-semibold text-black text-lg">
                {currentTestimony?.memberName}
              </div>
              <div className="text-gray-600 text-sm">
                {currentTestimony?.role}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-6">
            {/* Previous Button */}
            <button
              onClick={() => goToTestimony((currentIndex - 1 + testimonies.length) % testimonies.length)}
              className="text-teal-600 hover:text-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full p-1"
              aria-label="Previous testimony"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {testimonies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimony(index)}
                  className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    index === currentIndex ? 'bg-teal-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimony ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => goToTestimony((currentIndex + 1) % testimonies.length)}
              className="text-teal-600 hover:text-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full p-1"
              aria-label="Next testimony"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonySection;
