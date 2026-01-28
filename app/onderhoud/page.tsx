'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function OnderhoudPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fatbike Onderhoud aan Huis',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Fatbikehulp.nl',
      image: 'https://www.fatbikehulp.nl/fatbikehulp-logo-3.png',
      '@id': 'https://www.fatbikehulp.nl/#organization',
      url: 'https://www.fatbikehulp.nl',
      telephone: '+31850604213',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Brandermeer 4a',
        addressLocality: 'Joure',
        postalCode: '8502TV',
        addressCountry: 'NL',
        addressRegion: 'Friesland',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '164',
        bestRating: '5',
        worstRating: '1',
      },
    },
    serviceType: 'Fatbike Onderhoud',
    areaServed: {
      '@type': 'Country',
      name: 'Nederland',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'BASIC Onderhoud',
        price: '79.00',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'PREMIUM Onderhoud',
        price: '129.00',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'DELUXE Onderhoud',
        price: '179.00',
        priceCurrency: 'EUR',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
{/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Fatbike Onderhoud aan Huis
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Regelmatig onderhoud zorgt ervoor dat uw fatbike optimaal blijft presteren en langer meegaat. 
              Onze ervaren technici komen naar u toe voor professioneel onderhoud op locatie.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Waarom regelmatig onderhoud?
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Langer meegaan van uw fatbike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Voorkomen van kostbare reparaties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Optimale prestaties en veiligheid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professionele controle van alle onderdelen</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Wat doen wij tijdens onderhoud?
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ketting smeren en remmen afstellen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Versnellingen afstellen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Alle moeren, bouten en wielas strak draaien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Accu check en verlichting controleren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Banden oppompen en algemene controle</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Onderhoud op locatie tekst */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Onderhoud op locatie
                </h2>
                <p className="text-gray-700 mb-4">
                  Wij komen naar u toe! Onze ervaren technici voeren het onderhoud uit op uw locatie, 
                  zodat u geen omkijken heeft. Binnen 3 dagen staan wij op uw stoep, waar u ook bent in Nederland.
                </p>
                <p className="text-gray-700 mb-6">
                  Bekijk onze <Link href="/tarieven" className="text-brand-dark hover:text-brand-medium underline font-semibold">tarieven pagina</Link> voor 
                  een overzicht van onze onderhoudsbeurten en prijzen. We bieden verschillende pakketten aan, 
                  van basic onderhoud tot een complete deluxe service.
                </p>
                <Link href="/aanvraag">
                  <button className="bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                    Plan nu uw onderhoud
                  </button>
                </Link>
              </div>

              {/* Werkplaats Image */}
              <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <div className="relative aspect-square w-full">
                  <Image 
                    src="/v8-werkplaats.png" 
                    alt="Moderne werkplaats met V8 fatbikes voor onderhoud en reparatie - Professionele serviceomgeving" 
                    fill
                    className="object-cover"
                  />
                </div>
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
              Professioneel fatbike onderhoud verlengt de levensduur en prestaties
            </h2>
            <div className="text-gray-700 space-y-6 text-lg leading-relaxed">
              <p>
                Regelmatig onderhoud is essentieel voor het behoud van uw fatbike. Net als een auto heeft ook een fatbike 
                periodiek onderhoud nodig om optimaal te blijven presteren. Onze <strong>onderhoudsbeurten</strong> zijn speciaal 
                ontwikkeld voor elektrische fatbikes en zorgen ervoor dat alle mechanische en elektrische componenten in perfecte 
                staat blijven.
              </p>
              <p>
                Tijdens een onderhoudsbeurt controleren onze ervaren technici alle kritieke onderdelen: van de ketting en versnellingen 
                tot de remmen, banden en elektrische systemen. We smeren bewegende delen, stellen remmen en versnellingen af, controleren 
                de batterijgezondheid en testen alle elektronische componenten. Dit voorkomt niet alleen onverwachte storingen, maar 
                zorgt er ook voor dat uw fatbike soepel en veilig blijft rijden.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#323232' }}>
                Wanneer heeft uw fatbike onderhoud nodig?
              </h3>
              <p>
                Wij adviseren om uw fatbike minimaal <strong>één keer per jaar</strong> te laten onderhouden, of na elke 1000-1500 
                kilometer. Heeft u veel gereden in natte of modderige omstandigheden? Dan kan extra onderhoud nodig zijn. Ook na 
                de winterperiode is een grondige controle aan te raden, omdat zout en vocht extra slijtage kunnen veroorzaken. 
                Lees meer in ons artikel over <Link href="/blogs/wanneer-fatbike-laten-onderhouden" className="text-brand-dark hover:text-brand-medium underline font-semibold">wanneer u uw fatbike moet laten onderhouden</Link> en 
                <Link href="/blogs/winter-onderhoud-fatbike" className="text-brand-dark hover:text-brand-medium underline font-semibold">winter onderhoud</Link>.
              </p>
              <p>
                Onze onderhoudspakketten zijn beschikbaar in verschillende niveaus, van een <Link href="/tarieven" className="text-brand-dark hover:text-brand-medium underline font-semibold">BASIC onderhoud</Link> 
                tot een complete <strong>DELUXE revisie</strong>. Kies het pakket dat het beste bij uw gebruik en budget past. 
                Alle onderhoud wordt uitgevoerd door gecertificeerde technici met hoogwaardige materialen, en wij bieden 
                <strong>3 maanden garantie</strong> op alle uitgevoerde werkzaamheden. Voor meer tips over zelf onderhoud, bekijk onze 
                <Link href="/blogs/hoe-onderhoud-je-een-fatbike" className="text-brand-dark hover:text-brand-medium underline font-semibold">onderhoudsgids</Link>.
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
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
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

