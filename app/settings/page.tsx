'use client'

import { useState } from 'react'
import Layout from '../../components/Layout'
import { Mail, TestTube } from 'lucide-react'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [testEmail, setTestEmail] = useState('')

  const handleTest = async () => {
    if (!testEmail) {
      setMessage('Voer een test e-mailadres in')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testEmail
        }),
      })

      const result = await response.json()
      
      if (response.ok) {
        setMessage(`✅ Test e-mail succesvol verzonden! Message ID: ${result.debug?.messageId || 'N/A'}`)
      } else {
        setMessage(`❌ Fout bij verzenden: ${result.error}${result.debug ? ` (SMTP Host: ${result.debug.smtpHost}, Port: ${result.debug.smtpPort})` : ''}`)
      }
    } catch (error) {
      setMessage('❌ Fout bij verzenden: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Instellingen</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Gmail SMTP configuratie voor automatische e-mail verzending</p>
          </div>

          {message && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-md text-sm sm:text-base ${
              message.includes('succesvol') || message.includes('✅') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <div className="bg-white rounded-lg shadow">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff6b35] mr-2 sm:mr-3" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Gmail SMTP Configuratie</h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">E-mails worden automatisch verzonden via Gmail (smtp.gmail.com)</p>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-medium text-blue-900 mb-2">Gmail SMTP Instellingen</h3>
                <div className="text-xs sm:text-sm text-blue-800 space-y-1">
                  <p><strong>Host:</strong> smtp.gmail.com</p>
                  <p><strong>Port:</strong> 587</p>
                  <p><strong>Security:</strong> STARTTLS (secure: false)</p>
                  <p><strong>Authentication:</strong> Via environment variables (SMTP_USER, SMTP_PASS)</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-medium text-yellow-900 mb-2">Environment Variables Vereist</h3>
                <div className="text-xs sm:text-sm text-yellow-800 space-y-1">
                  <p>Zorg ervoor dat de volgende environment variables zijn ingesteld:</p>
                  <div className="bg-yellow-100 p-2 rounded mt-2 font-mono text-xs break-all">
                    <p>SMTP_USER=claims@fatbikehulp.nl</p>
                    <p>SMTP_PASS=fseq qyso wsyr ivku</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Test E-mail</h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                    className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]"
                  />
                  <button
                    onClick={handleTest}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ff6b35] hover:bg-[#e55a2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b35] disabled:opacity-50"
                  >
                    <TestTube className="h-5 w-5 mr-2" />
                    {isLoading ? 'Verzenden...' : 'Test Verzenden'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Instructies voor Gmail Setup</h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-700">
              <div>
                <h4 className="font-medium text-base sm:text-lg mb-2">Gmail/Google Workspace Setup:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Host: <code className="bg-gray-100 px-1 rounded">smtp.gmail.com</code></li>
                  <li>Port: <code className="bg-gray-100 px-1 rounded">587</code></li>
                  <li>Security: STARTTLS (secure: false)</li>
                  <li>Gebruik je Google Workspace e-mailadres</li>
                  <li>Gebruik een App Password (niet je normale wachtwoord)</li>
                  <li>2-stapsverificatie moet ingeschakeld zijn</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-base sm:text-lg mb-2">Environment Variables:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>SMTP_USER: Je Gmail/Google Workspace e-mailadres</li>
                  <li>SMTP_PASS: Je App Password (niet je normale wachtwoord)</li>
                  <li>Deze worden automatisch gebruikt door de applicatie</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-base sm:text-lg mb-2">Troubleshooting:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Controleer of 2-stapsverificatie is ingeschakeld</li>
                  <li>Zorg dat je een App Password hebt gegenereerd</li>
                  <li>Controleer je e-mailadres en App Password</li>
                  <li>Kijk in de console logs voor gedetailleerde foutmeldingen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}