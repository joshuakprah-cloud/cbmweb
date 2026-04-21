'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  UsersIcon, 
  CalendarIcon, 
  MapPinIcon, 
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  HeartIcon,
  ArrowRightIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface SmallGroup {
  _id: string;
  name: string;
  slug: string;
  day: string;
  time: string;
  location: string;
  leader: string;
  demographic: string;
  description?: string;
  capacity?: number;
  memberCount?: number;
}

interface GroupsBrowserProps {
  groups: SmallGroup[];
}

const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const GroupsBrowser: React.FC<GroupsBrowserProps> = ({ groups }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedDay, setSelectedDay] = useState(searchParams.get('day') || '');
  const [selectedDemographic, setSelectedDemographic] = useState(searchParams.get('demographic') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  
  // Modal state
  const [selectedGroup, setSelectedGroup] = useState<SmallGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [joinStatus, setJoinStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Extract unique filter options
  const uniqueDays = useMemo(() => {
    const days = [...new Set(groups.map(g => g.day))];
    return days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }, [groups]);

  const uniqueDemographics = useMemo(() => {
    return [...new Set(groups.map(g => g.demographic))].filter(Boolean);
  }, [groups]);

  const uniqueLocations = useMemo(() => {
    return [...new Set(groups.map(g => g.location))].filter(Boolean);
  }, [groups]);

  // Filter and sort groups
  const filteredGroups = useMemo(() => {
    let filtered = [...groups];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(query) ||
        group.leader.toLowerCase().includes(query) ||
        group.description?.toLowerCase().includes(query)
      );
    }

    // Day filter
    if (selectedDay) {
      filtered = filtered.filter(group => group.day === selectedDay);
    }

    // Demographic filter
    if (selectedDemographic) {
      filtered = filtered.filter(group => group.demographic === selectedDemographic);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(group => group.location === selectedLocation);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'day':
          return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        case 'leader':
          return a.leader.localeCompare(b.leader);
        default:
          return 0;
      }
    });

    return filtered;
  }, [groups, searchQuery, selectedDay, selectedDemographic, selectedLocation, sortBy]);

  // Update URL params
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/connect/groups?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDay('');
    setSelectedDemographic('');
    setSelectedLocation('');
    setSortBy('name');
    router.push('/connect/groups', { scroll: false });
  };

  // Open join modal
  const openJoinModal = (group: SmallGroup) => {
    setSelectedGroup(group);
    setJoinFormData({ name: '', email: '', phone: '', message: '' });
    setJoinStatus('idle');
    setIsModalOpen(true);
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'group_join_click', {
        event_category: 'engagement',
        event_label: group.name,
      });
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
  };

  // Handle join form submit
  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinStatus('submitting');

    try {
      const response = await fetch('/api/group-join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: selectedGroup?._id,
          groupName: selectedGroup?.name,
          ...joinFormData
        }),
      });

      if (response.ok) {
        setJoinStatus('success');
        // Track analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'group_join_submit', {
            event_category: 'conversion',
            event_label: selectedGroup?.name,
          });
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setJoinStatus('error');
    }
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedDay || selectedDemographic || selectedLocation;

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative" role="search">
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups by name, leader, or description..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateFilters('search', e.target.value);
            }}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            aria-label="Search small groups"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3">
          {/* Day Filter */}
          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(e.target.value);
                updateFilters('day', e.target.value);
              }}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              aria-label="Filter by day"
            >
              <option value="">All Days</option>
              {uniqueDays.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Demographic Filter */}
          <div className="relative">
            <select
              value={selectedDemographic}
              onChange={(e) => {
                setSelectedDemographic(e.target.value);
                updateFilters('demographic', e.target.value);
              }}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              aria-label="Filter by demographic"
            >
              <option value="">All Demographics</option>
              {uniqueDemographics.map(demo => (
                <option key={demo} value={demo}>{demo}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                updateFilters('location', e.target.value);
              }}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              aria-label="Filter by location"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                updateFilters('sort', e.target.value);
              }}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              aria-label="Sort groups"
            >
              <option value="name">Sort by Name</option>
              <option value="day">Sort by Day</option>
              <option value="leader">Sort by Leader</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center gap-1"
              aria-label="Clear all filters"
            >
              <XMarkIcon className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredGroups.length}</span> {filteredGroups.length === 1 ? 'group' : 'groups'}
        </p>
        {hasActiveFilters && (
          <p className="text-sm text-gray-500">
            Filters applied
          </p>
        )}
      </div>

      {/* Groups Grid */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div 
              key={group._id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <UsersIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                      {group.demographic && (
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                          {group.demographic}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Group Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {group.day} at {group.time}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {group.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                    Led by {group.leader}
                  </div>
                </div>

                {group.description && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{group.description}</p>
                )}

                {/* Capacity indicator */}
                {group.capacity && group.memberCount !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{group.memberCount} members</span>
                      <span>{group.capacity} max</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((group.memberCount / group.capacity) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer - Action Button */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => openJoinModal(group)}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  aria-label={`Join ${group.name}`}
                >
                  Join This Group
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No groups found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Join Group Modal */}
      {isModalOpen && selectedGroup && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-modal-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 id="join-modal-title" className="text-lg font-bold text-gray-900">
                      Join {selectedGroup.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedGroup.day}s at {selectedGroup.time}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {joinStatus === 'success' ? (
                /* Success State */
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Request Submitted!
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in {selectedGroup.name}. The group leader will contact you soon with next steps.
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Join Form */
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <p className="text-gray-600 text-sm mb-4">
                    Fill out your information below and the group leader will reach out to welcome you.
                  </p>

                  {/* Name */}
                  <div>
                    <label htmlFor="join-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="join-name"
                      value={joinFormData.name}
                      onChange={(e) => setJoinFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="join-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="join-email"
                      value={joinFormData.email}
                      onChange={(e) => setJoinFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="join-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="join-phone"
                      value={joinFormData.phone}
                      onChange={(e) => setJoinFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="join-message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="join-message"
                      value={joinFormData.message}
                      onChange={(e) => setJoinFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Any questions or things you'd like the leader to know..."
                    />
                  </div>

                  {/* Error State */}
                  {joinStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={joinStatus === 'submitting'}
                      className="flex-1 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {joinStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsBrowser;
