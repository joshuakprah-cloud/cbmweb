import Link from 'next/link';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ServiceTime {
  label?: string;
  day?: string;
  timeRange?: string;
  time?: string;
  location?: string;
}

interface ServiceTimesStripProps {
  serviceTimes?: ServiceTime[];
}

const ServiceTimesStrip = ({ serviceTimes }: ServiceTimesStripProps) => {
  // Transform Sanity data format to our display format
  const transformServiceTimes = (times: ServiceTime[] | undefined) => {
    if (!times || times.length === 0) return null;
    
    return times.map((service: ServiceTime) => ({
      label: service.label || 'Service',
      day: service.day || 'Sunday',
      timeRange: service.timeRange || service.time || '9:00 AM - 12:00 PM',
      location: service.location || 'Main Campus'
    }));
  };

  const transformedServices = transformServiceTimes(serviceTimes);

  // Fallback service times if no CMS data
  const defaultServices = [
    { label: 'FEAST OF MANNA', day: 'Sunday', timeRange: '9:00 AM - 12:00 PM', location: 'Main Campus' },
    { label: 'THE YOUTH CHURCH', day: 'Friday', timeRange: '6:00 PM - 8:00 PM', location: 'Main Campus' },
    { label: 'PROPHETIC ENCOUNTER SERVICE', day: 'Wednesday', timeRange: '6:00 PM - 8:30 PM', location: 'Main Campus' },
    { label: 'ALLNIGHT SERVICE', day: 'First Friday of the Month', timeRange: '10:00 PM - 4:00 AM', location: 'Main Campus' },
    { label: 'COUNSELING', day: 'Any Day', timeRange: 'After Every Service', location: 'Main Campus' }
  ];

  const services = transformedServices || defaultServices;

  // Fallback UI when no service times available
  if (!services || services.length === 0) {
    return (
      <section id="services" className="bg-neutral-900 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-500 italic text-sm tracking-widest">
            GATHER WITH US
          </span>
          <h2 className="text-white font-bold mt-4 mb-8" style={{ fontSize: '48px', lineHeight: '1.1' }}>
            Service Times
          </h2>
          <p className="text-gray-400 text-lg">
            Service schedule coming soon. Please check back later or contact us for current service times.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Section Label */}
          <span 
            className="text-teal-600 italic"
            style={{ 
              fontSize: '12px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.15em'
            }}
          >
            GATHER WITH US
          </span>
          
          {/* Heading */}
          <h2 
            className="text-gray-900 font-bold mt-4 mb-16" 
            style={{ fontSize: '48px', lineHeight: '1.1' }}
          >
            Service Times
          </h2>
        </div>

        {/* Service Items Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="border-b border-gray-300 py-6">
              <div className="flex items-start space-x-4">
                <ClockIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-2" style={{ letterSpacing: '0.08em' }}>
                    {service.label}
                  </h3>
                  <p className="text-gray-700 text-sm mb-1">
                    {service.day} • {service.timeRange}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {service.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-x-4">
          <Link
            href="/directions"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-[50px] transition-all duration-200 hover:scale-105"
            style={{ fontSize: '13px', letterSpacing: '0.05em' }}
          >
            <MapPinIcon className="w-4 h-4 mr-2" />
            GET DIRECTIONS
          </Link>
          <Link
            href="/plan-your-visit"
            className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium py-3.5 px-8 transition-colors duration-200"
            style={{ fontSize: '13px', letterSpacing: '0.05em' }}
          >
            First time? Plan your visit →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceTimesStrip;
