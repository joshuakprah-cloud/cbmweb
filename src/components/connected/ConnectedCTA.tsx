import React from 'react';
import Link from 'next/link';

const ConnectedCTA = () => {
  return (
    <section className="bg-[#f0f0ee] py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Small Label */}
          <span 
            className="text-gray-600 italic"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Georgia, serif'
            }}
          >
            Still Not Sure?
          </span>

          {/* Large Heading */}
          <h2 
            className="text-black font-bold mt-4 mb-6" 
            style={{ fontSize: '52px', lineHeight: '1.1' }}
          >
            We're Here to Help You Find Your Next Step.
          </h2>

          {/* Supporting Line */}
          <p 
            className="text-gray-600 mx-auto" 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.7', 
              maxWidth: '520px' 
            }}
          >
            Our team is happy to point you in the right direction. Reach out, plan a visit, or give us a call.
          </p>

          {/* Three Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/connect/contact"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200 hover:scale-105 text-center"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
            >
              CONTACT US
              <svg
                className="w-4 h-4 ml-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="/about/new-here"
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200 text-center"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
            >
              PLAN YOUR VISIT
              <svg
                className="w-4 h-4 ml-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectedCTA;
