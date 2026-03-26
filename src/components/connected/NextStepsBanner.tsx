import React from 'react';
import Link from 'next/link';

const NextStepsBanner = () => {
  return (
    <section className="bg-[#111827] py-20 relative overflow-hidden">
      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Not Sure Where To Start?
        </h2>
        
        <p className="text-base text-white/80 max-w-3xl mx-auto mb-8">
          If you are new, the best first step is simply showing up. We will take care of the rest.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/about/new-here"
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 inline-block text-center"
          >
            Plan Your Visit
          </Link>
          
          <Link
            href="/connect/contact"
            className="border border-white text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:bg-white hover:text-[#111827] inline-block text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NextStepsBanner;
