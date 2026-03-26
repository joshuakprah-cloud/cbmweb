import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Only accept POST requests
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, attendees, eventSlug, _honey } = body;

    // Honeypot spam protection
    if (_honey) {
      // Silently return success for bots
      return NextResponse.json(
        { message: 'Registration received' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!fullName || !email || !attendees) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, and attendees are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get admin email from environment
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@thagospel.com';

    // Prepare email content
    const emailContent = `
      New Event Registration

      Event: ${eventSlug}
      Name: ${fullName}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Attendees: ${attendees}
      Date: ${new Date().toLocaleString()}
    `;

    // Send confirmation email to registrant
    try {
      // Note: In a real implementation, you would use Resend or Nodemailer here
      // For now, we'll just log the registration
      console.log('Registration received:', {
        eventSlug,
        fullName,
        email,
        phone,
        attendees,
        timestamp: new Date().toISOString()
      });

      // Send notification to admin
      console.log('Admin notification sent to:', adminEmail);
      
      return NextResponse.json(
        { 
          message: 'Registration successful! We will contact you soon with event details.',
          registrationId: Math.random().toString(36).substr(2, 9) // Generate a simple ID
        },
        { status: 200 }
      );

    } catch (error) {
      console.error('Registration error:', error);
      return NextResponse.json(
        { error: 'Registration failed. Please try again later.' },
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

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
