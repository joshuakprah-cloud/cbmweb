import Link from 'next/link';
import { WhatsAppButton } from '../WhatsAppButton';
import { ContactForm } from './ContactForm';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

// Social Links - Facebook, Instagram, TikTok, YouTube, WhatsApp
const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/thagospel',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/thagospel',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    )
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@thagospel',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.3 0 .59.05.88.14V9.01a6.33 6.33 0 00-.88-.07 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    )
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@thagospel',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/233556978861',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    )
  },
];

// Quick Links
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/our-story' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Events', href: '/events' },
  { label: 'Give', href: '/give' },
];


export function Footer() {
  return (
    <>
      <footer className="bg-[#111827] text-white" role="contentinfo">
        {/* Main Footer Content */}
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 pt-20 pb-12">
          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            
            {/* Column 1: Quick Links */}
            <div role="navigation" aria-label="Quick Links navigation">
              <h3 className="text-white font-semibold text-[15px] mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Social Icons */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#0d9488] hover:text-white transition-all duration-300"
                    aria-label={`${social.label} profile`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Find Us */}
            <div>
              <h3 className="text-white font-semibold text-[15px] mb-4">Find Us</h3>
              
              {/* Contact Details */}
              <div className="space-y-2.5 mb-4">
                {/* Phone */}
                <div className="flex items-start gap-2">
                  <PhoneIcon className="w-3.5 h-3.5 text-[#2dd4bf] flex-shrink-0 mt-0.5" />
                  <div className="text-[14px] text-white/70 leading-[1.8]">
                    <p>0556978861</p>
                    <p>0540293480</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start gap-2">
                  <EnvelopeIcon className="w-3.5 h-3.5 text-[#2dd4bf] flex-shrink-0 mt-0.5" />
                  <a 
                    href="mailto:thagospelchurchghana@gmail.com" 
                    className="text-[14px] text-white/70 hover:text-[#2dd4bf] transition-colors truncate"
                  >
                    thagospelchurchghana@gmail.com
                  </a>
                </div>
                
                {/* Location */}
                <div className="flex items-start gap-2">
                  <MapPinIcon className="w-3.5 h-3.5 text-[#2dd4bf] flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] text-white/70">
                    ThaGospel Church, Accra, Ghana
                  </span>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="w-full h-[180px] rounded-[10px] overflow-hidden border border-white/10">
                {/* 
                  NOTE: Replace the src URL below with your actual Google Maps embed URL.
                  To get the correct URL:
                  1. Go to Google Maps
                  2. Search "ThaGospel Church Accra Ghana"
                  3. Click Share → Embed a map
                  4. Copy the iframe src URL
                  5. Replace the placeholder src below
                */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2539232976937!2d-0.2581310260121519!3d5.6763861324294815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f4df7adcb59%3A0xb277288105e12c4b!2sTHAGOSPEL%20CHURCH!5e0!3m2!1sen!2sus!4v1773850826371!5m2!1sen!2sus"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ThaGospel Church location on Google Maps"
                />
              </div>
            </div>

            {/* Column 3: Write to Us - Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08]">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 text-center lg:text-left">
              {/* Left: Copyright */}
              <p className="text-[14px] text-white/30">
                2025 ThaGospel Church Ghana. All rights reserved.
              </p>
              
              {/* Center: Made with faith */}
              <p className="text-[14px] text-white/20 hidden lg:block">
                Made with faith in Ghana
              </p>
              
              {/* Right: Legal Links */}
              <div className="flex items-center gap-5">
                <Link 
                  href="/privacy" 
                  className="text-[14px] text-white/30 hover:text-white/70 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-[14px] text-white/30 hover:text-white/70 transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton phoneNumber="233556978861" />
    </>
  );
}

export default Footer;

