'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: any;
  publishedAt: string;
  readTime?: number;
  authorName: string;
  authorPhoto?: any;
  categories?: Array<{ title: string }>;
  body?: any;
}

interface BlogBrowserProps {
  posts: BlogPost[];
}

const BlogBrowser: React.FC<BlogBrowserProps> = ({ posts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  // Categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    posts.forEach(post => {
      if (post.categories) {
        post.categories.forEach(cat => uniqueCategories.add(cat.title));
      }
    });
    return Array.from(uniqueCategories);
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.categories?.some(cat => cat.title.toLowerCase() === activeCategory.toLowerCase())
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.authorName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [posts, activeCategory, searchQuery]);

  // Pagination
  const postsPerPage = 9;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const newUrl = `/media/blog${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl, { scroll: false });
  }, [searchQuery, activeCategory, currentPage, router]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setCurrentPage(1);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'devotional': return 'bg-purple-100 text-purple-800';
      case 'testimony': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'teaching': return 'bg-orange-100 text-orange-800';
      case 'announcement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateReadTime = (post: BlogPost) => {
    if (post.readTime) return post.readTime;
    if (post.body) {
      // Simple word count calculation
      const text = JSON.stringify(post.body).replace(/[^a-zA-Z0-9\s]/g, '');
      const wordCount = text.split(/\s+/).length;
      return Math.ceil(wordCount / 200);
    }
    return 5; // Default 5 minutes
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('devotional')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'devotional'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Devotional
        </button>
        <button
          onClick={() => setActiveCategory('testimony')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'testimony'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Testimony
        </button>
        <button
          onClick={() => setActiveCategory('news')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'news'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          News
        </button>
        <button
          onClick={() => setActiveCategory('teaching')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'teaching'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Teaching
        </button>
        <button
          onClick={() => setActiveCategory('announcement')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'announcement'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Announcement
        </button>
      </div>

      {/* Search and Clear Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="text-center mb-8">
        <p className="text-gray-600">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
        </p>
      </div>

      {/* Blog Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedPosts.map((post) => (
            <div key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Featured Image */}
              <div className="relative aspect-video">
                {post.coverImage ? (
                  <Image
                    src={urlFor(post.coverImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">📝</span>
                  </div>
                )}
                
                {/* Category Badge */}
                {post.categories && post.categories.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(post.categories[0].title)}`}>
                      {post.categories[0].title}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  <Link href={`/media/blog/${post.slug}`} className="hover:text-orange-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  {post.authorPhoto ? (
                    <div className="relative w-8 h-8">
                      <Image
                        src={urlFor(post.authorPhoto).url()}
                        alt={post.authorName}
                        fill
                        className="rounded-full object-cover"
                        sizes="32px"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-xs">👤</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">{post.authorName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{calculateReadTime(post)} min read</span>
                </div>

                {/* Read More Button */}
                <Link
                  href={`/media/blog/${post.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Read More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600">
            No articles found. Try a different category or search term.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-orange-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogBrowser;
