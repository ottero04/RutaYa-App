'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Check if user is authenticated and redirect accordingly
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
    checkAuth()
  }, [isAuthenticated, router])

  // Loading screen while checking auth
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent"></div>
    </div>
  )
}
