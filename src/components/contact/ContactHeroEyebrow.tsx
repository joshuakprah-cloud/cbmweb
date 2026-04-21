'use client';

import { useSearchParams } from 'next/navigation';

interface ContactHeroEyebrowProps {
  cmsEyebrow?: string | null;
}

const ContactHeroEyebrow: React.FC<ContactHeroEyebrowProps> = ({ cmsEyebrow }) => {
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

  // Show "Step 2 of 4" if coming from connect page
  if (ref === 'connect') {
    return (
      <span className="font-serif italic text-white/70 text-sm">
        Step 2 of 4
      </span>
    );
  }

  // Default eyebrow
  return (
    <span className="font-serif italic text-white/70 text-sm">
      Get in Touch
    </span>
  );
};

export default ContactHeroEyebrow;
