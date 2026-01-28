import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike Foutcodes: Betekenis & Oplossingen | Gids',
  description: 'Complete gids voor fatbike foutcodes E01 tot E12. Leer wat elke foutcode betekent, wat de oorzaak is en hoe u deze zelf kunt oplossen. Handige troubleshooting tips voor veelvoorkomende elektrische problemen.',
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/blogs/foutcodes-fatbike-oplossen',
  },
  openGraph: {
    title: 'Fatbike Foutcodes: Betekenis & Oplossingen',
    description: 'Complete gids voor fatbike foutcodes E01 tot E12. Leer wat elke foutcode betekent en hoe u deze oplost.',
    url: 'https://www.fatbikehulp.nl/blogs/foutcodes-fatbike-oplossen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatbike Foutcodes: Betekenis & Oplossingen',
    description: 'Complete gids voor fatbike foutcodes met uitleg en oplossingen.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

