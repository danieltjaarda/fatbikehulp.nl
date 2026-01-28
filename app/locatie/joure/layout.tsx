import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kom langs in Joure - Fatbikehulp.nl Servicepunt',
  description: 'Bezoek ons servicepunt in Joure voor reparatie en onderhoud van uw fatbike. Plan een reparatie of kom langs voor onderhoud. Brandermeer 4a, Joure, 8502TV.',
  openGraph: {
    title: 'Kom langs in Joure - Fatbikehulp.nl Servicepunt',
    description: 'Bezoek ons servicepunt in Joure voor reparatie en onderhoud van uw fatbike.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/locatie/joure',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/locatie/joure',
  },
}

export default function JoureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

