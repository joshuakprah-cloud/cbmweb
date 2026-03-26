import React from 'react';
import { 
  FlagIcon, 
  UserGroupIcon, 
  GiftIcon, 
  MusicalNoteIcon, 
  HandRaisedIcon, 
  HomeIcon 
} from '@heroicons/react/24/outline';

const OurValues = () => {
  const values = [
    {
      icon: FlagIcon,
      title: 'Faith',
      description: 'Everything we do is rooted in faith in Jesus Christ. He is the foundation of our house.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community',
      description: 'We are better together. We build genuine relationships that go beyond Sunday morning.'
    },
    {
      icon: GiftIcon,
      title: 'Generosity',
      description: 'We are a giving church. We give our time, resources, and love freely and without condition.'
    },
    {
      icon: MusicalNoteIcon,
      title: 'Worship',
      description: 'Worship is our response to who God is. We pursue authentic and Spirit-led worship in everything we do.'
    },
    {
      icon: HandRaisedIcon,
      title: 'Service',
      description: 'We exist to serve our city and our world. Practical love in action is central to our DNA.'
    },
    {
      icon: HomeIcon,
      title: 'Belonging',
      description: 'Everyone is welcome here. We build a house where every person feels seen, known, and valued.'
    }
  ];

  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            Our Values
          </h2>
          <p className="text-xl text-[#6B7280]">
            The heartbeat behind everything we do
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <value.icon className="w-12 h-12 text-[#2563EB]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#111827] text-center mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-[#6B7280] text-center leading-relaxed">
                // TODO: replace with real church values
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
