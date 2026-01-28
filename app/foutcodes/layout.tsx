import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike Foutcodes (E01-E12) | Uitleg & Oplossingen',
  description: 'Veelvoorkomende fatbike foutcodes (E01-E12) met uitleg en oplossingen. Heeft uw fatbike een foutcode? Plan direct een reparatie via ons online formulier.',
  keywords: 'fatbike foutcodes, fatbike error codes, E01 E02 E03, fatbike foutmelding, fatbike probleem oplossen, fatbike error, elektrische fiets foutcode',
  openGraph: {
    title: 'Fatbike Foutcodes - Fatbikehulp.nl',
    description: 'Veelvoorkomende fatbike foutcodes met uitleg en oplossingen. Plan direct een reparatie.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/foutcodes',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/foutcodes',
  },
}

export default function FoutcodesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

