import { createClient } from 'next-sanity'
import { NextResponse, NextRequest } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN!,
})

// Simple rate limiter (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests per hour
const RESET_TIME = 60 * 60 * 1000 // 1 hour

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
    const body = await request.json()
    const { recaptchaToken, ...data } = body
    const { name, phone, email, service, bringingChildren, notes } = data

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 })
    }

    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`)
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 })
    }

    // Basic validation
    if (!name || !phone || !email || !service) {
      return NextResponse.json({ error: 'Name, phone, email, and service are required' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Create document
    const doc = await client.create({
      _type: 'visitorRegistration',
      name,
      phone,
      email,
      service,
      bringingChildren,
      notes,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, id: doc._id })
  } catch (error) {
    console.error('Error creating visitor registration:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
