import React from 'react';

interface Stat {
  number: string;
  label: string;
}

// NOTE: Update these numbers to reflect actual church data
const stats: Stat[] = [
  { number: '2016', label: 'Year Founded' },
  { number: '6+', label: 'Active Ministries' },
  { number: '3', label: 'Weekly Services' },
  { number: '1', label: 'One Family' },
];

export default function ByTheNumbers() {
  return (
    <section 
      role="region" 
      aria-label="Church statistics"
      className="bg-[#0d9488] py-12 md:py-16 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <dl className="flex flex-wrap justify-center gap-8 md:gap-20">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <div className="text-center">
                <dt className="text-[44px] md:text-[48px] font-extrabold text-white leading-none">
                  {stat.number}
                </dt>
                <dd className="text-[13px] uppercase tracking-[0.1em] text-white/80 mt-2">
                  {stat.label}
                </dd>
              </div>
              
              {/* Divider (hide on mobile, hide after last item) */}
              {index < stats.length - 1 && (
                <div 
                  className="hidden md:block w-px h-14 bg-white/60 self-center" 
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
}
