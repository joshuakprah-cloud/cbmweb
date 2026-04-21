'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, HeartIcon, SparklesIcon, UsersIcon, CalendarIcon, MusicalNoteIcon, BookOpenIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { urlFor } from '../../../sanity/lib/image';

interface ExpectationItem {
  title: string;
  description: string;
  icon: string;
  order?: number;
  image?: any;
  number?: string;
}

interface WhatToExpectProps {
  title?: string;
  headline?: string;
  description?: string;
  expectations?: ExpectationItem[];
}

// Extended icon mapping function
const getIconComponent = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'map-pin':
    case 'mappin':
    case 'mappinicon':
      return MapPinIcon;
    case 'heart':
    case 'hearticon':
      return HeartIcon;
    case 'sparkles':
    case 'sparklesicon':
      return SparklesIcon;
    case 'users':
    case 'usersicon':
      return UsersIcon;
    case 'calendar':
    case 'calendaricon':
      return CalendarIcon;
    case 'music':
    case 'musicalnote':
    case 'musicalnoteicon':
      return MusicalNoteIcon;
    case 'bible':
    case 'book':
    case 'bookopen':
    case 'bookopenicon':
      return BookOpenIcon;
    case 'photo':
    case 'image':
    case 'imageicon':
      return PhotoIcon;
    default:
      return MapPinIcon;
  }
};

// Placeholder background colors for each card
const placeholderColors = [
  '#1a2e2e', // Card 1: dark teal-black
  '#1a1a2e', // Card 2: dark navy
  '#2e1a1a'  // Card 3: dark warm-black
];

// Fallback expectations data
const fallbackExpectations: ExpectationItem[] = [
  {
    number: "01",
    icon: "book",
    title: "Powerful Sermons",
    description: "Spirit-filled messages rooted in the Word of God that challenge, inspire, and transform your life.",
    image: null
  },
  {
    number: "02",
    icon: "music",
    title: "Vibrant Worship",
    description: "From high-energy praise to deep moments of worship, every service is designed to bring you into God's presence.",
    image: null
  },
  {
    number: "03",
    icon: "sparkles",
    title: "Spirit-Led Prayer",
    description: "Encounter God through powerful corporate prayer and prophetic ministry that moves mountains.",
    image: null
  }
];

const WhatToExpect = ({
  title = "First Time Here?",
  headline = "Here's What to Expect",
  description = "We want your first visit to feel easy, warm, and worth your time.",
  expectations = []
}: WhatToExpectProps) => {
  // Use fallback if no CMS data
  const displayExpectations = expectations.length > 0 ? expectations : fallbackExpectations;

  return (
    <section
      id="what-to-expect"
      className="bg-[#111111]"
      aria-label="What to expect at ThaGospel Church"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-20">
        {/* Section Header - Centered */}
        <div className="text-center max-w-[560px] mx-auto mb-12">
          {/* Eyebrow */}
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#2dd4bf] font-medium">
            {title}
          </span>

          {/* Headline */}
          <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-white leading-[1.15] mt-2.5">
            {headline}
          </h2>

          {/* Description */}
          <p className="text-[16px] sm:text-[17px] text-white/65 leading-[1.7] mt-3.5">
            {description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayExpectations.map((item, index) => {
            const IconComponent = getIconComponent(item.icon);
            const itemNumber = item.number || String(index + 1).padStart(2, '0');
            const hasImage = item.image;
            const placeholderColor = placeholderColors[index % placeholderColors.length];

            return (
              <div
                key={index}
                className="relative h-[340px] sm:h-[380px] rounded-2xl overflow-hidden"
                aria-label={hasImage ? undefined : `${item.title} — Service photo coming soon`}
              >
                {/* Background Image or Placeholder */}
                {hasImage ? (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor: placeholderColor,
                      backgroundImage: `radial-gradient(circle at 30% 70%, rgba(13,148,136,0.15) 0%, transparent 60%)`
                    }}
                  >
                    <PhotoIcon className="w-8 h-8 text-white/20" aria-hidden="true" />
                  </div>
                )}

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)'
                  }}
                  aria-hidden="true"
                />

                {/* Number Badge */}
                <div
                  className="absolute top-5 left-5 w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold text-white backdrop-blur-sm"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)'
                  }}
                >
                  {itemNumber}
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10">
                  {/* Icon */}
                  <div className="w-9 h-9 bg-[#0d9488] rounded-lg flex items-center justify-center mb-3">
                    <IconComponent className="w-[18px] h-[18px] text-white" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] sm:text-[14px] text-white/80 leading-[1.6] line-clamp-2 sm:line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/plan-your-visit"
            className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold py-3.5 px-8 rounded-lg transition-colors duration-200 text-[15px] w-full sm:w-auto"
            aria-label="Join us this Sunday at ThaGospel Church"
          >
            Join Us Sunday
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
