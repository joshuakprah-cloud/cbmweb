'use client'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Sanity Studio</h1>
      <p>Cache buster temporarily disabled.</p>
      <p>Please access via <a href="/studio">/studio</a></p>
    </div>
  )
}
