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
export const revalidate = 60;

export default async function Home() {
  const data = await client.fetch(homepageQuery, {}, { next: { revalidate: 60 } })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero 
        heroBackgroundImage={data?.heroBackgroundImage} 
        heroBackgroundImageAlt={data?.heroBackgroundImageAlt} 
      />
      <YouBelongHere />
      <UpcomingEvent />
      <MeetPastor />
      <GlobalPresenceStrip />
      <Footer />
    </div>
  );
}
