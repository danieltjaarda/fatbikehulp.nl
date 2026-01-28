'use client'

import Layout from '@/components/Layout'
import { Wrench, Users, Clock, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Reparatie {
  id: string
  klant_naam: string
  probleem: string
  status: string
  created_at: string
}

interface Klant {
  id: string
  naam: string
  created_at: string
}

export default function DashboardPage() {
  const [reparaties, setReparaties] = useState<Reparatie[]>([])
  const [klanten, setKlanten] = useState<Klant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reparatiesRes, klantenRes] = await Promise.all([
          fetch('/api/reparaties'),
          fetch('/api/klanten')
        ])
        
        const reparatiesData = await reparatiesRes.json()
        const klantenData = await klantenRes.json()
        
        setReparaties(reparatiesData)
        setKlanten(klantenData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate statistics
  const stats = {
    inBehandeling: reparaties.filter(r => r.status === 'pending').length,
    akkoord: reparaties.filter(r => r.status === 'approved').length,
    afgewezen: reparaties.filter(r => r.status === 'rejected').length,
    totaalKlanten: klanten.length
  }

  // Get recent reparaties (last 5)
  const recenteReparaties = reparaties
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
  return (
    <Layout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Welkom bij het reparatie beheersysteem</p>
        </div>

        {/* Statistieken */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3 mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">In behandeling</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inBehandeling}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Akkoord</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.akkoord}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <Wrench className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Afgewezen</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.afgewezen}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Totaal klanten</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totaalKlanten}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recente activiteit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Recente reparaties</h3>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="text-center text-gray-500 text-sm">Laden...</div>
              ) : recenteReparaties.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {recenteReparaties.map((reparatie) => (
                    <div key={reparatie.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{reparatie.klant_naam}</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{reparatie.probleem}</p>
                        {(reparatie as any).reparatie_nummer && (
                          <p className="text-xs text-gray-400 mt-1">#{((reparatie as any).reparatie_nummer)}</p>
                        )}
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        reparatie.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        reparatie.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reparatie.status === 'pending' ? 'In behandeling' :
                         reparatie.status === 'approved' ? 'Akkoord' : 'Afgewezen'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">Geen reparaties gevonden</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Snelle acties</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                <a
                  href="/reparaties"
                  className="block w-full text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Bekijk alle reparaties
                </a>
                <a
                  href="/klanten"
                  className="block w-full text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Bekijk alle klanten
                </a>
                <a
                  href="/aanvraag"
                  className="block w-full text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Nieuwe aanvraag formulier
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

