import React from 'react';

const ConnectedHero = () => {
  return (
    <section className="flex h-screen" style={{ height: '100vh' }}>
      {/* Left Column - Text */}
      <div className="w-2/5 bg-[#f0f0ee] p-16 lg:p-20 flex flex-col justify-center">
        {/* Tagline */}
        <h1 className="text-black font-serif italic mb-8" style={{ fontSize: '65px', lineHeight: '1.1' }}>
          Find Your Place.<br/>Take Your Next Step.
        </h1>
        
        {/* Intro Paragraph */}
        <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.7', maxWidth: '420px' }}>
          Whether you're new or have been with us for years, there's always a next step. Find a form or pathway that's right for you.
        </p>
      </div>
      
      {/* Right Column - Image */}
      <div className="w-3/5 p-16 lg:p-20 flex items-start justify-center pt-24">
        {/* TODO: Replace with real photo of people connecting in church community — 860 x 680px */}
        <div className="bg-gray-700 flex items-center justify-center w-full min-h-[600px] rounded-[20px] text-gray-400 text-sm font-sans">
          Connected Hero Image — 860 x 680px
        </div>
      </div>
    </section>
  );
};

export default ConnectedHero;
