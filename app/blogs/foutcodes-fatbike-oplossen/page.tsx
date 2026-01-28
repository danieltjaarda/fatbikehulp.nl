'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
<main>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/blogs" className="text-brand-dark hover:text-brand-medium mb-4 inline-block">
            ← Terug naar blogs
          </Link>
          
          <div className="mb-6">
            <span className="px-3 py-1 bg-brand-light text-brand-dark text-sm font-semibold rounded-full">
              Reparatie
            </span>
            <span className="ml-4 text-sm text-gray-500">10 december 2024 • 8 min lezen</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
            Fatbike foutcodes: Wat betekenen ze en hoe los je ze op?
          </h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Moderne fatbikes zijn uitgerust met geavanceerde displays die foutcodes tonen wanneer er 
              een probleem wordt gedetecteerd. Deze foutcodes kunnen u helpen om te begrijpen wat er 
              mis is met uw fatbike. In deze uitgebreide gids leggen we uit wat de meest voorkomende 
              foutcodes betekenen en wanneer u professionele hulp nodig heeft.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-8" style={{ color: '#323232' }}>
              Wat zijn foutcodes?
            </h2>
            <p className="text-gray-700 mb-4">
              Foutcodes zijn nummer- of lettercodes die door het display van uw fatbike worden getoond 
              wanneer het systeem een probleem detecteert. Deze codes helpen technici om snel te 
              identificeren wat er mis is, maar kunnen ook voor u als eigenaar nuttig zijn om te 
              begrijpen wat er aan de hand is.
            </p>
            <p className="text-gray-700 mb-4">
              De meeste fatbikes gebruiken een combinatie van letters en cijfers, zoals E01, E02, etc. 
              Elke fabrikant kan verschillende codes gebruiken, maar veel codes zijn universeel of 
              lijken sterk op elkaar.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-8" style={{ color: '#323232' }}>
              Veelvoorkomende foutcodes
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>E01 - Batterij probleem:</strong> Deze code geeft aan dat er een probleem is met 
              de batterij of de batterijverbinding. Controleer of de batterij goed is aangesloten en 
              of de contacten schoon zijn. Als het probleem aanhoudt, kan de batterij defect zijn.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>E02 - Motor probleem:</strong> Deze code wijst op een probleem met de motor of 
              de motorcontroller. Dit kan variëren van oververhitting tot een defecte motor. Laat dit 
              altijd door een professional controleren.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>E03 - Sensor probleem:</strong> Deze code geeft aan dat er een probleem is met 
              een van de sensoren, zoals de trapkrachtsensor of snelheidssensor. Controleer of de 
              kabels goed zijn aangesloten.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>E04 - Communicatie fout:</strong> Deze code betekent dat er een communicatieprobleem 
              is tussen verschillende componenten. Dit kan worden veroorzaakt door losse kabels of een 
              defecte controller.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-8" style={{ color: '#323232' }}>
              Eenvoudige oplossingen die u zelf kunt proberen
            </h2>
            <p className="text-gray-700 mb-4">
              Voordat u professionele hulp inschakelt, zijn er enkele eenvoudige stappen die u kunt 
              proberen. Schakel de fatbike volledig uit en wacht een paar minuten voordat u deze weer 
              aanzet. Dit kan tijdelijke softwareproblemen oplossen.
            </p>
            <p className="text-gray-700 mb-4">
              Controleer alle aansluitingen en zorg dat alle kabels goed zijn aangesloten. Losse 
              connecties zijn een veelvoorkomende oorzaak van foutcodes. Maak de contacten schoon met 
              een droge doek en controleer op corrosie.
            </p>
            <p className="text-gray-700 mb-4">
              Controleer de batterijstatus en laad deze op als deze laag is. Sommige foutcodes kunnen 
              optreden wanneer de batterijspanning te laag is. Laad de batterij volledig op en probeer 
              het opnieuw.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-8" style={{ color: '#323232' }}>
              Wanneer professionele hulp inschakelen?
            </h2>
            <p className="text-gray-700 mb-4">
              Als de foutcode blijft verschijnen na het proberen van eenvoudige oplossingen, is het 
              tijd om professionele hulp in te schakelen. Onze ervaren technici hebben de kennis en 
              gereedschappen om foutcodes correct te diagnosticeren en op te lossen.
            </p>
            <p className="text-gray-700 mb-4">
              Sommige foutcodes, zoals motorproblemen of ernstige batterijproblemen, moeten altijd 
              door een professional worden behandeld. Pogingen om deze zelf op te lossen kunnen de 
              schade verergeren of de garantie ongeldig maken.
            </p>
            <p className="text-gray-700 mb-6">
              <Link href="/foutcodes" className="text-brand-dark hover:text-brand-medium underline font-semibold">
                Bekijk onze uitgebreide foutcodes pagina
              </Link> voor meer informatie over specifieke foutcodes, of <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">
                plan direct een reparatie
              </Link> als u hulp nodig heeft.
            </p>
          </div>

          <div className="bg-brand-light rounded-2xl p-6 mt-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#323232' }}>
              Foutcode op uw display?
            </h3>
            <p className="text-gray-700 mb-4">
              Onze technici kunnen uw fatbike diagnosticeren en de foutcode oplossen. Plan eenvoudig 
              een reparatie via ons online formulier.
            </p>
            <Link href="/aanvraag">
              <button className="bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                Plan reparatie
              </button>
            </Link>
          </div>
        </article>

        {/* Additional Content Section */}
        <section className="bg-gray-50 py-8 sm:py-12 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                Professionele hulp bij foutcodes
              </h2>
              <div className="text-gray-700 space-y-4 text-lg leading-relaxed">
                <p>
                  Kunt u de foutcode niet zelf oplossen of blijft het probleem terugkeren? Onze ervaren technici hebben toegang tot 
                  gespecialiseerde diagnostische apparatuur en kunnen complexe elektrische problemen snel identificeren en oplossen. 
                  We zijn gespecialiseerd in alle bekende fatbike merken en hebben ervaring met alle soorten foutcodes.
                </p>
                <p>
                  Onze monteurs komen naar u toe met alle benodigde gereedschappen en onderdelen. In de meeste gevallen kunnen we het 
                  probleem direct ter plaatse oplossen. We geven u altijd een duidelijk overzicht van wat het probleem was en wat we 
                  hebben gedaan om het op te lossen. Op alle uitgevoerde werkzaamheden geven wij 3 maanden garantie.
                </p>
                <p>
                  Plan eenvoudig een reparatie via ons <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">online formulier</Link> of 
                  bekijk onze <Link href="/tarieven" className="text-brand-dark hover:text-brand-medium underline font-semibold">tarieven</Link> voor 
                  transparante prijzen. Binnen 3 werkdagen staan wij op uw stoep, waar u ook bent in Nederland.
                </p>
              </div>
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

