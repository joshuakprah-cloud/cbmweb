'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../theme-provider';
import { NavItemType } from './NavItem';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItemType[];
  isLive: boolean;
}

const MobileMenu = React.memo<MobileMenuProps>(({ isOpen, onClose, items, isLive }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { theme } = useTheme();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        } shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className={`float-right ${
              theme === 'light' ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-red-500 rounded`}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-8">
            {/* Watch Live Button */}
            <button className="w-full bg-red-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform relative mb-6">
              {isLive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              )}
              {isLive ? 'Live Now' : 'Watch Live'}
            </button>

            <nav className="space-y-2">
              {items.map((item) => (
                <div key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                      } hover:text-red-500 transition-colors`}
                    >
                      {item.title}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={() => toggleExpanded(item.title)}
                        className={`${
                          theme === 'light' ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-red-500 rounded`}
                        aria-expanded={expandedItems.has(item.title)}
                        aria-label={`Toggle ${item.title} submenu`}
                      >
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            expandedItems.has(item.title) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.dropdown && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedItems.has(item.title) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          className={`block pl-4 py-1 text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          } hover:text-red-500 transition-colors`}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
