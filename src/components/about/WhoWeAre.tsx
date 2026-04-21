import React from 'react';

interface WhoWeAreProps {
  title?: string;
  description?: string;
}

export default function WhoWeAre({
  title = 'Who We Are',
  description = "ThaGospel Church is a community rooted in love and humility. We exist to raise Christ-minded people who carry the Gospel into every area of their lives. Whoever you are, wherever you're coming from, there is a place for you here."
}: WhoWeAreProps) {
  return (
    <section 
      role="region" 
      aria-label="Who we are"
      className="bg-[#0a0a0a] py-16 md:py-24 px-6 md:px-20 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
          {title}
        </span>
        
        {/* Description */}
        <p className="text-[18px] md:text-[22px] text-white/80 leading-[1.7] mt-6">
          {description}
        </p>
      </div>
    </section>
  );
}
