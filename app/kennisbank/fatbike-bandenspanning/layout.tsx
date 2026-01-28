import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike bandenspanning: Juiste druk instellen - Kennisbank | Fatbikehulp.nl',
  description: 'Leer wat de juiste bandenspanning is voor uw fatbike. Voor 20x4.00 banden is de maximale druk 1,8 bar (21 PSI). Stappenplan voor het controleren en aanpassen van bandenspanning.',
  keywords: 'fatbike bandenspanning, fatbike bandendruk, 20x4.00 bandenspanning, fatbike PSI, fatbike bar, bandenspanning controleren, bandenspanning aanpassen',
  openGraph: {
    title: 'Fatbike bandenspanning: Juiste druk instellen - Fatbikehulp.nl',
    description: 'Leer wat de juiste bandenspanning is voor uw fatbike met 20x4.00 banden. Maximale druk: 1,8 bar (21 PSI).',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/kennisbank/fatbike-bandenspanning',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatbike bandenspanning: Juiste druk instellen',
    description: 'Leer wat de juiste bandenspanning is voor uw fatbike. Maximale druk: 1,8 bar (21 PSI).',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/kennisbank/fatbike-bandenspanning',
  },
}

export default function FatbikeBandenspanningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}










