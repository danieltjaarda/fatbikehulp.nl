'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Truck, CreditCard, Check, Loader2, Lock, ChevronDown, ChevronUp } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CustomerDetails {
  email: string
  firstName: string
  lastName: string
  phone: string
  street: string
  houseNumber: string
  postalCode: string
  city: string
  country: string
}

function CheckoutForm({ clientSecret, customerDetails, onSuccess }: { 
  clientSecret: string
  customerDetails: CustomerDetails
  onSuccess: () => void 
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    setErrorMessage('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/bestelling/succes`,
        payment_method_data: {
          billing_details: {
            name: `${customerDetails.firstName} ${customerDetails.lastName}`,
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: {
              line1: `${customerDetails.street} ${customerDetails.houseNumber}`,
              postal_code: customerDetails.postalCode,
              city: customerDetails.city,
              country: customerDetails.country,
            },
          },
        },
      },
    })

    if (error) {
      setErrorMessage(error.message || 'Er is een fout opgetreden')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement 
        options={{
          layout: 'tabs',
          paymentMethodOrder: ['ideal', 'card', 'bancontact'],
        }}
      />
      
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Betaling verwerken...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Nu betalen
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" />
        Veilige betaling via Stripe
      </p>
    </form>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, shippingCost, total, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1 = details, 2 = payment
  const [clientSecret, setClientSecret] = useState('')
  const [isCreatingPayment, setIsCreatingPayment] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: 'NL',
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !clientSecret) {
      router.push('/fatbike-onderdelen')
    }
  }, [items, clientSecret, router])

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreatingPayment(true)

    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customerDetails,
          shippingCost,
        }),
      })

      const data = await response.json()

      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
        setStep(2)
      } else {
        alert('Er is een fout opgetreden. Probeer het opnieuw.')
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      alert('Er is een fout opgetreden. Probeer het opnieuw.')
    } finally {
      setIsCreatingPayment(false)
    }
  }

  const handlePaymentSuccess = () => {
    clearCart()
    router.push('/bestelling/succes')
  }

  if (items.length === 0 && !clientSecret) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/fatbike-onderdelen" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Terug</span>
            </Link>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Afrekenen</h1>
            <div className="w-16 sm:w-24"></div>
          </div>
        </div>
      </header>

      {/* Mobile Order Summary Toggle */}
      <div className="lg:hidden bg-white border-b">
        <button 
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-red-500" />
            <span className="font-medium">{showOrderSummary ? 'Verberg' : 'Bekijk'} bestelling ({items.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">€{total.toFixed(2)}</span>
            {showOrderSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>
        
        {/* Collapsible Order Items */}
        {showOrderSummary && (
          <div className="px-4 pb-4 border-t bg-gray-50">
            <div className="space-y-3 py-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity}x €{item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-medium text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotaal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Verzending</span>
                <span>{shippingCost === 0 ? <span className="text-green-600">Gratis</span> : `€${shippingCost.toFixed(2)}`}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 1 ? 'text-red-500' : 'text-gray-400'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : '1'}
              </div>
              <span className="text-sm sm:text-base font-medium">Gegevens</span>
            </div>
            <div className={`w-8 sm:w-12 h-0.5 ${step >= 2 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 2 ? 'text-red-500' : 'text-gray-400'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm sm:text-base font-medium">Betalen</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-3">
            {step === 1 ? (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  Bezorggegevens
                </h2>

                <form onSubmit={handleDetailsSubmit} className="space-y-4 sm:space-y-6">
                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                      placeholder="jouw@email.nl"
                    />
                  </div>

                  {/* Name - Stack on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Voornaam *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.firstName}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, firstName: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Achternaam *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.lastName}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, lastName: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Telefoonnummer *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                      placeholder="06 12345678"
                    />
                  </div>

                  {/* Address */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Straat *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.street}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, street: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Nr. *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.houseNumber}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, houseNumber: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.postalCode}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, postalCode: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                        placeholder="1234 AB"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Plaats *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.city}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                        className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Land *
                    </label>
                    <select
                      value={customerDetails.country}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, country: e.target.value })}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base bg-white"
                    >
                      <option value="NL">Nederland</option>
                      <option value="BE">België</option>
                      <option value="DE">Duitsland</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isCreatingPayment}
                    className="w-full py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCreatingPayment ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Laden...
                      </>
                    ) : (
                      <>
                        Doorgaan naar betalen
                        <CreditCard className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    Betalen
                  </h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Wijzigen
                  </button>
                </div>

                {/* Customer summary */}
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="font-medium text-sm sm:text-base">{customerDetails.firstName} {customerDetails.lastName}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{customerDetails.email}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{customerDetails.street} {customerDetails.houseNumber}, {customerDetails.postalCode} {customerDetails.city}</p>
                </div>

                {clientSecret && (
                  <Elements 
                    stripe={stripePromise} 
                    options={{ 
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#ef4444',
                          borderRadius: '12px',
                          fontFamily: 'system-ui, sans-serif',
                        },
                      },
                      locale: 'nl',
                    }}
                  >
                    <CheckoutForm 
                      clientSecret={clientSecret}
                      customerDetails={customerDetails}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                )}
              </div>
            )}

            {/* Mobile Trust Badges */}
            <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-sm p-4">
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Veilig betalen
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Snelle levering
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  14 dagen retour
                </div>
              </div>
              
              {/* Trustpilot */}
              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t">
                <img src="/trustpilot-logo-green.png" alt="Trustpilot" className="h-5" />
                <img src="/trustpilot-stars.png" alt="5 sterren" className="h-4" />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Je bestelling ({items.length})
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                      <p className="text-sm text-gray-500">Aantal: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotaal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verzendkosten</span>
                  <span>{shippingCost === 0 ? <span className="text-green-600">Gratis</span> : `€${shippingCost.toFixed(2)}`}</span>
                </div>
                {subtotal < 50 && shippingCost > 0 && (
                  <p className="text-xs text-gray-500">
                    Nog €{(50 - subtotal).toFixed(2)} voor gratis verzending
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Totaal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">Inclusief BTW</p>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex flex-wrap gap-3 justify-center">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    Veilig betalen
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    Snelle levering
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    14 dagen retour
                  </div>
                </div>
              </div>

              {/* Trustpilot Reviews Slider */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-center mb-4">
                  <img src="/trustpilot-logo-green.png" alt="Trustpilot" className="h-6" />
                </div>
                
                <div className="overflow-hidden">
                  <div className="flex animate-scroll-reviews">
                    {/* Reviews - duplicated for infinite scroll effect */}
                    {[
                      { name: 'Marco V.', text: 'Snelle levering en top kwaliteit onderdelen!' },
                      { name: 'Lisa B.', text: 'Super service, binnen 2 dagen geleverd.' },
                      { name: 'Peter J.', text: 'Eindelijk een betrouwbare webshop voor fatbike onderdelen.' },
                      { name: 'Sandra K.', text: 'Goede communicatie en snelle verzending.' },
                      { name: 'Dennis M.', text: 'Aanrader! Perfecte pasvorm en kwaliteit.' },
                      { name: 'Marco V.', text: 'Snelle levering en top kwaliteit onderdelen!' },
                      { name: 'Lisa B.', text: 'Super service, binnen 2 dagen geleverd.' },
                      { name: 'Peter J.', text: 'Eindelijk een betrouwbare webshop voor fatbike onderdelen.' },
                    ].map((review, index) => (
                      <div 
                        key={index} 
                        className="flex-shrink-0 w-64 mx-2 p-3 bg-gray-50 rounded-lg"
                      >
                        <img src="/trustpilot-stars.png" alt="5 sterren" className="h-3 mb-1" />
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">"{review.text}"</p>
                        <p className="text-xs font-semibold text-gray-800">{review.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

