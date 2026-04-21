'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClockIcon, MapPinIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Service {
  label: string;
  day: string;
  timeRange: string;
  location?: string;
  isMainService?: boolean;
}

interface ServiceTimesVisibilityProps {
  services?: Service[];
  variant?: 'navbar' | 'hero' | 'floating';
  locationName?: string;
  locationUrl?: string;
}

const defaultServices: Service[] = [
  { label: 'Sunday Service', day: 'Sunday', timeRange: '9:00 AM - 12:00 PM', isMainService: true },
  { label: 'Midweek Service', day: 'Wednesday', timeRange: '6:00 PM - 8:00 PM' },
];

const formatNextService = (services: Service[]): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  
  // Find the next service
  for (let i = 0; i < 7; i++) {
    const checkDay = (today + i) % 7;
    const dayName = days[checkDay];
    const service = services.find(s => s.day === dayName);
    
    if (service) {
      if (i === 0) return `Today ${service.timeRange.split(' - ')[0]}`;
      if (i === 1) return `Tomorrow ${service.timeRange.split(' - ')[0]}`;
      return `${dayName}s ${service.timeRange.split(' - ')[0]}`;
    }
  }
  
  return services[0]?.timeRange || '9:00 AM';
};

const ServiceTimesVisibility: React.FC<ServiceTimesVisibilityProps> = ({
  services = defaultServices,
  variant = 'navbar',
  locationName = 'ThaGospel Church',
  locationUrl = '/im-new',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mainService, setMainService] = useState<Service | null>(null);

  useEffect(() => {
    const main = services.find(s => s.isMainService) || services[0];
    setMainService(main);
  }, [services]);

  if (!mainService) return null;

  // Navbar variant - compact inline display
  if (variant === 'navbar') {
    return (
      <div className="hidden md:flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-gray-600">
          <ClockIcon className="w-4 h-4 text-teal-500" />
          <span className="font-medium">
            {mainService.day}s • {mainService.timeRange}
          </span>
        </div>
        <Link
          href={locationUrl}
          className="flex items-center gap-1.5 text-teal-500 hover:text-teal-600 font-medium transition-colors"
        >
          <MapPinIcon className="w-4 h-4" />
          <span>Visit Us</span>
        </Link>
      </div>
    );
  }

  // Hero variant - prominent display below hero
  if (variant === 'hero') {
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Next Service</p>
                  <p className="font-semibold text-gray-900">{formatNextService(services)}</p>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-10 bg-gray-300" />
              
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                  <p className="font-semibold text-gray-900">{locationName}</p>
                </div>
              </div>
            </div>

            <Link
              href={locationUrl}
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-600 transition-colors"
            >
              <MapPinIcon className="w-4 h-4" />
              Plan Your Visit
            </Link>
          </div>

          {/* Expandable service schedule */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors mx-auto"
              aria-expanded={isExpanded}
            >
              <span>View Full Schedule</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            {isExpanded && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      service.isMainService ? 'bg-teal-50 border border-teal-200' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${service.isMainService ? 'bg-teal-500' : 'bg-gray-400'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{service.label}</p>
                      <p className="text-xs text-gray-500">{service.day}s • {service.timeRange}</p>
                    </div>
                    {service.isMainService && (
                      <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full">Main</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Floating variant - fixed position badge
  if (variant === 'floating') {
    return (
      <div className="fixed bottom-24 right-4 z-30 hidden lg:block">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ClockIcon className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{mainService.label}</p>
              <p className="text-sm text-gray-600">{mainService.day}s</p>
              <p className="text-sm text-teal-600 font-medium">{mainService.timeRange}</p>
            </div>
          </div>
          <Link
            href={locationUrl}
            className="mt-3 block w-full text-center bg-teal-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            Plan Your Visit
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default ServiceTimesVisibility;
