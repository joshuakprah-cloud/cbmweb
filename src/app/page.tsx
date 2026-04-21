import HeroSection from '../components/home/HeroSection';
import WelcomeSection from '../components/home/WelcomeSection';
import ServiceTimesStrip from '../components/home/ServiceTimesStrip';
import WhatToExpect from '../components/home/WhatToExpect';
import UpcomingEventsCarousel from '../components/home/UpcomingEventsCarousel';
import MinistriesSnapshot from '../components/home/MinistriesSnapshot';
import SermonsTeaser from '../components/home/SermonsTeaser';
import TestimonySection from '../components/home/TestimonySection';
import ClosingCTA from '../components/home/ClosingCTA';
import { client } from '../../sanity/lib/client';
import { homepageQuery, siteSettingsQuery, upcomingEventsQuery, recentSermonsQuery } from '../../sanity/lib/queries';
import { urlFor } from '../../sanity/lib/image';
import { SEO_FALLBACKS, SERVICE_TIMES_FALLBACK } from '../constants/fallbacks';
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

  try {
    // Fetch all data in parallel
    const [homepage, siteSettings, upcomingEvents, recentSermons] = await Promise.all([
      client.fetch(homepageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(upcomingEventsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(recentSermonsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    homepageData = homepage;
    siteSettingsData = siteSettings;
    upcomingEventsData = upcomingEvents;
    recentSermonsData = recentSermons;
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

      <script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
      />
      
      <main id="main-content">
        {/* 1. Hero Section - Only h1 on the page */}
        <HeroSection slides={homepageData?.heroSlides || []} />

        {/* 2. Welcome & Pastor Section (Merged) */}
        <WelcomeSection
          welcomeHeading={homepageData?.welcomeSection?.title}
          welcomeBody={homepageData?.welcomeSection?.message}
          welcomeImage={homepageData?.welcomeSection?.image ? urlFor(homepageData.welcomeSection.image).url() : undefined}
          pastorName={homepageData?.pastorSection?.pastorName}
          pastorTitle={`Lead Pastor, ThaGospel Church`}
          pastorBio={homepageData?.pastorSection?.pastorBio}
          pastorImage={homepageData?.pastorSection?.pastorImage ? urlFor(homepageData.pastorSection.pastorImage).url() : undefined}
          pastorCtaLabel={homepageData?.pastorSection?.primaryCtaText || "Meet Prophet Bekoe"}
          pastorCtaLink={homepageData?.pastorSection?.primaryCtaLink || "/about/leadership"}
        />

        {/* 3. Service Times Strip */}
        <ServiceTimesStrip serviceTimes={siteSettingsData?.serviceTimes} />

        {/* 4. What To Expect */}
        <WhatToExpect 
          title={homepageData?.whatToExpectSection?.title}
          headline={homepageData?.whatToExpectSection?.headline}
          description={homepageData?.whatToExpectSection?.description}
          expectations={homepageData?.whatToExpectSection?.expectations || []}
        />

        {/* 5. Sermons Teaser */}
        <SermonsTeaser sermons={recentSermonsData} />

        {/* 6. Ministries Snapshot */}
        <MinistriesSnapshot 
          sectionLabel={homepageData?.ministriesSection?.sectionLabel}
          title={homepageData?.ministriesSection?.title}
          description={homepageData?.ministriesSection?.description}
          featuredMinistries={homepageData?.ministriesSection?.featuredMinistries || []}
          ctaText={homepageData?.ministriesSection?.ctaText}
          ctaLink={homepageData?.ministriesSection?.ctaLink}
        />

        {/* 7. Upcoming Events */}
        <UpcomingEventsCarousel 
          events={upcomingEventsData}
          sectionTitle={homepageData?.upcomingEventsSection?.title || 'Upcoming Events'}
        />

        {/* 8. Testimony Section */}
        <TestimonySection 
          testimonies={homepageData?.testimonySection?.featuredTestimonies || []}
          sectionTitle={homepageData?.testimonySection?.title}
          sectionDescription={homepageData?.testimonySection?.description}
          ctaText={homepageData?.testimonySection?.ctaText}
          ctaLink={homepageData?.testimonySection?.ctaLink}
        />

        {/* 9. Closing CTA */}
        <ClosingCTA 
          title={homepageData?.closingCTASection?.title}
          description={homepageData?.closingCTASection?.description}
          primaryCtaText={homepageData?.closingCTASection?.primaryCtaText}
          primaryCtaLink={homepageData?.closingCTASection?.primaryCtaLink}
          secondaryCtaText={homepageData?.closingCTASection?.secondaryCtaText}
          secondaryCtaLink={homepageData?.closingCTASection?.secondaryCtaLink}
        />
      </main>
    </>
  );
}
