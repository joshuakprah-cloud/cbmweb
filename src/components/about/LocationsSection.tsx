import React from 'react';

const LocationsSection: React.FC = () => {
  const locations = [
    {
      region: 'Main Campus',
      address: '123 Church Street, Accra, Ghana'
    }
  ];

  return (
    <section className="py-20 bg-[#1F2937] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Where We Are</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold mb-4">{location.region}</h3>
              <p className="text-gray-300">{location.address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
