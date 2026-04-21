import React from 'react';
import Image from 'next/image';

interface AboutHeroProps {
  headline?: string;
  subheadline?: string;
  bodyText?: string;
  image?: any;
}

export default function AboutHero({ 
  headline = 'See What God Can Do Through You',
  subheadline = 'We are here to help you deepen your faith and discover your purpose.',
  bodyText = "Since 2006, we've witnessed people begin a relationship with Christ and grow in their faith across our multiple physical locations and around the globe through our online ministry. From meaningful worship to relatable sermons, you'll experience hope and strengthen your faith as you discover who God has made you to be.",
  image
}: AboutHeroProps) {
  return (
    <section 
      role="banner"
      className="relative bg-[#0a0a0a] pt-[120px] lg:pt-[140px] pb-16 md:pb-24 lg:pb-32 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Text Content */}
        <div className="max-w-4xl">
          {/* Headline */}
          <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            {headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-[18px] md:text-[22px] text-gray-400 leading-[1.5] mt-4 font-medium">
            {subheadline}
          </p>
          
          {/* Body Text */}
          <p className="text-[15px] md:text-[16px] text-gray-500 leading-[1.8] mt-6">
            {bodyText}
          </p>
        </div>

        {/* Image Area */}
        <div className="mt-12 md:mt-16">
          {image ? (
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt="Church worship experience"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
              <div className="text-center text-gray-600">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-lg">Church Worship Experience</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

