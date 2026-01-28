'use client'

import Layout from '@/components/Layout'
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react'
import { useState } from 'react'

type Source = 'Google' | 'Gofatbike.nl' | 'TikTok' | 'Instagram'
type TimePeriod = 'dagen' | 'weken' | 'maanden' | 'jaar'

export default function AnalyticsPage() {
  const [selectedSource, setSelectedSource] = useState<Source>('Google')
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('dagen')

  // Mock data - in productie zou dit van een API komen
  const getAnalyticsData = () => {
    // Dit zou in productie van een API komen gebaseerd op selectedSource en selectedPeriod
    return {
      views: 1250,
      clicks: 320,
      conversions: 45,
      visitors: 890
    }
  }

  const data = getAnalyticsData()

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600">Bekijk de prestaties van je marketingkanalen</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Source Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bron
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value as Source)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]"
              >
                <option value="Google">Google</option>
                <option value="Gofatbike.nl">Gofatbike.nl</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>

            {/* Time Period Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tijdperiode
              </label>
              <div className="flex gap-2">
                {(['dagen', 'weken', 'maanden', 'jaar'] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedPeriod === period
                        ? 'bg-[#ff6b35] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Weergaven</p>
                <p className="text-2xl font-semibold text-gray-900">{data.views.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Klikken</p>
                <p className="text-2xl font-semibold text-gray-900">{data.clicks.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Conversies</p>
                <p className="text-2xl font-semibold text-gray-900">{data.conversions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Bezoekers</p>
                <p className="text-2xl font-semibold text-gray-900">{data.visitors.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Chart Placeholder */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Prestaties voor {selectedSource} - Laatste {selectedPeriod}
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-sm">
              Grafiek wordt hier weergegeven voor {selectedSource} over de laatste {selectedPeriod}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}







