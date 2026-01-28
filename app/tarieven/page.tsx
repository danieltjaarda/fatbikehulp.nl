'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function TarievenPage() {
  return (
    <div className="min-h-screen bg-white">
{/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#323232' }}>
              Fatbike Reparatie & Onderhoud Tarieven
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-6">
              Transparante prijzen voor al onze diensten en onderdelen. Kies de onderhoudsbeurt die bij u past.
            </p>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bij Fatbikehulp.nl geloven wij in transparante en eerlijke prijzen. Op deze pagina vindt u een duidelijk overzicht 
                van alle kosten voor fatbike reparatie, onderhoudsbeurten en het plaatsen van onderdelen. Geen verborgen kosten, geen 
                verrassingen achteraf. Alle prijzen zijn inclusief BTW en duidelijk vermeld.
              </p>
              <p>
                Onze onderhoudspakketten zijn speciaal ontwikkeld voor fatbikes en elektrische fietsen. Of u nu kiest voor het BASIC 
                pakket voor regelmatig onderhoud, het PREMIUM pakket voor uitgebreide service, of het DELUXE pakket voor een complete 
                revisie - alle pakketten worden uitgevoerd door ervaren technici met hoogwaardige onderdelen.
              </p>
            </div>
          </div>
        </section>

        {/* Onderhoudsbeurten Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#323232' }}>
              Onderhoudsbeurten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* BASIC Package */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 flex flex-col">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#323232' }}>BASIC</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-600">Door heel Nederland</span>
                  <span className="text-lg">🇳🇱</span>
                </div>
                <div className="mb-6">
                  <span className="text-gray-400 line-through text-lg">€169</span>
                  <span className="text-red-600 text-2xl font-bold ml-2">€129</span>
                  <span className="text-sm text-gray-600 ml-2">INCL BTW</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Ketting smeren en remmen afstellen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">De Fatbike helemaal na lopen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Alle moeren, bouten, trapas, wielas strak draaien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">In de werkplaats binnen 45 minuten onderhouden</span>
                  </li>
                </ul>
                <Link href="/aanvraag">
                  <button className="w-full bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                    Boek Service
                  </button>
                </Link>
              </div>

              {/* PREMIUM Package */}
              <div className="bg-brand-medium border-2 border-black rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden">
                {/* Populair banner rechts */}
                <div className="absolute -right-8 top-6 rotate-45 bg-red-500 text-white text-xs font-bold px-10 py-1 shadow-lg">
                  POPULAIR
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-white">PREMIUM</h3>
                  <div className="text-right mr-8">
                    <span className="text-xs text-white/80 block">Meest gekozen</span>
                    <span className="text-xs text-yellow-300">★★★★★</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-white/90">Door heel Nederland</span>
                  <span className="text-lg">🇳🇱</span>
                </div>
                <div className="mb-6">
                  <span className="text-white/60 line-through text-lg">€289</span>
                  <span className="text-red-500 text-3xl font-bold ml-2 drop-shadow-lg">€159</span>
                  <span className="text-sm text-white/80 ml-2">INCL BTW</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Remblokken verwisselen (voor & achter)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">De Fatbike helemaal na lopen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Alle moeren, bouten, trapas, wielas strak draaien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">In de werkplaats binnen 45 minuten onderhouden</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Versnellingen afstellen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Accu check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Verlichting controleren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Banden oppompen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Kettingsmeren en remmen afstellen</span>
                  </li>
                </ul>
                <Link href="/aanvraag">
                  <button className="w-full bg-white text-brand-medium px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Boek Service
                  </button>
                </Link>
              </div>

              {/* DELUXE Package */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 flex flex-col">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#323232' }}>DELUXE</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-600">Door heel Nederland</span>
                  <span className="text-lg">🇳🇱</span>
                </div>
                <div className="mb-6">
                  <span className="text-gray-400 line-through text-lg">€309</span>
                  <span className="text-red-600 text-2xl font-bold ml-2">€229</span>
                  <span className="text-sm text-gray-600 ml-2">INCL BTW</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Remblokken verwisselen (voor & achter)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">De Fatbike helemaal na lopen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Alle moeren, bouten, trapas, wielas strak draaien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Direct op locatie binnen 45 minuten onderhouden</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Versnellingen afstellen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Alle bouten, moeren, trapas, wielas en de ketting insmeren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Verlichting controleren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Banden oppompen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Banden wissel voor & achter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Reinigen Fatbike (Nieuwstaat maken)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-dark mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Kettingsmeren en remmen afstellen</span>
                  </li>
                </ul>
                <Link href="/aanvraag">
                  <button className="w-full bg-brand-medium text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                    Boek Service
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Belangrijke informatie Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#323232' }}>
                Belangrijke informatie
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold mb-2" style={{ color: '#323232' }}>
                    Rij kosten op locatie
                  </p>
                  <p>
                    Voor reparaties en onderhoud op locatie worden €49 rij kosten in rekening gebracht (INCL BTW).
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2" style={{ color: '#323232' }}>
                    Betaalmethoden
                  </p>
                  <p>
                    Op locatie kunt u betalen met pin of contant. Beide betaalmethoden zijn toegestaan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onderdelen Section */}
        <section className="bg-white py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#323232' }}>
              Onderdelen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Table 1 */}
              <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold" style={{ color: '#323232' }}>Onderdelen</th>
                        <th className="px-4 py-3 text-right font-bold" style={{ color: '#323232' }}>Prijs € INCL BTW</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Versnelling Shimano</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">59</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Mand</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">34</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">M5 Display</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">79</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Loqater</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">120</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Voorrekje</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">50</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Stuurhouder</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">39</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Controller</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">89</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Velg</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">79</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Motor</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">239</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Voorvork</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">179</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Trapsensor</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">38</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Standaard</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">28</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Remschijf</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">15</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Hydraulische R</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">75</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Hydraulische L</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">75</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Spatbord</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">79</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Trappers</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">18</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Handvaten</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">19</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Zadel</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">59</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Crankset</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">65</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Voetsteuntjes</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2 */}
              <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold" style={{ color: '#323232' }}>Onderdelen</th>
                        <th className="px-4 py-3 text-right font-bold" style={{ color: '#323232' }}>Prijs € INCL BTW</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Accu</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">379</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">OUXI Koplamp</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">49</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Remblokken</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">30</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Binnenband</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">35</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Achterlicht</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">34</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Oplader</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">69</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Cassette</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">49</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Achterzitje</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">69</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Accu Houder</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">69</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Buitenband</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">39</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Kabelboom</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">49</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Licht Schakelaar</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">34</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Mechanische Remklauw</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">34</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Derailleur</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">59</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Remkabel</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">15</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Ketting</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">20</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Alarm-systeem</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">39</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SEO Content Section */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#323232' }}>
              Transparante tarieven voor fatbike reparatie en onderhoud
            </h2>
            <div className="text-gray-700 space-y-6 text-lg leading-relaxed">
              <p>
                Bij Fatbikehulp.nl geloven wij in <strong>transparante en eerlijke prijzen</strong> voor alle diensten. 
                Op deze pagina vindt u een duidelijk overzicht van onze tarieven voor fatbike reparatie, onderhoudsbeurten en 
                het plaatsen van onderdelen. Geen verborgen kosten, geen verrassingen achteraf.
              </p>
              <p>
                Onze onderhoudspakketten zijn speciaal ontwikkeld voor fatbikes en elektrische fietsen. Of u nu kiest voor het 
                <strong>BASIC pakket</strong> voor regelmatig onderhoud, het <strong>PREMIUM pakket</strong> voor uitgebreide service, 
                of het <strong>DELUXE pakket</strong> voor een complete revisie - alle pakketten worden uitgevoerd door ervaren technici 
                met hoogwaardige onderdelen.
              </p>
              <p>
                Voor reparaties op locatie rekenen wij een vaste ritprijs per kilometer. Dit betekent dat u altijd van tevoren weet 
                wat de kosten zijn. Alle reparaties worden uitgevoerd met originele onderdelen waar mogelijk, en wij bieden 
                <strong>3 maanden garantie</strong> op alle uitgevoerde werkzaamheden.
              </p>
              <p>
                Heeft u vragen over onze tarieven of wilt u een offerte op maat? Neem gerust contact met ons op via ons 
                <Link href="/aanvraag" className="text-brand-dark hover:text-brand-medium underline font-semibold">online formulier</Link> of 
                bel ons direct. Wij helpen u graag bij het kiezen van het juiste onderhoudspakket of het plannen van uw reparatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Werkplaats Image Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Tekst links */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#323232' }}>
                Onze Professionele Werkplaats
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Volledig uitgerust met de nieuwste apparatuur voor fatbike reparatie en onderhoud.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Professionele fietslift voor optimale werkhouding</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Specialistisch gereedschap voor alle fatbike merken</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Ruime voorraad originele onderdelen</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-dark mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Diagnose apparatuur voor elektrische systemen</span>
                </li>
              </ul>
              <Link href="/aanvraag">
                <button className="bg-brand-medium text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors">
                  Plan uw afspraak
                </button>
              </Link>
            </div>
            
            {/* Afbeelding rechts */}
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/tarieven-werkplaats.png" 
                  alt="Professionele fatbike werkplaats met opgehangen fatbikes en moderne apparatuur" 
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Same as homepage */}
      <footer className="text-white py-2 sm:py-3 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="px-6 sm:px-8 lg:px-12 py-12">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <div className="inline-block bg-white rounded-lg p-2">
                <Image 
                  src="/fatbikehulp-logo-kerst.png" 
                  alt="Fatbikehulp Logo" 
                  width={200}
                  height={80}
                  className="h-10 sm:h-12 w-auto"
                />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Hulp nodig?</h3>
              <div className="space-y-2 text-white mb-4">
                <p>+31 85 060 4213</p>
                <p>
                  <a href="mailto:claims@fatbikehulp.nl" className="text-white hover:text-white/80 transition-colors">
                    claims@fatbikehulp.nl
                  </a>
                </p>
                <p>Brandermeer 4a, Joure, 8502TV</p>
              </div>
              <a 
                href="https://wa.me/31850604213" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
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

