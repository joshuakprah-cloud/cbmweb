'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPinIcon, PlayIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface MobileStickyCTAProps {
  planVisitUrl?: string;
  planVisitLabel?: string;
  watchUrl?: string;
  watchLabel?: string;
  isLive?: boolean;
  hidePlanVisit?: boolean;
}

const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  planVisitUrl = '/im-new',
  planVisitLabel = 'Plan Your Visit',
  watchUrl = '/watch',
  watchLabel = 'Watch',
  isLive = false,
  hidePlanVisit = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if near bottom (within 100px)
      const nearBottom = currentScrollY + windowHeight >= documentHeight - 100;
      setIsAtBottom(nearBottom);
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Back to top button - shows when at bottom */}
      {isAtBottom && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute -top-12 right-4 bg-teal-500 text-white p-2 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUpIcon className="w-5 h-5" />
        </button>
      )}

      <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3">
        <div className={`flex items-center gap-3 ${hidePlanVisit ? 'justify-center' : ''}`}>
          {/* Plan Your Visit Button - Hidden when on plan-your-visit page */}
          {!hidePlanVisit && (
            <Link href="/im-new">
              <div
                className="flex-1 flex items-center justify-center gap-2 bg-teal-500 text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-teal-600 transition-colors active:scale-95"
              >
                <MapPinIcon className="w-4 h-4" />
                {planVisitLabel}
              </div>
            </Link>
          )}

          {/* Watch Button - Full width when plan visit is hidden */}
          <Link
            href={watchUrl}
            className={`${hidePlanVisit ? 'w-full max-w-xs' : 'flex-1'} flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-colors active:scale-95 ${
              isLive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'border-2 border-teal-500 text-teal-500 hover:bg-teal-50'
            }`}
          >
            {isLive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>LIVE</span>
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" />
                <span>{watchLabel}</span>
              </>
            )}
          </Link>
        </div>

        {/* Safe area spacer for iOS */}
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </div>
  );
};

export default MobileStickyCTA;
