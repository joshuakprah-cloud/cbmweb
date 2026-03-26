import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, preferences } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
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

    // Check if already subscribed
    const existingSubscriber = await client.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email }
    );

    if (existingSubscriber) {
      // If unsubscribed, reactivate
      if (existingSubscriber.status === 'unsubscribed') {
        await client
          .patch(existingSubscriber._id)
          .set({
            status: 'active',
            reactivatedDate: new Date().toISOString()
          })
          .commit();

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.'
        });
      }

      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 409 }
      );
    }

    // Create subscriber document
    const subscriber = {
      _type: 'newsletterSubscriber',
      subscriberId: nanoid(),
      email,
      name: name || '',
      preferences: {
        events: true,
        sermons: preferences?.sermons || true,
        announcements: preferences?.announcements || true,
        youth: preferences?.youth || false,
        outreach: preferences?.outreach || false
      },
      subscriptionDate: new Date().toISOString(),
      status: 'active',
      source: 'events-page' // Track where they subscribed from
    };

    // Save to Sanity
    const result = await client.create(subscriber);

    // TODO: Send welcome email
    // await sendWelcomeEmail(email, name);

    // TODO: Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // await addToEmailService(email, name, preferences);

    return NextResponse.json({
      success: true,
      subscriberId: subscriber.subscriberId,
      message: 'Successfully subscribed! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Find and unsubscribe the user
    const subscriber = await client.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email }
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    await client
      .patch(subscriber._id)
      .set({
        status: 'unsubscribed',
        unsubscribedDate: new Date().toISOString()
      })
      .commit();

    // TODO: Remove from email marketing service
    // await removeFromEmailService(email);

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter.'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request' },
      { status: 500 }
    );
  }
}
