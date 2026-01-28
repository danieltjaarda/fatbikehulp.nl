'use client'

import React, { useState, useEffect } from 'react'
import { Wrench, Clock, MapPin, Euro, Calendar, ChevronDown, ChevronRight, CheckCircle, XCircle, TrendingUp, ArrowLeft } from 'lucide-react'

interface Reparatie {
  id: string
  reparatie_nummer: string
  beschrijving: string
  onderdelen_aantal: number
  onderdelen_kosten: number
  ontvangen_bedrag: number
}

interface Route {
  id: string
  monteur_naam: string
  datum: string
  start_tijd: string
  eind_tijd?: string
  totaal_uren?: number
  totaal_km?: number
  status: 'actief' | 'afgerond'
  uitbetaald: boolean
  uitbetaald_op?: string
  reparaties: Reparatie[]
}

const UURLOON = 20

export default function MonteurDashboardPage() {
  const [monteurNaam, setMonteurNaam] = useState('')
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(new Set())
  const [showNameInput, setShowNameInput] = useState(true)
  
  useEffect(() => {
    const savedMonteur = localStorage.getItem('monteurNaam')
    if (savedMonteur) {
      setMonteurNaam(savedMonteur)
      setShowNameInput(false)
      fetchRoutes(savedMonteur)
    }
  }, [])
  
  const fetchRoutes = async (naam: string) => {
    if (!naam.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch(`/api/monteur?monteur=${encodeURIComponent(naam)}`)
      if (res.ok) {
        const data = await res.json()
        // Sort by date descending
        data.sort((a: Route, b: Route) => 
          new Date(b.datum).getTime() - new Date(a.datum).getTime()
        )
        setRoutes(data)
      }
    } catch (error) {
      console.error('Error fetching routes:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleNameSubmit = () => {
    if (!monteurNaam.trim()) return
    localStorage.setItem('monteurNaam', monteurNaam)
    setShowNameInput(false)
    fetchRoutes(monteurNaam)
  }
  
  const toggleRoute = (routeId: string) => {
    const newExpanded = new Set(expandedRoutes)
    if (newExpanded.has(routeId)) {
      newExpanded.delete(routeId)
    } else {
      newExpanded.add(routeId)
    }
    setExpandedRoutes(newExpanded)
  }
  
  // Calculate totals
  const afgerondeRoutes = routes.filter(r => r.status === 'afgerond')
  const uitbetaaldeRoutes = afgerondeRoutes.filter(r => r.uitbetaald)
  const openRoutes = afgerondeRoutes.filter(r => !r.uitbetaald)
  
  const totaalUrenUitbetaald = uitbetaaldeRoutes.reduce((sum, r) => sum + (r.totaal_uren || 0), 0)
  const totaalUrenOpen = openRoutes.reduce((sum, r) => sum + (r.totaal_uren || 0), 0)
  
  const bedragUitbetaald = totaalUrenUitbetaald * UURLOON
  const bedragOpen = totaalUrenOpen * UURLOON
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#ff6b35] p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Mijn Dashboard</h1>
                <p className="text-slate-400 text-sm">
                  {monteurNaam ? `Overzicht voor ${monteurNaam}` : 'Routes & Uitbetalingen'}
                </p>
              </div>
            </div>
            <a 
              href="/monteur" 
              className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug
            </a>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {showNameInput ? (
          /* Name Input */
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Wie ben jij?</h2>
            <p className="text-slate-400 text-sm mb-4">
              Vul je naam in om je routes en uitbetalingen te bekijken.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={monteurNaam}
                onChange={(e) => setMonteurNaam(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder="Jouw naam"
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
              />
              <button
                onClick={handleNameSubmit}
                className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Bekijken
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Change Name Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowNameInput(true)}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Andere monteur? Klik hier
              </button>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Uitbetaald
                </div>
                <p className="text-3xl font-bold text-green-400">€{bedragUitbetaald.toFixed(2)}</p>
                <p className="text-slate-500 text-sm mt-1">{totaalUrenUitbetaald} uren</p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  Nog te ontvangen
                </div>
                <p className="text-3xl font-bold text-yellow-400">€{bedragOpen.toFixed(2)}</p>
                <p className="text-slate-500 text-sm mt-1">{totaalUrenOpen} uren</p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Wrench className="h-4 w-4 text-[#ff6b35]" />
                  Totaal routes
                </div>
                <p className="text-3xl font-bold text-white">{afgerondeRoutes.length}</p>
                <p className="text-slate-500 text-sm mt-1">{routes.filter(r => r.status === 'actief').length} actief</p>
              </div>
            </div>
            
            {/* Routes List */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">Mijn Routes</h3>
              </div>
              
              {loading ? (
                <div className="p-8 text-center text-slate-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b35] mx-auto mb-2"></div>
                  Laden...
                </div>
              ) : routes.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Wrench className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Geen routes gevonden</p>
                  <p className="text-sm">Je hebt nog geen routes gereden</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700">
                  {routes.map((route) => {
                    const isExpanded = expandedRoutes.has(route.id)
                    const loon = (route.totaal_uren || 0) * UURLOON
                    
                    return (
                      <div key={route.id}>
                        {/* Route Header */}
                        <button
                          onClick={() => toggleRoute(route.id)}
                          className="w-full px-5 py-4 hover:bg-slate-700/30 transition-colors text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5 text-slate-400" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-slate-400" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-slate-500" />
                                  <span className="text-white font-medium">
                                    {formatDate(route.datum)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {route.start_tijd} - {route.eind_tijd || 'Actief'}
                                  </span>
                                  {route.totaal_uren && (
                                    <span>{route.totaal_uren}u</span>
                                  )}
                                  {route.totaal_km && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {route.totaal_km} km
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-white font-semibold">€{loon.toFixed(2)}</p>
                                <p className="text-slate-500 text-xs">{route.reparaties.length} reparaties</p>
                              </div>
                              {route.status === 'actief' ? (
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                                  Actief
                                </span>
                              ) : route.uitbetaald ? (
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  Betaald
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Open
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                        
                        {/* Route Details */}
                        {isExpanded && (
                          <div className="px-5 pb-4 bg-slate-900/30">
                            {/* Route Info */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-slate-700">
                              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                                <p className="text-xs text-slate-400">Uren</p>
                                <p className="text-lg font-semibold text-white">{route.totaal_uren || 0}</p>
                              </div>
                              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                                <p className="text-xs text-slate-400">Kilometers</p>
                                <p className="text-lg font-semibold text-white">{route.totaal_km || 0}</p>
                              </div>
                              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                                <p className="text-xs text-slate-400">Loon (€{UURLOON}/u)</p>
                                <p className="text-lg font-semibold text-green-400">€{loon.toFixed(2)}</p>
                              </div>
                              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                                <p className="text-xs text-slate-400">Status</p>
                                <p className={`text-lg font-semibold ${route.uitbetaald ? 'text-green-400' : 'text-yellow-400'}`}>
                                  {route.uitbetaald ? 'Betaald' : 'Open'}
                                </p>
                              </div>
                            </div>
                            
                            {route.uitbetaald && route.uitbetaald_op && (
                              <p className="text-xs text-slate-500 mt-2">
                                Uitbetaald op: {formatDate(route.uitbetaald_op)}
                              </p>
                            )}
                            
                            {/* Reparaties */}
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-slate-300 mb-2">
                                Reparaties ({route.reparaties.length})
                              </h4>
                              {route.reparaties.length === 0 ? (
                                <p className="text-sm text-slate-500 italic">Geen reparaties</p>
                              ) : (
                                <div className="space-y-2">
                                  {route.reparaties.map((rep) => (
                                    <div 
                                      key={rep.id}
                                      className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                                    >
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <span className="bg-[#ff6b35] text-white text-xs font-bold px-2 py-0.5 rounded">
                                            #{rep.reparatie_nummer}
                                          </span>
                                          <p className="text-sm text-slate-300 mt-1">
                                            {rep.beschrijving || 'Geen beschrijving'}
                                          </p>
                                        </div>
                                        <div className="text-right text-sm">
                                          <p className="text-green-400">+€{rep.ontvangen_bedrag.toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}




