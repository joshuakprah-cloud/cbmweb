import React from 'react';

const Locations = () => {
  const campuses = [
    {
      name: "Main Campus",
      neighborhood: "Downtown",
      description: "Our original home where it all began. This gathering feels like family—intimate, authentic, and full of energy. We worship passionately, pray boldly, and leave changed every week.",
      serviceTimes: "Sundays at 9:00 AM & 11:30 AM",
      image: "Main Campus — 800 x 533px"
    },
    {
      name: "North Campus", 
      neighborhood: "Cumberland",
      description: "A vibrant community gathering in the northern part of the city. This location brings the same passion and presence of God with a neighborhood feel. Come as you are, leave changed.",
      serviceTimes: "Sundays at 10:00 AM",
      image: "North Campus — 800 x 533px"
    },
    {
      name: "West Campus",
      neighborhood: "West End", 
      description: "Our newest campus serving the western communities. Same heart, same mission, new location. We're building authentic community and helping people encounter God in powerful ways.",
      serviceTimes: "Sundays at 10:30 AM",
      image: "West Campus — 800 x 533px"
    }
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Where We Gather
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find a location near you and join us this weekend.
          </p>
        </div>

        {/* Campuses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campuses.map((campus, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Campus Image */}
              <div style={{
                background: '#d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '240px',
                fontFamily: 'sans-serif',
                color: '#6b7280',
                fontSize: '14px'
              }}>
                {campus.image}
              </div>

              {/* Campus Content */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {campus.neighborhood}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {campus.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {campus.description}
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">{campus.serviceTimes}</span>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Online Campus */}
        <div className="mt-12 bg-blue-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Can't Join in Person?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our online gathering every Sunday. Same message, same worship, same community—just from wherever you are.
          </p>
          <button className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Watch Online
          </button>
        </div>
      </div>
    </section>
  );
};

export default Locations;
