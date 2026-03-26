import EventPageWrapper from './EventPageWrapper';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { eventBySlugQuery } from 'sanity/lib/queries';

export const dynamicParams = true;
export const revalidate = 60; // 1 minute cache

export async function generateStaticParams() {
  try {
    const events = await client.fetch(`
      *[_type == "event" && isPublished == true] {
        "slug": slug.current
      }
    `, {}, { next: { revalidate: 60 } });
    
    return (events || []).map((event: any) => ({
      slug: event.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const event = await client.fetch(eventBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } });
    
    if (!event) {
      return {
        title: 'Event Not Found - ThaGospel Church',
        description: 'This event could not be found.',
      };
    }

    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return {
      title: event.seo?.metaTitle || `${event.title} - ThaGospel Church`,
      description: event.seo?.metaDescription || `${event.excerpt} - ${eventDate}`,
      openGraph: {
        title: event.seo?.metaTitle || `${event.title} - ThaGospel Church`,
        description: event.seo?.metaDescription || `${event.excerpt} - ${eventDate}`,
        images: event.coverImage ? [event.coverImage] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Event - ThaGospel Church',
      description: 'Learn more about our upcoming events.',
    };
  }
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  // Verify event exists before rendering
  const event = await client.fetch(eventBySlugQuery, { slug: params.slug }, { next: { revalidate: 60 } });
  
  if (!event) {
    notFound();
  }

  return <EventPageWrapper params={params} />;
}
