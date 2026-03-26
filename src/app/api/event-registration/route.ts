import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, name, email, phone, specialRequests } = body;

    // Validate required fields
    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, name, email' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user is already registered for this event
    const existingRegistration = await client.fetch(
      `*[_type == "eventRegistration" && event._ref == $eventId && email == $email][0]`,
      { eventId, email }
    );

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 409 }
      );
    }

    // Get event details to check capacity
    const event = await client.fetch(
      `*[_type == "event" && _id == $eventId][0]{
        title,
        capacity,
        registeredCount
      }`,
      { eventId }
    );

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check capacity if specified
    if (event.capacity && event.registeredCount >= event.capacity) {
      return NextResponse.json(
        { error: 'This event is fully booked' },
        { status: 410 }
      );
    }

    // Create registration document
    const registration = {
      _type: 'eventRegistration',
      registrationId: nanoid(),
      event: {
        _type: 'reference',
        _ref: eventId
      },
      name,
      email,
      phone: phone || '',
      specialRequests: specialRequests || '',
      registrationDate: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: event.isFree ? 'not_required' : 'pending'
    };

    // Save to Sanity
    const result = await client.create(registration);

    // Update event registration count
    await client
      .patch(eventId)
      .setIfMissing({ registeredCount: 0 })
      .inc({ registeredCount: 1 })
      .commit();

    // TODO: Send confirmation email
    // await sendRegistrationConfirmationEmail(email, event.title, registration.registrationId);

    return NextResponse.json({
      success: true,
      registrationId: registration.registrationId,
      message: 'Registration successful! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
