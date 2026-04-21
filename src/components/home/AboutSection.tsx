import Image from 'next/image';
import Link from 'next/link';

interface AboutSectionProps {
  welcomeTitle?: string;
  welcomeMessage?: string;
  pastorImage1?: string;
  pastorName?: string;
  pastorBio?: string;
  sectionLabel?: string;
  ctaText?: string;
  ctaLink?: string;
}

const AboutSection = ({
  welcomeTitle = 'A Place Where Everyone Belongs',
  welcomeMessage,
  pastorImage1,
  pastorName = 'Prophet Powerman Bekoe',
  pastorBio = 'The church is not a building, it\'s the people. We\'re called to be a beacon of hope, love, and transformation in our community and beyond. Join us in this incredible journey of faith.',
  sectionLabel = 'Who We Are',
  ctaText = 'Our Story',
  ctaLink = '/about'
}: AboutSectionProps) => {
  
  return (
    <section className="bg-[#f0ede8] py-16 lg:py-24 overflow-hidden" aria-label="About">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Pastor Image & Quote */}
          <div className="relative">
            {/* Decorative offset block */}
            <div className="absolute -bottom-3 -right-3 lg:-right-6 w-full h-full bg-teal-100/50 rounded-[24px]" />
            
            {/* Main image container */}
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[450px] rounded-[20px] overflow-hidden shadow-2xl">
              {pastorImage1 ? (
                <Image
                  src={pastorImage1}
                  alt={`Pastor ${pastorName}`}
                  fill
                  className="object-cover"
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="bg-gray-300 flex items-center justify-center w-full h-full text-gray-500 text-sm font-sans">
                  Pastor Portrait
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Text & Pastor Quote */}
          <div className="flex flex-col justify-center lg:pl-8">
            {/* Section Label with Decorative Line */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[2px] bg-teal-500 rounded-full" />
              <span 
                className="text-gray-600 uppercase tracking-[0.2em] font-semibold text-xs"
              >
                {sectionLabel}
              </span>
            </div>
            
            {/* Heading */}
            <h2 
              className="text-gray-900 font-extrabold mb-6 text-3xl sm:text-4xl lg:text-[40px]" 
              style={{ lineHeight: '1.15' }}
            >
              {welcomeTitle}
            </h2>
            
            {/* Welcome Message - only render if provided */}
            {welcomeMessage && (
              <p 
                className="text-gray-700 mb-6 leading-relaxed"
                style={{ fontSize: '16px', lineHeight: '1.7' }}
              >
                {welcomeMessage}
              </p>
            )}
            
            {/* Pastor Quote */}
            <blockquote 
              className="text-gray-600 italic mb-6 pl-4 border-l-4 border-teal-500"
              style={{ fontSize: '16px', lineHeight: '1.6' }}
            >
              "{pastorBio}"
            </blockquote>
            
            <p className="text-gray-500 text-sm mb-6">
              — {pastorName}, Lead Pastor
            </p>
            
            {/* CTA Button with border style like navbar */}
            <Link
              href={ctaLink}
              className="inline-flex items-center border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg w-fit text-sm tracking-wide"
            >
              {ctaText}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
