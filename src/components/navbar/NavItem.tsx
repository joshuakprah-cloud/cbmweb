import React from 'react';
import Link from 'next/link';

// Re-export types for backward compatibility
export interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavItemType {
  title: string;
  href: string;
  dropdown?: DropdownItem[];
  columns?: {
    left: { label: string; items: DropdownItem[] };
    right: { label: string; items: DropdownItem[] };
  };
}

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick?: () => void;
}

/**
 * Simplified NavItem component for backward compatibility.
 * The main navigation now uses an integrated approach in Navbar.tsx.
 */
const NavItem = React.memo<NavItemProps>(({ item, isActive, onClick }) => {
  return (
    <div className="relative group">
      <Link
        href={item.href}
        onClick={onClick}
        className={`relative text-[15px] font-medium transition-colors duration-200 py-2 ${
          isActive
            ? 'text-[#0d9488]'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label={item.title}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.title}
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0d9488] rounded-full" />
        )}
      </Link>
    </div>
  );
});

NavItem.displayName = 'NavItem';

export default NavItem;
