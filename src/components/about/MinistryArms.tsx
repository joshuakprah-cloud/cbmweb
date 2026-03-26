import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MinistryArms = () => {
  const ministries = [
    {
      name: 'Kids',
      hook: 'Faith that starts early',
      href: '/ministries/kids'
    },
    {
      name: 'Youth',
      hook: 'Bold faith for the next generation',
      href: '/ministries/youth'
    },
    {
      name: 'Women',
      hook: 'Community, growth, and belonging',
      href: '/ministries/women'
    },
    {
      name: 'Men',
      hook: 'Leading with purpose and integrity',
      href: '/ministries/men'
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            Our Ministries
          </h2>
          <p className="text-xl text-[#6B7280]">
            Something for every stage of life
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ministries.map((ministry, index) => (
            <Link
              key={index}
              href={ministry.href}
              className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src="https://placehold.co/600x400"
                  alt={`${ministry.name} ministry`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* TODO: replace with real ministry lifestyle photo */}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {ministry.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {ministry.hook}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/ministries"
            className="inline-flex items-center text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors duration-200 ease-in-out"
          >
            Explore All Ministries
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MinistryArms;
