'use client';

import Link from 'next/link';

interface QuickNavigationProps {
  hasTopics?: boolean;
}

export default function QuickNavigation({ hasTopics = false }: QuickNavigationProps) {
  const navItems = [
    {
      title: 'Browse by Series',
      description: 'Explore sermon series and themes',
      href: '/messages/series',
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Browse by Speaker',
      description: 'Find messages by your favorite speakers',
      href: '/messages/preachers',
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  // Add Topics if supported
  if (hasTopics) {
    navItems.push({
      title: 'Browse by Topics',
      description: 'Discover /messages by subject',
      href: '/messages/topics',
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    });
  }

  return (
    <section className="py-12 md:py-16 bg-white" aria-labelledby="quick-nav-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="quick-nav-heading" className="sr-only">Quick Navigation</h2>
        
        <div className={`grid grid-cols-1 ${hasTopics ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-gray-50 rounded-xl p-6 md:p-8 text-center hover:shadow-lg hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              
              <div className="mt-4 inline-flex items-center text-teal-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                Explore
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
