import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe lazily to avoid build-time errors
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  
  try {
    const body = await request.json()
    const { items, customerDetails, shippingCost } = body

    // Calculate total
    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => 
      sum + (item.price * item.quantity), 0
    )
    const total = subtotal + (shippingCost || 0)

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe uses cents
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerEmail: customerDetails.email,
        customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
        customerPhone: customerDetails.phone,
        shippingAddress: JSON.stringify({
          street: customerDetails.street,
          houseNumber: customerDetails.houseNumber,
          postalCode: customerDetails.postalCode,
          city: customerDetails.city,
          country: customerDetails.country,
        }),
        items: JSON.stringify(items.map((item: { id: string; name: string; quantity: number; price: number }) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))),
        subtotal: subtotal.toString(),
        shippingCost: (shippingCost || 0).toString(),
        total: total.toString(),
      },
    })

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het aanmaken van de betaling' },
      { status: 500 }
    )
  }
}



