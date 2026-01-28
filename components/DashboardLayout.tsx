'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Breadcrumbs from './Breadcrumbs'
import WhatsAppButton from './WhatsAppButton'
import CookieConsent from './CookieConsent'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Dashboard routes that should not show Header/Breadcrumbs/WhatsApp/CookieConsent
  const dashboardRoutes = ['/dashboard', '/reparaties', '/klanten', '/orders', '/settings', '/analytics', '/marketing', '/login', '/monteur']
  const isDashboardRoute = dashboardRoutes.some(route => pathname?.startsWith(route))
  
  if (isDashboardRoute) {
    // For dashboard routes, only show children (the Layout component handles its own structure)
    return <>{children}</>
  }
  
  // For regular website pages, show Header, Breadcrumbs, WhatsApp, and CookieConsent
  return (
    <>
      <Header />
      <Breadcrumbs />
      {children}
      <WhatsAppButton />
      <CookieConsent />
    </>
  )
}


