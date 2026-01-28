import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

// Fallback in-memory storage for Vercel (serverless functions can't write to filesystem)
let reparatiesData: any[] = []

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { status, archived } = body

    // Try to use Vercel KV first, fallback to in-memory
    try {
      const reparaties = (await kv.get('reparaties') || []) as any[]
      const reparatieIndex = reparaties.findIndex((r: any) => r.id === id)

      if (reparatieIndex === -1) {
        return NextResponse.json({ error: 'Reparatie not found' }, { status: 404 })
      }

      // Update the reparatie
      const updates: any = { updated_at: new Date().toISOString() }
      if (status !== undefined) updates.status = status
      if (archived !== undefined) updates.archived = archived

      reparaties[reparatieIndex] = {
        ...reparaties[reparatieIndex],
        ...updates
      }

      await kv.set('reparaties', reparaties)
      console.log('✅ Reparatie bijgewerkt in KV:', { id, ...updates })
    } catch (kvError) {
      console.log('KV not available, using in-memory storage')
      
      const reparatieIndex = reparatiesData.findIndex((r: any) => r.id === id)

      if (reparatieIndex === -1) {
        return NextResponse.json({ error: 'Reparatie not found' }, { status: 404 })
      }

      // Update the reparatie
      const updates: any = { updated_at: new Date().toISOString() }
      if (status !== undefined) updates.status = status
      if (archived !== undefined) updates.archived = archived

      reparatiesData[reparatieIndex] = {
        ...reparatiesData[reparatieIndex],
        ...updates
      }

      console.log('✅ Reparatie bijgewerkt in-memory:', { id, ...updates })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Error updating reparatie:', error)
    return NextResponse.json({ error: 'Failed to update reparatie' }, { status: 500 })
  }
}
