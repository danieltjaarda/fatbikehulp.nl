'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function FatbikeBandenspanningPage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)

  const handleToggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Hoe vaak moet ik de bandenspanning controleren?',
      answer: 'Controleer de bandenspanning minstens één keer per week, of vaker als u dagelijks rijdt. Banden verliezen langzaam lucht, vooral bij temperatuurwisselingen. Een goede bandenspanning zorgt voor optimale prestaties en voorkomt slijtage.'
    },
    {
      question: 'Wat gebeurt er als de bandenspanning te laag is?',
      answer: 'Te lage bandenspanning zorgt voor meer rolweerstand, waardoor u meer moeite moet doen om te trappen. Het verhoogt ook het risico op lekke banden (snijwonden) en slijt de banden ongelijkmatig. Bovendien verbruikt u meer batterij bij een elektrische fatbike.'
    },
    {
      question: 'Wat gebeurt er als de bandenspanning te hoog is?',
      answer: 'Te hoge bandenspanning (boven 1,8 bar / 21 PSI) kan gevaarlijk zijn. Het verhoogt het risico op klapbanden, vermindert het contactoppervlak met de weg (minder grip), en maakt de rit oncomfortabel. Overschrijd nooit de maximale druk die op de band staat.'
    },
    {
      question: 'Moet ik de bandenspanning aanpassen voor verschillende ondergronden?',
      answer: 'Ja, voor zachte ondergronden zoals zand of sneeuw kunt u de druk iets verlagen (bijvoorbeeld 1,2-1,5 bar) voor meer grip. Voor asfalt en harde ondergronden gebruikt u de aanbevolen druk (1,5-1,8 bar). Verhoog de druk nooit boven 1,8 bar.'
    },
    {
      question: 'Hoe weet ik welke bandenspanning ik moet gebruiken?',
      answer: 'Voor 20x4.00 fatbike banden is de aanbevolen druk 1,5-1,8 bar (18-21 PSI). De exacte druk hangt af van uw gewicht, rijstijl en ondergrond. Begin met 1,5 bar en pas aan naar behoefte, maar overschrijd nooit 1,8 bar (21 PSI).'
    },
    {
      question: 'Kan ik een gewone fietspomp gebruiken?',
      answer: 'Ja, u kunt een gewone fietspomp gebruiken, maar zorg ervoor dat deze geschikt is voor Schrader ventielen (de meeste fatbikes gebruiken deze). Een digitale pomp met drukmeting is handiger omdat u de exacte druk kunt zien. Sommige pompen hebben een maximum druk - controleer of deze hoog genoeg is (minimaal 2 bar).'
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
            <span className="ml-4 text-sm text-gray-500">3 december 2024 • 8 min lezen</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
            Fatbike bandenspanning: Juiste druk instellen
          </h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              De juiste bandenspanning is essentieel voor optimale prestaties, comfort en veiligheid van uw fatbike. 
              Voor 20x4.00 banden is de maximale druk <strong>1,8 bar (21 PSI)</strong>. In dit artikel leert u hoe u 
              de bandenspanning controleert en aanpast.
            </p>

            {/* Afbeelding */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src="/fatbike-bandenspanning.png"
                alt="Fatbike bandenspanning controleren en aanpassen"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Belangrijke informatie box */}
            <div className="bg-brand-light rounded-2xl p-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                Bandenspanning voor 20x4.00 fatbike banden
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Aanbevolen druk</p>
                  <p className="text-3xl font-bold text-brand-dark">1,5 - 1,8 bar</p>
                  <p className="text-sm text-gray-600 mt-1">(18 - 21 PSI)</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Maximale druk</p>
                  <p className="text-3xl font-bold text-red-600">1,8 bar</p>
                  <p className="text-sm text-gray-600 mt-1">(21 PSI)</p>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Waarschuwing:</strong> Overschrijd nooit de maximale druk van 1,8 bar (21 PSI). 
                  Te hoge druk kan leiden tot klapbanden en is gevaarlijk.
                </p>
              </div>
            </div>

            {/* Waarom juiste bandenspanning belangrijk is */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Waarom is de juiste bandenspanning belangrijk?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  ✅ Juiste druk (1,5-1,8 bar)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Optimale rolweerstand</li>
                  <li>Goede grip op verschillende ondergronden</li>
                  <li>Comfortabele rit</li>
                  <li>Langere levensduur van de banden</li>
                  <li>Minder batterijverbruik (elektrische fatbike)</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3 text-red-600">
                  ❌ Verkeerde druk
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Te laag: meer rolweerstand, risico op lekke banden</li>
                  <li>Te hoog: risico op klapbanden, minder grip</li>
                  <li>Ongelijke slijtage</li>
                  <li>Oncomfortabele rit</li>
                  <li>Hogere kans op beschadigingen</li>
                </ul>
              </div>
            </div>

            {/* Stappenplan */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Stappenplan: Bandenspanning controleren en aanpassen
            </h2>

            {/* Stap 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#323232' }}>
                    Benodigde materialen verzamelen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    U heeft een fietspomp nodig met drukmeting (manometer). Dit kan een handpomp, voetpomp of 
                    elektrische pomp zijn. Zorg ervoor dat de pomp geschikt is voor Schrader ventielen (de meeste 
                    fatbikes gebruiken deze). Een digitale pomp met drukmeting is het handigst.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Controleer of uw pomp geschikt is voor hoge drukken (minimaal 2 bar). Sommige pompen zijn 
                      alleen geschikt voor lage drukken.
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
                    Huidige bandenspanning controleren
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Sluit de pomp aan op het ventiel en lees de huidige druk af op de manometer. Controleer beide 
                    banden (voor en achter). Noteer de huidige druk zodat u weet hoeveel u moet aanpassen.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Controleer de bandenspanning wanneer de banden koud zijn (niet direct na het rijden). 
                      Warme banden hebben een hogere druk.
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
                    Bandenspanning aanpassen
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Als de druk te laag is, pompt u lucht bij tot de gewenste druk (1,5-1,8 bar). Als de druk te 
                    hoog is, drukt u op het ventiel om lucht te laten ontsnappen, of gebruikt u een drukregelaar. 
                    Controleer regelmatig tijdens het aanpassen met de manometer.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">⚠️ Let op:</p>
                    <p className="text-sm text-gray-600">
                      Overschrijd nooit 1,8 bar (21 PSI). Als u per ongeluk te veel pompt, laat dan voorzichtig 
                      lucht ontsnappen tot de juiste druk.
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
                    Beide banden controleren
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Stel beide banden (voor en achter) in op dezelfde druk, tenzij u een specifieke voorkeur heeft. 
                    Voor de meeste rijders is 1,5-1,8 bar ideaal voor beide banden. Controleer of de druk stabiel 
                    blijft na het aanpassen.
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
                    Testrit maken
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Maak een korte testrit om te voelen of de bandenspanning goed aanvoelt. De banden moeten 
                    comfortabel zijn maar niet te zacht. Als de banden te hard aanvoelen, verlaag dan de druk 
                    iets. Als ze te zacht zijn, verhoog dan de druk.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-600 font-semibold mb-1">💡 Tip:</p>
                    <p className="text-sm text-gray-600">
                      Voor zachte ondergronden (zand, sneeuw) kunt u de druk iets verlagen (1,2-1,5 bar) voor 
                      meer grip. Voor asfalt gebruikt u de aanbevolen druk (1,5-1,8 bar).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Druk aanpassen per situatie */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Bandenspanning aanpassen per situatie
            </h2>

            <div className="space-y-4 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  🏙️ Stadsgebruik / Asfalt
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Druk:</strong> 1,5 - 1,8 bar (18-21 PSI)
                </p>
                <p className="text-sm text-gray-600">
                  Voor dagelijks gebruik op asfalt en verharde wegen. Biedt goede rolweerstand en comfort.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  🏔️ Off-road / Zand / Sneeuw
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Druk:</strong> 1,2 - 1,5 bar (17-18 PSI)
                </p>
                <p className="text-sm text-gray-600">
                  Lagere druk voor meer grip op zachte ondergronden. Verlaag de druk nooit onder 1,0 bar.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  ⚡ Sportief rijden
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Druk:</strong> 1,6 - 1,8 bar (19-21 PSI)
                </p>
                <p className="text-sm text-gray-600">
                  Iets hogere druk voor minder rolweerstand en betere snelheid. Blijf onder de maximale druk van 1,8 bar.
                </p>
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
                Hulp nodig bij bandenspanning?
              </h3>
              <p className="text-gray-700 mb-4">
                Twijfelt u over de juiste bandenspanning of heeft u problemen met uw banden? Onze ervaren technici 
                kunnen u helpen met het controleren en aanpassen van de bandenspanning, of andere bandgerelateerde 
                problemen oplossen.
              </p>
              <Link href="/aanvraag">
                <button className="bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                  Plan afspraak
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

