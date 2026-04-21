import { Metadata } from 'next';
import Link from 'next/link';
import {
  SunIcon,
  FireIcon,
  BoltIcon,
  MoonIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Visit Us | ThaGospel Church',
  description: 'Join us for worship at ThaGospel Church in Accra, Ghana. Find our service times, location, and everything you need to plan your visit.',
  openGraph: {
    title: 'Visit Us | ThaGospel Church',
    description: 'Join us for worship at ThaGospel Church in Accra, Ghana. Find our service times, location, and everything you need to plan your visit.',
  },
};

const WHATSAPP_URL = 'https://wa.me/233556978861';

const serviceCards = [
  {
    day: 'Sunday',
    name: 'Feast of Manna',
    time: '9:00 AM – 12:00 PM',
    duration: '3 hours',
    icon: SunIcon,
  },
  {
    day: 'Wednesday',
    name: 'Prophetic Encounter Service',
    time: '6:00 PM – 8:30 PM',
    duration: '2.5 hours',
    icon: FireIcon,
  },
  {
    day: 'Friday',
    name: 'The Youth Church',
    theme: 'Assigning a Generation',
    time: '6:00 PM – 8:00 PM',
    duration: '2 hours',
    icon: BoltIcon,
  },
  {
    day: 'First Friday of Every Month',
    name: 'Alnight Service',
    theme: 'Power Night',
    time: '10:00 PM – 4:00 AM',
    duration: '6 hours',
    note: 'This is an all-night prayer and worship experience.',
    icon: MoonIcon,
  },
  {
    day: 'After Every Service',
    name: 'Counseling',
    description: 'Our pastoral team is available after every service to pray with you and offer guidance.',
    icon: HeartIcon,
  },
];

export default function VisitPage() {
  return (
    <main className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-[#0B1F3A] px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A] via-[#0B1F3A] to-[#0B1F3A]/90" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center pt-16 md:pt-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Visit Us
          </h1>
          <Link
            href="#location"
            className="inline-flex items-center justify-center bg-[#0d9488] text-white font-semibold px-8 py-4 rounded-lg text-base transition-all hover:bg-[#0d9488]/90"
          >
            Get Directions
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* 2. SERVICE TIMES SECTION */}
      <section id="service-times" className="py-16 md:py-24 px-4 bg-[#F8F9FB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Church Activities
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1F3A] leading-tight mb-4">
              Join Us Any Day of the Week
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Every gathering is designed to help you encounter God and grow in your faith.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Teal top border */}
                  <div className="h-1 bg-[#0d9488] group-hover:bg-[#0d9488] transition-colors" />
                  <div className="p-6">
                    {/* Day label */}
                    <span className="inline-block text-[#0d9488] text-xs font-semibold tracking-wider uppercase mb-3">
                      {service.day}
                    </span>
                    
                    {/* Service name */}
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
                      {service.name}
                    </h3>
                    
                    {/* Theme if applicable */}
                    {service.theme && (
                      <p className="text-gray-500 italic text-sm mb-3">
                        &ldquo;{service.theme}&rdquo;
                      </p>
                    )}
                    
                    {/* Time with icon */}
                    <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold mb-1">
                      <ClockIcon className="w-5 h-5 text-[#0d9488]" />
                      {service.time}
                    </div>
                    
                    {/* Duration */}
                    {service.duration && (
                      <p className="text-gray-500 text-sm mb-3">
                        Duration: {service.duration}
                      </p>
                    )}
                    
                    {/* Note if applicable */}
                    {service.note && (
                      <p className="text-gray-500 text-sm mt-2">
                        {service.note}
                      </p>
                    )}
                    
                    {/* Description if applicable */}
                    {service.description && (
                      <p className="text-gray-600 text-sm mt-2">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Welcome notice strip */}
          <div className="bg-[#0d9488] rounded-xl p-6 text-center">
            <p className="text-[#0B1F3A] font-medium italic">
              All are welcome. Come as you are — God is ready to meet you.
            </p>
          </div>
        </div>
      </section>

      {/* 3. LOCATION SECTION */}
      <section id="location" className="py-16 md:py-24 px-4 bg-[#F8F9FB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Find Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1F3A] leading-tight mb-4">
              We&apos;re Located in Accra, Ghana
            </h2>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-lg h-[280px] lg:h-[420px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15881.015834591584!2d-0.255556!3d5.676381!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f4df7adcb59%3A0xb277288105e12c4b!2sTHAGOSPEL%20CHURCH!5e0!3m2!1sen!2sus!4v1776637942863!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ThaGospel Church Location"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Right - Location Details */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              {/* Church name */}
              <h3 className="text-2xl font-bold text-[#0B1F3A] mb-1">
                ThaGospel Church
              </h3>
              <p className="text-[#0d9488] italic text-sm mb-6">
                &ldquo;Love &amp; Humility&rdquo;
              </p>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4">
                <MapPinIcon className="w-5 h-5 text-[#0B1F3A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#0B1F3A] font-medium">Accra, Ghana</p>
                  <p className="text-gray-500 text-sm">Main Campus</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 mb-4">
                <PhoneIcon className="w-5 h-5 text-[#0B1F3A] flex-shrink-0" />
                <div className="flex gap-2 text-[#0B1F3A]">
                  <a href="tel:0556978861" className="hover:text-[#0d9488] transition-colors">0556978861</a>
                  <span>/</span>
                  <a href="tel:0540293480" className="hover:text-[#0d9488] transition-colors">0540293480</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 mb-4">
                <EnvelopeIcon className="w-5 h-5 text-[#0B1F3A] flex-shrink-0" />
                <a
                  href="mailto:thagospelchurchghana@gmail.com"
                  className="text-[#0B1F3A] hover:text-[#0d9488] transition-colors"
                >
                  thagospelchurchghana@gmail.com
                </a>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3 mb-6">
                <GlobeAltIcon className="w-5 h-5 text-[#0B1F3A] flex-shrink-0" />
                <a
                  href="https://www.thagospelchurchghana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1F3A] hover:text-[#0d9488] transition-colors"
                >
                  www.thagospelchurchghana.com
                </a>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-500">Follow us:</span>
                <div className="flex gap-3">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com/thagospelchurch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B1F3A] hover:text-[#0d9488] transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/thagospelchurch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B1F3A] hover:text-[#0d9488] transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@thagospelchurch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B1F3A] hover:text-[#0d9488] transition-colors"
                    aria-label="TikTok"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href="https://maps.google.com/?q=THAGOSPEL+CHURCH+Accra+Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#0B1F3A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0B1F3A]/90 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT STRIP */}
      <section className="py-16 md:py-20 px-4 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[#0d9488] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Have Questions Before You Visit?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            We&apos;re happy to help. Reach out and our team will get back to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0d9488] text-white font-semibold px-8 py-4 rounded-lg text-base transition-all hover:bg-[#0d9488]/90"
            >
              Send Us a Message
            </Link>
            <a
              href="tel:+233556978861"
              className="inline-flex items-center justify-center border-2 border-white text-white font-semibold px-8 py-4 rounded-lg text-base transition-all hover:bg-white/10"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
