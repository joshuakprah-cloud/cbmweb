import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Simple in-memory rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 600000 }); // 10 minutes window
    return false;
  }
  
  if (record.count >= 3) {
    return true;
  }
  
  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
           request.headers.get('x-real-ip') || 
           'unknown';
    
    // Rate limiting: 3 attempts per 10 minutes
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, numberOfAttendees, message, event } = body;

    // Validation
    if (!fullName || !email || !event) {
      return NextResponse.json(
        { error: 'Full name, email, and event are required' },
        { status: 400 }
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check event capacity
    try {
      const eventData = await client.fetch(`
        *[_type == "event" && _id == $eventId][0] {
          capacity,
          _id
        }
      `, { eventId: event });

      if (!eventData) {
        return NextResponse.json(
          { error: 'Event not found' },
          { status: 404 }
        );
      }

      if (eventData.capacity) {
        // Count existing registrations
        const existingRegistrations = await client.fetch(`
          count(*[_type == "eventRegistration" && event._ref == $eventId && status != "cancelled"])
        `, { eventId: event });

        if (existingRegistrations >= eventData.capacity) {
          return NextResponse.json(
            { error: 'This event is fully booked.' },
            { status: 409 }
          );
        }
      }
    } catch (error) {
      console.error('Error checking event capacity:', error);
      // Continue with registration even if capacity check fails
    }

    // Create event registration document in Sanity
    const registrationDocument = {
      _type: 'eventRegistration',
      event: {
        _type: 'reference',
        _ref: event,
      },
      fullName,
      email,
      phone: phone || '',
      numberOfAttendees: numberOfAttendees || 1,
      message: message || '',
      registeredAt: new Date().toISOString(),
      status: 'pending',
    };

    try {
      await client.create(registrationDocument);
      
      return NextResponse.json(
        { success: true, message: 'Registration successful' },
        { status: 200 }
      );
    } catch (sanityError) {
      console.error('Sanity error:', sanityError);
      return NextResponse.json(
        { error: 'Failed to save registration. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
