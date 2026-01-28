'use client'

import { useState, useEffect } from 'react'
import { Klant } from '@/types/database'
import { Users, Phone, Mail, MapPin } from 'lucide-react'
import Layout from '@/components/Layout'
import { reparatieService } from '@/lib/reparatieService'

// Mock data
const mockKlanten: Klant[] = [
  {
    id: '1',
    naam: 'Jan de Vries',
    email: 'jan@example.com',
    telefoon: '06-12345678',
    adres: 'Hoofdstraat 123',
    postcode: '1234 AB',
    plaats: 'Amsterdam',
    created_at: '2025-01-01T10:00:00Z',
    updated_at: '2025-01-01T10:00:00Z'
  },
  {
    id: '2',
    naam: 'Maria Jansen',
    email: 'maria@example.com',
    telefoon: '06-87654321',
    adres: 'Kerkstraat 45',
    postcode: '5678 CD',
    plaats: 'Utrecht',
    created_at: '2025-01-02T14:30:00Z',
    updated_at: '2025-01-02T14:30:00Z'
  },
  {
    id: '3',
    naam: 'Piet Bakker',
    email: 'piet@example.com',
    telefoon: '06-11223344',
    adres: 'Schoolstraat 78',
    postcode: '9012 EF',
    plaats: 'Rotterdam',
    created_at: '2025-01-03T09:15:00Z',
    updated_at: '2025-01-03T09:15:00Z'
  },
  {
    id: '4',
    naam: 'Lisa van der Berg',
    email: 'lisa@example.com',
    telefoon: '06-55667788',
    adres: 'Parkweg 12',
    postcode: '3456 GH',
    plaats: 'Den Haag',
    created_at: '2025-01-04T16:45:00Z',
    updated_at: '2025-01-04T16:45:00Z'
  },
  {
    id: '5',
    naam: 'Tom de Jong',
    email: 'tom@example.com',
    telefoon: '06-99887766',
    adres: 'Molenstraat 34',
    postcode: '7890 IJ',
    plaats: 'Eindhoven',
    created_at: '2025-01-05T11:20:00Z',
    updated_at: '2025-01-05T11:20:00Z'
  }
]

export default function KlantenPage() {
  const [klanten, setKlanten] = useState<Klant[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'naam' | 'plaats' | 'created_at'>('naam')

  useEffect(() => {
    const loadKlanten = async () => {
      try {
        const response = await fetch('/api/klanten')
        if (response.ok) {
          const data = await response.json()
          setKlanten(data.length > 0 ? data : mockKlanten)
        } else {
          console.error('Error loading klanten:', response.statusText)
          // Fallback naar mock data
          setKlanten(mockKlanten)
        }
      } catch (err) {
        console.error('Error loading klanten:', err)
        // Fallback naar mock data
        setKlanten(mockKlanten)
      }
    }

    loadKlanten()
  }, [])

  const filteredAndSortedKlanten = klanten
    .filter(klant => 
      klant.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klant.plaats?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'naam':
          return a.naam.localeCompare(b.naam)
        case 'plaats':
          return (a.plaats || '').localeCompare(b.plaats || '')
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

  return (
    <Layout>
      <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Klanten</h1>
        <p className="text-sm sm:text-base text-gray-600">Beheer alle klantgegevens</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Zoeken
            </label>
            <input
              type="text"
              id="search"
              placeholder="Zoek op naam, email of plaats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff6b35] focus:border-[#ff6b35]"
            />
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Sorteren op
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'naam' | 'plaats' | 'created_at')}
              className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff6b35] focus:border-[#ff6b35]"
            >
              <option value="naam">Naam</option>
              <option value="plaats">Plaats</option>
              <option value="created_at">Datum toegevoegd</option>
            </select>
          </div>
        </div>
      </div>

      {/* Klanten grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAndSortedKlanten.map((klant) => (
          <div key={klant.id} className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center flex-1 min-w-0">
                <div className="bg-[#fff4f0] rounded-full p-2 sm:p-3 mr-2 sm:mr-3 flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff6b35]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{klant.naam}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Klant sinds {new Date(klant.created_at).toLocaleDateString('nl-NL')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="truncate">{klant.email}</span>
              </div>
              
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span>{klant.telefoon}</span>
              </div>
              
              {klant.adres && (
                <div className="flex items-start text-xs sm:text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="truncate">{klant.adres}</div>
                    <div>{klant.postcode} {klant.plaats}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 bg-[#ff6b35] text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-[#e55a2b] transition-colors">
                  Bekijk details
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                  Bewerken
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedKlanten.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Geen klanten gevonden</h3>
          <p className="mt-1 text-sm text-gray-500">
            Probeer je zoekcriteria aan te passen.
          </p>
        </div>
      )}

      {/* Statistieken */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Totaal klanten</p>
              <p className="text-2xl font-semibold text-gray-900">{klanten.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Nieuwe klanten deze maand</p>
              <p className="text-2xl font-semibold text-gray-900">
                {klanten.filter(k => {
                  const created = new Date(k.created_at)
                  const now = new Date()
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-[#fff4f0] rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-[#ff6b35]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Actieve klanten</p>
              <p className="text-2xl font-semibold text-gray-900">{klanten.length}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}
