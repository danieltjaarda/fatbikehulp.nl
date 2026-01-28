'use client'

import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  const handleLogin = (username: string, password: string): boolean => {
    // Login logica wordt afgehandeld in de LoginForm component
    return true
  }

  return <LoginForm onLogin={handleLogin} />
}
