import React from 'react';

const HistorySection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1">
            {/* Mission Subheading */}
            <h3 className="text-black font-bold mb-10" style={{ fontSize: '30px', lineHeight: '1.3' }}>
              We are: For God.<br />
              For people. For city.<br />
              For world.
            </h3>

            {/* Story Paragraphs */}
            <div className="space-y-6">
              <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                It all started in 2018 with a handful of people gathered in a living room. Prophet Powerman Bekoe felt God stirring something fresh—a church that would be different. Not perfect, but real. Not religious, but relational. We didn't have a building or a budget, but we had a vision: to create a place where people could encounter God authentically.
              </p>
              
              <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Those first gatherings were raw and authentic. Twelve people became twenty, then fifty. We moved from living rooms to rented spaces, always carrying the same conviction: that God loves people exactly where they are, but loves them too much to leave them there. The name "ThaGospel" wasn't just a title—it was our mission, to be good news in every sense of the word.
              </p>
              
              <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Today, we're still that same family, just bigger. We've seen God do things we never imagined—lives changed, families restored, hope reborn. We've grown from one location to multiple campuses, but our heart remains the same: helping people find their way back to God. We're not building an institution; we're building a movement of people who believe Jesus changes everything.
              </p>
            </div>
          </div>

          {/* Right Column - Image and Heading */}
          <div className="order-1 lg:order-2">
            {/* Section Heading */}
            <h2 className="text-black font-bold mb-8 text-left lg:text-left" style={{ fontSize: '68px', lineHeight: '1.1' }}>
              Our History
            </h2>

            {/* Image */}
            <div style={{
              background: '#5a5a5a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '640px',
              height: '700px',
              borderRadius: '20px',
              color: '#ccc',
              fontFamily: 'sans-serif',
              fontSize: '14px'
            }}>
              History Section Image — 640 x 700px
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
