import React from 'react';
import Link from 'next/link';

interface BeliefsCTAProps {
  headline?: string;
  subtext?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  background?: 'dark' | 'teal';
}

export default function BeliefsCTA({
  headline = "Ready to plan your visit?",
  subtext = "Now that you've gotten to know us a little better, we'd love to meet you! Consider this your invitation to join us for church on Sunday.",
  primaryText = "Find an experience",
  primaryLink = "/plan-your-visit",
  secondaryText,
  secondaryLink,
  background = 'dark',
}: BeliefsCTAProps) {
  const bgClass = background === 'teal' ? 'bg-[#0d9488]' : 'bg-[#111111]';

  return (
    <section 
      role="region" 
      aria-label="Call to action"
      className={`${bgClass} py-20 md:py-[80px] px-6 md:px-20`}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-white leading-tight">
          {headline}
        </h2>

        {/* Description */}
        <p className="text-[16px] md:text-[17px] text-white/60 mt-4 leading-[1.6] max-w-[560px] mx-auto">
          {subtext}
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryLink}
            className="inline-flex items-center justify-center bg-[#0d9488] text-white font-semibold py-3 px-7 rounded-lg hover:bg-[#0f766e] transition-colors duration-200 text-[15px] min-w-[180px]"
          >
            {primaryText}
          </Link>
          
          {secondaryText && secondaryLink && (
            <Link
              href={secondaryLink}
              className="inline-flex items-center justify-center bg-transparent text-white border border-white/40 font-semibold py-3 px-7 rounded-lg hover:bg-white/10 transition-colors duration-200 text-[15px] min-w-[180px]"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
