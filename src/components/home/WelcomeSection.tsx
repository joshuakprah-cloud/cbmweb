'use client';

import Image from 'next/image';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';

interface WelcomePastorSectionProps {
  // Welcome/Identity content
  welcomeHeading?: string;
  welcomeBody?: string;
  welcomeImage?: any; // Optional secondary community image

  // Pastor content
  pastorName?: string;
  pastorTitle?: string;
  pastorBio?: string;
  pastorImage?: string;

  // CTAs
  pastorCtaLabel?: string;
  pastorCtaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
}

const WelcomePastorSection = ({
  // Welcome content fallbacks
  welcomeHeading = "Built on Love, Grounded in the Gospel.",
  welcomeBody = "ThaGospel Church is a community rooted in love and humility. We exist to raise Christ-minded people who carry the Gospel into every area of their lives. Whoever you are, wherever you're coming from, there is a place for you here.",
  welcomeImage,

  // Pastor content fallbacks
  pastorName = "Prophet Powerman Bekoe",
  pastorTitle = "Lead Pastor, ThaGospel Church",
  pastorBio = "God has called us to be a generation that carries His presence, His power, and His love to the nations.",
  pastorImage,

  // CTA fallbacks
  pastorCtaLabel = "Meet Prophet Bekoe",
  pastorCtaLink = "/about/leadership",
  secondaryCtaLabel = "Our Story",
  secondaryCtaLink = "/about/our-story"
}: WelcomePastorSectionProps) => {
  return (
    <section
      className="bg-white"
      role="region"
      aria-label="Welcome and leadership"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          {/* Left Column - Welcome Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#0d9488] font-medium">
              Who We Are
            </span>

            {/* Headline */}
            <h2 className="text-[32px] lg:text-[44px] font-bold text-[#111111] leading-[1.2] mt-2.5 max-w-[480px]">
              {welcomeHeading}
            </h2>

            {/* Body Paragraph */}
            <p className="text-[16px] text-[#555555] leading-[1.8] mt-5 max-w-[460px]">
              {welcomeBody}
            </p>

            {/* Pastor Intro Divider */}
            <div className="mt-9">
              <div className="w-12 h-[1.5px] bg-[#0d9488]" aria-hidden="true" />
              <span className="text-[12px] uppercase tracking-[0.1em] text-[#999999] mt-4 block">
                Led by
              </span>
            </div>

            {/* Pastor Name + Title */}
            <div className="mt-3">
              <h3 className="text-[22px] font-bold text-[#111111]">
                {pastorName}
              </h3>
              <p className="text-[14px] text-[#666666] mt-1">
                {pastorTitle}
              </p>
            </div>

            {/* Pastor Bio Quote */}
            <blockquote className="mt-3 pl-4 border-l-[3px] border-[#0d9488]">
              <p className="text-[15px] italic text-[#666666] leading-[1.7] max-w-[440px]">
                {pastorBio}
              </p>
            </blockquote>

            {/* CTA Button */}
            <div className="mt-9">
              <Link
                href={pastorCtaLink}
                className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold py-3.5 px-7 rounded-lg transition-colors duration-200 text-[14px] w-full sm:w-auto"
                aria-label={`Learn more about ${pastorName}`}
              >
                {pastorCtaLabel}
              </Link>
            </div>
          </div>

          {/* Right Column - Pastor Portrait */}
          <div className="order-1 lg:order-2 relative">
            {/* Decorative Accent Border */}
            <div
              className="hidden lg:block absolute -bottom-4 -right-4 w-full h-full rounded-[20px] border-2 border-[#0d9488] opacity-30 -z-10"
              aria-hidden="true"
            />

            {/* Portrait Container */}
            <div className="relative w-full max-w-[280px] lg:max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
              {/* Main Pastor Image */}
              <div className="relative aspect-[3/4] w-full rounded-[20px] overflow-hidden bg-[#e5e7eb]">
                {pastorImage ? (
                  <Image
                    src={pastorImage}
                    alt={`${pastorName}, ${pastorTitle}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 280px, 420px"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <UserIcon className="w-12 h-12 text-[#9ca3af]" aria-hidden="true" />
                    <span className="text-[12px] text-[#9ca3af] mt-2">Pastor photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomePastorSection;
