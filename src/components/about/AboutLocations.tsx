import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Location {
  _id: string;
  name: string;
  address?: string;
  city?: string;
  serviceTimes?: string[];
  image?: string;
  mapLink?: string;
  phone?: string;
  email?: string;
}

interface AboutLocationsProps {
  locations: Location[];
}

const experienceCards = [
  {
    title: 'Join us in-person',
    description: 'Worship with us in person at one of our campuses.',
    cta: 'Find a location',
    ctaLink: '/locations',
    image: '/images/campus.jpg',
  },
  {
    title: 'Bring church to you',
    description: 'Gather with your local community to worship together.',
    cta: 'Find a watch party',
    ctaLink: '/watch-parties',
    image: '/images/community.jpg',
  },
  {
    title: 'Join us online',
    description: 'eFam is our online family who stream church from wherever they are.',
    cta: 'Find a time',
    ctaLink: '/watch',
    image: '/images/online.jpg',
  },
  {
    title: 'Pop-Up',
    description: 'Pop-Ups are how we bring the worship experience to a city near you.',
    cta: 'Find a Pop-Up',
    ctaLink: '/popups',
    image: '/images/popup.jpg',
  },
];

export default function AboutLocations({ locations }: AboutLocationsProps) {
  return (
    <section 
      role="region" 
      aria-label="Find the right experience"
      className="bg-[#0a0a0a] py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          {/* Location Pin Icon */}
          <div className="flex justify-center mb-4">
            <MapPinIcon className="w-6 h-6 text-white/50" aria-hidden="true" />
          </div>
          
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white leading-[1.15]">
            Find the right experience for you
          </h2>
          
          <p className="text-[16px] md:text-[18px] text-white/60 leading-[1.7] mt-4 max-w-[700px] mx-auto">
            No matter where you are, there&apos;s a way for you to be part of all God is doing. Whether online or in-person, join us for church and connect with our church community.
          </p>
        </div>

        {/* Experience Cards Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {experienceCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative bg-gray-800">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <MapPinIcon className="w-12 h-12 text-gray-600" aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-[20px] font-bold text-white mb-2">
                  {card.title}
                </h3>
                
                <p className="text-[15px] text-white/60 leading-[1.6] mb-4">
                  {card.description}
                </p>

                <Link
                  href={card.ctaLink}
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-white hover:gap-2 transition-all"
                >
                  {card.cta}
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
