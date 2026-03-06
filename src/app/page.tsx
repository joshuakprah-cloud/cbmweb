import Navbar from '../components/navbar/Navbar';
import Hero from '../components/Hero';
import YouBelongHere from '../components/YouBelongHere';
import WhatToExpect from '../components/WhatToExpect';
import Leadership from '../components/Leadership';
import About from '../components/About';
import Services from '../components/Services';
import UpcomingEvent from '../components/UpcomingEvent';
import SermonSection from '../components/SermonSection';
import Testimonials from '../components/Testimonials';
import MinistriesSection from '../components/MinistriesSection';
import GlobalPresenceStrip from '../components/GlobalPresenceStrip';
import Footer from '../components/Footer';

import { client } from '../../sanity/lib/client';
import { homepageQuery } from '../../sanity/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Home() {
  const data = await client.fetch(homepageQuery, {}, { next: { revalidate: 60 } })

  console.log('Homepage data:', data)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero 
        heroHeadline={data?.heroHeadline} 
        heroSubtext={data?.heroSubtext} 
        heroBackgroundImage={data?.heroBackgroundImage} 
        heroBackgroundImageAlt={data?.heroBackgroundImageAlt} 
        heroPrimaryButton={data?.heroPrimaryButton} 
        heroSecondaryButton={data?.heroSecondaryButton} 
        heroSmallLine={data?.heroSmallLine} 
      />
      <YouBelongHere />
      <WhatToExpect title={data?.whatToExpectTitle} items={data?.whatToExpectItems} />
      <Leadership 
        prophetName={data?.prophetName}
        prophetTitle={data?.prophetTitle}
        prophetImage={data?.prophetImage}
        firstLadyName={data?.firstLadyName}
        firstLadyTitle={data?.firstLadyTitle}
        firstLadyImage={data?.firstLadyImage}
        leadersWelcomeMessage={data?.leadersWelcomeMessage}
      />
      <About homepage={data} />
      <Services homepage={data} />
      <UpcomingEvent />
      <SermonSection homepage={data} />
      <Testimonials testimonials={data?.testimonials} headline={data?.testimonialsHeadline} button={data?.testimonialsButton} />
      <MinistriesSection homepage={data} />
      <GlobalPresenceStrip homepage={data} />
      <Footer homepage={data} />
    </div>
  );
}
