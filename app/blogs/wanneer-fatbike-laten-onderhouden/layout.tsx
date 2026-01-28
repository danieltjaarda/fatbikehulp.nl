import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wanneer Moet Je Je Fatbike Laten Onderhouden? | Gids',
  description: 'Ontdek wanneer u uw fatbike moet laten onderhouden. Leer de signalen zoals piepende remmen, slijtende kettingen, verminderde batterijcapaciteit en wanneer u professionele service moet inschakelen. Advies over onderhoudsfrequentie.',
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/blogs/wanneer-fatbike-laten-onderhouden',
  },
  openGraph: {
    title: 'Wanneer Moet Je Je Fatbike Laten Onderhouden?',
    description: 'Ontdek wanneer u uw fatbike moet laten onderhouden en welke signalen u niet moet negeren.',
    url: 'https://www.fatbikehulp.nl/blogs/wanneer-fatbike-laten-onderhouden',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanneer Moet Je Je Fatbike Laten Onderhouden?',
    description: 'Leer wanneer het tijd is voor onderhoud en welke signalen belangrijk zijn.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

