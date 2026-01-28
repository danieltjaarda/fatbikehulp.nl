import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { sendHtmlMail } from '@/lib/emailService'

// Mock data for fallback
const mockReparaties = [
  {
    id: '1',
    klant_naam: 'Test Persistentie',
    klant_email: 'testpersistentie@example.com',
    klant_telefoon: '0612345680',
    aanvraag_type: 'reparatie',
    fiets_merk: 'Giant',
    probleem: 'Band lek',
    locatie_type: 'op_locatie',
    adres: 'Teststraat 789',
    postcode: '9012 EF',
    plaats: 'Rotterdam',
    status: 'pending',
    created_at: new Date().toISOString()
  }
]

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get('search') || ''
    
    // Try to use Vercel KV first, fallback to mock data
    try {
      const data = (await kv.get('reparaties') || []) as any[]
      const allReparaties = data.length > 0 ? data : mockReparaties
      
      // Filter by search term if provided
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const filtered = allReparaties.filter((reparatie: any) => {
          return (
            reparatie.klant_naam?.toLowerCase().includes(searchLower) ||
            reparatie.klant_email?.toLowerCase().includes(searchLower) ||
            reparatie.klant_telefoon?.toLowerCase().includes(searchLower) ||
            reparatie.probleem?.toLowerCase().includes(searchLower)
          )
        })
        return NextResponse.json(filtered)
      }
      
      return NextResponse.json(allReparaties)
    } catch (kvError) {
      console.log('KV not available, using mock data')
      const allReparaties = mockReparaties
      
      // Filter by search term if provided
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const filtered = allReparaties.filter((reparatie: any) => {
          return (
            reparatie.klant_naam?.toLowerCase().includes(searchLower) ||
            reparatie.klant_email?.toLowerCase().includes(searchLower) ||
            reparatie.klant_telefoon?.toLowerCase().includes(searchLower) ||
            reparatie.probleem?.toLowerCase().includes(searchLower)
          )
        })
        return NextResponse.json(filtered)
      }
      
      return NextResponse.json(allReparaties)
    }
  } catch (error) {
    console.error('Error fetching reparaties:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate unique ID
    const id = Date.now().toString()
    
    // Generate repair number starting at 2001 (declare outside try block for email template)
    let nextReparatieNummer = 2001
    
    // Try to use Vercel KV first, fallback to in-memory
    try {
      // Get existing reparaties from KV
      const existingReparaties = (await kv.get('reparaties') || []) as any[]
      const existingKlanten = (await kv.get('klanten') || []) as any[]
      
      // Generate repair number starting at 2001
      if (existingReparaties.length > 0) {
        const maxNummer = Math.max(
          ...existingReparaties
            .map((r: any) => r.reparatie_nummer || 0)
            .filter((n: number) => n >= 2001)
        )
        if (maxNummer >= 2001) {
          nextReparatieNummer = maxNummer + 1
        }
      }
      
      // Create reparatie record with repair number
      const reparatie = {
        id,
        reparatie_nummer: nextReparatieNummer,
        ...body,
        created_at: new Date().toISOString(),
        status: 'pending',
        archived: false
      }
      
      // Add new reparatie
      const updatedReparaties = [...existingReparaties, reparatie]
      await kv.set('reparaties', updatedReparaties)
      
      // Check if klant already exists
      const existingKlant = existingKlanten.find((k: any) => k.email === body.klant_email)
      
      if (!existingKlant) {
        // Add new klant
        const klant = {
          id: Date.now().toString() + '_klant',
          naam: body.klant_naam,
          email: body.klant_email,
          telefoon: body.klant_telefoon,
          adres: body.adres || '',
          postcode: body.postcode || '',
          plaats: body.plaats || '',
          created_at: new Date().toISOString()
        }
        const updatedKlanten = [...existingKlanten, klant]
        await kv.set('klanten', updatedKlanten)
      }
      
      // Save marketing email if user opted in
      if (body.marketing_nieuws && body.klant_email) {
        try {
          const existingMarketing = (await kv.get('marketing_emails') || []) as any[]
          const emailExists = existingMarketing.some((e: any) => e.email === body.klant_email)
          
          if (!emailExists) {
            const marketingEmail = {
              id: Date.now().toString() + '_marketing',
              email: body.klant_email,
              naam: body.klant_naam,
              telefoon: body.klant_telefoon || '',
              aangemeld_op: new Date().toISOString(),
              herkomst_platform: body.herkomst_platform || 'onbekend'
            }
            const updatedMarketing = [...existingMarketing, marketingEmail]
            await kv.set('marketing_emails', updatedMarketing)
            console.log('✅ Marketing e-mail toegevoegd:', body.klant_email)
          }
        } catch (marketingError) {
          console.error('❌ Fout bij opslaan marketing e-mail:', marketingError)
          // Don't fail the request if marketing save fails
        }
      }
      
      console.log('✅ Reparatie opgeslagen in KV:', { id, reparatie_nummer: nextReparatieNummer, klant: body.klant_naam, email: body.klant_email })
    } catch (kvError) {
      // Fallback: generate repair number even if KV fails
      nextReparatieNummer = 2001
      try {
        const existingReparaties = (await kv.get('reparaties') || []) as any[]
        if (existingReparaties.length > 0) {
          const maxNummer = Math.max(
            ...existingReparaties
              .map((r: any) => r.reparatie_nummer || 0)
              .filter((n: number) => n >= 2001)
          )
          if (maxNummer >= 2001) {
            nextReparatieNummer = maxNummer + 1
          }
        }
      } catch {}
      
      const reparatie = {
        id,
        reparatie_nummer: nextReparatieNummer,
        ...body,
        created_at: new Date().toISOString(),
        status: 'pending',
        archived: false
      }
      
      console.log('KV not available, data will be lost on next request')
      console.log('✅ Reparatie tijdelijk opgeslagen:', { id, reparatie_nummer: nextReparatieNummer, klant: body.klant_naam, email: body.klant_email })
    }
    
    // Send notification email to claims@fatbikehulp.nl
    try {
      const serviceType = body.aanvraag_type === 'reparatie' ? 'Reparatie' :
                        body.aanvraag_type === 'onderhoud' ? 'Onderhoudsbeurt' :
                        body.aanvraag_type === 'beide' ? 'Reparatie + Onderhoud' : body.aanvraag_type

      const location = body.locatie_type === 'in_winkel' ? 'In de winkel (Joure)' : 'Op locatie'

      const notificationHtml = `
        <!DOCTYPE html>
        <html lang="nl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nieuwe ${serviceType} aanvraag</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white;">
            <div style="background-color: #ff6b35; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🔔 Nieuwe ${serviceType} Aanvraag</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 16px;">Fatbikehulp CRM Notificatie</p>
            </div>
            
            <div style="padding: 30px; background-color: #f9f9f9;">
              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
                <h3 style="color: #2E7D32; margin-top: 0; font-size: 16px;">✅ Nieuwe aanvraag ontvangen</h3>
                <p style="color: #2E7D32; margin: 0; font-size: 14px;">
                  <strong>Reparatie nummer:</strong> #${nextReparatieNummer}<br>
                  <strong>Aanvraag ID:</strong> ${id}<br>
                  <strong>Tijdstip:</strong> ${new Date().toLocaleString('nl-NL')}
                </p>
              </div>
              
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #ff6b35; margin-top: 0;">👤 Klantgegevens</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 35%;">Naam:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.klant_naam}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">E-mail:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.klant_email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Telefoon:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.klant_telefoon}</td>
                  </tr>
                  ${body.adres ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Adres:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.adres}<br>${body.postcode} ${body.plaats}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #ff6b35; margin-top: 0;">🚲 Aanvraag Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 35%;">Service type:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${serviceType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Locatie:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${location}</td>
                  </tr>
                  ${body.fiets_merk ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Fiets merk:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.fiets_merk}</td>
                  </tr>
                  ` : ''}
                  ${body.fiets_model ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Model:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.fiets_model}</td>
                  </tr>
                  ` : ''}
                  ${body.fiets_jaar ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Bouwjaar:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.fiets_jaar}</td>
                  </tr>
                  ` : ''}
                  ${body.voorkeur_datum ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Voorkeur datum:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.voorkeur_datum}</td>
                  </tr>
                  ` : ''}
                  ${body.voorkeur_tijd ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Voorkeur tijd:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.voorkeur_tijd}</td>
                  </tr>
                  ` : ''}
                  ${body.herkomst_platform ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Herkomst platform:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${body.herkomst_platform === 'gofatbike.nl' ? 'Gofatbike.nl' : body.herkomst_platform === 'mond_op_mond' ? 'Mond op mond' : body.herkomst_platform.charAt(0).toUpperCase() + body.herkomst_platform.slice(1)}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              ${body.probleem || body.beschrijving ? `
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #ff6b35; margin-top: 0;">📝 Probleem/Opmerking</h3>
                ${body.probleem ? `<p style="color: #666; margin-bottom: 10px;"><strong>Kort:</strong> ${body.probleem}</p>` : ''}
                ${body.beschrijving ? `<p style="color: #666; font-style: italic; background-color: #f8f9fa; padding: 10px; border-radius: 4px; margin: 0;">${body.beschrijving}</p>` : ''}
              </div>
              ` : ''}

              ${body.opmerkingen ? `
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #ff6b35; margin-top: 0;">💬 Extra opmerkingen</h3>
                <p style="color: #666; font-style: italic; background-color: #f8f9fa; padding: 10px; border-radius: 4px; margin: 0;">${body.opmerkingen}</p>
              </div>
              ` : ''}

              <div style="background-color: #fff4f0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35;">
                <h3 style="color: #ff6b35; margin-top: 0;">⚡ Actie vereist</h3>
                <p style="color: #666; margin: 0;">
                  Neem binnen 24 uur contact op met de klant via telefoon of WhatsApp om een afspraak te plannen.
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://wa.me/${body.klant_telefoon?.replace(/[^0-9]/g, '')}?text=Hallo%20${encodeURIComponent(body.klant_naam)}%2C%20we%20hebben%20je%20${serviceType.toLowerCase()}%20aanvraag%20ontvangen" 
                  style="background-color: #25D366; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; margin-right: 10px;">
                  📱 WhatsApp Klant
                </a>
                <a href="tel:${body.klant_telefoon}" 
                  style="background-color: #ff6b35; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                  📞 Bel Klant
                </a>
              </div>
            </div>
            
            <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
              © 2025 Fatbikehulp CRM - Automatische notificatie<br>
              <p style="font-size: 10px; opacity: 0.7; margin: 5px 0 0 0;">
                Deze e-mail is automatisch verzonden vanuit het CRM systeem.<br>
                Login op het CRM portaal om de volledige details te bekijken.
              </p>
            </div>
          </div>
        </body>
        </html>
      `

      await sendHtmlMail(
        'claims@fatbikehulp.nl',
        `🔔 Nieuwe ${serviceType} aanvraag van ${body.klant_naam}`,
        notificationHtml
      )
      
      console.log('✅ Notificatie e-mail verzonden naar claims@fatbikehulp.nl')
    } catch (emailError) {
      console.error('❌ Fout bij verzenden notificatie e-mail:', emailError)
      // Don't fail the request if email fails
    }
    
    // Send data to Zapier webhook
    try {
      const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/20451847/u5jli2b/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Customer info
          klant_naam: body.klant_naam,
          klant_email: body.klant_email,
          klant_telefoon: body.klant_telefoon,
          
          // Request type
          aanvraag_type: body.aanvraag_type,
          
          // Bike info
          fiets_merk: body.fiets_merk,
          fiets_model: body.fiets_model,
          fiets_jaar: body.fiets_jaar,
          
          // Problem/description
          probleem: body.probleem,
          beschrijving: body.beschrijving,
          
          // Location
          locatie_type: body.locatie_type,
          adres: body.adres,
          postcode: body.postcode,
          plaats: body.plaats,
          
          // Maintenance specific
          onderhoudsbeurt_type: body.onderhoudsbeurt_type,
          onderhoudsbeurt_pakket: body.onderhoudsbeurt_pakket,
          
          // Preferences
          voorkeur_datum: body.voorkeur_datum,
          voorkeur_tijd: body.voorkeur_tijd,
          opmerkingen: body.opmerkingen,
          
          // Platform
          herkomst_platform: body.herkomst_platform,
          
          // Metadata
          id: id,
          reparatie_nummer: nextReparatieNummer,
          timestamp: new Date().toISOString(),
          source: 'fatbikehulp_crm',
          status: 'pending'
        }),
      })

      if (zapierResponse.ok) {
        const zapierResult = await zapierResponse.json()
        console.log('✅ Data verzonden naar Zapier webhook:', zapierResult)
      } else {
        console.warn('⚠️ Zapier webhook response niet OK:', zapierResponse.status)
      }
    } catch (zapierError) {
      console.error('⚠️ Zapier webhook sending failed:', zapierError)
      // Don't fail the request if Zapier fails
    }
    
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('❌ Error saving reparatie:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
