'use client'

import { useState, useEffect } from 'react'

interface ConsentPreferences {
  ad_storage: 'granted' | 'denied'
  analytics_storage: 'granted' | 'denied'
  functionality_storage: 'granted' | 'denied'
  personalization_storage: 'granted' | 'denied'
  security_storage: 'granted' | 'denied'
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  })

  useEffect(() => {
    // Check if consent has been given before
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 500)
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
        updateConsent(savedPreferences)
      } catch (e) {
        // If parsing fails, show banner again
        setShowBanner(true)
      }
    }
  }, [])

  const updateConsent = (newPreferences: ConsentPreferences) => {
    // Update Google Tag Manager Consent Mode
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ...newPreferences,
      })
    }

    // Also update dataLayer for GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_update',
        ...newPreferences,
      })
    }

    // Save to localStorage
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences))
    setPreferences(newPreferences)
  }

  const acceptAll = () => {
    const allGranted: ConsentPreferences = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    }
    updateConsent(allGranted)
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptNecessary = () => {
    const necessaryOnly: ConsentPreferences = {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
    }
    updateConsent(necessaryOnly)
    setShowBanner(false)
    setShowSettings(false)
  }

  const savePreferences = () => {
    updateConsent(preferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  const togglePreference = (key: keyof ConsentPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: prev[key] === 'granted' ? 'denied' : 'granted',
    }))
  }

  if (!showBanner) return null

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#ffffff',
        borderTop: '2px solid #e5e7eb',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1rem 1rem 1rem',
        }}
        className="sm:px-6 sm:py-6"
      >
        {!showSettings ? (
          // Cookie Banner
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
            className="sm:flex-row sm:items-center sm:justify-between"
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '0.5rem',
                }}
              >
                Cookie-instellingen
              </h3>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  marginBottom: '0.5rem',
                  lineHeight: '1.5',
                }}
              >
                Wij gebruiken cookies om uw ervaring te verbeteren, de website te analyseren en 
                gepersonaliseerde advertenties te tonen. Door op &quot;Alles accepteren&quot; te klikken, 
                stemt u in met het gebruik van alle cookies. U kunt ook kiezen voor alleen noodzakelijke cookies.
              </p>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  fontSize: '0.875rem',
                  color: '#016B61',
                  fontWeight: 600,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Instellingen aanpassen
              </button>
            </div>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                width: '100%',
              }}
              className="sm:flex-row sm:w-auto sm:gap-3"
            >
              <button
                onClick={acceptNecessary}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease-in-out',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                Alleen noodzakelijk
              </button>
              <button
                onClick={acceptAll}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  backgroundColor: '#016B61',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease-in-out',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#015a52'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#016B61'}
              >
                Alles accepteren
              </button>
            </div>
          </div>
        ) : (
          // Cookie Settings
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '0.5rem',
                }}
              >
                Cookie-instellingen
              </h3>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  marginBottom: '1rem',
                }}
              >
                Kies welke cookies u wilt accepteren. Noodzakelijke cookies kunnen niet worden uitgeschakeld.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Functionality Storage - Always enabled */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: '#111827' }}>Noodzakelijke cookies</p>
                  <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                    Essentieel voor de werking van de website
                  </p>
                </div>
                <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 600 }}>
                  Altijd actief
                </span>
              </div>

              {/* Analytics Storage */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: '#111827' }}>Analytische cookies</p>
                  <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                    Helpen ons begrijpen hoe bezoekers de website gebruiken
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('analytics_storage')}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    height: '1.5rem',
                    width: '2.75rem',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    backgroundColor: preferences.analytics_storage === 'granted' ? '#016B61' : '#d1d5db',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease-in-out',
                    padding: '0.125rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      height: '1rem',
                      width: '1rem',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      transform: preferences.analytics_storage === 'granted' ? 'translateX(1.5rem)' : 'translateX(0.125rem)',
                      transition: 'transform 0.15s ease-in-out',
                    }}
                  />
                </button>
              </div>

              {/* Ad Storage */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: '#111827' }}>Marketing cookies</p>
                  <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                    Gebruikt voor gepersonaliseerde advertenties en remarketing
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('ad_storage')}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    height: '1.5rem',
                    width: '2.75rem',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    backgroundColor: preferences.ad_storage === 'granted' ? '#016B61' : '#d1d5db',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease-in-out',
                    padding: '0.125rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      height: '1rem',
                      width: '1rem',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      transform: preferences.ad_storage === 'granted' ? 'translateX(1.5rem)' : 'translateX(0.125rem)',
                      transition: 'transform 0.15s ease-in-out',
                    }}
                  />
                </button>
              </div>

              {/* Personalization Storage */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: '#111827' }}>Personalisatie cookies</p>
                  <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                    Onthouden uw voorkeuren en personaliseren de ervaring
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('personalization_storage')}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    height: '1.5rem',
                    width: '2.75rem',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    backgroundColor: preferences.personalization_storage === 'granted' ? '#016B61' : '#d1d5db',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease-in-out',
                    padding: '0.125rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      height: '1rem',
                      width: '1rem',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      transform: preferences.personalization_storage === 'granted' ? 'translateX(1.5rem)' : 'translateX(0.125rem)',
                      transition: 'transform 0.15s ease-in-out',
                    }}
                  />
                </button>
              </div>
            </div>

            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                paddingTop: '0.5rem',
              }}
              className="sm:flex-row sm:gap-3"
            >
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease-in-out',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                Annuleren
              </button>
              <button
                onClick={savePreferences}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  backgroundColor: '#016B61',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease-in-out',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#015a52'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#016B61'}
              >
                Voorkeuren opslaan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date | object,
      config?: object
    ) => void
    dataLayer?: any[]
  }
}

