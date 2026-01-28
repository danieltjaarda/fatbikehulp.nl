import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hoe Onderhoud Je een Fatbike? | Complete Gids',
  description: 'Stap-voor-stap gids voor fatbike onderhoud. Leer hoe u zelf kettingen smeert, remmen controleert, banden op spanning houdt en wanneer u professioneel onderhoud moet inschakelen. Praktische tips voor dagelijks en periodiek onderhoud.',
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/blogs/hoe-onderhoud-je-een-fatbike',
  },
  openGraph: {
    title: 'Hoe Onderhoud Je een Fatbike? | Complete Gids',
    description: 'Stap-voor-stap gids voor fatbike onderhoud. Leer hoe u zelf onderhoud doet en wanneer u hulp nodig heeft.',
    url: 'https://www.fatbikehulp.nl/blogs/hoe-onderhoud-je-een-fatbike',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoe Onderhoud Je een Fatbike? | Complete Gids',
    description: 'Stap-voor-stap gids voor fatbike onderhoud met praktische tips.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

