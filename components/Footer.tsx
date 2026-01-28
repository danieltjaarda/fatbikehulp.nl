import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="text-white py-2 sm:py-3 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="px-6 sm:px-8 lg:px-12 py-12">
            {/* Logo */}
            <div className="mb-8">
              <Link href="/">
                <div className="inline-block">
                  <Image 
                    src="/producten/fatbikehulp-logo-footer-3.png" 
                    alt="Fatbikehulp Logo" 
                    width={180}
                    height={60}
                    className="h-12 sm:h-14 w-auto"
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
                  <Link href="/kennisbank" className="block text-white hover:text-white/80 transition-colors">
                    Kennisbank
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
                  <Link href="/herroepingsrecht" className="block text-white hover:text-white/80 transition-colors">
                    Herroepingsrecht
                  </Link>
                  <Link href="/klachtenregeling" className="block text-white hover:text-white/80 transition-colors">
                    Klachtenregeling
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
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Image 
                      src="/trustpilot-stars.png" 
                      alt="Trustpilot 5 sterren" 
                      width={120}
                      height={20}
                      className="h-4 w-auto"
                    />
                    <span className="text-sm text-white/80">4.9 / 132 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm space-y-2">
              <p>&copy; {new Date().getFullYear()} Fatbikehulp.nl - Alle rechten voorbehouden</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <p>KVK: 96813091</p>
                <p>BTW: NL867772979B01</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}






