import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { featuredPostQuery, allPostsQuery } from 'sanity/lib/queries';
// Import BlogBrowser component
import BlogBrowser from '@/components/blog/BlogBrowser';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60; // 1 minute cache

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog | ThaGospel Church',
    description: 'Read inspiring stories, devotionals, and updates from our church community.',
    openGraph: {
      title: 'Blog | ThaGospel Church',
      description: 'Read inspiring stories, devotionals, and updates from our church community.',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | ThaGospel Church',
      description: 'Read inspiring stories, devotionals, and updates from our church community.',
    },
  };
}

export default async function BlogPage() {
  let featuredPost = null;
  let allPosts = [];

  try {
    const [featured, posts] = await Promise.all([
      client.fetch(featuredPostQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(allPostsQuery, {}, { next: { revalidate: 60 } }),
    ]);

    featuredPost = featured;
    allPosts = posts || [];
  } catch (error) {
    console.error('Error fetching blog data:', error);
    // Continue with empty arrays - will show no-content state
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ThaGospel Church Blog',
    description: 'Read inspiring stories, devotionals, and updates from our church community.',
    url: 'https://thagospel.com/media/blog',
    blogPost: allPosts.map((post: any) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://thagospel.com/media/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.authorName,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Blog
          </h1>
          <p className="text-lg md:text-xl font-light drop-shadow-lg">
            Read inspiring stories, devotionals, and updates from our church community
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* All Posts Section */}
        <section>
          {allPosts.length > 0 ? (
            <BlogBrowser posts={allPosts} />
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No blog posts available
              </h3>
              <p className="text-gray-600 mb-6">
                Check back soon for inspiring stories and updates from our community.
              </p>
              <Link 
                href="/media"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                <span>Back to Media</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
