import { redirect } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import { latestSermonQuery } from '../../../../sanity/lib/queries';

export const revalidate = 3600;

export default async function LatestSermonPage() {
  let latestSermon = null;

  try {
    latestSermon = await client.fetch(latestSermonQuery, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error('Error fetching latest sermon:', error);
  }

  // If we have a latest sermon, redirect to it
  if (latestSermon?.slug) {
    redirect(`/messages/${latestSermon.slug}`);
  }

  // Fallback: redirect to main sermons page if no latest sermon found
  redirect('/messages');
}
