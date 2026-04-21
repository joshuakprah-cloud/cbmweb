'use client';

import React from 'react';
import { urlFor } from '@/sanity/lib/image';

interface FoundationSectionProps {
  founderName: string;
  foundingYear: string;
  founderQuote?: string;
  image?: any;
}

export default function FoundationSection({
  founderName,
  foundingYear,
  founderQuote,
  image,
}: FoundationSectionProps) {
  const imageUrl = image ? urlFor(image).url() : '/images/prophet-bekoe.jpg';

  const defaultQuote = `We are here to help people deepen their faith and discover their purpose. As believers, we embrace our identity as Christ-men, endowed with authority, power, and the divine nature for a supernatural life.`;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt={founderName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-teal-500/10 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-500/5 rounded-full -z-10" />
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-4 block">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Founded in {foundingYear}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {founderQuote || defaultQuote}
            </p>

            <div className="border-l-4 border-teal-500 pl-6 py-2">
              <p className="text-gray-800 font-semibold text-lg">{founderName}</p>
              <p className="text-gray-500">Founder & Overseer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
