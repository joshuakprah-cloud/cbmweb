'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  // Temporarily return a simple page to avoid schema errors
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Sanity Studio</h1>
      <p>Studio is temporarily disabled during build.</p>
      <p>Please access via <a href="/studio">/studio</a></p>
    </div>
  )
}
