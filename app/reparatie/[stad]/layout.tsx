import { Metadata } from 'next'

interface LayoutProps {
  params: {
    stad: string
  }
  children: React.ReactNode
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

const stadDescriptions: { [key: string]: string } = {
  'amsterdam': 'Zoekt u fatbike reparatie in Amsterdam? Onze Amsterdamse monteurs bedienen Noord, Zuid, Oost, West, Nieuw-West, Zuidoost en Centrum. Specialist voor OUXI, QMWHEEL en Knaap fatbikes.',
  'den-haag': 'Fatbike monteur aan huis voor Den Haag, Scheveningen, Loosduinen en Laak. Haagse technici met ervaring in V8, V20 en H9 modellen. Bel 085-0604213 voor service vandaag nog.',
  'utrecht': 'Fatbike defect in Utrecht? Wij repareren in Overvecht, Leidsche Rijn, Vleuten-De Meern en Lunetten. Utrechtse specialisten voor batterij, motor en display problemen.',
  'arnhem': 'Lokale fatbike service voor Arnhem, Velp, Presikhaaf en Schuytgraaf. Ervaren in Gelderse weersomstandigheden. Arnhemse monteurs voor snelle hulp bij pech.',
  's-hertogenbosch': 'Fatbike specialist Den Bosch voor Rosmalen, Engelen, West en De Groote Wielen. Bossche vakmensen repareren alle elektrische fatbike merken met garantie.',
  'maastricht': 'Fatbike pech in Maastricht? Service in Wyck, Céramique, Heugem en Randwyck. Limburgse monteurs voor heuvelachtig terrein. Directe hulp via WhatsApp.',
  'zwolle': 'Zwolse fatbike monteurs voor Stadshagen, Westenholte, Holtenbroek en Aa-landen. Overijsselse technici met voorraad onderdelen. Vandaag nog geholpen.',
  'assen': 'Fatbike storing in Assen? Wij helpen in Kloosterveen, Marsdijk, Pittelo en Noorderpark. Drentse specialisten voor modderig terrein. Afspraak binnen 24 uur.',
  'leeuwarden': 'Friese fatbike service foar Ljouwert, Grou, Camminghaburen en Westeinde. Fryske monteurs dy\'t de taal prate. Flugge help by problemen.',
  'groningen': 'Groningse fatbike hulp voor Beijum, Vinkhuizen, Helpman en Hoogkerk. Studenten korting beschikbaar. Lokale monteurs met kennis van noordelijke omstandigheden.',
  'middelburg': 'Zeeuwse fatbike specialist voor Middelburg, Dauwendaele, Griffioen en Nieuw-Middelburg. Expert in zoutcorrosie door kustgebruik. Walcherse service.',
  'lelystad': 'Flevolandse fatbike monteurs voor Lelystad, Warande, Zuiderzeewijk en Waterwijk. Polderbewoners met moderne apparatuur. Nieuwe provincie, nieuwste technieken.',
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const stadNaam = stadNamen[params.stad] || params.stad
  const description = stadDescriptions[params.stad] || `Professionele fatbike reparatie en onderhoud aan huis in ${stadNaam}. Binnen 3 dagen op uw stoep.`
  
  // Unique titles for each city to prevent keyword cannibalization
  const stadTitles: { [key: string]: string } = {
    'amsterdam': 'Fatbike Monteur Amsterdam | Noord Zuid Oost West',
    'den-haag': 'Fatbike Service Den Haag & Scheveningen | 085-0604213',
    'utrecht': 'Fatbike Specialist Utrecht | Leidsche Rijn Overvecht',
    'arnhem': 'Fatbike Reparateur Arnhem | Velp & Veluwe Service',
    's-hertogenbosch': 'Fatbike Technicus Den Bosch | Rosmalen Engelen',
    'maastricht': 'Fatbike Hulp Maastricht | Limburg Heuvelland',
    'zwolle': 'Fatbike Werkplaats Zwolle | Stadshagen Westenholte',
    'assen': 'Fatbike Onderhoud Assen | Drenthe Specialist',
    'leeuwarden': 'Fatbike Service Ljouwert | Fryske Monteurs',
    'groningen': 'Fatbike Reparatie Grunn | Student Korting',
    'middelburg': 'Fatbike Expert Middelburg | Zeeland Walcheren',
    'lelystad': 'Fatbike Dienst Lelystad | Flevoland Polder',
  }
  
  const title = stadTitles[params.stad] || `Fatbike reparatie ${stadNaam} | Aan huis! | Aanvraag`
  
  // City-specific keywords
  const stadKeywords: { [key: string]: string } = {
    'amsterdam': 'fatbike monteur amsterdam, fatbike amsterdam noord, fatbike amsterdam zuid, elektrische fiets reparatie amsterdam, fatbike service nieuw west',
    'den-haag': 'fatbike reparatie den haag, fatbike service scheveningen, fatbike monteur loosduinen, elektrische fiets haag, fatbike laak',
    'utrecht': 'fatbike specialist utrecht, fatbike leidsche rijn, fatbike overvecht, fatbike reparatie vleuten, elektrische fiets utrecht',
    'arnhem': 'fatbike service arnhem, fatbike reparatie velp, fatbike monteur presikhaaf, elektrische fiets arnhem, fatbike veluwe',
    's-hertogenbosch': 'fatbike den bosch, fatbike rosmalen, fatbike reparatie engelen, fatbike service west, elektrische fiets hertogenbosch',
    'maastricht': 'fatbike maastricht, fatbike wyck, fatbike service ceramique, fatbike monteur heugem, elektrische fiets limburg',
    'zwolle': 'fatbike zwolle, fatbike stadshagen, fatbike westenholte, fatbike reparatie holtenbroek, elektrische fiets overijssel',
    'assen': 'fatbike assen, fatbike kloosterveen, fatbike marsdijk, fatbike service pittelo, elektrische fiets drenthe',
    'leeuwarden': 'fatbike ljouwert, fatbike leeuwarden, fatbike grou, fatbike service fryslan, elektrische fiets camminghaburen',
    'groningen': 'fatbike groningen, fatbike beijum, fatbike vinkhuizen, fatbike helpman, elektrische fiets hoogkerk',
    'middelburg': 'fatbike middelburg, fatbike dauwendaele, fatbike griffioen, fatbike service zeeland, elektrische fiets walcheren',
    'lelystad': 'fatbike lelystad, fatbike warande, fatbike zuiderzeewijk, fatbike waterwijk, elektrische fiets flevoland',
  }
  
  const keywords = stadKeywords[params.stad] || `fatbike reparatie ${stadNaam}, fatbike onderhoud ${stadNaam}, fatbike service ${stadNaam}, elektrische fiets reparatie ${stadNaam}, reparatie aan huis ${stadNaam}`
  
  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: `Fatbike reparatie ${stadNaam} | Aan huis binnen 3 dagen`,
      description: description,
      type: 'website',
      locale: 'nl_NL',
      url: `https://www.fatbikehulp.nl/reparatie/${params.stad}`,
      siteName: 'Fatbikehulp.nl',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Fatbike reparatie ${stadNaam} | Aan huis!`,
      description: description,
    },
    alternates: {
      canonical: `https://www.fatbikehulp.nl/reparatie/${params.stad}`,
    },
  }
}

export default function ReparatieStadLayout({ children }: LayoutProps) {
  return <>{children}</>
}
