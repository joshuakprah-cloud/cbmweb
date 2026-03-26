import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 600000 }); // 10 minutes window
    return false;
  }
  
  if (record.count >= 5) {
    return true;
  }
  
  record.count++;
  return false;
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, '');
}

export async function POST(request: NextRequest) {
  // Only allow POST method
  if (request.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  }

  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
           request.headers.get('x-real-ip') || 
           'unknown';
    
    // Rate limiting: 5 submissions per IP per 10 minutes
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, phone, email, subject, message, website } = body;

    // Check honeypot field - if filled, it's a bot
    if (website && website.trim() !== '') {
      // Return success to make bots think submission worked
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Full name, email, and message are required' },
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

    // Message length validation
    if (message.trim().length < 10 || message.trim().length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitizeInput(fullName),
      phone: phone ? sanitizeInput(phone) : '',
      email: sanitizeInput(email),
      subject: subject ? sanitizeInput(subject) : '',
      message: sanitizeInput(message),
    };

    // Create contact submission document in Sanity
    const submissionDocument = {
      _type: 'contactSubmission',
      fullName: sanitizedData.fullName,
      phone: sanitizedData.phone,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      submittedAt: new Date().toISOString(),
      status: 'new',
      isSpam: false,
    };

    try {
      // Save to Sanity first
      await client.create(submissionDocument);

      // Send confirmation email to the submitter
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@thagospel.com',
          to: sanitizedData.email,
          subject: 'We received your message - ThaGospel Church',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1e40af;">Thank you for contacting ThaGospel Church</h2>
              <p>Hi ${sanitizedData.fullName},</p>
              <p>We've received your message and will get back to you within 24-48 hours.</p>
              <p>Here's a copy of what you sent us:</p>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${sanitizedData.message}</p>
              </div>
              <p>Blessings,<br/>ThaGospel Church Team</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Continue even if email fails
      }

      // Send notification email to admin
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@thagospel.com',
          to: process.env.ADMIN_EMAIL || 'admin@thagospel.com',
          subject: `New Contact Form Submission - ${sanitizedData.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1e40af;">New Contact Form Submission</h2>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px;">
                <p><strong>Name:</strong> ${sanitizedData.fullName}</p>
                <p><strong>Email:</strong> ${sanitizedData.email}</p>
                <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${sanitizedData.message}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <p>Please respond to this inquiry within 24-48 hours.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
        // Continue even if email fails
      }
      
      return NextResponse.json(
        { success: true, message: 'Contact form submitted successfully' },
        { status: 200 }
      );
    } catch (sanityError) {
      console.error('Sanity error:', sanityError);
      return NextResponse.json(
        { error: 'Failed to save submission. Please try again.' },
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
