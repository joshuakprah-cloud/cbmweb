import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import Stripe from 'stripe'
import axios from 'axios'
import { randomUUID } from 'crypto'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN!,
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, amount, paymentMethod, givingTypeId } = body

    if (!name || !email || !amount || !paymentMethod || !givingTypeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Create pending transaction
    const transactionRef = randomUUID()
    const transaction = {
      _type: 'givingTransaction',
      donorName: name,
      email,
      amount,
      givingType: { _type: 'reference', _ref: givingTypeId },
      paymentGateway: paymentMethod,
      status: 'Pending',
      transactionRef,
      branch: process.env.BRANCH || 'default',
    }

    const result = await client.create(transaction)

    if (paymentMethod === 'Paystack') {
      const paystackResponse = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100, // in kobo
          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/give/success`,
          reference: transactionRef,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return NextResponse.json({ url: paystackResponse.data.data.authorization_url })
    } else if (paymentMethod === 'Stripe') {
      // Fetch giving type for name
      const givingType = await client.getDocument(givingTypeId)

      if (!givingType) {
        return NextResponse.json({ error: 'Giving type not found' }, { status: 400 })
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'ngn',
              product_data: {
                name: givingType.title,
              },
              unit_amount: amount * 100, // in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/give/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/give`,
        metadata: {
          transactionId: result._id,
        },
      })

      return NextResponse.json({ sessionId: session.id })
    } else {
      return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
