import React from 'react';
import Link from 'next/link';

const GetConnectedBanner = () => {
  return (
    <section className="bg-[#1F2937] py-24 relative">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#2563EB]/5 to-transparent"></div>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready To Be Part of Something?
        </h2>
        
        {/* Subline */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Take your next step with us today.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/about/new-here"
            className="bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#1D4ED8] hover:scale-105 transition-all duration-200 ease-in-out"
          >
            I'm New Here
          </Link>
          <Link
            href="/give"
            className="border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-[#111827] transition-all duration-200 ease-in-out"
          >
            Give
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetConnectedBanner;
