import { NextRequest, NextResponse } from 'next/server'

// Types
interface Reparatie {
  id: string
  route_id: string
  reparatie_nummer: string
  beschrijving: string
  onderdelen_aantal: number
  onderdelen_kosten: number
  ontvangen_bedrag: number
  created_at: string
}

interface Route {
  id: string
  monteur_naam: string
  datum: string
  start_tijd: string
  eind_tijd?: string
  totaal_uren?: number
  totaal_km?: number
  status: 'actief' | 'afgerond'
  uitbetaald: boolean
  uitbetaald_op?: string
  created_at: string
  reparaties?: Reparatie[]
}

// In-memory storage for development (fallback when KV is not available)
let inMemoryRoutes: Route[] = []
let inMemoryReparaties: Reparatie[] = []

// Helper function to safely use KV
async function getKV() {
  try {
    const { kv } = await import('@vercel/kv')
    // Test if KV is actually available
    await kv.ping()
    return kv
  } catch {
    return null
  }
}

// GET - Haal alle routes op
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const datum = searchParams.get('datum')
    const monteur = searchParams.get('monteur')
    
    let routes: Route[] = []
    let reparaties: Reparatie[] = []
    
    const kv = await getKV()
    if (kv) {
      routes = (await kv.get('monteur_routes') || []) as Route[]
      reparaties = (await kv.get('monteur_reparaties') || []) as Reparatie[]
    } else {
      // Use in-memory storage
      routes = inMemoryRoutes
      reparaties = inMemoryReparaties
      console.log('📦 Using in-memory storage (development mode)')
    }
    
    // Filter routes by date if provided
    let filteredRoutes = routes
    if (datum) {
      filteredRoutes = filteredRoutes.filter(route => {
        const routeDate = new Date(route.datum).toISOString().split('T')[0]
        return routeDate === datum
      })
    }
    
    // Filter routes by monteur name if provided
    if (monteur) {
      filteredRoutes = filteredRoutes.filter(route => 
        route.monteur_naam.toLowerCase() === monteur.toLowerCase()
      )
    }
    
    // Attach reparaties to each route
    const routesWithReparaties = filteredRoutes.map(route => ({
      ...route,
      reparaties: reparaties.filter(r => r.route_id === route.id)
    }))
    
    // Sort by date descending
    routesWithReparaties.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    
    return NextResponse.json(routesWithReparaties)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST - Maak nieuwe route aan of update bestaande
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body
    
    const kv = await getKV()
    
    if (action === 'start_route') {
      // Start nieuwe route
      const id = Date.now().toString()
      const route: Route = {
        id,
        monteur_naam: data.monteur_naam,
        datum: new Date().toISOString(),
        start_tijd: data.start_tijd,
        status: 'actief',
        uitbetaald: false,
        created_at: new Date().toISOString()
      }
      
      if (kv) {
        const existingRoutes = (await kv.get('monteur_routes') || []) as Route[]
        await kv.set('monteur_routes', [...existingRoutes, route])
      } else {
        inMemoryRoutes.push(route)
      }
      
      console.log('✅ Route gestart:', { id, monteur: data.monteur_naam })
      return NextResponse.json(route)
    }
    
    if (action === 'add_reparatie') {
      // Voeg reparatie toe aan route
      const id = Date.now().toString()
      const reparatie: Reparatie = {
        id,
        route_id: data.route_id,
        reparatie_nummer: data.reparatie_nummer,
        beschrijving: data.beschrijving || '',
        onderdelen_aantal: data.onderdelen_aantal || 0,
        onderdelen_kosten: data.onderdelen_kosten || 0,
        ontvangen_bedrag: data.ontvangen_bedrag || 0,
        created_at: new Date().toISOString()
      }
      
      if (kv) {
        const existingReparaties = (await kv.get('monteur_reparaties') || []) as Reparatie[]
        await kv.set('monteur_reparaties', [...existingReparaties, reparatie])
      } else {
        inMemoryReparaties.push(reparatie)
      }
      
      console.log('✅ Reparatie toegevoegd:', { id, nummer: data.reparatie_nummer })
      return NextResponse.json(reparatie)
    }
    
    if (action === 'end_route') {
      // Beëindig route
      let updatedRoute: Route | undefined
      let routeReparaties: Reparatie[] = []
      
      if (kv) {
        const existingRoutes = (await kv.get('monteur_routes') || []) as Route[]
        const existingReparaties = (await kv.get('monteur_reparaties') || []) as Reparatie[]
        
        const updatedRoutes = existingRoutes.map(route => {
          if (route.id === data.route_id) {
            return {
              ...route,
              eind_tijd: data.eind_tijd,
              totaal_uren: data.totaal_uren,
              totaal_km: data.totaal_km,
              status: 'afgerond' as const
            }
          }
          return route
        })
        
        await kv.set('monteur_routes', updatedRoutes)
        
        updatedRoute = updatedRoutes.find(r => r.id === data.route_id)
        routeReparaties = existingReparaties.filter(r => r.route_id === data.route_id)
      } else {
        // In-memory update
        inMemoryRoutes = inMemoryRoutes.map(route => {
          if (route.id === data.route_id) {
            return {
              ...route,
              eind_tijd: data.eind_tijd,
              totaal_uren: data.totaal_uren,
              totaal_km: data.totaal_km,
              status: 'afgerond' as const
            }
          }
          return route
        })
        
        updatedRoute = inMemoryRoutes.find(r => r.id === data.route_id)
        routeReparaties = inMemoryReparaties.filter(r => r.route_id === data.route_id)
      }
      
      console.log('✅ Route beëindigd:', { id: data.route_id, uren: data.totaal_uren, km: data.totaal_km })
      
      return NextResponse.json({
        ...updatedRoute,
        reparaties: routeReparaties
      })
    }
    
    if (action === 'mark_paid') {
      // Markeer route(s) als uitbetaald
      const routeIds = Array.isArray(data.route_ids) ? data.route_ids : [data.route_id]
      
      if (kv) {
        const existingRoutes = (await kv.get('monteur_routes') || []) as Route[]
        
        const updatedRoutes = existingRoutes.map(route => {
          if (routeIds.includes(route.id)) {
            return {
              ...route,
              uitbetaald: true,
              uitbetaald_op: new Date().toISOString()
            }
          }
          return route
        })
        
        await kv.set('monteur_routes', updatedRoutes)
      } else {
        inMemoryRoutes = inMemoryRoutes.map(route => {
          if (routeIds.includes(route.id)) {
            return {
              ...route,
              uitbetaald: true,
              uitbetaald_op: new Date().toISOString()
            }
          }
          return route
        })
      }
      
      console.log('✅ Routes gemarkeerd als uitbetaald:', routeIds)
      return NextResponse.json({ success: true, route_ids: routeIds })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE - Verwijder reparatie van route
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reparatieId = searchParams.get('reparatieId')
    
    if (!reparatieId) {
      return NextResponse.json({ error: 'Reparatie ID is required' }, { status: 400 })
    }
    
    const kv = await getKV()
    
    if (kv) {
      const existingReparaties = (await kv.get('monteur_reparaties') || []) as Reparatie[]
      const updatedReparaties = existingReparaties.filter(r => r.id !== reparatieId)
      await kv.set('monteur_reparaties', updatedReparaties)
    } else {
      inMemoryReparaties = inMemoryReparaties.filter(r => r.id !== reparatieId)
    }
    
    console.log('✅ Reparatie verwijderd:', reparatieId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
