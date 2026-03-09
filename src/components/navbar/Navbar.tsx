'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from 'next-sanity';
import { ThemeToggle } from '../theme-toggle';
import { useTheme } from '../theme-provider';
import NavItem, { NavItemType } from './NavItem';
import MobileMenu from './MobileMenu';

const NAV_ITEMS: NavItemType[] = [
  { title: 'Home', href: '/' },
  {
    title: 'About Us',
    href: '/about',
    dropdown: [
      { title: 'Overview', href: '/about' },
      { title: 'New Here?', href: '/new-here' },
      { title: 'Leadership', href: '/about/leadership' },
      { title: 'This Year\'s Theme', href: '/about/theme' }
    ]
  },
  {
    title: 'Media',
    href: '/media',
    dropdown: [
      { title: 'Video Stream', href: '/watch-live' },
      { title: 'Sermons', href: '/sermons' },
      { title: 'Gallery', href: '/gallery' }
    ]
  },
  {
    title: 'Ministries',
    href: '/ministries',
    dropdown: [
      { title: 'Youth', href: '/ministries/youth' },
      { title: 'Women', href: '/ministries/women' },
      { title: 'Men', href: '/ministries/men' },
      { title: 'Children', href: '/ministries/children' },
      { title: 'Media', href: '/ministries/media' },
      { title: 'Outreach', href: '/ministries/outreach' }
    ]
  },
  {
    title: 'Contact Us',
    href: '/contact',
    dropdown: [
      { title: 'Inquiry/Feedback', href: '/contact/feedback' },
      { title: 'Get in Touch', href: '/contact' }
    ]
  },
  { title: 'Forms', href: '/forms' },
  { title: 'Give', href: '/give' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();
  const isLive = false;

  const { theme } = useTheme(); // TODO: Add logic to determine if live

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-01-01',
    useCdn: true,
  });

  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const query = `*[_type in ["post","event"] && title match "${term}*"]`;
      const data = await client.fetch(query);
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    performSearch(term);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-white shadow-md text-foreground'
        : 'bg-gray-900 shadow-md text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold font-inter text-foreground">ThaGospel Church</div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} isActive={isActive(item.href)} pathname={pathname} />
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform relative focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Watch Live"
            >
              {isLive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              )}
              {isLive ? 'Live Now' : 'Watch Live'}
            </button>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} items={NAV_ITEMS} isLive={isLive} />

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className={`w-full max-w-2xl mx-4 rounded-lg shadow-xl ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <div className={`p-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search posts, events, sermons..."
                  value={searchTerm}
                  onChange={handleSearchInput}
                  className={`flex-1 px-4 py-2 border-0 focus:outline-none focus:ring-0 ${
                    theme === 'light' ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-gray-400'
                  }`}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                  className={`ml-4 p-2 rounded-md ${
                    theme === 'light' ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-700 text-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center text-gray-500">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((result: any, index: number) => (
                    <a
                      key={index}
                      href={result.slug ? `/${result._type === 'post' ? 'blog' : result._type}/${result.slug}` : '#'}
                      onClick={() => setIsSearchOpen(false)}
                      className={`block p-3 rounded-md ${
                        theme === 'light' ? 'hover:bg-gray-50 text-gray-900' : 'hover:bg-gray-700 text-white'
                      } transition-colors`}
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{result.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 capitalize">{result._type}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="p-4 text-center text-gray-500">
                  No results found for "{searchTerm}"
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Start typing to search...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
