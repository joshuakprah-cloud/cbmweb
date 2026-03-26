'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

const StaffGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Placeholder staff data
  const staffData = [
    {
      id: 1,
      type: 'individual',
      name: 'John Smith',
      title: 'Youth Pastor',
      category: 'pastoral',
      photo: 'https://placehold.co/400x400',
      bio: 'Passionate about mentoring young people and helping them discover their purpose in Christ.',
      email: 'john.smith@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      type: 'individual',
      name: 'Sarah Johnson',
      title: 'Children\'s Pastor',
      category: 'ministries',
      photo: 'https://placehold.co/400x400',
      bio: 'Dedicated to creating a safe and fun environment where children can grow in their faith.',
      email: 'sarah.johnson@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      type: 'couple',
      names: ['Michael', 'Rachel Williams'],
      titles: ['Worship Leader', 'Worship Coordinator'],
      category: 'pastoral',
      photo: 'https://placehold.co/400x400',
      bio: 'Leading our congregation in authentic worship that honors God and transforms lives.',
      email: 'worship@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      type: 'individual',
      name: 'David Brown',
      title: 'Operations Manager',
      category: 'administration',
      photo: 'https://placehold.co/400x400',
      bio: 'Ensuring smooth operations and excellent facilities for all our ministries and events.',
      email: 'david.brown@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 5,
      type: 'individual',
      name: 'Emily Davis',
      title: 'Women\'s Ministry Lead',
      category: 'ministries',
      photo: 'https://placehold.co/400x400',
      bio: 'Empowering women to grow in their faith and discover their unique calling in God.',
      email: 'emily.davis@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 6,
      type: 'individual',
      name: 'James Wilson',
      title: 'Outreach Coordinator',
      category: 'ministries',
      photo: 'https://placehold.co/400x400',
      bio: 'Connecting our church with the community through service and evangelism initiatives.',
      email: 'james.wilson@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 7,
      type: 'couple',
      names: ['Chris', 'Alex Taylor'],
      titles: ['Creative Director', 'Content Strategist'],
      category: 'creative-tech',
      photo: 'https://placehold.co/400x400',
      bio: 'Creating compelling content and experiences that communicate the gospel in relevant ways.',
      email: 'creative@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 8,
      type: 'individual',
      name: 'Daniel Martinez',
      title: 'Tech & Media Lead',
      category: 'creative-tech',
      photo: 'https://placehold.co/400x400',
      bio: 'Managing all technical aspects of our services and ensuring excellent media production.',
      email: 'daniel.martinez@thagospel.com',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];

  // TODO: replace with real staff data

  const categories = [
    { id: 'all', label: 'All Staff' },
    { id: 'pastoral', label: 'Pastoral' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'administration', label: 'Administration' },
    { id: 'creative-tech', label: 'Creative & Tech' }
  ];

  const filteredStaff = activeFilter === 'all' 
    ? staffData 
    : staffData.filter(staff => staff.category === activeFilter);

  const StaffCard = ({ staff }: { staff: typeof staffData[0] }) => {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
        {/* Photo */}
        <div className="aspect-square relative w-24 h-24">
          <Image
            src={staff.photo}
            alt={staff.type === 'couple' ? staff.names?.join(' & ') || '' : staff.name || ''}
            fill
            className="object-cover rounded-t-2xl"
            loading="lazy"
          />
          {/* TODO: replace with real staff photo */}
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Name */}
          <div className="font-bold text-lg text-[#111827] mb-1">
            {staff.type === 'couple' ? `${staff.names?.[0] || ''} ${staff.names?.[1] || ''} ${staff.names?.[1]?.split(' ')[1] || ''}` : staff.name}
          </div>

          {/* Title */}
          <div className="text-sm text-[#2563EB] mb-2">
            {staff.type === 'couple' ? (
              <>
                {staff.titles?.[0] || ''}<br />
                {staff.titles?.[1] || ''}
              </>
            ) : (
              staff.title
            )}
          </div>

          {/* Bio */}
          <div className="text-xs text-[#6B7280] mt-2">
            {staff.category === 'pastoral' ? `${staff.bio.substring(0, 100)}...` : staff.bio}
            {/* TODO: replace with real bio */}
          </div>

          {/* Email */}
          <a 
            href={`mailto:${staff.email}`}
            className="flex items-center text-xs text-gray-400 hover:text-[#2563EB] hover:underline transition-colors duration-200"
          >
            <EnvelopeIcon className="w-3 h-3 mr-1" />
            {staff.email}
            {/* TODO: replace with real email */}
          </a>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            Our Team
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Meet the dedicated individuals who serve our community with passion and excellence.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === category.id
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-[#6B7280] hover:bg-gray-50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStaff.map((staff) => (
            <StaffCard key={staff.id} staff={staff} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffGrid;
