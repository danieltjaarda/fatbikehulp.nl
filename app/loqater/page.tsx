'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function LoqaterPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: 'Hoe werkt een Loqater peilzender?',
      answer: 'Een Loqater peilzender werkt op radiofrequentie en zendt continu een signaal uit. Via de Loqater app kunt u de exacte locatie van uw fatbike zien. Bij diefstal neemt u contact op met de 24/7 meldkamer, die vervolgens het recovery team inschakelt om samen met de politie uw fatbike terug te halen.'
    },
    {
      question: 'Waarom Loqater en geen AirTag?',
      answer: 'Loqater heeft verschillende voordelen ten opzichte van een AirTag: de batterij gaat 3 jaar lang mee (in plaats van 1 jaar), werkt op radiofrequentie die dieven niet kunnen opsporen of blokkeren, en heeft een terugvindkans van 97%. Bovendien biedt Loqater een professioneel recovery team en 24/7 meldkamer.'
    },
    {
      question: 'Wat zijn de kosten voor een Loqater peilzender?',
      answer: 'De Loqater peilzender kost €120. Daarnaast worden €50 voorrijkosten in rekening gebracht voor het plaatsen op locatie. Totaal betaalt u dus €170. Daarnaast is er een maandelijks abonnement van €5 per maand voor de service.'
    },
    {
      question: 'Hoe lang gaat de batterij mee?',
      answer: 'De batterij van een Loqater peilzender gaat 3 jaar lang mee. Dit is aanzienlijk langer dan bijvoorbeeld een AirTag, die ongeveer 1 jaar meegaat. Na 3 jaar kan de batterij worden vervangen.'
    },
    {
      question: 'Kan ik mijn fatbike verzekeren met Loqater?',
      answer: 'Ja, met Loqater kunt u uw fatbike ook verzekeren. Dit biedt extra bescherming naast de tracking functionaliteit. Neem contact met ons op voor meer informatie over de verzekeringsmogelijkheden.'
    },
    {
      question: 'Wat gebeurt er bij diefstal?',
      answer: 'Bij diefstal neemt u direct contact op met de 24/7 meldkamer van Loqater. Het recovery team wordt dan ingeschakeld en gaat naar de locatie van uw fatbike. In samenwerking met de politie wordt uw fatbike teruggehaald. De terugvindkans met Loqater is 97%.'
    },
    {
      question: 'Kunnen dieven het signaal blokkeren?',
      answer: 'Nee, Loqater werkt op radiofrequentie die niet kan worden geblokkeerd of opgespoord door dieven. Dit is een belangrijk voordeel ten opzichte van andere tracking systemen die op Bluetooth werken.'
    },
    {
      question: 'Hoe wordt de Loqater geplaatst?',
      answer: 'Onze technici plaatsen de Loqater peilzender op locatie bij u thuis of op een andere gewenste locatie. De plaatsing is discreet en professioneel, zodat de zender niet zichtbaar is maar wel optimaal functioneert.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
<main>
        {/* Hero Section */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-6">
                  <Image
                    src="/loqater-logo-zwart.webp"
                    alt="Loqater logo - Beveilig uw tweewieler tegen diefstal"
                    width={300}
                    height={100}
                    className="h-16 w-auto mb-4"
                    priority
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
                  Loqater GPS Tracker voor Fatbike Bescherming
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Bescherm uw fatbike tegen diefstal met een professionele Loqater peilzender. 
                  Met een terugvindkans van 97% en 24/7 monitoring is dit de beste bescherming voor uw investering.
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-black">
                <Image
                  src="/loqater.png"
                  alt="Loqater peilzender - Beveilig uw tweewieler tegen diefstal met 97% terugvindkans"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Voordelen Section */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ color: '#323232' }}>
              Waarom kiezen voor Loqater?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2" style={{ color: '#456882' }}>97%</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#323232' }}>Terugvindkans</h3>
                <p className="text-gray-700">
                  Met Loqater heeft u een terugvindkans van 97% bij diefstal van uw fatbike.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2" style={{ color: '#456882' }}>3 jaar</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#323232' }}>Batterijduur</h3>
                <p className="text-gray-700">
                  De batterij gaat 3 jaar lang mee, veel langer dan andere tracking systemen.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#323232' }}>Radiofrequentie</h3>
                <p className="text-gray-700">
                  Werkt op radiofrequentie die dieven niet kunnen opsporen of blokkeren.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#323232' }}>24/7 Meldkamer</h3>
                <p className="text-gray-700">
                  Professioneel recovery team en 24/7 meldkamer voor directe actie bij diefstal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hoe werkt het Section */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ color: '#323232' }}>
              Hoe werkt Loqater?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#323232' }}>
                  Plaatsing op locatie
                </h3>
                <p className="text-gray-700 text-center">
                  Onze technici plaatsen de Loqater peilzender discreet op uw fatbike op uw locatie. 
                  De plaatsing is professioneel en onzichtbaar.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#323232' }}>
                  Tracking via app
                </h3>
                <p className="text-gray-700 text-center">
                  Via de Loqater app kunt u altijd de exacte locatie van uw fatbike zien. 
                  Het signaal werkt op radiofrequentie en kan niet worden geblokkeerd.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#323232' }}>
                  Recovery bij diefstal
                </h3>
                <p className="text-gray-700 text-center">
                  Bij diefstal neemt u contact op met de 24/7 meldkamer. Het recovery team gaat 
                  naar de locatie en haalt uw fatbike terug in samenwerking met de politie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waarom Loqater vs AirTag Section */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-black rounded-2xl p-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center" style={{ color: '#323232' }}>
                Waarom Loqater en geen AirTag?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: '#456882' }}>
                    Loqater voordelen
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Batterij gaat 3 jaar lang mee (vs 1 jaar bij AirTag)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Werkt op radiofrequentie (niet te blokkeren)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">97% terugvindkans</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">24/7 meldkamer en professioneel recovery team</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Mogelijkheid tot verzekering van uw fatbike</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: '#323232' }}>
                    AirTag beperkingen
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Batterij gaat slechts 1 jaar mee</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Werkt op Bluetooth (kan worden geblokkeerd)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Geen professioneel recovery team</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Minder betrouwbaar voor waardevolle objecten</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prijzen Section */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ color: '#323232' }}>
              Prijzen
            </h2>
            <div className="max-w-2xl mx-auto bg-white border-2 border-black rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-lg text-gray-700">Loqater peilzender</span>
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>€120</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-lg text-gray-700">Voorrijkosten (plaatsing op locatie)</span>
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>€50</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-semibold" style={{ color: '#323232' }}>Totaal eenmalig</span>
                  <span className="text-3xl font-bold" style={{ color: '#456882' }}>€170</span>
                </div>
                <div className="mt-6 pt-6 border-t-2 border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-700">Maandelijks abonnement</span>
                    <span className="text-2xl font-bold" style={{ color: '#456882' }}>€5/maand</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Voor 24/7 monitoring, meldkamer en recovery service
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="https://wa.me/31850604213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors bg-[#456882] hover:bg-[#3a5a6f]"
                >
                  Aanvragen
                </a>
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
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold" style={{ color: '#323232' }}>
                      {faq.question}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-600 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4 text-gray-700">
                      <p className="leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-light rounded-2xl p-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#323232' }}>
                Bescherm uw fatbike met Loqater
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Met een terugvindkans van 97% en professioneel recovery team is Loqater de beste 
                bescherming voor uw waardevolle fatbike. Bestel nu en laat de peilzender op locatie plaatsen.
              </p>
              <a
                href="https://wa.me/31850604213"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-medium text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-dark transition-colors"
              >
                Aanvragen
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Same as homepage */}
      <footer className="text-white py-2 sm:py-3 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="px-6 sm:px-8 lg:px-12 py-12">
              <div className="mb-8">
                <Link href="/">
                  <div className="inline-block bg-white rounded-lg p-2">
                    <Image 
                      src="/fatbikehulp-logo-kerst.png" 
                      alt="Fatbikehulp.nl logo - Professionele fatbike reparatie en onderhoud service" 
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
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors mb-4"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </a>
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

