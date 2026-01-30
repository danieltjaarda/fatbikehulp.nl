import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { Product } from '@/types/database'
import fs from 'fs'
import path from 'path'

// Local JSON file path for development
const LOCAL_DATA_PATH = path.join(process.cwd(), 'data', 'producten.json')

// Helper functions for local storage
function readLocalProducts(): Product[] {
  try {
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      const data = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8')
      return JSON.parse(data)
    }
  } catch (e) {
    console.log('Could not read local products file')
  }
  return []
}

function writeLocalProducts(products: Product[]): void {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(LOCAL_DATA_PATH)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(products, null, 2))
    console.log('✅ Products saved to local file:', LOCAL_DATA_PATH)
  } catch (e) {
    console.error('Could not write local products file:', e)
  }
}

// Mock data for fallback/initial products
const mockProducten: Product[] = [
  {
    id: '1',
    naam: 'Fatbike Binnenband 20x4.0',
    beschrijving: 'Hoogwaardige binnenband voor 20 inch fatbike wielen. Geschikt voor alle gangbare fatbike banden.',
    prijs: 35,
    categorie: 'banden',
    merk: 'OUXI',
    model: 'V8',
    afbeelding_url: '/fatbike-binnenband.png',
    voorraad: 50,
    actief: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    naam: 'Fatbike Buitenband 20x4.0',
    beschrijving: 'Duurzame buitenband met extra grip voor alle weersomstandigheden. Anti-lek laag voor extra bescherming.',
    prijs: 39,
    categorie: 'banden',
    merk: 'OUXI',
    model: 'V8',
    afbeelding_url: '/fatbike-buitenband.png',
    voorraad: 30,
    actief: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    naam: 'Hydraulische Remset',
    beschrijving: 'Complete hydraulische remset voor fatbikes. Inclusief remklauw, remschijf en montagemateriaal.',
    prijs: 75,
    categorie: 'remmen',
    merk: 'EB8',
    model: 'Fat Spider',
    afbeelding_url: '/hydraulische-remmen.png',
    voorraad: 20,
    actief: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    naam: 'Remblokken Set',
    beschrijving: 'Set van 4 remblokken voor hydraulische remmen. Geschikt voor de meeste fatbike modellen.',
    prijs: 30,
    categorie: 'remmen',
    merk: 'Universeel',
    afbeelding_url: '/remblokken-fatbike.png',
    voorraad: 100,
    actief: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    naam: 'OUXI V8 Controller',
    beschrijving: 'Originele controller voor OUXI V8 fatbike. Plug & play installatie.',
    prijs: 89,
    categorie: 'elektrisch',
    merk: 'OUXI',
    model: 'V8',
    afbeelding_url: '',
    voorraad: 15,
    actief: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    naam: 'EB8 Motor 750W',
    beschrijving: 'Krachtige 750W naafmotor voor EB8 fatbikes. Inclusief bekabeling.',
    prijs: 249,
    categorie: 'elektrisch',
    merk: 'EB8',
    model: 'Fat Spider',
    afbeelding_url: '',
    voorraad: 8,
    actief: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categorie = searchParams.get('categorie')
    const actief = searchParams.get('actief')
    
    let producten: Product[] = []
    
    try {
      // Try Vercel KV first
      const data = (await kv.get('producten') || []) as Product[]
      producten = data.length > 0 ? data : []
    } catch (kvError) {
      console.log('KV not available, trying local storage')
    }
    
    // If no products from KV, try local storage
    if (producten.length === 0) {
      const localProducts = readLocalProducts()
      producten = localProducts.length > 0 ? localProducts : mockProducten
    }
    
    // Filter by categorie if provided
    if (categorie) {
      producten = producten.filter(p => p.categorie === categorie)
    }
    
    // Filter by actief status if provided
    if (actief !== null) {
      const isActief = actief === 'true'
      producten = producten.filter(p => p.actief === isActief)
    }
    
    return NextResponse.json(producten)
  } catch (error) {
    console.error('Error fetching producten:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate unique ID
    const id = Date.now().toString()
    
    const product: Product = {
      id,
      naam: body.naam,
      beschrijving: body.beschrijving || '',
      prijs: parseFloat(body.prijs) || 0,
      categorie: body.categorie || 'onderdelen',
      merk: body.merk || undefined,
      model: body.model || undefined,
      afbeelding_url: body.afbeelding_url || '',
      voorraad: parseInt(body.voorraad) || 0,
      actief: body.actief !== false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    let savedToKV = false
    
    try {
      const existingProducten = (await kv.get('producten') || []) as Product[]
      const updatedProducten = [...existingProducten, product]
      await kv.set('producten', updatedProducten)
      savedToKV = true
      console.log('✅ Product opgeslagen in KV:', { id, naam: body.naam })
    } catch (kvError) {
      console.log('KV not available, saving to local file')
    }
    
    // Also save to local file (backup/development)
    if (!savedToKV) {
      const localProducts = readLocalProducts()
      // If local is empty, start with mock data
      const existingProducts = localProducts.length > 0 ? localProducts : [...mockProducten]
      existingProducts.push(product)
      writeLocalProducts(existingProducts)
    }
    
    console.log('✅ Product opgeslagen:', { id, naam: body.naam })
    
    return NextResponse.json({ success: true, id, product })
  } catch (error) {
    console.error('❌ Error saving product:', error)
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle batch position updates
    if (body.updatePositions && Array.isArray(body.updatePositions)) {
      let existingProducten: Product[] = []
      let usingKV = false
      
      try {
        existingProducten = (await kv.get('producten') || []) as Product[]
        usingKV = existingProducten.length > 0
      } catch (kvError) {
        console.log('KV not available, using local storage')
      }
      
      if (!usingKV) {
        existingProducten = readLocalProducts()
        if (existingProducten.length === 0) {
          existingProducten = [...mockProducten]
        }
      }
      
      // Update positions
      body.updatePositions.forEach(({ id, positie }: { id: string, positie: number }) => {
        const product = existingProducten.find(p => p.id === id)
        if (product) {
          product.positie = positie
          product.updated_at = new Date().toISOString()
        }
      })
      
      if (usingKV) {
        await kv.set('producten', existingProducten)
      } else {
        writeLocalProducts(existingProducten)
      }
      
      console.log('✅ Product posities bijgewerkt')
      return NextResponse.json({ success: true })
    }
    
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }
    
    let existingProducten: Product[] = []
    let usingKV = false
    
    try {
      existingProducten = (await kv.get('producten') || []) as Product[]
      usingKV = existingProducten.length > 0
    } catch (kvError) {
      console.log('KV not available, using local storage')
    }
    
    if (!usingKV) {
      existingProducten = readLocalProducts()
      if (existingProducten.length === 0) {
        existingProducten = [...mockProducten]
      }
    }
    
    const productIndex = existingProducten.findIndex(p => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    const updatedProduct = {
      ...existingProducten[productIndex],
      ...updates,
      naam: updates.naam !== undefined ? updates.naam : existingProducten[productIndex].naam,
      beschrijving: updates.beschrijving !== undefined ? updates.beschrijving : existingProducten[productIndex].beschrijving,
      prijs: updates.prijs !== undefined ? parseFloat(updates.prijs) : existingProducten[productIndex].prijs,
      voorraad: updates.voorraad !== undefined ? parseInt(updates.voorraad) : existingProducten[productIndex].voorraad,
      categorie: updates.categorie !== undefined ? updates.categorie : existingProducten[productIndex].categorie,
      merk: updates.merk !== undefined ? updates.merk : existingProducten[productIndex].merk,
      model: updates.model !== undefined ? updates.model : existingProducten[productIndex].model,
      afbeelding_url: updates.afbeelding_url !== undefined ? updates.afbeelding_url : existingProducten[productIndex].afbeelding_url,
      actief: updates.actief !== undefined ? updates.actief : existingProducten[productIndex].actief,
      updated_at: new Date().toISOString()
    }
    
    existingProducten[productIndex] = updatedProduct
    
    if (usingKV) {
      await kv.set('producten', existingProducten)
    } else {
      writeLocalProducts(existingProducten)
    }
    
    console.log('✅ Product bijgewerkt:', { id, naam: updatedProduct.naam })
    
    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.error('❌ Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }
    
    let existingProducten: Product[] = []
    let usingKV = false
    
    try {
      existingProducten = (await kv.get('producten') || []) as Product[]
      usingKV = existingProducten.length > 0
    } catch (kvError) {
      console.log('KV not available, using local storage')
    }
    
    if (!usingKV) {
      existingProducten = readLocalProducts()
      if (existingProducten.length === 0) {
        existingProducten = [...mockProducten]
      }
    }
    
    const filteredProducten = existingProducten.filter(p => p.id !== id)
    
    if (filteredProducten.length === existingProducten.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    if (usingKV) {
      await kv.set('producten', filteredProducten)
    } else {
      writeLocalProducts(filteredProducten)
    }
    
    console.log('✅ Product verwijderd:', { id })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

