import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veelvoorkomende Fatbike Problemen & Oplossingen | Blog',
  description: 'Ontdek de meest voorkomende fatbike problemen zoals batterij storingen, motor problemen, remproblemen en ketting issues. Leer hoe u deze problemen herkent en wat u kunt doen voordat u professionele hulp inschakelt.',
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/blogs/veelvoorkomende-fatbike-problemen',
  },
  openGraph: {
    title: 'Veelvoorkomende Fatbike Problemen & Oplossingen',
    description: 'Ontdek de meest voorkomende fatbike problemen zoals batterij storingen, motor problemen en remproblemen. Leer hoe u deze herkent.',
    url: 'https://www.fatbikehulp.nl/blogs/veelvoorkomende-fatbike-problemen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veelvoorkomende Fatbike Problemen & Oplossingen',
    description: 'Ontdek de meest voorkomende fatbike problemen en hoe u deze herkent en oplost.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

