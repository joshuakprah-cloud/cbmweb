import Image from 'next/image';
import Link from 'next/link';

interface WelcomeSectionProps {
  welcomeTitle?: string;
  welcomeMessage?: string;
  pastorImage1?: string;
  sectionLabel?: string;
  title?: string;
  ctaText?: string;
  ctaLink?: string;
}

const WelcomeSection = ({
  welcomeTitle = 'WELCOME TO THAGOSPEL CHURCH',
  welcomeMessage = 'We are delighted to welcome you to ThaGospel Church, where faith comes alive and lives are transformed through the power of God\'s word. Our church is a vibrant community of believers committed to spreading the gospel, nurturing spiritual growth, and making a positive impact in our community and beyond.',
  pastorImage1,
  sectionLabel = 'Who We Are',
  title = 'A Warm Welcome Awaits You',
  ctaText = 'OUR STORY',
  ctaLink = '/about'
}: WelcomeSectionProps) => {
  // Fallback message if no content provided
  const hasContent = welcomeMessage && welcomeMessage.trim().length > 0;
  
  return (
    <section className="bg-[#fafafa] py-32" aria-label="Welcome">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div>
            {/* Section Label */}
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              {sectionLabel}
            </span>
            
            {/* Heading - Changed from h1 to h2 */}
            <h2 
              className="text-black font-bold mt-4 mb-6" 
              style={{ fontSize: '52px', lineHeight: '1.1' }}
            >
              {title}
            </h2>
            
            {/* Body Copy with fallback */}
            {hasContent ? (
              <p 
                className="text-gray-700 mb-8 leading-relaxed" 
                style={{ fontSize: '16px', lineHeight: '1.7' }}
              >
                {welcomeMessage}
              </p>
            ) : (
              <div className="text-gray-500 italic mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <p>Welcome message coming soon. We&apos;re working on crafting the perfect words to share our story with you.</p>
              </div>
            )}
            
            {/* CTA Button */}
            <Link
              href={ctaLink}
              className="inline-flex items-center border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold py-3.5 px-8 rounded-[50px] transition-all duration-200 hover:scale-105"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
            >
              {ctaText}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            {pastorImage1 ? (
              <Image
                src={pastorImage1}
                alt="Welcome image"
                fill
                className="object-cover rounded-[20px]"
                priority={false}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              // TODO: Replace with real congregation photo from Sanity — 600 x 640px
              <div className="bg-gray-500 flex items-center justify-center w-full h-[640px] rounded-[20px] text-gray-200 text-sm font-sans">
                Congregation Photo — 600 x 640px
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
