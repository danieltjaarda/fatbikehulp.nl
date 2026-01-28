import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hydraulische rem olie vervangen fatbike: Stappenplan - Kennisbank | Fatbikehulp.nl',
  description: 'Leer hoe u zelf de remolie van uw hydraulische remmen kunt vervangen. Stappenplan voor het ontluchten en bijvullen van remolie in fatbike remmen.',
  keywords: 'hydraulische rem olie vervangen fatbike, remolie vervangen, remmen ontluchten fatbike, hydraulische remmen onderhoud, remvloeistof vervangen',
  openGraph: {
    title: 'Hydraulische rem olie vervangen fatbike: Stappenplan - Fatbikehulp.nl',
    description: 'Leer hoe u zelf de remolie van uw hydraulische remmen kunt vervangen met dit uitgebreide stappenplan.',
    type: 'article',
    locale: 'nl_NL',
    url: 'https://www.fatbikehulp.nl/kennisbank/hydraulische-rem-olie-vervangen-fatbike',
    siteName: 'Fatbikehulp.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydraulische rem olie vervangen fatbike: Stappenplan',
    description: 'Leer hoe u zelf de remolie van uw hydraulische remmen kunt vervangen.',
  },
  alternates: {
    canonical: 'https://www.fatbikehulp.nl/kennisbank/hydraulische-rem-olie-vervangen-fatbike',
  },
}

export default function HydraulischeRemOlieVervangenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}










