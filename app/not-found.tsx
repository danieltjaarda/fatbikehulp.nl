import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold mb-4" style={{ color: '#323232' }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#323232' }}>
          Pagina niet gevonden
        </h2>
        <p className="text-gray-600 mb-8">
          De pagina die u zoekt bestaat helaas niet of is verplaatst.
        </p>
        <Link href="/">
          <button className="bg-brand-medium text-white px-6 py-2 rounded-full font-semibold hover:bg-brand-dark transition-colors">
            Terug naar homepage
          </button>
        </Link>
      </div>
    </div>
  )
}












