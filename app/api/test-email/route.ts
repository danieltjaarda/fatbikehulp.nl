import { NextRequest, NextResponse } from 'next/server'
import { sendHtmlMail } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testEmail } = body

    console.log('🧪 Gmail Test e-mail verzenden naar:', testEmail);

    // Validate required fields
    if (!testEmail) {
      console.log('❌ Test e-mail adres ontbreekt');
      return NextResponse.json({ error: 'Test e-mail adres is verplicht' }, { status: 400 })
    }

    // Check environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('❌ SMTP environment variables ontbreken:', { SMTP_USER: !!process.env.SMTP_USER, SMTP_PASS: !!process.env.SMTP_PASS });
      return NextResponse.json({ error: 'SMTP configuratie is niet compleet. Controleer environment variables.' }, { status: 400 })
    }

        // Test email HTML content
        const testEmailHtml = `
            <!DOCTYPE html>
            <html lang="nl">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Test E-mail - Fatbikehulp Configuratie</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white;">
                <div style="background-color: #ff6b35; color: white; padding: 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px;">Fatbikehulp</h1>
                </div>
                <div style="padding: 30px; background-color: #f9f9f9;">
                  <h2 style="color: #333; margin-top: 0;">Test E-mail Succesvol!</h2>
                  <p style="color: #666; line-height: 1.6;">
                    Deze e-mail bevestigt dat je SMTP configuratie correct is ingesteld. 
                    Klanten zullen nu automatisch een bevestiging ontvangen wanneer ze een reparatie aanvragen.
                  </p>
                  <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #ff6b35; margin-top: 0;">Wat gebeurt er nu?</h3>
                    <ul style="color: #666;">
                      <li>Klanten ontvangen automatisch een bevestiging</li>
                      <li>Je krijgt een notificatie van nieuwe aanvragen</li>
                      <li>Alle e-mails worden verzonden via Gmail SMTP</li>
                    </ul>
                  </div>
                  <p style="color: #666; font-size: 14px;">
                    Deze test e-mail is verzonden op ${new Date().toLocaleString('nl-NL')}
                  </p>
                </div>
                <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
                  © 2025 Fatbikehulp - Professionele fietsreparatie en onderhoud<br>
                  <a href="https://fatbikehulp.nl" style="color: #ff6b35;">fatbikehulp.nl</a>
                </div>
              </div>
            </body>
            </html>
          `;

    // Send test email using the new service
    const result = await sendHtmlMail(
      testEmail,
      'Test E-mail - Fatbikehulp E-mail Configuratie',
      testEmailHtml
    );

    if (result.success) {
      console.log('✅ Gmail Test e-mail succesvol verzonden:', result.messageId);
      return NextResponse.json({ 
        success: true, 
        message: 'Test e-mail succesvol verzonden!',
        debug: {
          messageId: result.messageId,
          smtpHost: 'smtp.gmail.com',
          smtpPort: 587,
          smtpSecure: false,
          smtpRequireTLS: false
        }
      });
    } else {
      console.log('❌ Fout bij verzenden test e-mail:', result.error);
      return NextResponse.json({ 
        error: 'Fout bij verzenden van test e-mail: ' + result.error,
        debug: {
          smtpHost: 'smtp.gmail.com',
          smtpPort: 587,
          smtpSecure: false,
          smtpRequireTLS: false,
          error: result.error
        }
      }, { status: 500 });
    }
  } catch (error) {
    console.error('=== SMTP ERROR DEBUG ===')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error message:', (error as Error).message)
    console.error('Error code:', (error as any)?.code)
    console.error('Error response:', (error as any)?.response)
    console.error('Full error:', error)
    console.error('========================')
    
    return NextResponse.json({ 
      error: 'Fout bij verzenden van test e-mail: ' + (error as Error).message,
      debug: {
        type: error?.constructor?.name,
        code: (error as any)?.code,
        response: (error as any)?.response
      }
    }, { status: 500 })
  }
}
