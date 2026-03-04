'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';
import { useTheme } from './theme-provider';
import { createClient } from 'next-sanity';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { theme } = useTheme();
  const isLive = false;

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-01-01',
    useCdn: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const menuItems = [
    {
      title: 'Home',
      href: '/',
      dropdown: null
    },
    {
      title: 'About',
      href: '#',
      dropdown: [
        { title: 'Our Story', href: '/about/overview' },
        { title: 'Beliefs', href: '/about/beliefs' },
        { title: 'Leadership', href: '/about/leadership' },
        { title: 'Church Theme', href: '/about/theme' }
      ]
    },
    {
      title: 'Sermons',
      href: '/sermons',
      dropdown: null
    },
    {
      title: 'Events',
      href: '/events',
      dropdown: null
    },
    {
      title: 'Ministries',
      href: '/ministries',
      dropdown: null
    },
    {
      title: 'Give',
      href: '/donate',
      dropdown: null
    },
    {
      title: 'Contact',
      href: '/contact',
      dropdown: null
    }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-white shadow-md text-foreground'
        : 'bg-gray-900 shadow-md text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className={`text-xl font-bold font-inter ${
              theme === 'light' ? 'text-foreground' : 'text-white'
            }`}>Church Logo</div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={item.href} 
                  className={`hover:text-purple-500 transition-colors ${
                    theme === 'light' ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {item.title}
                </a>
                {item.dropdown && (
                  <div className={`absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]`}>
                    <a
                      href="/about/overview"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Our Story
                    </a>
                    <a
                      href="/about/beliefs"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Beliefs
                    </a>
                    <a
                      href="/about/leadership"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Leadership
                    </a>
                    <a
                      href="/about/theme"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Church Theme
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`hover:text-purple-500 transition-colors ${
                theme === 'light' ? 'text-foreground' : 'text-white'
              }`}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors relative">
              {isLive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
              {isLive ? 'LIVE' : 'Watch Live'}
            </button>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`focus:outline-none ${
              theme === 'light' ? 'text-foreground' : 'text-white'
            }`} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className={`md:hidden ${
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          } shadow-lg border-t`}>
            {menuItems.map((item, index) => (
              <div key={index}>
                <a href={item.href} className={`block py-2 px-4 hover:text-purple-500 ${
                  theme === 'light' ? 'text-foreground' : 'text-white'
                }`}>
                  {item.title}
                </a>
                {item.dropdown && item.dropdown.map((subItem, subIndex) => (
                  <a 
                    key={subIndex}
                    href={subItem.href} 
                    className={`block py-2 pl-8 hover:text-purple-500 ${
                      theme === 'light' ? 'text-foreground' : 'text-white'
                    }`}
                  >
                    {subItem.title}
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className={`w-full max-w-2xl mx-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-xl`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search posts, events, sermons..."
                  value={searchTerm}
                  onChange={handleSearchInput}
                  className={`flex-1 px-4 py-2 border-0 focus:outline-none focus:ring-0 ${
                    theme === 'light' ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-gray-400 bg-gray-800'
                  }`}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                  className={`ml-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}
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
                      className={`block p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}
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
