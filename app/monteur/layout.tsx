import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monteur Dashboard | Fatbikehulp',
  description: 'Monteur dashboard voor Fatbikehulp',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function MonteurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
