'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { ShoppingCart, Package } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

// Generate URL-friendly slug from product name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

interface Product {
  id: string
  naam: string
  prijs: number
  afbeelding_url?: string
  merk?: string
}

interface SearchResult {
  title: string
  url: string
  description: string
  type: 'page' | 'product'
  image?: string
  price?: number
}

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccessoiresOpen, setIsAccessoiresOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { itemCount, setIsOpen } = useCart()
  
  const isHomepage = pathname === '/'
  const isAanvraagPage = pathname === '/aanvraag' || pathname?.startsWith('/aanvraag/')

  // Fetch products on mount for search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/producten?actief=true')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products for search:', error)
      }
    }
    fetchProducts()
  }, [])

  // All pages for search
  const allPages: SearchResult[] = [
    { title: 'Reparatie', url: '/reparatie', description: 'Fatbike reparatie aan huis', type: 'page' },
    { title: 'Onderhoud', url: '/onderhoud', description: 'Fatbike onderhoudspakketten', type: 'page' },
    { title: 'Onderdelen', url: '/fatbike-onderdelen', description: 'Fatbike onderdelen kopen', type: 'page' },
    { title: 'Tarieven', url: '/tarieven', description: 'Bekijk onze transparante prijzen', type: 'page' },
    { title: 'Aanvragen', url: '/aanvraag', description: 'Reparatie of onderhoud aanvragen', type: 'page' },
    { title: 'Loqater GPS', url: '/loqater', description: 'GPS tracker voor uw fatbike', type: 'page' },
    { title: 'Kinderzitjes', url: '/kinderzitjes', description: 'Kinderzitjes plaatsen', type: 'page' },
    { title: 'Foutcodes', url: '/foutcodes', description: 'Fatbike foutcodes uitleg', type: 'page' },
    { title: 'Locatie Joure', url: '/locatie/joure', description: 'Kom langs in Joure', type: 'page' },
    { title: 'Amsterdam', url: '/reparatie/amsterdam', description: 'Reparatie in Amsterdam', type: 'page' },
    { title: 'Den Haag', url: '/reparatie/den-haag', description: 'Reparatie in Den Haag', type: 'page' },
    { title: 'Utrecht', url: '/reparatie/utrecht', description: 'Reparatie in Utrecht', type: 'page' },
    { title: 'Arnhem', url: '/reparatie/arnhem', description: 'Reparatie in Arnhem', type: 'page' },
    { title: "'s-Hertogenbosch", url: '/reparatie/s-hertogenbosch', description: 'Reparatie in Den Bosch', type: 'page' },
    { title: 'Maastricht', url: '/reparatie/maastricht', description: 'Reparatie in Maastricht', type: 'page' },
    { title: 'Zwolle', url: '/reparatie/zwolle', description: 'Reparatie in Zwolle', type: 'page' },
    { title: 'Assen', url: '/reparatie/assen', description: 'Reparatie in Assen', type: 'page' },
    { title: 'Leeuwarden', url: '/reparatie/leeuwarden', description: 'Reparatie in Leeuwarden', type: 'page' },
    { title: 'Groningen', url: '/reparatie/groningen', description: 'Reparatie in Groningen', type: 'page' },
    { title: 'Middelburg', url: '/reparatie/middelburg', description: 'Reparatie in Middelburg', type: 'page' },
    { title: 'Lelystad', url: '/reparatie/lelystad', description: 'Reparatie in Lelystad', type: 'page' },
    { title: 'Blogs', url: '/blogs', description: 'Tips en nieuws', type: 'page' },
  ]

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (query.trim().length > 1) {
      setIsSearching(true)
      
      // Search pages
      const filteredPages = allPages.filter(page => 
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3) // Limit to 3 pages
      
      // Search products
      const filteredProducts: SearchResult[] = products
        .filter(product => 
          product.naam.toLowerCase().includes(query.toLowerCase()) ||
          (product.merk && product.merk.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 6) // Limit to 6 products
        .map(product => ({
          title: product.naam,
          url: `/fatbike-onderdelen/${generateSlug(product.naam)}`,
          description: product.merk ? `${product.merk} - €${product.prijs}` : `€${product.prijs}`,
          type: 'product' as const,
          image: product.afbeelding_url,
          price: product.prijs
        }))
      
      // Combine results: products first, then pages
      setSearchResults([...filteredProducts, ...filteredPages])
      setShowSearchResults(true)
      setIsSearching(false)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [products])

  return (
    <header>
      {/* Top Section - White Background */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Left aligned on all screens */}
            <Link href="/" className="flex items-center">
              <img 
                src="/producten/fatbikhulp-logo-5.png" 
                alt="Fatbikehulp.nl logo - Professionele fatbike reparatie en onderhoud service" 
                className="h-8 sm:h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Zoek producten, onderdelen..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-brand-medium text-gray-900"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[480px] overflow-y-auto">
                  {/* Products Section */}
                  {searchResults.filter(r => r.type === 'product').length > 0 && (
                    <>
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Producten</span>
                      </div>
                      {searchResults.filter(r => r.type === 'product').map((result, index) => (
                        <Link 
                          key={`product-${index}`} 
                          href={result.url}
                          onClick={() => setShowSearchResults(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          {result.image ? (
                            <img 
                              src={result.image} 
                              alt={result.title}
                              className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate">{result.title}</div>
                            <div className="text-sm text-[#5f98c1] font-bold">€{result.price}</div>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                  
                  {/* Pages Section */}
                  {searchResults.filter(r => r.type === 'page').length > 0 && (
                    <>
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pagina's</span>
                      </div>
                      {searchResults.filter(r => r.type === 'page').map((result, index) => (
                        <Link 
                          key={`page-${index}`} 
                          href={result.url}
                          onClick={() => setShowSearchResults(false)}
                          className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="font-semibold text-gray-900">{result.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{result.description}</div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
              
              {/* No results message */}
              {showSearchResults && searchQuery.length > 1 && searchResults.length === 0 && !isSearching && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 px-4 py-4">
                  <p className="text-gray-600 text-sm">Geen resultaten gevonden voor "{searchQuery}"</p>
                  <Link 
                    href="/fatbike-onderdelen" 
                    className="text-[#5f98c1] text-sm font-medium hover:underline mt-2 inline-block"
                    onClick={() => setShowSearchResults(false)}
                  >
                    Bekijk alle onderdelen →
                  </Link>
                </div>
              )}
            </div>

            {/* Right side: Cart + Aanvragen Button + Hamburger */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <button 
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Winkelwagen"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ea3f1b] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Aanvragen Button - Hidden on homepage and aanvraag page */}
              {!isHomepage && !isAanvraagPage && (
                <Link href="/aanvraag">
                  <button className="text-black px-4 sm:px-6 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base" style={{ backgroundColor: '#ffc702' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6b302'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffc702'}>
                    Aanvragen
                  </button>
                </Link>
              )}

              {/* Hamburger Menu Button - Mobile Only */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop Only */}
      <div className="hidden lg:block relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="rounded-2xl px-6" style={{ backgroundColor: '#212121' }}>
            <div className="flex items-center justify-between">
              <Link href="/onderhoud">
                <button className="text-white px-3 py-3 font-bold hover:bg-white/10 transition-colors whitespace-nowrap rounded-lg">
                  Onderhoud
                </button>
              </Link>
              <Link href="/reparatie">
                <button className="text-white px-3 py-3 font-bold hover:bg-white/10 transition-colors whitespace-nowrap rounded-lg">
                  Reparatie
                </button>
              </Link>
              <Link href="/fatbike-onderdelen">
                <button className="text-white px-3 py-3 font-bold hover:bg-white/10 transition-colors whitespace-nowrap rounded-lg">
                  Onderdelen
                </button>
              </Link>
              <div className="relative group">
                <button className="text-white px-3 py-3 font-bold hover:bg-white/10 transition-colors whitespace-nowrap flex items-center rounded-lg">
                  Accessoires
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] border border-gray-200 pointer-events-auto">
                  <div className="py-2">
                    <Link href="/loqater" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Loqater
                    </Link>
                    <Link href="/kinderzitjes" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Kinderzitjes
                    </Link>
                  </div>
                </div>
              </div>
              <a href="#faq">
                <button className="text-white px-3 py-3 font-bold hover:bg-white/10 transition-colors whitespace-nowrap rounded-lg">
                  FAQ
                </button>
              </a>
              <Link href="/locatie/joure">
                <button className="text-white px-3 py-3 font-bold hover:bg-white/10 transition-colors whitespace-nowrap rounded-lg">
                  Locatie & Contact
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <img 
                src="/producten/fatbikhulp-logo-5.png" 
                alt="Fatbikehulp.nl logo" 
                className="h-8 w-auto"
              />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                aria-label="Sluit menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4">
              <div className="space-y-2">
                <Link href="/onderhoud" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                    Onderhoud
                  </button>
                </Link>
                <Link href="/reparatie" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                    Reparatie
                  </button>
                </Link>
                <Link href="/fatbike-onderdelen" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                    Onderdelen
                  </button>
                </Link>
                
                {/* Accessoires Section */}
                <div className="space-y-1">
                  <button 
                    onClick={() => setIsAccessoiresOpen(!isAccessoiresOpen)}
                    className="w-full text-left px-4 py-3 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>Accessoires</span>
                    <svg 
                      className={`w-5 h-5 text-gray-600 transition-transform ${isAccessoiresOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isAccessoiresOpen && (
                    <div className="space-y-1">
                      <Link href="/loqater" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full text-left px-4 py-3 pl-8 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          Loqater
                        </button>
                      </Link>
                      <Link href="/kinderzitjes" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full text-left px-4 py-3 pl-8 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          Kinderzitjes
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                    FAQ
                  </button>
                </a>
                <Link href="/locatie/joure" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                    Locatie & Contact
                  </button>
                </Link>

                {/* Search on Mobile */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Zoek producten, onderdelen..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-brand-medium text-gray-900"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Mobile Search Results */}
                  {searchResults.length > 0 && searchQuery.length > 1 && (
                    <div className="mt-2 bg-gray-50 rounded-lg max-h-80 overflow-y-auto">
                      {/* Products */}
                      {searchResults.filter(r => r.type === 'product').length > 0 && (
                        <>
                          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Producten</span>
                          </div>
                          {searchResults.filter(r => r.type === 'product').map((result, index) => (
                            <Link 
                              key={`mobile-product-${index}`} 
                              href={result.url}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-white border-b border-gray-200 last:border-b-0 transition-colors"
                            >
                              {result.image ? (
                                <img 
                                  src={result.image} 
                                  alt={result.title}
                                  className="w-10 h-10 object-cover rounded-lg bg-white"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                  <Package className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 text-sm truncate">{result.title}</div>
                                <div className="text-sm text-[#5f98c1] font-bold">€{result.price}</div>
                              </div>
                            </Link>
                          ))}
                        </>
                      )}
                      
                      {/* Pages */}
                      {searchResults.filter(r => r.type === 'page').length > 0 && (
                        <>
                          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Pagina's</span>
                          </div>
                          {searchResults.filter(r => r.type === 'page').map((result, index) => (
                            <Link 
                              key={`mobile-page-${index}`} 
                              href={result.url}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-3 hover:bg-white border-b border-gray-200 last:border-b-0 transition-colors"
                            >
                              <div className="font-semibold text-gray-900 text-sm">{result.title}</div>
                              <div className="text-xs text-gray-600 mt-1">{result.description}</div>
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* Mobile No results */}
                  {searchQuery.length > 1 && searchResults.length === 0 && (
                    <div className="mt-2 px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-sm">Geen resultaten gevonden</p>
                      <Link 
                        href="/fatbike-onderdelen" 
                        className="text-[#5f98c1] text-sm font-medium hover:underline mt-1 inline-block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Bekijk alle onderdelen →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Bel en Aanvragen Buttons */}
                <div className="pt-4 border-t border-gray-200 mt-4 px-4">
                  <div className="flex flex-col items-center gap-3">
                    <a
                      href="tel:31850604213"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Bellen
                    </a>
                    {!isHomepage && !isAanvraagPage && (
                      <Link href="/aanvraag" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="text-black px-6 py-3 rounded-full font-semibold transition-colors" style={{ backgroundColor: '#ffc702' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6b302'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffc702'}>
                          Aanvragen
                        </button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Trustpilot Widget */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="flex flex-col items-center gap-2 px-4">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/trustpilot-stars.png" 
                        alt="Trustpilot 5 sterren" 
                        width={120}
                        height={20}
                        className="h-4 w-auto"
                      />
                      <span className="text-sm text-gray-600">4.9 / 132 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Feature/Trust Bar */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="px-6 py-1">
            {/* Mobile: Show only one centered */}
            <div className="md:hidden flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 text-brand-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-black text-sm">Binnen 3 dagen op uw stoep</span>
            </div>
            
            {/* Desktop: Show all three spread across full width */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-brand-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-black text-sm">Fatbike reparatie aan huis</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-brand-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-black text-sm">Binnen 3 dagen op uw stoep</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-brand-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-black text-sm">Service door heel Nederland</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
