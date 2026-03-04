import React from 'react';

interface GlobalPresenceProps {
  headline: string;
  content: string;
  button: string;
}

const GlobalPresence: React.FC<GlobalPresenceProps> = ({ headline, content, button }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{headline}</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-8">{content}</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {button}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
