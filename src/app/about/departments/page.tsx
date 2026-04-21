import { Metadata } from 'next';
import Link from 'next/link';
import AboutHero from '@/components/about/AboutHero';
import AboutCTA from '@/components/about/AboutCTA';
import { client } from '../../../../sanity/lib/client';
import { departmentsPageQuery } from '../../../../sanity/lib/queries';
import { urlFor } from '../../../../sanity/lib/image';
import { SEO_FALLBACKS } from '@/constants/fallbacks';

interface Department {
  id?: number;
  _id?: string;
  name: string;
  description: string;
  icon?: string;
  leader?: {
    name?: string;
    role?: string;
    photo?: any;
  };
  isActive?: boolean;
}

async function getDepartmentsData() {
  try {
    const data = await client.fetch(departmentsPageQuery, {}, { next: { revalidate: 60 } });
    return data;
  } catch (error) {
    console.error('Error fetching departments data:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDepartmentsData();
  const seoData = data?.seo || SEO_FALLBACKS;
  
  return {
    title: seoData.metaTitle || 'Our Departments | ThaGospel Church',
    description: seoData.metaDescription || 'Discover the various departments at ThaGospel Church and how they serve our community.',
  };
}

// Fallback departments data (static)
const fallbackDepartments = [
  {
    id: 1,
    name: 'Prayer Department',
    description: 'Interceding for the church, community, and world through the power of prayer and spiritual warfare.',
    icon: '🙏',
  },
  {
    id: 2,
    name: 'Ushering Department',
    description: 'Welcoming guests and creating a warm, inviting atmosphere for everyone who walks through our doors.',
    icon: '🤝',
  },
  {
    id: 3,
    name: 'Evangelism Department',
    description: 'Sharing the Gospel and reaching out to those who have not yet experienced the love of Christ.',
    icon: '📢',
  },
  {
    id: 4,
    name: 'Media Department',
    description: 'Capturing and sharing our story through photography, video production, and social media.',
    icon: '🎥',
  },
  {
    id: 5,
    name: 'Financial Department',
    description: 'Managing resources responsibly and supporting the financial operations of the church.',
    icon: '💰',
  },
  {
    id: 6,
    name: "Head Pastor's Department",
    description: 'Supporting the vision and leadership of our Head Pastor in shepherding the congregation.',
    icon: '👑',
  },
  {
    id: 7,
    name: 'Pastors Department',
    description: 'Working alongside our pastoral team in caring for the spiritual needs of our church family.',
    icon: '📖',
  },
  {
    id: 8,
    name: 'Ministers Department',
    description: 'Serving in various ministerial capacities to nurture and grow the body of Christ.',
    icon: '✝️',
  },
  {
    id: 9,
    name: 'Outreach Department',
    description: 'Serving our local community through practical acts of love, service, and meeting tangible needs.',
    icon: '🌍',
  },
  {
    id: 10,
    name: 'Choir Department',
    description: 'Leading the congregation in worship through powerful vocal ministry and musical excellence.',
    icon: '🎵',
  },
  {
    id: 11,
    name: 'Cell Leaders Department',
    description: 'Leading and shepherding small groups, fostering community and spiritual growth in intimate settings.',
    icon: '👥',
  },
  {
    id: 12,
    name: 'The Youth Church',
    description: 'Creating engaging environments where students can grow in faith and build lasting friendships.',
    icon: '🔥',
  },
  {
    id: 13,
    name: "Children's Church",
    description: 'Nurturing faith in our youngest generation through age-appropriate teaching and activities.',
    icon: '👶',
  },
  {
    id: 14,
    name: 'Follow Up and Communication Department',
    description: 'Connecting with visitors and members, ensuring no one falls through the cracks.',
    icon: '📞',
  },
  {
    id: 15,
    name: 'Administration Department',
    description: 'Keeping operations running smoothly through organizational and administrative support.',
    icon: '📋',
  },
];

export default async function DepartmentsPage() {
  const pageData = await getDepartmentsData();
  const departments: Department[] = pageData?.departments?.length > 0 
    ? pageData.departments 
    : fallbackDepartments;
  
  const heroTitle = pageData?.heroTitle || 'Our Departments';
  const heroSubtitle = pageData?.heroSubtitle || 'Discover the teams that make ThaGospel Church thrive';
  const introText = pageData?.introText || 'Each department plays a vital role in our mission to spread the Gospel and serve our community.';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thagospel.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://thagospel.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Departments', item: 'https://thagospel.com/about/departments' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <AboutHero
        headline={heroTitle}
        subheadline={heroSubtitle}
        bodyText={introText}
      />

      {/* Departments Grid */}
      <section className="bg-[#f9fafb] py-16 md:py-24 px-6 md:px-20 border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[13px] uppercase tracking-[0.1em] text-[#0d9488] font-semibold">The Teams</span>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111] leading-[1.1] mt-3">
              ThaGospel Church Departments
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              With room for growth and new departments to be added as God leads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept: Department) => (
              <div
                key={dept.id || dept._id || dept.name}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 group"
              >
                {/* Picture Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center overflow-hidden">
                  {/* Decorative pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full" />
                    <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full" />
                  </div>
                  {/* Icon */}
                  <div className="relative z-10 text-6xl">{dept.icon}</div>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-2 group-hover:text-[#0d9488] transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Join a Department CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              Interested in joining one of our departments? We are always looking for passionate individuals to serve.
            </p>
            <Link
              href="/connect"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0d9488] text-white font-semibold rounded-lg hover:bg-[#0f766e] transition-all duration-200"
            >
              Join a Department
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <AboutCTA />
    </>
  );
}
