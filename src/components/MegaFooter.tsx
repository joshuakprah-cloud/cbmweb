'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaInstagram, 
  FaArrowRight
} from 'react-icons/fa';

const MegaFooter = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const churchInfo = {
    name: 'THAGOSPEL Church',
    tagline: 'Love & Humility',
    address: 'Taifa Burkina, Accra, Ghana',
    phone: '+233 5569 7861',
    email: 'info@thagospelchurch.org',
    mapQuery: 'Taifa Burkina, Accra, Ghana'
  };

  const quickActions = [
    {
      icon: FaHome,
      title: 'Prayer Request',
      description: 'Submit your prayer needs',
      href: '/forms/prayer'
    },
    {
      icon: FaUsers,
      title: 'Join Church',
      description: 'Become part of our family',
      href: '/forms/adult-membership'
    },
    {
      icon: FaCalendarAlt,
      title: 'Book Appointment',
      description: 'Meet with our pastors',
      href: '/forms/appointment'
    }
  ];

  const aboutLinks = [
    { title: 'Overview', href: '/about' },
    { title: 'New Here', href: '/new-here' },
    { title: 'Leadership', href: '/about/leadership' }
  ];

  const mediaLinks = [
    { title: 'Watch Live', href: '/watch-live' },
    { title: 'Sermons', href: '/sermons' },
    { title: 'Gallery', href: '/gallery' }
  ];

  const connectLinks = [
    { title: 'Connect', href: '/connect/groups' },
    { title: 'Contact', href: '/connect/contact' },
    { title: 'Give', href: '/give' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* COLUMN 1 — CHURCH INFO */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold mb-1 text-red-500">THAGOSPEL Church</h3>
              <p className="text-gray-300 text-sm">Love & Humility</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <FaHome className="text-red-500 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Taifa Burkina, Accra, Ghana</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaPhoneAlt className="text-red-500 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">+233 5569 7861</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-red-500 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">info@thagospelchurch.org</p>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-500 hover:text-red-400 font-medium text-sm transition-colors group"
            >
              Get Directions
              <FaArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* COLUMN 2 — ABOUT */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold mb-2">About</h4>
            <div className="space-y-2">
              {aboutLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm block py-1 relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 3 — MEDIA */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold mb-2">Media</h4>
            <div className="space-y-2">
              {mediaLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm block py-1 relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 4 — CONNECT + MAP */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold mb-2">Connect</h4>
            <div className="space-y-2">
              {connectLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm block py-1 relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </Link>
              ))}
            </div>

            {/* Map Section */}
            <div className="pt-2">
              <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden mb-2">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8265424175!2d-0.1877!3d5.5612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzMnMzYuMiJOwcrwMTAnMzYuNiJF!5e0!3m2!1sen!2sgh!4v1698989083999!5m2!1sen!2sus!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="THAGOSPEL Church Location"
                  className="w-full h-full"
                />
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-500 hover:text-red-400 font-medium text-sm transition-colors group"
              >
                <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                Get Directions
                <FaArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-sm" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-sm" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white text-sm" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-2">
              <h4 className="text-lg font-bold mb-2">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 mt-4 pt-3">
          <div className="text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} THAGOSPEL Church. All rights reserved.</p>
            <p className="mt-1">Located in Taifa Burkina, Accra, Ghana</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Add missing icon import
const FaUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48-10 10-10 10 10 10 4.48 2 12-4.48 2zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6 3.31 0 6 2.69 0 6 6zm0 4c0 1.1.9 2 2s2 .9 2 2 .9 2 2-.9 2-2-2zm-2 16c0 1.1.9 2 2s2 .9 2 2 .9 2 2-.9 2-2-2z"/>
  </svg>
);

const FaCalendarAlt = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2h16v-2h1v16h2v2h-16v19h1V5zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6 3.31 0 6 2.69 0 6 6zm0 4c0 1.1.9 2 2s2 .9 2 2 .9 2 2-.9 2-2-2z"/>
  </svg>
);

export default MegaFooter;
