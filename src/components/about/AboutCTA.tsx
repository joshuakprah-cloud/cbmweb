import React from 'react';
import Link from 'next/link';

interface AboutCTAProps {
  headline?: string;
  subtext?: string;
  primaryText?: string;
  primaryLink?: string;
}

export default function AboutCTA({
  headline = "Ready to plan your visit?",
  subtext = "Make plans to join us this Sunday!",
  primaryText = "Find an experience",
  primaryLink = "/plan-your-visit",
}: AboutCTAProps) {
  return (
    <section
      role="region"
      aria-label="Call to action"
      className="bg-black py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-2xl mx-auto">
        {/* Card */}
        <div className="bg-[#1a1a1a] rounded-2xl py-12 px-8 md:py-16 md:px-12 text-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#111111]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L4 12h4l2 8 4-10h4l-6-8z" />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-[22px] md:text-[26px] font-bold text-white leading-tight">
            {headline}
          </h2>

          {/* Subtext */}
          <p className="text-[14px] text-white/60 mt-2">
            {subtext}
          </p>

          {/* Button */}
          <div className="mt-6">
            <Link
              href={primaryLink}
              className="inline-flex items-center justify-center bg-white text-[#111111] font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200 text-[14px] min-w-[200px]"
            >
              {primaryText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
