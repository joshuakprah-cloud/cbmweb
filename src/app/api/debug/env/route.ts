import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    hasReadToken: !!process.env.SANITY_API_READ_TOKEN,
    hasAuthToken: !!process.env.SANITY_AUTH_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  }

  return NextResponse.json({
    message: 'Environment variables check',
    environment: envVars,
    timestamp: new Date().toISOString()
  })
}
