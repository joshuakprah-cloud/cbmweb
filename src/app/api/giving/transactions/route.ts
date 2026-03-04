import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN!,
})

export async function GET() {
  try {
    const transactions = await client.fetch(`
      *[_type == "givingTransaction" && status == "Successful"]{
        _id,
        donorName,
        email,
        amount,
        givingType->{title},
        paymentGateway,
        status,
        createdAt
      } | order(createdAt desc)
    `)
    return NextResponse.json(transactions)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}
