import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

function formatDateForICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') + 'Z';
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Fetch event data from Sanity
    const event = await client.fetch(`
      *[_type == "event" && slug.current == $slug && isPublished == true][0] {
        title,
        date,
        endDate,
        location,
        excerpt,
        slug
      }
    `, { slug });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Generate ICS content
    const startDate = new Date(event.date);
    const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours duration

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ThaGospel Church//Events//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${event.slug}@thagospel.com`,
      `DTSTART:${formatDateForICS(startDate)}`,
      `DTEND:${formatDateForICS(endDate)}`,
      `SUMMARY:${escapeICS(event.title)}`,
      `DESCRIPTION:${escapeICS(event.excerpt || '')}`,
      `LOCATION:${escapeICS(event.location || '')}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Create filename from event title and slug
    const filename = `${event.slug.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;

    // Return ICS file
    return new NextResponse(icsContent, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error generating ICS file:', error);
    return NextResponse.json(
      { error: 'Failed to generate calendar file' },
      { status: 500 }
    );
  }
}
