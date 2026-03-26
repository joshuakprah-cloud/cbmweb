import React from 'react';

const LeadershipHero = () => {
  return (
    <section className="bg-[#111827] py-20 relative">
      {/* Subtle CSS grain texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
      
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center">
          Meet Our Leadership
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Dedicated servants committed to guiding our community in faith, love, and purpose.
        </p>
      </div>
    </section>
  );
};

export default LeadershipHero;
