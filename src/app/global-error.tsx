'use client';

import Link from 'next/link';
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
          <div className="text-center max-w-lg">
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
              Something Went Wrong
            </h2>
            <p className="text-gray-600 mb-8">
              We&apos;re experiencing some technical difficulties. Our team has been notified and we&apos;re working to fix the issue.
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
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Try Again
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 hover:border-teal-600 hover:text-teal-600 font-bold py-3 px-6 rounded-full transition-all duration-200"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
            
            {/* Additional Help */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 mb-4">
                Still having trouble?
              </p>
              <Link
                href="/contact"
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
