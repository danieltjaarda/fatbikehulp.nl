import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | Fatbikehulp.nl',
  description: 'Bekijk de algemene voorwaarden van Fatbikehulp.nl voor fatbike reparatie en onderhoud. Definities, prijzen, uitvoering, garantie, aansprakelijkheid en annulering.',
  keywords: 'algemene voorwaarden, voorwaarden fatbikehulp, service voorwaarden, reparatie voorwaarden, onderhoud voorwaarden',
  openGraph: {
    title: 'Algemene Voorwaarden - Fatbikehulp.nl',
    description: 'Algemene voorwaarden voor fatbike reparatie en onderhoud service van Fatbikehulp.nl',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/algemene-voorwaarden',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/algemene-voorwaarden',
  },
}

export default function AlgemeneVoorwaardenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

