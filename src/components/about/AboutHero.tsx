import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
             style={{ backgroundImage: 'url(https://placehold.co/1920x1080)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">ThaGospel Church</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          A vibrant faith community dedicated to raising leaders, shaping visions, and influencing society through Christ.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
