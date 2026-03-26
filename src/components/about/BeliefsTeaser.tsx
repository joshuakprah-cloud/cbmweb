import React from 'react';

const BeliefsTeaser: React.FC = () => {
  return (
    <section className="bg-white py-20 mt-16">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Column - Image */}
        <div className="w-full lg:w-[45%] pl-8 lg:pl-16 pr-8 lg:pr-0 mb-12 lg:mb-0">
          <div style={{
            background: '#4a7fa5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '640px',
            height: '680px',
            borderRadius: '20px',
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          }}>
            Beliefs Section Image — 640 x 680px
          </div>
        </div>

        {/* Right Column - Text */}
        <div className="w-full lg:w-[55%] pl-8 lg:pl-20 pr-8 lg:pr-16">
          {/* Section Label */}
          <div className="mb-6">
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '20px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Our Theological Truths
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-black font-bold mb-6" style={{ fontSize: '68px', lineHeight: '1.1' }}>
            What We Believe
          </h2>

          {/* Paragraph */}
          <p className="text-gray-700 mb-8 max-w-lg" style={{ fontSize: '16px', lineHeight: '1.7' }}>
            We live in shifting times but are rooted in eternal truths. Our beliefs anchor us in God's unchanging character while empowering us to engage with today's world with wisdom, grace, and conviction. We hold to the historic Christian faith as revealed in Scripture.
          </p>

          {/* CTA Button */}
          <button 
            className="bg-cyan-600 text-white font-bold uppercase tracking-wide rounded-full transition-colors duration-200 hover:bg-cyan-700"
            style={{ 
              fontSize: '13px',
              padding: '14px 32px',
              borderRadius: '50px'
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeliefsTeaser;
