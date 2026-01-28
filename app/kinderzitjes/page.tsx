'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function KinderzitjesPage() {
  return (
    <div className="min-h-screen bg-white">
<main>
        {/* Hero Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Kinderzitjes Plaatsen op Fatbike aan Huis
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
              Veilig vervoer van uw kinderen op de fatbike. Onze ervaren technici plaatsen professioneel 
              een kinderezitje op uw fatbike op locatie. Zo kunt u samen met uw kinderen genieten van 
              mooie fietstochten.
            </p>
          </div>
        </section>

        {/* Merken Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center" style={{ color: '#323232' }}>
              Merken die wij plaatsen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#456882' }}>Qibbel</h3>
                <p className="text-gray-700">
                  Qibbel kinderezitjes zijn bekend om hun veiligheid en comfort. Wij plaatsen alle 
                  Qibbel modellen professioneel op uw fatbike.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#456882' }}>Boobike</h3>
                <p className="text-gray-700">
                  Boobike kinderezitjes bieden uitstekende kwaliteit en zijn geschikt voor verschillende 
                  fietsmodellen, inclusief fatbikes.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#456882' }}>Urban Iki</h3>
                <p className="text-gray-700">
                  Urban Iki kinderezitjes zijn modern en functioneel. Onze technici plaatsen deze 
                  met zorg en aandacht voor detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Voordelen Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center" style={{ color: '#323232' }}>
              Waarom een kinderezitje laten plaatsen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#323232' }}>
                  Veilige plaatsing
                </h3>
                <p className="text-gray-700">
                  Onze technici plaatsen het kinderezitje professioneel en veilig. Alle bevestigingen 
                  worden gecontroleerd en getest voordat u op pad gaat.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#323232' }}>
                  Op locatie
                </h3>
                <p className="text-gray-700">
                  Wij komen naar u toe! U hoeft niet naar een werkplaats te rijden. Onze technici 
                  plaatsen het kinderezitje bij u thuis of op een andere gewenste locatie.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#323232' }}>
                  Ervaren technici
                </h3>
                <p className="text-gray-700">
                  Onze technici hebben jarenlange ervaring met het plaatsen van kinderezitjes op 
                  verschillende soorten fietsen, inclusief fatbikes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hoe werkt het Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center" style={{ color: '#323232' }}>
              Hoe werkt het?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#323232' }}>
                  Aanvraag indienen
                </h3>
                <p className="text-gray-700 text-center">
                  Vul het formulier in of neem contact met ons op via WhatsApp. Geef aan welk type 
                  kinderezitje u heeft of wilt aanschaffen.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#323232' }}>
                  Afspraak plannen
                </h3>
                <p className="text-gray-700 text-center">
                  Wij nemen contact met u op om een geschikt tijdstip te plannen. Binnen 3 dagen 
                  komen wij naar u toe voor de plaatsing.
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-6">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold" style={{ color: '#456882' }}>3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#323232' }}>
                  Professionele plaatsing
                </h3>
                <p className="text-gray-700 text-center">
                  Onze technicus plaatst het kinderezitje veilig en correct op uw fatbike. Na de 
                  plaatsing wordt alles gecontroleerd en getest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prijzen Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center" style={{ color: '#323232' }}>
              Prijzen
            </h2>
            <div className="max-w-2xl mx-auto bg-white border-2 border-black rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2" style={{ color: '#456882' }}>€79</div>
                <p className="text-lg text-gray-700">Plaatsing op locatie</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Professionele plaatsing door ervaren technicus</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Controle en test na plaatsing</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Plaatsing op uw locatie (thuis of werk)</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Geschikt voor alle soorten kinderezitjes</span>
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

        {/* Informatie Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-black rounded-2xl p-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#323232' }}>
                Belangrijke informatie
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  Wij plaatsen kinderezitjes op alle soorten fatbikes. Of u nu een voor- of achterzitje 
                  heeft, onze technici zorgen voor een veilige en correcte plaatsing.
                </p>
                <p className="text-gray-700 mb-4">
                  Wij plaatsen kinderezitjes van verschillende merken, waaronder <strong>Qibbel</strong>, 
                  <strong>Boobike</strong> en <strong>Urban Iki</strong>. Heeft u een kinderezitje van 
                  een ander merk? Neem dan contact met ons op - wij kunnen meestal ook andere merken plaatsen.
                </p>
                <p className="text-gray-700 mb-4">
                  Het is belangrijk dat het kinderezitje geschikt is voor uw specifieke fatbike model. 
                  Heeft u nog geen kinderezitje? Neem dan contact met ons op voor advies over welk 
                  type het beste bij uw fatbike past.
                </p>
                <p className="text-gray-700 mb-4">
                  Na de plaatsing testen onze technici de bevestiging en geven u uitleg over het 
                  gebruik. U kunt erop vertrouwen dat uw kind veilig kan meerijden.
                </p>
                <p className="text-gray-700">
                  Heeft u vragen over kinderezitjes of wilt u een afspraak plannen? Neem gerust 
                  contact met ons op via WhatsApp of vul het <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">aanvraagformulier</Link> in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-light rounded-2xl p-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#323232' }}>
                Laat uw kinderezitje professioneel plaatsen
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Veiligheid staat voorop. Laat uw kinderezitje door onze ervaren technici plaatsen 
                op locatie voor slechts €79. Binnen 3 dagen staan wij bij u voor de deur.
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

