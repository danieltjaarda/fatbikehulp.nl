import { NextRequest, NextResponse } from 'next/server'
import { sendHtmlMail } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerEmail, customerName, reparatieData } = body

    console.log('📧 Gmail E-mail verzenden naar klant:', customerEmail);
    console.log('📧 Klant naam:', customerName);

    // Validate required fields
    if (!customerEmail || !customerName || !reparatieData) {
      console.log('❌ Ontbrekende vereiste velden:', { customerEmail: !!customerEmail, customerName: !!customerName, reparatieData: !!reparatieData });
      return NextResponse.json({ error: 'Klantgegevens en reparatie data zijn verplicht' }, { status: 400 })
    }

    // Check environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('❌ SMTP environment variables ontbreken:', { SMTP_USER: !!process.env.SMTP_USER, SMTP_PASS: !!process.env.SMTP_PASS });
      return NextResponse.json({ error: 'SMTP configuratie is niet compleet. Controleer environment variables.' }, { status: 400 })
    }

    // Format service type
    const serviceType = reparatieData.serviceType === 'repair' ? 'Reparatie' :
                      reparatieData.serviceType === 'maintenance' ? 'Onderhoudsbeurt' :
                      reparatieData.serviceType === 'both' ? 'Reparatie + Onderhoud' :
                      reparatieData.serviceType === 'quote' ? 'Offerte aanvraag' :
                      reparatieData.serviceType === 'callback' ? 'Bel afspraak' : 'Onbekend'

    // Format location
    const location = reparatieData.location === 'shop' ? 'In de winkel (Friesland, Joure)' : 'Op locatie (Door heel Nederland)'

    // Format preferred time
    const timeOptions = {
      'morning': 'Ochtend (9:00-12:00)',
      'afternoon': 'Middag (12:00-17:00)',
      'evening': 'Avond (17:00-20:00)',
      'flexible': 'Flexibel'
    }
    const preferredTime = timeOptions[reparatieData.preferredTime as keyof typeof timeOptions] || reparatieData.preferredTime

    // Customer confirmation email HTML
    const emailHtml = `
        <!DOCTYPE html>
        <html lang="nl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bevestiging ${serviceType} aanvraag - Fatbikehulp</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white;">
            <div style="background-color: #ff6b35; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Fatbikehulp</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 16px;">Professionele fietsreparatie en onderhoud</p>
              <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">Partner van GoFatbike.nl</p>
            </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Beste ${customerName},</h2>
            <p style="color: #666; line-height: 1.6;">
              Bedankt voor je ${serviceType.toLowerCase()} aanvraag! We hebben je verzoek ontvangen en nemen <strong>binnen 24 uur</strong> contact met je op om een afspraak te plannen.
            </p>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
              <h3 style="color: #2E7D32; margin-top: 0; font-size: 16px;">⚡ Snelle Service</h3>
              <p style="color: #2E7D32; margin: 0; font-size: 14px;">
                <strong>Reactietijd:</strong> Binnen 24 uur<br>
                <strong>Bezoek:</strong> Meestal binnen 1-7 dagen<br>
                <strong>Partner van:</strong> <a href="https://gofatbike.nl" style="color: #2E7D32;">GoFatbike.nl</a>
              </p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #ff6b35; margin-top: 0;">📋 Jouw ${serviceType.toLowerCase()} aanvraag:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Service:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${serviceType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Locatie:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${location}</td>
                </tr>
                ${reparatieData.bikeBrand ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Fiets merk:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${reparatieData.bikeBrand}</td>
                </tr>
                ` : ''}
                ${reparatieData.bikeModel ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Model:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${reparatieData.bikeModel}</td>
                </tr>
                ` : ''}
                ${reparatieData.preferredDate ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Voorkeur datum:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${reparatieData.preferredDate}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Voorkeur tijd:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${preferredTime}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fff4f0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35;">
              <h3 style="color: #ff6b35; margin-top: 0;">🔄 Wat gebeurt er nu?</h3>
              <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li><strong>Binnen 24 uur:</strong> We nemen contact met je op via telefoon of WhatsApp</li>
                <li><strong>Afspraak plannen:</strong> We plannen een bezoek die past bij jouw voorkeuren</li>
                <li><strong>Meestal binnen 1-7 dagen:</strong> Onze monteur komt langs voor je ${serviceType.toLowerCase()}</li>
                <li><strong>Bevestiging:</strong> Je ontvangt een bevestiging met alle details</li>
              </ul>
            </div>

            ${reparatieData.notes ? `
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #ff6b35; margin-top: 0;">💬 Jouw opmerkingen:</h3>
              <p style="color: #666; font-style: italic; background-color: #f8f9fa; padding: 10px; border-radius: 4px;">"${reparatieData.notes}"</p>
            </div>
            ` : ''}

            <p style="color: #666; line-height: 1.6;">
              Heb je vragen over je ${serviceType.toLowerCase()} aanvraag? Neem gerust contact met ons op via WhatsApp of bel ons direct. 
              We zijn er om je te helpen!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/31612345678?text=Hallo%2C%20ik%20heb%20een%20vraag%20over%20mijn%20${serviceType.toLowerCase()}%20aanvraag" 
                style="background-color: #25D366; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                📱 WhatsApp Contact
              </a>
            </div>
            
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
              <p style="color: #1976D2; margin: 0; font-size: 14px;">
                <strong>💡 Tip:</strong> Als partner van <a href="https://gofatbike.nl" style="color: #1976D2;">GoFatbike.nl</a> 
                hebben we toegang tot originele onderdelen en specialistische kennis voor jouw fiets.
              </p>
            </div>
          </div>
            <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
              © 2025 Fatbikehulp - Professionele fietsreparatie en onderhoud<br>
              Partner van <a href="https://gofatbike.nl" style="color: #ff6b35;">GoFatbike.nl</a> | 
              <a href="https://fatbikehulp.nl" style="color: #ff6b35;">fatbikehulp.nl</a><br><br>
              <p style="font-size: 10px; opacity: 0.7; margin: 0;">
                Deze e-mail is verzonden naar ${customerEmail} omdat je een reparatie aanvraag hebt ingediend via onze website.<br>
                Als je deze e-mail niet verwachtte, neem dan contact met ons op via <a href="mailto:info@fatbikehulp.nl" style="color: #ff6b35;">info@fatbikehulp.nl</a>
              </p>
            </div>
          </div>
        </body>
        </html>
        `;

    // Send customer email using the new service
    const result = await sendHtmlMail(
      customerEmail,
      `Bevestiging van je ${serviceType} aanvraag bij Fatbikehulp`,
      emailHtml
    );

    if (result.success) {
      console.log('✅ Gmail Klant e-mail succesvol verzonden:', result.messageId);
      return NextResponse.json({ success: true, message: 'E-mail succesvol verzonden naar klant!', messageId: result.messageId });
    } else {
      console.log('❌ Fout bij verzenden klant e-mail:', result.error);
      return NextResponse.json({ error: 'Fout bij verzenden van e-mail: ' + result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending customer email:', error)
    return NextResponse.json({ 
      error: 'Fout bij verzenden van e-mail: ' + (error as Error).message 
    }, { status: 500 })
  }
}
