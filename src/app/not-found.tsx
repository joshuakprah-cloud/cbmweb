import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-lg">
        {/* Church Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            ThaGospel Church
          </h1>
        </div>
        
        {/* 404 Number */}
        <h1 className="text-9xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>404</h1>
        
        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oops, we couldn't find that page.
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 font-bold py-3 px-6 rounded-full transition-all duration-200"
            style={{ 
              borderColor: 'var(--color-primary)', 
              color: 'var(--color-primary)',
              backgroundColor: 'transparent'
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
