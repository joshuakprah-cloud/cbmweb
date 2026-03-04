import React from 'react';
import Link from 'next/link';
import { useTheme } from '../theme-provider';

interface DropdownProps {
  items: Array<{ title: string; href: string }>;
}

const Dropdown = React.memo<DropdownProps>(({ items }) => {
  const { theme } = useTheme();
  return (
    <div className={`absolute top-full left-0 mt-2 w-48 ${
      theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
    } rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50`}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block px-4 py-2 text-sm ${
            theme === 'light' ? 'text-gray-700 hover:bg-red-100 hover:text-red-500' : 'text-gray-200 hover:bg-red-900 hover:text-red-500'
          } transition-colors duration-200`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
