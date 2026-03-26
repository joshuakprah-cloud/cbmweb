import React from 'react';
import Link from 'next/link';

const JoinTeamBanner = () => {
  return (
    <section className="bg-[#111827] py-24 relative">
      {/* Subtle CSS grain texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
      
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Passionate About People and Purpose?
        </h2>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          We are always looking for gifted, called, and committed people to join our team.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/careers"
            className="bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#1D4ED8] hover:scale-105 transition-all duration-200 ease-in-out"
          >
            View Open Roles
          </Link>
          <Link
            href="/connect"
            className="border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-[#111827] transition-all duration-200 ease-in-out"
          >
            Volunteer With Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamBanner;
