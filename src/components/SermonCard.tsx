import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SermonCardProps {
  thumbnail: string;
  title: string;
  speaker: string;
  date: string;
  watchUrl: string;
}

export default function SermonCard({ thumbnail, title, speaker, date, watchUrl }: SermonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">{speaker}</p>
        <p className="text-sm text-gray-500 mb-4">{date}</p>
        <Link href={watchUrl} className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">
          Watch
        </Link>
      </div>
    </div>
  );
}
