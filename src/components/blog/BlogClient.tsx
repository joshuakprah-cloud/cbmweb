'use client';

import { useState, useCallback, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage?: any;
  author: {
    name: string;
    role: string;
    photo?: any;
  };
  category: string;
  readTime: number;
  tags: string[];
}

interface BlogClientProps {
  featuredPost: Post;
  initialPosts: Post[];
}

export default function BlogClient({ featuredPost, initialPosts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(9);

  // Categories from CMS
  const categories = useMemo(() => [
    'All Posts',
    'Pastor Reflections',
    'Faith & Devotion',
    'Event Recaps',
    'Announcements'
  ], []);

  // Filter and sort posts
  const filteredPosts = useCallback(() => {
    let filtered = initialPosts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return (b.readTime || 0) - (a.readTime || 0); // Fallback popularity metric
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialPosts, searchQuery, activeCategory, sortOrder]);

  const displayedPosts = filteredPosts().slice(0, visibleCount);

  // Load more posts
  const loadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  // Share post
  const sharePost = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/media/blog/${post.slug.current}`
      });
    } else {
      navigator.clipboard.writeText(`/media/blog/${post.slug.current}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0ee]">
      <Navbar />
      
      {/* 1. PAGE HERO — SPLIT LAYOUT */}
      <section className="flex flex-col lg:flex-row pt-[72px]">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-2/5 bg-[#f0f0ee] p-16 lg:p-20 flex flex-col justify-center">
          {/* Large page label */}
          <h1 
            className="text-black font-bold mb-8 text-center lg:text-left"
            style={{ 
              fontSize: '65px',
              lineHeight: '1',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            BLOG
          </h1>
          
          {/* Tagline */}
          <h2 
            className="text-black font-serif italic mb-8 text-center lg:text-left"
            style={{ 
              fontSize: '60px',
              lineHeight: '1.1',
              maxWidth: '420px'
            }}
          >
            Words That Build Faith.
          </h2>
          
          {/* Intro copy */}
          <p 
            className="text-gray-700 text-center lg:text-left"
            style={{ 
              fontSize: '16px',
              lineHeight: '1.7',
              maxWidth: '420px'
            }}
          >
            Reflections, devotionals, and stories from our pastors and community. Fresh content every week.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-3/5 p-16 lg:p-20 flex items-center justify-center">
          <div style={{
            background: '#2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: '600px',
            borderRadius: '20px',
            color: '#888',
            fontSize: '14px',
          }}>
            Blog Hero Image — 860 x 680px
          </div>
          {/* TODO: Replace with real editorial/community photo — 860 x 680px */}
        </div>
      </section>

      {/* 2. FEATURED POST */}
      <section className="bg-[#f0f0ee] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT — COVER IMAGE */}
            <div>
              <div style={{
                background: '#374151',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '14px',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              }}
              >
                Featured Post Cover — 720 x 405px
              </div>
              {/* TODO: Replace with featured post coverImage from Sanity CMS */}
            </div>

            {/* RIGHT — POST DETAILS */}
            <div>
              {/* Small label */}
              <div 
                className="text-teal-500 uppercase tracking-wide mb-3"
                style={{ 
                  fontSize: '12px',
                  letterSpacing: '0.15em'
                }}
              >
                FEATURED POST
              </div>
              
              {/* Category badge */}
              <div 
                className="inline-block bg-teal-600 text-white text-[11px] uppercase font-medium rounded-[50px] px-3 py-1 mb-4"
                style={{ letterSpacing: '0.05em' }}
              >
                {featuredPost.category}
              </div>
              
              {/* Post title */}
              <h3 
                className="text-black font-bold mb-4"
                style={{ 
                  fontSize: '40px',
                  lineHeight: '1.2',
                  maxWidth: '3 lines'
                }}
              >
                {featuredPost.title}
              </h3>
              
              {/* Excerpt */}
              <p 
                className="text-[#555] mb-6"
                style={{ 
                  fontSize: '16px',
                  lineHeight: '1.7',
                  maxWidth: '480px'
                }}
              >
                {featuredPost.excerpt}
              </p>
              
              {/* Author row */}
              <div className="flex items-center gap-3 mb-6">
                <div 
                  style={{
                    background: '#9ca3af',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                {/* TODO: Replace with author photo from Sanity CMS */}
                
                <div>
                  <div 
                    className="text-black font-bold"
                    style={{ fontSize: '14px' }}
                  >
                    {featuredPost.author.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[#888]"
                      style={{ fontSize: '13px' }}
                    >
                      {featuredPost.author.role}
                    </span>
                    <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
                    <span 
                      className="text-[#888]"
                      style={{ fontSize: '13px' }}
                    >
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
                    <span 
                      className="text-[#888]"
                      style={{ fontSize: '13px' }}
                    >
                      {featuredPost.readTime} min read
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Two pill buttons */}
              <div className="flex gap-3">
                <a 
                  href={`/media/blog/${featuredPost.slug.current}`}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
                  style={{ fontSize: '13px', letterSpacing: '0.05em' }}
                >
                  READ POST
                </a>
                <button 
                  onClick={() => sharePost(featuredPost)}
                  className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
                  style={{ fontSize: '13px', letterSpacing: '0.05em' }}
                >
                  SHARE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILTER BAR */}
      <div 
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 40,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 40px',
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1280px',
            margin: '0 auto',
            gap: '16px',
          }}
        >
          {/* LEFT — SEARCH INPUT */}
          <div style={{ 
            position: 'relative', 
            flexShrink: 0,
            width: '260px',
          }}>
            <MagnifyingGlassIcon style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#9ca3af',
            }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '50px',
                padding: '10px 16px 10px 40px',
                fontSize: '13px',
                color: '#1a1a1a',
                outline: 'none',
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => 
                (e.target as HTMLInputElement).style.borderColor = '#14b8a6'
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => 
                (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'
              }
            />
          </div>

          {/* CENTER — CATEGORY TABS */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === 'All Posts' ? 'all' : category)}
                style={{
                  background: (category === 'All Posts' ? activeCategory === 'all' : activeCategory === category) ? '#14b8a6' : 'transparent',
                  border: '1px solid #e5e7eb',
                  color: (category === 'All Posts' ? activeCategory === 'all' : activeCategory === category) ? '#ffffff' : '#555555',
                  borderRadius: '50px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: (category === 'All Posts' ? activeCategory === 'all' : activeCategory === category) ? 'bold' : 'normal',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (!(category === 'All Posts' ? activeCategory === 'all' : activeCategory === category)) {
                    (e.target as HTMLButtonElement).style.borderColor = '#14b8a6';
                    (e.target as HTMLButtonElement).style.color = '#14b8a6';
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (!(category === 'All Posts' ? activeCategory === 'all' : activeCategory === category)) {
                    (e.target as HTMLButtonElement).style.borderColor = '#e5e7eb';
                    (e.target as HTMLButtonElement).style.color = '#555555';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* RIGHT — SORT */}
          <div style={{
            flexShrink: 0,
          }}>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                backgroundColor: '#ffffff',
                outline: 'none',
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. POSTS GRID */}
      <section className="bg-[#f0f0ee] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="mb-10">
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Latest Posts
            </span>
            <div className="flex items-center gap-4 mt-2">
              <h2 
                className="text-black font-bold"
                style={{ fontSize: '32px' }}
              >
                {activeCategory === 'all' ? 'All Posts' : activeCategory}
              </h2>
              <span 
                className="text-gray-600"
                style={{ fontSize: '14px' }}
              >
                ({filteredPosts().length} posts)
              </span>
            </div>
          </div>

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post, index) => (
              <div
                key={post._id}
                className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden hover:border-teal-500 transition-all duration-200"
                style={{
                  // Wide card for first post when all posts
                  ...(index === 0 && activeCategory === 'all' && {
                    gridColumn: 'span 3',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                  })
                }}
              >
                {index === 0 && activeCategory === 'all' ? (
                  /* WIDE CARD */
                  <>
                    <div style={{
                      background: '#d1d5db',
                      aspectRatio: '16/9',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '12px',
                    }}>
                      Post Cover — 400 x 225px
                    </div>
                    {/* TODO: Replace with post coverImage from Sanity CMS */}
                    
                    <div className="p-6 flex flex-col justify-center">
                      <div 
                        className="inline-block bg-teal-600 text-white text-[11px] uppercase font-medium rounded-[50px] px-3 py-1 mb-4"
                        style={{ letterSpacing: '0.05em' }}
                      >
                        {post.category}
                      </div>
                      
                      <h3 
                        className="text-black font-bold mb-3"
                        style={{ 
                          fontSize: '24px',
                          lineHeight: '1.3'
                        }}
                      >
                        {post.title}
                      </h3>
                      
                      <p 
                        className="text-[#666] mb-4"
                        style={{ 
                          fontSize: '14px',
                          lineHeight: '1.6'
                        }}
                      >
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          style={{
                            background: '#9ca3af',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            flexShrink: 0,
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-[#555]"
                            style={{ fontSize: '13px' }}
                          >
                            {post.author.name}
                          </span>
                          <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
                          <span 
                            className="text-[#888]"
                            style={{ fontSize: '13px' }}
                          >
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
                          <span 
                            className="text-[#888]"
                            style={{ fontSize: '13px' }}
                          >
                            {post.readTime} min read
                          </span>
                        </div>
                      </div>
                      
                      <a 
                        href={`/media/blog/${post.slug.current}`}
                        className="text-teal-600 hover:text-teal-700 font-semibold"
                        style={{ fontSize: '13px' }}
                      >
                        READ MORE →
                      </a>
                    </div>
                  </>
                ) : (
                  /* STANDARD POST CARD */
                  <>
                    <div style={{
                      background: '#d1d5db',
                      width: '100%',
                      aspectRatio: '16/9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '12px',
                    }}>
                      Post Cover — 400 x 225px
                    </div>
                    {/* TODO: Replace with post coverImage from Sanity CMS */}
                    
                    <div className="p-5">
                      <div 
                        className="inline-block bg-teal-600 text-white text-[11px] uppercase font-medium rounded-[50px] px-3 py-1 mb-3"
                        style={{ letterSpacing: '0.05em' }}
                      >
                        {post.category}
                      </div>
                      
                      <h3 
                        className="text-black font-bold mb-3"
                        style={{ 
                          fontSize: '18px',
                          lineHeight: '1.3'
                        }}
                      >
                        {post.title}
                      </h3>
                      
                      <p 
                        className="text-[#666] mb-3"
                        style={{ 
                          fontSize: '14px',
                          lineHeight: '1.6'
                        }}
                      >
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          style={{
                            background: '#9ca3af',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            flexShrink: 0,
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-[#555]"
                            style={{ fontSize: '13px' }}
                          >
                            {post.author.name}
                          </span>
                          <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
                          <span 
                            className="text-[#888]"
                            style={{ fontSize: '13px' }}
                          >
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
                          <span 
                            className="text-[#888]"
                            style={{ fontSize: '13px' }}
                          >
                            {post.readTime} min read
                          </span>
                        </div>
                      </div>
                      
                      <a 
                        href={`/media/blog/${post.slug.current}`}
                        className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                        style={{ fontSize: '13px' }}
                      >
                        READ MORE →
                      </a>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOAD MORE */}
      <section className="bg-[#f0f0ee] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {visibleCount < filteredPosts().length && (
            <button 
              onClick={loadMore}
              className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3.5 px-10 rounded-[50px] transition-all duration-200 mb-4"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
            >
              LOAD MORE POSTS
            </button>
          )}
          
          <p className="text-gray-600 text-[13px]">
            {/* TODO: Implement Sanity CMS pagination with offset/limit GROQ queries */}
            Showing {displayedPosts.length} of {filteredPosts().length} posts
          </p>
        </div>
      </section>

      {/* 6. NEWSLETTER CTA */}
      <section className="bg-[#2a2a2a] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span 
            className="text-[#aaaaaa] italic"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Georgia, serif'
            }}
          >
            Stay in the Word
          </span>
          <h2 
            className="text-white font-bold mt-2 mb-6"
            style={{ 
              fontSize: '40px',
              lineHeight: '1.1'
            }}
          >
            Get Fresh Content Every Week.
          </h2>
          <p 
            className="text-[#888] text-[16px] mb-8"
            style={{ 
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}
          >
            New posts from our pastors delivered straight to your inbox. No spam, ever.
          </p>
          
          <div className="flex justify-center items-center gap-0 max-w-[400px] mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-[#2a2a2a] text-white placeholder:text-gray-400 border border-gray-600 rounded-l-[50px] py-3.5 px-6 text-[13px] focus:outline-none focus:border-teal-500"
              style={{ 
                borderRadius: '50px 0 0 50px',
                width: '300px'
              }}
            />
            <button 
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-r-[50px] transition-all duration-200"
              style={{ 
                fontSize: '13px',
                letterSpacing: '0.05em',
                borderRadius: '0 50px 50px 0'
              }}
            >
              SUBSCRIBE
            </button>
          </div>
          
          {/* TODO: Connect to real newsletter API or email service */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
