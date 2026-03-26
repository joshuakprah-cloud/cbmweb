'use client';

import React, { useState } from 'react';

const NewCoreValues = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const values = [
    {
      number: "01",
      title: "Our Vision",
      description: "We see a city transformed by God's presence - where every person encounters Jesus, every family is restored, and every neighborhood flourishes with hope and purpose. Our vision is not just about growing numbers, but about growing people who impact their world for Christ.",
      image: "Value 01 Image — 720x480px"
    },
    {
      number: "02", 
      title: "Our Mission",
      description: "We exist to help people find their way back to God. We do this by creating authentic community where people can belong, believe, and become all God created them to be. Our mission is both personal and global - reaching one person at a time while thinking about the whole world.",
      image: "Value 02 Image — 720x480px"
    },
    {
      number: "03",
      title: "Core Values", 
      description: "Our values guide how we live out our vision and mission. They shape our culture, decisions, and relationships. These aren't just words on a wall - they are the principles that define who we are and how we do life together as God's family.",
      image: "Core Value 03 Image — 640 x 360px"
    },
    {
      number: "04",
      title: "We Build Family", 
      description: "Church isn't a building but a people. We're committed to authentic relationships, mutual care, and doing life together. From small groups to Sunday gatherings, we're building spiritual family that lasts.",
      image: "Core Value 04 Image — 640 x 360px"
    },
    {
      number: "05",
      title: "We Serve The City",
      description: "We love our city because God loves our city. We're actively involved in community transformation through service, justice initiatives, and partnerships that bring hope to every neighborhood.",
      image: "Core Value 05 Image — 640 x 360px"
    }
  ];

  const toggleValue = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-12 lg:p-16 relative"
          style={{ backgroundColor: '#e8e6df' }}
        >
          {/* Accordion Values */}
          <div className="space-y-0">
          {values.map((value, index) => (
            <div key={index} className="border-b border-gray-300 last:border-b-0">
              {/* Clickable Row */}
              <div
                onClick={() => toggleValue(index)}
                className="flex items-center py-6 cursor-pointer hover:bg-gray-100/50 transition-colors duration-200"
              >
                {/* Left: Number */}
                <div className="w-20 flex-shrink-0">
                  <span 
                    className="text-6xl font-light text-gray-400"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      opacity: 0.3
                    }}
                  >
                    {value.number}
                  </span>
                </div>

                {/* Center: Title */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
                    {value.title}
                  </h3>
                </div>

                {/* Right: Plus/Minus Icon */}
                <div className="w-8 flex-shrink-0 flex justify-center">
                  <span className="text-2xl text-gray-600 font-light">
                    {expandedIndex === index ? '−' : '+'}
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: expandedIndex === index ? '600px' : '0px',
                  transition: 'max-height 0.4s ease'
                }}
              >
                <div className="px-6 pb-8">
                  <div className="ml-20">
                    <p className="text-base leading-relaxed text-gray-700 mb-6">
                      {value.description}
                    </p>
                    
                    {/* Image Placeholder */}
                    <div className="mb-6">
                      <div style={{
                        background: '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '320px',
                        fontFamily: 'sans-serif',
                        color: '#6b7280',
                        fontSize: '14px',
                        borderRadius: '8px'
                      }}>
                        {value.image}
                      </div>
                    </div>

                    {/* Learn More Link */}
                    <button className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default NewCoreValues;
