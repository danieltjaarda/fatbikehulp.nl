import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { kv } from '@vercel/kv'

// Initialize Stripe lazily to avoid build-time errors
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Create order object
        const order = {
          id: `ORD-${Date.now()}`,
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent,
          customerEmail: session.customer_details?.email,
          customerName: session.customer_details?.name,
          customerPhone: session.customer_details?.phone,
          shippingAddress: (session as any).shipping_details?.address,
          billingAddress: session.customer_details?.address,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency,
          status: 'betaald',
          items: session.metadata?.items ? JSON.parse(session.metadata.items) : [],
          createdAt: new Date().toISOString(),
        }

        // Save order to Vercel KV
        try {
          const orders = await kv.get<any[]>('orders') || []
          orders.unshift(order)
          await kv.set('orders', orders)
          console.log('Order saved:', order.id)
        } catch (kvError) {
          console.error('Error saving order to KV:', kvError)
          console.log('Order data (KV failed):', JSON.stringify(order))
        }

        // Send confirmation email
        try {
          await sendOrderConfirmationEmail(order)
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError)
        }

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Create order from PaymentIntent metadata
        const metadata = paymentIntent.metadata
        const shippingAddress = metadata.shippingAddress ? JSON.parse(metadata.shippingAddress) : null
        
        const order = {
          id: `ORD-${Date.now()}`,
          stripePaymentIntentId: paymentIntent.id,
          customerEmail: metadata.customerEmail,
          customerName: metadata.customerName,
          customerPhone: metadata.customerPhone,
          shippingAddress: shippingAddress,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'betaald',
          items: metadata.items ? JSON.parse(metadata.items) : [],
          subtotal: parseFloat(metadata.subtotal || '0'),
          shippingCost: parseFloat(metadata.shippingCost || '0'),
          createdAt: new Date().toISOString(),
        }

        // Save order to Vercel KV
        try {
          const orders = await kv.get<any[]>('orders') || []
          orders.unshift(order)
          await kv.set('orders', orders)
          console.log('Order saved:', order.id)
        } catch (kvError) {
          console.error('Error saving order to KV:', kvError)
          console.log('Order data (KV failed):', JSON.stringify(order))
        }

        // Send confirmation email
        try {
          await sendOrderConfirmationEmail(order)
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError)
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}

async function sendOrderConfirmationEmail(order: any) {
  // Send email to customer
  const customerEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: order.customerEmail,
      subject: `Orderbevestiging - ${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #234C6A;">Bedankt voor je bestelling!</h1>
          <p>Hoi ${order.customerName},</p>
          <p>We hebben je bestelling ontvangen en gaan deze zo snel mogelijk verzenden.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Ordergegevens</h3>
            <p><strong>Ordernummer:</strong> ${order.id}</p>
            <p><strong>Totaalbedrag:</strong> €${order.amount.toFixed(2)}</p>
          </div>
          
          <p>Je ontvangt een e-mail met track & trace zodra je pakket onderweg is.</p>
          
          <p>Met vriendelijke groet,<br>Team Fatbikehulp</p>
        </div>
      `,
    }),
  })

  // Send notification to admin
  const adminEmail = process.env.ADMIN_EMAIL || 'info@gofatbike.nl'
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: adminEmail,
      subject: `🛒 Nieuwe bestelling - ${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h1>Nieuwe bestelling ontvangen!</h1>
          <p><strong>Ordernummer:</strong> ${order.id}</p>
          <p><strong>Klant:</strong> ${order.customerName}</p>
          <p><strong>Email:</strong> ${order.customerEmail}</p>
          <p><strong>Telefoon:</strong> ${order.customerPhone || 'Niet opgegeven'}</p>
          <p><strong>Totaal:</strong> €${order.amount.toFixed(2)}</p>
          
          <h3>Verzendadres:</h3>
          <p>
            ${order.shippingAddress?.line1 || ''}<br>
            ${order.shippingAddress?.line2 || ''}<br>
            ${order.shippingAddress?.postal_code || ''} ${order.shippingAddress?.city || ''}<br>
            ${order.shippingAddress?.country || ''}
          </p>
          
          <h3>Bestelde producten:</h3>
          <ul>
            ${order.items.map((item: any) => `<li>${item.name} (${item.quantity}x)</li>`).join('')}
          </ul>
        </div>
      `,
    }),
  })
}


