'use client'

import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function KlachtenregelingPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Klachtenregeling
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Heeft u een klacht? Wij staan voor u klaar om dit op te lossen.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Klachtenprocedure */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Klachtenprocedure
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Het kan altijd voorkomen dat er iets niet helemaal gaat zoals gepland. We raden u aan om klachten eerst 
                    bij ons kenbaar te maken door te mailen naar{' '}
                    <a href="mailto:claims@fatbikehulp.nl" className="text-brand-dark hover:text-brand-medium underline font-semibold">
                      claims@fatbikehulp.nl
                    </a>.
                  </p>
                  <p>
                    Leidt dit niet tot een oplossing, dan is het mogelijk om uw geschil aan te melden voor bemiddeling via 
                    WebwinkelKeur via{' '}
                    <a 
                      href="https://www.webwinkelkeur.nl/kennisbank/consumenten/geschil" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-dark hover:text-brand-medium underline font-semibold"
                    >
                      https://www.webwinkelkeur.nl/kennisbank/consumenten/geschil
                    </a>.
                  </p>
                </div>
              </div>

              {/* WebwinkelKeur bemiddeling */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  WebwinkelKeur bemiddeling
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    WebwinkelKeur biedt gratis bemiddeling aan voor klachten die niet in onderling overleg opgelost kunnen worden. 
                    Controleer of deze webwinkel een lopend lidmaatschap heeft via{' '}
                    <a 
                      href="https://www.webwinkelkeur.nl/leden/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-dark hover:text-brand-medium underline font-semibold"
                    >
                      https://www.webwinkelkeur.nl/leden/
                    </a>.
                  </p>
                </div>
              </div>

              {/* Geschillencommissie */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Geschillencommissie
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Mocht er dan nog niet tot een oplossing gekomen worden, heeft de consument de mogelijkheid om zijn klacht 
                    te laten behandelen door de door WebwinkelKeur aangestelde onafhankelijke geschillencommissie. De uitspraak 
                    hiervan is bindend en zowel ondernemer als consument stemmen in met deze bindende uitspraak.
                  </p>
                  <p>
                    Aan het voorleggen van een geschil aan deze geschillencommissie zijn kosten verbonden die door de consument 
                    betaald dienen te worden aan de betreffende commissie.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Neem contact met ons op
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Heeft u een klacht of opmerking? Wij staan voor u klaar om dit op te lossen. Neem gerust contact met ons op.
                  </p>
                  <div className="space-y-2">
                    <p><strong>Telefoon:</strong> +31 85 060 4213</p>
                    <p><strong>Email:</strong> <a href="mailto:claims@fatbikehulp.nl" className="text-brand-dark hover:text-brand-medium underline">claims@fatbikehulp.nl</a></p>
                    <p><strong>Adres:</strong> <Link href="/locatie/joure" className="text-brand-dark hover:text-brand-medium underline">Brandermeer 4a, Joure, 8502TV</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

