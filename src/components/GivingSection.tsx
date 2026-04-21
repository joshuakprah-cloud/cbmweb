'use client';

import Link from 'next/link';
import { ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface GivingSectionProps {
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  trustLine?: string;
  backgroundImage?: string;
}

const GivingSection = ({
  eyebrow = 'GENEROSITY',
  headline = 'Honor God Through Your Giving',
  subtext = 'Your generosity helps us reach people, serve our community, and share the message of Christ—every week.',
  ctaText = 'Give Today',
  ctaLink = '/give',
  trustLine = 'Secure. Simple. Making a real impact.',
  backgroundImage,
}: GivingSectionProps) => {
  return (
    <section className="relative py-12 md:py-16 px-4 md:px-8 overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
        {/* Eyebrow */}
        <p className="text-teal-400 text-xs md:text-sm uppercase tracking-[0.15em] font-semibold mb-3">
          {eyebrow}
        </p>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white">
          {headline}
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg mb-8 text-white/90">
          {subtext}
        </p>

        {/* CTA Button */}
        <Link
          href={ctaLink}
          className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg text-sm md:text-base tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          {ctaText}
          <ArrowRightIcon className="ml-2 w-5 h-5" />
        </Link>

        {/* Trust Line */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <ShieldCheckIcon className="w-4 h-4 text-teal-400" />
          <p className="text-xs md:text-sm text-white/70">
            {trustLine}
          </p>
        </div>
      </div>
    </section>
  );
};

export default GivingSection;
