'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

interface MobileNavItem {
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MobileNavItem[];
  isLive: boolean;
  watchLiveUrl: string;
  watchLiveLabel: string;
  giveUrl: string;
  giveLabel: string;
}

const MobileMenu = React.memo<MobileMenuProps>(function MobileMenu({
  isOpen,
  onClose,
  items,
  isLive,
  watchLiveUrl,
  watchLiveLabel,
  giveUrl,
  giveLabel,
}) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

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

  // Get all dropdown items including from columns
  const getDropdownItems = (item: MobileNavItem): DropdownItem[] => {
    if (item.dropdown) return item.dropdown;
    if (item.columns) {
      // For columns with sections, flatten all items
      if (item.columns.right.sections) {
        const rightItems = [
          ...(item.columns.right.sections.community?.items || []),
          ...(item.columns.right.sections.service?.items || []),
        ];
        return [...item.columns.left.items, ...rightItems];
      }
      return [
        ...item.columns.left.items,
        ...item.columns.right.items,
      ];
    }
    return [];
  };

  // Get structured sections for accordion display (for Ministries)
  const getColumnSections = (item: MobileNavItem) => {
    if (!item.columns) return null;
    return {
      left: item.columns.left,
      right: item.columns.right,
    };
  };

  // Check if item has dropdown content
  const hasDropdown = (item: MobileNavItem): boolean => {
    return !!(item.dropdown || item.columns);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 z-50 translate-x-0"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-65px)] overflow-y-auto">
          {/* CTA Buttons at Top */}
          <div className="p-4 space-y-3 border-b border-gray-100">
            {/* Watch Live - Primary CTA */}
            <Link
              href={watchLiveUrl}
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-[#0d9488] text-white rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-[#0c857a] transition-all duration-200 shadow-sm"
            >
              {isLive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
              {watchLiveLabel}
            </Link>

            {/* I'm New - Secondary CTA */}
            <Link
              href="/im-new"
              onClick={onClose}
              className="flex items-center justify-center border border-gray-300 text-gray-700 rounded-full px-4 py-3 text-sm font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              I'm New
            </Link>

            {/* Give - Text Link */}
            <Link
              href={giveUrl}
              onClick={onClose}
              className="flex items-center justify-center text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors"
            >
              {giveLabel}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {items.map((item) => {
                const dropdownItems = getDropdownItems(item);
                const columnSections = getColumnSections(item);
                const isExpanded = expandedItems.has(item.title);
                const hasSubmenu = hasDropdown(item);
                // Check if this is the Ministries item with columns structure
                const hasColumnSections = item.columns?.right;

                return (
                  <li key={item.href} className="border-b border-gray-50 last:border-0">
                    {hasSubmenu ? (
                      <div>
                        {/* Parent Item (tappable to expand) */}
                        <button
                          onClick={() => toggleExpanded(item.title)}
                          className="w-full flex items-center justify-between py-3 px-2 text-left text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <span>{item.title}</span>
                          {/* Plus/Minus indicator instead of chevron */}
                          <span className="text-[#0d9488] text-lg font-light w-6 h-6 flex items-center justify-center">
                            {isExpanded ? '−' : '+'}
                          </span>
                        </button>

                        {/* Expanded Submenu */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          {hasColumnSections && columnSections ? (
                            /* Render columns with sections (Ministries) */
                            <div className="pl-2 pb-2 space-y-3">
                              {/* Core Ministries Section */}
                              <div className="bg-gray-50/50 rounded-lg p-3">
                                <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-2">
                                  {columnSections.left.label}
                                </span>
                                <ul className="space-y-1">
                                  {columnSections.left.items.map((sub) => (
                                    <li key={sub.href}>
                                      <Link
                                        href={sub.href}
                                        onClick={onClose}
                                        className="block py-2 px-2 text-sm text-gray-700 hover:text-[#0d9488] hover:bg-white rounded-lg transition-colors"
                                      >
                                        {sub.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Right Column Section */}
                              <div className="bg-gray-50/50 rounded-lg p-3">
                                {columnSections.right.label && (
                                  <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-2">
                                    {columnSections.right.label}
                                  </span>
                                )}
                                <ul className="space-y-1">
                                  {columnSections.right.items.map((sub) => (
                                    <li key={sub.href}>
                                      <Link
                                        href={sub.href}
                                        onClick={onClose}
                                        className="block py-2 px-2 text-sm text-gray-700 hover:text-[#0d9488] hover:bg-white rounded-lg transition-colors"
                                      >
                                        {sub.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* View All Ministries Link - at bottom */}
                              <div className="mt-3 bg-[#f0fdfa] rounded-lg p-3">
                                <Link
                                  href="/ministries"
                                  onClick={onClose}
                                  className="flex items-center justify-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-[#0c857a] transition-colors"
                                >
                                  <span>View all ministries</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            /* Standard dropdown list */
                            <ul className="pl-4 pb-2 space-y-1">
                              {dropdownItems.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className="block py-2 px-3 text-sm text-gray-600 hover:text-[#0d9488] hover:bg-[#f0fdfa] rounded-lg transition-colors"
                                  >
                                    {sub.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Simple Link without dropdown */
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-3 px-2 text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Info */}
          <div className="bg-gray-50 p-4 mt-auto border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Join us Sundays at 9AM
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
