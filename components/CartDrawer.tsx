'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartDrawer() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal, shippingCost, total, isOpen, setIsOpen } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return
    setIsOpen(false)
    router.push('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Winkelwagen ({itemCount})</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Je winkelwagen is leeg</p>
              <a 
                href="/fatbike-onderdelen"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Bekijk onderdelen
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-[#ea3f1b] font-bold mt-1">€{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotaal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verzendkosten</span>
                <span>{shippingCost === 0 ? <span className="text-green-600">Gratis!</span> : `€${shippingCost.toFixed(2)}`}</span>
              </div>
              {subtotal < 50 && (
                <p className="text-xs text-gray-500">
                  Nog €{(50 - subtotal).toFixed(2)} voor gratis verzending
                </p>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Totaal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              Afrekenen
              <span className="text-sm font-normal">(€{total.toFixed(2)})</span>
            </button>

            {/* Trustpilot Widget */}
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-100 mt-3">
              <img 
                src="/trustpilot-logo.png" 
                alt="Trustpilot" 
                className="h-5 w-auto"
              />
              <div className="flex items-center gap-1">
                <img 
                  src="/trustpilot-stars.png" 
                  alt="5 sterren" 
                  className="h-4 w-auto"
                />
                <span className="text-sm font-semibold text-gray-900">4.9</span>
                <span className="text-xs text-gray-500">/ 132 reviews</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}


