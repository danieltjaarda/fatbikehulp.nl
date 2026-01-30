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

      {/* Sidebar - Shopify Style */}
      <div className={`bg-[#1a1a1a] text-white w-64 min-h-screen fixed lg:fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out flex-shrink-0 border-r border-[#2d2d2d] ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-[#2d2d2d]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#5f98c1] rounded flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Fatbikehulp</h1>
              <p className="text-xs text-[#8c8c8c]">Admin</p>
            </div>
          </div>
        </div>

        <nav className="p-2 space-y-1">
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
                      className={`flex items-center justify-between w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#2d2d2d] text-white'
                          : 'text-[#b3b3b3] hover:bg-[#2d2d2d] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      {isSubmenuOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {isSubmenuOpen && item.submenu && (
                      <div className="ml-7 mt-1 space-y-1">
                        {item.submenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                                isSubActive
                                  ? 'bg-[#2d2d2d] text-white'
                                  : 'text-[#8c8c8c] hover:bg-[#2d2d2d] hover:text-white'
                              }`}
                            >
                              {subItem.name}
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
                    className={`flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#2d2d2d] text-white'
                        : 'text-[#b3b3b3] hover:bg-[#2d2d2d] hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2d2d2d]">
          <button
            onClick={() => {
              setIsMobileOpen(false)
              onLogout()
            }}
            className="flex items-center gap-3 px-3 py-2 text-[#b3b3b3] hover:bg-[#2d2d2d] hover:text-white rounded text-sm font-medium transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Uitloggen</span>
          </button>
        </div>
      </div>
    </>
  )
}
