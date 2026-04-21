'use client';

import { useState } from 'react';
import Link from 'next/link';

interface InfoTabsProps {
  sermonNotesUrl?: string;
  givingUrl: string;
}

export function InfoTabs({ sermonNotesUrl, givingUrl }: InfoTabsProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'notes' | 'give'>('about');

  const tabs = [
    { id: 'about' as const, label: 'About Service' },
    { id: 'notes' as const, label: 'Sermon Notes', disabled: !sermonNotesUrl },
    { id: 'give' as const, label: 'Give' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              tab.disabled
                ? 'text-gray-300 cursor-not-allowed'
                : activeTab === tab.id
                ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About This Service</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Join us for powerful worship, relevant teaching, and an inspiring community. 
              Whether you&apos;re here in person or watching online, we&apos;re so glad you&apos;ve joined us!
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span> ThaGospel Church, Accra, Ghana
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Service Time:</span> Sundays at 9:00 AM
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Duration:</span> Approximately 90 minutes
              </p>
            </div>
            <Link
              href="/im-new"
              className="inline-block text-teal-600 font-medium text-sm hover:underline mt-2"
            >
              Learn more about visiting →
            </Link>
          </div>
        )}

        {activeTab === 'notes' && sermonNotesUrl && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Sermon Notes</h3>
            <p className="text-gray-600 text-sm">
              Follow along with today&apos;s sermon using our downloadable notes.
            </p>
            <a
              href={sermonNotesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Notes (PDF)
            </a>
          </div>
        )}

        {activeTab === 'give' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Give Online</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your generosity makes a difference. Every gift helps us reach more people 
              with the message of hope and love.
            </p>
            <div className="space-y-3">
              <Link
                href={givingUrl}
                className="block w-full text-center bg-teal-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors"
              >
                Give Now
              </Link>
              <p className="text-gray-500 text-xs text-center">
                Secure online giving through our trusted platform
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
