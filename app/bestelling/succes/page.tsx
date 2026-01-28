'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import Footer from '@/components/Footer'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // You could fetch order details here using the session_id
    // For now we'll show a generic success message
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bedankt voor je bestelling!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Je bestelling is succesvol geplaatst en we gaan er direct mee aan de slag.
          </p>

          {/* Order Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Bevestigingsmail</h3>
              </div>
              <p className="text-sm text-gray-600">
                Je ontvangt binnen enkele minuten een bevestigingsmail met je ordergegevens.
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-6 h-6 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Verzending</h3>
              </div>
              <p className="text-sm text-gray-600">
                Voor 23:59 besteld? Dan wordt je pakket morgen verzonden met track & trace.
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Wat gebeurt er nu?</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#5f98c1] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
                <span className="text-gray-600">Je ontvangt een bevestigingsmail</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#5f98c1] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                <span className="text-gray-600">We pakken je bestelling zorgvuldig in</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#5f98c1] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
                <span className="text-gray-600">Je pakket wordt verzonden met track & trace</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#5f98c1] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
                <span className="text-gray-600">Morgen al je onderdelen in huis!</span>
              </li>
            </ol>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fatbike-onderdelen">
              <button className="px-6 py-3 bg-[#5f98c1] text-white rounded-xl font-semibold hover:bg-[#4a7da3] transition-colors flex items-center gap-2">
                Verder winkelen
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Naar homepage
              </button>
            </Link>
          </div>

          {/* Contact Info */}
          <p className="text-sm text-gray-500 mt-8">
            Vragen over je bestelling? Neem contact op via{' '}
            <a href="mailto:info@gofatbike.nl" className="text-[#5f98c1] hover:underline">
              info@gofatbike.nl
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}



