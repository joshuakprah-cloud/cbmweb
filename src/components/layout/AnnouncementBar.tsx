'use client';

import { useState, useEffect } from 'react';

interface AnnouncementBarProps {
  isActive: boolean;
  message: string;
  linkLabel?: string;
  linkUrl?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  isActive,
  message,
  linkLabel,
  linkUrl,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const dismissed = sessionStorage.getItem('announcement-dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcement-dismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full bg-teal-600 text-white py-2 px-4 text-center text-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          {message}
          {linkLabel && linkUrl && (
            <>
              {' '}
              <a
                href={linkUrl}
                className="underline hover:no-underline ml-1"
              >
                {linkLabel}
              </a>
            </>
          )}
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="ml-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
