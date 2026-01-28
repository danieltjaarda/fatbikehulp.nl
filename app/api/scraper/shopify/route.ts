import { NextRequest, NextResponse } from 'next/server'

interface ShopifyProduct {
  id: number
  title: string
  handle: string
  body_html: string
  vendor: string
  product_type: string
  images: { src: string }[]
  variants: {
    id: number
    title: string
    price: string
    sku: string
    available: boolean
  }[]
}

interface ShopifyCollectionResponse {
  products: ShopifyProduct[]
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is verplicht' },
        { status: 400 }
      )
    }

    // Parse the URL to get the base URL and collection handle
    let apiUrl = ''
    
    try {
      const parsedUrl = new URL(url)
      const pathParts = parsedUrl.pathname.split('/')
      const collectionsIndex = pathParts.indexOf('collections')
      
      if (collectionsIndex === -1) {
        return NextResponse.json(
          { error: 'Geen geldige collection URL. De URL moet "/collections/" bevatten.' },
          { status: 400 }
        )
      }

      const collectionHandle = pathParts[collectionsIndex + 1]
      
      if (!collectionHandle) {
        return NextResponse.json(
          { error: 'Geen collection handle gevonden in de URL' },
          { status: 400 }
        )
      }

      // Construct the JSON API URL
      // Shopify collections have a .json endpoint
      apiUrl = `${parsedUrl.origin}/collections/${collectionHandle}/products.json?limit=250`
      
    } catch (e) {
      return NextResponse.json(
        { error: 'Ongeldige URL formaat' },
        { status: 400 }
      )
    }

    // Fetch products from Shopify
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    if (!response.ok) {
      // Try alternative endpoint (some shops use /products.json directly)
      const parsedUrl = new URL(url)
      const altApiUrl = `${parsedUrl.origin}/products.json?limit=250`
      
      const altResponse = await fetch(altApiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      })
      
      if (!altResponse.ok) {
        return NextResponse.json(
          { error: `Kon producten niet ophalen. Status: ${response.status}. Controleer of de URL correct is en openbaar toegankelijk.` },
          { status: 400 }
        )
      }
      
      const altData: ShopifyCollectionResponse = await altResponse.json()
      return processProducts(altData, parsedUrl.origin)
    }

    const data: ShopifyCollectionResponse = await response.json()
    const parsedUrl = new URL(url)
    
    return processProducts(data, parsedUrl.origin)

  } catch (error: any) {
    console.error('Scraper error:', error)
    return NextResponse.json(
      { error: error.message || 'Er ging iets mis bij het scrapen' },
      { status: 500 }
    )
  }
}

function processProducts(data: ShopifyCollectionResponse, baseUrl: string) {
  if (!data.products || data.products.length === 0) {
    return NextResponse.json(
      { error: 'Geen producten gevonden in deze collection' },
      { status: 404 }
    )
  }

  const products = data.products.map((product: ShopifyProduct) => {
    // Get the lowest price from variants
    const prices = product.variants.map(v => parseFloat(v.price))
    const lowestPrice = Math.min(...prices)
    
    // Strip HTML from description
    const description = product.body_html 
      ? product.body_html.replace(/<[^>]*>/g, '').substring(0, 500)
      : ''

    return {
      title: product.title,
      price: `€${lowestPrice.toFixed(2).replace('.', ',')}`,
      priceNumber: lowestPrice,
      image: product.images[0]?.src || '',
      description: description,
      vendor: product.vendor || '',
      productType: product.product_type || '',
      handle: product.handle,
      url: `${baseUrl}/products/${product.handle}`,
      variants: product.variants.map(v => ({
        title: v.title,
        price: `€${parseFloat(v.price).toFixed(2).replace('.', ',')}`,
        sku: v.sku || '',
        available: v.available,
      })),
    }
  })

  return NextResponse.json({ products })
}




