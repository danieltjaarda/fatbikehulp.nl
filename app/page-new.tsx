'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import FAQSchema from '@/components/FAQSchema'
import StructuredData from '@/components/StructuredData'
import FAQ from '@/components/FAQ'

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

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
                <h4 className="font-semibold mb-1" style={{ color: '#323232' }}>Online formulier</h4>
                <p className="text-sm text-gray-600">Vul het formulier in met uw gegevens en beschrijf het probleem</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: '#323232' }}>Op locatie</h4>
                <p className="text-sm text-gray-600">Binnen 3 dagen komen wij naar u toe voor de reparatie</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: '#323232' }}>Fatbike gerepareerd!</h4>
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
    image: 'https://fatbikehulp.nl/fatbikehulp-logo-3.png',
    '@id': 'https://fatbikehulp.nl',
    url: 'https://fatbikehulp.nl',
    telephone: '+31850604213',
    email: 'claims@fatbikehulp.nl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Brandermeer 4a',
      addressLocality: 'Joure',
      postalCode: '8502TV',
      addressCountry: 'NL',
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
      {/* Main Header */}
      <header>
        {/* Top Section - White Background */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image 
                  src="/fatbikehulp-logo-3.png" 
                  alt="Fatbikehulp.nl logo - Professionele fatbike reparatie en onderhoud service" 
                  width={200}
                  height={80}
                  className="h-10 sm:h-12 w-auto"
                />
              </Link>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-lg mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Producten zoeken..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-brand-medium text-gray-900"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Aanvragen Button */}
              <Link href="/aanvraag">
                <button className="text-white px-6 py-2 rounded-full font-semibold transition-colors" style={{ backgroundColor: '#456882' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a5a6f'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#456882'}>
                  Aanvragen
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Dark Background */}
        <nav className="bg-brand-menu relative z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 sm:space-x-10">
              <Link href="/onderhoud">
                <button className="text-white px-4 py-3 font-bold hover:bg-brand-dark/20 transition-colors whitespace-nowrap">
                  Onderhoud
                </button>
              </Link>
              <Link href="/reparatie">
                <button className="text-white px-4 py-3 font-bold hover:bg-brand-dark/20 transition-colors whitespace-nowrap">
                  Reparatie
                </button>
              </Link>
              <div className="relative group">
                <button className="text-white px-4 py-3 font-bold hover:bg-brand-dark/20 transition-colors whitespace-nowrap flex items-center">
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
              <Link href="/locatie/joure">
                <button className="text-white px-4 py-3 font-bold hover:bg-brand-dark/20 transition-colors whitespace-nowrap">
                  Locatie & Contact
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Feature/Trust Bar */}
      <div className="bg-white border-b border-brand-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Main Promotional Banner - Rounded Rectangle Container */}
      <section className="py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full rounded-3xl overflow-hidden aspect-[32/9]">
            <Image 
              src="/herosection-4.png" 
              alt="Fatbike reparatie en onderhoud service door heel Nederland - Professionele technici komen naar u toe" 
              fill
              className="object-cover"
              priority
            />
            {/* Black fade gradient from left to ~30% */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.3) 30%, transparent 35%)' }}></div>
            <div className="absolute inset-0 flex items-center p-6 sm:p-8 lg:p-12">
              {/* Content container - left aligned */}
              <div className="w-full flex flex-col gap-2 items-start">
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Reparatie &<br />
                  Onderhoud<br />
                  op locatie
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <Link href="/aanvraag">
                    <button className="text-white px-6 py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#456882' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a5a6f'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#456882'}>
                      Aanvragen
                    </button>
                  </Link>
                  <span className="text-white text-lg sm:text-xl font-medium">
                    Heel 🇳🇱
                  </span>
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
            <div className="bg-brand-light rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#323232' }}>Plan reparatie in</h2>
                <p className="text-brand-dark/80 mb-6">Waar je ook bent in Nederland!</p>
                <button className="w-12 h-12 bg-brand-medium rounded-full flex items-center justify-center hover:bg-brand-dark transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {/* Sprinter Bus Image */}
              <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 w-48 h-36 sm:w-56 sm:h-44">
                <Image 
                  src="/sprinter-bus.png" 
                  alt="Sprinter bus voor fatbike reparatie service op locatie door heel Nederland" 
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>

            {/* Right Card - WhatsApp Help */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 relative overflow-hidden border-2 border-black">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#323232' }}>Extra hulp nodig?</h2>
                <p className="mb-6" style={{ color: '#323232' }}>Whatsapp met ons</p>
                <button className="w-12 h-12 bg-brand-medium rounded-full flex items-center justify-center hover:bg-brand-dark transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {/* Background Image Placeholder */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
                <div className="w-full h-full bg-brand-medium rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
              </div>
            </div>
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
                  Heeft u een fatbike die reparatie nodig heeft? Plan eenvoudig uw <strong>fatbike reparatie aan huis</strong> in via ons online formulier. 
                  Vul het formulier in met uw gegevens en beschrijf het probleem met uw fatbike.
                </p>
                <p>
                  Wij nemen dan contact met u op om een geschikt tijdstip te plannen. Binnen 3 dagen staan wij op uw stoep 
                  voor fatbike reparatie aan huis, waar u ook bent in Nederland.
                </p>
                <p>
                  Onze ervaren technici komen naar u toe voor fatbike reparatie aan huis, zodat u geen omkijken heeft. Snel, betrouwbaar en professioneel.
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
        </div>
      </section>

      {/* Three Widgets Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widget 1 */}
            <div className="relative rounded-2xl border border-gray-200 aspect-square overflow-hidden">
              <Image 
                src="/offerte-aanvragen.png" 
                alt="Offerte aanvragen voor fatbike reparatie of onderhoud - Plan nu uw service" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col p-6 sm:p-8">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                  Offerte aanvragen
                </h3>
                <p className="text-white flex-grow">
                  {/* Content will be added here */}
                </p>
                <Link href="/aanvraag">
                  <button className="bg-brand-medium text-white px-4 py-2 rounded-full font-semibold hover:bg-brand-dark transition-colors mt-auto w-fit">
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
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                  Bekijk tarieven
                </h3>
                <p className="text-white flex-grow">
                  {/* Content will be added here */}
                </p>
                <Link href="/tarieven">
                  <button className="bg-brand-medium text-white px-4 py-2 rounded-full font-semibold hover:bg-brand-dark transition-colors mt-auto w-fit">
                    Bekijken
                  </button>
                </Link>
              </div>
            </div>

            {/* Widget 3 */}
            <div className="relative rounded-2xl border border-gray-200 aspect-square overflow-hidden">
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
                  <button className="bg-brand-medium text-white px-4 py-2 rounded-full font-semibold hover:bg-brand-dark transition-colors mt-auto w-fit">
                    Bekijken
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ color: '#323232' }}>
            Veelgestelde vragen
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="px-6 sm:px-8 lg:px-12 py-12">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <div className="inline-block bg-white rounded-lg p-2">
                <Image 
                  src="/fatbikehulp-logo-kerst.png" 
                  alt="Fatbikehulp Logo" 
                  width={200}
                  height={80}
                  className="h-10 sm:h-12 w-auto"
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
            <p className="text-white/80">© 2025 Fatbikehulp.nl. Alle rechten voorbehouden.</p>
          </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}


