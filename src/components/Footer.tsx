'use client';

import { useTheme } from './theme-provider';
import Link from 'next/link';

const Footer = ({ homepage }: { homepage?: any }) => {
  const { theme } = useTheme();
  const contact = homepage?.footerContact;
  const defaultColumns = [
    {
      title: 'Church',
      links: [
        { text: 'About', url: '/about' },
        { text: 'Leadership', url: '/leadership' },
        { text: 'Ministries', url: '/ministries' },
        { text: 'Sermons', url: '/sermons' },
      ],
    },
    {
      title: 'Get Connected',
      links: [
        { text: 'Plan Your Visit', url: '/plan-your-visit' },
        { text: 'Events', url: '/events' },
        { text: 'Prayer Request', url: '/prayer' },
        { text: 'Give', url: '/give' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: contact?.address || 'Address: 123 Church St, Accra, Ghana', url: '' },
        { text: contact?.phone || 'Phone: +233 123 456 789', url: '' },
        { text: contact?.email || 'Email: info@thagospel.org', url: '' },
      ],
    },
    {
      title: 'Service Times',
      links: [
        { text: 'Sunday Services: ' + (homepage?.serviceTimes?.join(', ') || '8:00 AM & 10:30 AM'), url: '' },
        { text: 'Midweek Service: ' + (homepage?.midweekService || 'Wednesday 6:30 PM'), url: '' },
      ],
    },
  ];
  const columns = homepage?.footerColumns || defaultColumns;
  const bottomText = homepage?.footerBottomText;

  const footerBottom = bottomText || '© 2026 ThaGospel Church. All Rights Reserved. Raising Believers. Impacting Nations.';

  const isInternalLink = (url: string) => url.startsWith('/');

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {columns?.map((column: any, index: number) => (
            <div key={index}>
              <h3 className={`${theme === 'light' ? 'text-purple-400' : 'text-purple-300'} mb-4 font-inter`}>{column.title}</h3>
              <ul className="space-y-2">
                {column.links?.map((link: {text: string, url: string}, linkIndex: number) => (
                  <li key={linkIndex}>
                    {link.url ? (
                      isInternalLink(link.url) ? (
                        <Link href={link.url} className={`hover:${theme === 'light' ? 'text-purple-400' : 'text-purple-300'} transition-colors`}>
                          {link.text}
                        </Link>
                      ) : (
                        <a href={link.url} className={`hover:${theme === 'light' ? 'text-purple-400' : 'text-purple-300'} transition-colors`}>
                          {link.text}
                        </a>
                      )
                    ) : (
                      <p className="text-sm">{link.text}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p>{footerBottom}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
