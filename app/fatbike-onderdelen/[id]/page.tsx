'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag, Check, X, Phone, ShoppingCart, Plus } from 'lucide-react'
import { Product } from '@/types/database'
import Footer from '@/components/Footer'
import { useCart } from '@/lib/cart-context'

// Generate URL-friendly slug from product name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Complementary product recommendations based on product type
const getComplementaryKeywords = (productName: string): string[] => {
  const name = productName.toLowerCase()
  
  // Trappers → Crankset, Voorvork, Trapsensor
  if (name.includes('trapper')) return ['crankset', 'voorvork', 'trapsensor']
  
  // Crankset → Trappers, Ketting, Trapas
  if (name.includes('crankset')) return ['trapper', 'ketting', 'trapas']
  
  // Controller → Display, Kabelboom, Trapsensor
  if (name.includes('controller')) return ['display', 'kabelboom', 'trapsensor']
  
  // Display → Controller, Kabelboom, Koplamp
  if (name.includes('display')) return ['controller', 'kabelboom', 'koplamp']
  
  // Remmen/Remblokken → Remschijf, Remblokken, Remleidingen
  if (name.includes('rem')) return ['remschijf', 'remblok', 'kabel']
  
  // Banden/Buitenband → Binnenband, Velg
  if (name.includes('buitenband') || name.includes('band')) return ['binnenband', 'velg', 'standaard']
  
  // Binnenband → Buitenband, Velg, Band plak
  if (name.includes('binnenband')) return ['buitenband', 'velg', 'standaard']
  
  // Motor → Controller, Kabelboom, Tandwielen
  if (name.includes('motor')) return ['controller', 'kabelboom', 'tandwiel']
  
  // Accu → Oplader, Accuhouder
  if (name.includes('accu') && !name.includes('accuhouder')) return ['oplader', 'accuhouder', 'kabelboom']
  
  // Oplader → Accu, Kabelboom
  if (name.includes('oplader')) return ['accu', 'kabelboom', 'controller']
  
  // Zadel → Zadelpen, Achterzitje
  if (name.includes('zadel')) return ['achterzitje', 'standaard', 'voetsteunen']
  
  // Koplamp → Achterlicht, Lichtschakelaar, Toebehorenen
  if (name.includes('koplamp') && !name.includes('toebehorenen')) return ['achterlicht', 'lichtschakelaar', 'toebehorenen']
  
  // Koplamp Toebehorenen → Koplamp, Achterlicht
  if (name.includes('toebehorenen')) return ['koplamp', 'achterlicht', 'lichtschakelaar']
  
  // Achterlicht → Koplamp, Lichtschakelaar
  if (name.includes('achterlicht')) return ['koplamp', 'lichtschakelaar', 'reflector']
  
  // Voorvork → Standaard, Spatbord
  if (name.includes('voorvork') || name.includes('vork')) return ['standaard', 'spatbord', 'stuur']
  
  // Ketting → Cassette, Derailleur, Crankset
  if (name.includes('ketting')) return ['cassette', 'derailleur', 'crankset']
  
  // Cassette → Ketting, Derailleur
  if (name.includes('cassette') || name.includes('tandwiel')) return ['ketting', 'derailleur', 'versnelling']
  
  // Standaard → Voorvork, Spatbord
  if (name.includes('standaard')) return ['voorvork', 'spatbord', 'velg']
  
  // Trapsensor → Controller, Trappers, Crankset
  if (name.includes('trapsensor')) return ['controller', 'trapper', 'crankset']
  
  // Stuur → Stuurhouder, Handvaten, Remmen
  if (name.includes('stuur') && !name.includes('stuurhouder')) return ['stuurhouder', 'handvaten', 'rem']
  
  // Handvaten → Stuur, Remhendel
  if (name.includes('handvat')) return ['stuur', 'rem', 'lichtschakelaar']
  
  // Spatbord → Voorvork, Standaard
  if (name.includes('spatbord')) return ['voorvork', 'standaard', 'velg']
  
  // Voetsteunen/Achterzitje → Zadel, Voetsteunen
  if (name.includes('voetsteunen') || name.includes('achterzitje')) return ['zadel', 'achterzitje', 'standaard']
  
  // Default: show popular items
  return ['binnenband', 'remblok', 'ketting']
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [complementaryProducts, setComplementaryProducts] = useState<Product[]>([])
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [addedProductName, setAddedProductName] = useState<string>('')
  const [showAddedNotification, setShowAddedNotification] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const addToCartButtonRef = useRef<HTMLButtonElement>(null)

  // Intersection Observer to detect when main button is out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when button is NOT visible
        setShowStickyBar(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (addToCartButtonRef.current) {
      observer.observe(addToCartButtonRef.current)
    }

    return () => observer.disconnect()
  }, [product])

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/producten')
      const data = await response.json()
      
      // Find the product by slug (generated from name)
      const slug = params.id as string
      const foundProduct = data.find((p: Product) => generateSlug(p.naam) === slug)
      
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedImage(foundProduct.afbeelding_url || '')
        
        // Get related products (same category, excluding current)
        const related = data
          .filter((p: Product) => p.categorie === foundProduct.categorie && p.id !== foundProduct.id && p.actief)
          .slice(0, 4)
        setRelatedProducts(related)
        
        // Get complementary products based on smart recommendations
        const keywords = getComplementaryKeywords(foundProduct.naam)
        const complementary: Product[] = []
        
        // Find products matching keywords (one per keyword to get variety)
        for (const keyword of keywords) {
          if (complementary.length >= 3) break
          
          const match = data.find((p: Product) => 
            p.id !== foundProduct.id && 
            p.actief && 
            p.naam.toLowerCase().includes(keyword) &&
            !complementary.some(c => c.id === p.id)
          )
          
          if (match) {
            complementary.push(match)
          }
        }
        
        setComplementaryProducts(complementary)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  // Generate rating based on product ID (consistent rating per product)
  const getRating = (id: string) => {
    return 4.5 + (parseInt(id.slice(-2), 16) % 6) / 10
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product niet gevonden</h1>
          <p className="text-gray-600 mb-6">Dit product bestaat niet of is niet meer beschikbaar.</p>
          <Link href="/fatbike-onderdelen">
            <button className="px-6 py-3 bg-[#5f98c1] text-white rounded-xl font-semibold hover:bg-[#4a7da3] transition-colors">
              Terug naar onderdelen
            </button>
          </Link>
        </main>
      </div>
    )
  }

  const rating = getRating(product.id)

  return (
    <div className="min-h-screen bg-white">
      {/* Toast notification for added to cart */}
      <div 
        className={`fixed top-4 left-4 z-50 transition-all duration-300 ease-out ${
          showAddedNotification 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0'
        }`}
      >
        <div className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-lg flex items-center gap-2 max-w-xs">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium text-sm">
            Toegevoegd aan winkelwagen
          </span>
        </div>
      </div>

      <main>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug
          </button>
        </div>

        {/* Product Detail */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Product Image - Sticky on desktop */}
            <div className="lg:sticky lg:top-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                {selectedImage || product.afbeelding_url ? (
                  <img
                    src={selectedImage || product.afbeelding_url}
                    alt={product.naam}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>
              
              {/* Gallery Thumbnails */}
              {product.afbeelding_url && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {/* Main image thumbnail */}
                  <button
                    onClick={() => setSelectedImage(product.afbeelding_url || '')}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === product.afbeelding_url 
                        ? 'border-[#5f98c1] ring-2 ring-[#5f98c1]/30' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={product.afbeelding_url}
                      alt={`${product.naam} - Foto 1`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  
                  {/* Gallery images thumbnails */}
                  {product.gallery_images && product.gallery_images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === image 
                          ? 'border-[#5f98c1] ring-2 ring-[#5f98c1]/30' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.naam} - Foto ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.naam}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 24 24">
                      <path 
                        fill={i < Math.floor(rating) || (i === Math.floor(rating) && rating % 1 >= 0.5) ? '#00b67a' : '#dcdce6'} 
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{rating.toFixed(1)} sterren</span>
              </div>

              {/* Price Box */}
              <div className="bg-gray-100 rounded-3xl p-5 mb-6">
                {/* Stock Status */}
                {product.voorraad > 0 ? (
                  <div className="flex items-center gap-2 mb-2" style={{ color: '#008500' }}>
                    <span className="w-2 h-2 rounded-full bg-[#008500]"></span>
                    <span className="font-medium text-sm">Voor 23:59 besteld, morgen in huis</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-2 text-red-500">
                    <X className="w-4 h-4" />
                    <span className="font-medium text-sm">Uitverkocht</span>
                  </div>
                )}

                {/* Price & Button Row */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-gray-500">
                      Adviesprijs: <span className="line-through">€ {Math.round(product.prijs * 1.3).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      € {product.prijs.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {product.voorraad > 0 ? (
                    <button 
                      ref={addToCartButtonRef}
                      onClick={() => {
                        addItem({
                          id: product.id,
                          name: product.naam,
                          price: product.prijs,
                          image: product.afbeelding_url,
                        })
                        setAddedToCart(true)
                        setAddedProductName(product.naam)
                        setShowAddedNotification(true)
                        setTimeout(() => {
                          setAddedToCart(false)
                          setShowAddedNotification(false)
                        }, 2500)
                      }}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                        addedToCart 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="w-5 h-5" />
                          Toegevoegd!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          <span className="font-bold">In winkelwagen</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Uitverkocht
                    </button>
                  )}
                </div>
              </div>

              {/* Trust info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#008500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gratis verzending boven €75</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#008500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Ruilen</strong> binnen 30 dagen</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#008500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Klantbeoordeling <strong>9,2/10</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#008500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Achteraf betalen met <strong>Klarna</strong>? Ook dat kan.</span>
                </div>
              </div>

              {/* Call for Advice Widget */}
              <div className="mt-8 relative overflow-visible">
                <img 
                  src="/whatsapp-man.png" 
                  alt="Klantenservice medewerker" 
                  className="absolute left-4 -top-4 w-20 h-auto object-contain z-10"
                />
                <div className="rounded-3xl p-4 flex items-center gap-4 relative" style={{ backgroundColor: '#0c4fa3' }}>
                  <div className="w-20 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Hulp nodig bij je keuze?</p>
                    <p className="text-white/80 text-xs">Onze experts helpen je graag!</p>
                  </div>
                  <a href="tel:+31850604213">
                    <button className="bg-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2" style={{ color: '#0c4fa3' }}>
                      <Phone className="w-4 h-4" />
                      Bel ons
                    </button>
                  </a>
                </div>
              </div>

              {/* Anderen keken ook naar - Complementary Products */}
              {complementaryProducts.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Anderen keken ook naar</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {complementaryProducts.map((compProduct) => (
                      <div
                        key={compProduct.id}
                        className="bg-gray-50 rounded-2xl p-3 flex flex-col group"
                      >
                        {/* Product Image */}
                        <Link
                          href={`/fatbike-onderdelen/${generateSlug(compProduct.naam)}`}
                          className="aspect-square bg-white rounded-xl overflow-hidden mb-3"
                        >
                          {compProduct.afbeelding_url ? (
                            <img
                              src={compProduct.afbeelding_url}
                              alt={compProduct.naam}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-8 h-8 text-gray-300" />
                            </div>
                          )}
                        </Link>
                        
                        {/* Product Info */}
                        <Link
                          href={`/fatbike-onderdelen/${generateSlug(compProduct.naam)}`}
                          className="flex-1"
                        >
                          <h4 className="font-medium text-gray-900 text-xs leading-tight line-clamp-3 group-hover:text-[#5f98c1] transition-colors mb-2">
                            {compProduct.naam}
                          </h4>
                        </Link>
                        
                        {/* Price and Add Button */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm font-semibold text-gray-900">€ {compProduct.prijs.toFixed(2).replace('.', ',')}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              addItem({
                                id: compProduct.id,
                                name: compProduct.naam,
                                price: compProduct.prijs,
                                image: compProduct.afbeelding_url,
                              })
                              setAddedProductName(compProduct.naam)
                              setShowAddedNotification(true)
                              setTimeout(() => setShowAddedNotification(false), 2500)
                            }}
                            className="w-8 h-8 bg-gray-200 hover:bg-[#5f98c1] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                            title="Toevoegen aan winkelwagen"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              Wat onze klanten zeggen
            </h2>
            
            {/* Overall Rating */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <Image 
                src="/trustpilot-stars.png" 
                alt="Trustpilot 5 sterren" 
                width={150}
                height={30}
                className="h-7 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900">4.9</span>
              <span className="text-gray-500">/ 5</span>
              <span className="text-gray-600">132 reviews</span>
              <Image 
                src="/trustpilot-logo.webp" 
                alt="Trustpilot" 
                width={100}
                height={25}
                className="h-6 w-auto"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Review Breakdown */}
              <div className="bg-white p-6">
                <h3 className="text-xl text-gray-800 mb-6">Reviews 132</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded bg-gray-100 flex-shrink-0"></div>
                    <span className="w-24 text-sm text-gray-600">Uitstekend</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d4f5f] rounded-full" style={{ width: '77%' }}></div>
                    </div>
                    <span className="w-10 text-sm text-gray-500 text-right">77%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded bg-gray-100 flex-shrink-0"></div>
                    <span className="w-24 text-sm text-gray-600">Goed</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d4f5f] rounded-full" style={{ width: '17%' }}></div>
                    </div>
                    <span className="w-10 text-sm text-gray-500 text-right">17%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded bg-gray-100 flex-shrink-0"></div>
                    <span className="w-24 text-sm text-gray-600">Gemiddeld</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d4f5f] rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <span className="w-10 text-sm text-gray-500 text-right">5%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded bg-gray-100 flex-shrink-0"></div>
                    <span className="w-24 text-sm text-gray-600">Slecht</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d4f5f] rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <span className="w-10 text-sm text-gray-500 text-right">0%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded bg-gray-100 flex-shrink-0"></div>
                    <span className="w-24 text-sm text-gray-600">Zeer slecht</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d4f5f] rounded-full" style={{ width: '1%' }}></div>
                    </div>
                    <span className="w-10 text-sm text-gray-500 text-right">1%</span>
                  </div>
                </div>
              </div>

              {/* Right: Individual Reviews */}
              <div className="space-y-6">
                {/* Review 1 */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">Marco de Vries</span>
                    <span className="text-sm text-gray-500">15 januari</span>
                  </div>
                  <Image 
                    src="/trustpilot-stars.png" 
                    alt="5 sterren" 
                    width={100}
                    height={20}
                    className="h-5 w-auto mb-2"
                  />
                  <p className="text-gray-700">
                    Top service! Monteur was binnen 2 dagen bij ons thuis. Remmen vervangen en alles weer perfect. Aanrader!
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Verzameld door Fatbikehulp.nl</p>
                </div>

                {/* Review 2 */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">Lisa Bakker</span>
                    <span className="text-sm text-gray-500">12 januari</span>
                  </div>
                  <Image 
                    src="/trustpilot-stars.png" 
                    alt="5 sterren" 
                    width={100}
                    height={20}
                    className="h-5 w-auto mb-2"
                  />
                  <p className="text-gray-700">
                    Nieuwe banden laten monteren op mijn OUXI V8. Snelle service en vriendelijke monteur. Prijs was ook prima!
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Verzameld door Fatbikehulp.nl</p>
                </div>

                {/* Review 3 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">Peter Jansen</span>
                    <span className="text-sm text-gray-500">8 januari</span>
                  </div>
                  <Image 
                    src="/trustpilot-stars.png" 
                    alt="5 sterren" 
                    width={100}
                    height={20}
                    className="h-5 w-auto mb-2"
                  />
                  <p className="text-gray-700">
                    Goede ervaring met Fatbikehulp. Controller vervangen, werkt weer als nieuw. Alleen jammer dat het iets langer duurde dan verwacht.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Verzameld door Fatbikehulp.nl</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description & Specifications Section */}
        {(product.beschrijving || product.merk || product.model) && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description - Left */}
                {product.beschrijving && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Beschrijving</h2>
                    <p className="text-gray-600 leading-relaxed">{product.beschrijving}</p>
                  </div>
                )}

                {/* Specifications - Right */}
                {(product.merk || product.model || product.specificaties) && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Specificaties</h2>
                    <dl className="space-y-3">
                      {product.merk && (
                        <div className="flex border-b border-gray-100 pb-3">
                          <dt className="w-32 text-gray-500">Merk</dt>
                          <dd>
                            <Link 
                              href={`/fatbike-onderdelen?merk=${encodeURIComponent(product.merk)}`}
                              className="text-[#5f98c1] font-medium hover:underline"
                            >
                              {product.merk} →
                            </Link>
                          </dd>
                        </div>
                      )}
                      {product.model && (
                        <div className="flex border-b border-gray-100 pb-3">
                          <dt className="w-32 text-gray-500">Model</dt>
                          <dd className="text-gray-900 font-medium">{product.model}</dd>
                        </div>
                      )}
                      {product.specificaties && Object.entries(product.specificaties).map(([key, value]) => (
                        <div key={key} className="flex border-b border-gray-100 pb-3 last:border-b-0">
                          <dt className="w-32 text-gray-500">{key}</dt>
                          <dd className="text-gray-900 font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerelateerde producten</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relProduct) => (
                  <Link 
                    key={relProduct.id} 
                    href={`/fatbike-onderdelen/${generateSlug(relProduct.naam)}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      {relProduct.afbeelding_url ? (
                        <img
                          src={relProduct.afbeelding_url}
                          alt={relProduct.naam}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                        {relProduct.naam}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 line-through">€{Math.round(relProduct.prijs * 1.3)}</span>
                        <span className="text-lg font-bold text-[#ea3f1b]">€{relProduct.prijs}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Sticky Bottom Bar - appears when main button is out of view */}
      {product && product.voorraad > 0 && (
        <div 
          className={`fixed bottom-0 left-0 right-0 z-[60] transition-all duration-300 ${
            showStickyBar 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-full opacity-0'
          }`}
        >
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] mx-4 mb-4 px-4 py-3 rounded-2xl">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
              {/* Product Image */}
              <div className="w-14 h-14 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                {product.afbeelding_url ? (
                  <img
                    src={product.afbeelding_url}
                    alt={product.naam}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-1">
                  {product.naam}
                </h4>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    € {product.prijs.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-green-600 font-semibold">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="whitespace-nowrap">Morgen in huis</span>
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.naam,
                    price: product.prijs,
                    image: product.afbeelding_url,
                  })
                  setAddedProductName(product.naam)
                  setShowAddedNotification(true)
                  setTimeout(() => setShowAddedNotification(false), 2500)
                }}
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">In winkelwagen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


