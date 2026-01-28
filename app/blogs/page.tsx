'use client'

import Link from 'next/link'
import Image from 'next/image'

const blogs = [
  {
    slug: 'hoe-onderhoud-je-een-fatbike',
    title: 'Hoe onderhoud je een fatbike?',
    excerpt: 'Een complete gids voor het onderhouden van uw fatbike. Leer hoe u uw elektrische fiets in topconditie houdt en wanneer u professioneel onderhoud nodig heeft.',
    date: '15 januari 2025',
    readTime: '5 min lezen',
    category: 'Onderhoud',
  },
  {
    slug: 'veelvoorkomende-fatbike-problemen',
    title: 'Veelvoorkomende fatbike problemen en oplossingen',
    excerpt: 'Ontdek de meest voorkomende problemen met fatbikes en hoe u deze kunt herkennen en oplossen. Van batterij problemen tot motor issues.',
    date: '10 januari 2025',
    readTime: '7 min lezen',
    category: 'Reparatie',
  },
  {
    slug: 'wanneer-fatbike-laten-onderhouden',
    title: 'Wanneer moet je je fatbike laten onderhouden?',
    excerpt: 'Leer wanneer het tijd is voor onderhoud van uw fatbike. We leggen uit welke signalen u niet moet negeren en hoe vaak u onderhoud nodig heeft.',
    date: '5 januari 2025',
    readTime: '4 min lezen',
    category: 'Onderhoud',
  },
  {
    slug: 'winter-onderhoud-fatbike',
    title: 'Winter onderhoud voor uw fatbike',
    excerpt: 'Tips en tricks voor het onderhouden van uw fatbike tijdens de wintermaanden. Zorg dat uw fiets klaar is voor koud weer en gladde wegen.',
    date: '20 december 2024',
    readTime: '6 min lezen',
    category: 'Onderhoud',
  },
  {
    slug: 'batterij-verzorging-fatbike',
    title: 'Batterij verzorging: Zo verleng je de levensduur',
    excerpt: 'Alles wat u moet weten over het verzorgen van uw fatbike batterij. Tips om de levensduur te verlengen en prestaties te optimaliseren.',
    date: '15 december 2024',
    readTime: '5 min lezen',
    category: 'Onderhoud',
  },
  {
    slug: 'foutcodes-fatbike-oplossen',
    title: 'Fatbike foutcodes: Wat betekenen ze en hoe los je ze op?',
    excerpt: 'Een uitgebreide gids over fatbike foutcodes. Leer wat elke foutcode betekent en wanneer u professionele hulp nodig heeft.',
    date: '10 december 2024',
    readTime: '8 min lezen',
    category: 'Reparatie',
  },
]

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
<main>
        {/* Hero Section */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#323232' }}>
              Fatbike Tips, Onderhoud & Reparatie Blog
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mb-6">
              Ontdek handige tips, gidsen en nieuws over fatbike onderhoud, reparatie en meer. 
              Onze ervaren technici delen hun kennis om u te helpen uw fatbike in topconditie te houden.
            </p>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Op onze blog vindt u uitgebreide gidsen en praktische tips voor het onderhouden en repareren van uw fatbike. 
                Of u nu een beginnende fatbike eigenaar bent of al jarenlang ervaring heeft, onze artikelen helpen u om uw 
                elektrische fiets optimaal te onderhouden en problemen te voorkomen.
              </p>
              <p>
                Onze technici hebben jarenlange ervaring met alle bekende fatbike merken en delen graag hun expertise. 
                Van basis onderhoudstips tot complexe reparatiegidsen - wij behandelen alle aspecten van fatbike verzorging. 
                Leer wanneer u professioneel onderhoud nodig heeft, hoe u veelvoorkomende problemen herkent en wat u zelf kunt doen.
              </p>
              <p>
                Regelmatig publiceren wij nieuwe artikelen over actuele onderwerpen, seizoensgebonden onderhoud, nieuwe technieken 
                en best practices. Abonneer u op onze updates of bezoek regelmatig onze blog voor de nieuwste informatie en tips.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link 
                  key={blog.slug} 
                  href={`/blogs/${blog.slug}`}
                  className="bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-brand-light text-brand-dark text-sm font-semibold rounded-full">
                        {blog.category}
                      </span>
                      <span className="text-sm text-gray-500">{blog.readTime}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#323232' }}>
                      {blog.title}
                    </h2>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{blog.date}</span>
                      <span className="text-brand-dark font-semibold hover:text-brand-medium">
                        Lees meer →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Same as homepage */}
      <footer className="text-white py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="px-6 sm:px-8 lg:px-12 py-12">
              {/* Logo */}
              <div className="mb-8">
                <Link href="/">
                  <div className="inline-block bg-white rounded-lg p-2">
                    <Image 
                      src="/fatbikehulp-logo-kerst.png" 
                      alt="Fatbikehulp.nl logo - Professionele fatbike reparatie en onderhoud service" 
                      width={200}
                      height={80}
                      className="h-10 sm:h-12 w-auto"
                    />
                  </div>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* Reparatie inplannen sectie */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Reparatie inplannen?</h3>
                  <div className="space-y-2">
                    <Link href="/reparatie/amsterdam" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Amsterdam
                    </Link>
                    <Link href="/reparatie/den-haag" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Den Haag
                    </Link>
                    <Link href="/reparatie/utrecht" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Utrecht
                    </Link>
                    <Link href="/reparatie/arnhem" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Arnhem
                    </Link>
                    <Link href="/reparatie/s-hertogenbosch" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in 's-Hertogenbosch
                    </Link>
                    <Link href="/reparatie/maastricht" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Maastricht
                    </Link>
                    <Link href="/reparatie/zwolle" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Zwolle
                    </Link>
                    <Link href="/reparatie/assen" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Assen
                    </Link>
                    <Link href="/reparatie/leeuwarden" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Leeuwarden
                    </Link>
                    <Link href="/reparatie/groningen" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Groningen
                    </Link>
                    <Link href="/reparatie/middelburg" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Middelburg
                    </Link>
                    <Link href="/reparatie/lelystad" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie in Lelystad
                    </Link>
                  </div>
                </div>

                {/* Service sectie */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Service</h3>
                  <div className="space-y-2">
                    <Link href="/foutcodes" className="block text-white hover:text-white/80 transition-colors">
                      Foutcodes
                    </Link>
                    <Link href="/onderhoud" className="block text-white hover:text-white/80 transition-colors">
                      Onderhoud
                    </Link>
                    <Link href="/reparatie" className="block text-white hover:text-white/80 transition-colors">
                      Reparatie
                    </Link>
                    <Link href="/aanvraag" className="block text-white hover:text-white/80 transition-colors">
                      Aanvragen
                    </Link>
                    <Link href="/tarieven" className="block text-white hover:text-white/80 transition-colors">
                      Tarieven
                    </Link>
                    <Link href="/loqater" className="block text-white hover:text-white/80 transition-colors">
                      Loqater
                    </Link>
                    <Link href="/kinderzitjes" className="block text-white hover:text-white/80 transition-colors">
                      Kinderzitjes
                    </Link>
                    <Link href="/loqater" className="block text-white hover:text-white/80 transition-colors">
                      Plaatsen GPS systemen
                    </Link>
                    <Link href="/blogs" className="block text-white hover:text-white/80 transition-colors">
                      Blogs
                    </Link>
                  </div>
                </div>

                {/* Beleid sectie */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Beleid</h3>
                  <div className="space-y-2">
                    <Link href="/beleid" className="block text-white hover:text-white/80 transition-colors">
                      Beleid
                    </Link>
                    <Link href="/algemene-voorwaarden" className="block text-white hover:text-white/80 transition-colors">
                      Algemene voorwaarden
                    </Link>
                    <Link href="/privacybeleid" className="block text-white hover:text-white/80 transition-colors">
                      Privacybeleid
                    </Link>
                  </div>
                </div>

                {/* Hulp nodig sectie */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Hulp nodig?</h3>
                  <div className="space-y-2 text-white mb-4">
                    <p>+31 85 060 4213</p>
                    <p>
                      <a href="mailto:claims@fatbikehulp.nl" className="text-white hover:text-white/80 transition-colors">
                        claims@fatbikehulp.nl
                      </a>
                    </p>
                    <p>
                      <Link href="/locatie/joure" className="text-white hover:text-white/80 transition-colors">
                        Brandermeer 4a, Joure, 8502TV
                      </Link>
                    </p>
                  </div>
                  <a 
                    href="https://wa.me/31850604213" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors mb-4"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </a>
                  
                  {/* Trustpilot Widget */}
                  <div className="flex flex-col gap-2">
                    <div className="w-fit">
                      <Image 
                        src="/trustpilot-logo.webp" 
                        alt="Trustpilot beoordeling - TrustScore 4.9 met 132 reviews" 
                        width={150}
                        height={45}
                        className="h-10 w-auto"
                      />
                    </div>
                    <div className="text-white text-sm">
                      <span className="font-semibold">TrustScore 4.9</span>
                      <br />
                      <span className="underline">132 reviews</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-white/20 pt-8 text-center">
                <p className="text-white/80">© 2025 Fatbikehulp.nl. Alle rechten voorbehouden.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
