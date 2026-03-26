'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface LeadershipCarouselProps {
  leaders: Leader[];
}

const LeadershipCarousel: React.FC<LeadershipCarouselProps> = ({ leaders }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === leaders.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? leaders.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!leaders.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Leadership</h2>
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {leaders.map((leader, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="flex flex-col md:flex-row bg-white">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative h-96 md:h-[500px]">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <div className="text-amber-600 text-sm font-semibold uppercase tracking-wide mb-2">
                        {leader.role}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {leader.name}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        {leader.bio}
                      </p>
                      <Link
                        href="/about"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                      >
                        Meet Our Leadership
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center z-10"
            aria-label="Previous leader"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center z-10"
            aria-label="Next leader"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {leaders.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to leader ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipCarousel;
