'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function FatbikeRemmenVervangenPage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)

  const handleToggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Hoe vaak moet ik mijn remblokken vervangen?',
      answer: 'Remblokken moeten worden vervangen wanneer ze minder dan 1-2mm dik zijn, of wanneer u merkt dat het remmen minder effectief wordt. Bij normaal gebruik is dit meestal na 1000-3000 km, afhankelijk van uw rijstijl en de omstandigheden.'
    },
    {
      question: 'Wat is het verschil tussen organische en metalen remblokken?',
      answer: 'Organische remblokken zijn zachter, stiller en slijten sneller. Ze zijn ideaal voor normaal gebruik. Metalen (sintered) remblokken zijn harder, gaan langer mee en presteren beter bij nat weer, maar kunnen meer geluid maken en slijten de remschijven sneller.'
    },
    {
      question: 'Moet ik ook de remschijven vervangen?',
      answer: 'Remschijven moeten worden vervangen wanneer ze te dun zijn (onder de minimale dikte die op de schijf staat), ernstig beschadigd zijn, of wanneer ze te veel trillen tijdens het remmen. Normaal gesproken gaan remschijven 2-3 keer langer mee dan remblokken.'
    },
    {
      question: 'Kan ik hydraulische remmen zelf vervangen?',
      answer: (
        <>
          Ja, remblokken vervangen bij hydraulische remmen is relatief eenvoudig. Het vervangen van de remleidingen of het ontluchten van het remsysteem is complexer. 
          Voor het vervangen van de remolie in hydraulische remmen, bekijk ons{' '}
          <Link href="/kennisbank/hydraulische-rem-olie-vervangen-fatbike" className="text-brand-dark hover:text-brand-medium underline font-semibold">
            stappenplan voor hydraulische rem olie vervangen
          </Link>.
        </>
      )
    },
    {
      question: 'Hoe weet ik of mijn remmen versleten zijn?',
      answer: 'Tekenen van versleten remmen: verminderde remkracht, piepende of schurende geluiden, trillende remmen, of zichtbare slijtage van de remblokken. Controleer regelmatig de dikte van uw remblokken.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <main>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/kennisbank" className="text-brand-dark hover:text-brand-medium mb-4 inline-block">
            ← Terug naar kennisbank
          </Link>
          
          <div className="mb-6">
            <span className="px-3 py-1 bg-brand-light text-brand-dark text-sm font-semibold rounded-full">
              Reparatie
            </span>
            <span className="ml-4 text-sm text-gray-500">3 december 2024 • 12 min lezen</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
            Fatbike remmen vervangen: Stappenplan
          </h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Goed werkende remmen zijn essentieel voor uw veiligheid. In dit stappenplan leert u hoe u zelf 
              de remblokken, remschijven en hydraulische remmen van uw fatbike kunt vervangen. Volg de stappen 
              zorgvuldig voor een veilige en effectieve reparatie.
            </p>

            {/* Benodigde Materialen */}
            <div className="bg-brand-light rounded-2xl p-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                Benodigde materialen
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Nieuwe remblokken (passend voor uw fatbike model)</li>
                <li>Eventueel nieuwe remschijven</li>
                <li>Inbussleutels (meestal 4mm, 5mm, 6mm)</li>
                <li>Remblok houdertjes (indien nodig)</li>
                <li>Schone doek</li>
                <li>Ontvetter of remmenreiniger</li>
                <li>Eventueel: remvloeistof (voor hydraulische remmen)</li>
                <li>Eventueel: remblok spreader tool</li>
              </ul>
            </div>

            {/* Remblokken sectie */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Remblokken vervangen
            </h2>

            {/* Stap 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Fiets veilig positioneren
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Zet uw fatbike op een werkstandaard of draai deze ondersteboven. Zorg ervoor dat de fiets 
                    stabiel staat en niet kan omvallen. Verwijder het wiel waarvan u de remblokken wilt vervangen.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Let op:</p>
                    <p className="text-sm text-gray-600">
                      Werk nooit aan remmen terwijl het wiel nog op de fiets zit - dit kan gevaarlijk zijn.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stap 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Remblok houdertjes verwijderen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Bij de meeste hydraulische remmen zitten de remblokken in houdertjes. Verwijder de bevestigingsbouten 
                    (meestal 2 inbusschroeven) die de remblok houdertjes op hun plaats houden. Haal voorzichtig de 
                    houdertjes met de oude remblokken eruit.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/remblok-houdertjes.png" 
                      alt="Remblok houdertjes van fatbike remmen"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Leg de bouten en houdertjes op een schone doek zodat u ze niet kwijtraakt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stap 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Oude remblokken verwijderen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Haal de oude remblokken uit de houdertjes. Ze kunnen vastzitten door vuil of corrosie. 
                    Gebruik indien nodig een kleine schroevendraaier om ze los te wrikken. Controleer de 
                    remblokken op slijtage - als ze minder dan 1-2mm dik zijn, moeten ze worden vervangen.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/remblokken-fatbike.png" 
                      alt="Remblokken voor fatbike - versleten en nieuwe remblokken"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stap 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Houdertjes en remschijven reinigen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Reinig de remblok houdertjes grondig met ontvetter of remmenreiniger. Verwijder alle vuil, 
                    olie en oude remblokresten. Reinig ook de remschijven met remmenreiniger en een schone doek. 
                    Zorg ervoor dat er geen olie of vet op de remschijven komt - dit vermindert de remkracht.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/remschijven.png" 
                      alt="Remschijven voor fatbike - controleer op slijtage en beschadiging"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Let op:</p>
                    <p className="text-sm text-gray-600">
                      Raak de remschijven nooit met blote handen aan - huidvet vermindert de remkracht.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stap 5 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Nieuwe remblokken plaatsen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Plaats de nieuwe remblokken in de houdertjes. Zorg ervoor dat ze goed passen en in de 
                    juiste richting staan (meestal staat er een pijl op de remblokken die de rijrichting aangeeft). 
                    Bij hydraulische remmen moet u mogelijk de remzuigers terugduwen voordat u de nieuwe remblokken 
                    kunt plaatsen - gebruik hiervoor een remblok spreader tool of een platte schroevendraaier.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Als de remzuigers niet teruggaan, kan dit betekenen dat er te veel remvloeistof in het systeem zit. 
                      Laat dit door een professional controleren.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stap 6 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Houdertjes terugplaatsen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Plaats de houdertjes met de nieuwe remblokken terug in de remklauw. Zorg ervoor dat de 
                    remblokken goed gecentreerd zijn rond de remschijf. Draai de bevestigingsbouten weer vast 
                    met het juiste koppel (meestal 6-8 Nm). Controleer of de remblokken vrij kunnen bewegen 
                    en niet tegen de remschijf schuren.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/hydraulische-remmen.png" 
                      alt="Hydraulische remmen fatbike - complete remsysteem met remblokken"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stap 7 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Wiel terugplaatsen en testen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Plaats het wiel terug op de fiets en draai de bouten of snelspanner vast. Test de remmen 
                    voorzichtig door de remhendel in te drukken. De remmen moeten direct reageren. Rij de eerste 
                    paar keer voorzichtig en test de remmen op een veilige plek voordat u normaal gaat rijden.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Belangrijk:</p>
                    <p className="text-sm text-gray-600">
                      Nieuwe remblokken hebben een inrijperiode nodig. Rij de eerste 50-100 km voorzichtig en 
                      rem regelmatig om de remblokken in te werken.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Remschijven vervangen sectie */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-12" style={{ color: '#323232' }}>
              Remschijven vervangen (indien nodig)
            </h2>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 mb-4">
                Remschijven moeten worden vervangen wanneer ze te dun zijn (controleer de minimale dikte die op 
                de schijf staat), ernstig beschadigd zijn, of te veel trillen. Om remschijven te vervangen:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>Verwijder het wiel</li>
                <li>Verwijder de oude remschijf (meestal 6 bouten in een stervorm)</li>
                <li>Reinig de naaf waar de remschijf op komt</li>
                <li>Plaats de nieuwe remschijf en draai de bouten vast met het juiste koppel</li>
                <li>Plaats het wiel terug en test de remmen</li>
              </ol>
            </div>

            {/* Veelgestelde Vragen */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-12" style={{ color: '#323232' }}>
              Veelgestelde vragen
            </h2>

            <div className="space-y-4 mb-8">
              {faqItems.map((item, index) => {
                const isOpen = openFAQIndex === index
                
                return (
                  <div 
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleFAQ(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors group"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="text-lg font-semibold pr-8" style={{ color: '#323232' }}>
                        {item.question}
                      </span>
                      <svg
                        className={`w-6 h-6 flex-shrink-0 text-gray-600 transition-transform duration-300 ease-in-out ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    
                    <div
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        maxHeight: isOpen ? '1000px' : '0px',
                      }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Section */}
            <div className="bg-brand-light rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#323232' }}>
                Hulp nodig bij remmen vervangen?
              </h3>
              <p className="text-gray-700 mb-4">
                Remmen zijn cruciaal voor uw veiligheid. Als u twijfelt over het zelf vervangen van remmen, 
                kunnen onze ervaren technici u helpen. Wij komen naar u toe en vervangen uw remmen snel en 
                professioneel.
              </p>
              <Link href="/aanvraag">
                <button className="bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                  Plan reparatie
                </button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

