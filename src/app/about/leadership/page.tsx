import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/about/PageHero';
import SectionHeader from '@/components/about/SectionHeader';
import LeadershipClient from '@/components/about/LeadershipClient';
import { StaffMember } from '@/types/staff';
import { client } from '../../../../sanity/lib/client';
import { leadershipPageQuery, staffMembersQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';
import Script from 'next/script';

async function getLeadershipData(): Promise<{ pageData: any; staffMembers: StaffMember[] }> {
  try {
    const [pageData, staffMembers] = await Promise.all([
      client.fetch(leadershipPageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(staffMembersQuery, {}, { next: { revalidate: 60 } }),
    ]);
    return { pageData: pageData || {}, staffMembers: staffMembers || [] };
  } catch (error) {
    console.error('Error fetching leadership data:', error);
    return { pageData: {}, staffMembers: [] };
  }
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function groupByCategory(members: StaffMember[]) {
  const groups: { [key: string]: StaffMember[] } = {};
  members.forEach(member => {
    const category = member.leadershipCategory || 'Team Members';
    if (!groups[category]) groups[category] = [];
    groups[category].push(member);
  });
  
  const categoryOrder = ['Pastoral Team', 'Ministry Leaders', 'Support Staff'];
  const sortedGroups: { [key: string]: StaffMember[] } = {};
  categoryOrder.forEach(cat => { if (groups[cat]) sortedGroups[cat] = groups[cat]; });
  Object.keys(groups).forEach(cat => { if (!sortedGroups[cat]) sortedGroups[cat] = groups[cat]; });
  return sortedGroups;
}

export async function generateMetadata(): Promise<Metadata> {
  let pageData = null;

  try {
    pageData = await client.fetch(leadershipPageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching leadership metadata:', error);
  }

  const seoData = pageData?.seo || SEO_FALLBACKS;
  const metaTitle = seoData.metaTitle || 'Our Leadership | ThaGospel Church';
  const metaDescription = seoData.metaDescription || 'Meet the leadership team of ThaGospel Church.';
  const ogImage = seoData.ogImage ? urlFor(seoData.ogImage).url() : null;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
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

export default async function LeadershipPage() {
  const { pageData, staffMembers } = await getLeadershipData();
  const groupedStaff = groupByCategory(staffMembers);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thagospel.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://thagospel.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Our Leadership', item: 'https://thagospel.com/about/leadership' },
    ],
  };

  const leadershipJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ThaGospel Church Leadership',
    url: 'https://thagospel.com/about/leadership',
    members: staffMembers.slice(0, 10).map((m: StaffMember) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
      image: m.photo ? urlFor(m.photo).url() : undefined,
    })),
  };

  return (
    <>
      <Script id="breadcrumb-data" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="leadership-data" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-4 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 00-1.414 0L8.586 9.414l4.293 4.293a1 1 0 001.414 1.414l-4.293-4.293z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Leadership</span>
            </li>
          </ol>
        </div>
      </nav>

      <PageHero 
        title={pageData?.heroTitle || 'Leadership'} 
        subtitle={pageData?.heroSubtitle || 'Meet our dedicated leadership team'}
        image={pageData?.heroBackgroundImage} 
      />

      {/* Leadership Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Leadership Team"
            subtitle="Meet the dedicated individuals who serve and lead our church"
          />
          
          <LeadershipClient groupedStaff={groupedStaff} />
        </div>
      </section>

      {/* Back to About */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to About
          </Link>
        </div>
      </section>
    </>
  );
}
