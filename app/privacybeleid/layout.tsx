import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacybeleid - Fatbikehulp.nl | AVG/GDPR Privacyverklaring',
  description: 'Privacybeleid van Fatbikehulp.nl. Lees hoe wij omgaan met uw persoonsgegevens, welke gegevens wij verzamelen, waarom en wat uw rechten zijn volgens de AVG/GDPR.',
  keywords: 'privacybeleid, privacyverklaring, AVG, GDPR, persoonsgegevens, databescherming, fatbikehulp privacy',
  openGraph: {
    title: 'Privacybeleid - Fatbikehulp.nl',
    description: 'Privacybeleid en privacyverklaring van Fatbikehulp.nl volgens AVG/GDPR',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/privacybeleid',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/privacybeleid',
  },
}

export default function PrivacybeleidLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

