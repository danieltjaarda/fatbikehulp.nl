import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike Onderhoud Aan Huis | Professionele Pakketten',
  description: 'Professioneel fatbike onderhoud op locatie door heel Nederland. Basic, Premium en Deluxe onderhoudspakketten. Binnen 3 dagen op uw stoep. Bekijk onze tarieven en plan nu uw onderhoud.',
  keywords: 'fatbike onderhoud, onderhoud fatbike, elektrische fiets onderhoud, fatbike service, onderhoud op locatie, onderhoudspakketten, fatbike onderhoudsprijs',
  openGraph: {
    title: 'Fatbike Onderhoud op Locatie - Fatbikehulp.nl',
    description: 'Professioneel fatbike onderhoud op locatie. Basic, Premium en Deluxe pakketten beschikbaar.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/onderhoud',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/onderhoud',
  },
}

export default function OnderhoudLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

