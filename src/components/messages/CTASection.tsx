'use client';

import Link from 'next/link';

interface CTASectionProps {
  primaryText?: string;
  primaryHref?: string;
}

export default function CTASection({
  primaryText = "Join Us",
  primaryHref = "/im-new",
}: CTASectionProps) {
  return (
    <section className="py-16 md:py-20 bg-teal-900" aria-labelledby="sermons-cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          id="sermons-cta-heading"
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Experience Church in Person
        </h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto text-lg">
          Join us this Sunday for worship, fellowship, and an uplifting message.
        </p>
        
        <div className="flex justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center border-2 border-white text-white font-semibold px-6 py-2.5 rounded-md hover:bg-white hover:text-teal-900 transition-all duration-300 hover:scale-105 text-sm"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'cta_click', {
                  event_category: 'sermons_page',
                  event_label: 'join_us',
                });
              }
            }}
          >
            {primaryText}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
