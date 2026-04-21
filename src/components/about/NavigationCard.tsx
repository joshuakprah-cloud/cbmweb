import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
}

const NavigationCard = ({ 
  title, 
  description, 
  href, 
  image 
}: NavigationCardProps) => {
  return (
    <Link 
      href={href}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      {/* Card Image */}
      <div className="aspect-[4/3] relative">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <ArrowRightIcon className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:gap-2 transition-all">
          Learn more
          <ChevronRightIcon className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;
