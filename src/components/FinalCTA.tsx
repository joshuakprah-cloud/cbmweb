import React from 'react';

interface FinalCTAProps {
  headline: string;
  text: string;
  primaryButton: string;
  secondaryButton: string;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ headline, text, primaryButton, secondaryButton }) => {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{headline}</h2>
        <p className="text-lg mb-8">{text}</p>
        <div className="space-x-4">
          <button className="bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            {primaryButton}
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            {secondaryButton}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
