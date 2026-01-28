'use client'

import React from 'react'
import Layout from '@/components/Layout'
import { Mail, Users, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MarketingEmail {
  id: string
  email: string
  naam: string
  telefoon: string
  aangemeld_op: string
  herkomst_platform: string
}

export default function MarketingPage() {
  const pathname = usePathname()
  const [marketingEmails, setMarketingEmails] = useState<MarketingEmail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarketingEmails = async () => {
      try {
        const response = await fetch('/api/marketing/emails')
        const data = await response.json()
        setMarketingEmails(data)
      } catch (error) {
        console.error('Error fetching marketing emails:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketingEmails()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPlatform = (platform: string) => {
    const platformMap: { [key: string]: string } = {
      'google': 'Google',
      'gofatbike.nl': 'Gofatbike.nl',
      'instagram': 'Instagram',
      'tiktok': 'TikTok',
      'facebook': 'Facebook',
      'mond_op_mond': 'Mond op mond',
      'onbekend': 'Onbekend'
    }
    return platformMap[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Marketing</h1>
          <p className="text-sm sm:text-base text-gray-600">Beheer je marketing campagnes en e-mail lijsten</p>
        </div>

        {/* Submenu */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <Link
                href="/marketing"
                className={`${
                  pathname === '/marketing'
                    ? 'border-[#ff6b35] text-[#ff6b35]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  E-mail
                </div>
              </Link>
            </nav>
          </div>
        </div>

        {/* E-mail Marketing Content */}
        {pathname === '/marketing' && (
          <div>
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Totaal aangemeld</p>
                    <p className="text-2xl font-semibold text-gray-900">{marketingEmails.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">E-mail adressen</p>
                    <p className="text-2xl font-semibold text-gray-900">{marketingEmails.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Deze maand</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {marketingEmails.filter((email) => {
                        const emailDate = new Date(email.aangemeld_op)
                        const now = new Date()
                        return emailDate.getMonth() === now.getMonth() && emailDate.getFullYear() === now.getFullYear()
                      }).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* E-mail lijst */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">E-mail marketing lijst</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Personen die hebben aangevinkt "Ik wil meer nieuws weten" in het formulier
                </p>
              </div>
              <div className="p-4 sm:p-6">
                {loading ? (
                  <div className="text-center text-gray-500 text-sm py-8">Laden...</div>
                ) : marketingEmails.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Naam
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            E-mail
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Telefoon
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Platform
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aangemeld op
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {marketingEmails.map((email) => (
                          <tr key={email.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {email.naam}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <a href={`mailto:${email.email}`} className="text-[#ff6b35] hover:underline">
                                {email.email}
                              </a>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {email.telefoon || '-'}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {formatPlatform(email.herkomst_platform)}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(email.aangemeld_op)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm py-8">
                    Nog geen e-mailadressen aangemeld voor marketing
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}







