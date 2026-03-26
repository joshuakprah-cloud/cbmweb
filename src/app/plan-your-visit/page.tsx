'use client';

import { useState } from 'react';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  BookOpenIcon,
  CheckCircleIcon,
  TruckIcon,
  PhoneIcon,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function PlanYourVisitPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const scrollToServiceTimes = () => {
    document.getElementById('service-times')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      
      {/* 1. PAGE HERO — SPLIT LAYOUT */}
      <section className="pt-[72px] bg-[#f0f0ee]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh] py-20 lg:py-32">
            
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              <div className="overflow-hidden">
                <h1 className="font-black text-[80px] lg:text-[100px] leading-none text-[#1a1a1a]" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  VISIT
                </h1>
              </div>
              
              <h2 className="text-[55px] lg:text-[70px] leading-tight italic font-serif text-[#333] max-w-lg">
                Your First Sunday Starts Here.
              </h2>
              
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-[#555] max-w-[420px]">
                We know walking into a new church can feel like a big step. We've made it as easy as possible. Here's everything you need to know.
              </p>
              
              <button 
                onClick={scrollToServiceTimes}
                className="inline-flex items-center bg-[#14b8a6] text-white px-8 py-4 rounded-full text-[14px] font-bold uppercase tracking-wide hover:bg-[#0d9488] transition-all duration-300 hover:scale-105"
              >
                I'M READY TO VISIT
              </button>
            </div>
            
            {/* RIGHT COLUMN */}
            <div className="relative">
              <div style={{
                background: '#1a3a2a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '600px',
                borderRadius: '20px',
                color: '#888',
                fontSize: '14px',
              }}>
                Plan Your Visit Hero Image — 860 x 680px
              </div>
              {/* TODO: Replace with warm welcoming Sunday gathering photo — 860 x 680px */}
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK INFO BAND */}
      <section id="service-times" className="bg-[#1a1a1a] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* MAIN SERVICE CARD */}
            <div className="bg-[#2a2a2a] rounded-[16px] p-6 border border-[#333]">
              <div className="text-center">
                <CalendarIcon className="w-8 h-8 text-[#14b8a6] mx-auto mb-3" />
                <div className="text-[12px] uppercase tracking-wider text-[#888] mb-1">MAIN SERVICE</div>
                <div className="text-[18px] font-bold text-white">Every Sunday</div>
                <div className="text-[18px] font-bold text-white">9:00 AM – 12:00 PM</div>
              </div>
            </div>

            {/* LOCATION CARD */}
            <div className="bg-[#2a2a2a] rounded-[16px] p-6 border border-[#333]">
              <div className="text-center">
                <MapPinIcon className="w-8 h-8 text-[#14b8a6] mx-auto mb-3" />
                <div className="text-[12px] uppercase tracking-wider text-[#888] mb-1">LOCATION</div>
                <div className="text-[18px] font-bold text-white">Taifa Burkina</div>
                <div className="text-[18px] font-bold text-white">Accra, Ghana</div>
                {/* TODO: Confirm location */}
              </div>
            </div>

            {/* DRESS CODE CARD */}
            <div className="bg-[#2a2a2a] rounded-[16px] p-6 border border-[#333]">
              <div className="text-center">
                <UserGroupIcon className="w-8 h-8 text-[#14b8a6] mx-auto mb-3" />
                <div className="text-[12px] uppercase tracking-wider text-[#888] mb-1">DRESS CODE</div>
                <div className="text-[18px] font-bold text-white">Come As You Are</div>
                <div className="text-[18px] font-bold text-white">Smart casual or traditional</div>
              </div>
            </div>

            {/* KIDS WELCOME CARD */}
            <div className="bg-[#2a2a2a] rounded-[16px] p-6 border border-[#333]">
              <div className="text-center">
                <HeartIcon className="w-8 h-8 text-[#14b8a6] mx-auto mb-3" />
                <div className="text-[12px] uppercase tracking-wider text-[#888] mb-1">KIDS WELCOME</div>
                <div className="text-[18px] font-bold text-white">Ages 0–12</div>
                <div className="text-[18px] font-bold text-white">Kids Ministry runs concurrently</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICE TIMES SECTION */}
      <section className="bg-[#f0f0ee] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <div className="text-[18px] italic font-serif text-[#666] mb-2">
            When to Come
          </div>
          <h2 className="text-[42px] lg:text-[52px] font-black text-[#1a1a1a] mb-4">
            Our Services
          </h2>
          <p className="text-[15px] text-[#666] max-w-[420px] mx-auto mb-8">
            Every service is a fresh encounter with God. Here's when we gather.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            
            {/* LEFT COLUMN - IMAGE */}
            <div>
              <div style={{
                background: '#374151',
                width: '100%',
                height: '600px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '14px',
              }}>
                Service Times Image — 560 x 600px
              </div>
              {/* TODO: Replace with worship/gathering photo — 560 x 600px */}
            </div>

            {/* RIGHT COLUMN - SERVICES */}
            <div>

              <div className="space-y-6">
                {/* FEAST OF MANNA */}
                <div className="bg-white rounded-[16px] border border-[#e5e7eb] p-5 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-1 bg-[#14b8a6] rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-[16px] font-bold text-[#1a1a1a] mb-1">FEAST OF MANNA</div>
                      <div className="text-[13px] text-[#14b8a6] uppercase tracking-wider mb-1">SUNDAY</div>
                      <div className="text-[15px] text-[#555] mb-2">9:00 AM – 12:00 PM</div>
                      <div className="text-[13px] italic text-[#888]">Our main weekly gathering. All ages welcome.</div>
                    </div>
                  </div>
                </div>

                {/* PROPHETIC ENCOUNTER SERVICE */}
                <div className="bg-white rounded-[16px] border border-[#e5e7eb] p-5 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-1 bg-[#14b8a6] rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-[16px] font-bold text-[#1a1a1a] mb-1">PROPHETIC ENCOUNTER SERVICE</div>
                      <div className="text-[13px] text-[#14b8a6] uppercase tracking-wider mb-1">WEDNESDAY</div>
                      <div className="text-[15px] text-[#555] mb-2">6:00 PM – 8:30 PM</div>
                      <div className="text-[13px] italic text-[#888]">A midweek service focused on prayer and prophetic.</div>
                    </div>
                  </div>
                </div>

                {/* THE YOUTH CHURCH */}
                <div className="bg-white rounded-[16px] border border-[#e5e7eb] p-5 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-1 bg-[#14b8a6] rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-[16px] font-bold text-[#1a1a1a] mb-1">THE YOUTH CHURCH</div>
                      <div className="text-[13px] text-[#14b8a6] uppercase tracking-wider mb-1">FRIDAY</div>
                      <div className="text-[15px] text-[#555] mb-2">6:00 PM – 8:00 PM</div>
                      <div className="text-[13px] italic text-[#888]">For teenagers aged 13–17.</div>
                    </div>
                  </div>
                </div>

                {/* ALLNIGHT SERVICE */}
                <div className="bg-white rounded-[16px] border border-[#e5e7eb] p-5 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-1 bg-[#14b8a6] rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-[16px] font-bold text-[#1a1a1a] mb-1">ALLNIGHT SERVICE</div>
                      <div className="text-[13px] text-[#14b8a6] uppercase tracking-wider mb-1">FIRST FRIDAY</div>
                      <div className="text-[15px] text-[#555] mb-2">10:00 PM – 4:00 AM</div>
                      <div className="text-[13px] italic text-[#888]">Our monthly All-night prayer service.</div>
                    </div>
                  </div>
                </div>

                {/* COUNSELING */}
                <div className="bg-white rounded-[16px] border border-[#e5e7eb] p-5 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-1 bg-[#14b8a6] rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-[16px] font-bold text-[#1a1a1a] mb-1">COUNSELING</div>
                      <div className="text-[13px] text-[#14b8a6] uppercase tracking-wider mb-1">AFTER EVERY SERVICE</div>
                      <div className="text-[13px] italic text-[#888]">Speak with a pastor after any service.</div>
                    </div>
                  </div>
                </div>

                {/* ADD TO CALENDAR BUTTON */}
                <div className="text-center mt-8">
                  <button className="inline-flex items-center border border-[#14b8a6] text-[#14b8a6] px-6 py-3 rounded-full text-[14px] font-bold uppercase tracking-wide hover:bg-[#14b8a6] hover:text-white transition-all duration-300">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    ADD TO CALENDAR
                  </button>
                  {/* TODO: Add iCal / Google Calendar URL */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT TO EXPECT SECTION */}
      <section className="bg-[#e8e6df] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <div className="text-[18px] italic font-serif text-[#666] mb-3">
            No Surprises
          </div>
          <h2 className="text-[42px] lg:text-[48px] font-black text-[#1a1a1a] mb-4">
            What to Expect
          </h2>
          <p className="text-[16px] text-[#666] max-w-[520px] mx-auto mb-8">
            We want your first visit to feel comfortable, not confusing.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT BLOCK - HEADING */}
            <div className="lg:sticky lg:top-24">
              <h3 className="text-[15px] text-[#666] leading-relaxed">
                Here is what happens when you walk through our doors.
              </h3>
            </div>

            {/* RIGHT BLOCK - ITEMS */}
            <div className="space-y-6">
              
              {/* ITEM 01 */}
              <div className="flex items-start space-x-4">
                <div className="text-[80px] font-serif text-[#666] opacity-20">01</div>
                <MapPinIcon className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a] mb-2">You'll Be Welcomed</h4>
                  <p className="text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed max-w-[480px]">
                    Our team will greet you at the door with a warm smile. No need to know anyone — we'll take care of that.
                  </p>
                </div>
              </div>

              {/* ITEM 02 */}
              <div className="flex items-start space-x-4">
                <div className="text-[80px] font-serif text-[#666] opacity-20">02</div>
                <SparklesIcon className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a] mb-2">Worship Together</h4>
                  <p className="text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed max-w-[480px]">
                    We open with Spirit-filled worship. Sing along if you'd like, or simply take it in. There's no pressure.
                  </p>
                </div>
              </div>

              {/* ITEM 03 */}
              <div className="flex items-start space-x-4">
                <div className="text-[80px] font-serif text-[#666] opacity-20">03</div>
                <BookOpenIcon className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a] mb-2">Hear the Word</h4>
                  <p className="text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed max-w-[480px]">
                    Our pastor brings a practical, Biblical message relevant to everyday life. Bring a Bible or follow along on yours.
                  </p>
                </div>
              </div>

              {/* ITEM 04 */}
              <div className="flex items-start space-x-4">
                <div className="text-[80px] font-serif text-[#666] opacity-20">04</div>
                <HeartIcon className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a] mb-2">Meet People</h4>
                  <p className="text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed max-w-[480px]">
                    After the message we have a time for fellowship. This is a great moment to introduce yourself and make connections.
                  </p>
                </div>
              </div>

              {/* ITEM 05 */}
              <div className="flex items-start space-x-4">
                <div className="text-[80px] font-serif text-[#666] opacity-20">05</div>
                <UserGroupIcon className="w-6 h-6 text-[#14b8a6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a] mb-2">Take a Next Step</h4>
                  <p className="text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed max-w-[480px]">
                    Whether it's joining a ministry, getting connected, or just coming back next Sunday — we'll help you find your next step.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. DRESS CODE + ATMOSPHERE */}
      <section className="bg-[#f0f0ee] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT COLUMN - TEXT */}
            <div>
              <div className="text-[18px] italic font-serif text-[#666] mb-2">
                Come As You Are
              </div>
              <h2 className="text-[42px] lg:text-[52px] font-black text-[#1a1a1a] mb-6">
                What to Wear
              </h2>
              
              <div className="space-y-4 text-[15px] lg:text-[16px] text-[#1a1a1a] leading-[1.8]">
                <p>
                  There is no dress code at ThaGospel Church. We believe God looks at heart, not at outfit.
                </p>
                <p>
                  Most of our congregation comes in smart casual — jeans, a nice top, or traditional Ghanaian wear. Some dress more formally. Both are completely fine.
                </p>
                <p>
                  The most important thing is that you show up. Come as you are.
                </p>
              </div>

              {/* STYLE PILLS */}
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="bg-[#f0f0ee] border border-[#e5e7eb] rounded-full px-5 py-2 flex items-center">
                  <SparklesIcon className="w-3.5 h-3.5 text-[#14b8a6] mr-2" />
                  <span className="text-[14px] font-medium text-[#555]">Smart Casual</span>
                </div>
                <div className="bg-[#f0f0ee] border border-[#e5e7eb] rounded-full px-5 py-2 flex items-center">
                  <SparklesIcon className="w-3.5 h-3.5 text-[#14b8a6] mr-2" />
                  <span className="text-[14px] font-medium text-[#555]">Traditional Wear</span>
                </div>
                <div className="bg-[#f0f0ee] border border-[#e5e7eb] rounded-full px-5 py-2 flex items-center">
                  <SparklesIcon className="w-3.5 h-3.5 text-[#14b8a6] mr-2" />
                  <span className="text-[14px] font-medium text-[#555]">Formal — also Welcome</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - IMAGE */}
            <div>
              <div style={{
                background: '#4a5568',
                width: '100%',
                height: '560px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '14px',
              }}>
                Dress Code Image — 480 x 560px
              </div>
              {/* TODO: Replace with congregation photo showing diverse dress — 480x560px */}
            </div>
          </div>
        </div>
      </section>

      {/* 6. KIDS & FAMILY SECTION */}
      <section className="bg-[#e8e6df] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT COLUMN - IMAGE */}
            <div>
              <div style={{
                background: '#4ade8060',
                width: '100%',
                height: '560px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#166534',
                fontSize: '14px',
              }}>
                Kids Ministry Image — 480 x 560px
              </div>
              {/* TODO: Replace with Kids Ministry photo — 480 x 560px */}
            </div>

            {/* RIGHT COLUMN - TEXT */}
            <div>
              <div className="text-[18px] italic font-serif text-[#666] mb-2">
                For Your Family
              </div>
              <h2 className="text-[42px] lg:text-[52px] font-black text-[#1a1a1a] mb-6 leading-tight">
                Your Kids Are in Good Hands.
              </h2>
              
              <div className="space-y-4 text-[15px] lg:text-[16px] text-[#1a1a1a] leading-[1.8]">
                <p>
                  We know that as a parent, you need to know your children are safe and well taken care of before you can fully focus on worship. We've got them.
                </p>
                <p>
                  Kids Ministry runs every Sunday concurrently with main service for children aged 0–12. Your kids will enjoy age-appropriate worship, Bible stories, games, and crafts.
                </p>
                <p>
                  Every team member is trained and background-checked. You can worship freely knowing your little ones are in great hands.
                </p>
              </div>

              {/* FEATURE ROWS */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0" />
                  <span className="text-[15px] text-[#555]">Safe, certified environment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0" />
                  <span className="text-[15px] text-[#555]">Ages 0–12 fully catered for</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0" />
                  <span className="text-[15px] text-[#555]">Runs every Sunday during main service</span>
                </div>
              </div>

              <div className="mt-8">
                <a 
                  href="/ministries/kids"
                  className="inline-flex items-center border border-[#14b8a6] text-[#14b8a6] px-6 py-3 rounded-full text-[14px] font-bold uppercase tracking-wide hover:bg-[#14b8a6] hover:text-white transition-all duration-300"
                >
                  LEARN MORE ABOUT KIDS MINISTRY
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCATION + DIRECTIONS */}
      <section className="bg-[#f0f0ee] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="text-[18px] italic font-serif text-[#666] mb-2">
              Find Us
            </div>
            <h2 className="text-[42px] lg:text-[48px] font-black text-[#1a1a1a] mb-2">
              Getting Here
            </h2>
            <p className="text-[16px] text-[#666] max-w-[520px] mx-auto mb-4">
              We're located in Taifa Burkina, Accra. Here's how to find us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN - DIRECTIONS */}
            <div>
              {/* ADDRESS BLOCK */}
              <div className="bg-white rounded-[16px] border border-[#e5e7eb] p-6 mb-4">
                <MapPinIcon className="w-6 h-6 text-[#14b8a6] mb-3" />
                <div className="text-[16px] font-bold text-[#1a1a1a] mb-1">ThaGospel Church</div>
                <div className="text-[16px] font-bold text-[#1a1a1a]">Taifa Burkina, Accra, Ghana</div>
                <div className="text-[16px] font-bold text-[#1a1a1a]">6262 Accra North</div>
                {/* TODO: Confirm full address */}
                
              </div>

              {/* TRANSPORT OPTIONS */}
              <div className="space-y-4">
                {/* BY CAR */}
                <div className="flex items-start space-x-3">
                  <TruckIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[15px] font-bold text-[#1a1a1a] mb-1">By Car</div>
                    <div className="text-[14px] text-[#666]">
                      Free parking is available on-site and along the surrounding streets.
                    </div>
                    {/* TODO: Confirm parking details */}
                  </div>
                </div>

                {/* BY PUBLIC TRANSPORT */}
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[15px] font-bold text-[#1a1a1a] mb-1">By Trotro / Public Transport</div>
                    <div className="text-[14px] text-[#666]">
                      Take any trotro heading towards Taifa. Alight at [stop name] and walk [X] minutes.
                    </div>
                    {/* TODO: Add real transport directions */}
                  </div>
                </div>

                {/* NEED A RIDE */}
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[15px] font-bold text-[#1a1a1a] mb-1">Need a Ride?</div>
                    <div className="text-[14px] text-[#666]">
                      Call us and we'll do our best to help connect you with someone coming from your area.
                    </div>
                    <div className="text-[14px] text-[#14b8a6]">055 697 8861</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - MAP */}
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1d0x0:0x0!2m3!1f0!3m2!2i768!4f13.1!3m3!2sen!2sgh!4v1702548800000!5m2!1sen!2sgh"
                width="100%"
                height="480"
                style={{ 
                  border: 0,
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[480px]"
              />
              {/* TODO: Confirm map shows exact church location */}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FIRST TIMER FAQ */}
      <section className="bg-[#e8e6df] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="text-[18px] italic font-serif text-[#666] mb-2">
              Common Questions
            </div>
            <h2 className="text-[42px] lg:text-[48px] font-black text-[#1a1a1a] mb-4">
              FAQ for First Timers
            </h2>
            <p className="text-[16px] text-[#666]">
              Still have questions? Here are the ones we hear most.
            </p>
          </div>

          <div className="bg-[#f0f0ee] rounded-[20px] p-8 lg:p-12">
            
            {/* FAQ ITEM 01 */}
            <div className="border-b border-[#e5e7eb]">
              <button 
                onClick={() => toggleFaq(0)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[22px] text-[#1a1a1a] font-medium">01.</span>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a]">Do I need to dress up?</h3>
                </div>
                <div className="text-[#14b8a6]">
                  {expandedFaq === 0 ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-400 ${expandedFaq === 0 ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-6 text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed">
                  Not at all. Smart casual is perfectly fine. Traditional wear, jeans, a nice top — whatever you're comfortable in. We care far more about you being present than what you're wearing.
                </p>
              </div>
            </div>

            {/* FAQ ITEM 02 */}
            <div className="border-b border-[#e5e7eb]">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[22px] text-[#1a1a1a] font-medium">02.</span>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a]">What happens when I arrive?</h3>
                </div>
                <div className="text-[#14b8a6]">
                  {expandedFaq === 1 ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-400 ${expandedFaq === 1 ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-6 text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed">
                  You'll be greeted at the door by one of our welcome team. They'll show you around, answer any questions, and help you find a seat. You won't be left to figure things out alone.
                </p>
              </div>
            </div>

            {/* FAQ ITEM 03 */}
            <div className="border-b border-[#e5e7eb]">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[22px] text-[#1a1a1a] font-medium">03.</span>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a]">Is there anything for my kids?</h3>
                </div>
                <div className="text-[#14b8a6]">
                  {expandedFaq === 2 ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-400 ${expandedFaq === 2 ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-6 text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed">
                  Yes. Kids Ministry runs every Sunday during the main service for children aged 0–12. Your kids will be safe, engaged, and well looked after while you worship.
                </p>
              </div>
            </div>

            {/* FAQ ITEM 04 */}
            <div className="border-b border-[#e5e7eb]">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[22px] text-[#1a1a1a] font-medium">04.</span>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a]">How long is service?</h3>
                </div>
                <div className="text-[#14b8a6]">
                  {expandedFaq === 3 ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-400 ${expandedFaq === 3 ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-6 text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed">
                  Our main Sunday service (Feast of Manna) runs from 9AM to approximately 12PM — around 3 hours. This includes worship, message, and a time of prayer. You are welcome to stay for fellowship afterward.
                </p>
              </div>
            </div>

            {/* FAQ ITEM 05 */}
            <div>
              <button 
                onClick={() => toggleFaq(4)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[22px] text-[#1a1a1a] font-medium">05.</span>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-[#1a1a1a]">Do I have to give money?</h3>
                </div>
                <div className="text-[#14b8a6]">
                  {expandedFaq === 4 ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-400 ${expandedFaq === 4 ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-6 text-[15px] lg:text-[16px] text-[#1a1a1a] leading-relaxed">
                  No. Giving is a personal act of worship for our members. As a first-time visitor you are our guest. There is absolutely no expectation or pressure to give.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CLOSING CTA */}
      <section className="bg-[#1a1a1a] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <div className="text-[18px] italic font-serif text-[#aaaaaa] mb-4">
            We Can't Wait to Meet You
          </div>
          <h2 className="text-[48px] lg:text-[56px] font-black text-white mb-6">
            See You This Sunday.
          </h2>
          <p className="text-[16px] text-[#888] max-w-[480px] mx-auto mb-8">
            Every Sunday at 9AM. Taifa Burkina, Accra. Come as you are.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://maps.google.com/maps?q=ThaGospel+Church+Taifa+Burkina+Accra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#14b8a6] text-white px-8 py-4 rounded-full text-[14px] font-bold uppercase tracking-wide hover:bg-[#0d9488] transition-all duration-300"
            >
              GET DIRECTIONS
            </a>
            <a 
              href="/connect/groups"
              className="inline-flex items-center border border-white text-white px-8 py-4 rounded-full text-[14px] font-bold uppercase tracking-wide hover:bg-white hover:text-[#1a1a1a] transition-all duration-300"
            >
              GET CONNECTED
            </a>
          </div>
          
          <div className="text-center mt-6">
            <div className="flex items-center justify-center text-[#aaaaaa]">
              <CalendarIcon className="w-3.5 h-3.5 text-[#14b8a6] mr-2" />
              <span className="text-[14px]">Next service: Sunday · 9:00 AM</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
