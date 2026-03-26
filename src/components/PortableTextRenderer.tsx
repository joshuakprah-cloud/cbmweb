'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

const components: Partial<PortableTextComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-[32px] lg:text-[36px] font-bold text-[#1a1a1a] mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1a1a1a] mb-3 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[24px] lg:text-[28px] font-bold text-[#1a1a1a] mb-3 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[20px] lg:text-[24px] font-bold text-[#1a1a1a] mb-2 leading-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[16px] lg:text-[18px] leading-relaxed text-gray-700 mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#14b8a6] pl-4 py-2 my-4 bg-[#f0f0ee] rounded-r-lg">
        <p className="text-[16px] lg:text-[18px] italic text-gray-700">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-[16px] lg:text-[18px] text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-[16px] lg:text-[18px] text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#1a1a1a]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-[#14b8a6] hover:text-[#0d9488] underline transition-colors"
        target={value.href.startsWith('http') ? '_blank' : '_self'}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      
      return (
        <div className="my-6 rounded-lg overflow-hidden">
          <Image
            src={value.asset.url}
            alt={value.altText || ''}
            width={800}
            height={400}
            className="w-full object-cover"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    callout: ({ value }) => {
      const bgColor = value?.style === 'info' ? 'bg-blue-50 border-blue-200' :
                     value?.style === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                     value?.style === 'success' ? 'bg-green-50 border-green-200' :
                     'bg-gray-50 border-gray-200';
      
      return (
        <div className={`border rounded-lg p-4 my-4 ${bgColor}`}>
          <div className="font-semibold text-gray-800 mb-1">
            {value?.title}
          </div>
          <div className="text-gray-700">
            {value?.text}
          </div>
        </div>
      );
    },
    embed: ({ value }) => {
      if (value?.url) {
        // Handle YouTube embeds
        const youtubeMatch = value.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
        if (youtubeMatch) {
          return (
            <div className="my-6 aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          );
        }
        
        // Handle general embeds
        return (
          <div className="my-6">
            <iframe
              src={value.url}
              title="Embedded content"
              className="w-full h-[400px] rounded-lg"
              frameBorder="0"
            />
          </div>
        );
      }
      return null;
    },
  },
};

interface PortableTextRendererProps {
  value: any[];
  className?: string;
}

export default function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  if (!value || !Array.isArray(value)) {
    return <p className="text-gray-500">No content available.</p>;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
