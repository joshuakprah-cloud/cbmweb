import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { ministriesPageQuery, allMinistriesQuery } from 'sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ministriesPageData = await client.fetch(ministriesPageQuery, {}, { next: { revalidate: 3600 } });
    
    return {
      title: ministriesPageData?.seo?.metaTitle || 'Ministries - ThaGospel Church',
      description: ministriesPageData?.seo?.metaDescription || 'Find your place to serve and grow in our various ministries.',
      openGraph: {
        title: ministriesPageData?.seo?.metaTitle || 'Ministries - ThaGospel Church',
        description: ministriesPageData?.seo?.metaDescription || 'Find your place to serve and grow in our various ministries.',
        images: ministriesPageData?.seo?.ogImage ? [urlFor(ministriesPageData.seo.ogImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching ministries metadata:', error);
    return {
      title: 'Ministries - ThaGospel Church',
      description: 'Find your place to serve and grow in our various ministries.',
    };
  }
}

export default async function MinistriesPage() {
  let ministriesPageData = null;
  let ministries = [];

  try {
    const [pageData, ministriesData] = await Promise.all([
      client.fetch(ministriesPageQuery, {}, { next: { revalidate: 3600 } }),
      client.fetch(allMinistriesQuery, {}, { next: { revalidate: 3600 } }),
    ]);

    ministriesPageData = pageData;
    ministries = ministriesData || [];
  } catch (error) {
    console.error('Error fetching ministries data:', error);
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ministries',
    description: ministriesPageData?.heroTagline || 'Find your place to serve and grow',
    itemListElement: ministries.map((ministry: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: ministry.name,
        description: ministry.tagline,
        url: `https://thagospel.com/ministries/${ministry.slug}`,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO SECTION - Styled like sermons page */}
      <section 
        className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center overflow-hidden"
        role="banner"
      >
        {/* Background Image with gradient fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        />
        
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Get Involved
          </h1>
          <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Every ministry at ThaGospel exists to help you grow, connect, and impact your world.
          </p>
        </div>
      </section>

      {/* 2. GET INVOLVED - PRAYER & WORSHIP */}
      <section className="py-20 px-4 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Get Involved
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
              Prayer & Worship
            </h2>
          </div>

          {/* Image Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Prayer Card */}
            <Link href="/ministries/prayer" className="group relative h-80 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/prayer.jpg"
                alt="Prayer Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">PRAYER</h3>
                <p className="text-white/80 text-sm">Intercession Team & Prayer Warriors</p>
              </div>
            </Link>

            {/* Choir Card */}
            <Link href="/ministries/choir" className="group relative h-80 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/choir.jpg"
                alt="Choir Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">CHOIR</h3>
                <p className="text-white/80 text-sm">Worship & Music Ministry</p>
              </div>
            </Link>

            {/* Media Card */}
            <Link href="/ministries/media" className="group relative h-80 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/media.jpg"
                alt="Media Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">MEDIA</h3>
                <p className="text-white/80 text-sm">Audio, Video & Social Media Teams</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. OUTREACH & MISSIONS */}
      <section className="py-20 px-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Get Involved
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
              Outreach & Missions
            </h2>
          </div>

          {/* Image Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Outreach Card */}
            <Link href="/ministries/outreach" className="group relative h-80 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/outreach.jpg"
                alt="Outreach Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">OUTREACH</h3>
                <p className="text-white/80 text-sm">Community Service & Local Missions</p>
              </div>
            </Link>

            {/* Evangelism Card */}
            <Link href="/ministries/evangelism" className="group relative h-80 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/evangelism.jpg"
                alt="Evangelism Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">EVANGELISM</h3>
                <p className="text-white/80 text-sm">Gospel Sharing & Soul Winning</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. LIFE GROUPS */}
      <section id="life-groups" className="py-20 px-4 bg-[#F8F9FB] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Get Involved
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
              Life Groups
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with others in your season of life
            </p>
          </div>

          {/* Image Cards Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Men Card */}
            <Link href="/ministries/men" className="group relative h-72 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/men.jpg"
                alt="Men's Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">MEN</h3>
                <p className="text-white/80 text-sm">Men's Fellowship & Discipleship</p>
              </div>
            </Link>

            {/* Women Card */}
            <Link href="/ministries/women" className="group relative h-72 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/women.jpg"
                alt="Women's Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">WOMEN</h3>
                <p className="text-white/80 text-sm">Women's Fellowship & Growth</p>
              </div>
            </Link>

            {/* Youth Card */}
            <Link href="/ministries/youth" className="group relative h-72 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/youth.jpg"
                alt="Youth Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">YOUTH</h3>
                <p className="text-white/80 text-sm">Youth Church & Programs</p>
              </div>
            </Link>

            {/* Children Card */}
            <Link href="/ministries/children" className="group relative h-72 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#0d9488]/20 group-hover:bg-[#0d9488]/30 transition-all duration-500 z-[5]" />
              <Image
                src="/images/children.jpg"
                alt="Children's Ministry"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">CHILDREN</h3>
                <p className="text-white/80 text-sm">Children's Church & Activities</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

