import React from 'react';
import { PortableText } from '@portabletext/react';

interface AboutHistoryProps {
  historyTitle?: string;
  historyBody?: any;
}

export default function AboutHistory({ 
  historyTitle = 'How It All Began',
  historyBody 
}: AboutHistoryProps) {
  return (
    <section 
      role="region" 
      aria-label="Our history"
      className="bg-[#f9fafb] border-t border-[#e5e7eb] py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#0d9488] font-medium">
            Our Journey
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111] mt-2.5">
            {historyTitle}
          </h2>
        </div>

        {/* PortableText Content */}
        <div className="max-w-[720px] mx-auto">
          {historyBody ? (
            <div className="prose prose-lg max-w-none text-[#444444] leading-[1.8]">
              <PortableText value={historyBody} />
            </div>
          ) : (
            <p className="text-[17px] text-[#444444] leading-[1.8] text-center">
              Since our founding in 2016, ThaGospel Church has grown from a small gathering of believers to a vibrant community reaching thousands across multiple locations and online. Our journey has been marked by faith, miracles, and countless lives transformed by the power of God.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
