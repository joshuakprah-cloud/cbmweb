import React from 'react';

const LeadershipSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            <div style={{
              background: '#3a3a3a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '620px',
              height: '640px',
              borderRadius: '18px',
              color: '#999',
              fontFamily: 'sans-serif',
              fontSize: '14px'
            }}>
              Lead Pastor(s) Photo — 620 x 640px
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="order-1 lg:order-2 lg:pl-20">
            {/* Section Label */}
            <div className="mb-4">
              <span 
                className="text-gray-600 italic"
                style={{ 
                  fontSize: '20px',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Our Leadership
              </span>
            </div>

            {/* Name Heading */}
            <h2 className="text-black font-bold mb-6" style={{ fontSize: '58px', lineHeight: '1.1' }}>
              Prophet Powerman Bekoe + Lady Pastor
            </h2>

            {/* Bio Paragraph */}
            <p 
              className="text-gray-700 mb-8 max-w-lg"
              style={{ fontSize: '16px', lineHeight: '1.7' }}
            >
              Prophet Powerman Bekoe is the founder and lead pastor of ThaGospel Church, carrying a God-given vision to build authentic community where people encounter God's presence. With over a decade of ministry experience, he leads with a passion for seeing lives transformed through the power of the Gospel. Lady Pastor serves alongside him, bringing wisdom and grace to pastoral care and discipleship ministries. Together they lead a growing movement of believers committed to making Jesus known in every sphere of life.
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
              See Our Leadership
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
