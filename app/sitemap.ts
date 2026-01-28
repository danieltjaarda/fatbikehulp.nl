import { MetadataRoute } from 'next'

const steden = [
  'amsterdam',
  'den-haag',
  'utrecht',
  'arnhem',
  's-hertogenbosch',
  'maastricht',
  'zwolle',
  'assen',
  'leeuwarden',
  'groningen',
  'middelburg',
  'lelystad',
]

const blogPages = [
  'batterij-verzorging-fatbike',
  'foutcodes-fatbike-oplossen',
  'hoe-onderhoud-je-een-fatbike',
  'veelvoorkomende-fatbike-problemen',
  'wanneer-fatbike-laten-onderhouden',
  'winter-onderhoud-fatbike',
]

const kennisbankPages = [
  'fatbike-band-plakken',
  'fatbike-remmen-vervangen',
  'hoe-lang-gaat-een-fatbike-mee',
  'hydraulische-rem-olie-vervangen-fatbike',
  'fatbike-bandenspanning',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fatbikehulp.nl'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aanvraag`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/onderhoud`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reparatie`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tarieven`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/foutcodes`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/loqater`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kinderzitjes`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locatie/joure`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kennisbank`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/beleid`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/algemene-voorwaarden`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacybeleid`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Stad-specifieke reparatie pagina's
  const stedenpages = steden.map((stad) => ({
    url: `${baseUrl}/reparatie/${stad}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Blog artikelen
  const blogArticles = blogPages.map((blog) => ({
    url: `${baseUrl}/blogs/${blog}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Kennisbank artikelen
  const kennisbankArticles = kennisbankPages.map((artikel) => ({
    url: `${baseUrl}/kennisbank/${artikel}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...stedenpages, ...blogArticles, ...kennisbankArticles]
}