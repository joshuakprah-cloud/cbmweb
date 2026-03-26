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
  
  if (record.count >= 3) {
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
    
    // Rate limiting: 3 submissions per IP per 10 minutes
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, prayerType, request: prayerRequest, urgent, consent, website } = body;

    // Check honeypot field - if filled, it's a bot
    if (website && website.trim() !== '') {
      // Return success to make bots think submission worked
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validation
    if (!name || !email || !prayerType || !prayerRequest) {
      return NextResponse.json(
        { error: 'Name, email, prayer type, and request are required' },
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

    // Consent validation
    if (!consent) {
      return NextResponse.json(
        { error: 'Consent is required to submit a prayer request' },
        { status: 400 }
      );
    }

    // Request length validation
    if (prayerRequest.trim().length < 10 || prayerRequest.trim().length > 2000) {
      return NextResponse.json(
        { error: 'Prayer request must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      prayerType: sanitizeInput(prayerType),
      request: sanitizeInput(prayerRequest),
      urgent: Boolean(urgent),
      consent: Boolean(consent),
    };

    // Create prayer request document in Sanity
    const prayerDocument = {
      _type: 'prayerRequest',
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      prayerType: sanitizedData.prayerType,
      request: sanitizedData.request,
      urgent: sanitizedData.urgent,
      consent: sanitizedData.consent,
      submittedAt: new Date().toISOString(),
      status: 'new',
      isConfidential: true,
    };

    try {
      // Save to Sanity first
      await client.create(prayerDocument);

      // Send confirmation email to the submitter
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@thagospel.com',
          to: sanitizedData.email,
          subject: "We're praying for you - ThaGospel Church",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #7c3aed;">We're praying for you</h2>
              <p>Dear ${sanitizedData.name},</p>
              <p>Thank you for sharing your prayer request with us. Our pastoral team has received your request and we are lifting you up in prayer.</p>
              <p>Remember, you are not alone. God loves you deeply, and so do we.</p>
              <div style="background-color: #faf5ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Prayer Focus:</strong> ${sanitizedData.prayerType}</p>
                <p><strong>Your Request:</strong></p>
                <p>${sanitizedData.request}</p>
                ${sanitizedData.urgent ? '<p style="color: #dc2626;"><strong>🚨 Marked as urgent</strong></p>' : ''}
              </div>
              <p>If you need to speak with someone immediately, please don't hesitate to <a href="tel:+1234567890">call us</a>.</p>
              <p>With love and prayers,<br/>ThaGospel Church Pastoral Team</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Continue even if email fails
      }

      // Send notification email to pastoral team
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@thagospel.com',
          to: process.env.ADMIN_EMAIL || 'admin@thagospel.com',
          subject: urgent ? `🚨 URGENT Prayer Request - ${sanitizedData.name}` : `New Prayer Request - ${sanitizedData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: ${urgent ? '#dc2626' : '#7c3aed'};">
                ${urgent ? '🚨 URGENT Prayer Request' : 'New Prayer Request'}
              </h2>
              <div style="background-color: ${urgent ? '#fef2f2' : '#faf5ff'}; padding: 15px; border-radius: 5px;">
                <p><strong>Name:</strong> ${sanitizedData.name}</p>
                <p><strong>Email:</strong> ${sanitizedData.email}</p>
                <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
                <p><strong>Prayer Type:</strong> ${sanitizedData.prayerType}</p>
                <p><strong>Urgent:</strong> ${sanitizedData.urgent ? 'Yes - Please follow up ASAP' : 'No'}</p>
                <p><strong>Request:</strong></p>
                <p>${sanitizedData.request}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Consent to contact:</strong> ${sanitizedData.consent ? 'Yes' : 'No'}</p>
              </div>
              ${sanitizedData.urgent ? 
                '<p style="color: #dc2626; font-weight: bold;">This request has been marked as urgent. Please follow up as soon as possible.</p>' : 
                '<p>Please pray for this request and follow up if appropriate.</p>'
              }
              ${sanitizedData.phone ? 
                `<p>You can reach them at: <a href="tel:${sanitizedData.phone.replace(/\D/g, '')}">${sanitizedData.phone}</a></p>` : 
                ''
              }
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send prayer notification email:', emailError);
        // Continue even if email fails
      }
      
      return NextResponse.json(
        { success: true, message: 'Prayer request submitted successfully' },
        { status: 200 }
      );
    } catch (sanityError) {
      console.error('Sanity error:', sanityError);
      return NextResponse.json(
        { error: 'Failed to save prayer request. Please try again.' },
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
