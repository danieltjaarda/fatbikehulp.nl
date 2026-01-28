import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Winter Onderhoud voor Uw Fatbike | Tips & Gids',
  description: 'Essentiële winter onderhoud tips voor uw fatbike. Leer hoe u uw elektrische fiets beschermt tegen kou, zout en vocht. Praktische adviezen voor banden, remmen, batterij en opslag tijdens de winterperiode.',
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/blogs/winter-onderhoud-fatbike',
  },
  openGraph: {
    title: 'Winter Onderhoud voor Uw Fatbike | Tips & Gids',
    description: 'Essentiële winter onderhoud tips voor uw fatbike. Leer hoe u uw fiets beschermt tegen kou, zout en vocht.',
    url: 'https://www.fatbikehulp.nl/blogs/winter-onderhoud-fatbike',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Winter Onderhoud voor Uw Fatbike | Tips & Gids',
    description: 'Essentiële winter onderhoud tips voor uw fatbike tijdens koude maanden.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

