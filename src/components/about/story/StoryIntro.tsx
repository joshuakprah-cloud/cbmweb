'use client';

import React from 'react';

interface StoryIntroProps {
  summary?: string;
}

export default function StoryIntro({ summary }: StoryIntroProps) {
  const defaultSummary = `ThaGospel Church began with a vision to reveal Christ within individuals and lead them into divine knowledge that transforms their mindset into that of Christ. What started as a small gathering has grown into a vibrant community of believers across multiple nations.`;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
          {summary || defaultSummary}
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-20 h-1 bg-teal-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
