import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike band plakken: Stappenplan - Kennisbank | Fatbikehulp.nl',
  description: 'Leer hoe u zelf een lekke band van uw fatbike kunt plakken met dit uitgebreide stappenplan. Inclusief benodigde materialen, handige tips en veelgestelde vragen.',
  keywords: 'fatbike band plakken, fatbike lekke band, band plakken stappenplan, fatbike reparatie, binnenband plakken, buitenband plakken',
  openGraph: {
    title: 'Fatbike band plakken: Stappenplan - Fatbikehulp.nl',
    description: 'Leer hoe u zelf een lekke band van uw fatbike kunt plakken met dit uitgebreide stappenplan.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/kennisbank/fatbike-band-plakken',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatbike band plakken: Stappenplan',
    description: 'Leer hoe u zelf een lekke band van uw fatbike kunt plakken.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/kennisbank/fatbike-band-plakken',
  },
}

export default function FatbikeBandPlakkenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}










