'use client';

import { PortableText } from '@portabletext/react';

interface StoryPortableTextProps {
  value: any;
}

export default function StoryPortableText({ value }: StoryPortableTextProps) {
  return (
    <>
      <style jsx global>{`
        .story-prose p {
          font-size: 17px;
          color: #333333;
          line-height: 1.9;
          margin-bottom: 24px;
        }
        .story-prose blockquote {
          border-left: 4px solid #0d9488;
          padding-left: 24px;
          font-size: 20px;
          font-style: italic;
          color: #111111;
          margin: 32px 0;
        }
      `}</style>
      <div className="story-prose">
        <PortableText value={value} />
      </div>
    </>
  );
}
