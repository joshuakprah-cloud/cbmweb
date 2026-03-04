import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import crypto from 'crypto'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-paystack-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const expectedSignature = crypto
      .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET!)
      .update(body, 'utf8')
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === 'charge.success') {
      const reference = event.data.reference

      // Fetch the document by transactionRef
      const doc = await client.fetch(`*[_type == 'givingTransaction' && transactionRef == $ref][0]`, { ref: reference })

      if (doc) {
        // Update transaction status
        await client
          .patch(doc._id)
          .set({ status: 'Successful' })
          .commit()

        console.log('Paystack payment successful for reference:', reference)
      } else {
        console.error('Transaction not found for reference:', reference)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Paystack webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
