import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

export interface Categorie {
  id: string
  naam: string
  slug: string
  beschrijving?: string
  actief: boolean
  created_at: string
}

// Default categories
const defaultCategorieen: Categorie[] = [
  { id: '1', naam: 'Banden', slug: 'banden', beschrijving: 'Binnen- en buitenbanden voor fatbikes', actief: true, created_at: new Date().toISOString() },
  { id: '2', naam: 'Remmen', slug: 'remmen', beschrijving: 'Remblokken, remschijven en complete remsets', actief: true, created_at: new Date().toISOString() },
  { id: '3', naam: 'Verlichting', slug: 'verlichting', beschrijving: 'Voor- en achterverlichting', actief: true, created_at: new Date().toISOString() },
  { id: '4', naam: 'Onderdelen', slug: 'onderdelen', beschrijving: 'Algemene onderdelen', actief: true, created_at: new Date().toISOString() },
  { id: '5', naam: 'Accessoires', slug: 'accessoires', beschrijving: 'Tassen, sloten en meer', actief: true, created_at: new Date().toISOString() },
  { id: '6', naam: 'Elektrisch', slug: 'elektrisch', beschrijving: 'Accu\'s, controllers en motoren', actief: true, created_at: new Date().toISOString() },
]

// Local JSON file path for development
const LOCAL_DATA_PATH = path.join(process.cwd(), 'data', 'categorieen.json')

// Helper functions for local storage
function readLocalCategorieen(): Categorie[] {
  try {
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      const data = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8')
      return JSON.parse(data)
    }
  } catch (e) {
    console.log('Could not read local categories file')
  }
  return []
}

function writeLocalCategorieen(categorieen: Categorie[]): void {
  try {
    const dataDir = path.dirname(LOCAL_DATA_PATH)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(categorieen, null, 2))
    console.log('✅ Categories saved to local file')
  } catch (e) {
    console.error('Could not write local categories file:', e)
  }
}

// Create slug from name
function createSlug(naam: string): string {
  return naam
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function GET() {
  try {
    let categorieen: Categorie[] = []
    
    try {
      const data = (await kv.get('categorieen') || []) as Categorie[]
      categorieen = data.length > 0 ? data : []
    } catch (kvError) {
      console.log('KV not available, trying local storage')
    }
    
    if (categorieen.length === 0) {
      const localCategorieen = readLocalCategorieen()
      categorieen = localCategorieen.length > 0 ? localCategorieen : defaultCategorieen
      
      // Save defaults if nothing exists
      if (localCategorieen.length === 0) {
        writeLocalCategorieen(defaultCategorieen)
      }
    }
    
    return NextResponse.json(categorieen)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.naam) {
      return NextResponse.json({ error: 'Naam is verplicht' }, { status: 400 })
    }
    
    const id = Date.now().toString()
    const slug = body.slug || createSlug(body.naam)
    
    const categorie: Categorie = {
      id,
      naam: body.naam,
      slug,
      beschrijving: body.beschrijving || '',
      actief: body.actief !== false,
      created_at: new Date().toISOString()
    }
    
    let savedToKV = false
    
    try {
      const existing = (await kv.get('categorieen') || []) as Categorie[]
      const updated = [...existing, categorie]
      await kv.set('categorieen', updated)
      savedToKV = true
    } catch (kvError) {
      console.log('KV not available')
    }
    
    if (!savedToKV) {
      const localCategorieen = readLocalCategorieen()
      const existing = localCategorieen.length > 0 ? localCategorieen : [...defaultCategorieen]
      existing.push(categorie)
      writeLocalCategorieen(existing)
    }
    
    return NextResponse.json({ success: true, categorie })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ error: 'ID is verplicht' }, { status: 400 })
    }
    
    let categorieen: Categorie[] = []
    let usingKV = false
    
    try {
      categorieen = (await kv.get('categorieen') || []) as Categorie[]
      usingKV = categorieen.length > 0
    } catch (kvError) {
      console.log('KV not available')
    }
    
    if (!usingKV) {
      const localCategorieen = readLocalCategorieen()
      categorieen = localCategorieen.length > 0 ? localCategorieen : [...defaultCategorieen]
    }
    
    const index = categorieen.findIndex(c => c.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Categorie niet gevonden' }, { status: 404 })
    }
    
    // Update slug if name changed
    if (updates.naam && updates.naam !== categorieen[index].naam) {
      updates.slug = createSlug(updates.naam)
    }
    
    categorieen[index] = { ...categorieen[index], ...updates }
    
    if (usingKV) {
      await kv.set('categorieen', categorieen)
    } else {
      writeLocalCategorieen(categorieen)
    }
    
    return NextResponse.json({ success: true, categorie: categorieen[index] })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is verplicht' }, { status: 400 })
    }
    
    let categorieen: Categorie[] = []
    let usingKV = false
    
    try {
      categorieen = (await kv.get('categorieen') || []) as Categorie[]
      usingKV = categorieen.length > 0
    } catch (kvError) {
      console.log('KV not available')
    }
    
    if (!usingKV) {
      const localCategorieen = readLocalCategorieen()
      categorieen = localCategorieen.length > 0 ? localCategorieen : [...defaultCategorieen]
    }
    
    const filtered = categorieen.filter(c => c.id !== id)
    
    if (filtered.length === categorieen.length) {
      return NextResponse.json({ error: 'Categorie niet gevonden' }, { status: 404 })
    }
    
    if (usingKV) {
      await kv.set('categorieen', filtered)
    } else {
      writeLocalCategorieen(filtered)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}




