'use client';

import Link from 'next/link';
import { 
  CalendarIcon, 
  VideoCameraIcon, 
  BookOpenIcon, 
  UserGroupIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

type EmptyStateType = 'events' | 'sermons' | 'blog' | 'groups' | 'gallery' | 'search' | 'generic';

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  message?: string;
  actionLabel?: string;
  actionUrl?: string;
  onAction?: () => void;
  secondaryAction?: {
    label: string;
    url: string;
  };
  showBrowseAll?: boolean;
}

const emptyStateConfig: Record<EmptyStateType, {
  icon: React.ElementType;
  defaultTitle: string;
  defaultMessage: string;
  defaultActionLabel: string;
  defaultActionUrl: string;
  suggestions: string[];
}> = {
  events: {
    icon: CalendarIcon,
    defaultTitle: 'No events found',
    defaultMessage: 'There are no upcoming events at the moment. Check back soon or browse our service schedule.',
    defaultActionLabel: 'View Service Times',
    defaultActionUrl: '/im-new#service-times',
    suggestions: [
      'Check our regular Sunday services',
      'Browse past events in our archive',
      'Subscribe to get notified about new events'
    ]
  },
  sermons: {
    icon: VideoCameraIcon,
    defaultTitle: 'No sermons found',
    defaultMessage: 'We couldn\'t find any sermons matching your criteria. Try adjusting your filters or browse all sermons.',
    defaultActionLabel: 'Browse All Sermons',
    defaultActionUrl: '/sermons',
    suggestions: [
      'Try different search keywords',
      'Clear filters to see all sermons',
      'Browse by series or speaker'
    ]
  },
  blog: {
    icon: BookOpenIcon,
    defaultTitle: 'No posts found',
    defaultMessage: 'No blog posts match your search. Check back soon for new content or browse our archives.',
    defaultActionLabel: 'View All Posts',
    defaultActionUrl: '/media/blog',
    suggestions: [
      'Try different search terms',
      'Browse posts by category',
      'Check out our featured content'
    ]
  },
  groups: {
    icon: UserGroupIcon,
    defaultTitle: 'No groups found',
    defaultMessage: 'We couldn\'t find any small groups matching your preferences. Try different filters or contact us for help.',
    defaultActionLabel: 'Contact Us',
    defaultActionUrl: '/connect/contact',
    suggestions: [
      'Try different days or times',
      'Browse all available groups',
      'Start a new group in your area'
    ]
  },
  gallery: {
    icon: PhotoIcon,
    defaultTitle: 'No photos found',
    defaultMessage: 'No photos match your search criteria. Try different filters or browse all albums.',
    defaultActionLabel: 'Browse All Albums',
    defaultActionUrl: '/media/gallery',
    suggestions: [
      'Try different search terms',
      'Browse by event or date',
      'View recent uploads'
    ]
  },
  search: {
    icon: MagnifyingGlassIcon,
    defaultTitle: 'No results found',
    defaultMessage: 'We couldn\'t find anything matching your search. Try different keywords or browse our sections.',
    defaultActionLabel: 'Clear Search',
    defaultActionUrl: '#',
    suggestions: [
      'Check your spelling',
      'Try more general terms',
      'Browse by category instead'
    ]
  },
  generic: {
    icon: MagnifyingGlassIcon,
    defaultTitle: 'Nothing found',
    defaultMessage: 'There are no items to display at the moment.',
    defaultActionLabel: 'Go Home',
    defaultActionUrl: '/',
    suggestions: [
      'Check back later',
      'Contact us for assistance',
      'Browse other sections'
    ]
  }
};

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  message,
  actionLabel,
  actionUrl,
  onAction,
  secondaryAction,
  showBrowseAll = true,
}) => {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  const finalTitle = title || config.defaultTitle;
  const finalMessage = message || config.defaultMessage;
  const finalActionLabel = actionLabel || config.defaultActionLabel;
  const finalActionUrl = actionUrl || config.defaultActionUrl;

  return (
    <div className="text-center py-12 px-4">
      {/* Icon */}
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {finalTitle}
      </h3>

      {/* Message */}
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        {finalMessage}
      </p>

      {/* Suggestions */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-3">Suggestions:</p>
        <ul className="space-y-2">
          {config.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onAction ? (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-600 transition-colors"
          >
            {finalActionLabel}
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <Link
            href={finalActionUrl}
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-600 transition-colors"
          >
            {finalActionLabel}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        )}

        {secondaryAction && (
          <Link
            href={secondaryAction.url}
            className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
          >
            {secondaryAction.label}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        )}

        {showBrowseAll && type !== 'generic' && (
          <Link
            href={config.defaultActionUrl}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Browse all {type === 'blog' ? 'posts' : type}
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
