import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN!,
});

// Simple rate limiter (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests per 5 minutes
const RESET_TIME = 5 * 60 * 1000 // 5 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userData = rateLimitMap.get(ip)

  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RESET_TIME })
    return true
  }

  if (userData.count >= RATE_LIMIT) {
    return false
  }

  userData.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await request.json();
    const { name, email, phone, service, bringingChildren, notes, recaptchaToken } = body;

    if (!name || !email || !phone || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const visitorRegistration = {
      _type: 'visitorRegistration',
      name,
      email,
      phone,
      service,
      bringingChildren,
      notes,
      createdAt: new Date().toISOString(),
    };

    const result = await client.create(visitorRegistration);
    return NextResponse.json({ success: true, id: result._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
