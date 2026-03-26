import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, preferences } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Check if email already exists
    try {
      const existingSubscriber = await client.fetch(`
        *[_type == "newsletterSubscriber" && email == $email][0]._id
      `, { email });

      if (existingSubscriber) {
        return NextResponse.json(
          { error: 'Already subscribed' },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error('Error checking existing subscriber:', error);
      // Continue with subscription even if check fails
    }

    // Create newsletter subscriber document in Sanity
    const subscriberDocument = {
      _type: 'newsletterSubscriber',
      name: name || '',
      email,
      preferences: preferences || ['Events'],
      subscribedAt: new Date().toISOString(),
      isActive: true,
    };

    try {
      await client.create(subscriberDocument);
      
      return NextResponse.json(
        { success: true, message: 'Subscription successful' },
        { status: 200 }
      );
    } catch (sanityError) {
      console.error('Sanity error:', sanityError);
      return NextResponse.json(
        { error: 'Failed to save subscription. Please try again.' },
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
