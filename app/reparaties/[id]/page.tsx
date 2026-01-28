'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Reparatie } from '@/types/database'
import { ArrowLeft, Clock, CheckCircle, XCircle, Wrench, User, Phone, Mail, MapPin, Calendar, MessageSquare, Bike, Archive, ArchiveRestore } from 'lucide-react'
import Layout from '@/components/Layout'

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

export default function ReparatieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [reparatie, setReparatie] = useState<Reparatie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadReparatie = async () => {
      try {
        const response = await fetch('/api/reparaties')
        if (response.ok) {
          const reparaties = await response.json()
          const foundReparatie = reparaties.find((r: Reparatie) => r.id === params.id)
          setReparatie(foundReparatie || null)
        }
      } catch (err) {
        console.error('Error loading reparatie:', err)
      } finally {
        setLoading(false)
      }
    }
    loadReparatie()
  }, [params.id])

  const updateStatus = async (newStatus: Reparatie['status']) => {
    try {
      const response = await fetch(`/api/reparaties/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        setReparatie(prev => prev ? { ...prev, status: newStatus, updated_at: new Date().toISOString() } : null)
      }
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const toggleArchive = async () => {
    if (!reparatie) return
    try {
      const response = await fetch(`/api/reparaties/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: !reparatie.archived }),
      })
      if (response.ok) {
        setReparatie(prev => prev ? { ...prev, archived: !prev.archived } : null)
      }
    } catch (err) {
      console.error('Error toggling archive:', err)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 bg-gray-200 rounded-xl"></div>
              <div className="h-48 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!reparatie) {
    return (
      <Layout>
        <div className="p-6 max-w-4xl mx-auto text-center py-20">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Reparatie niet gevonden</h2>
          <p className="text-gray-500 mb-6">De gevraagde reparatie bestaat niet of is verwijderd.</p>
          <button onClick={() => router.push('/reparaties')} className="bg-[#ff6b35] text-white px-6 py-2 rounded-lg hover:bg-[#e55a2b]">
            Terug naar overzicht
          </button>
        </div>
      </Layout>
    )
  }

  const statusInfo = statusConfig[reparatie.status]
  const StatusIcon = statusInfo.icon

  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <button onClick={() => router.push('/reparaties')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Terug naar overzicht
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex">
            <div className={`w-2 ${statusInfo.color}`} />
            <div className="flex-1 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-xl font-bold text-gray-900">
                      #{reparatie.reparatie_nummer || reparatie.id.slice(-6)}
                    </h1>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.bgLight} ${statusInfo.textColor}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusInfo.label}
                    </span>
                    {reparatie.archived && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Gearchiveerd</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Aangemaakt op {new Date(reparatie.created_at).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {reparatie.status === 'pending' && !reparatie.archived && (
                    <>
                      <button onClick={() => updateStatus('akkoord')} className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-600 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> Akkoord
                      </button>
                      <button onClick={() => updateStatus('afgewezen')} className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-semibold hover:bg-rose-600 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Afwijzen
                      </button>
                    </>
                  )}
                  {reparatie.status === 'akkoord' && !reparatie.archived && (
                    <button onClick={() => updateStatus('afgehandeld')} className="px-4 py-2 bg-slate-600 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4" /> Afhandelen
                    </button>
                  )}
                  <button onClick={toggleArchive} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 ${reparatie.archived ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {reparatie.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                    {reparatie.archived ? 'Herstellen' : 'Archiveren'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Klant Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#ff6b35]" /> Klant
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">{reparatie.klant_naam}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${reparatie.klant_email}`} className="text-gray-700 hover:text-[#ff6b35]">{reparatie.klant_email}</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{reparatie.klant_telefoon}</span>
              </div>
              
              {/* Contact Buttons */}
              <div className="flex gap-2 pt-2">
                <a
                  href={`https://wa.me/${reparatie.klant_telefoon?.replace(/[^0-9]/g, '').replace(/^0/, '31')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg font-medium hover:bg-[#1da851] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${reparatie.klant_telefoon}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#ff6b35] text-white py-2.5 rounded-lg font-medium hover:bg-[#e55a2b] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Bellen
                </a>
              </div>

              {reparatie.adres && (
                <div className="flex items-start gap-3 pt-2 border-t border-gray-100 mt-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{reparatie.adres}</p>
                    <p className="text-gray-500 text-sm">{reparatie.postcode} {reparatie.plaats}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fiets Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Bike className="w-5 h-5 text-[#ff6b35]" /> Fiets
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Merk</p>
                <p className="font-medium text-gray-900">{reparatie.fiets_merk}</p>
              </div>
              {reparatie.fiets_model && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Model</p>
                  <p className="font-medium text-gray-900">{reparatie.fiets_model}</p>
                </div>
              )}
              {reparatie.fiets_jaar && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bouwjaar</p>
                  <p className="font-medium text-gray-900">{reparatie.fiets_jaar}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Type</p>
                <p className="font-medium text-gray-900 capitalize">{reparatie.aanvraag_type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Locatie</p>
                <p className="font-medium text-gray-900">{reparatie.locatie_type === 'in_winkel' ? 'In winkel (Joure)' : 'Op locatie'}</p>
              </div>
              {reparatie.herkomst_platform && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Herkomst</p>
                  <p className="font-medium text-gray-900 capitalize">{reparatie.herkomst_platform.replace(/_/g, ' ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Probleem */}
          {(reparatie.probleem || reparatie.beschrijving) && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#ff6b35]" /> Probleem
              </h2>
              
              {reparatie.probleem && (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-3">
                  <p className="font-medium text-gray-900">{reparatie.probleem}</p>
                </div>
              )}
              {reparatie.beschrijving && (
                <p className="text-gray-600 text-sm">{reparatie.beschrijving}</p>
              )}
            </div>
          )}

          {/* Voorkeuren */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ff6b35]" /> Voorkeuren
            </h2>
            
            <div className="space-y-3">
              {reparatie.voorkeur_datum && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Voorkeur datum</p>
                  <p className="font-medium text-gray-900">
                    {new Date(reparatie.voorkeur_datum).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
              )}
              {reparatie.voorkeur_tijd && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Voorkeur tijd</p>
                  <p className="font-medium text-gray-900 capitalize">{reparatie.voorkeur_tijd}</p>
                </div>
              )}
              {reparatie.opmerkingen && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Opmerkingen</p>
                  <p className="text-gray-600 text-sm">{reparatie.opmerkingen}</p>
                </div>
              )}
              {!reparatie.voorkeur_datum && !reparatie.voorkeur_tijd && !reparatie.opmerkingen && (
                <p className="text-gray-400 text-sm italic">Geen voorkeuren opgegeven</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
