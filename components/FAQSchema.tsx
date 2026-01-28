export default function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hoe werkt het reparatieproces?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vul het online formulier in met uw gegevens en beschrijf het probleem met uw fatbike. Wij nemen dan contact met u op om een geschikt tijdstip te plannen. Binnen 3 dagen staan wij op uw stoep om uw fatbike te repareren.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat zijn de kosten voor een reparatie op locatie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Voor reparaties en onderhoud op locatie worden €49 rij kosten in rekening gebracht. De kosten voor de reparatie zelf zijn afhankelijk van het probleem en de benodigde onderdelen. Bekijk onze tarieven pagina voor meer informatie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hoe kan ik betalen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Op locatie kunt u betalen met pin of contant. Beide betaalmethoden zijn toegestaan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Waar bieden jullie service aan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wij bieden service door heel Nederland. Onze ervaren technici komen naar u toe, waar u ook bent in Nederland. Binnen 3 dagen staan wij op uw stoep.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan ik ook langskomen in Joure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, u kunt ook langskomen in ons servicepunt in Joure voor reparatie en onderhoud. Bekijk onze locatie pagina voor adresgegevens en openingstijden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welke merken?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wij bieden service voor verschillende fatbike merken, waaronder OUXI (modellen: V8, V20, H9), Engwe, Knaap en QMWHEEL. Heeft u een fatbike van een ander merk? Neem gerust contact met ons op - wij kunnen meestal ook andere merken repareren en onderhouden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Plaatsen jullie GPS systemen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, wij plaatsen GPS systemen op uw fatbike. Wij werken met Loqater peilzenders, een professioneel GPS tracking systeem met een terugvindkans van 97%. De Loqater peilzender wordt discreet op uw fatbike geplaatst en biedt 24/7 monitoring via een meldkamer. Bekijk onze Loqater pagina voor meer informatie over prijzen en mogelijkheden.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

