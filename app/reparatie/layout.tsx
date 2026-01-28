import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike Reparatie Aan Huis | Binnen 3 Dagen',
  description: 'Professionele fatbike reparatie op locatie door heel Nederland. Ervaren technici komen naar u toe. Binnen 3 dagen op uw stoep. Transparante tarieven en 3 maanden garantie.',
  keywords: 'fatbike reparatie, fatbike repareren, elektrische fiets reparatie, fatbike service, reparatie op locatie, fatbike technicus, fatbike reparatiekosten',
  openGraph: {
    title: 'Fatbike Reparatie op Locatie - Fatbikehulp.nl',
    description: 'Professionele fatbike reparatie op locatie. Binnen 3 dagen op uw stoep, waar u ook bent in Nederland.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/reparatie',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/reparatie',
  },
}

export default function ReparatieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

