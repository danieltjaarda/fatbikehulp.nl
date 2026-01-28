import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fatbike Onderdelen | Banden, Remmen & Meer | Fatbikehulp.nl',
  description: 'Hoogwaardige fatbike onderdelen: banden, remmen, verlichting en meer. Vakkundige montage door heel Nederland. Alle prijzen inclusief BTW.',
  keywords: 'fatbike onderdelen, fatbike banden, fatbike remmen, fatbike binnenband, fatbike buitenband, fatbike reparatie onderdelen',
  openGraph: {
    title: 'Fatbike Onderdelen | Fatbikehulp.nl',
    description: 'Hoogwaardige fatbike onderdelen met vakkundige montage door heel Nederland.',
    type: 'website',
  },
}

export default function FatbikeOnderdelenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}




