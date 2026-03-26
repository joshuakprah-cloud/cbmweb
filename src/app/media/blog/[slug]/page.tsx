import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import { client } from '@/sanity/lib/client';
import { postBySlugQuery, relatedPostsQuery, allPostsQuery } from 'sanity/lib/queries';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export const revalidate = 60; // 1 minute cache

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  let post = null;
  let relatedPosts = [];

  try {
    const [postData, relatedData] = await Promise.all([
      client.fetch(postBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } }),
      client.fetch(relatedPostsQuery, { currentPostId: params.slug }, { next: { revalidate: 60 } }),
    ]);

    post = postData;
    relatedPosts = relatedData || [];
  } catch (error) {
    console.error('Error fetching post data:', error);
  }

  if (!post) {
    notFound();
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? urlFor(post.coverImage).url() : undefined,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ThaGospel Church',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://thagospel.com/media/blog/${post.slug}`,
    },
  };

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="my-8">
            <div className="relative w-full h-96">
              <Image
                src={urlFor(value).url()}
                alt={value.alt || 'Blog post image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
            {value.caption && (
              <p className="text-center text-sm text-gray-600 mt-2 italic">
                {value.caption}
              </p>
            )}
          </div>
        );
      },
    },
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>,
      h4: ({ children }: any) => <h4 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h4>,
      normal: ({ children }: any) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-4 bg-orange-50 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="text-blue-600 hover:text-blue-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      {/* Hero Section with Cover Image */}
      <section className="relative">
        {post.coverImage ? (
          <div className="relative h-96">
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  {post.author?.photo && (
                    <Image
                      src={urlFor(post.author.photo).width(48).height(48).url()}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{post.author?.name}</p>
                    <p className="text-gray-300">{post.author?.role}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <time dateTime={post.publishedAt} className="text-gray-300">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span className="text-gray-300">{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-64 bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm">
                {post.author?.photo && (
                  <Image
                    src={urlFor(post.author.photo).width(48).height(48).url()}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{post.author?.name}</p>
                  <p className="text-gray-300">{post.author?.role}</p>
                </div>
                <div className="flex-1">
                  <time dateTime={post.publishedAt} className="text-gray-300">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span className="text-gray-300">{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Post Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {post.body && (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share and Author Bio */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Share Buttons */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
              <ShareButton url={`https://thagospel.com/media/blog/${post.slug}`} title={post.title} />
            </div>

            {/* Author Bio */}
            {post.author && (
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About the author</h3>
                <div className="flex gap-4">
                  {post.author.photo && (
                    <Image
                      src={urlFor(post.author.photo).width(80).height(80).url()}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{post.author.role}</p>
                    {post.author.bio && (
                      <p className="text-gray-700 text-sm">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <PostCard
                  key={relatedPost.slug}
                  title={relatedPost.title}
                  slug={relatedPost.slug}
                  excerpt={relatedPost.excerpt}
                  coverImage={relatedPost.coverImage}
                  publishedAt={relatedPost.publishedAt}
                  readTime={relatedPost.readTime}
                  authorName={relatedPost.authorName}
                  authorPhoto={relatedPost.authorPhoto}
                  categoryTitles={relatedPost.categoryTitles}
                  tags={relatedPost.tags}
                  variant="grid"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

// Share Button Component
function ShareButton({ url, title }: { url: string; title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this blog post from ThaGospel Church: ${title}`,
          url,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
      </svg>
      Share Post
    </button>
  );
}

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    const posts = await client.fetch(allPostsQuery, {}, { next: { revalidate: 3600 } });
    
    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export const dynamic = 'force-static';

// Generate metadata for individual posts
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await client.fetch(postBySlugQuery, { slug: params.slug }, { next: { revalidate: 3600 } });

    if (!post) {
      return {
        title: 'Post Not Found - ThaGospel Church',
      };
    }

    return {
      title: `${post.title} - ThaGospel Church`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author?.name],
        images: post.coverImage ? [urlFor(post.coverImage).url()] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [urlFor(post.coverImage).url()] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post - ThaGospel Church',
    };
  }
}
