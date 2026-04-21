import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Fact {
  icon: ReactNode;
  label: string;
  value: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AboutPageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  headline: string;
  subtitle?: string;
  factsBar?: Fact[];
  height?: number;
}

export default function AboutPageHero({
  breadcrumbs,
  eyebrow,
  headline,
  subtitle,
  factsBar,
  height = 480,
}: AboutPageHeroProps) {
  return (
    <section 
      role="banner"
      className="relative bg-[#0d1117] overflow-hidden"
      style={{ minHeight: `${height}px` }}
    >
      {/* Radial teal gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(13,148,136,0.15) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 pt-[120px] pb-[60px] md:pb-[80px]">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center flex-wrap gap-1 text-[12px]">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRightIcon className="w-3 h-3 mx-1 text-white/40" aria-hidden="true" />
                )}
                {crumb.href ? (
                  <Link 
                    href={crumb.href}
                    className="text-white/50 hover:text-white/80 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/50">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Eyebrow with line */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-[2px] bg-[#2dd4bf]" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#2dd4bf] font-medium">
            {eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight max-w-[640px]">
          {headline}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-[16px] md:text-[18px] text-white/65 leading-[1.7] max-w-[560px] mt-5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Facts Bar */}
      {factsBar && factsBar.length > 0 && (
        <div 
          className="relative z-10 border-t border-white/10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-20 py-0">
            <div className="flex items-center gap-6 md:gap-12 overflow-x-auto scrollbar-hide" style={{ height: '56px' }}>
              {factsBar.map((fact, index) => (
                <div key={index} className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[#2dd4bf]" style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {fact.icon}
                  </span>
                  <span className="text-[11px] uppercase text-white/40 font-medium">
                    {fact.label}
                  </span>
                  <span className="text-[14px] font-semibold text-white ml-1">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
