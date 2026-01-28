'use client'

import React from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

const artikelen = [
  {
    slug: 'fatbike-band-plakken',
    title: 'Fatbike band plakken: Stappenplan',
    excerpt: 'Leer hoe u zelf een lekke band van uw fatbike kunt plakken met dit uitgebreide stappenplan. Inclusief benodigde materialen en handige tips.',
    category: 'Reparatie',
    readTime: '10 min',
    date: '3 december 2024',
  },
  {
    slug: 'fatbike-remmen-vervangen',
    title: 'Fatbike remmen vervangen: Stappenplan',
    excerpt: 'Leer hoe u zelf de remmen van uw fatbike kunt vervangen. Stappenplan voor remblokken, remschijven en hydraulische remmen met duidelijke afbeeldingen.',
    category: 'Reparatie',
    readTime: '12 min',
    date: '3 december 2024',
  },
  {
    slug: 'hoe-lang-gaat-een-fatbike-mee',
    title: 'Hoe lang gaat een fatbike mee?',
    excerpt: 'Ontdek hoe lang een fatbike meegaat en welke factoren de levensduur beïnvloeden. Leer hoe u de levensduur van uw fatbike kunt verlengen met regelmatig onderhoud.',
    category: 'Onderhoud',
    readTime: '8 min',
    date: '3 december 2024',
  },
  {
    slug: 'hydraulische-rem-olie-vervangen-fatbike',
    title: 'Hydraulische rem olie vervangen fatbike',
    excerpt: 'Leer hoe u zelf de remolie van uw hydraulische remmen kunt vervangen. Stappenplan voor het ontluchten en bijvullen van remolie in fatbike remmen.',
    category: 'Onderhoud',
    readTime: '15 min',
    date: '3 december 2024',
  },
  {
    slug: 'fatbike-bandenspanning',
    title: 'Fatbike bandenspanning: Juiste druk instellen',
    excerpt: 'Leer wat de juiste bandenspanning is voor uw fatbike. Voor 20x4.00 banden is de maximale druk 1,8 bar (21 PSI). Stappenplan voor het controleren en aanpassen.',
    category: 'Onderhoud',
    readTime: '8 min',
    date: '3 december 2024',
  },
]

export default function KennisbankPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-light to-brand-medium py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#323232' }}>
                Kennisbank
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
                Handleidingen, tips en stappenplannen voor het onderhouden en repareren van uw fatbike
              </p>
            </div>
          </div>
        </section>

        {/* Artikelen Grid */}
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artikelen.map((artikel) => (
                <Link 
                  key={artikel.slug} 
                  href={`/kennisbank/${artikel.slug}`}
                  className="bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-brand-light text-brand-dark text-sm font-semibold rounded-full">
                        {artikel.category}
                      </span>
                      <span className="text-sm text-gray-500">{artikel.readTime}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#323232' }}>
                      {artikel.title}
                    </h2>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {artikel.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{artikel.date}</span>
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
      <Footer />
    </div>
  )
}

