'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface BeliefsClientProps {
  beliefs: any[];
  beliefsPdf?: any;
}

export default function BeliefsClient({ beliefs, beliefsPdf }: BeliefsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBeliefs, setExpandedBeliefs] = useState<Set<number>>(new Set());

  // Filter beliefs based on search term
  const filteredBeliefs = beliefs.filter(belief =>
    belief.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    belief.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBelief = (index: number) => {
    const newExpanded = new Set(expandedBeliefs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedBeliefs(newExpanded);
  };

  const expandAll = () => {
    setExpandedBeliefs(new Set(filteredBeliefs.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedBeliefs(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search beliefs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Collapse All
            </button>
            {beliefsPdf && (
              <a
                href={beliefsPdf}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Download PDF
              </a>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredBeliefs.length} {filteredBeliefs.length === 1 ? 'belief' : 'beliefs'} found
        </div>
      </div>

      {/* Beliefs Accordion */}
      <div className="space-y-4">
        {filteredBeliefs.length > 0 ? (
          filteredBeliefs.map((belief, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleBelief(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">{belief.title}</h3>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transform transition-transform ${
                    expandedBeliefs.has(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedBeliefs.has(index) && (
                <div className="px-6 pb-4">
                  <div className="prose prose-lg max-w-none">
                    {belief.description}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No beliefs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
