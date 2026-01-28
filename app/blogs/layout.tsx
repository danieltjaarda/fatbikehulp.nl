import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Fatbikehulp.nl | Tips, Gidsen & Nieuws over Fatbikes',
  description: 'Lees onze blog artikelen over fatbike onderhoud, reparatie, tips en nieuws. Handige gidsen en advies van onze ervaren technici.',
  keywords: 'fatbike blog, fatbike tips, fatbike onderhoud tips, fatbike reparatie gids, elektrische fiets blog, fatbike nieuws',
  openGraph: {
    title: 'Blog - Fatbikehulp.nl',
    description: 'Tips, gidsen en nieuws over fatbike onderhoud en reparatie.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/blogs',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Fatbikehulp.nl',
    description: 'Tips, gidsen en nieuws over fatbike onderhoud en reparatie.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/blogs',
  },
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

