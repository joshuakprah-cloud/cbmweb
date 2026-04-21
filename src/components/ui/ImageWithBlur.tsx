'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithBlurProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  blurDataUrl?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * Enhanced Image component with blur placeholder support
 * 
 * Usage:
 * 1. With explicit dimensions:
 * <ImageWithBlur src="/image.jpg" alt="Description" width={400} height={300} />
 * 
 * 2. With fill (for responsive containers):
 * <ImageWithBlur src="/image.jpg" alt="Description" fill className="object-cover" />
 * 
 * 3. With blurDataUrl (for LQIP):
 * <ImageWithBlur 
 *   src="/image.jpg" 
 *   alt="Description" 
 *   width={400} 
 *   height={300}
 *   blurDataUrl="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
 * />
 */
const ImageWithBlur: React.FC<ImageWithBlurProps> = ({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  containerClassName = '',
  priority = false,
  sizes,
  blurDataUrl,
  fallbackIcon,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate a simple gray blur if no blurDataUrl provided
  const defaultBlurDataUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E";

  if (hasError && fallbackIcon) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${containerClassName}`}
        style={!fill ? { width, height } : undefined}
      >
        {fallbackIcon}
      </div>
    );
  }

  const imageProps = fill
    ? {
        fill: true as const,
        className: `${className} ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'} transition-all duration-500`,
      }
    : {
        width,
        height,
        className: `${className} ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'} transition-all duration-500`,
      };

  return (
    <div 
      className={`relative overflow-hidden ${containerClassName} ${fill ? 'w-full h-full' : ''}`}
      style={!fill ? { width, height } : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
      )}
      
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataUrl || defaultBlurDataUrl}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

export default ImageWithBlur;

/**
 * Hook to generate blur data URL from an image URL
 * Use this server-side to generate LQIP for your images
 * 
 * Example usage in getStaticProps or API route:
 * 
 * const blurDataUrl = await generateBlurDataUrl('/path/to/image.jpg');
 */
export async function generateBlurDataUrl(imageUrl: string): Promise<string | null> {
  try {
    // This would typically be done at build time or via an API
    // For now, return a simple gray placeholder
    // In production, use sharp or similar to generate actual LQIP
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E";
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return null;
  }
}
