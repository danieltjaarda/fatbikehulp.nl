'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import FAQSchema from '@/components/FAQSchema'
import StructuredData from '@/components/StructuredData'
import FAQ from '@/components/FAQ'
import BrandSlider from '@/components/BrandSlider'

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const callConversionFired = useRef(false)

  // Click-to-call conversion tracking (1x per sessie)
  const trackCallConversion = () => {
    if (callConversionFired.current) return;
    callConversionFired.current = true;
    
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17774855917/TwKcCKfJ5s8bEO2N25tC',
        'value': 30.0,
        'currency': 'EUR'
      });
    }
  }

  const faqItems = [
    {
      question: 'Hoe werkt het reparatieproces?',
      answer: (
        <>
          <p className="mb-4">
            Vul het <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">online formulier</Link> in met uw gegevens en beschrijf het probleem met uw fatbike. 
            Wij nemen dan contact met u op om een geschikt tijdstip te plannen. Binnen 3 dagen staan 
            wij op uw stoep om uw fatbike te repareren.
          </p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#323232' }}>Online formulier</h3>
                <p className="text-sm text-gray-600">Vul het formulier in met uw gegevens en beschrijf het probleem</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#323232' }}>Op locatie</h3>
                <p className="text-sm text-gray-600">Binnen 3 dagen komen wij naar u toe voor de reparatie</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#323232' }}>Fatbike gerepareerd!</h3>
                <p className="text-sm text-gray-600">Uw fatbike is weer klaar voor gebruik</p>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      question: 'Wat zijn de kosten voor een reparatie op locatie?',
      answer: (
        <p>
          Voor reparaties en onderhoud op locatie worden €49 rij kosten in rekening gebracht. 
          De kosten voor de reparatie zelf zijn afhankelijk van het probleem en de benodigde onderdelen. 
          Bekijk onze <Link href="/tarieven" className="text-brand-dark hover:text-brand-medium underline font-semibold">tarieven pagina</Link> voor meer informatie.
        </p>
      )
    },
    {
      question: 'Hoe kan ik betalen?',
      answer: 'Op locatie kunt u betalen met pin of contant. Beide betaalmethoden zijn toegestaan.'
    },
    {
      question: 'Waar bieden jullie service aan?',
      answer: 'Wij bieden service door heel Nederland. Onze ervaren technici komen naar u toe, waar u ook bent in Nederland. Binnen 3 dagen staan wij op uw stoep.'
    },
    {
      question: 'Kan ik ook langskomen in Joure?',
      answer: (
        <p>
          Ja, u kunt ook langskomen in ons servicepunt in Joure voor reparatie en onderhoud. 
          Bekijk onze <Link href="/locatie/joure" className="text-brand-dark hover:text-brand-medium underline font-semibold">locatie pagina</Link> voor adresgegevens en openingstijden.
        </p>
      )
    },
    {
      question: 'Welke merken?',
      answer: (
        <>
          <p className="mb-3">
            Wij bieden service voor verschillende fatbike merken, waaronder:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li><strong>OUXI</strong> - Modellen: V8, V20, H9</li>
            <li><strong>Engwe</strong></li>
            <li><strong>Knaap</strong></li>
            <li><strong>QMWHEEL</strong></li>
          </ul>
          <p>
            Heeft u een fatbike van een ander merk? Neem gerust contact met ons op - wij kunnen meestal ook andere merken repareren en onderhouden.
          </p>
        </>
      )
    },
    {
      question: 'Plaatsen jullie GPS systemen?',
      answer: (
        <p>
          Ja, wij plaatsen GPS systemen op uw fatbike. Wij werken met <Link href="/loqater" className="text-brand-dark hover:text-brand-medium underline font-semibold">Loqater peilzenders</Link>, 
          een professioneel GPS tracking systeem met een terugvindkans van 97%. De Loqater peilzender wordt discreet op uw fatbike geplaatst 
          en biedt 24/7 monitoring via een meldkamer. Bekijk onze <Link href="/loqater" className="text-brand-dark hover:text-brand-medium underline font-semibold">Loqater pagina</Link> voor 
          meer informatie over prijzen en mogelijkheden.
        </p>
      )
    }
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Fatbikehulp.nl',
    image: 'https://www.fatbikehulp.nl/fatbikehulp-logo-3.png',
    '@id': 'https://www.fatbikehulp.nl',
    url: 'https://www.fatbikehulp.nl',
    telephone: '+31850604213',
    email: 'claims@fatbikehulp.nl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Brandermeer 4a',
      addressLocality: 'Joure',
      postalCode: '8502TV',
      addressCountry: 'NL',
      addressRegion: 'Friesland',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.9656,
      longitude: 5.8030,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '132',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.trustpilot.com/review/fatbikehulp.nl',
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Fatbike Reparatie en Onderhoud',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Fatbikehulp.nl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Brandermeer 4a',
        addressLocality: 'Joure',
        postalCode: '8502TV',
        addressCountry: 'NL',
        addressRegion: 'Friesland',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nederland',
    },
    description: 'Professionele fatbike reparatie en onderhoud op locatie door heel Nederland. Binnen 3 dagen op uw stoep.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema]} />
      <FAQSchema />
      <div className="min-h-screen bg-white">
      <main>
      {/* Main Promotional Banner - Rounded Rectangle Container */}
      <section className="py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] lg:aspect-[32/9] bg-black">
            {/* Video achtergrond - Mobiele versie */}
            <video 
              autoPlay
              loop
              muted
              playsInline
              poster="/herosection-4-optimized.webp"
              className="absolute inset-0 w-full h-full object-cover lg:hidden"
              aria-label="Video van fatbike reparatie en onderhoud service door heel Nederland - Professionele technici komen naar u toe"
            >
              <source src="/herosection-video-mobile.m4v" type="video/mp4" />
              <source src="/herosection-video-mobile.m4v" type="video/quicktime" />
              <source src="/herosection-video-mobile.m4v" type="video/x-m4v" />
              Your browser does not support the video tag.
            </video>
            {/* Video achtergrond - Desktop versie */}
            <video 
              autoPlay
              loop
              muted
              playsInline
              poster="/herosection-4-optimized.webp"
              className="absolute inset-0 w-full h-full object-cover hidden lg:block"
              aria-label="Video van fatbike reparatie en onderhoud service door heel Nederland - Professionele technici komen naar u toe"
            >
              <source src="/herosection-video.m4v" type="video/mp4" />
              <source src="/herosection-video.m4v" type="video/quicktime" />
              <source src="/herosection-video.m4v" type="video/x-m4v" />
              Your browser does not support the video tag.
            </video>
            {/* Black fade gradient - Mobile: to middle, Desktop: to ~30% */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent lg:hidden z-10" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 45%, transparent 55%)' }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent hidden lg:block z-10" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.3) 30%, transparent 35%)' }}></div>
            <div className="absolute inset-0 flex items-center p-6 sm:p-8 lg:p-12 z-20">
              {/* Content container - left aligned */}
              <div className="w-full flex flex-col gap-2 items-start">
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Fatbike Reparatie<br />
                  aan Huis<br />
                  & Onderhoud
                </h1>
                <div className="mt-4 flex flex-col gap-3 items-start">
                  <div className="flex items-center gap-3">
                    <a 
                      href="tel:+31850604213"
                      onClick={trackCallConversion}
                      className="text-white px-6 py-2 rounded-full font-bold transition-colors inline-flex items-center gap-2"
                      style={{ backgroundColor: '#0f70e6' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d5fc7'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f70e6'}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Nu bellen
                    </a>
                    <span className="text-white text-lg sm:text-xl font-medium">
                      Heel 🇳🇱
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Image 
                      src="/trustpilot-stars.png" 
                      alt="Trustpilot sterren" 
                      width={120} 
                      height={24}
                      className="h-5 sm:h-6 w-auto"
                    />
                    <span className="text-white text-sm sm:text-base font-semibold">
                      4.9
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      132 reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section - Two Cards */}
      <section className="bg-white py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card - Plan Repair */}
            <Link href="/aanvraag" className="rounded-2xl p-6 sm:p-8 relative overflow-hidden hover:shadow-lg transition-all cursor-pointer block" style={{ backgroundColor: '#dbeafe' }}>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#323232' }}>Plan reparatie in</div>
                <p className="mb-6 text-base sm:text-lg" style={{ color: '#323232' }}>Waar je ook bent in Nederland!</p>
                <button className="bg-white border-2 border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                  <span>Nu aanvragen</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {/* Sprinter Bus Image */}
              <div className="absolute bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 right-4 sm:right-8 w-48 h-32 sm:w-56 sm:h-44">
                <Image 
                  src="/producten/bus-fatbikehulp2.png" 
                  alt="Sprinter bus voor fatbike reparatie service op locatie door heel Nederland" 
                  fill
                  className="object-contain object-right object-bottom"
                />
              </div>
            </Link>

            {/* Right Card - WhatsApp Help */}
            <a 
              href="https://wa.me/31850604213" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={trackCallConversion}
              className="bg-white rounded-2xl relative overflow-hidden border-2 border-black hover:border-blue-600 transition-colors cursor-pointer block"
            >
              <div className="relative z-10 p-6 sm:p-8">
                <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#323232' }}>Extra hulp nodig?</div>
                <p className="mb-6" style={{ color: '#323232' }}>Whatsapp met ons</p>
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
              </div>
              {/* WhatsApp Man Image */}
              <div className="absolute right-0 bottom-0 w-40 h-48 sm:w-48 sm:h-56">
                <Image 
                  src="/whatsapp-man.png" 
                  alt="Vriendelijke klantenservice medewerker klaar om u te helpen via WhatsApp" 
                  fill
                  className="object-contain"
                  style={{ objectPosition: 'right bottom' }}
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text with Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#323232' }}>
                Fatbike reparatie aan huis!
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                <p>
                  Heeft jouw fatbike reparatie nodig? Maak snel een afspraak via onze website en plan eenvoudig service op locatie. Vul het formulier in met uw gegevens en beschrijf het probleem. Of het nu een lekke band, motorprobleem of andere storing is - wij zorgen ervoor dat uw fatbike snel weer op de weg is.
                </p>
                <p>
                  Wij nemen binnen 24 uur contact met u op om een geschikt tijdstip te plannen. Binnen 3 dagen staan wij op uw stoep voor uw Fatbike reparatie, waar u ook bent in Nederland. Afspraak maken is eenvoudig en kan snel mogelijk.
                </p>
                <p>
                  Onze ervaren technici komen naar u toe, zodat u geen omkijken heeft. Snel, betrouwbaar en professioneel. Wij zorgen ervoor dat uw fatbike weer optimaal presteert.
                </p>
              </div>
            </div>

            {/* Right Side - Video with Play Button */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900">
              {!isVideoPlaying ? (
                <>
                  {/* Video thumbnail */}
                  <Image 
                    src="/thumbnail-video.jpg" 
                    alt="Video over fatbike reparatie en onderhoud service door Fatbikehulp.nl" 
                    fill
                    className="object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
                    <button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group z-10 cursor-pointer"
                      aria-label="Video afspelen over fatbike reparatie en onderhoud"
                    >
                      <svg className="w-10 h-10 text-brand-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <video 
                  src="/video.mov" 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
          
          {/* Mobile Action Buttons - Only visible on mobile */}
          <div className="md:hidden mt-6 flex gap-4">
            <a
              href="https://wa.me/31850604213?text=Hallo%2C%20ik%20heb%20een%20vraag%20over%20fatbike%20reparatie%20of%20onderhoud"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCallConversion}
              className="flex-1 bg-white border-2 border-blue-600 hover:bg-gray-50 text-blue-600 px-6 py-4 rounded-full font-semibold text-center transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:31850604213"
              onClick={trackCallConversion}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full font-semibold text-center transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Bellen
            </a>
          </div>
        </div>
      </section>

      {/* Brand Slider Section */}
      <BrandSlider />

      {/* Three Widgets Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ color: '#323232' }}>
            Onze diensten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Widget 1 */}
            <div className="relative rounded-2xl border border-gray-200 aspect-square overflow-hidden">
              <Image 
                src="/offerte-aanvragen.png" 
                alt="Offerte aanvragen voor fatbike reparatie of onderhoud - Plan nu uw service" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col p-6 sm:p-8">
                <h3 className="text-4xl md:text-3xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                  Offerte<br />
                  aanvragen
                </h3>
                <p className="text-white flex-grow">
                  {/* Content will be added here */}
                </p>
                <Link href="/aanvraag">
                  <button className="text-white px-4 py-1.5 rounded-full font-semibold transition-colors mt-auto w-fit"
                    style={{ backgroundColor: '#0f70e6' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d5fc7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f70e6'}>
                    Aanvragen
                  </button>
                </Link>
              </div>
            </div>

            {/* Widget 2 */}
            <div className="relative rounded-2xl border border-gray-200 aspect-square overflow-hidden">
              <Image 
                src="/tarieven.png" 
                alt="Bekijk tarieven voor fatbike reparatie en onderhoud - Transparante prijzen" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col p-6 sm:p-8">
                <h3 className="text-4xl md:text-3xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                  Bekijk<br />
                  tarieven
                </h3>
                <p className="text-white flex-grow">
                  {/* Content will be added here */}
                </p>
                <Link href="/tarieven">
                  <button className="text-white px-4 py-1.5 rounded-full font-semibold transition-colors mt-auto w-fit"
                    style={{ backgroundColor: '#0f70e6' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d5fc7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f70e6'}>
                    Bekijken
                  </button>
                </Link>
              </div>
            </div>

            {/* Widget 3 */}
            <div className="relative rounded-2xl border border-gray-200 aspect-square overflow-hidden md:col-span-2 lg:col-span-1">
              <Image 
                src="/joure.png" 
                alt="Servicepunt Joure - Kom langs voor fatbike reparatie en onderhoud in Joure" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col p-6 sm:p-8">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                  Kom langs<br />
                  in Joure!
                </h3>
                <p className="text-white flex-grow">
                  {/* Content will be added here */}
                </p>
                <Link href="/locatie/joure">
                  <button className="text-white px-4 py-1.5 rounded-full font-semibold transition-colors mt-auto w-fit"
                    style={{ backgroundColor: '#0f70e6' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d5fc7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f70e6'}>
                    Bekijken
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - SEO Rich Text */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#323232' }}>
              Gespecialiseerde expertise voor alle fatbike merken en modellen
            </h2>
            <div className="text-gray-700 space-y-6 text-lg leading-relaxed">
              <p>
                Onze monteurs hebben jarenlange ervaring met alle bekende fatbike merken, waaronder <strong>OUXI</strong>, <strong>QMWHEEL</strong>,{' '}
                <strong>Knaap</strong> en natuurlijk de populaire modellen <strong>V8</strong>, <strong>V20</strong> en <strong>H9</strong>. 
                We begrijpen de unieke uitdagingen van elektrische fatbikes en weten precies hoe we problemen met de motor, batterij, display 
                en andere elektronische componenten moeten aanpakken.
              </p>
              <p>
                Naast standaard reparaties bieden wij ook gespecialiseerde diensten zoals <strong>batterijdiagnose</strong>,{' '}
                <strong>motorrevisie</strong> en <strong>GPS-tracker installatie</strong>. Onze werkplaats in Joure is volledig uitgerust met de nieuwste 
                diagnostische tools, zodat we zelfs complexe problemen snel kunnen identificeren en oplossen.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                Preventief onderhoud verlengt de levensduur van uw fatbike
              </h3>
              <p>
                Regelmatig onderhoud voorkomt kostbare reparaties en zorgt ervoor dat uw fatbike optimaal presteert. Onze onderhoudspakketten zijn 
                afgestemd op het gebruik en de omstandigheden waarin u fietst. Van <strong>winteropslag service</strong> tot <strong>zomercheck</strong> - 
                wij zorgen dat uw fatbike het hele jaar door in topconditie blijft.
              </p>
              <p>
                Tijdens een onderhoudsbeurt controleren we niet alleen de mechanische onderdelen, maar ook de elektrische systemen en batterijgezondheid. 
                We geven u altijd een duidelijk overzicht van wat we hebben gecontroleerd en wat eventueel aandacht nodig heeft.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                Kwaliteit en garantie staan centraal
              </h3>
              <p>
                Wij werken uitsluitend met <strong>gecertificeerde onderdelen</strong> en volgen de richtlijnen van de fabrikanten. Op alle uitgevoerde 
                reparaties en onderhoud geven wij <strong>3 maanden garantie</strong>. Mocht er binnen deze periode hetzelfde probleem optreden, 
                dan lossen we dit kosteloos op. Bekijk onze <Link href="/tarieven" className="text-brand-dark hover:text-brand-medium underline font-semibold">tarieven</Link> voor 
                een transparant overzicht van alle kosten, of neem contact op voor een persoonlijke offerte op maat.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                Handige gidsen en informatie
              </h3>
              <p>
                Wilt u meer weten over het onderhoud van uw fatbike? In onze <Link href="/blogs" className="text-brand-dark hover:text-brand-medium underline font-semibold">blog artikelen</Link> vindt 
                u uitgebreide gidsen over fatbike onderhoud, veelvoorkomende problemen en hun oplossingen, batterijverzorging, het oplossen van foutcodes, 
                en tips voor winter onderhoud. Of u nu een beginnend fatbike eigenaar bent of al jaren rijdt, onze praktische handleidingen 
                helpen u uw fatbike in topconditie te houden en problemen zelf te herkennen.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                Waarom kiezen voor service op locatie?
              </h3>
              <p>
                Fatbikes zijn zwaar en lastig te vervoeren. Door te kiezen voor service op locatie bespaart u tijd, moeite en transportkosten. 
                Onze monteurs nemen alle benodigde gereedschappen en onderdelen mee, zodat we in de meeste gevallen het probleem direct kunnen oplossen. 
                Geen wachttijden van weken, geen gedoe met het vervoeren van uw fiets. Wij zorgen ervoor dat uw fatbike snel weer op de weg is.
              </p>
              <p>
                Heeft u een lekke band, kapotte ketting, of een probleem met de motor? <strong>Maak snel een afspraak</strong> via <strong>onze website</strong> 
                en wij komen naar u toe. <strong>Afspraak maken</strong> is eenvoudig en kan <strong>snel mogelijk</strong>. Binnen 3 dagen staan wij op uw stoep 
                voor professionele service, waar u ook bent in Nederland.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
                {/* Gecertificeerde monteurs */}
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Gecertificeerde monteurs</span>
                </div>
                
                {/* Aan huis gerepareerd */}
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Aan huis gerepareerd</span>
                </div>
                
                {/* Trustpilot */}
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                  <Image 
                    src="/trustpilot-single-star.png" 
                    alt="Trustpilot" 
                    width={20} 
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">132 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-8 sm:py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ color: '#323232' }}>
            Veelgestelde vragen
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="text-white py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="px-6 sm:px-8 lg:px-12 py-12">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <div className="inline-block">
                <Image 
                  src="/producten/footer-logo-3.png" 
                  alt="Fatbikehulp Logo" 
                  width={180}
                  height={60}
                  className="h-12 sm:h-14 w-auto"
                />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Reparatie inplannen sectie */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Reparatie inplannen?</h3>
              <div className="space-y-2">
                <Link href="/reparatie/amsterdam" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Amsterdam
                </Link>
                <Link href="/reparatie/den-haag" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Den Haag
                </Link>
                <Link href="/reparatie/utrecht" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Utrecht
                </Link>
                <Link href="/reparatie/arnhem" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Arnhem
                </Link>
                <Link href="/reparatie/s-hertogenbosch" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in 's-Hertogenbosch
                </Link>
                <Link href="/reparatie/maastricht" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Maastricht
                </Link>
                <Link href="/reparatie/zwolle" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Zwolle
                </Link>
                <Link href="/reparatie/assen" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Assen
                </Link>
                <Link href="/reparatie/leeuwarden" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Leeuwarden
                </Link>
                <Link href="/reparatie/groningen" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Groningen
                </Link>
                <Link href="/reparatie/middelburg" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Middelburg
                </Link>
                <Link href="/reparatie/lelystad" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie in Lelystad
                </Link>
              </div>
            </div>

            {/* Service sectie */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Service</h3>
              <div className="space-y-2">
                <Link href="/foutcodes" className="block text-white hover:text-white/80 transition-colors">
                  Foutcodes
                </Link>
                <Link href="/onderhoud" className="block text-white hover:text-white/80 transition-colors">
                  Onderhoud
                </Link>
                <Link href="/reparatie" className="block text-white hover:text-white/80 transition-colors">
                  Reparatie
                </Link>
                <Link href="/aanvraag" className="block text-white hover:text-white/80 transition-colors">
                  Aanvragen
                </Link>
                <Link href="/tarieven" className="block text-white hover:text-white/80 transition-colors">
                  Tarieven
                </Link>
                <Link href="/kennisbank" className="block text-white hover:text-white/80 transition-colors">
                  Kennisbank
                </Link>
                <Link href="/loqater" className="block text-white hover:text-white/80 transition-colors">
                  Loqater
                </Link>
                <Link href="/kinderzitjes" className="block text-white hover:text-white/80 transition-colors">
                  Kinderzitjes
                </Link>
                <Link href="/loqater" className="block text-white hover:text-white/80 transition-colors">
                  Plaatsen GPS systemen
                </Link>
                <Link href="/blogs" className="block text-white hover:text-white/80 transition-colors">
                  Blogs
                </Link>
              </div>
            </div>

            {/* Beleid sectie */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Beleid</h3>
              <div className="space-y-2">
                <Link href="/beleid" className="block text-white hover:text-white/80 transition-colors">
                  Beleid
                </Link>
                <Link href="/algemene-voorwaarden" className="block text-white hover:text-white/80 transition-colors">
                  Algemene voorwaarden
                </Link>
                <Link href="/privacybeleid" className="block text-white hover:text-white/80 transition-colors">
                  Privacybeleid
                </Link>
                <Link href="/herroepingsrecht" className="block text-white hover:text-white/80 transition-colors">
                  Herroepingsrecht
                </Link>
                <Link href="/klachtenregeling" className="block text-white hover:text-white/80 transition-colors">
                  Klachtenregeling
                </Link>
              </div>
            </div>

            {/* Hulp nodig sectie */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Hulp nodig?</h3>
              <div className="space-y-2 text-white mb-4">
                <p>+31 85 060 4213</p>
                <p>
                  <a href="mailto:claims@fatbikehulp.nl" className="text-white hover:text-white/80 transition-colors">
                    claims@fatbikehulp.nl
                  </a>
                </p>
                <p>
                  <Link href="/locatie/joure" className="text-white hover:text-white/80 transition-colors">
                    Brandermeer 4a, Joure, 8502TV
                  </Link>
                </p>
              </div>
              <a 
                href="https://wa.me/31850604213" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={trackCallConversion}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors mb-4"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
              
              {/* Trustpilot Widget */}
              <div className="flex flex-col gap-2">
                <div className="w-fit">
                  <Image 
                    src="/trustpilot-logo.webp" 
                    alt="Trustpilot beoordeling - TrustScore 4.9 met 132 reviews" 
                    width={150}
                    height={45}
                    className="h-10 w-auto"
                  />
                </div>
                <div className="text-white text-sm">
                  <span className="font-semibold">TrustScore 4.9</span>
                  <br />
                  <span className="underline">132 reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 mb-2">© 2025 Fatbikehulp.nl. Alle rechten voorbehouden.</p>
            <p className="text-white/60 text-sm">
              KvK nummer: 96813091 - BTW nummer: NL867772979B01 - <Link href="/privacybeleid" className="text-white/80 hover:text-white transition-colors underline">Privacy-beleid</Link>
            </p>
          </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

