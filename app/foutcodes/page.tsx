'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function FoutcodesPage() {
  const [openCode, setOpenCode] = useState<string | null>(null)

  const toggleCode = (code: string) => {
    setOpenCode(openCode === code ? null : code)
  }

  const foutcodes = [
    {
      code: 'E01',
      titel: 'Motor communicatiefout',
      beschrijving: 'Er is een probleem met de communicatie tussen de motor en het display. Dit kan worden veroorzaakt door losse kabels, een defecte motorcontroller of een probleem met de bedrading.',
      oplossing: 'Controleer alle kabelverbindingen, reset het systeem door de accu te verwijderen en opnieuw aan te sluiten. Als het probleem aanhoudt, neem contact op met onze technici.'
    },
    {
      code: 'E02',
      titel: 'Accu laadfout',
      beschrijving: 'De accu kan niet correct worden opgeladen. Dit kan duiden op een probleem met de accu zelf, de lader of de verbinding tussen beide.',
      oplossing: 'Controleer of de lader correct is aangesloten en of de accu goed in de houder zit. Probeer een andere lader indien mogelijk. Laat de accu controleren door een professional.'
    },
    {
      code: 'E03',
      titel: 'Oververhitting motor',
      beschrijving: 'De motor is oververhit geraakt, vaak door langdurig gebruik op hoge vermogens of zware belasting. Het systeem heeft zichzelf uitgeschakeld ter bescherming.',
      oplossing: 'Laat de motor afkoelen voor minimaal 15 minuten. Controleer of er geen belemmeringen zijn die de koeling blokkeren. Vermijd langdurig gebruik op maximale ondersteuning.'
    },
    {
      code: 'E04',
      titel: 'Hall sensor fout',
      beschrijving: 'De Hall sensoren in de motor geven geen of verkeerde signalen door. Deze sensoren zijn essentieel voor de juiste werking van de motor.',
      oplossing: 'Dit probleem vereist professionele reparatie. De Hall sensoren moeten worden gecontroleerd en mogelijk vervangen. Neem contact op voor een afspraak.'
    },
    {
      code: 'E05',
      titel: 'Throttle fout',
      beschrijving: 'Er is een probleem met de gashendel (throttle). Dit kan een losse kabel, een defecte sensor of een probleem met de bedrading zijn.',
      oplossing: 'Controleer of de throttle goed is aangesloten. Test of de throttle reageert. Als er geen reactie is, kan de throttle defect zijn en moet deze worden vervangen.'
    },
    {
      code: 'E06',
      titel: 'Brake sensor fout',
      beschrijving: 'De remsensor detecteert continu dat de remmen ingedrukt zijn, ook wanneer dit niet het geval is. Dit voorkomt dat de motor kan worden geactiveerd.',
      oplossing: 'Controleer of de remkabels correct zijn afgesteld. Controleer de remsensoren op vuil of beschadiging. Stel de remmen opnieuw af indien nodig.'
    },
    {
      code: 'E07',
      titel: 'Display communicatiefout',
      beschrijving: 'Het display kan niet communiceren met de motorcontroller. Dit kan worden veroorzaakt door losse verbindingen of een defect display.',
      oplossing: 'Controleer alle kabelverbindingen naar het display. Reset het systeem door de accu te verwijderen. Als het probleem aanhoudt, kan het display defect zijn.'
    },
    {
      code: 'E08',
      titel: 'Accu spanning te laag',
      beschrijving: 'De accu heeft een te lage spanning, wat kan duiden op een lege accu, een defecte accu of een probleem met de laadcircuits.',
      oplossing: 'Laad de accu volledig op. Als de accu niet oplaadt, controleer de lader en de accuverbindingen. Een accu met te lage spanning kan permanent beschadigd zijn.'
    },
    {
      code: 'E09',
      titel: 'Accu spanning te hoog',
      beschrijving: 'De accu heeft een te hoge spanning, wat kan duiden op een probleem met de laadregeling of een defecte accu.',
      oplossing: 'Stop onmiddellijk met het gebruik van de accu. Dit kan gevaarlijk zijn. Laat de accu controleren door een professional. Gebruik de accu niet tot het probleem is opgelost.'
    },
    {
      code: 'E10',
      titel: 'Temperatuursensor fout',
      beschrijving: 'De temperatuursensor in de motor of accu geeft geen of verkeerde waarden door. Dit kan de veiligheidsfuncties beïnvloeden.',
      oplossing: 'Dit vereist professionele diagnose. De temperatuursensor moet worden gecontroleerd en mogelijk vervangen. Neem contact op voor reparatie.'
    },
    {
      code: 'E11',
      titel: 'Speed sensor fout',
      beschrijving: 'De snelheidssensor geeft geen of verkeerde signalen door. Dit kan de ondersteuning beïnvloeden en de snelheidsbegrenzing.',
      oplossing: 'Controleer of de snelheidssensor goed is gemonteerd en of de magneet op het wiel correct is geplaatst. Reinig de sensor indien nodig.'
    },
    {
      code: 'E12',
      titel: 'Motor blokkering',
      beschrijving: 'De motor kan niet draaien, mogelijk door een mechanische blokkade, een defecte motor of een probleem met de controller.',
      oplossing: 'Controleer of het wiel vrij kan draaien zonder weerstand. Test of de motor handmatig kan worden gedraaid. Neem contact op voor professionele diagnose.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
{/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Fatbike Foutcodes E01-E12 Oplossen
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Ziet u een foutcode op het display van uw fatbike? Hier vindt u een overzicht van de meest voorkomende 
              foutcodes en wat deze betekenen. Klik op een foutcode voor meer informatie en mogelijke oplossingen.
            </p>
          </div>
        </section>

        {/* Foutcodes Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {foutcodes.map((foutcode) => (
                <div key={foutcode.code} className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => toggleCode(foutcode.code)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold" style={{ color: '#323232' }}>{foutcode.code}</span>
                      <span className="text-lg font-semibold" style={{ color: '#323232' }}>{foutcode.titel}</span>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-600 transition-transform ${openCode === foutcode.code ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openCode === foutcode.code ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4 text-gray-700">
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2" style={{ color: '#323232' }}>Beschrijving:</h3>
                        <p>{foutcode.beschrijving}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: '#323232' }}>Mogelijke oplossing:</h3>
                        <p>{foutcode.oplossing}</p>
                      </div>
                      <div className="mt-4">
                        <Link href="/aanvraag">
                          <button className="bg-brand-medium text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors">
                            Plan reparatie
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hulp nodig sectie */}
            <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 mt-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                Hulp nodig met een foutcode?
              </h2>
              <p className="text-gray-700 mb-6">
                Ziet u een foutcode die hier niet bij staat? Of heeft u de suggesties geprobeerd maar werkt uw fatbike nog steeds niet? 
                Onze ervaren technici kunnen u helpen. Plan een afspraak via ons <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">online formulier</Link> 
                en wij komen naar u toe om het probleem op te lossen.
              </p>
              <p className="text-gray-700 mb-6">
                Binnen 3 dagen staan wij op uw stoep, waar u ook bent in Nederland. Onze technici hebben ervaring met alle soorten 
                fatbikes en kunnen de meeste problemen snel oplossen.
              </p>
              <Link href="/aanvraag">
                <button className="bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                  Plan nu een reparatie
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

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

