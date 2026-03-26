import { MapPinIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

const WhatToExpect = () => {
  const expectations = [
    {
      icon: MapPinIcon,
      title: 'We Saved You A Seat',
      description: 'From parking to finding your seat, we have got you covered every step of the way. Just show up and we will take care of the rest.'
    },
    {
      icon: HeartIcon,
      title: 'Your Kids Are In Good Hands',
      description: 'We have a safe, fun, and age-appropriate environment for every child. Check them in with ease and enjoy service with total peace of mind.'
    },
    {
      icon: SparklesIcon,
      title: 'Come As You Are',
      description: 'No dress code, no pressure, no performance. Whether this is your first time in a church or you are coming back after years away, you belong here.'
    }
  ];

  return (
    <section id="what-to-expect" className="bg-[#f0f0ee] py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Block - Header */}
          <div>
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              First Time Here?
            </span>
            
            <h2 
              className="text-black font-bold mt-4 mb-6" 
              style={{ fontSize: '52px', lineHeight: '1.1' }}
            >
              Here's What to Expect.
            </h2>
            
            <p 
              className="text-gray-600 leading-relaxed" 
              style={{ 
                fontSize: '16px', 
                lineHeight: '1.7', 
                maxWidth: '320px' 
              }}
            >
              We've thought about your visit so you don't have to.
            </p>
          </div>

          {/* Right Block - Numbered Items */}
          <div className="space-y-10">
            {expectations.map((item, index) => {
              const IconComponent = item.icon;
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
