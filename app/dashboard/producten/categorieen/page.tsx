'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Plus, Pencil, Trash2, X, Check, Loader2, FolderOpen } from 'lucide-react'

interface Categorie {
  id: string
  naam: string
  slug: string
  beschrijving?: string
  actief: boolean
  created_at: string
}

export default function CategorieenPage() {
  const [categorieen, setCategorieen] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategorie, setEditingCategorie] = useState<Categorie | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    naam: '',
    beschrijving: '',
    actief: true
  })

  useEffect(() => {
    fetchCategorieen()
  }, [])

  const fetchCategorieen = async () => {
    try {
      const response = await fetch('/api/categorieen')
      const data = await response.json()
      setCategorieen(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingCategorie(null)
    setFormData({ naam: '', beschrijving: '', actief: true })
    setError('')
    setShowModal(true)
  }

  const openEditModal = (categorie: Categorie) => {
    setEditingCategorie(categorie)
    setFormData({
      naam: categorie.naam,
      beschrijving: categorie.beschrijving || '',
      actief: categorie.actief
    })
    setError('')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.naam.trim()) {
      setError('Naam is verplicht')
      return
    }
    
    setSaving(true)
    setError('')

    try {
      const url = '/api/categorieen'
      const method = editingCategorie ? 'PUT' : 'POST'
      const body = editingCategorie 
        ? { id: editingCategorie.id, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Er ging iets mis')
      }

      await fetchCategorieen()
      setShowModal(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je deze categorie wilt verwijderen?')) {
      return
    }

    try {
      const response = await fetch(`/api/categorieen?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Er ging iets mis')
      }

      await fetchCategorieen()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const toggleActief = async (categorie: Categorie) => {
    try {
      const response = await fetch('/api/categorieen', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: categorie.id, actief: !categorie.actief })
      })

      if (response.ok) {
        await fetchCategorieen()
      }
    } catch (err) {
      console.error('Error toggling category:', err)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categorieën</h1>
            <p className="text-gray-600 mt-2">Beheer je product categorieën</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nieuwe Categorie
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#ff6b35]" />
          </div>
        ) : categorieen.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geen categorieën</h3>
            <p className="text-gray-600 mb-6">Maak je eerste categorie aan</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nieuwe Categorie
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Naam</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Slug</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Beschrijving</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categorieen.map((categorie) => (
                  <tr key={categorie.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{categorie.naam}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{categorie.slug}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm line-clamp-1">
                        {categorie.beschrijving || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleActief(categorie)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          categorie.actief
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {categorie.actief ? 'Actief' : 'Inactief'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(categorie)}
                          className="p-2 text-gray-400 hover:text-[#ff6b35] hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(categorie.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
              
              <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingCategorie ? 'Categorie Bewerken' : 'Nieuwe Categorie'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Naam *
                    </label>
                    <input
                      type="text"
                      value={formData.naam}
                      onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="Bijv. Accu's"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Beschrijving
                    </label>
                    <textarea
                      value={formData.beschrijving}
                      onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      rows={3}
                      placeholder="Korte beschrijving van de categorie"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="actief"
                      checked={formData.actief}
                      onChange={(e) => setFormData({ ...formData, actief: e.target.checked })}
                      className="w-4 h-4 text-[#ff6b35] border-gray-300 rounded focus:ring-[#ff6b35]"
                    />
                    <label htmlFor="actief" className="text-sm text-gray-700">
                      Categorie is actief (zichtbaar op de website)
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuleren
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Opslaan...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Opslaan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}




