'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onLogin: (username: string, password: string) => boolean
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simuleer login check
    if (username === 'Gofatbike' && password === 'Gofatbike123!') {
      // Login succesvol
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', username)
      
      // Small delay to ensure localStorage is set, then redirect
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 100)
    } else {
      setError('Ongeldige gebruikersnaam of wachtwoord')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inloggen
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Voer je inloggegevens in
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Gebruikersnaam
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#ff6b35] focus:border-[#ff6b35] focus:z-10 sm:text-sm"
                placeholder="Gebruikersnaam"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Wachtwoord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#ff6b35] focus:border-[#ff6b35] focus:z-10 sm:text-sm"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff6b35] hover:bg-[#e55a2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b35] disabled:opacity-50"
            >
              {isLoading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">of</span>
            </div>
          </div>

          <div>
            <a
              href="/monteur"
              className="group relative w-full flex justify-center py-2 px-4 border-2 border-[#ff6b35] text-sm font-medium rounded-md text-[#ff6b35] bg-white hover:bg-[#ff6b35] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b35] transition-colors"
            >
              🔧 Monteur Portal
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
