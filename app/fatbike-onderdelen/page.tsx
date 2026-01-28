'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShoppingBag, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Product } from '@/types/database'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

// Generate URL-friendly slug from product name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

interface Categorie {
  id: string
  naam: string
  slug: string
  actief: boolean
}

const PRIJS_RANGES = [
  { value: '', label: 'Alle prijzen' },
  { value: '0-25', label: '€0 - €25' },
  { value: '25-50', label: '€25 - €50' },
  { value: '50-100', label: '€50 - €100' },
  { value: '100-200', label: '€100 - €200' },
  { value: '200+', label: '€200+' },
]

// Merk display name mapping (shows different name in filter, but filters on actual merk value)
const MERK_DISPLAY_NAMES: { [key: string]: string } = {
  'V20': 'QM Wheels',
}

// Get display name for a merk
const getMerkDisplayName = (merk: string): string => {
  return MERK_DISPLAY_NAMES[merk] || merk
}

export default function FatbikeOnderdelenPage() {
  const searchParams = useSearchParams()
  const [producten, setProducten] = useState<Product[]>([])
  const [categorieen, setCategorieen] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filter states
  const [filterMerk, setFilterMerk] = useState('')
  const [filterModel, setFilterModel] = useState('')
  const [filterPrijs, setFilterPrijs] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Accordion states - standaard ingeklapt
  const [merkOpen, setMerkOpen] = useState(false)
  const [modelOpen, setModelOpen] = useState(false)
  const [prijsOpen, setPrijsOpen] = useState(false)
  
  // Mobile filter
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const PRODUCTS_PER_PAGE = 24 // 8 rows x 3 columns

  // Read merk from URL query params
  useEffect(() => {
    const merkParam = searchParams.get('merk')
    if (merkParam) {
      setFilterMerk(merkParam)
      setMerkOpen(true)
    }
  }, [searchParams])

  useEffect(() => {
    fetchProducten()
    fetchCategorieen()
  }, [])

  const fetchProducten = async () => {
    try {
      const response = await fetch('/api/producten?actief=true')
      const data = await response.json()
      setProducten(data)
    } catch (error) {
      console.error('Error fetching producten:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategorieen = async () => {
    try {
      const response = await fetch('/api/categorieen')
      const data = await response.json()
      setCategorieen(data.filter((c: Categorie) => c.actief))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Get unique merken and modellen from products
  const merken = useMemo(() => {
    const uniqueMerken = Array.from(new Set(producten.map(p => p.merk).filter(Boolean)))
    return uniqueMerken.sort()
  }, [producten])

  const modellen = useMemo(() => {
    let filteredProducts = producten
    if (filterMerk) {
      filteredProducts = producten.filter(p => p.merk === filterMerk)
    }
    const uniqueModellen = Array.from(new Set(filteredProducts.map(p => p.model).filter(Boolean)))
    return uniqueModellen.sort()
  }, [producten, filterMerk])

  // Filter products
  const filteredProducten = useMemo(() => {
    return producten
      .filter(product => {
        // Search query filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          const matchesName = product.naam.toLowerCase().includes(query)
          const matchesMerk = product.merk?.toLowerCase().includes(query)
          const matchesModel = product.model?.toLowerCase().includes(query)
          if (!matchesName && !matchesMerk && !matchesModel) return false
        }
        
        // Merk filter
        if (filterMerk && product.merk !== filterMerk) return false
        
        // Model filter
        if (filterModel && product.model !== filterModel) return false
        
        // Prijs filter
        if (filterPrijs) {
          const prijs = product.prijs
          switch (filterPrijs) {
            case '0-25':
              if (prijs > 25) return false
              break
            case '25-50':
              if (prijs < 25 || prijs > 50) return false
              break
            case '50-100':
              if (prijs < 50 || prijs > 100) return false
              break
            case '100-200':
              if (prijs < 100 || prijs > 200) return false
              break
            case '200+':
              if (prijs < 200) return false
              break
          }
        }
        
        return true
      })
      .sort((a, b) => (a.positie ?? 999) - (b.positie ?? 999))
  }, [producten, filterMerk, filterModel, filterPrijs, searchQuery])

  const getCategorieLabel = (value: string) => {
    return categorieen.find(c => c.slug === value)?.naam || value
  }

  const clearFilters = () => {
    setFilterMerk('')
    setFilterModel('')
    setFilterPrijs('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const hasActiveFilters = filterMerk || filterModel || filterPrijs || searchQuery

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filterMerk, filterModel, filterPrijs, searchQuery])

  // Paginated products
  const totalPages = Math.ceil(filteredProducten.length / PRODUCTS_PER_PAGE)
  const paginatedProducten = filteredProducten.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  // Filter sidebar component
  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? '' : 'sticky top-4'}`}>
      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 text-sm text-[#ff6b35] hover:text-[#e55a2b] mb-4 py-2 border border-[#ff6b35] rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
          Filters wissen
        </button>
      )}

      {/* Merk Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => setMerkOpen(!merkOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          Merk
          {merkOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {merkOpen && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="merk"
                checked={filterMerk === ''}
                onChange={() => { setFilterMerk(''); setFilterModel(''); }}
                className="w-4 h-4 text-[#5d97c1] border-gray-300 focus:ring-[#5d97c1]"
              />
              <span className="text-sm text-gray-700">Alle merken</span>
            </label>
            {merken.map(merk => (
              <label key={merk} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="merk"
                  checked={filterMerk === merk}
                  onChange={() => { setFilterMerk(merk as string); setFilterModel(''); }}
                  className="w-4 h-4 text-[#5d97c1] border-gray-300 focus:ring-[#5d97c1]"
                />
                <span className="text-sm text-gray-700">{getMerkDisplayName(merk as string)}</span>
              </label>
            ))}
            {merken.length === 0 && (
              <p className="text-sm text-gray-500 italic">Geen merken beschikbaar</p>
            )}
          </div>
        )}
      </div>

      {/* Model Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => setModelOpen(!modelOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          Model
          {modelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {modelOpen && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="model"
                checked={filterModel === ''}
                onChange={() => setFilterModel('')}
                className="w-4 h-4 text-[#5d97c1] border-gray-300 focus:ring-[#5d97c1]"
              />
              <span className="text-sm text-gray-700">Alle modellen</span>
            </label>
            {modellen.map(model => (
              <label key={model} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="model"
                  checked={filterModel === model}
                  onChange={() => setFilterModel(model as string)}
                  className="w-4 h-4 text-[#5d97c1] border-gray-300 focus:ring-[#5d97c1]"
                />
                <span className="text-sm text-gray-700">{model}</span>
              </label>
            ))}
            {modellen.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                {filterMerk ? 'Geen modellen voor dit merk' : 'Selecteer eerst een merk'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Prijs Filter */}
      <div className="pb-4">
        <button
          onClick={() => setPrijsOpen(!prijsOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          Prijs
          {prijsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {prijsOpen && (
          <div className="space-y-2">
            {PRIJS_RANGES.map(range => (
              <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="prijs"
                  checked={filterPrijs === range.value}
                  onChange={() => setFilterPrijs(range.value)}
                  className="w-4 h-4 text-[#5d97c1] border-gray-300 focus:ring-[#5d97c1]"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Page Title Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Fatbike Onderdelen
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mb-6">
              Alle onderdelen die je nodig hebt voor jouw fatbike. Professioneel advies en vakkundige montage door heel Nederland.
            </p>
            
            {/* Brand Boxes */}
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              <button
                onClick={() => setFilterMerk(filterMerk === 'OUXI' ? '' : 'OUXI')}
                className={`h-16 px-4 rounded-xl transition-all flex items-center justify-center animate-wiggle ${
                  filterMerk === 'OUXI' 
                    ? 'bg-[#5d97c1] shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
              >
                <img 
                  src="/ouxi-logo.avif" 
                  alt="OUXI" 
                  className={`h-8 object-contain ${filterMerk === 'OUXI' ? 'brightness-0 invert' : ''}`}
                />
              </button>
              <button
                onClick={() => setFilterMerk(filterMerk === 'V20' ? '' : 'V20')}
                className={`h-16 px-4 rounded-xl transition-all flex items-center justify-center animate-wiggle ${
                  filterMerk === 'V20' 
                    ? 'bg-[#5d97c1] shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
              >
                <img 
                  src="/qmwheel-logo.webp" 
                  alt="QM Wheels" 
                  className={`h-8 object-contain ${filterMerk === 'V20' ? 'brightness-0 invert' : ''}`}
                />
              </button>
              <button
                onClick={() => setFilterMerk(filterMerk === 'ENGWE' ? '' : 'ENGWE')}
                className={`h-16 px-4 rounded-xl transition-all flex items-center justify-center animate-wiggle ${
                  filterMerk === 'ENGWE' 
                    ? 'bg-[#5d97c1] shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}
              >
                <img 
                  src="/engwe-logo.png" 
                  alt="ENGWE" 
                  className={`h-8 object-contain ${filterMerk === 'ENGWE' ? 'brightness-0 invert' : ''}`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Products Section with Sidebar */}
        <section id="producten" className="py-8 sm:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {hasActiveFilters && (
                  <span className="bg-[#ff6b35] text-white text-xs px-2 py-0.5 rounded-full">
                    {[filterMerk, filterModel, filterPrijs].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Filter Overlay */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
                <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <FilterSidebar isMobile />
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full mt-6 bg-[#ff6b35] text-white py-3 rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors"
                    >
                      Resultaten bekijken ({filteredProducten.length})
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-8">
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
                  <FilterSidebar />
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Search bar */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Zoek in onderdelen..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f98c1] focus:border-transparent text-gray-900"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#ff6b35] hover:underline lg:hidden whitespace-nowrap"
                    >
                      Filters wissen
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                        <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
                        <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                        <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducten.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Geen producten gevonden</h3>
                    <p className="text-gray-600 mb-6">Probeer andere filteropties</p>
                    <button
                      onClick={clearFilters}
                      className="text-[#ff6b35] font-medium hover:underline"
                    >
                      Filters wissen
                    </button>
                  </div>
                ) : (
                  <>
                    {/* First 12 products (4 rows) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {paginatedProducten.slice(0, 12).map((product) => (
                      <Link 
                        key={product.id}
                        href={`/fatbike-onderdelen/${generateSlug(product.naam)}`}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                      >
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          {product.afbeelding_url ? (
                            <img
                              src={product.afbeelding_url}
                              alt={product.naam}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-16 h-16 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {product.naam}
                          </h3>
                          {/* Trustpilot Rating */}
                          <div className="flex items-center gap-1.5 mb-3">
                            <Image 
                              src="/trustpilot-stars.png" 
                              alt="Trustpilot sterren" 
                              width={80}
                              height={16}
                              className="h-4 w-auto"
                            />
                            <span className="text-xs text-gray-500">
                              {(4.5 + (parseInt(product.id.slice(-2), 16) % 6) / 10).toFixed(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 line-through">€{Math.round(product.prijs * 1.3)}</span>
                            <span className="text-2xl font-bold text-[#ea3f1b]">€{product.prijs}</span>
                          </div>
                          {product.voorraad > 0 ? (
                            <div className="flex items-center gap-1.5 mt-3 text-green-600">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                              </svg>
                              <span className="text-xs font-medium">Voor 23:59 besteld, morgen in huis!</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-3 text-red-500">
                              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span className="text-sm font-medium">Uitverkocht</span>
                            </div>
                          )}
                        </div>
                        </Link>
                      ))}
                    </div>

                    {/* Promo Banner - Between row 4 and 5 */}
                    {paginatedProducten.length > 12 && (
                      <div className="my-6 relative rounded-2xl overflow-hidden shadow-lg">
                        {/* Video Background */}
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                        >
                          <source src="/video-onderdelen.m4v" type="video/mp4" />
                        </video>
                        
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50" />
                        
                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                            Snelste levering NL & BE
                          </h3>
                          <p className="text-white/90 text-base sm:text-lg mb-6 max-w-xl">
                            Bestel voor 23:59 en ontvang je onderdelen morgen al in huis. Gratis verzending vanaf €50.
                          </p>
                          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-2 text-white">
                              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm sm:text-base font-medium">Morgen in huis</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm sm:text-base font-medium">Gratis retour</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Remaining products (row 5+) */}
                    {paginatedProducten.length > 12 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedProducten.slice(12).map((product) => (
                          <Link 
                            key={product.id}
                            href={`/fatbike-onderdelen/${generateSlug(product.naam)}`}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                          >
                            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                              {product.afbeelding_url ? (
                                <img
                                  src={product.afbeelding_url}
                                  alt={product.naam}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                                </div>
                              )}
                            </div>
                            <div className="p-5">
                              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                {product.naam}
                              </h3>
                              {/* Trustpilot Rating */}
                              <div className="flex items-center gap-1.5 mb-3">
                                <Image 
                                  src="/trustpilot-stars.png" 
                                  alt="Trustpilot sterren" 
                                  width={80}
                                  height={16}
                                  className="h-4 w-auto"
                                />
                                <span className="text-xs text-gray-500">
                                  {(4.5 + (parseInt(product.id.slice(-2), 16) % 6) / 10).toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400 line-through">€{Math.round(product.prijs * 1.3)}</span>
                                <span className="text-2xl font-bold text-[#ea3f1b]">€{product.prijs}</span>
                              </div>
                              {product.voorraad > 0 ? (
                                <div className="flex items-center gap-1.5 mt-3 text-green-600">
                                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                  </svg>
                                  <span className="text-xs font-medium">Voor 23:59 besteld, morgen in huis!</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 mt-3 text-red-500">
                                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  <span className="text-sm font-medium">Uitverkocht</span>
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {currentPage > 1 && (
                      <button
                        onClick={() => {
                          setCurrentPage(currentPage - 1)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        ← Vorige
                      </button>
                    )}
                    <span className="text-sm text-gray-500 px-4">
                      {currentPage} / {totalPages}
                    </span>
                    {currentPage < totalPages && (
                      <button
                        onClick={() => {
                          setCurrentPage(currentPage + 1)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Volgende →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Fatbike onderdelen kopen en laten plaatsen
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Bij Fatbikehulp.nl vind je alle <strong>fatbike onderdelen</strong> die je nodig hebt. Van banden en binnenbanden 
                  tot remblokken, verlichting en elektrische componenten. Al onze onderdelen zijn zorgvuldig geselecteerd op kwaliteit 
                  en geschikt voor de meest gangbare fatbike modellen.
                </p>
                <p>
                  Het mooie is: je hoeft niet zelf te sleutelen! Onze ervaren monteurs komen naar je toe en plaatsen het onderdeel 
                  vakkundig. Of je nu in <strong>Amsterdam, Rotterdam, Utrecht</strong> of ergens anders in Nederland woont - wij komen 
                  naar je toe. Zo weet je zeker dat alles correct gemonteerd is en veilig functioneert.
                </p>
                <p>
                  Alle prijzen zijn <strong>inclusief BTW</strong> en we geven advies over welk onderdeel het beste bij jouw fatbike past. 
                  Neem gerust contact met ons op via WhatsApp of vraag direct een reparatie aan via ons online formulier.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

