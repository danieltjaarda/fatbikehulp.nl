'use client'

import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function HerroepingsrechtPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Herroepingsrecht
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              U heeft het recht uw bestelling te annuleren binnen 14 dagen na ontvangst zonder opgave van reden.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Herroepingsrecht */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Uw herroepingsrecht
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    U heeft het recht uw bestelling tot 14 dagen na de dag van ontvangst zonder opgave van reden te annuleren. 
                    U heeft na annulering nogmaals 14 dagen om uw product retour te sturen. U krijgt dan het volledige 
                    orderbedrag inclusief verzendkosten gecrediteerd. Enkel de kosten voor retour van u thuis naar de webwinkel 
                    zijn voor eigen rekening. Deze kosten bedragen circa €7,25 per pakket, raadpleeg voor de exacte tarieven de 
                    website van uw vervoerder.
                  </p>
                  <p>
                    <Link href="/algemene-voorwaarden" className="text-brand-dark hover:text-brand-medium underline font-semibold">
                      Klik hier om meer te lezen over maatwerkproducten en uitzonderingen
                    </Link>
                  </p>
                </div>
              </div>

              {/* Voorwaarden retour */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Voorwaarden voor retour
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Indien u gebruik maakt van uw herroepingsrecht, zal het product met alle geleverde toebehoren en – indien 
                    redelijkerwijze mogelijk – in de originele staat en verpakking aan de ondernemer geretourneerd worden. 
                    Mocht het product beschadigd of de verpakking meer beschadigd zijn dan nodig is om het product te verkopen, 
                    dan kunnen we deze waardevermindering van het product aan u doorberekenen. Behandel het product dus met zorg 
                    en zorg ervoor dat deze bij een retour goed verpakt is.
                  </p>
                </div>
              </div>

              {/* Hoe te annuleren */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Hoe kunt u annuleren?
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Om gebruik te maken van dit recht kunt u contact met ons opnemen via{' '}
                    <a href="mailto:claims@fatbikehulp.nl" className="text-brand-dark hover:text-brand-medium underline font-semibold">
                      claims@fatbikehulp.nl
                    </a>. 
                    Wij zullen vervolgens het verschuldigde orderbedrag binnen 14 dagen na aanmelding van uw retour terugstorten, 
                    mits het product reeds in goede orde retour ontvangen is.
                  </p>
                </div>
              </div>

              {/* Uitzonderingen */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Uitzonderingen
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Het herroepingsrecht geldt niet voor:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maatwerkproducten die specifiek voor u zijn gemaakt</li>
                    <li>Producten die snel bederven of waarvan de houdbaarheidsdatum is verstreken</li>
                    <li>Producten die na levering onherroepelijk vermengd zijn met andere producten</li>
                    <li>Diensten die volledig zijn uitgevoerd met uw uitdrukkelijke toestemming</li>
                  </ul>
                  <p>
                    Voor meer informatie over uitzonderingen op het herroepingsrecht, kunt u de{' '}
                    <Link href="/algemene-voorwaarden" className="text-brand-dark hover:text-brand-medium underline font-semibold">
                      algemene voorwaarden
                    </Link>{' '}
                    raadplegen.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Vragen over het herroepingsrecht?
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Heeft u vragen over het herroepingsrecht of wilt u een bestelling annuleren? Neem gerust contact met ons op.
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

