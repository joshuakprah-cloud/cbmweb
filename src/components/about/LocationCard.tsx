import React from 'react';
import Image from 'next/image';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface LocationCardProps {
  name: string;
  address?: string;
  city?: string;
  serviceTimes?: string;
  image?: string;
  mapLink?: string;
}

const LocationCard = ({ 
  name, 
  address, 
  city, 
  serviceTimes, 
  image,
  mapLink 
}: LocationCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Location Image */}
      <div className="aspect-video relative">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <MapPinIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      
      {/* Location Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        
        {(address || city) && (
          <div className="flex items-start gap-2 text-gray-600 text-sm mb-3">
            <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{address}{address && city && ', '}{city}</span>
          </div>
        )}
        
        {serviceTimes && (
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium text-gray-700">Service Times: </span>
            {serviceTimes}
          </div>
        )}
        
        {mapLink && (
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:gap-2 transition-all"
          >
            Get Directions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
