'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

interface GalleryImage {
  _id: string;
  title?: string;
  description?: string;
  image?: any;
  category?: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

const categories = ['All', 'Worship', 'Events', 'Ministries', 'General'];

// Background colors for placeholder images per category
const categoryColors: { [key: string]: string } = {
  'Worship': '#0a2a2a',     // dark teal
  'Events': '#1a1a0a',      // dark gold/olive
  'Ministries': '#1a0a2a',  // dark purple
  'General': '#0a0a1a',     // dark navy
};

// Default sample images
const defaultSampleImages: GalleryImage[] = [
  { _id: 'sample-0', title: "Sunday Worship Service", category: "Worship", description: "Our vibrant Sunday worship experience" },
  { _id: 'sample-1', title: "Praise & Worship Night", category: "Worship", description: "Lifting voices in praise together" },
  { _id: 'sample-2', title: "Annual Church Conference", category: "Events", description: "Gathering together for teaching and fellowship" },
  { _id: 'sample-3', title: "Community Outreach", category: "Events", description: "Serving our local community" },
  { _id: 'sample-4', title: "Kids Ministry", category: "Ministries", description: "Nurturing the next generation in faith" },
  { _id: 'sample-5', title: "Youth Service", category: "Ministries", description: "Young people passionate for God" },
];

export default function GalleryClient({ images }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  // If no images from CMS, use sample images
  const displayImages = images.length > 0 ? images : defaultSampleImages;

  // Filter images by category
  const filteredImages = activeCategory === 'All' 
    ? displayImages 
    : displayImages.filter(img => img.category === activeCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div 
        className="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label="Gallery categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-[18px] py-2 rounded-lg text-[13px] font-medium
              transition-all duration-150 ease-out
              ${activeCategory === category 
                ? 'bg-[#0d9488] text-white border border-[#0d9488]' 
                : 'bg-[#f3f4f6] text-[#555555] border border-[#e5e7eb] hover:border-[#0d9488] hover:text-[#0d9488]'
              }
            `}
            role="tab"
            aria-selected={activeCategory === category}
            aria-controls={`gallery-panel-${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div 
        className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        id={`gallery-panel-${activeCategory}`}
      >
        {filteredImages.map((image, index) => (
          <div 
            key={image._id || index}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            role="listitem"
            aria-label={image.title || 'Gallery image'}
          >
            {/* Background/Image */}
            {image.image ? (
              <Image
                src={urlFor(image.image).width(600).height(450).url()}
                alt={image.title || 'Gallery image'}
                fill
                className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  backgroundColor: categoryColors[image.category || 'General'] || '#1a1a1a',
                }}
              >
                <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Title on overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {image.category && (
                <span className="text-[#2dd4bf] text-[11px] uppercase tracking-wider font-medium">
                  {image.category}
                </span>
              )}
              {image.title && (
                <h3 className="text-white text-[14px] font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {image.title}
                </h3>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 italic">No images found in this category.</p>
        </div>
      )}
    </div>
  );
}
