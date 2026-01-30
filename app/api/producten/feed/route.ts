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

export async function GET(request: NextRequest) {
  try {
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
      producten = readLocalProducts()
    }
    
    // Filter only active products
    const activeProducten = producten.filter(p => p.actief)
    
    // Generate Google Shopping Feed XML
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fatbikehulp.nl'
    
    const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Fatbikehulp.nl Producten</title>
    <link>${baseUrl}</link>
    <description>Fatbike onderdelen en accessoires</description>
    ${activeProducten.map(product => {
      const productUrl = `${baseUrl}/fatbike-onderdelen/${product.naam.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}`
      const imageUrl = product.afbeelding_url 
        ? (product.afbeelding_url.startsWith('http') ? product.afbeelding_url : `${baseUrl}${product.afbeelding_url}`)
        : ''
      const availability = product.voorraad > 0 ? 'in stock' : 'out of stock'
      
      return `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXml(product.naam)}</g:title>
      <g:description>${escapeXml(product.beschrijving || '')}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:price>${product.prijs.toFixed(2)} EUR</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>${product.merk ? escapeXml(product.merk) : 'Fatbikehulp'}</g:brand>
      ${product.model ? `<g:mpn>${escapeXml(product.model)}</g:mpn>` : ''}
      <g:google_product_category>Vehicles &amp; Parts &gt; Vehicle Parts &amp; Accessories &gt; Bicycle Parts</g:google_product_category>
    </item>`
    }).join('\n')}
  </channel>
</rss>`

    return new NextResponse(feedXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error generating product feed:', error)
    return NextResponse.json({ error: 'Failed to generate feed' }, { status: 500 })
  }
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

