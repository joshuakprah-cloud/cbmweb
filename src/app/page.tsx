import HeroSection from '../components/home/HeroSection';
import WelcomeSection from '../components/home/WelcomeSection';
import ServiceTimesStrip from '../components/home/ServiceTimesStrip';
import WhatToExpect from '../components/home/WhatToExpect';
import UpcomingEventsCarousel from '../components/home/UpcomingEventsCarousel';
import MinistriesSnapshot from '../components/home/MinistriesSnapshot';
import PastorTeaser from '../components/home/PastorTeaser';
import SermonsTeaser from '../components/home/SermonsTeaser';
import TestimonySection from '../components/home/TestimonySection';
import ClosingCTA from '../components/home/ClosingCTA';
import { client } from '../../sanity/lib/client';
import { homepageQuery, siteSettingsQuery, upcomingEventsQuery, recentSermonsQuery, activeTestimoniesQuery } from '../../sanity/lib/queries';
import { urlFor } from '../../sanity/lib/image';
import { SEO_FALLBACKS, SERVICE_TIMES_FALLBACK } from '../constants/fallbacks';
import Script from 'next/script';
import { Metadata } from 'next';

export const revalidate = 300; // 5 minutes cache for homepage

export async function generateMetadata(): Promise<Metadata> {
  let homepageData = null;
  let siteSettingsData = null;

  try {
    const [homepage, siteSettings] = await Promise.all([
      client.fetch(homepageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    homepageData = homepage;
    siteSettingsData = siteSettings;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  // Use SEO data from CMS or fallbacks
  const seoData = homepageData?.seo || siteSettingsData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || SEO_FALLBACKS.metaTitle;
  const metaDescription = seoData.metaDescription || SEO_FALLBACKS.metaDescription;
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
      url: 'https://thagospel.com',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: !seoData.noIndex,
      follow: true,
    },
  };
}

interface MinistryLink {
  title: string;
  href: string;
  image?: any; // Sanity image object
}

interface Sermon {
  thumbnail: string;
  title: string;
  speaker: string;
  date: string;
  watchUrl: string;
}

interface MinistryItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  image?: any;
}

interface EventItem {
  title: string;
  date: string;
  time: string;
  venue: string;
  flyerImage?: any;
}

export default async function Home() {
  let homepageData = null;
  let siteSettingsData = null;
  let upcomingEventsData = null;
  let recentSermonsData = null;
  let activeTestimoniesData = null;

  try {
    // Fetch all data in parallel
    const [homepage, siteSettings, upcomingEvents, recentSermons, activeTestimonies] = await Promise.all([
      client.fetch(homepageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(upcomingEventsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(recentSermonsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(activeTestimoniesQuery, {}, { next: { revalidate: 60 } }),
    ]);

    homepageData = homepage;
    siteSettingsData = siteSettings;
    upcomingEventsData = upcomingEvents;
    recentSermonsData = recentSermons;
    activeTestimoniesData = activeTestimonies;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Continue with null data - will use fallbacks
  }

  // Generate JSON-LD structured data for Church
  const serviceTimes = siteSettingsData?.serviceTimes || SERVICE_TIMES_FALLBACK;
  const churchJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'ThaGospel Church',
    url: 'https://thagospel.com',
    logo: siteSettingsData?.logo ? urlFor(siteSettingsData.logo).url() : 'https://thagospel.com/logo.png',
    description: homepageData?.seo?.metaDescription || SEO_FALLBACKS.metaDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettingsData?.address?.street || 'Main Campus',
      addressLocality: siteSettingsData?.address?.city || 'Accra',
      addressCountry: siteSettingsData?.address?.country || 'GH',
    },
    openingHours: serviceTimes.map((service: any) => {
      const dayMap: { [key: string]: string } = {
        'Sunday': 'Sunday',
        'Monday': 'Monday',
        'Tuesday': 'Tuesday',
        'Wednesday': 'Wednesday',
        'Thursday': 'Thursday',
        'Friday': 'Friday',
        'Saturday': 'Saturday',
      };
      
      const day = dayMap[service.day] || service.day;
      const timeRange = service.timeRange || service.time || '9:00 AM - 12:00 PM';
      const [openTime, closeTime] = timeRange.split(' - ').map((time: string) => {
        const [timeStr, period] = time.trim().split(' ');
        const [hours, minutes] = timeStr.split(':').map(Number);
        const hour24 = period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours;
        return `${hour24.toString().padStart(2, '0')}:${minutes || '00'}`;
      });

      return `${day} ${openTime}-${closeTime}`;
    }),
    sameAs: [
      siteSettingsData?.socialMedia?.facebook || 'https://facebook.com/thagospel',
      siteSettingsData?.socialMedia?.twitter || 'https://twitter.com/thagospel',
      siteSettingsData?.socialMedia?.instagram || 'https://instagram.com/thagospel',
    ].filter(Boolean),
  };

  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-teal-600 focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
      />
      
      <main id="main-content">
        {/* 1. Hero Section - Only h1 on the page */}
        <HeroSection slides={homepageData?.heroSlides || []} />

        {/* 2. What To Expect - Moved higher for mobile (2nd position) */}
        <WhatToExpect 
          title={homepageData?.whatToExpectSection?.title}
          headline={homepageData?.whatToExpectSection?.headline}
          description={homepageData?.whatToExpectSection?.description}
          expectations={homepageData?.whatToExpectSection?.expectations || []}
        />

        {/* 3. Welcome Section */}
        <WelcomeSection
          welcomeTitle={homepageData?.welcomeSection?.title}
          welcomeMessage={homepageData?.welcomeSection?.message}
          pastorImage1={homepageData?.welcomeSection?.image ? urlFor(homepageData.welcomeSection.image).url() : '/placeholder-pastor1.jpg'}
        />

        {/* 4. Service Times Strip */}
        <ServiceTimesStrip serviceTimes={siteSettingsData?.serviceTimes} />

        {/* 5. Upcoming Events */}
        <UpcomingEventsCarousel events={upcomingEventsData} />

        {/* 6. Ministries Snapshot */}
        <MinistriesSnapshot />

        {/* 7. Pastor Teaser */}
        <PastorTeaser
          pastorImage1={homepageData?.pastorSection?.pastorImage ? urlFor(homepageData.pastorSection.pastorImage).url() : '/placeholder-pastor1.jpg'}
          malePastorName={homepageData?.pastorSection?.pastorName}
        />

        {/* 8. Sermons Teaser */}
        <SermonsTeaser sermons={recentSermonsData} />

        {/* 9. Testimony Section */}
        <TestimonySection testimonies={activeTestimoniesData} />

        {/* 10. Closing CTA */}
        <ClosingCTA />
      </main>
    </>
  );
}
