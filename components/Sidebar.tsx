'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Wrench, Users, Settings, LogOut, ShoppingBag, Home, Menu, X, BarChart3, Mail, ChevronDown, ChevronRight, Truck, Package, Download } from 'lucide-react'

interface SidebarProps {
  onLogout: () => void
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMarketingOpen, setIsMarketingOpen] = useState(pathname?.startsWith('/marketing'))
  const [isProductenOpen, setIsProductenOpen] = useState(pathname?.startsWith('/dashboard/producten'))

  useEffect(() => {
    setIsProductenOpen(pathname?.startsWith('/dashboard/producten') || false)
  }, [pathname])

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Orders',
      href: '/orders',
      icon: ShoppingBag,
    },
    {
      name: 'Reparaties',
      href: '/reparaties',
      icon: Wrench,
    },
    {
      name: 'Klanten',
      href: '/klanten',
      icon: Users,
    },
    {
      name: 'Producten',
      href: '/dashboard/producten',
      icon: Package,
      submenuKey: 'producten',
      submenu: [
        {
          name: 'Overzicht',
          href: '/dashboard/producten',
        },
        {
          name: 'Categorieën',
          href: '/dashboard/producten/categorieen',
        },
        {
          name: 'Scraper',
          href: '/dashboard/producten/scraper',
        },
      ],
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
    },
    {
      name: 'Monteur Routes',
      href: '/dashboard/monteur',
      icon: Truck,
    },
    {
      name: 'Marketing',
      href: '/marketing',
      icon: Mail,
      submenuKey: 'marketing',
      submenu: [
        {
          name: 'E-mail',
          href: '/marketing',
        },
      ],
    },
    {
      name: 'Instellingen',
      href: '/settings',
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed lg:fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out flex-shrink-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/sidebar-logo.png"
              alt="Logo" 
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-xl font-bold text-center">Reparatie App</h1>
          <p className="text-gray-400 text-sm text-center">Beheer systeem</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.submenu && pathname?.startsWith(item.href))
            const hasSubmenu = item.submenu && item.submenu.length > 0
            
            const isSubmenuOpen = item.submenuKey === 'producten' ? isProductenOpen : 
                                  item.submenuKey === 'marketing' ? isMarketingOpen : false
            
            const toggleSubmenu = () => {
              if (item.submenuKey === 'producten') {
                setIsProductenOpen(!isProductenOpen)
              } else if (item.submenuKey === 'marketing') {
                setIsMarketingOpen(!isMarketingOpen)
              }
            }
            
            return (
              <div key={item.name}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={toggleSubmenu}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-[#ff6b35] text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                      {isSubmenuOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {isSubmenuOpen && item.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                                isSubActive
                                  ? 'bg-[#ff6b35] text-white'
                                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-sm">{subItem.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#ff6b35] text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <button
            onClick={() => {
              setIsMobileOpen(false)
              onLogout()
            }}
            className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Uitloggen</span>
          </button>
        </div>
      </div>
    </>
  )
}
