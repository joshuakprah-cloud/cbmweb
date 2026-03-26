import Image from 'next/image';
import Link from 'next/link';

interface PastorTeaserProps {
  pastorImage1?: string;
  malePastorName?: string;
}

const PastorTeaser = ({
  pastorImage1,
  malePastorName = 'Prophet Powerman Bekoe'
}: PastorTeaserProps) => {
  return (
    <section id="leadership" className="bg-[#f0f0ee] py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Portrait */}
          <div className="relative w-full h-[480px]">
            {pastorImage1 ? (
              <Image
                src={pastorImage1}
                alt={`Pastor ${malePastorName} - Lead Pastor, ThaGospel Church`}
                fill
                className="object-cover rounded-[18px]"
                priority={false}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            ) : (
              // TODO: Replace with pastor photo from Sanity CMS — 480 x 480px
              <div className="bg-gray-700 flex items-center justify-center w-full h-full rounded-[18px] text-gray-400 text-sm font-sans">
                Pastor Portrait — 480 x 480px
              </div>
            )}
          </div>

          {/* Right Column - Text */}
          <div>
            {/* Section Label */}
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Our Leadership
            </span>
            
            {/* Pastor Name */}
            <h2 
              className="text-black font-bold mt-4 mb-6" 
              style={{ fontSize: '58px', lineHeight: '1.1' }}
            >
              {malePastorName}
            </h2>
            
            {/* Bio */}
            <p 
              className="text-gray-700 mb-8 leading-relaxed italic"
              style={{ 
                fontSize: '16px', 
                lineHeight: '1.7', 
                maxWidth: '540px' 
              }}
            >
              The church is not a building, it&apos;s the people. We&apos;re called to be a beacon of hope, love, and transformation in our community and beyond. Join us in this incredible journey of faith.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about/leadership"
                className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-[50px] transition-all duration-200 hover:scale-105"
                style={{ fontSize: '13px', letterSpacing: '0.05em' }}
              >
                Meet Prophet Bekoe
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/about/leadership"
                className="inline-flex items-center border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold py-3.5 px-8 rounded-[50px] transition-all duration-200 hover:scale-105"
                style={{ fontSize: '13px', letterSpacing: '0.05em' }}
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorTeaser;
