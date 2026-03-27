import { MapPinIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface WhatToExpectProps {
  title?: string;
  headline?: string;
  description?: string;
  expectations?: Array<{
    title: string;
    description: string;
    icon: string; // Icon name/emoji from Sanity
    order?: number;
  }>;
}

// Icon mapping function
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'MapPinIcon':
    case 'map-pin':
      return MapPinIcon;
    case 'HeartIcon':
    case 'heart':
      return HeartIcon;
    case 'SparklesIcon':
    case 'sparkles':
      return SparklesIcon;
    default:
      return MapPinIcon; // fallback
  }
};

const WhatToExpect = ({ 
  title = "First Time Here?",
  headline = "Here's What to Expect.",
  description = "We've thought about your visit so you don't have to.",
  expectations = []
}: WhatToExpectProps) => {

  return (
    <section id="what-to-expect" className="bg-[#f0f0ee] py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Block - Header */}
          <div>
            {/* Section Label */}
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              {title}
            </span>
            
            {/* Heading - Changed from h1 to h2 */}
            <h2 
              className="text-black font-bold mt-4 mb-6" 
              style={{ fontSize: '52px', lineHeight: '1.1' }}
            >
              {headline}
            </h2>
            
            <p 
              className="text-gray-600 leading-relaxed" 
              style={{ 
                fontSize: '16px', 
                lineHeight: '1.7', 
                maxWidth: '320px' 
              }}
            >
              {description}
            </p>
          </div>

          {/* Right Block - Numbered Items */}
          <div className="space-y-10">
            {expectations.map((item, index) => {
              const IconComponent = getIconComponent(item.icon);
              const itemNumber = String(index + 1).padStart(2, '0');
              
              return (
                <div key={index}>
                  <div className="flex items-start space-x-6">
                    {/* Large Number + Icon */}
                    <div className="flex items-center">
                      <div 
                        className="text-gray-400 font-serif mr-4"
                        style={{ 
                          fontSize: '80px', 
                          fontFamily: 'Georgia, serif',
                          opacity: '0.15'
                        }}
                        aria-hidden="true"
                      >
                        {itemNumber}
                      </div>
                      <IconComponent className="w-6 h-6 text-teal-600 flex-shrink-0 mt-2" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 
                        className="text-black font-bold mb-3"
                        style={{ fontSize: '24px', lineHeight: '1.2' }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-gray-600 leading-relaxed"
                        style={{ 
                          fontSize: '16px', 
                          lineHeight: '1.7',
                          maxWidth: '480px'
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Divider (except after last item) */}
                  {index < expectations.length - 1 && (
                    <div className="border-t border-gray-300 mt-10"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
