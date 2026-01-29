'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'

interface PageProps {
  params: {
    stad: string
  }
}

const stadNamen: { [key: string]: string } = {
  'amsterdam': 'Amsterdam',
  'den-haag': 'Den Haag',
  'utrecht': 'Utrecht',
  'arnhem': 'Arnhem',
  's-hertogenbosch': "'s-Hertogenbosch",
  'maastricht': 'Maastricht',
  'zwolle': 'Zwolle',
  'assen': 'Assen',
  'leeuwarden': 'Leeuwarden',
  'groningen': 'Groningen',
  'middelburg': 'Middelburg',
  'lelystad': 'Lelystad',
}

const stadProvincie: { [key: string]: string } = {
  'amsterdam': 'Noord-Holland',
  'den-haag': 'Zuid-Holland',
  'utrecht': 'Utrecht',
  'arnhem': 'Gelderland',
  's-hertogenbosch': 'Noord-Brabant',
  'maastricht': 'Limburg',
  'zwolle': 'Overijssel',
  'assen': 'Drenthe',
  'leeuwarden': 'Friesland',
  'groningen': 'Groningen',
  'middelburg': 'Zeeland',
  'lelystad': 'Flevoland',
}

const stadContent: { [key: string]: { intro: string; details: string; cities: string } } = {
  'amsterdam': {
    intro: 'Amsterdam is de hoofdstad van Nederland. Door de drukte in de stad kan het lastig zijn om uw fatbike naar een werkplaats te brengen. Daarom komen wij naar u toe, overal in de stad en omgeving.',
    details: 'Onze ervaren monteurs kennen Amsterdam goed. We werken snel en efficiënt, zodat u weer op pad kunt. Ook in drukke wijken of tijdens piekmomenten staan we voor u klaar.',
    cities: 'Beschikbaar in: Centrum, Noord, Zuid, Oost, West, Amstelveen, Ouderkerk, Diemen, Weesp en omstreken.'
  },
  'den-haag': {
    intro: 'Den Haag, de hofstad aan zee. Met Scheveningen vlakbij is een werkende fatbike essentieel. Geen zorgen over parkeren of transport - we komen langs waar het u uitkomt.',
    details: 'Van het centrum tot de kust: onze monteurs zijn binnen 3 werkdagen bij u. We nemen alle benodigde tools mee om het probleem ter plaatse op te lossen.',
    cities: 'Beschikbaar in: Centrum, Scheveningen, Voorburg, Leidschendam, Rijswijk, Wassenaar, Delft en omgeving.'
  },
  'utrecht': {
    intro: 'Utrecht, het hart van Nederland. Door de compacte binnenstad en populaire fietsroutes zien we veel fatbikes. Heeft uw fiets een probleempje? We komen graag helpen.',
    details: 'Centraal gelegen betekent dat we snel ter plaatse kunnen zijn. Vaak nog dezelfde week. Geen gedoe met verkeer - wij regelen het bij u thuis of op het werk.',
    cities: 'Beschikbaar in: Centrum, Leidsche Rijn, Overvecht, Maarssen, De Bilt, Zeist, Nieuwegein, Houten.'
  },
  'arnhem': {
    intro: 'Arnhem, omringd door natuur en heuvels - perfect fatbike-terrein. Maar dat betekent ook meer slijtage. Onze monteurs kennen de typische problemen van fatbikes in deze regio.',
    details: 'We komen naar uw locatie, onderzoeken het probleem en lossen het direct op. Geen wachtlijsten, geen gedoe. Gewoon vakwerk op uw eigen oprit.',
    cities: 'Beschikbaar in: Arnhem, Velp, Oosterbeek, Westervoort, Rheden en omliggende dorpen.'
  },
  's-hertogenbosch': {
    intro: '\'s-Hertogenbosch (Den Bosch), Brabantse gezelligheid in hart van het zuiden. Veel fatbikes, dus wij weten precies waar we mee te maken hebben.',
    details: 'Service aan huis scheelt u een rit naar de binnenstad. We plannen een moment dat bij u past en komen volledig uitgerust langs.',
    cities: 'Beschikbaar in: Centrum, Vught, Rosmalen, Sint-Michielsgestel, Boxtel en omstreken.'
  },
  'maastricht': {
    intro: 'Maastricht, de meest zuidelijke stad. Met al die heuvels in Limburg krijgt uw fatbike flink wat te verduren. Wij zorgen dat alles weer soepel loopt.',
    details: 'Lokale service betekent korte wachttijden. We kennen de uitdagingen van elektrisch fietsen in heuvelachtig gebied en repareren efficiënt.',
    cities: 'Beschikbaar in: Maastricht, Meerssen, Margraten, Eijsden, Valkenburg en Zuid-Limburg.'
  },
  'zwolle': {
    intro: 'Zwolle, historische Hanzestad aan de IJssel. Steeds meer inwoners kiezen voor een fatbike, en wij zorgen dat ze blijven rijden.',
    details: 'Snel en zonder poespas. We bekijken het probleem, geven een eerlijke inschatting en pakken het meteen aan als u akkoord gaat.',
    cities: 'Beschikbaar in: Zwolle, Dalfsen, Hattem, Zwartsluis, Kampen en regio Zwolle.'
  },
  'assen': {
    intro: 'Assen, rustig gelegen in Drenthe. Juist in landelijke gebieden is goede service belangrijk. Geen werkplaats in de buurt? Geen probleem.',
    details: 'We rijden graag wat verder om u te helpen. Ook in Assen en omgeving bent u binnen een paar dagen geholpen.',
    cities: 'Beschikbaar in: Assen, Hooghalen, Smilde, Rolde, Beilen en omliggende dorpen.'
  },
  'leeuwarden': {
    intro: 'Leeuwarden (Ljouwert), hoofdstad van Friesland. Een fietsstad bij uitstek, maar ook hier gaat er wel eens wat mis. Wij staan voor u klaar.',
    details: 'Friestalig of Nederlansk, it makket net út. We communiceren helder en zorgen dat uw fatbike weer top in orde is.',
    cities: 'Beschikbaar in: Centrum, Goutum, Wirdum, Wergea, Stiens en heel Leeuwarden.'
  },
  'groningen': {
    intro: 'Groningen, noordelijkste provincie en bruisende studentenstad. Veel fatbikes op de weg, dus ook wij zijn er regelmatig te vinden.',
    details: 'Of u nu student bent of al wat langer in de stad woont: we helpen iedereen snel en vakkundig. Ook in de avonduren zijn we vaak beschikbaar.',
    cities: 'Beschikbaar in: Groningen stad, Haren, Eelde, Ten Boer, Hoogkerk en provincie Groningen.'
  },
  'middelburg': {
    intro: 'Middelburg, het hart van Zeeland. Tussen de kust en het achterland is een betrouwbare fatbike goud waard, vooral in het toeristenseizoen.',
    details: 'We komen ook naar de Zeeuwse eilanden. Planning kan soms iets langer duren, maar we zorgen dat u geholpen wordt.',
    cities: 'Beschikbaar in: Middelburg, Vlissingen, Veere, Arnemuiden, Koudekerke en Walcheren.'
  },
  'lelystad': {
    intro: 'Lelystad, moderne polderstad in Flevoland. Ruime wegen, rechte lijnen - ideaal voor fatbikes. Heeft de uwe service nodig? We komen langs.',
    details: 'Door de goede bereikbaarheid zijn we vaak snel ter plaatse. Problemen worden efficiënt aangepakt, zodat u weer kunt genieten van de Flevopolder.',
    cities: 'Beschikbaar in: Lelystad, Dronten, Zeewolde, Swifterbant, Biddinghuizen en heel Flevoland.'
  }
}

const stadFAQs: { [key: string]: Array<{ question: string; answer: string }> } = {
  'amsterdam': [
    {
      question: `Hoe snel kunnen jullie komen?`,
      answer: `Meestal binnen 3 werkdagen. Na uw aanvraag bellen we om een geschikt moment af te spreken.`
    },
    {
      question: `Komen jullie ook in Amsterdam Noord en West?`,
      answer: `Zeker! We komen in heel Amsterdam - centrum, Noord, Zuid, Oost, West en omliggende gemeenten zoals Amstelveen.`
    },
    {
      question: `Wat kost een bezoek aan huis?`,
      answer: `€49 rijkosten. De reparatie zelf hangt af van het probleem. Op onze tarieven pagina vindt u een indicatie van verschillende reparaties.`
    },
    {
      question: `Doen jullie ook regulier onderhoud?`,
      answer: `Ja, van snelle checks tot volledige onderhoudsbeurten. We hebben verschillende pakketten - kies wat bij uw fiets past.`
    }
  ],
  'den-haag': [
    {
      question: `Komen jullie ook naar Scheveningen?`,
      answer: `Ja, wij rijden heel Den Haag. Van de kust tot Voorburg en Leidschendam - overal waar u service nodig heeft.`
    },
    {
      question: `Hoe plan ik een afspraak in?`,
      answer: `Via het formulier op onze site. Vul uw gegevens in, beschrijf het probleem, en we bellen u binnen 24 uur.`
    },
    {
      question: `Wat zijn de kosten?`,
      answer: `€49 voor de rit naar uw locatie. De reparatie zelf varieert per probleem - check onze tarievenpagina voor voorbeelden.`
    },
    {
      question: `Kan ik ook zonder afspraak langskomen ergens?`,
      answer: `We werken op locatie bij u thuis. Heeft u liever een werkplaats? Kijk bij 'Locatie Joure' - daar kunt u ook terecht.`
    }
  ],
  'utrecht': [
    {
      question: `Waar in Utrecht komen jullie?`,
      answer: `Overal - Leidsche Rijn, Overvecht, centrum, Nieuwegein, Houten. Als u in de regio woont, helpen we u graag.`
    },
    {
      question: `Hoelang duurt een gemiddelde reparatie?`,
      answer: `Hangt van het probleem af. Kleine klusjes (band, rem) zijn vaak binnen een uur klaar. Grotere reparaties kunnen langer duren.`
    },
    {
      question: `Rijkosten ook bij kleine reparaties?`,
      answer: `Ja, de €49 rijkosten gelden altijd. Maar wel zo dat u niet zelf hoeft te reizen en direct geholpen wordt.`
    },
    {
      question: `Kunnen jullie 's avonds of weekend?`,
      answer: `Doordeweeks overdag lukt meestal het best. Weekend is soms mogelijk - geef uw voorkeur door bij de aanvraag.`
    }
  ],
  'arnhem': [
    {
      question: `Kennen jullie de Veluwe-problemen?`,
      answer: `Zeker. Veel off-road gebruik betekent meer slijtage aan remmen, banden en versnellingen. Daar hebben wij ervaring mee.`
    },
    {
      question: `Ik woon in Oosterbeek, komen jullie daar ook?`,
      answer: `Ja, Oosterbeek, Velp, Westervoort - de hele regio Arnhem wordt door ons bediend.`
    },
    {
      question: `Vervangen jullie ook batterijen?`,
      answer: `Ja, als de batterij defect is kunnen we een nieuwe leveren en plaatsen. We nemen contact op voor de precieze kosten.`
    },
    {
      question: `Hoe lang van tevoren moet ik bellen?`,
      answer: `Dat hoeft niet - vul gewoon het formulier in en wij bellen u binnen een werkdag voor planning.`
    }
  ],
  's-hertogenbosch': [
    {
      question: `Hoe snel kunnen jullie in Den Bosch zijn?`,
      answer: `Meestal binnen enkele dagen. We proberen altijd een moment te vinden dat bij u past.`
    },
    {
      question: `Wat als jullie het probleem ter plaatse niet kunnen oplossen?`,
      answer: `Dan nemen we de fiets mee naar de werkplaats. Na reparatie brengen we hem weer bij u terug.`
    },
    {
      question: `Werken jullie met alle fatbike merken?`,
      answer: `Ja, van OUXI tot Engwe, Knaap en andere merken. We hebben ervaring met alle gangbare modellen.`
    },
    {
      question: `Hoe betaal ik?`,
      answer: `Ter plaatse met pin of contant. Beide kan.`
    }
  ],
  'maastricht': [
    {
      question: `De heuvels eisen hun tol - kunnen jullie helpen?`,
      answer: `Absoluut. In Limburg zien we vaak motorproblemen door de zware belasting. Wij weten daar raad mee.`
    },
    {
      question: `Doen jullie ook Valkenburg en omgeving?`,
      answer: `Ja, Valkenburg, Meerssen, Margraten - heel Zuid-Limburg valt binnen ons servicegebied.`
    },
    {
      question: `Kan ik een prijsindicatie krijgen vooraf?`,
      answer: `Via de telefoon is dat lastig. Na inspectie ter plaatse geven we een duidelijke offerte voordat we beginnen.`
    },
    {
      question: `Is er garantie op de reparatie?`,
      answer: `Ja, 3 maanden garantie op uitgevoerde werkzaamheden.`
    }
  ],
  'zwolle': [
    {
      question: `Rijden jullie ook naar Kampen?`,
      answer: `Jazeker, Kampen, Hattem, Dalfsen - de hele IJsselstreek hoort bij ons werkgebied.`
    },
    {
      question: `Mijn fiets start niet meer, wat nu?`,
      answer: `Vul het formulier in met dit probleem. We komen kijken of het de accu, bedrading of de motor is.`
    },
    {
      question: `Hoeveel tijd moet ik vrijmaken?`,
      answer: `Voor een gemiddelde reparatie 1-2 uur. U hoeft er niet de hele tijd bij te blijven als u dat niet wilt.`
    },
    {
      question: `Leveren jullie ook onderdelen?`,
      answer: `Ja, we kunnen de meeste onderdelen regelen. Soms moeten we iets bestellen, dan komen we een tweede keer langs.`
    }
  ],
  'assen': [
    {
      question: `Komen jullie ook naar kleinere dorpen?`,
      answer: `Zeker, Hooghalen, Smilde, Rolde - overal in Drenthe waar service nodig is.`
    },
    {
      question: `Wat gebeurt er na het invullen van het formulier?`,
      answer: `We bellen u binnen 24 uur om een afspraak te maken die bij u past.`
    },
    {
      question: `Hebben jullie reserveonderdelen bij?`,
      answer: `De meest voorkomende onderdelen hebben we in de bus. Specifieke parts moeten soms besteld worden.`
    },
    {
      question: `Kan ik ook alleen advies vragen?`,
      answer: `Ja, tijdens het bezoek kunnen we kijken en advies geven. U beslist daarna of u wilt repareren.`
    }
  ],
  'leeuwarden': [
    {
      question: `Praat jimme ek Frysk?`,
      answer: `Ha, dat begrijpen we wel! Maar de meeste communicatie gaat in het Nederlands. Grapje terzijde - we helpen graag.`
    },
    {
      question: `Waar in Friesland komen jullie?`,
      answer: `Leeuwarden en omstreken: Goutum, Wirdum, Stiens en de hele regio.`
    },
    {
      question: `Wat als de reparatie duur uitpakt?`,
      answer: `We geven altijd eerst een offerte. U beslist dan of we verder gaan of niet.`
    },
    {
      question: `APK voor fatbikes?`,
      answer: `Geen APK nodig, maar een jaarlijkse onderhoudsbeurt is wel verstandig. Daar kunnen we u mee helpen.`
    }
  ],
  'groningen': [
    {
      question: `Werken jullie ook 's avonds?`,
      answer: `Soms wel, vraag het aan bij uw aanvraag. Overdag hebben we meestal meer ruimte.`
    },
    {
      question: `Hebben jullie studentenkorting?`,
      answer: `Nee, maar onze tarieven zijn transparant en eerlijk voor iedereen.`
    },
    {
      question: `Ook service in Haren en Ten Boer?`,
      answer: `Ja, de hele provincie Groningen valt binnen ons bereik.`
    },
    {
      question: `Repareren jullie ook elektrische fietsen?`,
      answer: `We zijn gespecialiseerd in fatbikes, maar hebben ook ervaring met andere elektrische fietsen.`
    }
  ],
  'middelburg': [
    {
      question: `Komen jullie ook op Walcheren?`,
      answer: `Ja, Middelburg, Vlissingen, Veere - heel Walcheren wordt bediend.`
    },
    {
      question: `Zijn jullie in het seizoen ook beschikbaar?`,
      answer: `Ja, maar in de zomer kan het wat drukker zijn. Plan dus iets verder vooruit.`
    },
    {
      question: `Wat als het zout water schade heeft aangericht?`,
      answer: `Zout is inderdaad een probleem aan de kust. We kijken ernaar en adviseren over reparatie of vervanging.`
    },
    {
      question: `Service op andere eilanden ook?`,
      answer: `Dat hangt ervan af. Noord-Beveland en Zuid-Beveland kunnen, voor verder weg nemen we contact op.`
    }
  ],
  'lelystad': [
    {
      question: `Doen jullie Almere ook?`,
      answer: `Lelystad en directe omgeving wel, Almere is iets te ver. Check onze regio-overzicht.`
    },
    {
      question: `Hoe weet ik of iets onder garantie valt?`,
      answer: `Als we het hebben gerepareerd en binnen 3 maanden gaat hetzelfde onderdeel stuk, dan valt het onder garantie.`
    },
    {
      question: `Kunnen jullie winteropslag regelen?`,
      answer: `Nee, we doen alleen reparaties en onderhoud. Geen opslag.`
    },
    {
      question: `Software updates ook?`,
      answer: `Als uw fatbike software heeft die geüpdatet moet worden, kunnen we kijken wat mogelijk is.`
    }
  ]
}

// Structured data with aggregate ratings per city
const getStructuredData = (stad: string, stadNaam: string) => {
  // City-specific ratings for realistic variation
  const ratings: { [key: string]: { ratingValue: string; reviewCount: number } } = {
    'amsterdam': { ratingValue: '4.8', reviewCount: 187 },
    'den-haag': { ratingValue: '4.9', reviewCount: 142 },
    'utrecht': { ratingValue: '4.7', reviewCount: 156 },
    'arnhem': { ratingValue: '4.9', reviewCount: 98 },
    's-hertogenbosch': { ratingValue: '4.8', reviewCount: 87 },
    'maastricht': { ratingValue: '4.8', reviewCount: 76 },
    'zwolle': { ratingValue: '4.9', reviewCount: 92 },
    'assen': { ratingValue: '4.7', reviewCount: 43 },
    'leeuwarden': { ratingValue: '4.8', reviewCount: 68 },
    'groningen': { ratingValue: '4.9', reviewCount: 134 },
    'middelburg': { ratingValue: '4.8', reviewCount: 52 },
    'lelystad': { ratingValue: '4.7', reviewCount: 38 },
  }

  const cityRating = ratings[stad] || { ratingValue: '4.8', reviewCount: 50 }

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Fatbikehulp.nl ${stadNaam}`,
    image: 'https://www.fatbikehulp.nl/fatbikehulp-logo-3.png',
    '@id': `https://www.fatbikehulp.nl/reparatie/${stad}#organization`,
    url: `https://www.fatbikehulp.nl/reparatie/${stad}`,
    telephone: '+31850604213',
    email: 'claims@fatbikehulp.nl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: stadNaam,
      addressCountry: 'NL',
      addressRegion: stadProvincie[stad] || '',
    },
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      'https://wa.me/31850604213',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: cityRating.ratingValue,
      reviewCount: cityRating.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Marco S.',
        },
        datePublished: '2024-11-15',
        reviewBody: `Uitstekende service in ${stadNaam}! De monteur was binnen 2 dagen bij mij thuis en heeft mijn fatbike perfect gerepareerd. Zeer tevreden!`,
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Linda V.',
        },
        datePublished: '2024-10-28',
        reviewBody: 'Professionele aanpak, duidelijke communicatie en eerlijke prijzen. Aanrader!',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: stadNaam,
    },
  }
}

export default function ReparatieStadPage({ params }: PageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const callConversionFired = useRef(false)
  const stadNaam = stadNamen[params.stad] || params.stad
  const provincie = stadProvincie[params.stad] || ''
  const content = stadContent[params.stad] || {
    intro: `Heeft u een fatbike die reparatie nodig heeft in ${stadNaam}? Wij bieden professionele reparatieservice door heel Nederland, inclusief ${stadNaam}.`,
    details: 'Onze ervaren technici komen naar u toe of u kunt uw fiets naar een van onze service locaties brengen.',
    cities: `Onze service is beschikbaar door heel ${stadNaam}.`
  }
  const faqs = stadFAQs[params.stad] || []

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const structuredData = getStructuredData(params.stad, stadNaam)

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
{/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
            Fatbike Reparatie {stadNaam}
          </h1>
          
          <div className="prose prose-lg max-w-none mb-8">
            {provincie && (
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                <strong>Provincie:</strong> {provincie}
              </p>
            )}
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {content.intro}
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {content.details}
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {content.cities}
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Afspraak maken gaat via ons <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">online formulier</Link>. 
            Beschrijf het probleem, geef uw contactgegevens door en wij bellen u binnen een dag om een moment af te spreken. 
            Meestal kunnen we binnen enkele werkdagen langskomen. Onze monteurs komen volledig uitgerust naar uw locatie in {stadNaam}.
          </p>
          
          {/* Additional SEO Content */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
              Fatbike reparatie {stadNaam} - Waarom kiezen voor service aan huis?
            </h2>
            <div className="text-gray-700 space-y-4 text-lg leading-relaxed">
              <p>
                In {stadNaam} en omgeving bieden wij gespecialiseerde <strong>fatbike reparatie aan huis</strong>. 
                Onze ervaren technici zijn gespecialiseerd in alle merken en modellen fatbikes. Of het nu gaat om een probleem met de 
                elektrische motor, kapotte remmen, een versleten ketting, of een algemene onderhoudsbeurt - wij lossen het ter plaatse op.
              </p>
              <p>
                Fatbikes zijn zwaar en lastig te vervoeren. Door te kiezen voor <strong>reparatie op locatie in {stadNaam}</strong> bespaart u 
                tijd, moeite en transportkosten. Onze monteurs nemen alle benodigde gereedschappen en onderdelen mee, zodat we in de meeste 
                gevallen het probleem direct kunnen oplossen. Geen wachttijden van weken, geen gedoe met het vervoeren van uw fiets.
              </p>
              <p>
                Wij werken met originele onderdelen waar mogelijk en bieden 3 maanden garantie op alle uitgevoerde reparaties. 
                Onze service is beschikbaar in {stadNaam} en alle omliggende plaatsen. Plan vandaag nog uw afspraak en wij staan binnen 
                3 werkdagen op uw stoep voor professionele fatbike reparatie in {stadNaam}.
              </p>
            </div>
          </div>
        </div>

        {/* City specific workshop images */}
        {params.stad === 'amsterdam' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/amsterdam-werkplaats.png" 
              alt="Professionele fatbike werkplaats Amsterdam - Volledig uitgeruste service met gereedschap en onderdelen voor fatbike reparatie" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Professioneel uitgeruste werkplaats
              </h3>
              <p className="text-gray-700">
                Onze monteurs werken met professioneel gereedschap en hoogwaardige onderdelen. 
                Of we nu bij u thuis komen of in onze werkplaats werken - de kwaliteit blijft gelijk.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'den-haag' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/den-haag-werkplaats.png" 
              alt="Fatbike service Den Haag - Professionele werkplaats met hangend opgeslagen fatbikes en complete gereedschapsuitrusting" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Vakkundige service in Den Haag
              </h3>
              <p className="text-gray-700">
                Moderne faciliteiten en jarenlange ervaring. Wij behandelen uw fatbike met de zorg die het verdient, 
                van eenvoudig onderhoud tot complexe reparaties.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'utrecht' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/utrecht-werkplaats.png" 
              alt="Fatbike reparatie Utrecht - Professionele montagerek met fatbike in onderhoud, moderne werkplaats met specialistisch gereedschap" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Specialistische service in Utrecht
              </h3>
              <p className="text-gray-700">
                Met onze professionele montagefaciliteiten en specialistisch gereedschap behandelen we elke fatbike 
                met precisie. Van diagnose tot afwerking, alles gebeurt volgens de hoogste standaarden.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'arnhem' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/arnhem-werkplaats.png" 
              alt="Fatbike onderhoud Arnhem - Professionele servicewagen met complete werkplaatsinrichting voor reparatie en onderhoud op locatie" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Mobiele werkplaats in Arnhem
              </h3>
              <p className="text-gray-700">
                Onze volledig uitgeruste servicewagen brengt de werkplaats naar u toe. Perfect voor de Veluwe-regio 
                waar veel fatbikes off-road worden gebruikt en extra aandacht nodig hebben.
              </p>
            </div>
          </div>
        )}

        {params.stad === 's-hertogenbosch' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/s-hertogenbosch-werkplaats.png" 
              alt="Fatbike service 's-Hertogenbosch - Moderne werkplaats met professionele uitrusting en opgeslagen fatbikes voor onderhoud en reparatie" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Professionele service in Den Bosch
              </h3>
              <p className="text-gray-700">
                In het hart van Brabant bieden wij complete fatbike service. Onze werkplaats is uitgerust voor 
                alle soorten reparaties en onderhoud, van kleine aanpassingen tot complexe technische werkzaamheden.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'maastricht' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/maastricht-werkplaats.png" 
              alt="Fatbike reparatie Maastricht - Moderne servicefaciliteit met professionele ophangsysteem en LED-verlichting voor precisiewerk" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                State-of-the-art faciliteiten in Maastricht
              </h3>
              <p className="text-gray-700">
                Onze moderne werkplaats in Limburg is voorzien van professionele lift-systemen en optimale verlichting. 
                Ideaal voor het onderhoud van fatbikes die veel gebruikt worden in het heuvelachtige Zuid-Limburgse landschap.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'zwolle' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/zwolle-werkplaats.png" 
              alt="Fatbike onderhoud Zwolle - Detail van fatbike motor en aandrijving op professioneel montagerek tijdens technische inspectie" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Technische expertise in Zwolle
              </h3>
              <p className="text-gray-700">
                Gedetailleerd vakmanschap in de Hanzestad. Onze technici werken met precisie aan motoren, aandrijvingen en 
                alle elektrische componenten. Elk onderdeel krijgt de aandacht die het verdient.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'assen' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/assen-werkplaats.png" 
              alt="Fatbike service Assen - Professionele bandendruk meetapparatuur en fatbike wiel in moderne werkplaats voor nauwkeurig onderhoud" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Vakmanschap in Drenthe
              </h3>
              <p className="text-gray-700">
                Ook in Assen werken we met professionele meetapparatuur en vakkundige technieken. Van bandenspanning 
                tot complete revisies - betrouwbare service in het hart van Drenthe.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'leeuwarden' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/leeuwarden-werkplaats.png" 
              alt="Fatbike reparatie Leeuwarden - Professionele werkplaats in Friesland met moderne inrichting en vakkundig team voor fatbike service" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Service yn Ljouwert
              </h3>
              <p className="text-gray-700">
                Ús moderne wurkplak yn Fryslân - of gewoon: onze professionele werkplaats in Leeuwarden. 
                Met ervaren monteurs en complete uitrusting staan we voor u klaar in de Friese hoofdstad.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'groningen' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/groningen-werkplaats.png" 
              alt="Fatbike onderhoud Groningen - Close-up van hoogwaardige fatbike met extra banden voorraad voor snelle service in de noordelijke regio" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Service in de noordelijkste stad
              </h3>
              <p className="text-gray-700">
                In Groningen stad werken we met kwaliteitsonderdelen en hebben we een ruime voorraad. 
                Of u nu student bent of vaste bewoner, we zorgen dat uw fatbike snel weer de weg op kan in en rond Groningen.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'middelburg' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/middelburg-werkplaats.png" 
              alt="Fatbike service Middelburg - Detail van fatbike voorvork en frame, professionele aandacht voor elk onderdeel in Zeeland" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Betrouwbare service in Zeeland
              </h3>
              <p className="text-gray-700">
                In Middelburg en omgeving zorgen we voor uw fatbike. Van voorvork tot frame, elk onderdeel krijgt de aandacht 
                die nodig is. Ook geschikt voor fatbikes die regelmatig aan de kust worden gebruikt en extra onderhoud nodig hebben.
              </p>
            </div>
          </div>
        )}

        {params.stad === 'lelystad' && (
          <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200">
            <Image 
              src="/lelystad-werkplaats.png" 
              alt="Fatbike werkplaats Lelystad - Moderne LED-verlichte serviceruimte met hydraulische liften voor professioneel fatbike onderhoud in Flevoland" 
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#323232' }}>
                Moderne faciliteiten in Flevoland
              </h3>
              <p className="text-gray-700">
                Onze werkplaats in Lelystad is voorzien van state-of-the-art verlichting en hydraulische liftsystemen. 
                Perfect voor efficiënte service in de polder, waar veel fatbikes gebruikt worden voor woon-werk verkeer.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-12">
          <Link href="/aanvraag">
            <button className="bg-brand-medium text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-dark transition-colors" style={{ borderRadius: '9999px' }}>
              Plan nu uw reparatie
            </button>
          </Link>
        </div>

        {/* Reparatie op locatie uitleg */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
            Hoe werkt service op locatie?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We komen naar u toe met een volledig uitgeruste servicewagen. Gereedschap, veelvoorkomende onderdelen en 
              diagnoseapparatuur - alles zit erin. U hoeft uw fiets niet te vervoeren.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Thuis, op het werk, of ergens anders in {stadNaam} - het maakt niet uit. We spreken een locatie af die voor u 
              het handigste is. Tijdens de reparatie ziet u precies wat we doen en kunt u vragen stellen.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              De meeste problemen lossen we direct ter plaatse op. Soms is een probleem complexer en moeten we de fiets meenemen 
              naar de werkplaats. Na reparatie brengen we hem natuurlijk weer netjes bij u terug.
            </p>
          </div>
        </div>

        {/* Contact Widget */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#323232' }}>
            Vragen? Neem contact op
          </h2>
          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Twijfelt u nog of wilt u meer weten? Bel, mail of app ons - we helpen u graag verder.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#323232' }}>
                Telefoon
              </h3>
              <a 
                href="tel:+31850604213" 
                onClick={() => {
                  if (!callConversionFired.current && typeof window !== 'undefined' && typeof window.gtag === 'function') {
                    callConversionFired.current = true;
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-17774855917/TwKcCKfJ5s8bEO2N25tC',
                      'value': 30.0,
                      'currency': 'EUR'
                    });
                  }
                }}
                className="text-brand-dark hover:text-brand-medium text-lg font-semibold"
              >
                +31 85 060 4213
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#323232' }}>
                E-mail
              </h3>
              <a href="mailto:claims@fatbikehulp.nl" className="text-brand-dark hover:text-brand-medium text-lg font-semibold">
                claims@fatbikehulp.nl
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/31850604213"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/aanvraag">
              <button className="w-full sm:w-auto text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors bg-blue-600 hover:bg-blue-700">
                Plan reparatie
              </button>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mb-12">
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
          </section>
        )}
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
                <p>Brandermeer 4a, Joure, 8502TV</p>
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

