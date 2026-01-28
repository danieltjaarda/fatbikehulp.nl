'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'

interface Order {
  id: string
  number: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    totalSpent: string
    ordersCount: string
  }
  billing: {
    address1: string
    city: string
    zip: string
    country: string
  }
  shipping: {
    address1: string
    city: string
    zip: string
    country: string
  }
  items: Array<{
    title: string
    quantity: string
    price: string
    total: string
  }>
  total: string
  status: string
  fulfillmentStatus: string
  createdAt: string
  updatedAt: string
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetail, setShowOrderDetail] = useState(false)

  useEffect(() => {
    loadOrdersData()
  }, [])

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 150) // Reduced to 150ms for faster response

    return () => clearTimeout(timer)
  }, [searchTerm])

  const loadOrdersData = async () => {
    try {
      const response = await fetch('/Orders.csv')
      const text = await response.text()
      
      // Use a more efficient CSV parsing approach
      const lines = text.split('\n')
      const headers = lines[0].split('","').map(h => h.replace(/"/g, ''))
      
      // Find relevant column indices once
      const colIndices = {
        id: headers.indexOf('ID'),
        name: headers.indexOf('Name'),
        lineType: headers.indexOf('Line: Type'),
        topRow: headers.indexOf('Top Row'),
        customerFirstName: headers.indexOf('Customer: First Name'),
        customerLastName: headers.indexOf('Customer: Last Name'),
        customerEmail: headers.indexOf('Customer: Email'),
        customerPhone: headers.indexOf('Customer: Phone'),
        customerTotalSpent: headers.indexOf('Customer: Total Spent'),
        customerOrdersCount: headers.indexOf('Customer: Orders Count'),
        billingAddress1: headers.indexOf('Billing: Address 1'),
        billingCity: headers.indexOf('Billing: City'),
        billingZip: headers.indexOf('Billing: Zip'),
        billingCountry: headers.indexOf('Billing: Country'),
        shippingAddress1: headers.indexOf('Shipping: Address 1'),
        shippingCity: headers.indexOf('Shipping: City'),
        shippingZip: headers.indexOf('Shipping: Zip'),
        shippingCountry: headers.indexOf('Shipping: Country'),
        priceTotal: headers.indexOf('Price: Total'),
        paymentStatus: headers.indexOf('Payment: Status'),
        fulfillmentStatus: headers.indexOf('Order Fulfillment Status'),
        createdAt: headers.indexOf('Created At'),
        updatedAt: headers.indexOf('Updated At'),
        lineTitle: headers.indexOf('Line: Title'),
        lineQuantity: headers.indexOf('Line: Quantity'),
        linePrice: headers.indexOf('Line: Price'),
        lineTotal: headers.indexOf('Line: Total')
      }
      
      const orderMap = new Map<string, Order>()
      
      // Process in chunks to avoid blocking
      const chunkSize = 1000
      for (let i = 1; i < lines.length; i += chunkSize) {
        const chunk = lines.slice(i, Math.min(i + chunkSize, lines.length))
        
        chunk.forEach(line => {
          if (!line.trim()) return
          
          const values = line.split('","').map(v => v.replace(/"/g, ''))
          
          // Quick check for line type
          if (values[colIndices.lineType] === 'Line Item' && values[colIndices.topRow] === 'true') {
            const orderId = values[colIndices.id]
            
            if (!orderMap.has(orderId)) {
              orderMap.set(orderId, {
                id: orderId,
                number: values[colIndices.name],
                customer: {
                  firstName: values[colIndices.customerFirstName] || '',
                  lastName: values[colIndices.customerLastName] || '',
                  email: values[colIndices.customerEmail] || '',
                  phone: values[colIndices.customerPhone] || '',
                  totalSpent: values[colIndices.customerTotalSpent] || '0',
                  ordersCount: values[colIndices.customerOrdersCount] || '0'
                },
                billing: {
                  address1: values[colIndices.billingAddress1] || '',
                  city: values[colIndices.billingCity] || '',
                  zip: values[colIndices.billingZip] || '',
                  country: values[colIndices.billingCountry] || ''
                },
                shipping: {
                  address1: values[colIndices.shippingAddress1] || '',
                  city: values[colIndices.shippingCity] || '',
                  zip: values[colIndices.shippingZip] || '',
                  country: values[colIndices.shippingCountry] || ''
                },
                items: [{
                  title: values[colIndices.lineTitle] || '',
                  quantity: values[colIndices.lineQuantity] || '0',
                  price: values[colIndices.linePrice] || '0',
                  total: values[colIndices.lineTotal] || '0'
                }],
                total: values[colIndices.priceTotal] || '0',
                status: values[colIndices.paymentStatus] || '',
                fulfillmentStatus: values[colIndices.fulfillmentStatus] || '',
                createdAt: values[colIndices.createdAt] || '',
                updatedAt: values[colIndices.updatedAt] || ''
              })
            }
          }
        })
        
        // Allow UI to update
        await new Promise(resolve => setTimeout(resolve, 0))
      }
      
      const ordersArray = Array.from(orderMap.values())
      // Sort by date descending (newest first)
      ordersArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      
      setOrders(ordersArray)
      setFilteredOrders(ordersArray.slice(0, 100)) // Show only first 100 initially
      setLoading(false)
    } catch (error) {
      console.error('Error loading orders:', error)
      setLoading(false)
    }
  }

  // Memoized search function for better performance
  const searchOrders = useCallback((searchQuery: string, orderList: Order[]) => {
    if (!searchQuery) return orderList.slice(0, 100) // Return first 100 when not searching
    
    const search = searchQuery.toLowerCase()
    const results: Order[] = []
    
    // Stop after finding 100 matches for performance
    for (const order of orderList) {
      if (results.length >= 100) break
      
      // Create searchable text once per order
      const searchableText = `
        ${order.number} 
        ${order.customer.firstName} 
        ${order.customer.lastName} 
        ${order.customer.email} 
        ${order.customer.phone} 
        ${order.shipping.zip} 
        ${order.shipping.city} 
        ${order.billing.zip} 
        ${order.billing.city}
      `.toLowerCase()
      
      if (searchableText.includes(search)) {
        results.push(order)
      }
    }
    
    return results
  }, [])

  // Search functionality with debouncing
  useEffect(() => {
    setSearching(true)
    
    // Simulate search delay for smooth animation
    const searchTimer = setTimeout(() => {
      const filtered = searchOrders(debouncedSearchTerm, orders)
      setFilteredOrders(filtered)
      setSearching(false)
    }, 100) // Small delay for smooth transition

    return () => clearTimeout(searchTimer)
  }, [debouncedSearchTerm, orders, searchOrders])

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount) || 0
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(num)
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetail(true)
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Orders</h1>
            <div className="flex items-center w-full sm:w-auto">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Zoek orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searching && (
                  <div className="absolute right-3 top-2.5">
                    <svg className="animate-spin h-5 w-5 text-[#ff6b35]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table - Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Totaal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
              </tr>
            </thead>
            <tbody className={`bg-white divide-y divide-gray-200 transition-opacity duration-200 ${searching ? 'opacity-50' : 'opacity-100'}`}>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-40 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="animate-spin h-10 w-10 text-[#ff6b35] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-gray-500">Orders laden...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg mb-2">Geen orders gevonden</p>
                      <p className="text-sm">Probeer een andere zoekterm</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        {order.number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items.length > 0 ? order.items[0].title : 'Geen product'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </td>
                  </tr>
                  ))}
                  {filteredOrders.length === 100 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 bg-gray-50">
                        Eerste 100 resultaten weergegeven. Verfijn je zoekopdracht voor specifiekere resultaten.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-200">
          {loading ? (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-[#ff6b35] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-500 text-sm">Orders laden...</p>
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500">
                <p className="text-base mb-2">Geen orders gevonden</p>
                <p className="text-sm">Probeer een andere zoekterm</p>
              </div>
            </div>
          ) : (
            <>
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-blue-600 truncate">{order.number}</div>
                      <div className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 ml-2">{formatCurrency(order.total)}</div>
                  </div>
                  <div className="text-sm text-gray-900 mb-1">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                  <div className="text-xs text-gray-500 mb-2 truncate">{order.customer.email}</div>
                  <div className="text-sm text-gray-700 mb-1">
                    {order.items.length > 0 ? order.items[0].title : 'Geen product'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
              {filteredOrders.length === 100 && (
                <div className="p-4 text-center text-xs text-gray-500 bg-gray-50">
                  Eerste 100 resultaten weergegeven. Verfijn je zoekopdracht voor specifiekere resultaten.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Order {selectedOrder.number}
              </h2>
              <button
                onClick={() => setShowOrderDetail(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Klantgegevens</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Naam:</span>
                        <span className="text-sm text-gray-900">
                          {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Email:</span>
                        <span className="text-sm text-gray-900">{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Telefoon:</span>
                        <span className="text-sm text-gray-900">{selectedOrder.customer.phone || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Totaal uitgegeven:</span>
                        <span className="text-sm text-gray-900">
                          {formatCurrency(selectedOrder.customer.totalSpent)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Aantal orders:</span>
                        <span className="text-sm text-gray-900">{selectedOrder.customer.ordersCount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Verzendadres</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-1">
                      <p className="text-sm text-gray-900">{selectedOrder.shipping.address1}</p>
                      <p className="text-sm text-gray-900">
                        {selectedOrder.shipping.zip} {selectedOrder.shipping.city}
                      </p>
                      <p className="text-sm text-gray-900">{selectedOrder.shipping.country}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Bestelde items</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              Product
                            </th>
                            <th className="px-3 sm:px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                              Aantal
                            </th>
                            <th className="px-3 sm:px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                              Prijs
                            </th>
                            <th className="px-3 sm:px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                              Totaal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedOrder.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">{item.title}</td>
                              <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 text-right">{item.quantity}</td>
                              <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 text-right">
                                {formatCurrency(item.price)}
                              </td>
                              <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 text-right">
                                {formatCurrency(item.total)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-100">
                          <tr>
                            <td colSpan={3} className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 text-right">
                              Totaal:
                            </td>
                            <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 text-right">
                              {formatCurrency(selectedOrder.total)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Status</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Betaling:</span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedOrder.status === 'authorized' || selectedOrder.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Verzending:</span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedOrder.fulfillmentStatus === 'fulfilled' 
                            ? 'bg-green-100 text-green-800' 
                            : selectedOrder.fulfillmentStatus === 'unfulfilled'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedOrder.fulfillmentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Tijdlijn</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Aangemaakt:</span>
                        <span className="text-sm text-gray-900">{formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Laatst bijgewerkt:</span>
                        <span className="text-sm text-gray-900">{formatDate(selectedOrder.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
