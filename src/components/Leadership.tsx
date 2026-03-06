import React from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

interface LeadershipProps {
  prophetName?: string;
  prophetTitle?: string;
  prophetImage?: any;
  firstLadyName?: string;
  firstLadyTitle?: string;
  firstLadyImage?: any;
  leadersWelcomeMessage?: string;
}

export default function Leadership({
  prophetName = "Prophet Name",
  prophetTitle = "Lead Prophet",
  prophetImage,
  firstLadyName = "First Lady Name",
  firstLadyTitle = "First Lady",
  firstLadyImage,
  leadersWelcomeMessage = "Welcome to ThaGospel Church. Our heart is to raise believers rooted in truth and empowered for impact across nations."
}: LeadershipProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Meet Our Spiritual Leaders</h2>

        {/* Leaders Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Prophet */}
          <div className="text-center">
            <div className="relative w-64 h-80 mx-auto mb-4">
              <Image
                src={prophetImage ? urlFor(prophetImage).url() : '/placeholder-prophet.jpg'}
                alt={prophetName}
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{prophetName}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{prophetTitle}</p>
          </div>

          {/* First Lady */}
          <div className="text-center">
            <div className="relative w-64 h-80 mx-auto mb-4">
              <Image
                src={firstLadyImage ? urlFor(firstLadyImage).url() : '/placeholder-firstlady.jpg'}
                alt={firstLadyName}
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{firstLadyName}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{firstLadyTitle}</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{leadersWelcomeMessage}</p>
        </div>
      </div>
    </section>
  );
}
