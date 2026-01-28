'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AanvraagPage() {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const formConversionFired = useRef(false)
  
  const [formData, setFormData] = useState({
    // Klant gegevens
    naam: '',
    email: '',
    telefoon: '',
    
    // Aanvraag type
    aanvraagType: '', // 'reparatie', 'onderhoud', 'beide', 'offerte', 'bel_afspraak'
    
    // Fiets informatie
    fietsMerk: '',
    fietsModel: '',
    fietsJaar: '',
    
    // Probleem/onderhoud
    probleem: '',
    beschrijving: '',
    foto: null as File | null,
    
    // Locatie
    locatieType: '', // 'op_locatie', 'in_winkel'
    adres: '',
    postcode: '',
    plaats: '',
    
    // Onderhoudsbeurt specifiek
    onderhoudsbeurtType: '', // 'klein', 'groot', 'winter', 'zomer'
    onderhoudsbeurtPakket: '', // 'basic', 'premium', 'deluxe'
    
    // Extra informatie
    voorkeurDatum: '',
    voorkeurTijd: '',
    opmerkingen: '',
    herkomstPlatform: '' as 'google' | 'gofatbike.nl' | 'instagram' | 'tiktok' | 'facebook' | 'mond_op_mond' | '',
    marketingNieuws: false,
    akkoordPrivacy: false,
    akkoordVoorwaarden: false
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [showPlatformModal, setShowPlatformModal] = useState(false)

  // Load Google Tag Manager script

  // Show welcome modal on page load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('fatbikehulp-welcome-seen')
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true)
    }
  }, [])

  // Auto-scroll reviews
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    let animationId: number
    let maxScroll = 0

    // Calculate max scroll only once
    const updateMaxScroll = () => {
      maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
    }

    // Initial calculation
    updateMaxScroll()

    const scroll = () => {
      scrollPosition += 0.2 // Adjust speed here (lower = slower)
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0
      }
      
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    // Recalculate on resize
    const handleResize = () => {
      updateMaxScroll()
    }
    window.addEventListener('resize', handleResize)

    // Start scrolling after a short delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(scroll)
    }, 2000)

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false)
    localStorage.setItem('fatbikehulp-welcome-seen', 'true')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      foto: file
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Valideer eerst het formulier
    if (!formData.naam || !formData.email || !formData.telefoon || !formData.aanvraagType) {
      setError('Vul alle verplichte velden in')
      return
    }
    
    // Toon platform keuze menu in plaats van direct te verzenden
    setShowPlatformModal(true)
  }

  const submitWithPlatform = async (platform: 'google' | 'gofatbike.nl' | 'instagram' | 'tiktok' | 'facebook' | 'mond_op_mond') => {
    setSubmitting(true)
    setError(null)
    setShowPlatformModal(false)

    try {
      // Bereid data voor voor lokale API
      const reparatieData = {
        klant_naam: formData.naam,
        klant_email: formData.email,
        klant_telefoon: formData.telefoon,
        aanvraag_type: formData.aanvraagType as 'reparatie' | 'onderhoud' | 'beide' | 'offerte' | 'bel_afspraak',
        fiets_merk: formData.fietsMerk,
        fiets_model: formData.fietsModel,
        fiets_jaar: formData.fietsJaar,
        probleem: formData.probleem,
        beschrijving: formData.beschrijving,
        onderhoudsbeurt_type: formData.onderhoudsbeurtType as 'klein' | 'groot' | 'winter' | 'zomer' | undefined,
        onderhoudsbeurt_pakket: formData.onderhoudsbeurtPakket as 'basic' | 'premium' | 'deluxe' | undefined,
        locatie_type: formData.locatieType as 'op_locatie' | 'in_winkel',
        adres: formData.adres,
        postcode: formData.postcode,
        plaats: formData.plaats,
        voorkeur_datum: formData.voorkeurDatum,
        voorkeur_tijd: formData.voorkeurTijd,
        opmerkingen: formData.opmerkingen,
        herkomst_platform: platform,
        marketing_nieuws: formData.marketingNieuws
      }

      // Stuur data naar lokale API
      const response = await fetch('/api/reparaties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reparatieData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      
      if (result.success) {
        // Send confirmation email to customer
        try {
          const emailResponse = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerEmail: formData.email,
              customerName: formData.naam,
              reparatieData: {
                serviceType: formData.aanvraagType,
                bikeBrand: formData.fietsMerk,
                bikeModel: formData.fietsModel,
                location: formData.locatieType,
                preferredDate: formData.voorkeurDatum,
                preferredTime: formData.voorkeurTijd,
                notes: formData.opmerkingen
              }
            }),
          })

          if (!emailResponse.ok) {
            console.warn('Failed to send confirmation email, but form was submitted successfully')
          }
        } catch (emailError) {
          console.warn('Email sending failed:', emailError)
          // Don't fail the form submission if email fails
        }

        // Google Ads conversion tracking voor aanvraag formulier (1x)
        if (!formConversionFired.current && typeof window !== 'undefined' && typeof window.gtag === 'function') {
          formConversionFired.current = true;
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17774855917/o2lYCNml7s8bEO2N25tC',
            'value': 30.0,
            'currency': 'EUR'
          });
        }

        // Redirect naar success pagina
        router.push('/aanvraag/gelukt')
      } else {
        throw new Error('Failed to save data')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Er is een fout opgetreden. Probeer het opnieuw.')
      setSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          {/* Trustpilot Reviews Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-4 space-x-2">
              <span className="font-semibold text-gray-900">4.8/5</span>
              <span className="text-gray-500">op</span>
              <div className="flex items-center space-x-1">
                <img 
                  src="/trustpilot-single-star.png" 
                  alt="Trustpilot ster - 4.8/5 beoordeling op Trustpilot" 
                  className="h-5 sm:h-6 w-auto"
                />
                <span className="font-bold text-gray-900">Trustpilot</span>
              </div>
            </div>
            
            {/* Scrollable Reviews Container */}
            <div className="relative">
              {/* Scroll hint gradient - left */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
              
              {/* Scroll hint gradient - right */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
              
              <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 px-4 pb-4">
                  {/* Review 1 */}
                  <div className="flex-none w-72 bg-white rounded-lg shadow-md p-3">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/trustpilot-stars.png" 
                        alt="5 sterren Trustpilot beoordeling" 
                        className="h-4 w-auto"
                      />
                      <span className="ml-2 text-xs text-gray-500">2 dagen geleden</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1 text-center">Snel ter plekke!</h4>
                    <p className="text-sm text-gray-600 mb-1 text-center">
                      Kwam langs voor reparatie. Binnen uur gefixt!
                    </p>
                    <p className="text-xs text-gray-500 text-center">- Mark de Vries, Amsterdam</p>
                  </div>
                  
                  {/* Review 2 */}
                  <div className="flex-none w-72 bg-white rounded-lg shadow-md p-3">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/trustpilot-stars.png" 
                        alt="5 sterren Trustpilot beoordeling" 
                        className="h-4 w-auto"
                      />
                      <span className="ml-2 text-xs text-gray-500">1 week geleden</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1 text-center">Jaarlijks onderhoud thuis</h4>
                    <p className="text-sm text-gray-600 mb-1 text-center">
                      Complete beurt aan huis. Zeer professioneel!
                    </p>
                    <p className="text-xs text-gray-500 text-center">- Linda Bakker, Utrecht</p>
                  </div>
                  
                  {/* Review 3 */}
                  <div className="flex-none w-72 bg-white rounded-lg shadow-md p-3">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/trustpilot-stars.png" 
                        alt="5 sterren Trustpilot beoordeling" 
                        className="h-4 w-auto"
                      />
                      <span className="ml-2 text-xs text-gray-500">2 weken geleden</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1 text-center">Onderhoudsbeurt op locatie</h4>
                    <p className="text-sm text-gray-600 mb-1 text-center">
                      Op kantoor langsgekomen. Super handig!
                    </p>
                    <p className="text-xs text-gray-500 text-center">- Johan Smit, Den Haag</p>
                  </div>
                  
                  {/* Review 4 */}
                  <div className="flex-none w-72 bg-white rounded-lg shadow-md p-3">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/trustpilot-stars.png" 
                        alt="5 sterren Trustpilot beoordeling" 
                        className="h-4 w-auto"
                      />
                      <span className="ml-2 text-xs text-gray-500">3 weken geleden</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1 text-center">Fatbike specialist!</h4>
                    <p className="text-sm text-gray-600 mb-1 text-center">
                      Kennen fatbikes door en door. Top service!
                    </p>
                    <p className="text-xs text-gray-500 text-center">- Sandra Jansen, Rotterdam</p>
                  </div>
                  
                  {/* Review 5 */}
                  <div className="flex-none w-72 bg-white rounded-lg shadow-md p-3">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/trustpilot-stars.png" 
                        alt="5 sterren Trustpilot beoordeling" 
                        className="h-4 w-auto"
                      />
                      <span className="ml-2 text-xs text-gray-500">1 maand geleden</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1 text-center">Binnen 24 uur geholpen</h4>
                    <p className="text-sm text-gray-600 mb-1 text-center">
                      Volgende dag al langs voor onderhoud!
                    </p>
                    <p className="text-xs text-gray-500 text-center">- Peter van Dijk, Eindhoven</p>
                  </div>
                  
                  {/* Review 6 */}
                  <div className="flex-none w-72 bg-white rounded-lg shadow-md p-3">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/trustpilot-stars.png" 
                        alt="5 sterren Trustpilot beoordeling" 
                        className="h-4 w-auto"
                      />
                      <span className="ml-2 text-xs text-gray-500">1 maand geleden</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1 text-center">Winterbeurt aan huis</h4>
                    <p className="text-sm text-gray-600 mb-1 text-center">
                      Fiets winterklaar gemaakt. Heel fijn!
                    </p>
                    <p className="text-xs text-gray-500 text-center">- Monique Visser, Groningen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-4 px-4">
            Fatbike Reparatie of Onderhoud Aanvragen
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Vul het formulier in en we nemen zo snel mogelijk contact met je op voor een afspraak.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Klant gegevens */}
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Jouw gegevens
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="naam" className="block text-sm font-medium text-gray-700 mb-1">
                  Volledige naam *
                </label>
                <input
                  type="text"
                  id="naam"
                  name="naam"
                  required
                  value={formData.naam}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                  placeholder="Jan de Vries"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mailadres *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                  placeholder="jan@voorbeeld.nl"
                />
              </div>
              <div>
                <label htmlFor="telefoon" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefoonnummer *
                </label>
                <input
                  type="tel"
                  id="telefoon"
                  name="telefoon"
                  required
                  value={formData.telefoon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                  placeholder="06-12345678"
                />
              </div>
            </div>
          </div>

          {/* Aanvraag type */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Wat heb je nodig?
            </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <label className={`relative cursor-pointer rounded-lg p-3 sm:p-4 border-2 transition-all ${
                formData.aanvraagType === 'reparatie' 
                  ? 'border-[#456882] bg-[#e8f0f5]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="aanvraagType"
                  value="reparatie"
                  checked={formData.aanvraagType === 'reparatie'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="font-medium text-gray-900">Reparatie</div>
                  <div className="text-sm text-gray-500">Fiets heeft een probleem</div>
                </div>
              </label>

              <label className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                formData.aanvraagType === 'onderhoud' 
                  ? 'border-[#456882] bg-[#e8f0f5]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="aanvraagType"
                  value="onderhoud"
                  checked={formData.aanvraagType === 'onderhoud'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="font-medium text-gray-900">Onderhoudsbeurt</div>
                  <div className="text-sm text-gray-500">Preventief onderhoud</div>
                </div>
              </label>

              <label className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                formData.aanvraagType === 'beide' 
                  ? 'border-[#456882] bg-[#e8f0f5]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="aanvraagType"
                  value="beide"
                  checked={formData.aanvraagType === 'beide'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div className="font-medium text-gray-900">Beide</div>
                  <div className="text-sm text-gray-500">Reparatie + onderhoud</div>
                </div>
              </label>

              <label className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                formData.aanvraagType === 'offerte' 
                  ? 'border-[#456882] bg-[#e8f0f5]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="aanvraagType"
                  value="offerte"
                  checked={formData.aanvraagType === 'offerte'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="font-medium text-gray-900">Offerte aanvragen</div>
                  <div className="text-sm text-gray-500">Vrijblijvend</div>
                </div>
              </label>

              <label className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                formData.aanvraagType === 'bel_afspraak' 
                  ? 'border-[#456882] bg-[#e8f0f5]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="aanvraagType"
                  value="bel_afspraak"
                  checked={formData.aanvraagType === 'bel_afspraak'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="font-medium text-gray-900">Bel afspraak</div>
                  <div className="text-sm text-gray-500">Wij bellen je terug</div>
                </div>
              </label>
            </div>
          </div>

          {/* Onderhoudsbeurt pakketten (alleen bij onderhoud) */}
          {formData.aanvraagType === 'onderhoud' || formData.aanvraagType === 'beide' ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Kies je onderhoudsbeurt pakket
              </h2>
              <p className="text-gray-600 mb-6">Door heel Nederland 🇳🇱</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* BASIC Pakket */}
                <label className={`relative cursor-pointer rounded-lg p-6 border-2 transition-all ${
                  formData.onderhoudsbeurtPakket === 'basic' 
                    ? 'border-[#456882] bg-[#e8f0f5]' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="onderhoudsbeurtPakket"
                    value="basic"
                    checked={formData.onderhoudsbeurtPakket === 'basic'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">BASIC</h3>
                    <div className="mb-4">
                      <span className="text-lg text-gray-500 line-through">€169</span>
                      <span className="text-2xl font-bold text-red-600 ml-2">€129</span>
                    </div>
                    <div className="space-y-2 text-sm text-left">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Ketting smeren en remmen afstellen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        De Fatbike helemaal nalopen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Alle moeren, bouten, trapas, wielas strak draaien
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        In de werkplaats binnen 45 minuten onderhouden
                      </div>
                    </div>
                  </div>
                </label>

                {/* PREMIUM Pakket */}
                <label className={`relative cursor-pointer rounded-lg p-6 border-2 transition-all bg-teal-50 ${
                  formData.onderhoudsbeurtPakket === 'premium' 
                    ? 'border-[#456882] bg-[#e8f0f5]' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="onderhoudsbeurtPakket"
                    value="premium"
                    checked={formData.onderhoudsbeurtPakket === 'premium'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">PREMIUM</h3>
                    <div className="mb-4">
                      <span className="text-lg text-gray-500 line-through">€289</span>
                      <span className="text-2xl font-bold text-red-600 ml-2">€159</span>
                    </div>
                    <div className="space-y-2 text-sm text-left">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Remblokken verwisselen (voor & achter)
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        De Fatbike helemaal nalopen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Alle moeren, bouten, trapas, wielas strak draaien
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        In de werkplaats binnen 45 minuten onderhouden
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Versnellingen afstellen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Accu check
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verlichting controleren
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Banden oppompen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Kettingsmeren en remmen afstellen
                      </div>
                    </div>
                  </div>
                </label>

                {/* DELUXE Pakket */}
                <label className={`relative cursor-pointer rounded-lg p-6 border-2 transition-all ${
                  formData.onderhoudsbeurtPakket === 'deluxe' 
                    ? 'border-[#456882] bg-[#e8f0f5]' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="onderhoudsbeurtPakket"
                    value="deluxe"
                    checked={formData.onderhoudsbeurtPakket === 'deluxe'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">DELUXE</h3>
                    <div className="mb-4">
                      <span className="text-lg text-gray-500 line-through">€309</span>
                      <span className="text-2xl font-bold text-red-600 ml-2">€229</span>
                    </div>
                    <div className="space-y-2 text-sm text-left">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Remblokken verwisselen (voor & achter)
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        De Fatbike helemaal nalopen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Alle moeren, bouten, trapas, wielas strak draaien
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Direct op locatie binnen 45 minuten onderhouden
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Versnellingen afstellen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Alle bouten, moeren, trapas, wielas en de ketting insmeren
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verlichting controleren
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Banden oppompen
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Banden wissel voor & achter
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Reinigen Fatbike (Nieuwstaat maken)
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Kettingsmeren en remmen afstellen
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              
            </div>
          ) : null}

          {/* Fiets informatie */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fiets informatie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fietsMerk" className="block text-sm font-medium text-gray-700 mb-1">
                  Merk *
                </label>
                <input
                  type="text"
                  id="fietsMerk"
                  name="fietsMerk"
                  required
                  value={formData.fietsMerk}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                  placeholder="Gazelle, Batavus, etc."
                />
              </div>
              <div>
                <label htmlFor="fietsModel" className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  id="fietsModel"
                  name="fietsModel"
                  value={formData.fietsModel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                  placeholder="Orange C7, E-go, etc."
                />
              </div>
              <div>
                <label htmlFor="fietsJaar" className="block text-sm font-medium text-gray-700 mb-1">
                  Bouwjaar
                </label>
                <input
                  type="number"
                  id="fietsJaar"
                  name="fietsJaar"
                  value={formData.fietsJaar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                  placeholder="2020"
                  min="1900"
                  max="2025"
                />
              </div>
            </div>
          </div>

          {/* Probleem beschrijving (alleen bij reparatie) */}
          {formData.aanvraagType === 'reparatie' || formData.aanvraagType === 'beide' ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Probleem beschrijving
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="probleem" className="block text-sm font-medium text-gray-700 mb-1">
                    Korte omschrijving van het probleem *
                  </label>
                  <input
                    type="text"
                    id="probleem"
                    name="probleem"
                    required
                    value={formData.probleem}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                    placeholder="Bijv. ketting valt eraf, remmen maken geluid"
                  />
                </div>
                <div>
                  <label htmlFor="beschrijving" className="block text-sm font-medium text-gray-700 mb-1">
                    Uitgebreide beschrijving
                  </label>
                  <textarea
                    id="beschrijving"
                    name="beschrijving"
                    rows={4}
                    value={formData.beschrijving}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                    placeholder="Beschrijf het probleem zo gedetailleerd mogelijk..."
                  />
                </div>
                <div>
                  <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-1">
                    Foto van het probleem (optioneel)
                  </label>
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                  />
                  {formData.foto && (
                    <p className="mt-1 text-sm text-gray-500">
                      Geselecteerd: {formData.foto.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : null}


          {/* Locatie keuze */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Waar wil je de service?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`relative cursor-pointer rounded-lg p-6 border-2 transition-all ${
                formData.locatieType === 'in_winkel' 
                  ? 'border-[#456882] bg-[#e8f0f5]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="locatieType"
                  value="in_winkel"
                  checked={formData.locatieType === 'in_winkel'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
              <div className="font-medium text-gray-900">In de winkel</div>
              <div className="text-sm text-gray-500">Friesland, Joure</div>
                </div>
              </label>

              <label className={`relative cursor-pointer rounded-lg p-6 border-2 transition-all ${
                formData.locatieType === 'op_locatie' 
                  ? 'border-[#456882] bg-[#e8f0f5]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="locatieType"
                  value="op_locatie"
                  checked={formData.locatieType === 'op_locatie'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
              <div className="font-medium text-gray-900">Op locatie</div>
              <div className="text-sm text-gray-500">Door heel Nederland</div>
                </div>
              </label>
            </div>

            {/* Adres velden (alleen bij op locatie) */}
            {formData.locatieType === 'op_locatie' && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="adres" className="block text-sm font-medium text-gray-700 mb-1">
                    Adres *
                  </label>
                  <input
                    type="text"
                    id="adres"
                    name="adres"
                    required
                    value={formData.adres}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                    placeholder="Straatnaam 123"
                  />
                </div>
                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    required
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                    placeholder="1234 AB"
                  />
                </div>
                <div>
                  <label htmlFor="plaats" className="block text-sm font-medium text-gray-700 mb-1">
                    Plaats *
                  </label>
                  <input
                    type="text"
                    id="plaats"
                    name="plaats"
                    required
                    value={formData.plaats}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                    placeholder="Amsterdam"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Voorkeur datum en tijd */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Wanneer past het jou?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="voorkeurDatum" className="block text-sm font-medium text-gray-700 mb-1">
                  Voorkeur datum
                </label>
                <input
                  type="date"
                  id="voorkeurDatum"
                  name="voorkeurDatum"
                  value={formData.voorkeurDatum}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                />
              </div>
              <div>
                <label htmlFor="voorkeurTijd" className="block text-sm font-medium text-gray-700 mb-1">
                  Voorkeur tijd
                </label>
                <select
                  id="voorkeurTijd"
                  name="voorkeurTijd"
                  value={formData.voorkeurTijd}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                >
                  <option value="">Selecteer tijd...</option>
                  <option value="ochtend">Ochtend (9:00-12:00)</option>
                  <option value="middag">Middag (12:00-17:00)</option>
                  <option value="avond">Avond (17:00-20:00)</option>
                  <option value="flexibel">Flexibel</option>
                </select>
              </div>
            </div>
          </div>

          {/* Extra opmerkingen */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v8a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6" />
              </svg>
              Extra opmerkingen
            </h2>
            <div>
              <label htmlFor="opmerkingen" className="block text-sm font-medium text-gray-700 mb-1">
                Heb je nog andere opmerkingen of bijzonderheden?
              </label>
              <textarea
                id="opmerkingen"
                name="opmerkingen"
                rows={3}
                value={formData.opmerkingen}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#456882] focus:border-[#456882]"
                placeholder="Bijv. specifieke wensen, toegankelijkheid, etc."
              />
            </div>
          </div>

          {/* Privacy en Algemene Voorwaarden checkboxes */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="akkoordPrivacy"
                  name="akkoordPrivacy"
                  type="checkbox"
                  required
                  checked={formData.akkoordPrivacy}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#456882] border-gray-300 rounded focus:ring-[#456882] focus:ring-2"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="akkoordPrivacy" className="font-medium text-gray-700 cursor-pointer">
                  Ik ga akkoord met het <Link href="/privacybeleid" target="_blank" className="text-[#456882] hover:underline font-semibold">privacybeleid</Link> *
                </label>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="akkoordVoorwaarden"
                  name="akkoordVoorwaarden"
                  type="checkbox"
                  required
                  checked={formData.akkoordVoorwaarden}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#456882] border-gray-300 rounded focus:ring-[#456882] focus:ring-2"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="akkoordVoorwaarden" className="font-medium text-gray-700 cursor-pointer">
                  Ik ga akkoord met de <Link href="/algemene-voorwaarden" target="_blank" className="text-[#456882] hover:underline font-semibold">algemene voorwaarden</Link> *
                </label>
              </div>
            </div>
          </div>

          {/* Marketing nieuws checkbox */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketingNieuws"
                  name="marketingNieuws"
                  type="checkbox"
                  checked={formData.marketingNieuws}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#456882] border-gray-300 rounded focus:ring-[#456882] focus:ring-2"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="marketingNieuws" className="font-medium text-gray-700 cursor-pointer">
                  Ik wil meer nieuws weten
                </label>
                <p className="text-gray-500 text-xs mt-1">
                  Ontvang updates over nieuwe diensten, tips en speciale aanbiedingen
                </p>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting || !formData.aanvraagType || !formData.locatieType || !formData.akkoordPrivacy || !formData.akkoordVoorwaarden}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base font-medium rounded-md text-white bg-[#456882] hover:bg-[#3a5a6f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#456882] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {submitting && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {submitting ? 'Aanvraag wordt verzonden...' : 'Aanvraag versturen'}
            </button>
            <p className="mt-2 text-sm text-gray-500">
              We nemen binnen 24 uur contact met je op
            </p>
          </div>
        </form>

        {/* SEO Content Section */}
        <section className="bg-white py-8 sm:py-12 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#323232' }}>
                Plan eenvoudig uw fatbike reparatie of onderhoud
              </h2>
              <div className="text-gray-700 space-y-6 text-lg leading-relaxed">
                <p>
                  Via dit formulier kunt u eenvoudig een afspraak plannen voor <strong>fatbike reparatie</strong> of 
                  <strong>onderhoud</strong>. Vul uw gegevens in, beschrijf het probleem of de gewenste service, en wij nemen 
                  binnen 24 uur contact met u op om een geschikt moment af te spreken.
                </p>
                <p>
                  Onze service is beschikbaar door heel Nederland. Wij komen naar u toe voor reparatie of onderhoud op locatie, 
                  of u kunt uw fatbike naar ons servicepunt in Joure brengen. Binnen 3 werkdagen staan wij op uw stoep met alle 
                  benodigde gereedschappen en onderdelen.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                  Wat gebeurt er na het invullen van het formulier?
                </h3>
                <p>
                  Na het verzenden van uw aanvraag ontvangt u een bevestiging per email. Binnen 24 uur bellen of appen wij u om 
                  de details te bespreken en een afspraak in te plannen. Tijdens dit gesprek kunnen we ook direct een offerte geven 
                  als u dat wenst. Heeft u vragen? Neem gerust contact met ons op via WhatsApp of bel ons direct.
                </p>
                <p>
                  Onze ervaren technici zijn gespecialiseerd in alle bekende fatbike merken en kunnen zowel mechanische als 
                  elektronische problemen oplossen. Op alle uitgevoerde werkzaamheden geven wij <strong>3 maanden garantie</strong>. 
                  Bekijk onze <Link href="/tarieven" className="text-brand-dark hover:text-brand-medium underline font-semibold">tarieven</Link> voor 
                  een transparant overzicht van alle kosten.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                  Waarom kiezen voor Fatbikehulp.nl?
                </h3>
                <p>
                  Bij Fatbikehulp.nl staat kwaliteit en service centraal. Onze monteurs zijn gecertificeerd en hebben jarenlange 
                  ervaring met elektrische fatbikes. Wij werken uitsluitend met originele onderdelen waar mogelijk en volgen de 
                  richtlijnen van de fabrikanten. Dit zorgt ervoor dat uw fatbike optimaal presteert en lang meegaat.
                </p>
                <p>
                  Onze service is beschikbaar door heel Nederland. Of u nu in Amsterdam, Rotterdam, Utrecht of een andere stad woont - 
                  wij komen naar u toe. Geen gedoe met het vervoeren van uw zware fatbike, geen wachttijden van weken. Binnen 3 werkdagen 
                  staan wij op uw stoep met alle benodigde gereedschappen en onderdelen.
                </p>
                <p>
                  Heeft u vragen over het formulier of onze diensten? Neem gerust contact met ons op via WhatsApp of bel ons direct. 
                  Wij helpen u graag bij het plannen van uw reparatie of onderhoud.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500">
              Fixclan - Professionele fietsreparatie en onderhoud
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © 2025 Fixclan. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <a
          href="https://wa.me/31850604213?text=Hallo%2C%20ik%20heb%20een%20vraag%20over%20fatbike%20reparatie%20of%20onderhoud"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-auto transform transition-all duration-300 scale-100 my-4 sm:my-8 relative">
            {/* Header */}
            <div className="bg-white text-gray-900 p-6 sm:p-8 rounded-t-3xl border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#456882] rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welkom bij Fatbikehulp</h2>
                    <p className="text-gray-500 text-xs sm:text-sm">Professionele fietsreparatie</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseWelcomeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Reparateurs op locatie</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Wij komen naar jou toe! Gespecialiseerd in fatbikes en reparaties door heel Nederland.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Werkplaats in Joure</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Je fatbike kan ook naar onze werkplaats in Joure gebracht worden voor uitgebreide reparaties.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Snelle Service</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Contact binnen 24 uur • Bezoek binnen 1-7 werkdagen • Partner van GoFatbike.nl</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 bg-[#456882] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900 text-base sm:text-lg">Foutcodes & Vragen</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Geef eventuele foutcodes of specifieke vragen aan in dit formulier. Wij komen binnen 24 uur met je in contact!</p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 sm:px-8 py-4 sm:py-6 rounded-b-3xl">
              <button
                onClick={handleCloseWelcomeModal}
                className="w-full border-2 border-[#456882] text-[#456882] hover:bg-[#456882] hover:text-white font-semibold py-3 sm:py-4 px-6 rounded-2xl transition-all duration-200 text-base sm:text-lg"
              >
                Begrepen, ga door!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Platform Keuze Modal */}
      {showPlatformModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#456882] to-[#3a5a6f] px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Laatste vraag!</h2>
                  <p className="text-white/90 text-sm">Help ons om beter te worden</p>
                </div>
                <button
                  onClick={() => setShowPlatformModal(false)}
                  className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Via welk platform bent u bij ons gekomen?
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => submitWithPlatform('google')}
                  disabled={submitting}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#456882] hover:bg-[#e8f0f5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Google</span>
                </button>

                <button
                  onClick={() => submitWithPlatform('gofatbike.nl')}
                  disabled={submitting}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#456882] hover:bg-[#e8f0f5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-8 h-8 mb-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Gofatbike.nl</span>
                </button>

                <button
                  onClick={() => submitWithPlatform('instagram')}
                  disabled={submitting}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#456882] hover:bg-[#e8f0f5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Instagram</span>
                </button>

                <button
                  onClick={() => submitWithPlatform('tiktok')}
                  disabled={submitting}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#456882] hover:bg-[#e8f0f5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Tiktok</span>
                </button>

                <button
                  onClick={() => submitWithPlatform('facebook')}
                  disabled={submitting}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#456882] hover:bg-[#e8f0f5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-8 h-8 mb-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Facebook</span>
                </button>

                <button
                  onClick={() => submitWithPlatform('mond_op_mond')}
                  disabled={submitting}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#456882] hover:bg-[#e8f0f5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-8 h-8 mb-2 text-[#456882]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Mond op mond</span>
                </button>
              </div>

              {submitting && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center text-sm text-gray-600">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Aanvraag verzenden...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

