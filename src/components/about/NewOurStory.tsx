import React from 'react';

const NewOurStory = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            How We Started
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every great story has a beginning. This is ours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                It all started in 2018 with a handful of people gathered in a living room. 
                Prophet Powerman Bekoe felt God stirring something fresh—a church 
                that would be different. Not perfect, but real. Not religious, but relational. 
                We didn't have a building or a budget, but we had a vision: to create a place 
                where people could encounter God without pretense.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Those first gatherings were raw and authentic. Twelve people became twenty, 
                then fifty. We moved from living rooms to rented spaces, always carrying the 
                same conviction: that God loves people exactly where they are, but loves them 
                too much to leave them there. The name "ThaGospel" wasn't just a title—it was 
                our mission, to be good news in every sense of the word.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we're still that same family, just bigger. We've seen God do things 
                we never imagined—lives changed, families restored, hope reborn. We've grown 
                from one location to multiple campuses, but our heart remains the same: 
                helping people find their way back to God. We're not building an institution; 
                we're building a movement of people who believe Jesus changes everything.
              </p>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="order-first lg:order-last">
            <div style={{
              background: '#d1d5db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '600px',
              fontFamily: 'sans-serif',
              color: '#6b7280',
              fontSize: '14px',
              borderRadius: '12px'
            }}>
              Early Church Gathering — 800 x 600px
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2018</div>
              <div className="text-sm text-gray-600">Started with 12 people</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2020</div>
              <div className="text-sm text-gray-600">First permanent space</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2022</div>
              <div className="text-sm text-gray-600">Youth ministry launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2024</div>
              <div className="text-sm text-gray-600">500+ family members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2025</div>
              <div className="text-sm text-gray-600">New campus opened</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewOurStory;
