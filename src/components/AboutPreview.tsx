import React from 'react';
import { PortableText } from '@portabletext/react';

interface AboutPreviewProps {
  headline: string;
  content: any[]; // PortableText blocks
  pastorMessage: string;
  button: string;
}

const AboutPreview: React.FC<AboutPreviewProps> = ({ headline, content, pastorMessage, button }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{headline}</h2>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <PortableText value={content} />
          </div>
          <blockquote className="text-lg italic mb-8">“{pastorMessage}”</blockquote>
          <div className="text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              {button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
