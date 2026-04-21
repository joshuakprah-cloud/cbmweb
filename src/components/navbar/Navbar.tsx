'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Logo } from '../ui/Logo';
import MobileMenu from './MobileMenu';

// Types for navigation items
interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

interface NavItemType {
  title: string;
  href: string;
  dropdown?: DropdownItem[];
  columns?: {
    left: { label: string; items: DropdownItem[] };
    right: {
      label: string;
      items: DropdownItem[];
      sections?: {
        community?: { label: string; items: DropdownItem[] };
        service?: { label: string; items: DropdownItem[] };
      };
    };
  };
}

// Updated Navigation Structure
const NAV_ITEMS: NavItemType[] = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'About',
    href: '/about',
    dropdown: [
      { title: 'Our Story', href: '/about/story' },
      { title: 'Vision & Mission', href: '/about/overview#vision-mission' },
      { title: 'Our Beliefs', href: '/about/beliefs' },
      { title: 'Leadership', href: '/about/leadership' },
      { title: 'Departments', href: '/about/departments' },
      { title: 'Gallery', href: '/about/gallery' }
    ]
  },
  {
    title: 'Messages',
    href: '/messages',
    dropdown: [
      { title: 'Latest Message', href: '/messages/latest' },
      { title: 'Series', href: '/messages/series' },
      { title: 'Speakers', href: '/messages/preachers' },
      { title: 'Message Archive', href: '/messages/archive' }
    ]
  },
  {
    title: 'Ministries',
    href: '/ministries',
    columns: {
      left: {
        label: 'Core Ministries',
        items: [
          { title: 'Men', href: '/ministries/men' },
          { title: 'Women', href: '/ministries/women' },
          { title: 'Youth', href: '/ministries/youth' },
          { title: 'Children', href: '/ministries/kids' }
        ]
      },
      right: {
        label: 'Small Groups',
        items: [
          { title: 'Prayer', href: '/ministries/prayer' },
          { title: 'Evangelism', href: '/ministries/evangelism' },
          { title: 'Choir', href: '/ministries/choir' },
          { title: 'Outreach', href: '/ministries/outreach' },
          { title: 'Media', href: '/ministries/media' }
        ]
      }
    }
  },
  {
    title: 'Events',
    href: '/events'
  },
  {
    title: 'Visit',
    href: '/visit'
  },
  {
    title: 'Give',
    href: '/give'
  }
];

interface NavbarProps {
  navbarData?: {
    watchLiveUrl?: string;
    watchLiveLabel?: string;
    giveUrl?: string;
    giveLabel?: string;
    planYourVisitLabel?: string;
  };
  isLive?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ navbarData, isLive = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  }, [pathname]);

  // Scroll handler - trigger at 80px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    // Check initial scroll position
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!e.target || !(e.target as Element).closest('nav')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dropdown hover handlers with delay (150-200ms)
  const handleMouseEnter = (title: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Render dropdown content
  const renderDropdown = (item: NavItemType) => {
    const isOpen = activeDropdown === item.title;

    if (item.columns) {
      // Two-column layout for Ministries
      return (
        <div
          className={`absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-200 ${
            isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-1 invisible'
          }`}
          style={{ minWidth: '420px' }}
        >
          <div className="flex p-5 gap-5">
            {/* Left Column */}
            <div className="flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-3">
                {item.columns.left.label}
              </span>
              {item.columns.left.items.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block py-2.5 text-[14px] text-gray-800 hover:text-[#0d9488] transition-colors group"
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="font-medium group-hover:translate-x-0.5 transition-transform">{subItem.title}</div>
                  {subItem.description && (
                    <div className="text-[12px] text-gray-500 mt-0.5 leading-snug">{subItem.description}</div>
                  )}
                </Link>
              ))}
            </div>
            {/* Right Column */}
            <div className="flex-1">
              {item.columns.right.label && (
                <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-3">
                  {item.columns.right.label}
                </span>
              )}
              {item.columns.right.sections ? (
                <>
                  {/* Community & Service Items - rendered without subsection labels */}
                  {item.columns.right.sections.community && (
                    <div>
                      {item.columns.right.sections.community.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-2 text-[14px] text-gray-800 hover:text-[#0d9488] transition-colors group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-medium group-hover:translate-x-0.5 transition-transform">{subItem.title}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {item.columns.right.sections.service && (
                    <div>
                      {item.columns.right.sections.service.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-2 text-[14px] text-gray-800 hover:text-[#0d9488] transition-colors group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-medium group-hover:translate-x-0.5 transition-transform">{subItem.title}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                item.columns.right.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block py-2.5 text-[14px] text-gray-800 hover:text-[#0d9488] transition-colors group"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="font-medium group-hover:translate-x-0.5 transition-transform">{subItem.title}</div>
                    {subItem.description && (
                      <div className="text-[12px] text-gray-500 mt-0.5 leading-snug">{subItem.description}</div>
                    )}
                  </Link>
                ))
              )}
            </div>
          </div>
          {/* View All Ministries Link - Full width at bottom */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
            <Link
              href="/ministries"
              className="flex items-center justify-center gap-2 text-[14px] font-semibold text-[#0d9488] hover:text-[#0c857a] transition-colors group"
              onClick={() => setActiveDropdown(null)}
            >
              <span className="group-hover:translate-x-0.5 transition-transform">View all ministries</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      );
    }

    // Standard single-column dropdown
    return (
      <div
        className={`absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-200 ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-1 invisible'
        }`}
        style={{ minWidth: '220px' }}
      >
        <div className="py-2">
          {item.dropdown?.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block px-4 py-2.5 text-[14px] text-gray-800 hover:text-[#0d9488] hover:bg-gray-50/50 transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Sticky Header - Transparent on hero, white on scroll */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 h-[72px] lg:h-[76px] ${
          isScrolled
            ? 'bg-white border-b border-gray-100 shadow-sm'
            : 'bg-transparent border-b-0 shadow-none'
        }`}
        style={{ overflow: 'visible' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Logo variant={isScrolled ? 'dark' : 'white'} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10 xl:gap-12">
              {NAV_ITEMS.map((item) => {
                const hasDropdown = item.dropdown || item.columns;
                const active = isActive(item.href);

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={hasDropdown ? () => handleMouseEnter(item.title) : undefined}
                    onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-[16px] font-medium transition-colors duration-200 py-2 ${
                        active
                          ? isScrolled ? 'text-[#0d9488]' : 'text-[#2dd4bf]'
                          : isScrolled
                            ? 'text-gray-700 hover:text-gray-900'
                            : 'text-white/90 hover:text-white'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.title}
                      {active && (
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isScrolled ? 'bg-[#0d9488]' : 'bg-[#2dd4bf]'}`} />
                      )}
                    </Link>
                    {hasDropdown && renderDropdown(item)}
                  </div>
                );
              })}
            </div>

            {/* Right Side - CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              {/* I'm New - Secondary CTA (outline style with white border on transparent) */}
              <Link
                href="/im-new"
                className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                  isScrolled
                    ? 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    : 'border-2 border-white/80 text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                I'm New
              </Link>

              {/* Watch Live - Primary CTA */}
              <Link
                href={navbarData?.watchLiveUrl || '/live'}
                className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm ${
                  isScrolled
                    ? 'bg-[#0d9488] text-white hover:bg-[#0c857a] hover:scale-[1.02]'
                    : 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-[1.02]'
                }`}
              >
                {isLive && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
                {navbarData?.watchLiveLabel || 'Watch Live'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-[#0d9488] hover:bg-gray-50'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Open menu"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={NAV_ITEMS}
        isLive={isLive}
        watchLiveUrl={navbarData?.watchLiveUrl || '/live'}
        watchLiveLabel={navbarData?.watchLiveLabel || 'Watch Live'}
        giveUrl={navbarData?.giveUrl || '/give'}
        giveLabel={navbarData?.giveLabel || 'Give'}
      />
    </>
  );
};

export default Navbar;
