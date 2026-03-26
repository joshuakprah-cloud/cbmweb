'use client';

import { useTheme } from './theme-provider';
import Link from 'next/link';
import { useState } from 'react';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaInstagram, 
  FaWhatsapp 
} from 'react-icons/fa';

const Footer = ({ homepage }: { homepage?: any }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real newsletter API integration
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-[#1a1a1a] text-white py-20 px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* COLUMN 1 — CHURCH INFO */}
            <div>
              {/* Church Name */}
              <h3 className="text-white font-bold text-xl tracking-wide mb-2">
                ThaGospel Church
              </h3>
              
              {/* Tagline */}
              <p className="text-[#aaaaaa] text-sm mb-6 leading-relaxed" style={{ maxWidth: '260px' }}>
                Love & Humility
              </p>
              
              {/* Contact Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <FaHome className="text-teal-500 mr-3 flex-shrink-0" style={{ fontSize: '16px' }} />
                  <span className="text-[#cccccc] text-sm">Taifa Burkina, Accra, Ghana, 6262 Accra North</span>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-teal-500 mr-3 flex-shrink-0" style={{ fontSize: '16px' }} />
                  <span className="text-[#cccccc] text-sm">055 697 8861</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-teal-500 mr-3 flex-shrink-0" style={{ fontSize: '16px' }} />
                  <span className="text-[#cccccc] text-sm">thagospelchurchheadquarters@gmail.com</span>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex space-x-2.5">
                {/* TODO: Replace with real social media URLs */}
                <a href="#" className="w-9 h-9 border border-[#444] rounded-full flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all duration-200">
                  <FaFacebookF className="text-teal-500" style={{ fontSize: '14px' }} />
                </a>
                <a href="#" className="w-9 h-9 border border-[#444] rounded-full flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all duration-200">
                  <FaTwitter className="text-teal-500" style={{ fontSize: '14px' }} />
                </a>
                <a href="#" className="w-9 h-9 border border-[#444] rounded-full flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all duration-200">
                  <FaYoutube className="text-teal-500" style={{ fontSize: '14px' }} />
                </a>
                <a href="#" className="w-9 h-9 border border-[#444] rounded-full flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all duration-200">
                  <FaInstagram className="text-teal-500" style={{ fontSize: '14px' }} />
                </a>
              </div>
            </div>

            {/* COLUMN 2 — QUICK LINKS + NEWSLETTER */}
            <div>
              {/* Section Header */}
              <span 
                className="text-[#aaaaaa] italic"
                style={{ 
                  fontSize: '16px',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Explore
              </span>
              <h3 
                className="text-white font-bold mt-2 mb-5" 
                style={{ fontSize: '22px' }}
              >
                Quick Links
              </h3>
              
              {/* Quick Links List */}
              <div className="space-y-3 mb-10">
                {/* TODO: Confirm all route paths match actual Next.js routing */}
                <Link href="/" className="block text-[#cccccc] text-sm hover:text-teal-500 transition-colors duration-200">
                  Home
                </Link>
                <Link href="/about" className="block text-[#cccccc] text-sm hover:text-teal-500 transition-colors duration-200">
                  About Us
                </Link>
                <Link href="/sermons" className="block text-[#cccccc] text-sm hover:text-teal-500 transition-colors duration-200">
                  Sermons
                </Link>
                <Link href="/ministries" className="block text-[#cccccc] text-sm hover:text-teal-500 transition-colors duration-200">
                  Ministries
                </Link>
                <Link href="/connect/groups" className="block text-[#cccccc] text-sm hover:text-teal-500 transition-colors duration-200">
                  Get Connected
                </Link>
                <Link href="/give" className="block text-[#cccccc] text-sm hover:text-teal-500 transition-colors duration-200">
                  Give
                </Link>
              </div>
              
              {/* Newsletter Signup */}
              <div>
                <span 
                  className="text-[#aaaaaa] italic"
                  style={{ 
                    fontSize: '16px',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  Stay Updated
                </span>
                <p className="text-[#888888] text-sm mb-4">
                  Get updates straight to your inbox.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 bg-[#2a2a2a] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors text-sm rounded-l-[50px]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-r-[50px] transition-colors font-medium flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* COLUMN 3 — FIND US (MAP) */}
            <div>
              {/* Section Header */}
              <span 
                className="text-[#aaaaaa] italic"
                style={{ 
                  fontSize: '16px',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Find Us
              </span>
              <h3 
                className="text-white font-bold mt-2 mb-5" 
                style={{ fontSize: '22px' }}
              >
                ThaGospel Church, Accra
              </h3>
              
              {/* Google Maps Embed */}
              <div className="w-full h-[220px] bg-gray-800 rounded-[16px] overflow-hidden border border-[#333] mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2539232976937!2d-0.2581310260121519!3d5.6763861324294815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f4df7adcb59%3A0xb277288105e12c4b!2sTHAGOSPEL%20CHURCH!5e0!3m2!1sen!2sus!4v1773850826371!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="THAGOSPEL CHURCH Accra Ghana"
                />
              </div>
              
              {/* Get Directions Button */}
              {/* TODO: Replace with real Google Maps directions URL */}
              <Link
                href="https://maps.google.com"
                className="inline-flex items-center border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-2.5 px-6 rounded-[50px] transition-all duration-200"
                style={{ fontSize: '13px', letterSpacing: '0.05em' }}
              >
                GET DIRECTIONS
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTTOM BAR */}
      <div className="bg-[#111111] border-t border-[#2a2a2a] py-6 px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-[#666666] text-sm">
              © 2025 ThaGospel Church. All rights reserved.
            </div>
            
            {/* Contact CTA (desktop only) */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-[#888888] text-sm">Have a question?</span>
              {/* TODO: Create /contact page with the full contact form moved from footer */}
              <Link href="/connect/contact" className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors">
                Contact Us →
              </Link>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-4">
              {/* TODO: Create privacy and terms pages or remove links if not needed */}
              <Link href="/privacy" className="text-[#666666] hover:text-teal-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#666666] hover:text-teal-500 text-sm transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact form moved to /contact page. 
      TODO: Create dedicated contact page with this form */}

      {/* Floating WhatsApp Button - UNCHANGED */}
      <a
        href="https://wa.me/233571124180"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center space-x-2 z-50"
      >
        <FaWhatsapp className="text-xl" />
        <span className="text-sm font-medium">Chat with us on WhatsApp</span>
      </a>
    </>
  );
};

export default Footer;
