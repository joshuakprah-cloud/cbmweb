import React from 'react';

interface StoryHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function StoryHero({
  eyebrow = 'Our Journey',
  title = 'Our Story',
  description = "Discover how ThaGospel Church began and grew into the community it is today. Our story is one of faith, perseverance, and God's faithfulness."
}: StoryHeroProps) {
  return (
    <section 
      role="banner"
      className="relative bg-[#0a0a0a] pt-[120px] lg:pt-[140px] pb-16 md:pb-24 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="max-w-4xl mb-16 md:mb-20">
          {/* Eyebrow */}
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
            {eyebrow}
          </span>
          
          {/* Title */}
          <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight mt-4">
            {title}
          </h1>
          
          {/* Description */}
          <p className="text-[17px] md:text-[18px] text-gray-400 leading-[1.6] mt-6 max-w-[700px]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
