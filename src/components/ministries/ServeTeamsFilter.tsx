'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Team {
  name: string;
  description: string;
}

interface ServeTeamsData {
  ministry: Team[];
  community: Team[];
  support: Team[];
}

const serveTeamsData: ServeTeamsData = {
  ministry: [
    { name: 'Prayer', description: 'Intercede for the church and community through prayer and spiritual warfare.' },
    { name: 'Choir', description: 'Lead the congregation in worship through vocal excellence and anointed music.' },
    { name: 'Ministers', description: 'Serve in various capacities to nurture and grow the body of Christ.' },
    { name: 'Pastoral Care', description: 'Care for the spiritual and emotional needs of our church family.' },
    { name: "Head Pastor's Office", description: 'Support the vision and leadership of our Head Pastor.' },
  ],
  community: [
    { name: 'Outreach', description: 'Take the Gospel beyond our walls through practical acts of love and service.' },
    { name: 'Evangelism', description: 'Share the good news with those who have not yet experienced Christ.' },
    { name: 'Cell Leaders', description: 'Shepherd small groups and foster community in intimate settings.' },
  ],
  support: [
    { name: 'Ushering', description: 'Welcome guests and create a warm atmosphere for everyone.' },
    { name: 'Media', description: 'Capture and share our story through photography, video, and social media.' },
    { name: 'Finance', description: 'Manage resources responsibly to support the church mission.' },
    { name: 'Follow Up & Communication', description: 'Ensure no one falls through the cracks through intentional connection.' },
    { name: 'Administration', description: 'Keep operations running smoothly behind the scenes.' },
  ],
};

const categories = [
  { id: 'ministry' as const, label: 'Ministry Teams' },
  { id: 'community' as const, label: 'Community & Outreach' },
  { id: 'support' as const, label: 'Support Teams' },
];

export default function ServeTeamsFilter() {
  const [activeCategory, setActiveCategory] = useState<'ministry' | 'community' | 'support'>('ministry');

  const teams = serveTeamsData[activeCategory];
  const categoryLabel = categories.find(c => c.id === activeCategory)?.label || '';

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-[#0B1F3A] text-white'
                : 'border border-gray-300 text-gray-600 hover:border-[#0B1F3A] hover:text-[#0B1F3A]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Teams Grid */}
      <div>
        <h3 className="text-lg font-semibold text-[#0B1F3A] mb-6 text-center">{categoryLabel}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.name}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#0d9488] transition-all duration-300 group"
            >
              <h4 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-[#0d9488] transition-colors">
                {team.name}
              </h4>
              <p className="text-gray-600 text-sm mb-4">{team.description}</p>
              <Link
                href="/connect"
                className="text-[#0d9488] font-semibold text-sm hover:text-[#0f766e] transition-colors flex items-center"
              >
                Join this team <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
