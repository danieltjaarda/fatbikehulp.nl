import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/types/database'

interface ScrapedProduct {
  title: string
  price: string
  priceNumber: number
  image: string
  description: string
  vendor: string
  productType: string
  handle: string
  url: string
}

// Map product type to category
function mapToCategory(productType: string): Product['categorie'] {
  const type = productType.toLowerCase()
  
  if (type.includes('band') || type.includes('tire') || type.includes('wheel')) {
    return 'banden'
  }
  if (type.includes('rem') || type.includes('brake')) {
    return 'remmen'
  }
  if (type.includes('licht') || type.includes('light') || type.includes('lamp')) {
    return 'verlichting'
  }
  if (type.includes('accu') || type.includes('battery') || type.includes('motor') || type.includes('display') || type.includes('controller')) {
    return 'elektrisch'
  }
  if (type.includes('accessoire') || type.includes('accessory') || type.includes('tas') || type.includes('bag')) {
    return 'accessoires'
  }
  
  return 'onderdelen'
}

export async function POST(request: NextRequest) {
  try {
    const { products } = await request.json()

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'Geen producten om te importeren' },
        { status: 400 }
      )
    }

    // Get existing products
    const existingResponse = await fetch(`${request.nextUrl.origin}/api/producten`)
    const existingProducts: Product[] = await existingResponse.json()
    
    const importedProducts: Product[] = []
    const errors: string[] = []

    for (const scrapedProduct of products as ScrapedProduct[]) {
      try {
        // Check if product already exists (by name similarity)
        const exists = existingProducts.some(
          p => p.naam.toLowerCase() === scrapedProduct.title.toLowerCase()
        )
        
        if (exists) {
          errors.push(`Product "${scrapedProduct.title}" bestaat al`)
          continue
        }

        const newProduct: Partial<Product> = {
          naam: scrapedProduct.title,
          beschrijving: scrapedProduct.description || `Geïmporteerd van ${scrapedProduct.url}`,
          prijs: scrapedProduct.priceNumber,
          categorie: mapToCategory(scrapedProduct.productType),
          merk: scrapedProduct.vendor || undefined,
          afbeelding_url: scrapedProduct.image || undefined,
          voorraad: 10, // Default voorraad
          actief: true,
        }

        // Create the product
        const createResponse = await fetch(`${request.nextUrl.origin}/api/producten`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        })

        if (createResponse.ok) {
          const created = await createResponse.json()
          importedProducts.push(created)
        } else {
          errors.push(`Kon "${scrapedProduct.title}" niet importeren`)
        }
      } catch (err) {
        errors.push(`Fout bij "${scrapedProduct.title}"`)
      }
    }

    return NextResponse.json({
      success: true,
      imported: importedProducts.length,
      errors: errors.length > 0 ? errors : undefined,
      products: importedProducts,
    })

  } catch (error: any) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: error.message || 'Er ging iets mis bij het importeren' },
      { status: 500 }
    )
  }
}




