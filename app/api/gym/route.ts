import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

// Get gym data for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const workouts = await kv.get(`gym_workouts_${userId}`) || []
    const prs = await kv.get(`gym_prs_${userId}`) || []

    return NextResponse.json({ workouts, prs })
  } catch (error) {
    console.error('Error fetching gym data:', error)
    return NextResponse.json({ error: 'Failed to fetch gym data' }, { status: 500 })
  }
}

// Save gym data for a user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, data } = body

    if (!userId || !type || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (type === 'workouts') {
      await kv.set(`gym_workouts_${userId}`, data)
    } else if (type === 'prs') {
      await kv.set(`gym_prs_${userId}`, data)
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving gym data:', error)
    return NextResponse.json({ error: 'Failed to save gym data' }, { status: 500 })
  }
}

// Delete gym data for a user
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    await kv.del(`gym_workouts_${userId}`)
    await kv.del(`gym_prs_${userId}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gym data:', error)
    return NextResponse.json({ error: 'Failed to delete gym data' }, { status: 500 })
  }
}
