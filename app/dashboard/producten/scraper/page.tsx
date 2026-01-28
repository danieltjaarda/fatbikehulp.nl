'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { Download, Loader2, Check, AlertCircle, ExternalLink, Plus, Trash2 } from 'lucide-react'

interface ScrapedProduct {
  title: string
  price: string
  priceNumber: number
  image: string
  description: string
  vendor: string
  productType: string
  handle: string
  url: string
  variants: {
    title: string
    price: string
    sku: string
    available: boolean
  }[]
}

export default function ScraperPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [products, setProducts] = useState<ScrapedProduct[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set())
  const [importing, setImporting] = useState(false)
  const [importSuccess, setImportSuccess] = useState(false)

  const handleScrape = async () => {
    if (!url) {
      setError('Voer een Shopify collection URL in')
      return
    }

    // Validate URL
    if (!url.includes('shopify') && !url.includes('/collections/')) {
      setError('Dit lijkt geen geldige Shopify collection URL te zijn. De URL moet "/collections/" bevatten.')
      return
    }

    setLoading(true)
    setError('')
    setProducts([])
    setSelectedProducts(new Set())

    try {
      const response = await fetch('/api/scraper/shopify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis bij het scrapen')
      }

      setProducts(data.products)
      // Select all products by default
      setSelectedProducts(new Set(data.products.map((_: ScrapedProduct, i: number) => i)))
    } catch (err: any) {
      setError(err.message || 'Er ging iets mis bij het scrapen')
    } finally {
      setLoading(false)
    }
  }

  const toggleProduct = (index: number) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedProducts(newSelected)
  }

  const selectAll = () => {
    setSelectedProducts(new Set(products.map((_, i) => i)))
  }

  const deselectAll = () => {
    setSelectedProducts(new Set())
  }

  const handleImport = async () => {
    if (selectedProducts.size === 0) {
      setError('Selecteer minimaal één product om te importeren')
      return
    }

    setImporting(true)
    setError('')
    setImportSuccess(false)

    try {
      const selectedProductsArray = Array.from(selectedProducts).map(i => products[i])
      
      const response = await fetch('/api/producten/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: selectedProductsArray }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis bij het importeren')
      }

      setImportSuccess(true)
      setTimeout(() => setImportSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Er ging iets mis bij het importeren')
    } finally {
      setImporting(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Scraper</h1>
          <p className="text-gray-600 mt-2">
            Importeer producten van een Shopify webshop naar jouw productencatalogus
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shopify Collection URL</h2>
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.myshopify.com/collections/all"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
            <button
              onClick={handleScrape}
              disabled={loading}
              className="px-6 py-3 bg-[#ff6b35] text-white rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Scrapen...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Scrape Producten
                </>
              )}
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p><strong>Tip:</strong> Gebruik een collection URL zoals:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>https://shop.example.com/collections/all</li>
              <li>https://shop.example.com/collections/fatbikes</li>
              <li>https://example.myshopify.com/collections/onderdelen</li>
            </ul>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Success message */}
        {importSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            {selectedProducts.size} producten succesvol geïmporteerd!
          </div>
        )}

        {/* Products list */}
        {products.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {products.length} producten gevonden
                </h2>
                <span className="text-sm text-gray-500">
                  ({selectedProducts.size} geselecteerd)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAll}
                  className="text-sm text-[#ff6b35] hover:underline"
                >
                  Alles selecteren
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={deselectAll}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Deselecteren
                </button>
              </div>
            </div>

            {/* Product grid */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
              {products.map((product, index) => (
                <div
                  key={index}
                  onClick={() => toggleProduct(index)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedProducts.has(index)
                      ? 'border-[#ff6b35] bg-orange-50 ring-2 ring-[#ff6b35]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Geen afbeelding</span>
                      </div>
                    )}
                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedProducts.has(index)
                        ? 'bg-[#ff6b35] text-white'
                        : 'bg-white border border-gray-300'
                    }`}>
                      {selectedProducts.has(index) && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                    {product.title}
                  </h3>
                  
                  {product.vendor && (
                    <p className="text-xs text-gray-500 mb-2">{product.vendor}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#ff6b35]">{product.price}</span>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Import button */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleImport}
                disabled={importing || selectedProducts.size === 0}
                className="w-full px-6 py-3 bg-[#ff6b35] text-white rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {importing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Importeren...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    {selectedProducts.size} producten importeren
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Empty state when no products and not loading */}
        {products.length === 0 && !loading && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geen producten geladen</h3>
            <p className="text-gray-600">
              Voer een Shopify collection URL in en klik op "Scrape Producten" om te beginnen
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}




