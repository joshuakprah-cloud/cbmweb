'use client';

import Link from 'next/link';
import { ClockIcon, CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Service {
  name?: string;
  serviceType?: string;
  day?: string;
  time?: string;
  location?: string;
  showOnHomepage?: boolean;
}

interface ServiceTimesStripProps {
  serviceTimes?: Service[];
}

// Hardcoded fallback services (only 3, no Allnight or Counseling)
const fallbackServices = [
  {
    name: 'Feast of Manna',
    day: 'Sunday',
    time: '9:00 AM – 12:00 PM'
  },
  {
    name: 'Prophetic Encounter',
    day: 'Wednesday',
    time: '6:00 PM – 8:30 PM'
  },
  {
    name: 'The Youth Church',
    day: 'Friday',
    time: '6:00 PM – 8:00 PM'
  }
];

const ServiceTimesStrip = ({ serviceTimes }: ServiceTimesStripProps) => {
  // Filter and transform Sanity data if available
  const getServices = () => {
    if (!serviceTimes || serviceTimes.length === 0) {
      return fallbackServices;
    }

    // Filter: showOnHomepage true, exclude Allnight and Counseling
    const filtered = serviceTimes.filter((service) => {
      const displayName = (service.name || service.serviceType || '').toLowerCase();
      const isExcluded = displayName.includes('allnight') || displayName.includes('counseling');
      return service.showOnHomepage !== false && !isExcluded;
    });

    // Map to display format, limit to 3
    // Use 'name' if available, otherwise fall back to 'serviceType' for backwards compatibility
    return filtered.slice(0, 3).map((service) => ({
      name: service.name || service.serviceType || 'Service',
      day: service.day || 'Sunday',
      time: service.time || '9:00 AM'
    }));
  };

  const services = getServices();

  return (
    <section id="services" className="bg-white border-b border-[#e5e7eb]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-10 lg:py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {/* Eyebrow */}
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#0d9488] font-medium">
              WEEKLY SERVICES
            </span>
            {/* Heading */}
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#111111] mt-1.5">
              Come As You Are
            </h2>
          </div>
          {/* View All Link - desktop only */}
          <Link
            href="/plan-your-visit"
            className="hidden sm:flex items-center gap-1 text-[14px] text-[#0d9488] font-medium hover:underline"
            aria-label="View all church service times and information"
          >
            View All Services
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-7 hover:border-[#0d9488] transition-colors duration-200"
            >
              {/* Day Badge */}
              <span className="inline-block bg-[#e6fffa] text-[#0f766e] text-[11px] uppercase tracking-[0.1em] font-semibold px-2.5 py-1 rounded-md">
                {service.day}
              </span>

              {/* Service Name */}
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111] mt-4 mb-1.5">
                {service.name}
              </h3>

              {/* Time */}
              <div className="flex items-center gap-1.5 text-[14px] sm:text-[15px] text-[#555555]">
                <ClockIcon className="w-4 h-4 text-[#0d9488]" aria-hidden="true" />
                {service.time}
              </div>

              {/* Footer - Add to Calendar */}
              <div className="mt-5 pt-4 border-t border-[#e5e7eb]">
                <button
                  className="flex items-center gap-1 text-[13px] text-[#0d9488] font-medium hover:underline"
                  aria-label={`Add ${service.name} to your calendar`}
                >
                  <CalendarIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <Link
          href="/plan-your-visit"
          className="sm:hidden flex items-center justify-center gap-1 text-[14px] text-[#0d9488] font-medium mt-6"
          aria-label="View all church service times and information"
        >
          View All Services
          <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
        </Link>

        {/* Bottom CTA */}
        <div className="flex items-center justify-center mt-9">
          <Link
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold py-3 px-7 rounded-lg transition-colors duration-200 text-[14px]"
            aria-label="Get directions to ThaGospel Church on Google Maps"
          >
            Get Directions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceTimesStrip;
