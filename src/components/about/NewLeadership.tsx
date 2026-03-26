import React from 'react';

const NewLeadership = () => {
  const leaders = [
    {
      name: "Prophet Powerman Bekoe",
      title: "Lead Pastor",
      bio: "Powerman founded ThaGospel Church in 2018 with a vision to create a place where people could encounter God authentically. His preaching combines biblical truth with practical application, helping people understand how faith applies to everyday life. He's passionate about raising leaders who will impact their communities for Christ. Powerman and his wife have been married for over 15 years and have two children.",
      image: "Prophet Powerman Photo — 400 x 400px"
    },
    {
      name: "Lady Pastor [Name]",
      title: "Associate Pastor", 
      bio: "Lady Pastor has been instrumental in building the community and discipleship culture of ThaGospel Church. She leads with wisdom and compassion, creating spaces where people can grow in their faith and find healing. Her ministry focuses on empowering women and strengthening families through biblical teaching and practical support. She brings over a decade of ministry experience and a heart for seeing people transformed by God's love.",
      image: "Lady Pastor Photo — 400 x 400px"
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our Leadership
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The people God has called to lead and serve our family.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {leaders.map((leader, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Leader Photo */}
              <div className="mb-6">
                <div style={{
                  background: '#d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '240px',
                  height: '240px',
                  fontFamily: 'sans-serif',
                  color: '#6b7280',
                  fontSize: '14px',
                  borderRadius: '50%'
                }}>
                  {leader.image}
                </div>
              </div>

              {/* Leader Info */}
              <div className="max-w-md">
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 block">
                  {leader.title}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {leader.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg">
            See Full Leadership Team
          </button>
        </div>

        {/* Leadership Philosophy */}
        <div className="mt-20 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            How We Lead
          </h3>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            We believe leadership isn't about position—it's about service. Our leaders lead from the front, 
            not from above. They're shepherds who know their sheep, not CEOs who manage employees. 
            We value character over charisma, substance over style, and faithfulness over fame. 
            Every leader at ThaGospel is first and foremost a follower of Jesus, committed to growing 
            in their own walk with God as they help others grow in theirs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewLeadership;
