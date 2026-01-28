import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike remmen vervangen: Stappenplan - Kennisbank | Fatbikehulp.nl',
  description: 'Leer hoe u zelf de remmen van uw fatbike kunt vervangen. Stappenplan voor remblokken, remschijven en hydraulische remmen. Inclusief benodigde materialen en handige tips.',
  keywords: 'fatbike remmen vervangen, remblokken fatbike, remschijven fatbike, hydraulische remmen fatbike, remblok houdertjes, fatbike remblokken vervangen',
  openGraph: {
    title: 'Fatbike remmen vervangen: Stappenplan - Fatbikehulp.nl',
    description: 'Leer hoe u zelf de remmen van uw fatbike kunt vervangen met dit uitgebreide stappenplan.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/kennisbank/fatbike-remmen-vervangen',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatbike remmen vervangen: Stappenplan',
    description: 'Leer hoe u zelf de remmen van uw fatbike kunt vervangen.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/kennisbank/fatbike-remmen-vervangen',
  },
}

export default function FatbikeRemmenVervangenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}










