'use client'

import { useState, useEffect } from 'react'
import { Reparatie } from '@/types/database'
import { CheckCircle, XCircle, Clock, Wrench, Archive, ArchiveRestore, Phone, Search, ChevronRight, Calendar, Bike } from 'lucide-react'
import Layout from '@/components/Layout'
import Link from 'next/link'

// Mock data
const mockReparaties: Reparatie[] = [
  {
    id: '1',
    klant_naam: 'Jan de Vries',
    klant_email: 'jan@example.com',
    klant_telefoon: '06-12345678',
    aanvraag_type: 'reparatie',
    fiets_merk: 'Gazelle',
    fiets_model: 'Orange C7',
    fiets_jaar: '2020',
    probleem: 'Ketting valt eraf',
    beschrijving: 'De ketting valt er regelmatig af tijdens het fietsen.',
    locatie_type: 'in_winkel',
    voorkeur_datum: '2025-01-15',
    voorkeur_tijd: 'ochtend',
    status: 'pending',
    archived: false,
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  }
]

const statusConfig = {
  pending: {
    label: 'In behandeling',
    color: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    icon: Clock
  },
  akkoord: {
    label: 'Akkoord',
    color: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    icon: CheckCircle
  },
  afgewezen: {
    label: 'Afgewezen',
    color: 'bg-rose-500',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-700',
    icon: XCircle
  },
  afgehandeld: {
    label: 'Afgehandeld',
    color: 'bg-slate-400',
    bgLight: 'bg-slate-50',
    textColor: 'text-slate-600',
    icon: Wrench
  }
}

const typeConfig: Record<string, { label: string; color: string; bgLight: string }> = {
  reparatie: { label: 'Reparatie', color: 'text-rose-700', bgLight: 'bg-rose-100' },
  onderhoud: { label: 'Onderhoud', color: 'text-sky-700', bgLight: 'bg-sky-100' },
  beide: { label: 'Rep + Onderhoud', color: 'text-violet-700', bgLight: 'bg-violet-100' },
  offerte: { label: 'Offerte', color: 'text-emerald-700', bgLight: 'bg-emerald-100' },
  bel_afspraak: { label: 'Bel afspraak', color: 'text-amber-700', bgLight: 'bg-amber-100' }
}

export default function ReparatiesPage() {
  const [reparaties, setReparaties] = useState<Reparatie[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showArchived, setShowArchived] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadReparaties = async () => {
      try {
        const response = await fetch('/api/reparaties')
        if (response.ok) {
          const data = await response.json()
          setReparaties(data.length > 0 ? data : mockReparaties)
        } else {
          setReparaties(mockReparaties)
        }
      } catch (err) {
        console.error('Error loading reparaties:', err)
        setReparaties(mockReparaties)
      }
    }
    loadReparaties()
  }, [])

  const filteredReparaties = reparaties
    .filter(reparatie => {
      const matchesArchived = showArchived ? reparatie.archived : !reparatie.archived
      const matchesStatus = filterStatus === 'all' || reparatie.status === filterStatus
      const matchesSearch = reparatie.klant_naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reparatie.klant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reparatie.klant_telefoon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reparatie.probleem?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesArchived && matchesStatus && matchesSearch
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const updateStatus = async (id: string, newStatus: Reparatie['status']) => {
    try {
      const response = await fetch(`/api/reparaties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        setReparaties(prev => prev.map(rep => 
          rep.id === id ? { ...rep, status: newStatus, updated_at: new Date().toISOString() } : rep
        ))
      }
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const toggleArchive = async (id: string, currentArchived: boolean) => {
    try {
      const response = await fetch(`/api/reparaties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: !currentArchived }),
      })
      if (response.ok) {
        setReparaties(prev => prev.map(rep => 
          rep.id === id ? { ...rep, archived: !currentArchived, updated_at: new Date().toISOString() } : rep
        ))
      }
    } catch (err) {
      console.error('Error updating archive status:', err)
    }
  }

  // Count per status
  const statusCounts = {
    all: reparaties.filter(r => showArchived ? r.archived : !r.archived).length,
    pending: reparaties.filter(r => r.status === 'pending' && (showArchived ? r.archived : !r.archived)).length,
    akkoord: reparaties.filter(r => r.status === 'akkoord' && (showArchived ? r.archived : !r.archived)).length,
    afgewezen: reparaties.filter(r => r.status === 'afgewezen' && (showArchived ? r.archived : !r.archived)).length,
    afgehandeld: reparaties.filter(r => r.status === 'afgehandeld' && (showArchived ? r.archived : !r.archived)).length,
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {showArchived ? 'Archief' : 'Reparaties'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredReparaties.length} {showArchived ? 'gearchiveerd' : 'actief'}
            </p>
          </div>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              showArchived 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-[#ff6b35] text-white hover:bg-[#e55a2b]'
            }`}
          >
            {showArchived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
            {showArchived ? 'Toon Actieve' : 'Archief'}
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: 'all', label: 'Alle', count: statusCounts.all },
            { key: 'pending', label: 'In behandeling', count: statusCounts.pending, color: 'bg-amber-500' },
            { key: 'akkoord', label: 'Akkoord', count: statusCounts.akkoord, color: 'bg-emerald-500' },
            { key: 'afgewezen', label: 'Afgewezen', count: statusCounts.afgewezen, color: 'bg-rose-500' },
            { key: 'afgehandeld', label: 'Afgehandeld', count: statusCounts.afgehandeld, color: 'bg-slate-400' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filterStatus === tab.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.color && <span className={`w-2 h-2 rounded-full ${tab.color}`} />}
              {tab.label}
              <span className={`text-xs ${filterStatus === tab.key ? 'text-gray-300' : 'text-gray-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Zoek op naam, email, telefoon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
          />
        </div>

        {/* Reparaties Cards */}
        <div className="space-y-3">
          {filteredReparaties.map((reparatie) => {
            const statusInfo = statusConfig[reparatie.status]
            const StatusIcon = statusInfo.icon
            const typeInfo = typeConfig[reparatie.aanvraag_type] || { label: reparatie.aanvraag_type, color: 'text-gray-700', bgLight: 'bg-gray-100' }

            return (
              <Link 
                href={`/reparaties/${reparatie.id}`}
                key={reparatie.id} 
                className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  {/* Status Bar Left */}
                  <div className={`w-1.5 ${statusInfo.color} flex-shrink-0`} />
                  
                  <div className="flex-1 p-4">
                    {/* Top Row: Status, Type, Date */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.bgLight} ${statusInfo.textColor}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusInfo.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.bgLight} ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                        <Calendar className="w-3 h-3" />
                        {new Date(reparatie.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                      </span>
                      {reparatie.reparatie_nummer && (
                        <span className="text-xs font-mono text-gray-500">#{reparatie.reparatie_nummer}</span>
                      )}
                    </div>

                    {/* Main Content: Two columns on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Customer Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{reparatie.klant_naam}</h3>
                        <p className="text-sm text-gray-500 mb-2">{reparatie.klant_email}</p>
                        
                        {/* Contact Buttons */}
                        <div className="flex gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`https://wa.me/${reparatie.klant_telefoon?.replace(/[^0-9]/g, '').replace(/^0/, '31')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#1da851] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${reparatie.klant_telefoon}`}
                            className="flex items-center gap-1.5 bg-[#ff6b35] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#e55a2b] transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {reparatie.klant_telefoon}
                          </a>
                        </div>
                      </div>

                      {/* Right: Bike & Problem Info */}
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                          <Bike className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{reparatie.fiets_merk} {reparatie.fiets_model}</span>
                          {reparatie.fiets_jaar && <span className="text-gray-400">({reparatie.fiets_jaar})</span>}
                        </div>
                        {reparatie.probleem && (
                          <p className="text-sm text-gray-600 line-clamp-2">{reparatie.probleem}</p>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                      {reparatie.status === 'pending' && !reparatie.archived && (
                        <>
                          <button
                            onClick={() => updateStatus(reparatie.id, 'akkoord')}
                            className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-200 transition-colors"
                          >
                            ✓ Akkoord
                          </button>
                          <button
                            onClick={() => updateStatus(reparatie.id, 'afgewezen')}
                            className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-200 transition-colors"
                          >
                            ✕ Afwijzen
                          </button>
                        </>
                      )}
                      {reparatie.status === 'akkoord' && !reparatie.archived && (
                        <button
                          onClick={() => updateStatus(reparatie.id, 'afgehandeld')}
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
                        >
                          ✓ Afhandelen
                        </button>
                      )}
                      
                      <button
                        onClick={() => toggleArchive(reparatie.id, reparatie.archived)}
                        className="px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                      >
                        {reparatie.archived ? <ArchiveRestore className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                        {reparatie.archived ? 'Herstellen' : 'Archiveren'}
                      </button>

                      <div className="ml-auto flex items-center text-gray-400 text-xs">
                        Bekijk details <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredReparaties.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Geen reparaties gevonden</h3>
            <p className="text-gray-500 text-sm">Probeer andere zoek- of filtercriteria.</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
