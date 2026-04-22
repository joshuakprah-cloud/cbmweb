import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper to get image URL with cache-busting based on asset _id
export function urlForCacheBusted(source: any): string {
  const baseUrl = builder.image(source).url()
  if (!baseUrl || !source?.asset?._id) return baseUrl || ''
  
  // Use last 8 characters of asset _id as cache-busting version
  const cacheBuster = source.asset._id.slice(-8)
  return `${baseUrl}?v=${cacheBuster}`
}
