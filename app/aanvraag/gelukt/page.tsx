'use client'

import Link from 'next/link'

export default function GeluktPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Aanvraag ontvangen!
          </h2>
          <p className="text-gray-600 mb-6">
            Bedankt voor je aanvraag. We nemen zo snel mogelijk contact met je op.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/aanvraag"
              className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
            >
              Nieuwe aanvraag
            </Link>
            <Link
              href="/"
              className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
            >
              Terug naar homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}








