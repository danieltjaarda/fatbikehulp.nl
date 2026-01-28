import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ons Beleid | Kwaliteit, Garantie & Service',
  description: 'Bekijk ons beleid voor kwaliteit, service, garantie en klachten. Fatbikehulp.nl biedt 3 maanden garantie op alle reparaties. Transparant en betrouwbaar.',
  keywords: 'fatbikehulp beleid, garantie beleid, service beleid, klachten beleid, kwaliteitsbeleid, fatbike garantie',
  openGraph: {
    title: 'Ons Beleid - Fatbikehulp.nl',
    description: 'Kwaliteitsbeleid, servicebeleid, garantiebeleid en klachtenbeleid van Fatbikehulp.nl',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/beleid',
    siteName: 'Fatbikehulp.nl',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/beleid',
  },
}

export default function BeleidLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

