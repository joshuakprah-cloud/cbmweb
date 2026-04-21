import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface ContentSection {
  title?: string;
  leftText?: string;
  rightText?: string;
}

interface AboutWhatToExpectProps {
  eyebrow?: string;
  headline?: string;
  description?: string;
  sermonImage?: string;
  latestSermonImage?: string;
  worshipImage?: string;
  communityImage?: string;
  sermonSection?: ContentSection;
  worshipSection?: ContentSection;
  communitySection?: ContentSection;
}

export default function AboutWhatToExpect({
  eyebrow = 'What to Expect',
  headline = "Here's what you can look forward to.",
  description = "At ThaGospel, you'll encounter Christ through Biblical teaching and uplifting worship and be given opportunities that will empower you to live out your faith.",
  sermonImage,
  latestSermonImage,
  worshipImage,
  communityImage,
  sermonSection = {
    title: 'Sermons that equip you to grow in your faith',
    leftText: "Whether you're new to your faith or have been a follower of Christ for a long time, Prophet Bekoe's messages will deepen your understanding of the Bible and challenge you to grow in your relationship with God. You'll learn about how the Bible impacts your life today and you'll learn practical strategies to apply it to your life.",
    rightText: "Each week, you'll discover practical insights and spiritual guidance relevant to everyday challenges. You'll find encouragement to take steps of faith, strengthen your connection with God, and discover His purpose for your life. We hope to help you get God's word deeper in your heart to carry you through every season of life."
  },
  worshipSection = {
    title: 'Worship that invites you to encounter Jesus',
    leftText: "Every experience, whether in person or online, will include a time of worship. We worship to express gratitude and devotion to God through songs. But it's more than just music — it creates space for God to transform your heart as you focus on His goodness and faithfulness. In these moments, we set aside our daily concerns and focus on worshiping God, allowing His presence to refresh and renew us.",
    rightText: "ThaGospel Worship is the musical expression of our church. Their songs and albums will inspire them to your daily life. Connection is an essential part of how we do church. God has called us to practically live out our faith in community. It's not just a Sunday thing. Together, we're growing spiritually, transforming lives, and making an impact much bigger than we could alone. Learn more about ThaGospel Worship."
  },
  communitySection = {
    title: 'Community that makes an impact',
    leftText: "Whether you volunteer on Sunday or join a small group, you'll grow spiritually, build meaningful connections, and make an impact with others who share your faith and values. Volunteer opportunities across our community and online platforms allow you to serve the community and be a part of meeting the needs of others. eGroups are where you'll experience deeper conversation and supportive relationships while",
    rightText: "exploring the Bible, discussing messages, and applying them to your daily life. Connection is an essential part of how we do church. God has called us to practically live out our faith in community. It's not just a Sunday thing. Together, we're growing spiritually, transforming lives, and making an impact much bigger than we could alone."
  }
}: AboutWhatToExpectProps) {
  return (
    <section 
      role="region" 
      aria-label="What to expect"
      className="bg-[#111111] py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
            {eyebrow}
          </span>
          
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white leading-[1.15] mt-3">
            {headline}
          </h2>
          
          <p className="text-[16px] md:text-[17px] text-white/60 leading-[1.7] mt-4 max-w-[800px]">
            {description}
          </p>
        </div>

        {/* Sermons Section */}
        <div className="mb-16">
          {/* Main Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#1a1a1a] mb-0">
            {sermonImage ? (
              <Image
                src={sermonImage}
                alt="Pastor preaching"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/30">Pastor preaching</span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            
            {/* Title on image */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <h3 className="text-[22px] md:text-[28px] font-bold text-white">
                {sermonSection.title}
              </h3>
            </div>
          </div>

          {/* Two Column Text */}
          <div className="grid md:grid-cols-2 gap-8 mt-8 py-8 border-t border-b border-white/10">
            <p className="text-[15px] text-white/70 leading-[1.8]">
              {sermonSection.leftText}
            </p>
            <p className="text-[15px] text-white/70 leading-[1.8]">
              {sermonSection.rightText}
            </p>
          </div>

          {/* Latest Sermon Card */}
          <div className="mt-8 bg-[#1a1a1a] rounded-2xl overflow-hidden">
            <div className="relative w-full aspect-[21/9] md:aspect-[3/1]">
              {latestSermonImage ? (
                <Image
                  src={latestSermonImage}
                  alt="Latest sermon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
                  <span className="text-white/50">Latest sermon placeholder</span>
                </div>
              )}
              
              {/* Overlay content */}
              <div className="absolute inset-0 flex items-center justify-end px-6 md:px-10">
                <Link
                  href="/messages/latest"
                  className="inline-flex items-center justify-center bg-white text-[#111111] font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200 text-[14px]"
                >
                  View latest sermon
                </Link>
              </div>
            </div>
          </div>

          {/* Watch more link */}
          <div className="flex justify-center mt-6">
            <Link
              href="/messages"
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-white hover:text-white/80 transition-all"
            >
              Watch more messages online
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Worship Section */}
        <div className="mb-16">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#1a1a1a] mb-0">
            {worshipImage ? (
              <Image
                src={worshipImage}
                alt="Worship experience"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/30">Worship experience</span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            
            {/* Title on image */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <h3 className="text-[22px] md:text-[28px] font-bold text-white">
                {worshipSection.title}
              </h3>
            </div>
          </div>

          {/* Two Column Text */}
          <div className="grid md:grid-cols-2 gap-8 mt-8 py-8 border-t border-b border-white/10">
            <p className="text-[15px] text-white/70 leading-[1.8]">
              {worshipSection.leftText}
            </p>
            <p className="text-[15px] text-white/70 leading-[1.8]">
              {worshipSection.rightText}
            </p>
          </div>
        </div>

        {/* Community Section */}
        <div>
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#1a1a1a] mb-0">
            {communityImage ? (
              <Image
                src={communityImage}
                alt="Community"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/30">Community</span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            
            {/* Title on image */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <h3 className="text-[22px] md:text-[28px] font-bold text-white">
                {communitySection.title}
              </h3>
            </div>
          </div>

          {/* Two Column Text */}
          <div className="grid md:grid-cols-2 gap-8 mt-8 py-8 border-t border-b border-white/10">
            <p className="text-[15px] text-white/70 leading-[1.8]">
              {communitySection.leftText}
            </p>
            <p className="text-[15px] text-white/70 leading-[1.8]">
              {communitySection.rightText}
            </p>
          </div>

          {/* Bottom Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* eGroups Card */}
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
              <div className="relative w-full aspect-[16/10] bg-gray-800">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/30 text-sm">eGroups image</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-[18px] font-bold text-white mb-2">eGroups</h4>
                <p className="text-[14px] text-white/60 leading-[1.6] mb-4">
                  Find your people. Join a small group and experience relationships that activate your faith.
                </p>
                <Link
                  href="/egroups"
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-white hover:gap-2 transition-all"
                >
                  Find a group
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Volunteer Card */}
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
              <div className="relative w-full aspect-[16/10] bg-gray-800">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/30 text-sm">Volunteer image</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-[18px] font-bold text-white mb-2">Volunteer Opportunities</h4>
                <p className="text-[14px] text-white/60 leading-[1.6] mb-4">
                  Make a difference. Support your community by volunteering online or at your campus.
                </p>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-white hover:gap-2 transition-all"
                >
                  Learn more
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
