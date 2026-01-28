'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Plus, Pencil, Trash2, X, Package, Check } from 'lucide-react'

interface Product {
  id: string
  naam: string
  beschrijving: string
  prijs: number
  categorie: string
  afbeelding_url?: string
  voorraad: number
  actief: boolean
  created_at: string
  updated_at: string
}

const categorieOptions = [
  { value: 'banden', label: 'Banden' },
  { value: 'remmen', label: 'Remmen' },
  { value: 'verlichting', label: 'Verlichting' },
  { value: 'onderdelen', label: 'Onderdelen' },
  { value: 'accessoires', label: 'Accessoires' },
  { value: 'elektrisch', label: 'Elektrisch' }
]

const emptyProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
  naam: '',
  beschrijving: '',
  prijs: 0,
  categorie: 'onderdelen',
  afbeelding_url: '',
  voorraad: 0,
  actief: true
}

export default function ProductenBeheerPage() {
  const [producten, setProducten] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState(emptyProduct)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchProducten = async () => {
    try {
      const res = await fetch('/api/producten')
      const data = await res.json()
      setProducten(data)
    } catch (error) {
      console.error('Error fetching producten:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducten()
  }, [])

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        naam: product.naam,
        beschrijving: product.beschrijving,
        prijs: product.prijs,
        categorie: product.categorie,
        afbeelding_url: product.afbeelding_url || '',
        voorraad: product.voorraad,
        actief: product.actief
      })
    } else {
      setEditingProduct(null)
      setFormData(emptyProduct)
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData(emptyProduct)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingProduct) {
        // Update existing product
        const res = await fetch('/api/producten', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, ...formData })
        })
        if (res.ok) {
          await fetchProducten()
          handleCloseModal()
        }
      } else {
        // Create new product
        const res = await fetch('/api/producten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (res.ok) {
          await fetchProducten()
          handleCloseModal()
        }
      }
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/producten?id=${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        await fetchProducten()
        setDeleteConfirm(null)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleToggleActive = async (product: Product) => {
    try {
      const res = await fetch('/api/producten', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, actief: !product.actief })
      })
      if (res.ok) {
        await fetchProducten()
      }
    } catch (error) {
      console.error('Error toggling product:', error)
    }
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Producten Beheer</h1>
            <p className="text-gray-600 mt-1">Beheer de fatbike onderdelen voor de webshop</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 bg-[#ff6b35] hover:bg-[#e55a2a] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nieuw Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Totaal</p>
                <p className="text-xl font-bold">{producten.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Actief</p>
                <p className="text-xl font-bold">{producten.filter(p => p.actief).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 rounded-full p-2">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Laag op voorraad</p>
                <p className="text-xl font-bold">{producten.filter(p => p.voorraad <= 5 && p.voorraad > 0).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 rounded-full p-2">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Uitverkocht</p>
                <p className="text-xl font-bold">{producten.filter(p => p.voorraad === 0).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categorie
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prijs
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voorraad
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b35]"></div>
                      </div>
                    </td>
                  </tr>
                ) : producten.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      Geen producten gevonden. Klik op "Nieuw Product" om er een toe te voegen.
                    </td>
                  </tr>
                ) : (
                  producten.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {product.afbeelding_url ? (
                              <img 
                                src={product.afbeelding_url} 
                                alt={product.naam}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{product.naam}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">{product.beschrijving}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {categorieOptions.find(c => c.value === product.categorie)?.label || product.categorie}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-medium">
                        €{product.prijs.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.voorraad === 0 
                            ? 'bg-red-100 text-red-800' 
                            : product.voorraad <= 5 
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {product.voorraad}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleActive(product)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            product.actief 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {product.actief ? 'Actief' : 'Inactief'}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="p-2 text-gray-600 hover:text-[#ff6b35] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Bewerken"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {deleteConfirm === product.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                title="Bevestigen"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Annuleren"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Verwijderen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Product Bewerken' : 'Nieuw Product'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.naam}
                    onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    placeholder="Bijv. Fatbike Binnenband 20x4.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beschrijving *
                  </label>
                  <textarea
                    required
                    value={formData.beschrijving}
                    onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    placeholder="Beschrijf het product..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prijs (€) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.prijs}
                      onChange={(e) => setFormData({ ...formData, prijs: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Voorraad *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.voorraad}
                      onChange={(e) => setFormData({ ...formData, voorraad: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categorie *
                  </label>
                  <select
                    required
                    value={formData.categorie}
                    onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  >
                    {categorieOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Afbeelding URL
                  </label>
                  <input
                    type="text"
                    value={formData.afbeelding_url}
                    onChange={(e) => setFormData({ ...formData, afbeelding_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    placeholder="Bijv. /fatbike-binnenband.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pad naar afbeelding in de public map, bijv. /fatbike-binnenband.png
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="actief"
                    checked={formData.actief}
                    onChange={(e) => setFormData({ ...formData, actief: e.target.checked })}
                    className="w-4 h-4 text-[#ff6b35] border-gray-300 rounded focus:ring-[#ff6b35]"
                  />
                  <label htmlFor="actief" className="text-sm font-medium text-gray-700">
                    Product is actief (zichtbaar op de website)
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-[#ff6b35] text-white rounded-lg font-medium hover:bg-[#e55a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Opslaan...
                      </>
                    ) : (
                      editingProduct ? 'Bijwerken' : 'Toevoegen'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

