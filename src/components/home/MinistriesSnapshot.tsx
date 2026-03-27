'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface MinistriesSnapshotProps {
  sectionLabel?: string;
  title?: string;
  description?: string;
  featuredMinistries?: Array<{
    name: string;
    slug: string;
    heroImage: any;
    tagline: string;
  }>;
  ctaText?: string;
  ctaLink?: string;
}

const MinistriesSnapshot = ({
  sectionLabel = 'Get Involved',
  title = 'Our Ministries',
  description = "There's a place for you to belong and serve. Find the ministry that fits your season of life.",
  featuredMinistries = [],
  ctaText = 'EXPLORE ALL MINISTRIES',
  ctaLink = '/ministries'
}: MinistriesSnapshotProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const ministries = [
    { 
      name: 'Kids Ministry', 
      category: 'Children',
      hook: 'Faith that starts early',
      description: 'A safe, fun environment where children discover God\'s love through age-appropriate teaching, activities, and relationships that build a foundation for lifelong faith.',
      href: '/ministries/kids'
    },
    { 
      name: 'Youth Ministry', 
      category: 'Students',
      hook: 'Bold faith for the next generation',
      description: 'Dynamic programs and authentic community where teenagers can ask hard questions, discover their purpose, and build friendships that strengthen their walk with God.',
      href: '/ministries/youth'
    },
    { 
      name: 'Women Ministry', 
      category: 'Adults',
      hook: 'Community, growth, and belonging',
      description: 'A welcoming space for women to connect deeply, grow spiritually through study and prayer, and support each other through every season of life.',
      href: '/ministries/women'
    },
    { 
      name: 'Men Ministry', 
      category: 'Adults',
      hook: 'Leading with purpose and integrity',
      description: 'Brotherhood and accountability for men to grow as leaders in their homes, workplaces, and community through authentic relationships and practical teaching.',
      href: '/ministries/men'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ministries.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ministries.length) % ministries.length);
  };

  const currentMinistry = ministries[currentSlide] || featuredMinistries[0];

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
      setCurrentSlide((prev) => (prev + 1) % ministries.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate, ministries.length]);

  return (
    <section id="ministries" className="bg-[#f0f0ee] py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span 
            className="text-gray-600 italic"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Georgia, serif'
            }}
          >
            {sectionLabel}
          </span>
          
          <h2 
            className="text-black font-bold mt-4 mb-6" 
            style={{ fontSize: '58px', lineHeight: '1.1' }}
          >
            {title}
          </h2>
          
          <p 
            className="text-gray-600 mx-auto" 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.7', 
              maxWidth: '520px' 
            }}
          >
            {description}
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="rounded-[20px] overflow-hidden relative"
          style={{ backgroundColor: '#e8e6df', padding: '60px' }}
        >
          {/* Ministry Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="order-1 lg:order-1">
              {/* Ministry Image Placeholder */}
              <div 
                className="bg-gray-400 flex items-center justify-center w-full h-[420px] rounded-[18px] text-gray-200 text-sm font-sans mb-8"
                aria-label={`${currentMinistry.name} preview image`}
              >
                {currentMinistry.name} Image — 640 x 420px
              </div>

              {/* Standalone CTA Button */}
              <Link
                href={currentMinistry.href}
                className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                style={{ fontSize: '13px', letterSpacing: '0.05em' }}
                aria-label={`Learn more about ${currentMinistry.name}`}
              >
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Text Side */}
            <div className="order-2 lg:order-2">
              {/* Category Label */}
              <span 
                className="text-teal-600 italic"
                style={{ 
                  fontSize: '16px',
                  fontFamily: 'Georgia, serif'
                }}
              >
                {currentMinistry.category}
              </span>
              
              {/* Ministry Name */}
              <h3 
                className="text-black font-bold mt-2 mb-4" 
                style={{ fontSize: '40px', lineHeight: '1.1' }}
              >
                {currentMinistry.name}
              </h3>
              
              {/* Tagline */}
              <p 
                className="text-gray-600 italic mb-4"
                style={{ 
                  fontSize: '19px',
                  fontFamily: 'Georgia, serif'
                }}
              >
                {currentMinistry.hook}
              </p>
              
              {/* Description */}
              <p 
                className="text-gray-700 mb-8 leading-relaxed"
                style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.7',
                  maxWidth: '480px'
                }}
              >
                {currentMinistry.description}
              </p>
              
              {/* CTA Button */}
              <Link
                href={currentMinistry.href}
                className="inline-flex items-center border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold py-3.5 px-8 rounded-[50px] transition-all duration-200 hover:scale-105"
                style={{ fontSize: '13px', letterSpacing: '0.05em' }}
              >
                EXPLORE {currentMinistry.name.toUpperCase()}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-700 transition-colors"
            aria-label="Previous ministry"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-700 transition-colors"
            aria-label="Next ministry"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {ministries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-teal-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to ${ministries[index].name}`}
              />
            ))}
          </div>

          {/* Pause/Play Button - Hidden but functional */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="sr-only" /* Screen reader only - visually hidden but accessible */
            aria-label={autoRotate ? 'Pause auto-rotation' : 'Start auto-rotation'}
          >
            {autoRotate ? 'Pause' : 'Play'}
          </button>
        </div>

        {/* Explore All Button */}
        <div className="text-center mt-20">
          <Link
            href={ctaLink}
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-[50px] transition-all duration-200 hover:scale-105"
            style={{ fontSize: '13px', letterSpacing: '0.05em' }}
          >
            {ctaText}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MinistriesSnapshot;
