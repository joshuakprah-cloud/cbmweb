import React from 'react';

const LeadershipGrid: React.FC = () => {
  const leaders = [
    // TODO: Replace with actual leader data from CMS
    {
      name: 'Pastor Powerman Bekoe',
      title: 'Senior Pastor',
      bio: 'Dedicated to leading the congregation with vision and faith.',
      image: 'https://placehold.co/200x200' // TODO: replace with real photo
    },
    {
      name: 'Lady Pastor Name',
      title: 'Associate Pastor',
      bio: 'Committed to spiritual growth and community outreach.',
      image: 'https://placehold.co/200x200' // TODO: replace with real photo
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Leadership</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
              <p className="text-lg text-amber-600 mb-4">{leader.title}</p>
              <p className="text-gray-700 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipGrid;
