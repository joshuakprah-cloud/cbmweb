import React from 'react';
import Link from 'next/link';
import Dropdown from './Dropdown';

export type NavItemType = {
  title: string;
  href: string;
  dropdown?: Array<{ title: string; href: string }>;
};

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  pathname: string;
}

const NavItem = React.memo<NavItemProps>(({ item, isActive }) => {
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className={`relative text-foreground hover:text-red-500 transition-colors duration-200 ${
          isActive ? 'text-red-500 hover:text-red-600' : ''
        }`}
        aria-label={item.title}
      >
        {item.title}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform transition-transform duration-300 origin-left ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        ></span>
      </Link>
      {item.dropdown && <Dropdown items={item.dropdown} />}
    </div>
  );
});

NavItem.displayName = 'NavItem';

export default NavItem;
