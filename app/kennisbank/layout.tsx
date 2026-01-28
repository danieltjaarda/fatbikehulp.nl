import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kennisbank - Fatbikehulp.nl | Handleidingen en Tips',
  description: 'Bekijk onze kennisbank met handleidingen, tips en stappenplannen voor het onderhouden en repareren van uw fatbike. Leer hoe u zelf eenvoudige reparaties kunt uitvoeren.',
  keywords: 'fatbike kennisbank, fatbike handleiding, fatbike tips, fatbike reparatie handleiding, fatbike onderhoud gids',
  openGraph: {
    title: 'Kennisbank - Fatbikehulp.nl',
    description: 'Handleidingen en tips voor het onderhouden en repareren van uw fatbike.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/kennisbank',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kennisbank - Fatbikehulp.nl',
    description: 'Handleidingen en tips voor het onderhouden en repareren van uw fatbike.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/kennisbank',
  },
}

export default function KennisbankLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}










