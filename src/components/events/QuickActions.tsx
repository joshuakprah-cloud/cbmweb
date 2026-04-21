'use client';

import { useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';
import { CalendarIcon, CalendarDaysIcon, UserGroupIcon, HomeIcon } from '@heroicons/react/24/outline';

interface QuickActionsProps {
  categories?: string[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ categories = [] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilter = (type: string, value: string) => {
    const query = createQueryString(type, value);
    router.push(`${pathname}?${query}`, { scroll: false });
  };

  const isActive = (type: string, value: string) => {
    return searchParams.get(type) === value;
  };

  const getThisWeekDate = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return nextWeek.toISOString().split('T')[0];
  };

  const getThisMonthDate = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    return nextMonth.toISOString().split('T')[0];
  };

  const actions = [
    {
      id: 'thisWeek',
      label: EVENTS_FALLBACKS.quickActions.thisWeek,
      icon: CalendarIcon,
      onClick: () => handleFilter('dateRange', 'thisWeek'),
      isActive: isActive('dateRange', 'thisWeek'),
      description: 'Events happening this week',
    },
    {
      id: 'thisMonth',
      label: EVENTS_FALLBACKS.quickActions.thisMonth,
      icon: CalendarDaysIcon,
      onClick: () => handleFilter('dateRange', 'thisMonth'),
      isActive: isActive('dateRange', 'thisMonth'),
      description: 'Events happening this month',
    },
    {
      id: 'youthEvents',
      label: EVENTS_FALLBACKS.quickActions.youthEvents,
      icon: UserGroupIcon,
      onClick: () => handleFilter('category', 'Youth Events'),
      isActive: isActive('category', 'Youth Events'),
      description: 'Youth-focused events and activities',
    },
    {
      id: 'services',
      label: EVENTS_FALLBACKS.quickActions.services,
      icon: HomeIcon,
      onClick: () => handleFilter('category', 'Sunday Services'),
      isActive: isActive('category', 'Sunday Services'),
      description: 'Sunday services and worship gatherings',
    },
  ];

  return (
    <section className="py-8 bg-gray-50" aria-labelledby="quick-actions-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="quick-actions-heading" 
          className="text-lg font-semibold text-gray-900 mb-4"
        >
          Quick Filters
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className={`
                  inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                  ${action.isActive 
                    ? 'bg-teal-600 text-white shadow-md hover:bg-teal-700' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }
                `}
                aria-pressed={action.isActive}
                title={action.description}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active filters display */}
        {Array.from(searchParams.entries()).length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            <button
              onClick={() => router.push(pathname, { scroll: false })}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickActions;
