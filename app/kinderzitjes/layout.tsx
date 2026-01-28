import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kinderzitjes Plaatsen op Locatie - €79 | Fatbikehulp.nl',
  description: 'Laat uw kinderezitje professioneel plaatsen op uw fatbike door onze ervaren technici. Plaatsing op locatie voor slechts €79. Binnen 3 dagen bij u thuis.',
  keywords: 'kinderzitjes plaatsen, kinderezitje fatbike, kinderezitje monteren, kinderezitje installeren, fatbike kinderezitje, kinderezitje plaatsing',
  openGraph: {
    title: 'Kinderzitjes Plaatsen op Locatie - €79 | Fatbikehulp.nl',
    description: 'Professionele plaatsing van kinderezitjes op uw fatbike op locatie. Ervaren technici, veilige plaatsing, binnen 3 dagen bij u thuis.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/kinderzitjes',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinderzitjes Plaatsen op Locatie - €79',
    description: 'Professionele plaatsing van kinderezitjes op uw fatbike op locatie.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/kinderzitjes',
  },
}

export default function KinderzitjesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

