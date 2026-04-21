'use client';

import { useState } from 'react';
import { MapPinIcon, SunIcon, MoonIcon, FireIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function ServiceScheduleTabs() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'special'>('weekly');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === 'weekly'
                ? 'bg-teal-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Weekly Services
          </button>
          <button
            onClick={() => setActiveTab('special')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === 'special'
                ? 'bg-teal-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Special Services
          </button>
        </div>
      </div>

      {/* Group A: Weekly Services */}
      {activeTab === 'weekly' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feast of Manna */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all">
            <span className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">Every Sunday</span>
            <h3 className="text-xl font-bold text-white mb-2">Feast of Manna</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <SunIcon className="w-4 h-4" />
              <span>9:00 AM – 12:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPinIcon className="w-4 h-4" />
              <span>Main Auditorium</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">Our main Sunday gathering — worship, the Word, and community.</p>
          </div>

          {/* Prophetic Encounter */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all">
            <span className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">Every Wednesday</span>
            <h3 className="text-xl font-bold text-white mb-2">Prophetic Encounter</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <MoonIcon className="w-4 h-4" />
              <span>6:00 PM – 8:30 PM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPinIcon className="w-4 h-4" />
              <span>Main Auditorium</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">An evening of prophetic worship and the move of the Holy Spirit.</p>
          </div>

          {/* Youth Church */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all">
            <span className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">Every Friday</span>
            <h3 className="text-xl font-bold text-white mb-2">The Youth Church</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <FireIcon className="w-4 h-4" />
              <span>6:00 PM – 8:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPinIcon className="w-4 h-4" />
              <span>Youth Center</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">Assigning a generation — a service built for young people.</p>
          </div>
        </div>
      )}

      {/* Group B: Special Services */}
      {activeTab === 'special' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Allnight Service */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all">
            <span className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">First Friday Monthly</span>
            <h3 className="text-xl font-bold text-white mb-2">Allnight Service</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <MoonIcon className="w-4 h-4" />
              <span>10:00 PM – 4:00 AM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPinIcon className="w-4 h-4" />
              <span>Main Auditorium</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">Power Night — an all-night service of prayer and worship.</p>
          </div>

          {/* Counseling */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
            <span className="inline-block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">After Every Service</span>
            <h3 className="text-xl font-bold text-white mb-2">Counseling</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <HeartIcon className="w-4 h-4" />
              <span>Available immediately after service</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPinIcon className="w-4 h-4" />
              <span>Prayer Room</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">Speak with a minister for personal prayer and support.</p>
          </div>
        </div>
      )}
    </div>
  );
}
