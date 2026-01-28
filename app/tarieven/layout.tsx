import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike Tarieven | Reparatie & Onderhoud Prijzen',
  description: 'Bekijk onze transparante tarieven voor fatbike reparatie en onderhoud. Onderhoudspakketten: Basic, Premium en Deluxe. Onderdelen en reparatiekosten. €49 rij kosten voor service op locatie.',
  keywords: 'fatbike tarieven, fatbike onderhoudsprijs, reparatie kosten, onderhoudspakketten, fatbike onderdelen prijs, service kosten, fatbike reparatie prijs',
  openGraph: {
    title: 'Tarieven Fatbike Reparatie & Onderhoud - Fatbikehulp.nl',
    description: 'Transparante tarieven voor fatbike reparatie en onderhoud. Bekijk onze onderhoudspakketten en prijzen.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/tarieven',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/tarieven',
  },
}

export default function TarievenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

