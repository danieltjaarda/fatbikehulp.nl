import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loqater GPS Fatbike | 97% Terugvindkans',
  description: 'Bescherm uw fatbike tegen diefstal met een Loqater peilzender. 3 jaar batterijduur, radiofrequentie tracking, 24/7 meldkamer en 97% terugvindkans. Plaatsing op locatie voor €170 (€120 + €50 voorrijkosten).',
  keywords: 'Loqater peilzender, fatbike tracker, fatbike diefstal bescherming, Loqater plaatsing, fatbike verzekering, radiofrequentie tracker, fatbike recovery',
  openGraph: {
    title: 'Loqater Peilzender voor Fatbike - 97% Terugvindkans',
    description: 'Bescherm uw fatbike tegen diefstal met een professionele Loqater peilzender. 3 jaar batterijduur en 97% terugvindkans.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/loqater',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loqater Peilzender voor Fatbike - 97% Terugvindkans',
    description: 'Bescherm uw fatbike tegen diefstal met een professionele Loqater peilzender.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/loqater',
  },
}

export default function LoqaterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

