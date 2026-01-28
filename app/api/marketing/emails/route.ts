import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

// Mock data for fallback
const mockMarketingEmails = [
  {
    id: '1',
    email: 'test@example.com',
    naam: 'Test Persoon',
    telefoon: '0612345678',
    aangemeld_op: new Date().toISOString(),
    herkomst_platform: 'google'
  }
]

export async function GET() {
  try {
    // Try to use Vercel KV first, fallback to mock data
    try {
      const data = (await kv.get('marketing_emails') || []) as any[]
      return NextResponse.json(data.length > 0 ? data : mockMarketingEmails)
    } catch (kvError) {
      console.log('KV not available, using mock data')
      return NextResponse.json(mockMarketingEmails)
    }
  } catch (error) {
    console.error('Error fetching marketing emails:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}







