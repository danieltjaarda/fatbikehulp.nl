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
    const { items, customerEmail, shippingAddress } = body

    // Calculate total and check if free shipping applies
    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => 
      sum + (item.price * item.quantity), 0
    )
    
    // Free shipping above €75, otherwise €7.95
    const shippingCost = subtotal >= 75 ? 0 : 7.95

    // Create line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: {
      name: string
      price: number
      quantity: number
      image?: string
    }) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item if applicable
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Verzendkosten',
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal', 'bancontact'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bestelling/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fatbike-onderdelen`,
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ['NL', 'BE', 'DE'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      locale: 'nl',
      metadata: {
        items: JSON.stringify(items.map((item: { id: string; name: string; quantity: number }) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        }))),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het aanmaken van de checkout' },
      { status: 500 }
    )
  }
}


