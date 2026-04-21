'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Testimony {
  memberName: string;
  role: string;
  quote: string;
  photo?: any;
}

interface TestimonySectionProps {
  testimonies?: Testimony[];
  sectionTitle?: string;
  sectionDescription?: string;
  ctaText?: string;
  ctaLink?: string;
}

const fallbackTestimonies: Testimony[] = [
  {
    memberName: "Abena Mensah",
    role: "Member since 2021",
    quote: "ThaGospel Church completely transformed my walk with God. The messages are rooted in the Word and the community here feels like genuine family. I have never felt more at home in a church.",
    photo: null
  },
  {
    memberName: "Kwame Asante",
    role: "Youth Ministry",
    quote: "I came in searching for something real and found it here. The youth ministry gave me a community of believers who push me to grow. Prophet Bekoe's teachings have reshaped how I see my identity in Christ.",
    photo: null
  },
  {
    memberName: "Ama Boateng",
    role: "Women's Ministry",
    quote: "The Women's Ministry here is unlike anything I have experienced. It is not just programs, it is real discipleship. I am growing in ways I never expected.",
    photo: null
  }
];

const TestimonySection = ({
  testimonies = [],
  sectionTitle = 'Member Stories',
  sectionDescription = 'Real stories from real people whose lives have been touched by the Gospel.',
  ctaText = 'Share Your Story',
  ctaLink = '/connect'
}: TestimonySectionProps) => {
  // Only use CMS testimonies - no fallback
  const allTestimonies = testimonies.length > 0 ? testimonies : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Swipe handlers (desktop only - mobile now stacks vertically)
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

    if (isLeftSwipe && activeIndex < allTestimonies.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };
  
  const featuredTestimony = allTestimonies[activeIndex];
  const supportingTestimonies = allTestimonies.filter((_, i) => i !== activeIndex).slice(0, 3);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Don't render section if no testimonies
  if (allTestimonies.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonies"
      role="region"
      aria-label="Member testimonies"
      className="bg-[#111111]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-[60px] lg:py-24">
        {/* Section Header */}
        <div className="text-center max-w-[560px] mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#2dd4bf] font-medium">
            {sectionTitle}
          </span>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.15] mt-2.5">
            Real Lives. Real Change.
          </h2>
          <p className="text-[17px] text-white/55 leading-[1.7] mt-3.5">
            {sectionDescription}
          </p>
        </div>

        {/* Desktop/Tablet Layout: Featured + Supporting */}
        <div 
          className="hidden md:grid md:grid-cols-[1.4fr_0.6fr] gap-8 items-stretch"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Left Column - Featured Testimony */}
          {featuredTestimony && (
            <FeaturedCard
              testimony={featuredTestimony}
              getInitials={getInitials}
            />
          )}

          {/* Right Column - Supporting Cards */}
          <div className="flex flex-col gap-3">
            {supportingTestimonies.map((testimony, index) => {
              const originalIndex = allTestimonies.findIndex(t => t.memberName === testimony.memberName);
              return (
                <SupportingCard
                  key={originalIndex}
                  testimony={testimony}
                  getInitials={getInitials}
                  onClick={() => setActiveIndex(originalIndex)}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile Layout: Stacked vertically (no carousel) */}
        <div className="md:hidden space-y-4">
          {allTestimonies.map((testimony, index) => (
            <MobileVerticalCard
              key={index}
              testimony={testimony}
              getInitials={getInitials}
            />
          ))}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
            aria-label="Previous testimony"
          >
            <ChevronLeftIcon className="w-[18px] h-[18px] text-white" />
          </button>

          <div className="flex gap-1.5">
            {allTestimonies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="transition-all duration-300"
                style={{
                  width: index === activeIndex ? '24px' : '6px',
                  height: '6px',
                  borderRadius: index === activeIndex ? '3px' : '50%',
                  backgroundColor: index === activeIndex ? '#0d9488' : 'rgba(255,255,255,0.25)'
                }}
                aria-label={`Go to testimony ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex(Math.min(allTestimonies.length - 1, activeIndex + 1))}
            disabled={activeIndex === allTestimonies.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
            aria-label="Next testimony"
          >
            <ChevronRightIcon className="w-[18px] h-[18px] text-white" />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href={ctaLink || '/connect'}
            className="inline-flex items-center justify-center bg-transparent hover:bg-white/[0.05] text-white font-medium py-3.5 px-8 rounded-lg border-[1.5px] border-white/30 hover:border-white transition-all duration-200 text-[15px]"
          >
            {ctaText || 'Share Your Story'}
          </Link>
        </div>
      </div>
    </section>
  );
};

// Featured Card Component
interface FeaturedCardProps {
  testimony: Testimony;
  getInitials: (name: string) => string;
}

const FeaturedCard = ({ testimony, getInitials }: FeaturedCardProps) => {
  return (
    <div
      className="relative flex flex-col justify-between rounded-[20px] p-10 lg:p-12 h-full overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
      role="article"
    >
      {/* Teal Accent Bar */}
      <div 
        className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-[3px]"
        style={{ background: '#0d9488' }}
        aria-hidden="true"
      />

      {/* Top Section */}
      <div className="pl-4">
        {/* Quote Mark */}
        <div
          className="text-[#0d9488] font-black leading-none select-none"
          style={{ fontSize: '80px', opacity: 0.4, marginBottom: '-20px' }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Quote - Full text always shown */}
        <blockquote
          className="text-white font-normal leading-[1.75] mt-10"
          style={{ fontSize: '22px' }}
        >
          {testimony.quote}
        </blockquote>
      </div>

      {/* Bottom Section */}
      <div
        className="mt-8 pt-6 flex items-center gap-3.5 pl-4"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Photo */}
        {testimony.photo ? (
          <Image
            src={urlFor(testimony.photo).width(52).height(52).url()}
            alt={testimony.memberName}
            width={52}
            height={52}
            className="rounded-full object-cover"
            style={{ border: '2px solid #0d9488' }}
          />
        ) : (
          <div
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white font-semibold text-base"
            style={{ background: '#0d9488' }}
            aria-label={testimony.memberName}
          >
            {getInitials(testimony.memberName)}
          </div>
        )}

        {/* Info */}
        <div>
          <div className="text-white font-semibold text-base">
            {testimony.memberName}
          </div>
          <div className="text-white/50 text-[13px] mt-0.5">
            {testimony.role}
          </div>
        </div>
      </div>
    </div>
  );
};

// Supporting Card Component
interface SupportingCardProps {
  testimony: Testimony;
  getInitials: (name: string) => string;
  onClick?: () => void;
}

const SupportingCard = ({ testimony, getInitials, onClick }: SupportingCardProps) => {
  const displayQuote = testimony.quote.length > 120
    ? testimony.quote.slice(0, 120) + '...'
    : testimony.quote;

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between rounded-[14px] p-5 flex-1 cursor-pointer transition-all duration-200 hover:bg-white/[0.08]"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}
      role="button"
      aria-label={`Read testimony from ${testimony.memberName}`}
    >
      {/* Top Section */}
      <div>
        {/* Quote Mark */}
        <div
          className="text-[#0d9488] font-black leading-none"
          style={{ fontSize: '28px', opacity: 0.5, marginBottom: '6px' }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Quote */}
        <p
          className="text-white/70 font-normal leading-[1.6] line-clamp-3"
          style={{ fontSize: '14px' }}
        >
          {displayQuote}
        </p>
      </div>

      {/* Bottom Section */}
      <div
        className="mt-3.5 pt-3 flex items-center gap-2.5"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        {/* Photo */}
        {testimony.photo ? (
          <Image
            src={urlFor(testimony.photo).width(36).height(36).url()}
            alt={testimony.memberName}
            width={36}
            height={36}
            className="rounded-full object-cover"
            style={{ border: '1.5px solid rgba(13,148,136,0.5)' }}
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ background: '#0d9488' }}
            aria-label={testimony.memberName}
          >
            {getInitials(testimony.memberName)}
          </div>
        )}

        {/* Info */}
        <div>
          <div className="text-white/85 font-semibold text-[13px]">
            {testimony.memberName}
          </div>
          <div className="text-white/40 text-xs mt-0.5">
            {testimony.role}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Vertical Card Component - Stacks all testimonies vertically
interface MobileVerticalCardProps {
  testimony: Testimony;
  getInitials: (name: string) => string;
}

const MobileVerticalCard = ({ testimony, getInitials }: MobileVerticalCardProps) => {
  return (
    <div
      className="relative rounded-[20px] p-6 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
      role="article"
    >
      {/* Teal Accent Bar */}
      <div 
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-[3px]"
        style={{ background: '#0d9488' }}
        aria-hidden="true"
      />

      <div className="pl-3">
        {/* Quote Mark */}
        <div
          className="text-[#0d9488] font-black leading-none select-none"
          style={{ fontSize: '48px', opacity: 0.4, marginBottom: '-12px' }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Full Quote */}
        <blockquote
          className="text-white font-normal leading-[1.7] mt-6"
          style={{ fontSize: '17px' }}
        >
          {testimony.quote}
        </blockquote>

        {/* Member Info */}
        <div className="mt-5 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {testimony.photo ? (
            <Image
              src={urlFor(testimony.photo).width(40).height(40).url()}
              alt={testimony.memberName}
              width={40}
              height={40}
              className="rounded-full object-cover"
              style={{ border: '2px solid #0d9488' }}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ background: '#0d9488' }}
            >
              {getInitials(testimony.memberName)}
            </div>
          )}
          <div>
            <div className="text-white font-semibold text-[15px]">
              {testimony.memberName}
            </div>
            <div className="text-white/50 text-[13px]">
              {testimony.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonySection;

