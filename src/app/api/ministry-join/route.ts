import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Simple in-memory rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return false;
  }
  
  if (record.count >= 5) {
    return true;
  }
  
  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for logging
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, ageGroup, message, ministry } = body;

    // Validation
    if (!fullName || !email || !ministry) {
      return NextResponse.json(
        { error: 'Full name, email, and ministry are required' },
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

    // Create ministry form document in Sanity
    const ministryFormDocument = {
      _type: 'ministryForm',
      ministry: {
        _type: 'reference',
        _ref: ministry,
      },
      fullName,
      email,
      phone: phone || '',
      ageGroup: ageGroup || '',
      message: message || '',
      submittedAt: new Date().toISOString(),
    };

    try {
      await client.create(ministryFormDocument);
      
      return NextResponse.json(
        { success: true, message: 'Form submitted successfully' },
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
