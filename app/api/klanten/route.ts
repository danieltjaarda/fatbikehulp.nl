import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

// Mock data for fallback
const mockKlanten = [
  {
    id: '1',
    naam: 'Test Persistentie',
    email: 'testpersistentie@example.com',
    telefoon: '0612345680',
    adres: 'Teststraat 789',
    postcode: '9012 EF',
    plaats: 'Rotterdam',
    created_at: new Date().toISOString()
  }
]

// Fallback in-memory storage for Vercel (serverless functions can't write to filesystem)
let klantenData: any[] = []

export async function GET() {
  try {
    // Try to use Vercel KV first, fallback to mock data
    try {
      const data = (await kv.get('klanten') || []) as any[]
      return NextResponse.json(data.length > 0 ? data : mockKlanten)
    } catch (kvError) {
      console.log('KV not available, using mock data')
      return NextResponse.json(mockKlanten)
    }
  } catch (error) {
    console.error('Error fetching klanten:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}
