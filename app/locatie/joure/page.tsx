'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

export default function JoureLocatiePage() {
  const callConversionFired = useRef(false)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Fatbike Reparatie & Onderhoud Joure
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Welkom bij Fatbikehulp.nl in Joure! Ons servicepunt is de perfecte plek om uw fatbike te laten repareren of onderhouden. 
              Onze ervaren technici staan klaar om u te helpen met alle reparatie- en onderhoudswerkzaamheden voor uw fatbike.
            </p>
          </div>
        </section>

        {/* Address & Contact Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Information */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#323232' }}>
                  Adresgegevens
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold text-lg">Fatbikehulp.nl</p>
                    <p>Brandermeer 4a</p>
                    <p>8502TV Joure</p>
                    <p>Nederland</p>
                  </div>
                  <div className="pt-4">
                    <p className="font-semibold mb-2">Telefoon:</p>
                    <a 
                      href="tel:+31850604213" 
                      onClick={() => {
                        if (!callConversionFired.current && typeof window !== 'undefined' && typeof window.gtag === 'function') {
                          callConversionFired.current = true;
                          window.gtag('event', 'conversion', {
                            'send_to': 'AW-17774855917/TwKcCKfJ5s8bEO2N25tC',
                            'value': 30.0,
                            'currency': 'EUR'
                          });
                        }
                      }}
                      className="text-brand-dark hover:text-brand-medium"
                    >
                      +31 85 060 4213
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Email:</p>
                    <a href="mailto:claims@fatbikehulp.nl" className="text-brand-dark hover:text-brand-medium">
                      claims@fatbikehulp.nl
                    </a>
                  </div>
                  <div className="pt-4">
                    <a 
                      href="https://wa.me/31850604213" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#323232' }}>
                  Openingstijden
                </h2>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Maandag:</span>
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Dinsdag:</span>
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Woensdag:</span>
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Donderdag:</span>
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Vrijdag:</span>
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Zaterdag:</span>
                    <span>Gesloten</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Zondag:</span>
                    <span>Gesloten</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Find Us Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#323232' }}>
              Hoe vindt u ons?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Route naar pand */}
              <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <div className="relative aspect-video">
                  <Image 
                    src="/route-naar-pand.png" 
                    alt="Route naar Fatbikehulp.nl servicepunt in Joure - Brandermeer 4a" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Pand van buiten */}
              <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <div className="relative aspect-video">
                  <Image 
                    src="/pand-van-buiten.png" 
                    alt="Fatbikehulp.nl servicepunt in Joure - Exterieur van het pand aan Brandermeer 4a" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
              <div className="text-gray-700">
                <p className="mb-4">
                  Ons pand is gelegen aan de Brandermeer 4a in Joure. U kunt ons bereiken via de A6 of A7, 
                  afhankelijk van waar u vandaan komt. Er is voldoende parkeergelegenheid beschikbaar.
                </p>
                <p>
                  Kom gerust langs tijdens onze openingstijden. Voor reparaties en onderhoud raden we aan 
                  om van tevoren een afspraak te maken via ons online formulier of telefonisch.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SEO Content Section */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#323232' }}>
              Bezoek ons servicepunt in Joure voor fatbike reparatie en onderhoud
            </h2>
            <div className="text-gray-700 space-y-6 text-lg leading-relaxed">
              <p>
                Ons servicepunt in Joure is volledig uitgerust voor alle fatbike reparaties en onderhoudswerkzaamheden. 
                Gelegen aan de Brandermeer 4a, bieden wij een centrale locatie voor klanten uit Friesland en omgeving. 
                Heeft u liever dat we naar u toe komen? Dat kan ook! Onze <strong>service aan huis</strong> is beschikbaar 
                door heel Nederland.
              </p>
              <p>
                In onze werkplaats beschikken wij over alle benodigde gereedschappen en diagnostische apparatuur voor moderne 
                elektrische fatbikes. Onze ervaren technici zijn gespecialiseerd in alle bekende merken en modellen, en kunnen 
                zowel mechanische als elektronische problemen snel identificeren en oplossen.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                Openingstijden en bereikbaarheid
              </h3>
              <p>
                Ons servicepunt is geopend van maandag tot en met vrijdag van 09:00 tot 17:00. Kom gerust langs tijdens deze 
                openingstijden, of maak van tevoren een afspraak zodat we zeker weten dat we tijd voor u hebben. Er is voldoende 
                parkeergelegenheid beschikbaar, en u kunt uw fatbike direct bij ons achterlaten voor reparatie of onderhoud.
              </p>
              <p>
                Wilt u liever dat we naar u toe komen? Geen probleem! Plan eenvoudig een afspraak via ons 
                <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">online formulier</Link> en 
                wij komen binnen 3 werkdagen bij u langs voor service aan huis. Voor vragen kunt u ons altijd bellen of een 
                WhatsApp bericht sturen.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                Wat kunt u verwachten bij een bezoek aan ons servicepunt?
              </h3>
              <p>
                Bij ons servicepunt in Joure kunt u rekenen op professionele service en persoonlijke aandacht. Onze technici nemen 
                de tijd om uw fatbike grondig te inspecteren en u uit te leggen wat er aan de hand is. We werken met moderne 
                diagnostische apparatuur en hebben toegang tot originele onderdelen voor alle bekende fatbike merken.
              </p>
              <p>
                Of u nu komt voor een eenvoudige onderhoudsbeurt of een complexe reparatie - wij zorgen ervoor dat uw fatbike weer 
                optimaal presteert. Na afloop krijgt u een duidelijk overzicht van alle uitgevoerde werkzaamheden en tips voor 
                het onderhouden van uw fatbike. Op alle werkzaamheden geven wij 3 maanden garantie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Same as homepage */}
      <footer className="text-white py-2 sm:py-3 mt-16">
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
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Hulp nodig?</h3>
              <div className="space-y-2 text-white mb-4">
                <p>+31 85 060 4213</p>
                <p>
                  <a href="mailto:claims@fatbikehulp.nl" className="text-white hover:text-white/80 transition-colors">
                    claims@fatbikehulp.nl
                  </a>
                </p>
                <p>Brandermeer 4a, Joure, 8502TV</p>
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
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80">© 2025 Fatbikehulp.nl. Alle rechten voorbehouden.</p>
          </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

