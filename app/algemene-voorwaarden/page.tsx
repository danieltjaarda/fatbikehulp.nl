'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="min-h-screen bg-white">
{/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Algemene voorwaarden
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Hieronder vindt u onze algemene voorwaarden die van toepassing zijn op alle diensten die wij leveren.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Artikel 1 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 1: Definities
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    In deze algemene voorwaarden wordt verstaan onder:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Fatbikehulp.nl:</strong> de dienstverlener die reparatie- en onderhoudsdiensten levert voor fatbikes.</li>
                    <li><strong>Klant:</strong> de natuurlijke of rechtspersoon die gebruik maakt van de diensten van Fatbikehulp.nl.</li>
                    <li><strong>Dienst:</strong> alle reparatie- en onderhoudsdiensten die door Fatbikehulp.nl worden geleverd.</li>
                    <li><strong>Overeenkomst:</strong> de overeenkomst tussen Fatbikehulp.nl en de klant voor het leveren van diensten.</li>
                  </ul>
                </div>
              </div>

              {/* Artikel 2 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 2: Toepasselijkheid
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen Fatbikehulp.nl en de klant, 
                    tenzij partijen schriftelijk anders overeenkomen.
                  </p>
                  <p>
                    Afwijkingen van deze voorwaarden zijn alleen geldig indien deze schriftelijk zijn vastgelegd en door 
                    beide partijen zijn ondertekend.
                  </p>
                </div>
              </div>

              {/* Artikel 3 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 3: Aanbieding en totstandkoming overeenkomst
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Alle aanbiedingen van Fatbikehulp.nl zijn vrijblijvend, tenzij uitdrukkelijk anders vermeld. Een 
                    overeenkomst komt tot stand door acceptatie van een opdracht door Fatbikehulp.nl.
                  </p>
                  <p>
                    De klant kan een opdracht plaatsen via het online formulier op onze website, telefonisch of via email. 
                    Na ontvangst van de opdracht neemt Fatbikehulp.nl contact op om een afspraak te plannen.
                  </p>
                </div>
              </div>

              {/* Artikel 4 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 4: Prijzen en betaling
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Alle prijzen zijn inclusief BTW, tenzij anders vermeld. Voor reparaties en onderhoud op locatie worden 
                    €49 rij kosten in rekening gebracht.
                  </p>
                  <p>
                    Betaling dient te geschieden op locatie na voltooiing van de werkzaamheden. Betaling kan plaatsvinden 
                    met pin of contant. Beide betaalmethoden zijn toegestaan.
                  </p>
                  <p>
                    Indien de klant niet tijdig betaalt, is Fatbikehulp.nl gerechtigd de betaling te vorderen met 
                    rente en buitengerechtelijke incassokosten.
                  </p>
                </div>
              </div>

              {/* Artikel 5 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 5: Uitvoering van de dienst
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Fatbikehulp.nl zal de diensten met de grootst mogelijke zorgvuldigheid uitvoeren. Wij streven ernaar 
                    om binnen 3 dagen na het plaatsen van een opdracht op locatie te zijn.
                  </p>
                  <p>
                    De klant is verplicht alle informatie te verstrekken die noodzakelijk is voor een goede uitvoering 
                    van de dienst. Indien de klant niet tijdig de benodigde informatie verstrekt, kan dit leiden tot 
                    vertraging in de uitvoering.
                  </p>
                </div>
              </div>

              {/* Artikel 6 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 6: Garantie
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Op alle uitgevoerde reparaties en onderhoudsbeurten geeft Fatbikehulp.nl 3 maanden garantie. Deze 
                    garantie dekt defecten die het gevolg zijn van onze werkzaamheden of gebruikte onderdelen.
                  </p>
                  <p>
                    Garantie geldt niet voor slijtage, normale gebruiksschade, schade veroorzaakt door onjuist gebruik, 
                    of schade die is ontstaan na de reparatie door toedoen van de klant of derden.
                  </p>
                </div>
              </div>

              {/* Artikel 7 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 7: Aansprakelijkheid
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Fatbikehulp.nl is niet aansprakelijk voor schade die het gevolg is van onjuiste informatie die door 
                    de klant is verstrekt, of voor schade die ontstaat door toedoen van de klant of derden.
                  </p>
                  <p>
                    De aansprakelijkheid van Fatbikehulp.nl is beperkt tot het bedrag dat door de verzekering wordt 
                    uitgekeerd, of indien er geen verzekering is, tot het bedrag van de factuur.
                  </p>
                </div>
              </div>

              {/* Artikel 8 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 8: Annulering
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    De klant kan een afspraak kosteloos annuleren tot 24 uur voor de geplande afspraak. Bij annulering 
                    binnen 24 uur kan een annuleringskosten in rekening worden gebracht.
                  </p>
                  <p>
                    Fatbikehulp.nl behoudt zich het recht voor om afspraken te annuleren in geval van overmacht of 
                    andere omstandigheden die buiten onze controle liggen.
                  </p>
                </div>
              </div>

              {/* Artikel 9 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Artikel 9: Geschillen en klachtenregeling
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Op alle overeenkomsten tussen Fatbikehulp.nl en de klant is Nederlands recht van toepassing.
                  </p>
                  <p>
                    Bij klachten dient een consument zich allereerst te wenden tot de ondernemer. Indien de webwinkel is 
                    aangesloten bij WebwinkelKeur en bij klachten die niet in onderling overleg opgelost kunnen worden dient 
                    de consument zich te wenden tot WebwinkelKeur (
                    <a 
                      href="https://www.webwinkelkeur.nl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-dark hover:text-brand-medium underline"
                    >
                      www.webwinkelkeur.nl
                    </a>
                    ), deze zal gratis bemiddelen. Controleer of deze webwinkel een lopend lidmaatschap heeft via{' '}
                    <a 
                      href="https://www.webwinkelkeur.nl/leden/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-dark hover:text-brand-medium underline"
                    >
                      https://www.webwinkelkeur.nl/leden/
                    </a>. 
                    Mocht er dan nog niet tot een oplossing gekomen worden, heeft de consument de mogelijkheid om zijn klacht 
                    te laten behandelen door de door WebwinkelKeur aangestelde onafhankelijke geschillencommissie, de uitspraak 
                    hiervan is bindend en zowel ondernemer als consument stemmen in met deze bindende uitspraak. Aan het 
                    voorleggen van een geschil aan deze geschillencommissie zijn kosten verbonden die door de consument betaald 
                    dienen te worden aan de betreffende commissie.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Vragen over de algemene voorwaarden?
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Heeft u vragen over onze algemene voorwaarden? Neem gerust contact met ons op.
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

      {/* Footer - Same as homepage */}
      <footer className="text-white py-2 sm:py-3 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="px-6 sm:px-8 lg:px-12 py-12">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <div className="inline-block bg-white rounded-lg p-2">
                <Image 
                  src="/fatbikehulp-logo-kerst.png" 
                  alt="Fatbikehulp Logo" 
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
            {/* Service sectie */}
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
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
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

