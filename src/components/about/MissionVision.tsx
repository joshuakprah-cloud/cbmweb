import React from 'react';
import Link from 'next/link';

interface CardData {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface MissionVisionProps {
  headline?: string;
  eyebrow?: string;
  beliefsCard?: CardData;
  valuesCard?: CardData;
}

export default function MissionVision({ 
  headline = 'We exist so that people far from God will be raised to life in Christ.',
  eyebrow = 'Who We Are',
  beliefsCard = {
    title: 'Our Beliefs',
    description: "What do we believe about God, faith, and the Bible? Check out how God's Word guides our beliefs.",
    ctaText: 'Learn more',
    ctaLink: '/about/beliefs'
  },
  valuesCard = {
    title: 'Our Values',
    description: 'Learn more about the values that keep us focused on what truly matters – reaching people with the gospel.',
    ctaText: 'Learn more',
    ctaLink: '/about/values'
  }
}: MissionVisionProps) {
  return (
    <section 
      role="region" 
      aria-label="Mission and beliefs"
      className="bg-[#111111] py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Eyebrow */}
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
            {eyebrow}
          </span>
          
          {/* Headline */}
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white leading-[1.15] mt-4">
            {headline}
          </h2>
          
          {/* Cross Icon */}
          <div className="mt-10 flex justify-center">
            <svg 
              className="w-10 h-10 text-white/30" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Our Beliefs Card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-[24px] md:text-[28px] font-bold text-white">
              {beliefsCard.title}
            </h3>
            <p className="text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px] mx-auto">
              {beliefsCard.description}
            </p>
            <Link
              href={beliefsCard.ctaLink || '/about/beliefs'}
              className="inline-flex items-center justify-center bg-white text-[#111111] font-semibold py-3 px-8 rounded-full mt-6 hover:bg-gray-100 transition-colors duration-200"
            >
              {beliefsCard.ctaText}
            </Link>
          </div>

          {/* Our Values Card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-[24px] md:text-[28px] font-bold text-white">
              {valuesCard.title}
            </h3>
            <p className="text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px] mx-auto">
              {valuesCard.description}
            </p>
            <Link
              href={valuesCard.ctaLink || '/about/values'}
              className="inline-flex items-center justify-center bg-white text-[#111111] font-semibold py-3 px-8 rounded-full mt-6 hover:bg-gray-100 transition-colors duration-200"
            >
              {valuesCard.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
