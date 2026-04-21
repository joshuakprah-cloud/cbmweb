import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { client } from 'sanity/lib/client';
import { aboutPageQuery, locationsQuery } from 'sanity/lib/queries';
import { urlFor } from 'sanity/lib/image';
import { ABOUT_FALLBACKS, SEO_FALLBACKS } from '@/constants/fallbacks';

// Components
import AboutHero from '@/components/about/AboutHero';
import FounderCallout from '@/components/about/FounderCallout';
import MissionVision from '@/components/about/MissionVision';
import AboutWhatToExpect from '@/components/about/AboutWhatToExpect';
import AboutLocations from '@/components/about/AboutLocations';
import AboutCTA from '@/components/about/AboutCTA';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let aboutData = null;

  try {
    aboutData = await client.fetch(aboutPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching about metadata:', error);
  }

  const seoData = aboutData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'About Us | ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Learn about ThaGospel Church\'s story, mission, vision, and the community that makes us who we are.';
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
      url: 'https://thagospel.com/about',
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

export default async function AboutOverview() {
  let aboutData = null;
  let locationsData = null;

  try {
    aboutData = await client.fetch(aboutPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching about data:', error);
  }

  try {
    locationsData = await client.fetch(locationsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching locations data:', error);
  }

  // Hero data
  const heroTitle = aboutData?.heroTitle || 'Who We Are';
  const heroSubtitle = aboutData?.heroSubtitle || 'A community built on love, humility, and the uncompromising Gospel of Jesus Christ.';
  const heroImage = aboutData?.heroImage ? urlFor(aboutData.heroImage).url() : undefined;
  
  // History content
  const historyTitle = aboutData?.historyTitle || 'How It All Began';
  const historyBody = aboutData?.historyBody;
  
  // Mission & Vision
  const missionStatement = aboutData?.missionStatement;
  const visionStatement = aboutData?.visionStatement;

  // Founder images - pull from leadership data or use fallback
  const prophetImage = aboutData?.founderImage ? urlFor(aboutData.founderImage).url() : undefined;
  const prophetessImage = aboutData?.coFounderImage ? urlFor(aboutData.coFounderImage).url() : undefined;

  // Format locations data
  const formattedLocations = (locationsData || []).map((loc: any) => ({
    _id: loc._id,
    name: loc.name,
    address: loc.address,
    city: loc.city,
    serviceTimes: loc.serviceTimes,
    image: loc.image ? urlFor(loc.image).url() : undefined,
    mapLink: loc.mapLink,
    phone: loc.phone,
    email: loc.email,
  }));

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: heroTitle,
    description: aboutData?.seo?.metaDescription || SEO_FALLBACKS.metaDescription,
    url: 'https://thagospel.com/about',
  };

  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. PAGE HERO */}
      <AboutHero
        image={heroImage}
      />

      {/* 2. WHO WE ARE / BELIEFS & VALUES */}
      <MissionVision 
        headline={aboutData?.missionVisionSection?.headline}
        eyebrow={aboutData?.missionVisionSection?.eyebrow}
        beliefsCard={aboutData?.missionVisionSection?.beliefsCard}
        valuesCard={aboutData?.missionVisionSection?.valuesCard}
      />

      {/* 3. LOCATIONS - Find the right experience */}
      <AboutLocations locations={formattedLocations} />

      {/* 4. FOUNDER CALLOUT */}
      <FounderCallout
        pastorsImage={heroImage}
        prophetName={aboutData?.founderName || "Prophet Powerman Bekoe"}
        prophetessName={aboutData?.coFounderName || "Prophetess Powerman Bekoe"}
        eyebrow={aboutData?.founderSection?.eyebrow}
        headline={aboutData?.founderSection?.headline}
        bioParagraph1={aboutData?.founderSection?.bioParagraph1}
        bioParagraph2={aboutData?.founderSection?.bioParagraph2}
        bioParagraph3={aboutData?.founderSection?.bioParagraph3}
        ctaPrimaryText={aboutData?.founderSection?.ctaPrimaryText}
        ctaSecondaryText={aboutData?.founderSection?.ctaSecondaryText}
      />

      {/* 5. WHAT TO EXPECT */}
      <AboutWhatToExpect 
        eyebrow={aboutData?.whatToExpectSection?.eyebrow}
        headline={aboutData?.whatToExpectSection?.headline}
        description={aboutData?.whatToExpectSection?.description}
        sermonImage={aboutData?.whatToExpectSection?.sermonImage ? urlFor(aboutData.whatToExpectSection.sermonImage).url() : undefined}
        latestSermonImage={aboutData?.whatToExpectSection?.latestSermonImage ? urlFor(aboutData.whatToExpectSection.latestSermonImage).url() : undefined}
        worshipImage={aboutData?.whatToExpectSection?.worshipImage ? urlFor(aboutData.whatToExpectSection.worshipImage).url() : undefined}
        communityImage={aboutData?.whatToExpectSection?.communityImage ? urlFor(aboutData.whatToExpectSection.communityImage).url() : undefined}
        sermonSection={{
          title: aboutData?.whatToExpectSection?.sermonTitle,
          leftText: aboutData?.whatToExpectSection?.sermonLeftText,
          rightText: aboutData?.whatToExpectSection?.sermonRightText
        }}
        worshipSection={{
          title: aboutData?.whatToExpectSection?.worshipTitle,
          leftText: aboutData?.whatToExpectSection?.worshipLeftText,
          rightText: aboutData?.whatToExpectSection?.worshipRightText
        }}
        communitySection={{
          title: aboutData?.whatToExpectSection?.communityTitle,
          leftText: aboutData?.whatToExpectSection?.communityLeftText,
          rightText: aboutData?.whatToExpectSection?.communityRightText
        }}
      />

      {/* 6. FINAL CTA */}
      <AboutCTA 
        headline={aboutData?.ctaSection?.headline}
        subtext={aboutData?.ctaSection?.subtext}
        primaryText={aboutData?.ctaSection?.primaryText}
        primaryLink={aboutData?.ctaSection?.primaryLink}
      />
    </>
  );
}
