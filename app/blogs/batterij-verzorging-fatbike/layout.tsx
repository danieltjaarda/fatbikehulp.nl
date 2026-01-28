import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Batterij Verzorging Fatbike | Levensduur Verlengen',
  description: 'Leer hoe u de levensduur van uw fatbike batterij verlengt met praktische tips voor opladen, opslag en onderhoud. Ontdek wat u moet vermijden en hoe u de batterijcapaciteit optimaal houdt voor jarenlang gebruik.',
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/blogs/batterij-verzorging-fatbike',
  },
  openGraph: {
    title: 'Batterij Verzorging Fatbike | Levensduur Verlengen',
    description: 'Leer hoe u de levensduur van uw fatbike batterij verlengt met praktische tips voor opladen, opslag en onderhoud.',
    url: 'https://www.fatbikehulp.nl/blogs/batterij-verzorging-fatbike',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batterij Verzorging Fatbike | Levensduur Verlengen',
    description: 'Praktische tips om de levensduur van uw fatbike batterij te verlengen.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

