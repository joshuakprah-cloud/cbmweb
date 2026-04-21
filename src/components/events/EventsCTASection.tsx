'use client';

import Link from 'next/link';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';
import { MapPinIcon, PlayIcon } from '@heroicons/react/24/outline';

const EventsCTASection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-teal-50 to-blue-50" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            id="cta-heading" 
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Not sure where to start?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;d love to meet you! Plan your visit or join us online this weekend.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={EVENTS_FALLBACKS.ctaSection.planVisitUrl}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all duration-300 hover:scale-105 font-semibold text-sm shadow-lg"
            >
              <MapPinIcon className="w-4 h-4" aria-hidden="true" />
              {EVENTS_FALLBACKS.ctaSection.planYourVisit}
            </Link>
            
            <Link
              href={EVENTS_FALLBACKS.ctaSection.watchUrl}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition-all duration-300 hover:scale-105 font-semibold text-sm"
            >
              <PlayIcon className="w-4 h-4" aria-hidden="true" />
              {EVENTS_FALLBACKS.ctaSection.watchOnline}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCTASection;
