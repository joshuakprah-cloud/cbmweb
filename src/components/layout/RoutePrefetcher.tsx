import Link from 'next/link';

/**
 * RoutePrefetcher Component
 * 
 * Prefetches critical routes on page load to improve navigation performance.
 * This component should be placed in your layout or root component.
 * 
 * Key routes to prefetch:
 * - /im-new (high conversion page)
 * - /messages (content page)
 * - /events (engagement page)
 * - /connect (community page)
 * - /give (donation page)
 */

interface PrefetchLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
}

/**
 * Enhanced Link component with prefetching
 * Next.js Link automatically handles prefetching, but this wrapper
 * ensures consistent behavior and adds visibility
 */
export const PrefetchLink: React.FC<PrefetchLinkProps> = ({ 
  href, 
  children, 
  className = '',
  prefetch = true 
}) => {
  return (
    <Link 
      href={href} 
      className={className}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
};

/**
 * Key routes for prefetching
 * These are the most important user journeys
 */
export const KEY_ROUTES = {
  // Primary CTAs (highest priority)
  PLAN_VISIT: '/im-new',
  WATCH: '/watch',
  GIVE: '/give',
  
  // Content pages
  SERMONS: '/messages',
  EVENTS: '/events',
  BLOG: '/media/blog',
  
  // Community
  CONNECT: '/connect',
  GROUPS: '/connect/groups',
  CONTACT: '/connect/contact',
  
  // About
  ABOUT: '/about',
  BELIEFS: '/about/beliefs',
  LEADERSHIP: '/about/leadership',
  
  // Ministries
  MINISTRIES: '/ministries',
  KIDS: '/ministries/kids',
  YOUTH: '/ministries/youth',
} as const;

/**
 * PrefetchLinks component
 * Renders hidden links to prefetch critical routes on mount
 * Place this in your root layout for automatic prefetching
 */
const RoutePrefetcher: React.FC = () => {
  // These routes will be prefetched when the component mounts
  const routesToPrefetch = [
    KEY_ROUTES.PLAN_VISIT,
    KEY_ROUTES.SERMONS,
    KEY_ROUTES.EVENTS,
    KEY_ROUTES.CONNECT,
  ];

  return (
    <div className="sr-only" aria-hidden="true">
      {routesToPrefetch.map((route) => (
        <Link key={route} href={route} prefetch={true} />
      ))}
    </div>
  );
};

export default RoutePrefetcher;
