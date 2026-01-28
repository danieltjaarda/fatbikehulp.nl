'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function HoeLangGaatEenFatbikeMeePage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)

  const handleToggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Wat is de gemiddelde levensduur van een fatbike?',
      answer: 'Een goed onderhouden fatbike kan 5 tot 10 jaar meegaan, afhankelijk van gebruik, onderhoud en kwaliteit. De motor en batterij hebben meestal een levensduur van 3-5 jaar, terwijl het frame en andere onderdelen langer meegaan bij goed onderhoud.'
    },
    {
      question: 'Hoe kan ik de levensduur van mijn fatbike verlengen?',
      answer: 'Regelmatig onderhoud is cruciaal: laad de batterij correct op, houd de ketting schoon en gesmeerd, controleer regelmatig de bandenspanning, en laat jaarlijks een onderhoudsbeurt uitvoeren. Vermijd extreme weersomstandigheden en bewaar de fiets droog.'
    },
    {
      question: 'Wanneer moet ik de batterij vervangen?',
      answer: 'Een fatbike batterij gaat meestal 3-5 jaar mee of 500-1000 laadcycli. Tekenen dat vervanging nodig is: verminderde actieradius, langere laadtijd, of de batterij houdt de lading niet meer goed vast. Regelmatig gebruik en correct opladen verlengt de levensduur.'
    },
    {
      question: 'Hoe vaak moet ik mijn fatbike laten onderhouden?',
      answer: 'Voor optimale levensduur raden we aan om minimaal 1 keer per jaar een onderhoudsbeurt te laten uitvoeren. Bij intensief gebruik (dagelijks) is 2 keer per jaar aan te raden. Dit voorkomt slijtage en verlengt de levensduur aanzienlijk.'
    },
    {
      question: 'Wat zijn de eerste tekenen dat mijn fatbike aan vervanging toe is?',
      answer: 'Tekenen dat vervanging overwogen moet worden: frequente en dure reparaties, verminderde prestaties die niet op te lossen zijn, verouderde technologie die niet meer voldoet, of structurele schade aan het frame. Bij goed onderhoud kan een fatbike echter veel langer meegaan.'
    }
  ]

  const timelineItems = [
    {
      year: 'Jaar 1-2',
      title: 'Nieuwe fatbike',
      description: 'Uw fatbike is in optimale conditie. Alle onderdelen werken perfect en de batterij heeft zijn volledige capaciteit.',
      maintenance: 'Maandelijks: bandenspanning controleren, ketting smeren',
      color: 'bg-green-500'
    },
    {
      year: 'Jaar 3-4',
      title: 'Goede conditie met onderhoud',
      description: 'Bij regelmatig onderhoud blijft uw fatbike in uitstekende staat. De batterij kan wat capaciteit verliezen, maar presteert nog steeds goed.',
      maintenance: 'Jaarlijks: complete onderhoudsbeurt, batterij controle',
      color: 'bg-blue-500'
    },
    {
      year: 'Jaar 5-6',
      title: 'Preventief onderhoud belangrijk',
      description: 'Dit is het moment waarop preventief onderhoud cruciaal wordt. Vervang slijtagedelen tijdig om grotere problemen te voorkomen.',
      maintenance: 'Halfjaarlijks: onderhoudsbeurt, controle op slijtage',
      color: 'bg-yellow-500'
    },
    {
      year: 'Jaar 7-8',
      title: 'Goed onderhouden = nog jaren plezier',
      description: 'Met goed onderhoud kan uw fatbike nog jaren meegaan. Mogelijk moet de batterij worden vervangen, maar het frame en andere onderdelen zijn nog in goede staat.',
      maintenance: 'Halfjaarlijks: uitgebreid onderhoud, batterij mogelijk vervangen',
      color: 'bg-orange-500'
    },
    {
      year: 'Jaar 9+',
      title: 'Lange levensduur mogelijk',
      description: 'Een goed onderhouden fatbike kan 10+ jaar meegaan. Regelmatige vervanging van slijtagedelen en goed onderhoud zijn essentieel.',
      maintenance: 'Halfjaarlijks: volledig onderhoud, vervanging slijtagedelen',
      color: 'bg-red-500'
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
            Hoe lang gaat een fatbike mee?
          </h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Een veelgestelde vraag bij fatbike-eigenaren is: "Hoe lang gaat mijn fatbike mee?" 
              Het antwoord hangt af van verschillende factoren, waaronder gebruik, onderhoud en kwaliteit. 
              In dit artikel leggen we uit wat u kunt verwachten en hoe u de levensduur van uw fatbike kunt verlengen.
            </p>

            {/* Fatbike afbeelding */}
            <div className="my-8 rounded-lg overflow-hidden">
              <Image 
                src="/fatbike.png" 
                alt="Fatbike - Elektrische fatbike met V8 frame en KENDA banden"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                style={{ maxHeight: '600px', objectFit: 'contain' }}
              />
            </div>

            {/* Belangrijke factoren */}
            <div className="bg-brand-light rounded-2xl p-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                Factoren die de levensduur beïnvloeden
              </h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li><strong>Onderhoud:</strong> Regelmatig onderhoud verlengt de levensduur aanzienlijk</li>
                <li><strong>Gebruik:</strong> Intensief dagelijks gebruik versnelt slijtage</li>
                <li><strong>Weersomstandigheden:</strong> Regen, zout en extreme temperaturen kunnen schade veroorzaken</li>
                <li><strong>Kwaliteit:</strong> Een kwalitatief goede fatbike gaat langer mee</li>
                <li><strong>Opslag:</strong> Droge, veilige opslag voorkomt schade</li>
                <li><strong>Batterijverzorging:</strong> Correct opladen verlengt de batterijlevensduur</li>
              </ul>
            </div>

            {/* Timeline */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Levensduur timeline
            </h2>
            <p className="text-gray-700 mb-6">
              Hieronder ziet u een overzicht van wat u kunt verwachten tijdens de levensduur van uw fatbike:
            </p>

            <div className="relative mb-12">
              {/* Verticale lijn */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              {timelineItems.map((item, index) => (
                <div key={index} className="relative mb-8 pl-20">
                  {/* Cirkel */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full ${item.color} border-4 border-white shadow-lg`}></div>
                  
                  {/* Content */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 ${item.color} text-white text-sm font-bold rounded-full`}>
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold" style={{ color: '#323232' }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      {item.description}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Onderhoud:</strong> {item.maintenance}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gemiddelde levensduur per onderdeel */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Levensduur per onderdeel
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  Frame
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>10+ jaar</strong> bij goed onderhoud
                </p>
                <p className="text-sm text-gray-600">
                  Het frame is het meest duurzame onderdeel. Bij goed onderhoud en zonder ongelukken kan het decennia meegaan.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  Batterij
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>3-5 jaar</strong> of 500-1000 laadcycli
                </p>
                <p className="text-sm text-gray-600">
                  De batterij verliest na verloop van tijd capaciteit. Correct opladen en gebruik verlengt de levensduur.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  Motor
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>5-8 jaar</strong> bij normaal gebruik
                </p>
                <p className="text-sm text-gray-600">
                  De motor is over het algemeen betrouwbaar. Regelmatig onderhoud voorkomt problemen.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  Banden
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>2-4 jaar</strong> afhankelijk van gebruik
                </p>
                <p className="text-sm text-gray-600">
                  Banden slijten door gebruik. Controleer regelmatig op slijtage en vervang tijdig.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  Ketting & Tandwielen
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>1-3 jaar</strong> afhankelijk van onderhoud
                </p>
                <p className="text-sm text-gray-600">
                  Regelmatig smeren en schoonmaken verlengt de levensduur aanzienlijk.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#323232' }}>
                  Remmen
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>2-5 jaar</strong> afhankelijk van type
                </p>
                <p className="text-sm text-gray-600">
                  Remblokken slijten sneller, remschijven gaan langer mee. Regelmatige controle is belangrijk.
                </p>
              </div>
            </div>

            {/* Tips voor langere levensduur */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8" style={{ color: '#323232' }}>
              Tips om de levensduur te verlengen
            </h2>

            <div className="space-y-4 mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#323232' }}>
                      Regelmatig onderhoud
                    </h3>
                    <p className="text-gray-700">
                      Laat minimaal 1 keer per jaar een onderhoudsbeurt uitvoeren. Bij intensief gebruik is 2 keer per jaar aan te raden.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#323232' }}>
                      Correct batterijgebruik
                    </h3>
                    <p className="text-gray-700">
                      Laad de batterij niet volledig leeg en niet altijd tot 100%. Bewaar de batterij bij kamertemperatuur en laad regelmatig op.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#323232' }}>
                      Droge opslag
                    </h3>
                    <p className="text-gray-700">
                      Bewaar uw fatbike droog en beschermd tegen weersinvloeden. Een overkapping of schuur is ideaal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#323232' }}>
                      Schoon houden
                    </h3>
                    <p className="text-gray-700">
                      Maak uw fatbike regelmatig schoon, vooral na ritten in regen of modder. Dit voorkomt corrosie en slijtage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#323232' }}>
                      Tijdige reparaties
                    </h3>
                    <p className="text-gray-700">
                      Laat kleine problemen niet verergeren. Tijdige reparaties voorkomen grotere schade en hogere kosten.
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

            {/* CTA Section */}
            <div className="bg-brand-light rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#323232' }}>
                Hulp nodig bij onderhoud?
              </h3>
              <p className="text-gray-700 mb-4">
                Regelmatig onderhoud verlengt de levensduur van uw fatbike aanzienlijk. Onze ervaren technici 
                kunnen u helpen met onderhoud en reparaties. Plan eenvoudig een afspraak via ons online formulier.
              </p>
              <Link href="/aanvraag">
                <button className="bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                  Plan onderhoud
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

