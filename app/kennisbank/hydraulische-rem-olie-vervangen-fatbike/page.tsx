'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function HydraulischeRemOlieVervangenPage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)

  const handleToggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Hoe vaak moet ik de remolie vervangen?',
      answer: 'Remolie moet meestal elke 1-2 jaar worden vervangen, of wanneer u merkt dat de remmen sponsachtig aanvoelen of minder krachtig zijn. Bij intensief gebruik of na een lek kan dit vaker nodig zijn.'
    },
    {
      question: 'Welke remolie moet ik gebruiken?',
      answer: 'Dit hangt af van uw remsysteem. DOT 4 en DOT 5.1 zijn het meest gebruikelijk voor fietsen. Controleer altijd de specificaties van uw remsysteem - gebruik nooit de verkeerde remolie, dit kan het systeem beschadigen.'
    },
    {
      question: 'Kan ik remolie mengen van verschillende merken?',
      answer: 'Als het dezelfde DOT-classificatie is (bijv. beide DOT 4), kan het meestal. Het is echter beter om dezelfde remolie te gebruiken die al in het systeem zit, of het systeem volledig te spoelen bij het vervangen.'
    },
    {
      question: 'Wat als er lucht in het remsysteem komt?',
      answer: 'Lucht in het remsysteem zorgt voor sponsachtige remmen. Dit moet worden ontlucht door het remsysteem te "bleeden". Volg het ontluchtingsproces in dit stappenplan om lucht te verwijderen.'
    },
    {
      question: 'Moet ik beide remmen tegelijk vervangen?',
      answer: 'Het is aan te raden om beide remmen (voor en achter) tegelijk te onderhouden voor consistente remkracht. Als slechts één rem problemen heeft, kunt u deze eerst vervangen.'
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
              Onderhoud
            </span>
            <span className="ml-4 text-sm text-gray-500">3 december 2024 • 15 min lezen</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
            Hydraulische rem olie vervangen fatbike: Stappenplan
          </h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Het vervangen van remolie in hydraulische remmen is belangrijk voor optimale remkracht en veiligheid. 
              Oude of vervuilde remolie kan leiden tot verminderde remkracht en sponsachtige remmen. In dit stappenplan 
              leert u hoe u zelf de remolie kunt vervangen en het remsysteem kunt ontluchten.
            </p>

            {/* Belangrijke waarschuwing */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-3 text-red-800">
                ⚠️ Belangrijke waarschuwing
              </h2>
              <ul className="list-disc list-inside space-y-2 text-red-700">
                <li>Remolie is giftig en corrosief - vermijd contact met huid en ogen</li>
                <li>Gebruik altijd handschoenen en beschermende kleding</li>
                <li>Gebruik nooit de verkeerde remolie (controleer DOT-classificatie)</li>
                <li>Bij twijfel: laat dit werk door een professional doen</li>
                <li>Test altijd de remmen op een veilige plek na het werk</li>
              </ul>
            </div>

            {/* Benodigde Materialen */}
            <div className="bg-brand-light rounded-2xl p-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                Benodigde materialen
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Nieuwe remolie (DOT 4 of DOT 5.1 - controleer specificaties)</li>
                <li>Ontluchtingsset (met slangetje en flesje)</li>
                <li>Inbussleutels (meestal 4mm, 5mm)</li>
                <li>Flesje voor oude remolie</li>
                <li>Schone doeken</li>
                <li>Handschoenen (rubber of nitril)</li>
                <li>Eventueel: remolie injectiespuit</li>
                <li>Eventueel: remolie reservoir tool</li>
              </ul>
            </div>

            {/* Stappenplan */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Stappenplan: Remolie vervangen
            </h2>

            {/* Stap 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Voorbereiding en veiligheid
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Zet uw fatbike op een werkstandaard. Trek handschoenen aan en zorg voor goede ventilatie. 
                    Controleer welke remolie uw remsysteem nodig heeft (meestal staat dit op de remklauw of in de handleiding). 
                    Zorg ervoor dat u de juiste remolie heeft - gebruik nooit de verkeerde DOT-classificatie.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Leg een oude doek onder de remklauw om te voorkomen dat remolie op de banden of frame komt.
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
                    Oude remolie verwijderen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Verwijder de dop van het remoliereservoir bij de remhendel. Gebruik een injectiespuit of pipet 
                    om zoveel mogelijk oude remolie uit het reservoir te verwijderen. Dep eventuele resten op met een 
                    schone doek. Zorg ervoor dat er geen vuil in het reservoir komt.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/remhendel-hydraulische-rem.png" 
                      alt="Remhendel van hydraulische rem met remoliereservoir"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/olie-voor-remmen.png" 
                      alt="Remolie voor hydraulische remmen - EDGE Hydraulic Mineral Oil"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Let op:</p>
                    <p className="text-sm text-gray-600">
                      Verwijder niet alle remolie - laat een klein laagje staan om te voorkomen dat lucht in het systeem komt.
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
                    Ontluchtingsnippel voorbereiden
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Zoek de ontluchtingsnippel op de remklauw (meestal aan de bovenkant of zijkant). Maak de nippel 
                    schoon met een doek. Bevestig het slangetje van de ontluchtingsset aan de nippel en plaats het 
                    andere uiteinde in een flesje met een beetje remolie (dit voorkomt dat lucht terug in het systeem komt).
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/remklauw-hydraulische-rem.png" 
                      alt="Remklauw van hydraulische rem met ontluchtingsnippel"
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
                    Remolie bijvullen en ontluchten
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Vul het remoliereservoir bij met nieuwe remolie tot het maximum niveau. Druk nu meerdere keren 
                    op de remhendel en houd deze ingedrukt. Terwijl u de remhendel ingedrukt houdt, draait u de 
                    ontluchtingsnippel een kwartslag open met een inbussleutel. U zult zien dat er luchtbellen en 
                    oude remolie uit het slangetje komen. Sluit de nippel weer voordat u de remhendel loslaat.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Herhaal dit proces 10-15 keer totdat er geen luchtbellen meer uitkomen en alleen heldere, 
                      nieuwe remolie zichtbaar is.
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
                    Reservoir niveau controleren
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Tijdens het ontluchten zal het remolieniveau in het reservoir dalen. Vul het regelmatig bij 
                    tot het maximum niveau - laat het reservoir nooit leeglopen, anders komt er lucht in het systeem. 
                    Controleer ook of er geen remolie op de banden of remblokken is gekomen.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Let op:</p>
                    <p className="text-sm text-gray-600">
                      Als er remolie op de remblokken of remschijven komt, moet u deze grondig reinigen met remmenreiniger, 
                      anders verliezen de remmen hun kracht.
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
                    Remhendel testen en afwerken
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Test de remhendel - deze moet stevig aanvoelen zonder sponsachtig gevoel. Als de remhendel nog 
                    sponsachtig aanvoelt, herhaal dan het ontluchtingsproces. Zet de dop weer op het reservoir en 
                    verwijder het slangetje van de ontluchtingsnippel. Maak eventuele gemorste remolie grondig schoon.
                  </p>
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
                    Remmen testen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Test de remmen voorzichtig op een veilige plek voordat u normaal gaat rijden. De remmen moeten 
                    direct en krachtig reageren. Als de remmen nog steeds sponsachtig aanvoelen of niet goed werken, 
                    kan er nog lucht in het systeem zitten - herhaal het ontluchtingsproces of laat een professional 
                    het controleren.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Belangrijk:</p>
                    <p className="text-sm text-gray-600">
                      Rij nooit weg met remmen die niet goed werken. Test altijd eerst op een veilige plek.
                    </p>
                  </div>
                </div>
              </div>
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

            {/* Gerelateerde artikelen */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#323232' }}>
                Gerelateerde artikelen
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/kennisbank/fatbike-remmen-vervangen" className="text-brand-dark hover:text-brand-medium underline font-semibold">
                    Fatbike remmen vervangen: Stappenplan
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-brand-light rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#323232' }}>
                Hulp nodig bij remolie vervangen?
              </h3>
              <p className="text-gray-700 mb-4">
                Het vervangen van remolie kan complex zijn. Als u twijfelt of als de remmen niet goed werken na 
                het werk, kunnen onze ervaren technici u helpen. Wij komen naar u toe en zorgen ervoor dat uw 
                remmen perfect werken.
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

