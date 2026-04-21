import Link from 'next/link';

interface ClosingCTAProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  scripture?: string;
  brandStatement?: string;
}

const ClosingCTA = ({
  title = "Your story isn't over — it's just beginning.",
  description = "Whatever you're carrying, you don't have to carry it alone. Come as you are.",
  primaryCtaText = 'Visit Us',
  primaryCtaLink = '/plan-your-visit',
  secondaryCtaText = 'Watch a Sermon',
  secondaryCtaLink = '/messages',
  scripture = 'Galatians 2:20',
  brandStatement = 'YOU ARE A CHRIST.'
}: ClosingCTAProps) => {
  return (
    <section
      id="connect"
      aria-label="Join ThaGospel Church"
      className="relative bg-[#0a0a0a] overflow-hidden border-t border-[#1a1a1a]"
    >
      {/* Decorative Background Elements */}
      <div
        className="absolute -top-[60px] -right-[60px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(13,148,136,0.06)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[80px] -left-[80px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(13,148,136,0.04)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-20 lg:py-[120px]">
        {/* Content */}
        <div className="max-w-[720px] mx-auto text-center">
          {/* Headline */}
          <h2
            className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.15] mt-2.5 mb-5"
          >
            {title}
          </h2>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-white/70 leading-[1.6] max-w-[560px] mx-auto mb-12"
          >
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            {/* Primary CTA */}
            <Link
              href={primaryCtaLink || '/plan-your-visit'}
              className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold py-4 px-9 rounded-lg transition-colors duration-200 text-base w-full sm:w-auto"
            >
              {primaryCtaText}
            </Link>

            {/* Secondary CTA */}
            <Link
              href={secondaryCtaLink || '/messages'}
              className="inline-flex items-center justify-center bg-transparent text-white font-medium py-4 px-9 rounded-lg border-[1.5px] border-white/30 hover:border-white hover:bg-white/[0.05] transition-all duration-200 text-base w-full sm:w-auto"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClosingCTA;
