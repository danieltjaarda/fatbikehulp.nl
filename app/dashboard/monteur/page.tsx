'use client'

import React from 'react'
import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'
import { Truck, Clock, MapPin, Euro, Wrench, ChevronDown, ChevronRight, Calendar, TrendingUp, Package } from 'lucide-react'

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
  uitbetaald?: boolean
  uitbetaald_op?: string
  reparaties: Reparatie[]
}

// Kilometervergoeding (standaard)
const KM_VERGOEDING = 0.40
// Uurloon monteur
const UURLOON_MONTEUR = 20

export default function MonteurOverzichtPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(new Set())
  const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set())
  const [markingPaid, setMarkingPaid] = useState(false)
  
  useEffect(() => {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
  }, [])
  
  useEffect(() => {
    if (selectedDate) {
      fetchRoutes()
    }
  }, [selectedDate])
  
  const fetchRoutes = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/monteur?datum=${selectedDate}`)
      if (res.ok) {
        const data = await res.json()
        setRoutes(data)
      }
    } catch (error) {
      console.error('Error fetching routes:', error)
    } finally {
      setLoading(false)
    }
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
  
  const toggleSelectRoute = (routeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newSelected = new Set(selectedRoutes)
    if (newSelected.has(routeId)) {
      newSelected.delete(routeId)
    } else {
      newSelected.add(routeId)
    }
    setSelectedRoutes(newSelected)
  }
  
  const markSelectedAsPaid = async () => {
    if (selectedRoutes.size === 0) return
    
    setMarkingPaid(true)
    try {
      const res = await fetch('/api/monteur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark_paid',
          route_ids: Array.from(selectedRoutes)
        })
      })
      
      if (res.ok) {
        // Update local state
        setRoutes(routes.map(route => {
          if (selectedRoutes.has(route.id)) {
            return { ...route, uitbetaald: true, uitbetaald_op: new Date().toISOString() }
          }
          return route
        }))
        setSelectedRoutes(new Set())
      }
    } catch (error) {
      console.error('Error marking routes as paid:', error)
    } finally {
      setMarkingPaid(false)
    }
  }
  
  // Get unpaid routes
  const unpaidRoutes = routes.filter(r => r.status === 'afgerond' && !r.uitbetaald)
  const totalUnpaidHours = unpaidRoutes.reduce((sum, r) => sum + (r.totaal_uren || 0), 0)
  const totalUnpaidAmount = totalUnpaidHours * UURLOON_MONTEUR
  
  // Calculate route totals
  const calculateRouteTotals = (route: Route) => {
    const totaalOntvangen = route.reparaties.reduce((sum, r) => sum + (r.ontvangen_bedrag || 0), 0)
    const totaalKosten = route.reparaties.reduce((sum, r) => sum + (r.onderdelen_kosten || 0), 0)
    const kmKosten = (route.totaal_km || 0) * KM_VERGOEDING
    const loonKosten = (route.totaal_uren || 0) * UURLOON_MONTEUR
    const brutoWinst = totaalOntvangen - totaalKosten
    const nettoWinst = brutoWinst - kmKosten - loonKosten
    
    return { totaalOntvangen, totaalKosten, kmKosten, loonKosten, brutoWinst, nettoWinst }
  }
  
  // Calculate day totals
  const dayTotals = routes.reduce((acc, route) => {
    const routeTotals = calculateRouteTotals(route)
    return {
      reparaties: acc.reparaties + route.reparaties.length,
      totaalOntvangen: acc.totaalOntvangen + routeTotals.totaalOntvangen,
      totaalKosten: acc.totaalKosten + routeTotals.totaalKosten,
      totaalKm: acc.totaalKm + (route.totaal_km || 0),
      totaalUren: acc.totaalUren + (route.totaal_uren || 0),
      kmKosten: acc.kmKosten + routeTotals.kmKosten,
      loonKosten: acc.loonKosten + routeTotals.loonKosten,
      brutoWinst: acc.brutoWinst + routeTotals.brutoWinst,
      nettoWinst: acc.nettoWinst + routeTotals.nettoWinst,
    }
  }, {
    reparaties: 0,
    totaalOntvangen: 0,
    totaalKosten: 0,
    totaalKm: 0,
    totaalUren: 0,
    kmKosten: 0,
    loonKosten: 0,
    brutoWinst: 0,
    nettoWinst: 0,
  })
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  return (
    <Layout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#ff6b35] p-2 rounded-lg">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Monteur Routes</h1>
              <p className="text-sm sm:text-base text-gray-600">Overzicht van alle monteur routes en reparaties</p>
            </div>
          </div>
        </div>
        
        {/* Date Picker */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <label className="text-sm font-medium text-gray-700">Selecteer datum:</label>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
            <span className="text-gray-600 text-sm">
              {selectedDate && formatDate(selectedDate)}
            </span>
          </div>
        </div>
        
        {/* Day Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Truck className="h-4 w-4" />
              Routes
            </div>
            <p className="text-2xl font-bold text-gray-900">{routes.length}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Wrench className="h-4 w-4" />
              Reparaties
            </div>
            <p className="text-2xl font-bold text-gray-900">{dayTotals.reparaties}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <Clock className="h-4 w-4" />
              Uren
            </div>
            <p className="text-2xl font-bold text-gray-900">{dayTotals.totaalUren.toFixed(1)}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <MapPin className="h-4 w-4" />
              Kilometers
            </div>
            <p className="text-2xl font-bold text-gray-900">{dayTotals.totaalKm}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-green-600 text-sm mb-1">
              <Euro className="h-4 w-4" />
              Ontvangen
            </div>
            <p className="text-2xl font-bold text-green-600">€{dayTotals.totaalOntvangen.toFixed(2)}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-[#ff6b35] text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              Netto Winst
            </div>
            <p className={`text-2xl font-bold ${dayTotals.nettoWinst >= 0 ? 'text-[#ff6b35]' : 'text-red-600'}`}>
              €{dayTotals.nettoWinst.toFixed(2)}
            </p>
          </div>
        </div>
        
        {/* Unpaid Routes Alert */}
        {unpaidRoutes.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-yellow-800 font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Nog uit te betalen
                </h3>
                <p className="text-yellow-700 text-sm mt-1">
                  {unpaidRoutes.length} routes · {totalUnpaidHours} uren · <span className="font-semibold">€{totalUnpaidAmount.toFixed(2)}</span>
                </p>
              </div>
              {selectedRoutes.size > 0 && (
                <button
                  onClick={markSelectedAsPaid}
                  disabled={markingPaid}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {markingPaid ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Verwerken...
                    </>
                  ) : (
                    <>
                      <Euro className="h-4 w-4" />
                      Markeer {selectedRoutes.size} als uitbetaald
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Financial Summary Card */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 mb-6 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Euro className="h-5 w-5 text-[#ff6b35]" />
            Financieel Overzicht - {selectedDate && formatDate(selectedDate)}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Totaal Ontvangen</p>
              <p className="text-xl font-bold text-green-400">€{dayTotals.totaalOntvangen.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Onderdelen Kosten</p>
              <p className="text-xl font-bold text-red-400">-€{dayTotals.totaalKosten.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">KM Kosten (€{KM_VERGOEDING}/km)</p>
              <p className="text-xl font-bold text-red-400">-€{dayTotals.kmKosten.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Loonkosten (€{UURLOON_MONTEUR}/u)</p>
              <p className="text-xl font-bold text-red-400">-€{dayTotals.loonKosten.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Bruto Winst</p>
              <p className={`text-xl font-bold ${dayTotals.brutoWinst >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                €{dayTotals.brutoWinst.toFixed(2)}
              </p>
            </div>
            <div className="border-l border-slate-600 pl-4">
              <p className="text-slate-400 text-sm">Netto Winst</p>
              <p className={`text-2xl font-bold ${dayTotals.nettoWinst >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                €{dayTotals.nettoWinst.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Routes List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Routes ({routes.length})</h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b35] mx-auto mb-2"></div>
              Laden...
            </div>
          ) : routes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">Geen routes gevonden</p>
              <p className="text-sm">Er zijn geen monteur routes op deze datum</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {routes.map((route) => {
                const totals = calculateRouteTotals(route)
                const isExpanded = expandedRoutes.has(route.id)
                
                return (
                  <div key={route.id}>
                    {/* Route Header */}
                    <div className="flex items-center">
                      {/* Checkbox for unpaid routes */}
                      {route.status === 'afgerond' && !route.uitbetaald && (
                        <div 
                          className="pl-4 pr-2 py-4 flex items-center"
                          onClick={(e) => toggleSelectRoute(route.id, e)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedRoutes.has(route.id)}
                            onChange={() => {}}
                            className="h-5 w-5 text-green-600 border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      )}
                      <button
                        onClick={() => toggleRoute(route.id)}
                        className={`flex-1 px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors ${route.status === 'afgerond' && !route.uitbetaald ? 'pl-2' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              )}
                              <div className={`w-3 h-3 rounded-full ${
                                route.status === 'actief' ? 'bg-green-500 animate-pulse' : 
                                route.uitbetaald ? 'bg-green-500' : 'bg-yellow-500'
                              }`} />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-gray-900">{route.monteur_naam}</p>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
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
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{route.reparaties.length} reparaties</p>
                              <p className={`font-semibold ${totals.nettoWinst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                €{totals.nettoWinst.toFixed(2)}
                              </p>
                            </div>
                            {route.status === 'actief' ? (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Actief
                              </span>
                            ) : route.uitbetaald ? (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Betaald
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Open
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    
                    {/* Route Details */}
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-4 bg-gray-50">
                        {/* Route Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-4 border-b border-gray-200">
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Ontvangen</p>
                            <p className="text-lg font-semibold text-green-600">€{totals.totaalOntvangen.toFixed(2)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Onderdelen</p>
                            <p className="text-lg font-semibold text-red-600">-€{totals.totaalKosten.toFixed(2)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">KM Kosten</p>
                            <p className="text-lg font-semibold text-red-600">-€{totals.kmKosten.toFixed(2)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Loonkosten</p>
                            <p className="text-lg font-semibold text-red-600">-€{totals.loonKosten.toFixed(2)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Bruto Winst</p>
                            <p className={`text-lg font-semibold ${totals.brutoWinst >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                              €{totals.brutoWinst.toFixed(2)}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Netto Winst</p>
                            <p className={`text-lg font-semibold ${totals.nettoWinst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              €{totals.nettoWinst.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Reparaties */}
                        <div className="pt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <Wrench className="h-4 w-4" />
                            Reparaties ({route.reparaties.length})
                          </h4>
                          
                          {route.reparaties.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">Geen reparaties geregistreerd</p>
                          ) : (
                            <div className="space-y-2">
                              {route.reparaties.map((rep) => (
                                <div 
                                  key={rep.id}
                                  className="bg-white rounded-lg p-3 border border-gray-200"
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <span className="bg-[#ff6b35] text-white text-xs font-bold px-2 py-0.5 rounded">
                                        #{rep.reparatie_nummer}
                                      </span>
                                      <p className="text-sm text-gray-700 mt-1">
                                        {rep.beschrijving || 'Geen beschrijving'}
                                      </p>
                                    </div>
                                    <div className="text-right text-sm">
                                      <p className="text-green-600 font-medium">+€{rep.ontvangen_bedrag.toFixed(2)}</p>
                                      <p className="text-red-600">-€{rep.onderdelen_kosten.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Package className="h-3 w-3" />
                                      {rep.onderdelen_aantal} onderdelen
                                    </span>
                                    <span className="font-medium text-gray-700">
                                      Winst: €{(rep.ontvangen_bedrag - rep.onderdelen_kosten).toFixed(2)}
                                    </span>
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
      </div>
    </Layout>
  )
}

