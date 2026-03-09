'use client';

import { useEffect } from 'react';

export default function PrayerScrollEffect() {
  useEffect(() => {
    // Prayer section scroll fade effect
    function handlePrayerScroll() {
      const prayerSection = document.querySelector('.prayer-bg-fade');
      if (!prayerSection || !prayerSection.parentElement) return;
      
      const rect = prayerSection.parentElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll position
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;
      
      let opacity = 0; // Start hidden
      
      // Show background when scrolling into view
      if (sectionTop < windowHeight && sectionBottom > 0) {
        // Section is in viewport
        const progress = Math.abs(sectionTop) / (windowHeight + sectionHeight);
        opacity = 1 - progress;
        
        // Hide when section is fully centered in view
        if (sectionTop <= 100 && sectionBottom >= windowHeight - 100) {
          opacity = 0;
        }
      }
      
      // Type assertion for style property
      (prayerSection as HTMLElement).style.opacity = Math.max(0, Math.min(1, opacity)).toString();
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handlePrayerScroll);
    window.addEventListener('resize', handlePrayerScroll);
    handlePrayerScroll(); // Initial call
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handlePrayerScroll);
      window.removeEventListener('resize', handlePrayerScroll);
    };
  }, []);

  return null;
}
