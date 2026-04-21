import React from 'react';

const values = [
  {
    title: 'Love',
    description: 'We lead with radical, unconditional love — for God, for each other, and for those who don\'t yet know Him. Love is the foundation of everything we do.',
  },
  {
    title: 'Humility',
    description: 'We serve from a posture of humility, knowing that every good thing we carry comes from God alone. We put others before ourselves.',
  },
  {
    title: 'The Word',
    description: 'Scripture is our foundation. Every message, ministry, and decision is anchored in the truth of God\'s Word. We believe the Bible is alive and active.',
  },
  {
    title: 'Impact',
    description: 'We exist to impact nations — starting in our city, extending to the world. We are called to make a difference in our generation.',
  },
];

export default function CoreValues() {
  return (
    <section 
      role="region" 
      aria-label="Our core values"
      className="bg-[#18181b] py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
            What we stand for
          </span>
          <h2 className="text-[36px] md:text-[48px] font-bold text-white mt-3 leading-tight">
            Our Core Values
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/70 mt-4 leading-relaxed max-w-2xl">
            These values guide every decision we make and shape the culture of our church community.
          </p>
        </div>

        {/* Values List */}
        <div className="space-y-10 md:space-y-12">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-white/75 leading-[1.8]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
