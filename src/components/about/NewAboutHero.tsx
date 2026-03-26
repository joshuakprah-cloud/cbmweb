import React from 'react';

const NewAboutHero: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="flex h-screen" style={{ height: '100vh' }}>
        {/* Left Column - Text */}
        <div className="w-2/5 bg-white flex flex-col justify-start pl-20 pr-16 pt-40">
          {/* Page Label */}
          <div className="text-black font-bold mb-4" style={{ fontSize: '100px', lineHeight: '0.9', fontFamily: 'sans-serif' }}>
            US
          </div>

          {/* Tagline */}
          <div className="mb-4 ml-12" style={{ fontFamily: 'Georgia, serif' }}>
            <h1 className="text-black font-light mb-1" style={{ fontSize: '50px', lineHeight: '1.1' }}>
              For God.
            </h1>
            <h1 className="text-black font-light mb-1" style={{ fontSize: '50px', lineHeight: '1.1' }}>
              For People.
            </h1>
            <h1 className="text-black font-light" style={{ fontSize: '50px', lineHeight: '1.1' }}>
              For the City.
            </h1>
          </div>

          {/* Identity Paragraph */}
          <p className="text-gray-700 max-w-md ml-12" style={{ fontSize: '15px', lineHeight: '1.7' }}>
            We are a family of imperfect people following a perfect Jesus. We believe the church isn't a building but a people, and that God's love changes everything. We're here to help people find their way back to God.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="w-3/5 bg-white flex items-start justify-center p-12 pt-24">
          <div style={{
            background: '#3a3a3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            minHeight: '600px',
            borderRadius: '20px',
            color: '#999',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            marginTop: '0px'
          }}>
            Hero Image — 860 x 680px
          </div>
        </div>
      </section>
    </>
  );
};

export default NewAboutHero;
