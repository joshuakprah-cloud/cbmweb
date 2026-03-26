'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  LinkIcon,
  ShareIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage?: any;
  body: any[]; // Portable Text
  readTime: number;
  tags: string[];
  author: {
    name: string;
    role: string;
    bio: string;
    photo?: any;
  };
  category: string;
}

interface PostClientProps {
  post: Post;
  relatedPosts: Post[];
}

export default function PostClient({ post, relatedPosts }: PostClientProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const [tocOpen, setTocOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Copy link functionality
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Share functionality
  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        navigator.share({ title, url });
    }
  };

  // Generate table of contents from headings
  useEffect(() => {
    if (!bodyRef.current) return;

    const headings = bodyRef.current.querySelectorAll('h2, h3');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate ToC items (placeholder - would extract from real Portable Text)
  const tocItems = [
    { id: 'heading-1', title: 'Introduction', level: 2 },
    { id: 'heading-2', title: 'Main Point', level: 2 },
    { id: 'heading-3', title: 'Supporting Evidence', level: 3 },
    { id: 'heading-4', title: 'Conclusion', level: 2 },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0ee]">
      <Navbar />
      
      {/* 1. POST HERO */}
      <section className="bg-[#f0f0ee] pt-[72px] pb-16">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category badge */}
          <div 
            className="inline-block bg-teal-600 text-white text-[11px] uppercase font-medium rounded-[50px] px-3 py-1 mb-6"
            style={{ letterSpacing: '0.05em' }}
          >
            {post.category}
          </div>
          
          {/* Post title */}
          <h1 
            className="text-black font-bold mb-6"
            style={{ 
              fontSize: '56px',
              lineHeight: '1.2'
            }}
          >
            {post.title}
          </h1>
          
          {/* Author row */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div 
              style={{
                background: '#9ca3af',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
            {/* TODO: Replace with author photo from Sanity CMS */}
            
            <div className="flex items-center gap-2">
              <span 
                className="text-black font-bold"
                style={{ fontSize: '15px' }}
              >
                {post.author.name}
              </span>
              <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
              <span 
                className="text-[#888]"
                style={{ fontSize: '13px' }}
              >
                {post.author.role}
              </span>
              <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
              <span 
                className="text-[#888]"
                style={{ fontSize: '13px' }}
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
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
          
          {/* Tags row */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-[12px]"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Cover image */}
          <div style={{
            background: '#374151',
            width: '100%',
            maxWidth: '960px',
            aspectRatio: '16/9',
            borderRadius: '20px',
            margin: '40px auto 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '14px',
          }}>
            Post Cover Image — 960 x 540px
          </div>
          {/* TODO: Replace with post coverImage from Sanity CMS */}
        </div>
      </section>

      {/* 2. POST BODY */}
      <section className="bg-[#f0f0ee] pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* LEFT — ARTICLE CONTENT */}
            <div className="lg:col-span-8">
              <div className="max-w-[680px]">
                {/* Share bar (desktop) */}
                <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-3">
                  <button
                    onClick={copyLink}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                    title="Copy link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sharePost('whatsapp')}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                    title="Share on WhatsApp"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sharePost('twitter')}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                    title="Share on Twitter"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sharePost('facebook')}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                    title="Share on Facebook"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  {copiedLink && (
                    <div className="absolute -right-20 top-0 bg-teal-500 text-white text-xs px-2 py-1 rounded">
                      Copied!
                    </div>
                  )}
                </div>

                {/* Share bar (mobile) */}
                <div className="lg:hidden flex justify-center gap-3 mb-6">
                  <button
                    onClick={copyLink}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sharePost('whatsapp')}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sharePost('twitter')}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sharePost('facebook')}
                    className="w-9 h-9 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors duration-200"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Article content */}
                <div ref={bodyRef} className="pt-16">
                  <div className="prose prose-lg max-w-none">
                    {/* TODO: Replace with real PortableText rendering when CMS is connected */}
                    <h2 id="heading-1" className="text-[28px] font-bold text-black mb-4">Introduction</h2>
                    <p className="text-[16px] leading-[1.8] text-[#333] mb-5">
                      {post.excerpt}
                    </p>
                    
                    <h2 id="heading-2" className="text-[28px] font-bold text-black mb-4">Main Point</h2>
                    <p className="text-[16px] leading-[1.8] text-[#333] mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                    
                    <h3 id="heading-3" className="text-[22px] font-bold text-black mb-4">Supporting Evidence</h3>
                    <p className="text-[16px] leading-[1.8] text-[#333] mb-5">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    
                    <blockquote className="border-l-[3px] border-teal-500 pl-5 italic text-[20px] text-[#555] my-8">
                      "Faith is the substance of things hoped for, the evidence of things not seen."
                    </blockquote>
                    
                    <h2 id="heading-4" className="text-[28px] font-bold text-black mb-4">Conclusion</h2>
                    <p className="text-[16px] leading-[1.8] text-[#333] mb-5">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — STICKY SIDEBAR */}
            <div className="lg:col-span-4">
              <div 
                className="sticky lg:top-[88px]"
                style={{ top: '88px' }}
              >
                {/* Table of Contents */}
                <div className="mb-6">
                  <div className="lg:hidden flex items-center justify-between mb-4">
                    <div 
                      className="text-teal-500 text-[11px] uppercase tracking-wide"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      IN THIS ARTICLE
                    </div>
                    <button
                      onClick={() => setTocOpen(!tocOpen)}
                      className="text-teal-500"
                    >
                      <ChevronDownIcon className={`w-5 h-5 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  <div className={`${tocOpen ? 'block' : 'hidden'} lg:block`}>
                    <div 
                      className="text-teal-500 text-[11px] uppercase tracking-wide mb-3"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      IN THIS ARTICLE
                    </div>
                    <div className="border-b border-[#e5e7eb] pb-4 mb-4">
                      {tocItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`block text-left w-full py-2 px-3 text-[13px] transition-colors duration-200 ${
                            activeHeading === item.id 
                              ? 'text-teal-500 font-semibold border-l-2 border-teal-500' 
                              : 'text-[#555] hover:text-teal-500'
                          }`}
                          style={{ paddingLeft: activeHeading === item.id ? '12px' : '12px' }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Author Card */}
                <div className="border border-[#e5e7eb] rounded-[16px] p-5 mb-6">
                  <div 
                    style={{
                      background: '#9ca3af',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      margin: '0 auto 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  >
                    {/* TODO: Replace with author photo from Sanity CMS */}
                    Photo
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="text-black font-bold mb-1"
                      style={{ fontSize: '15px' }}
                    >
                      {post.author.name}
                    </div>
                    <div 
                      className="text-[#888] mb-3"
                      style={{ fontSize: '13px' }}
                    >
                      {post.author.role}
                    </div>
                    <div 
                      className="text-[#666] text-center"
                      style={{ 
                        fontSize: '13px',
                        lineHeight: '1.6'
                      }}
                    >
                      {post.author.bio}
                    </div>
                  </div>
                </div>

                {/* Newsletter Mini-signup */}
                <div 
                  className="rounded-[12px] p-5"
                  style={{ backgroundColor: '#f0f0ee' }}
                >
                  <div 
                    className="text-black font-bold mb-4 text-center"
                    style={{ fontSize: '15px' }}
                  >
                    Get New Posts
                  </div>
                  
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-white border border-[#e5e7eb] rounded-[50px] py-2.5 px-4 text-[13px] focus:outline-none focus:border-teal-500"
                    />
                    <button 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-[50px] transition-all duration-200"
                      style={{ fontSize: '13px', letterSpacing: '0.05em' }}
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED POSTS */}
      <section className="bg-[#e8e6df] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <div className="text-center mb-12">
            <span 
              className="text-gray-600 italic"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Keep Reading
            </span>
            <h2 
              className="text-black font-bold mt-2"
              style={{ fontSize: '32px' }}
            >
              Related Posts
            </h2>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost._id}
                className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden hover:border-teal-500 transition-all duration-200"
              >
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
                    {relatedPost.category}
                  </div>
                  
                  <h3 
                    className="text-black font-bold mb-3"
                    style={{ 
                      fontSize: '18px',
                      lineHeight: '1.3'
                    }}
                  >
                    {relatedPost.title}
                  </h3>
                  
                  <p 
                    className="text-[#666] mb-3"
                    style={{ 
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}
                  >
                    {relatedPost.excerpt}
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
                        {relatedPost.author.name}
                      </span>
                      <span className="text-[#888]" style={{ fontSize: '13px' }}>·</span>
                      <span 
                        className="text-[#888]"
                        style={{ fontSize: '13px' }}
                      >
                        {relatedPost.readTime} min read
                      </span>
                    </div>
                  </div>
                  
                  <a 
                    href={`/media/blog/${relatedPost.slug.current}`}
                    className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                    style={{ fontSize: '13px' }}
                  >
                    READ MORE →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POST NAVIGATION */}
      <section className="bg-[#f0f0ee] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
            >
              ← PREVIOUS POST
            </button>
            <button 
              className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200"
              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
            >
              NEXT POST →
            </button>
          </div>
          
          {/* TODO: Implement prev/next post queries in Sanity CMS */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
