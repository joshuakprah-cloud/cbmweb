'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the staff carousel to avoid SSR issues
const StaffCarousel = dynamic(() => import('./StaffCarousel'), {
  ssr: false,
  loading: () => <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />,
});

interface StaffCarouselWrapperProps {
  staffMembers: any[];
}

const StaffCarouselWrapper: React.FC<StaffCarouselWrapperProps> = ({ staffMembers }) => {
  return <StaffCarousel staffMembers={staffMembers} />;
};

export default StaffCarouselWrapper;
