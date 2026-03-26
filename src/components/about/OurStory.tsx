import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const OurStory = () => {
  const milestones = [
    { year: '2018', description: 'Church founded with 12 members' },
    { year: '2020', description: 'First permanent building acquired' },
    { year: '2022', description: 'Launched youth ministry program' },
    { year: '2024', description: 'Celebrated 6th anniversary with 500+ members' },
    { year: '2025', description: 'Expanded to new campus location' }
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
            Our Story
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-8">
              Seven Years and Still Building
            </h2>
            
            <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <p className="text-lg">
                // TODO: replace with real church story content
                ThaGospel Church began with a simple vision: to create a place where people could encounter God authentically and build genuine community. What started as a small gathering of 12 people has grown into a vibrant family of faith, united by our love for Jesus and our passion for serving others.
              </p>
              
              <p className="text-lg">
                // TODO: replace with real church story content
                Through seasons of growth and change, our commitment has remained constant: to be a church that reaches people where they are and helps them take their next steps with God. From our first rented room to our current facilities, every milestone has been marked by God's faithfulness and our community's generosity.
              </p>
              
              <p className="text-lg">
                // TODO: replace with real church story content
                As we look to the future, we believe the best is yet to come. Our vision extends beyond our walls to impact our city and world with the transformative love of Jesus Christ. We are building not just a church, but a movement of people committed to living out their faith in tangible ways.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://placehold.co/600x500"
                alt="Church community"
                fill
                className="object-cover"
              />
              {/* TODO: replace with real church photo, candid and authentic, not posed */}
            </div>
          </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="mt-16">
          <div className="hidden lg:flex items-center justify-between relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#2563EB]/20 -translate-y-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className="relative text-center flex flex-col items-center">
                {/* Dot */}
                <div className="w-4 h-4 bg-[#2563EB] rounded-full mb-3 relative z-10"></div>
                
                {/* Year */}
                <div className="text-[#2563EB] font-bold text-lg mb-1">
                  {milestone.year}
                </div>
                
                {/* Description */}
                <div className="text-[#6B7280] text-sm max-w-[120px]">
                  {milestone.description}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-[#2563EB] rounded-full mt-1"></div>
                </div>
                <div>
                  <div className="text-[#2563EB] font-bold text-lg mb-1">
                    {milestone.year}
                  </div>
                  <div className="text-[#6B7280] text-sm">
                    {milestone.description}
                  </div>
                </div>
                 </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
