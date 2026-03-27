import Link from 'next/link';

interface ClosingCTAProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

const ClosingCTA = ({
  title = 'Ready to join us?',
  description = "We'd love to meet you. Come as you are.",
  primaryCtaText = 'Get Connected',
  primaryCtaLink = '/connect',
  secondaryCtaText = 'Learn More About Us',
  secondaryCtaLink = '/about/story'
}: ClosingCTAProps) => {
  return (
    <section id="connect" className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA - High contrast teal background with white text */}
          <Link
            href={primaryCtaLink}
            className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
            style={{ 
              fontSize: '13px', 
              letterSpacing: '0.05em',
              minWidth: '160px'
            }}
          >
            {primaryCtaText}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          {/* Secondary CTA */}
          <Link
            href={secondaryCtaLink}
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600 font-bold py-3 px-6 rounded-full transition-all duration-200"
            style={{ 
              fontSize: '13px', 
              letterSpacing: '0.05em',
              minWidth: '160px'
            }}
          >
            {secondaryCtaText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
