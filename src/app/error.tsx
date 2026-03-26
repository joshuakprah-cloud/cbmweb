'use client';

import Link from 'next/link';
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-lg">
        {/* Church Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            ThaGospel Church
          </h1>
        </div>
        
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg 
              className="w-12 h-12 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>
        
        {/* Error Code */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong on our end.
        </h2>
        <p className="text-gray-600 mb-8">
          We're experiencing some technical difficulties. Please try again or contact us if the problem persists.
        </p>
        
        {/* Error Digest (for debugging) */}
        {error?.digest && (
          <p className="text-sm text-gray-400 mb-8">
            Error ID: {error.digest}
          </p>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center border-2 font-bold py-3 px-6 rounded-full transition-all duration-200"
            style={{ 
              borderColor: 'var(--color-primary)', 
              color: 'var(--color-primary)',
              backgroundColor: 'transparent'
            }}
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
