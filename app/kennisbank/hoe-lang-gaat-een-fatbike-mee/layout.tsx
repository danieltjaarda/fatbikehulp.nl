import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hoe lang gaat een fatbike mee? - Kennisbank | Fatbikehulp.nl',
  description: 'Ontdek hoe lang een fatbike meegaat en welke factoren de levensduur beïnvloeden. Leer hoe u de levensduur van uw fatbike kunt verlengen met regelmatig onderhoud.',
  keywords: 'hoe lang gaat een fatbike mee, fatbike levensduur, fatbike levensverwachting, fatbike onderhoud, fatbike slijtage, fatbike duurzaamheid',
  openGraph: {
    title: 'Hoe lang gaat een fatbike mee? - Fatbikehulp.nl',
    description: 'Ontdek hoe lang een fatbike meegaat en welke factoren de levensduur beïnvloeden.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/kennisbank/hoe-lang-gaat-een-fatbike-mee',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoe lang gaat een fatbike mee?',
    description: 'Ontdek hoe lang een fatbike meegaat en welke factoren de levensduur beïnvloeden.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/kennisbank/hoe-lang-gaat-een-fatbike-mee',
  },
}

export default function HoeLangGaatEenFatbikeMeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}










