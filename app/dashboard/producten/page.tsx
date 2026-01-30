'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Plus, Pencil, Trash2, X, Package, Check, Search, Filter, MoreVertical } from 'lucide-react'

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
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

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
          const result = await res.json()
          console.log('Product updated:', result)
          await fetchProducten()
          handleCloseModal()
        } else {
          const error = await res.json()
          console.error('Error updating product:', error)
          alert('Fout bij opslaan: ' + (error.error || 'Onbekende fout'))
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
        } else {
          const error = await res.json()
          console.error('Error creating product:', error)
          alert('Fout bij opslaan: ' + (error.error || 'Onbekende fout'))
        }
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Fout bij opslaan: ' + (error instanceof Error ? error.message : 'Onbekende fout'))
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

  const handleToggleVoorraad = async (product: Product) => {
    try {
      const newVoorraad = product.voorraad > 0 ? 0 : 10 // Toggle tussen uit voorraad (0) en op voorraad (10)
      const res = await fetch('/api/producten', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, voorraad: newVoorraad })
      })
      if (res.ok) {
        fetchProducten()
      }
    } catch (error) {
      console.error('Error toggling voorraad:', error)
    }
  }

  const handleDeleteAllOutOfStock = async () => {
    const outOfStockProducts = producten.filter(p => p.voorraad === 0)
    
    if (outOfStockProducts.length === 0) {
      alert('Geen producten met voorraad 0 gevonden.')
      return
    }

    const confirmMessage = `Weet je zeker dat je alle ${outOfStockProducts.length} product(en) met voorraad 0 wilt verwijderen?\n\nDit kan niet ongedaan worden gemaakt!`
    
    if (!confirm(confirmMessage)) {
      return
    }

    try {
      let deletedCount = 0
      let errorCount = 0

      for (const product of outOfStockProducts) {
        try {
          const res = await fetch(`/api/producten?id=${product.id}`, {
            method: 'DELETE'
          })
          if (res.ok) {
            deletedCount++
          } else {
            errorCount++
          }
        } catch (error) {
          console.error(`Error deleting product ${product.id}:`, error)
          errorCount++
        }
      }

      await fetchProducten()
      
      if (errorCount === 0) {
        alert(`✅ ${deletedCount} product(en) succesvol verwijderd.`)
      } else {
        alert(`⚠️ ${deletedCount} product(en) verwijderd, ${errorCount} fout(en) opgetreden.`)
      }
    } catch (error) {
      console.error('Error deleting out of stock products:', error)
      alert('Fout bij verwijderen van producten.')
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

  const filteredProducten = producten.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.beschrijving.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && product.actief) ||
      (filterStatus === 'inactive' && !product.actief)
    return matchesSearch && matchesStatus
  })

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducten.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducten.map(p => p.id))
    }
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header - Shopify Style */}
        <div className="border-b border-[#e1e3e5] bg-white">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-[#202223]">Producten</h1>
                <p className="text-sm text-[#6d7175] mt-1">{producten.length} totaal</p>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 bg-[#008060] hover:bg-[#006e52] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Product toevoegen
              </button>
            </div>

            {/* Search and Filters - Shopify Style */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6d7175]" />
                <input
                  type="text"
                  placeholder="Zoek producten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] placeholder-[#8c9196] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-4 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
              >
                <option value="all">Alle status</option>
                <option value="active">Actief</option>
                <option value="inactive">Inactief</option>
              </select>
              {producten.filter(p => p.voorraad === 0).length > 0 && (
                <button
                  onClick={handleDeleteAllOutOfStock}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Verwijder uit voorraad ({producten.filter(p => p.voorraad === 0).length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedProducts.length > 0 && (
          <div className="bg-[#f6f6f7] border-b border-[#e1e3e5] px-6 py-3 flex items-center justify-between">
            <span className="text-sm text-[#202223] font-medium">
              {selectedProducts.length} geselecteerd
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  selectedProducts.forEach(id => {
                    const product = producten.find(p => p.id === id)
                    if (product && !product.actief) {
                      handleToggleActive(product)
                    }
                  })
                  setSelectedProducts([])
                }}
                className="px-3 py-1.5 text-sm text-[#202223] hover:bg-[#e1e3e5] rounded transition-colors"
              >
                Activeren
              </button>
              <button
                onClick={() => {
                  selectedProducts.forEach(id => {
                    const product = producten.find(p => p.id === id)
                    if (product && product.actief) {
                      handleToggleActive(product)
                    }
                  })
                  setSelectedProducts([])
                }}
                className="px-3 py-1.5 text-sm text-[#202223] hover:bg-[#e1e3e5] rounded transition-colors"
              >
                Deactiveren
              </button>
              <button
                onClick={() => {
                  if (confirm(`Weet je zeker dat je ${selectedProducts.length} product(en) wilt verwijderen?`)) {
                    selectedProducts.forEach(id => handleDelete(id))
                    setSelectedProducts([])
                  }
                }}
                className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                Verwijderen
              </button>
            </div>
          </div>
        )}

        {/* Products Table - Shopify Style */}
        <div className="bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#e1e3e5]">
                  <th className="px-4 py-3 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducten.length && filteredProducten.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-[#008060] border-[#d1d3d4] rounded focus:ring-[#008060] cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">
                    Categorie
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">
                    Prijs
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">
                    Voorraad
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#6d7175] uppercase tracking-wider w-20">
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008060]"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducten.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[#6d7175]">
                      {searchQuery || filterStatus !== 'all' 
                        ? 'Geen producten gevonden met deze filters.' 
                        : 'Geen producten gevonden. Klik op "Product toevoegen" om er een toe te voegen.'}
                    </td>
                  </tr>
                ) : (
                  filteredProducten.map((product) => (
                    <tr key={product.id} className="border-b border-[#e1e3e5] hover:bg-[#f6f6f7] transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleSelectProduct(product.id)}
                          className="w-4 h-4 text-[#008060] border-[#d1d3d4] rounded focus:ring-[#008060] cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#f6f6f7] rounded flex items-center justify-center flex-shrink-0 overflow-hidden border border-[#e1e3e5]">
                            {product.afbeelding_url ? (
                              <img 
                                src={product.afbeelding_url} 
                                alt={product.naam}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-[#8c9196]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[#202223] truncate text-sm">{product.naam}</p>
                            <p className="text-xs text-[#6d7175] truncate max-w-xs">{product.beschrijving}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#f6f6f7] text-[#202223] capitalize">
                          {categorieOptions.find(c => c.value === product.categorie)?.label || product.categorie}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#202223] font-medium">
                          €{product.prijs.toFixed(2).replace('.', ',')}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={product.voorraad > 0}
                            onChange={() => handleToggleVoorraad(product)}
                            className="w-4 h-4 text-[#008060] border-[#d1d3d4] rounded focus:ring-[#008060] cursor-pointer"
                            title={product.voorraad > 0 ? "Op voorraad" : "Uit voorraad"}
                          />
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            product.voorraad === 0 
                              ? 'bg-[#fee7e7] text-[#d72c0d]' 
                              : product.voorraad <= 5 
                                ? 'bg-[#fff4e6] text-[#b98900]'
                                : 'bg-[#e3fcef] text-[#008060]'
                          }`}>
                            {product.voorraad > 0 ? 'Op voorraad' : 'Uit voorraad'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleActive(product)}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                            product.actief 
                              ? 'bg-[#e3fcef] text-[#008060] hover:bg-[#d4edda]' 
                              : 'bg-[#f6f6f7] text-[#6d7175] hover:bg-[#e1e3e5]'
                          }`}
                        >
                          {product.actief ? 'Actief' : 'Inactief'}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-1.5 text-[#6d7175] hover:text-[#202223] hover:bg-[#f6f6f7] rounded transition-colors"
                          title="Bewerken"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal - Shopify Style */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e1e3e5]">
                <h2 className="text-lg font-semibold text-[#202223]">
                  {editingProduct ? 'Product bewerken' : 'Nieuw product'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 text-[#6d7175] hover:text-[#202223] hover:bg-[#f6f6f7] rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#202223] mb-1.5">
                    Productnaam <span className="text-[#d72c0d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.naam}
                    onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] placeholder-[#8c9196] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                    placeholder="Bijv. Fatbike Binnenband 20x4.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#202223] mb-1.5">
                    Beschrijving <span className="text-[#d72c0d]">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.beschrijving}
                    onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] placeholder-[#8c9196] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent resize-none"
                    placeholder="Beschrijf het product..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#202223] mb-1.5">
                      Prijs (€) <span className="text-[#d72c0d]">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.prijs}
                      onChange={(e) => setFormData({ ...formData, prijs: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#202223] mb-1.5">
                      Voorraad <span className="text-[#d72c0d]">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.voorraad}
                      onChange={(e) => setFormData({ ...formData, voorraad: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#202223] mb-1.5">
                    Categorie <span className="text-[#d72c0d]">*</span>
                  </label>
                  <select
                    required
                    value={formData.categorie}
                    onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                  >
                    {categorieOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#202223] mb-1.5">
                    Afbeelding URL
                  </label>
                  <input
                    type="text"
                    value={formData.afbeelding_url}
                    onChange={(e) => setFormData({ ...formData, afbeelding_url: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d1d3d4] rounded text-sm text-[#202223] placeholder-[#8c9196] focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                    placeholder="Bijv. /fatbike-binnenband.png"
                  />
                  <p className="text-xs text-[#6d7175] mt-1.5">
                    Pad naar afbeelding in de public map, bijv. /fatbike-binnenband.png
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="actief"
                    checked={formData.actief}
                    onChange={(e) => setFormData({ ...formData, actief: e.target.checked })}
                    className="w-4 h-4 text-[#008060] border-[#d1d3d4] rounded focus:ring-[#008060] cursor-pointer"
                  />
                  <label htmlFor="actief" className="text-sm font-medium text-[#202223] cursor-pointer">
                    Product is actief (zichtbaar op de website)
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#e1e3e5]">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-[#d1d3d4] text-[#202223] rounded text-sm font-medium hover:bg-[#f6f6f7] transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Opslaan...
                      </>
                    ) : (
                      editingProduct ? 'Bijwerken' : 'Product toevoegen'
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

