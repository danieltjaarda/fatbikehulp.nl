'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">
              Er is een kritieke fout opgetreden
            </h2>
            <p className="text-gray-600 mb-6">
              {error.message || 'Er is een onverwachte fout opgetreden in de applicatie.'}
            </p>
            <button
              onClick={() => reset()}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Ververs de pagina
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}












