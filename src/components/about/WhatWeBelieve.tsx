import React from 'react';
import { 
  BookOpenIcon, 
  SparklesIcon, 
  HeartIcon, 
  HomeIcon, 
  UserGroupIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const WhatWeBelieve = () => {
  const beliefs = [
    {
      category: 'The Bible',
      title: 'Divine Inspiration',
      description: 'We believe the Bible is the inspired and authoritative Word of God.'
    },
    {
      category: 'Jesus Christ',
      title: 'Fully Human, Fully Divine',
      description: 'We believe Jesus is the Son of God, fully human and fully divine, who died and rose again for our salvation.'
    },
    {
      category: 'The Holy Spirit',
      title: 'Active Presence',
      description: 'We believe in the person and power of the Holy Spirit active in the world and in the life of every believer.'
    },
    {
      category: 'Salvation',
      title: 'Gift of Grace',
      description: 'We believe salvation is a free gift of grace received through faith in Jesus Christ.'
    },
    {
      category: 'The Church',
      title: 'God\'s Vehicle',
      description: 'We believe the local church is God\'s primary vehicle for bringing hope and healing to the world.'
    },
    {
      category: 'Eternity',
      title: 'Eternal Promise',
      description: 'We believe in the resurrection of the dead and the promise of eternal life for all who put their trust in Jesus.'
    }
  ];

  return (
    <section className="bg-[#111827] py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What We Believe
          </h2>
          <p className="text-xl text-gray-300">
            We are a Bible-believing, Jesus-centered church
          </p>
        </div>

        {/* Beliefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beliefs.map((belief, index) => (
            <div key={index} className="space-y-3">
              {/* Category Label */}
              <span className="inline-block bg-[#2563EB]/20 text-[#2563EB] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                {belief.category}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white">
                {belief.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                // TODO: replace with real statement of faith
                {belief.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/beliefs"
            className="inline-flex items-center border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#111827] transition-all duration-200 ease-in-out"
          >
            Read Our Full Statement of Faith
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;
