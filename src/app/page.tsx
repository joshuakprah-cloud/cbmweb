import Navbar from '../components/navbar/Navbar';
import Hero from '../components/Hero';
import YouBelongHere from '../components/YouBelongHere';
import UpcomingEvent from '../components/UpcomingEvent';
import MeetPastor from '../components/MeetPastor';
import GlobalPresenceStrip from '../components/GlobalPresenceStrip';
import Footer from '../components/Footer';

import { client } from '../../sanity/lib/client';
import { homepageQuery } from '../../sanity/lib/queries';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const homepage = await client.fetch(homepageQuery) || {}

  // Fallbacks for polished homepage content
  const polishedHomepage = {
    heroHeadline: homepage.heroHeadline || 'Experience God. Build Community. Live With Purpose.',
    heroSubtext: homepage.heroSubtext || 'Welcome to ThaGospel Church, a vibrant Christ-centered church headquartered in Ghana, committed to raising believers rooted in truth and empowered for impact.',
    heroBackgroundImage: homepage.heroBackgroundImage,
    heroBackgroundImageAlt: homepage.heroBackgroundImageAlt,
    footerColumns: homepage.footerColumns || [
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
        title: 'Headquarters (Ghana)',
        links: [
          { text: 'ThaGospel Church', url: '' },
          { text: 'Accra, Ghana', url: '' },
          { text: 'Phone: (Insert)', url: '' },
          { text: 'Email: (Insert)', url: '' },
        ],
      },
      {
        title: 'Branches',
        links: [
          { text: '🇬🇭 Ghana (HQ)', url: '' },
          { text: '🇬🇧 UK', url: '' },
          { text: '🇿🇼 Zimbabwe', url: '' },
          { text: '🇩🇪 Germany', url: '' },
        ],
      },
    ],
    footerContact: homepage.footerContact || {
      churchName: 'ThaGospel Church',
      address: 'Accra, Ghana',
      phone: '(Insert)',
      email: '(Insert)',
      serviceTimes: ['Sunday — 7:30 AM & 10:30 AM', 'Wednesday — 6:30 PM'],
    },
    footerBottomText: homepage.footerBottomText || ' 2026 ThaGospel Church. All Rights Reserved. Raising Believers. Impacting Nations.',
    locationLat: homepage.locationLat,
    locationLng: homepage.locationLng,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero heroBackgroundImage={polishedHomepage.heroBackgroundImage} heroBackgroundImageAlt={polishedHomepage.heroBackgroundImageAlt} />
      <YouBelongHere />
      <UpcomingEvent />
      <MeetPastor />
      <Footer columns={polishedHomepage.footerColumns} contact={polishedHomepage.footerContact} bottomText={polishedHomepage.footerBottomText} />
    </div>
  );
}
