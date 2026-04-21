'use client';

import { useSearchParams } from 'next/navigation';

interface PrayerHeroEyebrowProps {
  cmsEyebrow?: string | null;
}

const PrayerHeroEyebrow: React.FC<PrayerHeroEyebrowProps> = ({ cmsEyebrow }) => {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  // CMS override takes priority
  if (cmsEyebrow) {
    return (
      <span className="font-serif italic text-white/70 text-sm">
        {cmsEyebrow}
      </span>
    );
  }

  // Show "Step 3 of 4" if coming from connect page
  if (ref === 'connect') {
    return (
      <span className="font-serif italic text-white/70 text-sm">
        Step 3 of 4
      </span>
    );
  }

  // Default eyebrow
  return (
    <span className="font-serif italic text-white/70 text-sm">
      We're Here For You
    </span>
  );
};

export default PrayerHeroEyebrow;
