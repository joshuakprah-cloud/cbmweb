'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, ChevronDownIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Logo } from '../ui/Logo';

const NAV_ITEMS = [
  { 
    title: 'Home', 
    href: '/' 
  },
  { 
    title: 'About',
    href: '/about',
    dropdown: [
      { title: 'Our Story', href: '/about/story' },
      { title: 'Our Beliefs', href: '/about/beliefs' },
      { title: 'Leadership', href: '/about/leadership' }
    ]
  },
  { 
    title: 'Sermons',
    href: '/sermons',
    dropdown: [
      { title: 'Series', href: '/sermons/series' },
      { title: 'Speakers', href: '/sermons/preachers' },
      { title: 'Archive', href: '/sermons/archive' }
    ]
  },
  { 
    title: 'Ministries',
    href: '/ministries',
    dropdown: [
      { title: 'All Ministries', href: '/ministries' },
      { title: 'Kids', href: '/ministries/kids' },
      { title: 'Youth', href: '/ministries/youth' },
      { title: 'Women', href: '/ministries/women' },
      { title: 'Men', href: '/ministries/men' },
      { title: 'Outreach', href: '/ministries/outreach' }
    ]
  },
  { 
    title: 'Events', 
    href: '/events'
  },
  { 
    title: 'Media',
    href: '/media',
    dropdown: [
      { title: 'Blog', href: '/media/blog' },
      { title: 'Gallery', href: '/media/gallery' }
    ]
  },
  { 
    title: 'Connect',
    href: '/connect',
    dropdown: [
      { title: 'Contact Us', href: '/connect/contact' },
      { title: 'Prayer Request', href: '/connect/prayer' },
      { title: 'Get Connected', href: '/connect/groups' }
    ]
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!e.target || !(e.target as Element).closest('nav')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-gray-100 ${
        isScrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : ''
      } h-16 md:h-18`}
      style={{ overflow: 'visible' }}
      aria-label="Main navigation"
    >
      <div 
        className="max-w-[1280px] mx-auto"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          overflow: 'visible',
        }}
      >
        {/* Logo */}
        <div className="flex-shrink-0 mr-4">
          <Link href="/" className="flex items-center group">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div 
          className="flex-1 flex items-center justify-between gap-4" 
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '20px',
            flex: 1,
            justifyContent: 'left',
            paddingLeft: '32px',
            paddingRight: '16px',
            overflow: 'visible',
          }}
        >
            {NAV_ITEMS.map((item, index) => (
              <div key={item.href} className="relative text-left" style={{ position: 'relative' }}>
                {item.dropdown ? (
                  <div 
                    className="relative flex items-center gap-1" 
                    style={{ zIndex: 60 }}
                  >
                    {/* Title - clickable Link */}
                    <Link
                      href={item.href}
                      className="text-[#1a1a1a] hover:text-[#14b8a6] transition-colors duration-300"
                      style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '1',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        display: 'inline-block',
                        padding: '4px 0',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.href);
                      }}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.title}
                    </Link>

                    {/* Chevron - clickable button for dropdown */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.title.toLowerCase());
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 61,
                      }}
                      aria-expanded={openDropdown === item.title.toLowerCase()}
                      aria-haspopup="true"
                      aria-label={`Toggle ${item.title} dropdown`}
                    >
                      <ChevronDownIcon
                        style={{
                          width: '16px',
                          height: '16px',
                          color: openDropdown === item.title.toLowerCase() ? '#14b8a6' : '#6b7280',
                          transition: 'color 0.3s ease, transform 0.3s ease',
                          transform: openDropdown === item.title.toLowerCase() ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                    
                    {openDropdown === item.title.toLowerCase() && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 16px)',
                          left: '0',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                          zIndex: 100,
                          overflow: 'hidden',
                        }}
                        onMouseEnter={() => setOpenDropdown(item.title.toLowerCase())}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setOpenDropdown(null);
                          }, 150);
                        }}
                      >
                        {item.title === 'Ministries' ? (
                          <>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0',
                                minWidth: '380px',
                                padding: '12px',
                              }}
                            >

                              {/* COLUMN 1 — People Ministries */}
                              <div
                                style={{
                                  flex: 1,
                                  borderRight: '1px solid #e5e7eb',
                                  paddingRight: '12px',
                                  marginRight: '12px',
                                }}
                              >
                                {/* Column header */}
                                <span
                                  style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: '#14b8a6',
                                    marginBottom: '8px',
                                    paddingLeft: '8px',
                                  }}
                                >
                                  People
                                </span>

                                {/* Items */}
                                {[
                                  { label: 'Kids Ministry', href: '/ministries/kids', description: 'Nurturing faith in our youngest generation' },
                                  { label: 'Youth Ministry', href: '/ministries/youth', description: 'Where students discover their purpose' },
                                  { label: 'Women Ministry', href: '/ministries/women', description: 'Empowering women to grow in faith' },
                                  { label: 'Men Ministry', href: '/ministries/men', description: 'Building men of character and leadership' },
                                ].map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    style={{
                                      display: 'block',
                                      whiteSpace: 'nowrap',
                                      fontSize: '14px',
                                      color: '#1a1a1a',
                                      padding: '8px',
                                      borderRadius: '6px',
                                      textDecoration: 'none',
                                    }}
                                    onMouseEnter={e => {
                                      e.currentTarget.style.background = '#f0fdfa'
                                      e.currentTarget.style.color = '#14b8a6'
                                    }}
                                    onMouseLeave={e => {
                                      e.currentTarget.style.background = 'none'
                                      e.currentTarget.style.color = '#1a1a1a'
                                    }}
                                    onClick={closeDropdowns}
                                  >
                                    <div style={{ fontWeight: 500 }}>{subItem.label}</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{subItem.description}</div>
                                  </Link>
                                ))}
                              </div>

                              {/* COLUMN 2 — Serve Ministries */}
                              <div style={{ flex: 1 }}>

                                {/* Column header */}
                                <span
                                  style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: '#14b8a6',
                                    marginBottom: '8px',
                                    paddingLeft: '8px',
                                  }}
                                >
                                  Serve
                                </span>

                                {/* Items */}
                                {[
                                  { label: 'Outreach', href: '/ministries/outreach', description: 'Serving our community through action' },
                                  { label: 'Tech & Media', href: '/ministries/tech-media', description: 'Using technology to share the Gospel' },
                                ].map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    style={{
                                      display: 'block',
                                      whiteSpace: 'nowrap',
                                      fontSize: '14px',
                                      color: '#1a1a1a',
                                      padding: '8px',
                                      borderRadius: '6px',
                                      textDecoration: 'none',
                                    }}
                                    onMouseEnter={e => {
                                      e.currentTarget.style.background = '#f0fdfa'
                                      e.currentTarget.style.color = '#14b8a6'
                                    }}
                                    onMouseLeave={e => {
                                      e.currentTarget.style.background = 'none'
                                      e.currentTarget.style.color = '#1a1a1a'
                                    }}
                                    onClick={closeDropdowns}
                                  >
                                    <div style={{ fontWeight: 500 }}>{subItem.label}</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{subItem.description}</div>
                                  </Link>
                                ))}
                              </div>

                            </div>

                            {/* Explore All Ministries footer link */}
                            <div
                              style={{
                                borderTop: '1px solid #e5e7eb',
                                padding: '10px 12px 4px',
                                textAlign: 'center',
                              }}
                            >
                              <Link
                                href="/ministries"
                                style={{
                                  fontSize: '13px',
                                  color: '#14b8a6',
                                  fontWeight: '600',
                                  textDecoration: 'none',
                                }}
                                onClick={closeDropdowns}
                              >
                                Explore All Ministries →
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div style={{ padding: '8px 0', minWidth: '200px' }}>
                            {item.dropdown?.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                style={{
                                  display: 'block',
                                  fontSize: '14px',
                                  color: '#1a1a1a',
                                  padding: '8px 16px',
                                  textDecoration: 'none',
                                  whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = '#f0fdfa'
                                  e.currentTarget.style.color = '#14b8a6'
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = 'none'
                                  e.currentTarget.style.color = '#1a1a1a'
                                }}
                                onClick={closeDropdowns}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Link
                      href={item.href}
                      className="relative"
                      style={{ fontSize: '16px', fontWeight: '500' }}
                    >
                      <span 
                        className="text-[#1a1a1a] transition-all duration-300 py-3 px-4 rounded-lg"
                        style={{
                          color: '#1a1a1a',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#14b8a6'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#1a1a1a'
                        }}
                      >
                        {item.title}
                      </span>
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></div>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side CTAs */}
          <div className="flex-shrink-0 flex items-center gap-2 ml-6">
            {/* Watch Live Button */}
            <Link
              href={navbarData?.watchLiveUrl || '#'}
              className="whitespace-nowrap min-w-[120px] border border-teal-500 text-teal-500 rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide hover:bg-teal-500 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              {isLive && (
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
              )}
              {navbarData?.watchLiveLabel || 'Watch Live'}
            </Link>
            
            {/* Give Button */}
            <Link
              href={navbarData?.giveUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-teal-500 text-white rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide hover:bg-teal-600 transition-all duration-300"
            >
              {navbarData?.giveLabel || 'Give'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1a1a1a] hover:text-teal-500 hover:bg-gray-50 p-2 rounded-lg transition-all duration-300"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.title.toLowerCase())}
                        className="w-full text-left text-[#1a1a1a] hover:text-teal-500 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between py-2"
                      >
                        <span className="text-base font-medium">{item.title}</span>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.title.toLowerCase() ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {openDropdown === item.title.toLowerCase() && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown?.map((subItem: { title: string; href: string }) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block text-sm text-[#555555] hover:text-teal-500 hover:bg-gray-50 transition-colors duration-200 py-2 px-4"
                              role="menuitem"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-[#1a1a1a] hover:text-teal-500 hover:bg-gray-50 transition-colors duration-200 py-2 px-3 rounded-lg text-base font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="mt-6 space-y-3">
              {/* Watch Live and Give Buttons Side by Side */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={navbarData?.watchLiveUrl || '#'}
                  className="block text-center border border-teal-500 text-teal-500 rounded-full px-4 py-2.5 text-sm font-bold hover:bg-teal-500 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ letterSpacing: '0.05em' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isLive && (
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
                  )}
                  {navbarData?.watchLiveLabel || 'Watch Live'}
                </Link>
                <Link
                  href={navbarData?.giveUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-teal-500 text-white rounded-full px-4 py-2.5 text-sm font-bold hover:bg-teal-600 hover:scale-105 hover:shadow-lg transition-all duration-300"
                  style={{ letterSpacing: '0.05em' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navbarData?.giveLabel || 'Give'}
                </Link>
              </div>
            </div>

            {/* Mobile Service Info Band */}
            <div className="bg-[#1a1a1a] border-t border-gray-200 px-5 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 text-teal-500 mr-3" />
                  <span className="text-white text-sm font-medium">
                    {/* TODO: Replace with dynamic service time or update manually when times change */}
                    Next Service: Sunday 9AM
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-teal-500 mr-3" />
                  <Link
                    href="https://maps.google.com"
                    className="text-teal-500 text-sm font-medium underline"
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {/* TODO: Replace with real Google Maps URL */}
                    Get Directions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
