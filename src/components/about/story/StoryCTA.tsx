'use client';

import React from 'react';
import Link from 'next/link';

export default function StoryCTA() {
  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Be Part of Our Story
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          We believe everyone has a unique place in God's story. Come experience the transformative power of faith, community, and purpose at ThaGospel Church.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/im-new"
            className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300"
          >
            Plan Your Visit
          </Link>
          <Link
            href="/about/leadership"
            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-full transition-colors duration-300"
          >
            Meet Our Leaders
          </Link>
        </div>

        <p className="mt-8 text-gray-400 text-sm">
          Have questions?{' '}
          <Link href="/connect/contact" className="text-teal-400 hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
}
