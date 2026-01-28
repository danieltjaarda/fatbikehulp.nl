import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Redirect non-www to www (permanent 301 redirect for SEO)
  // This ensures all traffic goes to www.fatbikehulp.nl
  if (hostname === 'fatbikehulp.nl' || (hostname.includes('fatbikehulp.nl') && !hostname.startsWith('www.'))) {
    url.hostname = 'www.fatbikehulp.nl'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}


