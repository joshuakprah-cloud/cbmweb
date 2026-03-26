'use client';

import Image from 'next/image';
import { useState } from 'react';
import { urlFor } from '../../../sanity/lib/image';

interface PhotoCardProps {
  title: string;
  image?: any;
  caption?: string;
  event?: string;
  dateTaken?: string;
  albumTitle?: string;
  albumSlug?: string;
  variant?: 'grid' | 'list';
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ 
  title, 
  image, 
  caption, 
  event, 
  dateTaken, 
  albumTitle,
  albumSlug,
  variant = 'grid',
  onClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imageUrl = image 
    ? urlFor(image).width(400).height(300).url()
    : null;

  const formattedDate = dateTaken 
    ? new Date(dateTaken).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null;

  const altText = title || event || 'Gallery photo';

  if (variant === 'list') {
    return (
      <div 
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer flex gap-4"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      >
        {/* Thumbnail */}
        <div className="w-40 h-40 flex-shrink-0 relative overflow-hidden bg-gray-100">
          {imageUrl ? (
            <>
              <div className={`w-full h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="160px"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl mb-2">🖼️</div>
                <p className="text-xs">No Image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
            {title || 'Untitled'}
          </h3>
          
          {caption && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">
              {caption}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-gray-500">
            {event && <span>{event}</span>}
            {formattedDate && (
              <>
                <span>•</span>
                <time dateTime={dateTaken}>{formattedDate}</time>
              </>
            )}
            {albumTitle && (
              <>
                <span>•</span>
                <span className="text-blue-600 hover:text-blue-700">{albumTitle}</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {imageUrl ? (
          <>
            <div className={`w-full h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src={imageUrl}
                alt={altText}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-sm font-medium drop-shadow-lg line-clamp-1">{title || 'Untitled'}</p>
            {event && (
              <p className="text-xs drop-shadow-md line-clamp-1">{event}</p>
            )}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {title || 'Untitled'}
        </h3>
        
        {caption && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {caption}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            {event && <span>{event}</span>}
            {formattedDate && event && <span>•</span>}
            {formattedDate && (
              <time dateTime={dateTaken}>{formattedDate}</time>
            )}
          </div>
          
          {albumTitle && (
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              {albumTitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
