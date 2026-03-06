'use client';

import { useTheme } from './theme-provider';
import Link from 'next/link';

const Footer = ({ homepage }: { homepage?: any }) => {
  const { theme } = useTheme();
  const defaultColumns = [
    {
      title: 'About',
      links: [
        { text: 'Overview', url: '/about' },
        { text: 'Our Beliefs', url: '/beliefs' },
        { text: 'Leadership', url: '/leadership' },
        { text: 'Annual Theme', url: '/theme' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { text: 'Plan Your Visit', url: '/visit' },
        { text: 'Prayer Request', url: '/prayer' },
        { text: 'Contact Us', url: '/contact' },
        { text: 'Join a Ministry', url: '/ministries' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Watch Sermons', url: '/sermons' },
        { text: 'Sermon Series', url: '/series' },
        { text: 'Give Online', url: '/give' },
        { text: 'Events', url: '/events' },
      ],
    },
    {
      title: 'Branches',
      links: [
        { text: 'Ghana HQ: Accra, Ghana', url: '' },
        { text: 'Zimbabwe: Harare, Zimbabwe', url: '' },
        { text: 'UK: London, UK', url: '' },
        { text: 'Germany: Berlin, Germany', url: '' },
      ],
    },
  ];
  const columns = homepage?.footerColumns || defaultColumns;
  const contact = homepage?.footerContact;
  const bottomText = homepage?.footerBottomText;

  const footerBottom = bottomText || '© 2026 ThaGospel Church. All Rights Reserved. Raising Believers. Impacting Nations.';

  const isInternalLink = (url: string) => url.startsWith('/');

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {columns?.map((column, index) => (
            <div key={index}>
              <h3 className={`${theme === 'light' ? 'text-purple-400' : 'text-purple-300'} mb-4 font-inter`}>{column.title}</h3>
              <ul className="space-y-2">
                {column.links?.map((link: {text: string, url: string}, linkIndex: number) => (
                  <li key={linkIndex}>
                    {isInternalLink(link.url) ? (
                      <Link href={link.url} className={`hover:${theme === 'light' ? 'text-purple-400' : 'text-purple-300'} transition-colors`}>
                        {link.text}
                      </Link>
                    ) : (
                      <a href={link.url} className={`hover:${theme === 'light' ? 'text-purple-400' : 'text-purple-300'} transition-colors`}>
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {contact?.serviceTimes && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <p className="font-semibold">Service Times:</p>
              {contact.serviceTimes.map((time: string, index: number) => (
                <p key={index}>{time}</p>
              ))}
            </div>
          </div>
        )}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p>{footerBottom}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
