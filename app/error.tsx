'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#323232' }}>
          Er is iets misgegaan!
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'Er is een onverwachte fout opgetreden.'}
        </p>
        <button
          onClick={() => reset()}
          className="bg-brand-medium text-white px-6 py-2 rounded-full font-semibold hover:bg-brand-dark transition-colors"
        >
          Probeer opnieuw
        </button>
      </div>
    </div>
  )
}












