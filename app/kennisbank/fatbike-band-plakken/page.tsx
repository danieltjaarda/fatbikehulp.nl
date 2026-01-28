'use client'

import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function FatbikeBandPlakkenPage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)

  const handleToggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Hoe lang duurt het voordat een geplakte band weer gebruikt kan worden?',
      answer: 'Wacht minimaal 10-15 minuten na het plakken voordat u de band oppompt. Dit geeft de lijm tijd om goed te hechten. Voor het beste resultaat wacht u 24 uur voordat u langere ritten maakt.'
    },
    {
      question: 'Wanneer moet ik de binnenband vervangen in plaats van plakken?',
      answer: 'Vervang de binnenband als er meerdere lekken zijn, als het lek te groot is (meer dan 5mm), of als de binnenband al meerdere keren is geplakt. Een nieuwe binnenband is betrouwbaarder en kost niet veel.'
    },
    {
      question: 'Kan ik een geplakte band nog lang gebruiken?',
      answer: 'Een goed geplakte band kan jarenlang meegaan. Controleer regelmatig de druk en let op tekenen van nieuwe lekken. Als u merkt dat de band regelmatig leegloopt, controleer dan op nieuwe lekken of overweeg een nieuwe binnenband.'
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
            <span className="ml-4 text-sm text-gray-500">3 december 2024 • 10 min lezen</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
            Fatbike band plakken: Stappenplan
          </h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Een lekke band is vervelend, maar met dit stappenplan kunt u zelf eenvoudig uw fatbike band plakken. 
              Volg de onderstaande stappen en u bent binnen 30 minuten weer op weg.
            </p>

            {/* Benodigde Materialen */}
            <div className="bg-brand-light rounded-2xl p-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                Benodigde materialen
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Plakset voor binnenbanden (met plakkers en lijm)</li>
                <li>Fietspomp</li>
                <li>Bandlichters (2 stuks)</li>
                <li>Emmer met water (om het lek te vinden)</li>
                <li>Schone doek</li>
                <li>Eventueel: reserve binnenband</li>
              </ul>
            </div>

            {/* Stappenplan */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Stappenplan: Band plakken
            </h2>

            {/* Stap 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Fiets omdraaien en wiel verwijderen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Zet uw fatbike ondersteboven op een stabiele ondergrond. Verwijder het wiel door de 
                    snelspanner los te draaien of de bouten los te maken. Let op: bij een achterwiel moet u 
                    mogelijk de ketting loskoppelen.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Leg een zachte doek onder de fiets om krassen te voorkomen.
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
                    Buitenband verwijderen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Gebruik de bandlichters om de buitenband van de velg te halen. Begin aan één kant en 
                    werk voorzichtig rondom. Haal de binnenband eruit en controleer deze op beschadigingen.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/buitenband-fatbike.png" 
                      alt="Buitenband verwijderen van fatbike velg met bandlichters"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Let op:</p>
                    <p className="text-sm text-gray-600">
                      Wees voorzichtig met de bandlichters om de binnenband niet te beschadigen.
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
                    Lek lokaliseren
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Pomp de binnenband op en houd deze onder water. Waar luchtbelletjes verschijnen, zit het lek. 
                    Markeer de plek met een pen of marker. Controleer ook de buitenband op scherpe voorwerpen 
                    zoals glasscherven of spijkers.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/lekkeband-fatbike.png" 
                      alt="Lek lokaliseren in fatbike binnenband door onder water te houden"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Als u meerdere lekken vindt, is het soms beter om de binnenband te vervangen.
                    </p>
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
                    Lekke plek voorbereiden
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Droog de binnenband goed af rondom het lek. Schuur het gebied rondom het lek lichtjes op 
                    met het schuurpapier uit de plakset. Dit zorgt voor een betere hechting van de plakker. 
                    Maak het gebied schoon met een schone doek.
                  </p>
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
                    Plakker aanbrengen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Breng een dunne laag lijm aan op de geschuurde plek. Wacht 2-3 minuten tot de lijm 
                    kleverig wordt (niet volledig droog). Plak de plakker stevig op de plek en druk deze 
                    goed aan. Zorg ervoor dat er geen luchtbellen onder de plakker zitten.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Gebruik een plakker die minstens 1 cm groter is dan het lek aan alle kanten.
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
                    Binnenband terugplaatsen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Wacht 5-10 minuten voordat u de binnenband terugplaatst. Dit geeft de lijm tijd om 
                    goed te hechten. Plaats de binnenband terug in de buitenband en zorg ervoor dat deze 
                    niet gedraaid is. Begin met het plaatsen van de buitenband aan één kant van de velg.
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/binnenband-fatbike.png" 
                      alt="Binnenband terugplaatsen in fatbike buitenband"
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
                    Buitenband monteren
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Werk de buitenband voorzichtig over de velg met de bandlichters. Zorg ervoor dat de 
                    binnenband niet klem komt te zitten tussen de velg en de buitenband. Controleer of 
                    de buitenband goed gecentreerd op de velg ligt.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Let op:</p>
                    <p className="text-sm text-gray-600">
                      Controleer of er geen scherpe voorwerpen meer in de buitenband zitten voordat u 
                      de band terugplaatst.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stap 8 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  8
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Band oppompen en testen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Pomp de band op tot de aanbevolen druk (meestal staat dit op de zijkant van de band). 
                    Laat de band 10-15 minuten staan en controleer of de druk behouden blijft. Als de band 
                    leegloopt, controleer dan of de plakker goed zit of of er nog een lek is.
                  </p>
                </div>
              </div>
            </div>

            {/* Stap 9 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  9
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Wiel terugplaatsen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Als de band goed op druk blijft, plaats dan het wiel terug op de fiets. Zorg ervoor 
                    dat het wiel goed gecentreerd staat en de snelspanner of bouten goed vast zitten. 
                    Test de remmen en controleer of alles goed werkt.
                  </p>
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

            {/* CTA Section */}
            <div className="bg-brand-light rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#323232' }}>
                Hulp nodig bij het plakken?
              </h3>
              <p className="text-gray-700 mb-4">
                Lukt het niet om de band zelf te plakken, of heeft u liever dat een professional het doet? 
                Onze ervaren technici komen naar u toe en repareren uw fatbike snel en professioneel.
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

