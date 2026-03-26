'use client';

import React, { useState } from 'react';

const CitiesLocations: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      campusLabel: "MAIN CAMPUS",
      cityName: "Downtown",
      description: "Our original home where it all began. This gathering feels like family—intimate, authentic, and full of energy. We worship passionately, pray boldly, and leave changed every week. Join us Sundays at 9:00 AM and 11:30 AM for a powerful experience of God's presence.",
      imagePlaceholder: "Downtown Location Image — 860 x 500px",
      imageBg: "#5a6a7a"
    },
    {
      campusLabel: "NORTH CAMPUS",
      cityName: "Cumberland",
      description: "A vibrant community gathering in the northern part of the city. This location brings the same passion and presence of God with a neighborhood feel. Come as you are, leave changed. We meet Sundays at 10:00 AM and welcome everyone to be part of our growing family.",
      imagePlaceholder: "Cumberland Location Image — 860 x 500px",
      imageBg: "#6b7a8a"
    },
    {
      campusLabel: "WEST CAMPUS",
      cityName: "West End",
      description: "Our newest campus serving the western communities. Same heart, same mission, new location. We're building authentic community and helping people encounter God in powerful ways. Join us Sundays at 10:30 AM for an unforgettable gathering experience.",
      imagePlaceholder: "West End Location Image — 860 x 500px",
      imageBg: "#7a8a9a"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-12 lg:p-16 relative"
          style={{ backgroundColor: '#e8e6df' }}
        >
          {/* Section Heading */}
          <h2
            className="text-black font-bold mb-8 lg:mb-10"
            style={{ fontSize: '72px', lineHeight: '1.1' }}
          >
            Our Cities +Locations
          </h2>

          {/* Slide Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text */}
            <div>
              {/* Campus Label */}
              <div
                className="text-gray-600 uppercase tracking-wider mb-4"
                style={{ fontSize: '12px', letterSpacing: '0.1em' }}
              >
                {current.campusLabel}
              </div>

              {/* City Heading */}
              <h3 className="text-black font-bold mb-6" style={{ fontSize: '36px' }}>
                {current.cityName}
              </h3>

              {/* Description */}
              <p
                className="text-gray-700 mb-8 max-w-md"
                style={{ fontSize: '16px', lineHeight: '1.8' }}
              >
                {current.description}
              </p>

              {/* CTA Button */}
              <button
                className="bg-cyan-600 text-white font-bold uppercase tracking-wide rounded-full transition-colors duration-200 hover:bg-cyan-700"
                style={{
                  fontSize: '13px',
                  padding: '14px 32px',
                  borderRadius: '50px'
                }}
              >
                Learn More
              </button>
            </div>

            {/* Right Column - Image */}
            <div>
              <div
                style={{
                  backgroundColor: current.imageBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '500px',
                  borderRadius: '16px',
                  color: '#fff',
                  fontFamily: 'sans-serif',
                  fontSize: '14px'
                }}
              >
                {current.imagePlaceholder}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-8 right-8 flex space-x-4">
            <button
              onClick={prevSlide}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-2xl"
              style={{ fontSize: '24px', fontWeight: '300' }}
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-2xl"
              style={{ fontSize: '24px', fontWeight: '300' }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesLocations;
