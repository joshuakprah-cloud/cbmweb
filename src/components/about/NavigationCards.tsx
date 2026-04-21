import React from 'react';
import Link from 'next/link';
import { BookOpenIcon, ShieldCheckIcon, UsersIcon, PhotoIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const navigationItems = [
  {
    icon: BookOpenIcon,
    title: 'Our Story',
    description: 'How ThaGospel Church began and where we are going.',
    href: '/about/story',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Our Beliefs',
    description: 'The biblical foundations that guide everything we do.',
    href: '/about/beliefs',
  },
  {
    icon: UsersIcon,
    title: 'Leadership',
    description: 'Meet the pastoral team and ministry leaders.',
    href: '/about/leadership',
  },
  {
    icon: PhotoIcon,
    title: 'Photo Gallery',
    description: 'A glimpse into life at ThaGospel Church.',
    href: '/about/gallery',
  },
];

export default function NavigationCards() {
  return (
    <nav 
      role="navigation" 
      aria-label="About page sections"
      className="relative z-10 px-6 md:px-20 -mt-44"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white rounded-2xl border border-[#e5e7eb] p-6 lg:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:border-l-[3px] hover:border-l-[#0d9488]"
            >
              {/* Icon Container */}
              <div className="w-11 h-11 rounded-[10px] bg-[#e6fffa] flex items-center justify-center mb-4 transition-all duration-200 ease-out group-hover:bg-[#0d9488]">
                <item.icon className="w-[22px] h-[22px] text-[#0d9488] transition-all duration-200 ease-out group-hover:text-white" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-[#111111] mb-2 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-[#666666] leading-[1.6] mb-5">
                {item.description}
              </p>

              {/* Footer Link */}
              <div className="flex items-center gap-1 text-[13px] font-semibold text-[#0d9488] group-hover:gap-2 transition-all duration-200">
                Explore
                <ChevronRightIcon className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
