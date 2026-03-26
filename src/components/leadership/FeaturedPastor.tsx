'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const FeaturedPastor = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pastors = [
    {
      id: 1,
      name: 'Prophet Powerman Bekoe',
      title: 'Senior Pastor',
      photo: 'https://placehold.co/600x600',
      quote: 'Our vision is to build a church that reaches people where they are and helps them take their next steps with God.',
      bio: 'Prophet Powerman Bekoe has been serving as the Senior Pastor of ThaGospel Church for over seven years. Under his leadership, the church has grown significantly, expanding our ministries and deepening our impact in the community.'
      // TODO: replace with real pastor photo and content
    },
    {
      id: 2,
      name: 'Prophetess Tracy Bekoe',
      title: 'Lady Pastor',
      photo: 'https://placehold.co/600x600',
      quote: 'We are called to be a beacon of hope, love, and transformation in our community and beyond.',
      bio: 'Prophetess Tracy Bekoe serves alongside her husband as Lady Pastor, bringing wisdom and compassion to our ministry. She is committed to empowering believers and nurturing spiritual growth in our church family.'
      // TODO: replace with real pastor photo and content
    }
  ];

  const nextPastor = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % pastors.length);
  }, [pastors.length]);

  const prevPastor = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + pastors.length) % pastors.length);
  }, [pastors.length]);

  const currentPastor = pastors[currentIndex];

  useEffect(() => {
    const interval = setInterval(nextPastor, 8000);
    return () => clearInterval(interval);
  }, [nextPastor]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            Meet Our Senior Pastors
          </h2>
          <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
            Visionary leaders called to shepherd ThaGospel Church with wisdom and spiritual authority
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {pastors.map((pastor) => (
                <div key={pastor.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Photo */}
                    <div className="order-2 lg:order-1">
                      <div className="relative aspect-square rounded-3xl overflow-hidden">
                        <Image
                          src={pastor.photo}
                          alt={pastor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="order-1 lg:order-2">
                      <div className="mb-6">
                        <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                          {pastor.title}
                        </span>
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                        {pastor.name}
                      </h3>
                      
                      <div className="mb-6">
                        <div className="text-5xl text-[#2563EB] mb-3 opacity-20">"</div>
                        <blockquote className="text-lg md:text-xl italic text-[#111827] leading-relaxed">
                          {pastor.quote}
                        </blockquote>
                      </div>

                      <div className="space-y-3 text-[#6B7280] leading-relaxed">
                        <p className="text-base">
                          {pastor.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPastor}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Previous pastor"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={nextPastor}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Next pastor"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {pastors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#2563EB] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to pastor ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPastor;
