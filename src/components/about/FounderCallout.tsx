import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UsersIcon } from '@heroicons/react/24/outline';

interface FounderCalloutProps {
  pastorsImage?: string;
  prophetName?: string;
  prophetessName?: string;
  eyebrow?: string;
  headline?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  bioParagraph3?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
}

export default function FounderCallout({ 
  pastorsImage,
  prophetName = "Prophet Powerman Bekoe",
  prophetessName = "Prophetess Powerman Bekoe",
  eyebrow = "Meet Our Pastors",
  headline,
  bioParagraph1,
  bioParagraph2,
  bioParagraph3,
  ctaPrimaryText = "Learn more",
  ctaSecondaryText = "Learn more"
}: FounderCalloutProps) {
  // Generate dynamic headline if not provided
  const displayHeadline = headline || `Pastors ${prophetName.split(' ').slice(1).join(' ')} & ${prophetessName.split(' ').slice(1).join(' ')}`;
  return (
    <section 
      role="region" 
      aria-label="Our pastors"
      className="bg-[#111111] py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
          {eyebrow}
        </span>
        
        {/* Headline */}
        <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white leading-[1.15] mt-3">
          {displayHeadline}
        </h2>
        
        {/* Pastors Image */}
        <div className="mt-10 md:mt-12">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#1a1a1a]">
            {pastorsImage ? (
              <Image
                src={pastorsImage}
                alt={`${prophetName} and ${prophetessName}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UsersIcon className="w-20 h-20 text-gray-600" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
        
        {/* Bio Content */}
        <div className="mt-10 md:mt-12 space-y-6">
          {bioParagraph1 ? (
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.8]">{bioParagraph1}</p>
          ) : (
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.8]">
              Together, {prophetName} and {prophetessName} lead ThaGospel Church in Accra, Ghana, and are committed to raising a nation of Christ-minded people. With a passion for the Gospel and a heart for people, they have built a community where love and humility are at the center of everything.
            </p>
          )}
          
          {bioParagraph2 ? (
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.8]">{bioParagraph2}</p>
          ) : (
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.8]">
              As the founders and lead pastors of ThaGospel Church, {prophetName} has helped the church grow from a small gathering into a vibrant ministry reaching thousands through in-person services and online streaming. His teachings focus on identity in Christ, faith, and the power of the Holy Spirit.
            </p>
          )}
          
          {bioParagraph3 ? (
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.8]">{bioParagraph3}</p>
          ) : (
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.8]">
              {prophetessName} is co-founder and pastor at ThaGospel Church. She is known for her compassionate ministry and dedication to serving families and women in the community. Her heart for worship and discipleship has shaped the culture of ThaGospel into a place where everyone feels welcomed and valued.
            </p>
          )}
        </div>
        
        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/about/leadership"
            className="inline-flex items-center justify-center bg-white text-[#111111] font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200 text-[14px]"
          >
            {ctaPrimaryText} {prophetName.split(' ')[0]}
          </Link>
          <Link
            href="/about/leadership"
            className="inline-flex items-center justify-center bg-white text-[#111111] font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200 text-[14px]"
          >
            {ctaSecondaryText} {prophetessName.split(' ')[0]}
          </Link>
        </div>
      </div>
    </section>
  );
}
