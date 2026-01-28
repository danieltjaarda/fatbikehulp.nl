import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike Reparatie Aanvragen | Online Formulier',
  description: 'Vul het online formulier in om een reparatie of onderhoud voor uw fatbike aan te vragen. Binnen 3 dagen op uw stoep, waar u ook bent in Nederland. Gratis offerte mogelijk.',
  keywords: 'fatbike reparatie aanvragen, fatbike onderhoud aanvragen, reparatie formulier, onderhoud aanvragen, fatbike service aanvragen, offerte aanvragen',
  openGraph: {
    title: 'Reparatie Aanvragen - Fatbikehulp.nl',
    description: 'Plan eenvoudig uw fatbike reparatie of onderhoud via ons online formulier. Binnen 3 dagen op uw stoep.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/aanvraag',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reparatie Aanvragen - Fatbikehulp.nl',
    description: 'Plan eenvoudig uw fatbike reparatie of onderhoud via ons online formulier.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/aanvraag',
  },
}

export default function AanvraagLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

