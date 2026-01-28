'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  const pathSegments = pathname.split('/').filter(segment => segment)
  
  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  // Custom labels for better readability
  const labelMap: { [key: string]: string } = {
    'reparatie': 'Reparatie',
    'onderhoud': 'Onderhoud',
    'tarieven': 'Tarieven',
    'aanvraag': 'Aanvragen',
    'loqater': 'Loqater',
    'kinderzitjes': 'Kinderzitjes',
    'foutcodes': 'Foutcodes',
    'blogs': 'Blogs',
    'locatie': 'Locatie',
    'joure': 'Joure',
    'beleid': 'Beleid',
    'privacybeleid': 'Privacybeleid',
    'algemene-voorwaarden': 'Algemene Voorwaarden',
    'amsterdam': 'Amsterdam',
    'den-haag': 'Den Haag',
    'utrecht': 'Utrecht',
    'arnhem': 'Arnhem',
    's-hertogenbosch': "'s-Hertogenbosch",
    'maastricht': 'Maastricht',
    'zwolle': 'Zwolle',
    'assen': 'Assen',
    'leeuwarden': 'Leeuwarden',
    'groningen': 'Groningen',
    'middelburg': 'Middelburg',
    'lelystad': 'Lelystad',
    'batterij-verzorging-fatbike': 'Batterij Verzorging',
    'foutcodes-fatbike-oplossen': 'Foutcodes Oplossen',
    'hoe-onderhoud-je-een-fatbike': 'Hoe Onderhoud Je Een Fatbike',
    'veelvoorkomende-fatbike-problemen': 'Veelvoorkomende Problemen',
    'wanneer-fatbike-laten-onderhouden': 'Wanneer Laten Onderhouden',
    'winter-onderhoud-fatbike': 'Winter Onderhoud',
  }

  // Special case: for /locatie/joure, combine into one breadcrumb to avoid broken /locatie link
  if (pathname === '/locatie/joure') {
    breadcrumbItems.push({ label: 'Locatie Joure', href: '/locatie/joure' })
  } else {
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbItems.push({ label, href: currentPath })
    })
  }

  // Generate JSON-LD structured data for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `https://fatbikehulp.nl${item.href}`
    }))
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-900 font-semibold">{item.label}</span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-brand-dark hover:text-brand-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}

