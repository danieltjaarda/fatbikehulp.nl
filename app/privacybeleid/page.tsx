'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function PrivacybeleidPage() {
  return (
    <div className="min-h-screen bg-white">
{/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Privacybeleid
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              Fatbikehulp.nl respecteert uw privacy en gaat zorgvuldig om met uw persoonsgegevens. Hieronder leggen 
              wij uit welke gegevens wij verzamelen en hoe wij deze gebruiken.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Verantwoordelijke */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Verantwoordelijke voor de verwerking
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Fatbikehulp.nl is verantwoordelijk voor de verwerking van uw persoonsgegevens. Onze contactgegevens zijn:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Adres:</strong> Brandermeer 4a, Joure, 8502TV</p>
                    <p><strong>Telefoon:</strong> +31 85 060 4213</p>
                    <p><strong>Email:</strong> <a href="mailto:claims@fatbikehulp.nl" className="text-brand-dark hover:text-brand-medium underline">claims@fatbikehulp.nl</a></p>
                  </div>
                </div>
              </div>

              {/* Welke gegevens */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Welke gegevens verzamelen wij?
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Wij verzamelen de volgende persoonsgegevens:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Naam en contactgegevens (telefoonnummer, emailadres, adres)</li>
                    <li>Informatie over uw fatbike en het probleem dat u meldt</li>
                    <li>Communicatiegeschiedenis (telefoongesprekken, emails, WhatsApp berichten)</li>
                    <li>Betalingsgegevens (indien van toepassing)</li>
                  </ul>
                  <p>
                    Wij verzamelen alleen gegevens die noodzakelijk zijn voor het uitvoeren van onze diensten en het 
                    onderhouden van contact met u.
                  </p>
                </div>
              </div>

              {/* Doel */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Waarom verzamelen wij deze gegevens?
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Wij gebruiken uw persoonsgegevens voor de volgende doeleinden:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Het uitvoeren van reparatie- en onderhoudsdiensten</li>
                    <li>Het plannen en beheren van afspraken</li>
                    <li>Het communiceren met u over uw opdracht</li>
                    <li>Het verwerken van betalingen</li>
                    <li>Het voldoen aan wettelijke verplichtingen</li>
                    <li>Het verbeteren van onze dienstverlening</li>
                  </ul>
                </div>
              </div>

              {/* Bewaartermijn */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Bewaartermijn
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor zij zijn 
                    verzameld, of zolang als wettelijk verplicht.
                  </p>
                  <p>
                    Facturen en administratieve gegevens bewaren wij minimaal 7 jaar, conform de wettelijke 
                    bewaarplicht. Overige gegevens worden verwijderd zodra deze niet meer nodig zijn voor het doel 
                    waarvoor zij zijn verzameld.
                  </p>
                </div>
              </div>

              {/* Delen met derden */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Delen met derden
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Wij delen uw persoonsgegevens niet met derden, behalve wanneer dit noodzakelijk is voor de 
                    uitvoering van onze diensten of wanneer dit wettelijk verplicht is.
                  </p>
                  <p>
                    In sommige gevallen kunnen wij gebruik maken van externe dienstverleners (zoals hosting providers) 
                    die toegang hebben tot uw gegevens. Deze partijen zijn contractueel verplicht om uw gegevens 
                    vertrouwelijk te behandelen en alleen te gebruiken voor de doeleinden waarvoor zij zijn ingeschakeld.
                  </p>
                </div>
              </div>

              {/* Uw rechten */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Uw rechten
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    U heeft de volgende rechten met betrekking tot uw persoonsgegevens:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Inzage:</strong> U heeft het recht om te weten welke gegevens wij van u verwerken</li>
                    <li><strong>Rectificatie:</strong> U heeft het recht om onjuiste gegevens te laten corrigeren</li>
                    <li><strong>Verwijdering:</strong> U heeft het recht om uw gegevens te laten verwijderen</li>
                    <li><strong>Beperking:</strong> U heeft het recht om de verwerking van uw gegevens te beperken</li>
                    <li><strong>Bezwaar:</strong> U heeft het recht om bezwaar te maken tegen de verwerking van uw gegevens</li>
                    <li><strong>Dataportabiliteit:</strong> U heeft het recht om uw gegevens in een gestructureerd formaat te ontvangen</li>
                  </ul>
                  <p>
                    Om gebruik te maken van deze rechten, kunt u contact met ons opnemen via de contactgegevens 
                    bovenaan deze pagina.
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Cookies
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Onze website maakt gebruik van cookies om de functionaliteit te verbeteren en om gebruikersstatistieken 
                    bij te houden. Cookies zijn kleine tekstbestanden die op uw computer worden opgeslagen.
                  </p>
                  <p>
                    U kunt cookies uitschakelen via de instellingen van uw browser. Houd er rekening mee dat dit de 
                    functionaliteit van onze website kan beïnvloeden.
                  </p>
                </div>
              </div>

              {/* WebwinkelKeur Reviews */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Beoordelingen - WebwinkelKeur
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Wij verzamelen reviews via het platform van WebwinkelKeur. Als u een review achterlaat via WebwinkelKeur 
                    dan bent u verplicht om uw naam en e-mailadres op te geven. WebwinkelKeur deelt deze gegevens met ons, 
                    zodat wij de review aan uw bestelling kunnen koppelen. WebwinkelKeur publiceert uw naam eveneens op de 
                    eigen website. In sommige gevallen kan WebwinkelKeur contact met u opnemen om een toelichting op uw review 
                    te geven.
                  </p>
                  <p>
                    In het geval dat wij u uitnodigen om een review achter te laten delen wij uw naam en e-mailadres met 
                    WebwinkelKeur. Zij gebruiken deze gegevens enkel met het doel u uit te nodigen om een review achter te laten. 
                    WebwinkelKeur heeft passende technische en organisatorische maatregelen genomen om uw persoonsgegevens te 
                    beschermen. WebwinkelKeur behoudt zich het recht voor om ten behoeve van het leveren van de dienstverlening 
                    derden in te schakelen, hiervoor hebben wij aan WebwinkelKeur toestemming gegeven. Alle hierboven genoemde 
                    waarborgen met betrekking tot de bescherming van uw persoonsgegevens zijn eveneens van toepassing op de 
                    onderdelen van de dienstverlening waarvoor WebwinkelKeur derden inschakelt.
                  </p>
                </div>
              </div>

              {/* Wijzigingen */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Wijzigingen in dit privacybeleid
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Wij behouden ons het recht voor om dit privacybeleid te wijzigen. Wijzigingen worden gepubliceerd 
                    op deze pagina. Wij adviseren u om deze pagina regelmatig te raadplegen om op de hoogte te blijven 
                    van eventuele wijzigingen.
                  </p>
                  <p>
                    Laatste update: januari 2025
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
                  Vragen over privacy?
                </h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Heeft u vragen over ons privacybeleid of wilt u gebruik maken van uw rechten? Neem gerust contact 
                    met ons op.
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

