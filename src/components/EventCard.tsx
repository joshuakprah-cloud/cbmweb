import React from 'react';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  flyerImage?: any;
}

export default function EventCard({ title, date, time, venue, flyerImage }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-64 bg-gray-200 relative">
        {flyerImage ? (
          <Image src={urlFor(flyerImage).url()} alt={title} fill className="object-cover" />
        ) : (
          <div className="text-center flex items-center justify-center h-full text-gray-400">Event Flyer</div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p className="font-medium text-primary">{date}</p>
          <p>🕐 {time}</p>
          <p>📍 {venue}</p>
        </div>
      </div>
    </div>
  );
}

import { urlFor } from '../../sanity/lib/image';
