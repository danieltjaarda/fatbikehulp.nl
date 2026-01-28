import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

/**
 * Migratie script om bestaande reparaties reparatie_nummers te geven
 * Start bij 2001 en geeft oude reparaties nummers op basis van created_at datum
 * 
 * Gebruik: POST /api/reparaties/migrate
 */
export async function POST(request: NextRequest) {
  try {
    // Check for admin key (optioneel, voor beveiliging)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.MIGRATION_KEY || 'migrate-reparaties-2025'}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get existing reparaties from KV
    const existingReparaties = (await kv.get('reparaties') || []) as any[]
    
    if (existingReparaties.length === 0) {
      return NextResponse.json({ 
        message: 'Geen reparaties gevonden om te migreren',
        migrated: 0 
      })
    }

    // Filter reparaties zonder nummer en sorteer op datum (oudste eerst)
    const reparatiesZonderNummer = existingReparaties
      .filter((r: any) => !r.reparatie_nummer || r.reparatie_nummer < 2001)
      .sort((a: any, b: any) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )

    // Vind het hoogste bestaande nummer (als er al nummers zijn >= 2001)
    const bestaandeNummers = existingReparaties
      .map((r: any) => r.reparatie_nummer || 0)
      .filter((n: number) => n >= 2001)
    
    let startNummer = 2001
    if (bestaandeNummers.length > 0) {
      const maxNummer = Math.max(...bestaandeNummers)
      startNummer = maxNummer + 1
    }

    // Geef nummers aan reparaties zonder nummer
    let huidigNummer = startNummer
    const bijgewerkteReparaties = existingReparaties.map((reparatie: any) => {
      // Als deze reparatie al een nummer heeft >= 2001, skip
      if (reparatie.reparatie_nummer && reparatie.reparatie_nummer >= 2001) {
        return reparatie
      }

      // Geef deze reparatie een nieuw nummer
      const bijgewerkt = {
        ...reparatie,
        reparatie_nummer: huidigNummer,
        updated_at: new Date().toISOString()
      }
      huidigNummer++
      return bijgewerkt
    })

    // Sla bijgewerkte reparaties op
    await kv.set('reparaties', bijgewerkteReparaties)

    const aantalGemigreerd = huidigNummer - startNummer

    return NextResponse.json({
      success: true,
      message: `Migratie voltooid: ${aantalGemigreerd} reparaties hebben nu een nummer`,
      startNummer,
      eindNummer: huidigNummer - 1,
      totaalReparaties: existingReparaties.length,
      gemigreerd: aantalGemigreerd
    })
  } catch (error) {
    console.error('❌ Error tijdens migratie:', error)
    return NextResponse.json(
      { error: 'Migratie mislukt', details: (error as Error).message },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint om te zien hoeveel reparaties nog geen nummer hebben
 */
export async function GET() {
  try {
    const existingReparaties = (await kv.get('reparaties') || []) as any[]
    
    const zonderNummer = existingReparaties.filter(
      (r: any) => !r.reparatie_nummer || r.reparatie_nummer < 2001
    )
    
    const metNummer = existingReparaties.filter(
      (r: any) => r.reparatie_nummer && r.reparatie_nummer >= 2001
    )

    const hoogsteNummer = metNummer.length > 0
      ? Math.max(...metNummer.map((r: any) => r.reparatie_nummer))
      : 2000

    return NextResponse.json({
      totaal: existingReparaties.length,
      metNummer: metNummer.length,
      zonderNummer: zonderNummer.length,
      hoogsteNummer: hoogsteNummer >= 2001 ? hoogsteNummer : null,
      volgendeNummer: hoogsteNummer >= 2001 ? hoogsteNummer + 1 : 2001
    })
  } catch (error) {
    console.error('❌ Error checking migratie status:', error)
    return NextResponse.json(
      { error: 'Check mislukt', details: (error as Error).message },
      { status: 500 }
    )
  }
}








