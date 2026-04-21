'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface FeaturedMinistry {
  name: string;
  slug: string;
  heroImage?: any;
  tagline?: string;
  category?: string;
  headline?: string;
  color?: string;
  isPhotoCard?: boolean;
  gridClass?: string;
}

interface MinistriesSnapshotProps {
  sectionLabel?: string;
  title?: string;
  description?: string;
  featuredMinistries?: FeaturedMinistry[];
  ctaText?: string;
  ctaLink?: string;
}

const fallbackMinistries: FeaturedMinistry[] = [
  {
    name: "Kids Ministry",
    slug: "kids",
    category: "Children's Ministry",
    headline: "Raising kids with faith that lasts.",
    color: "#0a3d6b",
    heroImage: null,
    isPhotoCard: false
  },
  {
    name: "Youth Ministry",
    slug: "youth",
    category: "Youth Ministry",
    headline: "Developing a generation that influences culture.",
    color: "#111111",
    heroImage: null,
    isPhotoCard: false
  },
  {
    name: "Women's Ministry",
    slug: "women",
    category: "Women's Ministry",
    headline: "Community, growth, and belonging.",
    color: "#0d6e56",
    heroImage: null,
    isPhotoCard: false
  },
  {
    name: "Men's Ministry",
    slug: "men",
    category: "Men's Ministry",
    headline: "Leading with purpose and integrity.",
    color: "#7c3aed",
    heroImage: null,
    isPhotoCard: false
  },
  {
    name: "Outreach Ministry",
    slug: "outreach",
    category: "Outreach Ministry",
    headline: "Making an impact — locally and globally.",
    color: "#c2410c",
    heroImage: null,
    isPhotoCard: false
  },
  {
    name: "Worship Ministry",
    slug: "worship",
    category: "Worship Ministry",
    headline: "Inspiring worship that ushers in God's presence.",
    heroImage: null,
    isPhotoCard: true
  }
];

const MinistriesSnapshot = ({
  sectionLabel = 'Get Involved',
  title = 'Find Your Place',
  description = 'There is a place for every person in this community.',
  featuredMinistries = [],
  ctaText = 'Explore All Ministries',
  ctaLink = '/ministries'
}: MinistriesSnapshotProps) => {
  const ministries = featuredMinistries.length >= 6
    ? featuredMinistries.slice(0, 6)
    : fallbackMinistries;

  return (
    <section
      id="ministries"
      aria-label="Our ministries"
      className="bg-white border-t border-[#e5e7eb]"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        {/* Section Header */}
        <div className="text-center max-w-[600px] mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#0d9488] font-medium">
            {sectionLabel}
          </span>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111111] leading-[1.15] mt-2.5">
            {title}
          </h2>
          <p className="text-[17px] text-[#666666] leading-[1.7] mt-3.5">
            {description}
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: '280px 260px 320px'
          }}
        >
          {ministries.map((ministry, index) => (
            <MinistryCard
              key={ministry.slug}
              ministry={ministry}
              isLarge={index < 2}
              layout="desktop"
            />
          ))}
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          {ministries.slice(0, 5).map((ministry) => (
            <MinistryCard
              key={ministry.slug}
              ministry={ministry}
              isLarge={false}
              layout="tablet"
            />
          ))}
          <div className="col-span-2">
            <MinistryCard
              ministry={ministries[5]}
              isLarge={false}
              layout="tablet"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-4">
          {ministries.map((ministry) => (
            <MinistryCard
              key={ministry.slug}
              ministry={ministry}
              isLarge={false}
              layout="mobile"
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href={ctaLink}
            className="inline-flex items-center justify-center bg-[#111111] hover:bg-[#333333] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-[15px]"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
};

interface MinistryCardProps {
  ministry: FeaturedMinistry;
  isLarge: boolean;
  layout: 'desktop' | 'tablet' | 'mobile';
}

const MinistryCard = ({ ministry, isLarge, layout }: MinistryCardProps) => {
  const href = `/ministries/${ministry.slug}`;
  const firstLetter = ministry.name.charAt(0);

  if (ministry.isPhotoCard) {
    return (
      <Link
        href={href}
        className="group relative block rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[0.985]"
        style={{
          height: layout === 'mobile' ? '260px' : layout === 'tablet' ? '280px' : '320px',
          gridColumn: layout === 'desktop' ? '1 / 7' : layout === 'tablet' ? '1 / 3' : undefined
        }}
        aria-label={`Learn more about ${ministry.name}`}
      >
        {/* Background Image */}
        {ministry.heroImage ? (
          <Image
            src={ministry.heroImage.asset?.url || ministry.heroImage}
            alt="ThaGospel Church worship service"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: '#0d1117' }}
          >
            <span
              className="text-white font-bold"
              style={{ fontSize: '120px', opacity: 0.1 }}
            >
              {ministry.name}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.15) 100%)'
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
          <p className="text-[12px] text-white/70 mb-2.5 tracking-[0.02em]">
            {ministry.category}
          </p>
          <h3
            className="font-bold text-white leading-[1.2] mb-4"
            style={{ fontSize: layout === 'mobile' ? '24px' : '32px', maxWidth: '520px' }}
          >
            {ministry.headline || ministry.name}
          </h3>
          <div className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white/90 hover:text-white hover:gap-2.5 transition-all duration-200">
            Learn more
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </Link>
    );
  }

  // Colored card (rows 1 & 2)
  return (
    <Link
      href={href}
      className="group relative block rounded-2xl overflow-hidden cursor-pointer p-6 lg:p-7 flex flex-col justify-between transition-transform duration-200 hover:scale-[0.985]"
      style={{
        backgroundColor: ministry.color || '#0a3d6b',
        height: layout === 'mobile' ? '220px' : layout === 'tablet' ? '260px' : 'auto',
        gridColumn: getGridColumn(ministry.slug, layout),
        gridRow: layout === 'desktop' ? getGridRow(ministry.slug) : undefined
      }}
      role="article"
      aria-label={`Learn more about ${ministry.name}`}
    >
      {/* Decorative Letter Watermark */}
      <div
        className="absolute pointer-events-none select-none font-black text-white"
        style={{
          fontSize: '160px',
          opacity: 0.08,
          bottom: '-20px',
          right: '-20px',
          lineHeight: 1
        }}
        aria-hidden="true"
      >
        {firstLetter}
      </div>

      {/* Top Section */}
      <div className="relative z-10">
        <p className="text-[12px] font-medium text-white/65 tracking-[0.06em] mb-2.5">
          {ministry.category}
        </p>
        <h3
          className="font-bold text-white leading-[1.25]"
          style={{
            fontSize: isLarge ? '26px' : '22px',
            maxWidth: '280px'
          }}
        >
          {ministry.headline || ministry.name}
        </h3>
      </div>

      {/* Footer Section */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white/90 hover:text-white hover:gap-2.5 transition-all duration-200">
          Learn more
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

function getGridColumn(slug: string, layout: 'desktop' | 'tablet' | 'mobile'): string | undefined {
  if (layout !== 'desktop') return undefined;
  switch (slug) {
    case 'kids': return '1 / 4';
    case 'youth': return '4 / 7';
    case 'women': return '1 / 3';
    case 'men': return '3 / 5';
    case 'outreach': return '5 / 7';
    default: return undefined;
  }
}

function getGridRow(slug: string): number | undefined {
  switch (slug) {
    case 'kids':
    case 'youth':
      return 1;
    case 'women':
    case 'men':
    case 'outreach':
      return 2;
    default:
      return undefined;
  }
}

export default MinistriesSnapshot;
