import { Metadata } from 'next';
import Link from 'next/link';
import AboutHero from '@/components/about/AboutHero';
import AboutCTA from '@/components/about/AboutCTA';
import LeadershipClient from '@/components/about/LeadershipClient';
import { StaffMember } from '@/types/staff';
import { client } from '../../../../sanity/lib/client';
import { leadershipPageQuery, staffMembersQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';

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
  
  const categoryOrder = ['Head Pastors', 'Pastors', 'Ministers', 'Department Leaders'];
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipJsonLd) }}
      />

      {/* Hero Section */}
      <AboutHero
        headline="The People Who Lead"
        subheadline="Meet the pastoral team and ministry leaders behind ThaGospel Church."
        bodyText="Our leadership team is committed to shepherding the congregation with love, wisdom, and vision. Each leader brings unique gifts and a passion for seeing people grow in their faith and discover their purpose in Christ."
      />

      {/* Leadership Team Grid */}
      <section className="bg-[#f9fafb] py-16 md:py-24 px-6 md:px-20 border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-semibold">The Team</span>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111] leading-[1.1] mt-3">Our Leadership Team</h2>
          </div>

          {/* Head Pastors */}
          <div className="mb-16">
            <h3 className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-bold mb-8 border-b-2 border-[#e5e7eb] pb-3">
              Head Pastors
            </h3>
            {groupedStaff['Head Pastors'] ? (
              <LeadershipClient groupedStaff={{ 'Head Pastors': groupedStaff['Head Pastors'] }} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Head Pastor 1 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">👑</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Pastor Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Head Pastor</p>
                  </div>
                </div>

                {/* Head Pastor 2 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">👑</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Pastor Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Head Pastor</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pastors */}
          <div className="mb-16">
            <h3 className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-bold mb-8 border-b-2 border-[#e5e7eb] pb-3">
              Pastors
            </h3>
            {groupedStaff['Pastors'] ? (
              <LeadershipClient groupedStaff={{ 'Pastors': groupedStaff['Pastors'] }} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Pastor 1 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">📖</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Pastor Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Pastor</p>
                  </div>
                </div>

                {/* Pastor 2 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">📖</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Pastor Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Pastor</p>
                  </div>
                </div>

                {/* Pastor 3 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">📖</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Pastor Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Pastor</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ministers */}
          <div className="mb-16">
            <h3 className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-bold mb-8 border-b-2 border-[#e5e7eb] pb-3">
              Ministers
            </h3>
            {groupedStaff['Ministers'] ? (
              <LeadershipClient groupedStaff={{ 'Ministers': groupedStaff['Ministers'] }} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Minister 1 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">✝️</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Minister Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Minister</p>
                  </div>
                </div>

                {/* Minister 2 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">✝️</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Minister Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Minister</p>
                  </div>
                </div>

                {/* Minister 3 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">✝️</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Minister Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Minister</p>
                  </div>
                </div>

                {/* Minister 4 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                    <div className="relative z-10 text-6xl">✝️</div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Minister Name</h4>
                    <p className="text-[#0d9488] text-sm font-medium mt-1">Minister</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Department Leaders */}
          <div className="mb-16">
            <h3 className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-bold mb-8 border-b-2 border-[#e5e7eb] pb-3">
              Department Leaders
            </h3>
            <p className="text-gray-600 mb-6">
              Our Department Leaders oversee the various ministries that make ThaGospel Church thrive. 
              From Prayer and Ushering to Media and Outreach, each department plays a vital role.
            </p>
            {groupedStaff['Department Leaders'] ? (
              <LeadershipClient groupedStaff={{ 'Department Leaders': groupedStaff['Department Leaders'] }} />
            ) : (
              <>
                {/* Department Leaders Placeholder Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Prayer Department Leader */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                        <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                      </div>
                      <div className="relative z-10 text-6xl">🙏</div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Leader Name</h4>
                      <p className="text-[#0d9488] text-sm font-medium mt-1">Prayer Department</p>
                    </div>
                  </div>

                  {/* Ushering Department Leader */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                        <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                      </div>
                      <div className="relative z-10 text-6xl">🤝</div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Leader Name</h4>
                      <p className="text-[#0d9488] text-sm font-medium mt-1">Ushering Department</p>
                    </div>
                  </div>

                  {/* Media Department Leader */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                        <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                      </div>
                      <div className="relative z-10 text-6xl">🎥</div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Leader Name</h4>
                      <p className="text-[#0d9488] text-sm font-medium mt-1">Media Department</p>
                    </div>
                  </div>

                  {/* Choir Department Leader */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                        <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                      </div>
                      <div className="relative z-10 text-6xl">🎵</div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Leader Name</h4>
                      <p className="text-[#0d9488] text-sm font-medium mt-1">Choir Department</p>
                    </div>
                  </div>

                  {/* Youth Church Leader */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                        <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                      </div>
                      <div className="relative z-10 text-6xl">🔥</div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Leader Name</h4>
                      <p className="text-[#0d9488] text-sm font-medium mt-1">The Youth Church</p>
                    </div>
                  </div>

                  {/* Outreach Department Leader */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                        <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                      </div>
                      <div className="relative z-10 text-6xl">🌍</div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0d9488] transition-colors">Leader Name</h4>
                      <p className="text-[#0d9488] text-sm font-medium mt-1">Outreach Department</p>
                    </div>
                  </div>
                </div>

                <div className="text-center py-6 bg-white rounded-xl border border-[#e5e7eb]">
                  <p className="text-gray-500 mb-4">More department leaders coming soon.</p>
                  <Link 
                    href="/about/departments" 
                    className="inline-flex items-center text-[#0d9488] font-semibold hover:text-[#0c857a]"
                  >
                    View All Departments
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <AboutCTA />
    </>
  );
}
