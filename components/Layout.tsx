'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth check if already on login page
    if (pathname === '/login') {
      setIsLoading(false)
      setIsAuthenticated(false)
      return
    }

    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else {
      // Not authenticated, redirect to login
      setIsAuthenticated(false)
      setIsLoading(false)
      router.push('/login')
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35] mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-[#f6f6f7]">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 overflow-x-hidden ml-0 lg:ml-64">
        <div className="min-h-screen w-full bg-[#f6f6f7]">
          {children}
        </div>
      </main>
    </div>
  )
}
