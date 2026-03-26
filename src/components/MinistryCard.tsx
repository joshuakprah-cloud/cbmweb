import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

interface MinistryCardProps {
  title: string;
  description: string;
  link: string;
  icon?: string;
  image?: any;
}

export default function MinistryCard({ title, description, link, icon, image }: MinistryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 text-center">
      <div className="h-16 w-16 bg-primary text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
        {image ? (
          <Image src={urlFor(image).url()} alt={title} width={64} height={64} className="rounded-full" />
        ) : (
          <span>{icon || title.charAt(0)}</span>
        )}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <Link href={link} className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">
        Learn More
      </Link>
    </div>
  );
}
