import React from 'react';

const VisionMission: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Mission Column */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To spread the gospel of Jesus Christ, nurture spiritual growth, and make disciples who impact their communities and the world for God's kingdom.
            </p>
          </div>

          {/* Vision Column */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To be a vibrant faith community where lives are transformed, leaders are raised, and God's love is demonstrated through service and outreach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
