import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  phone?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  register: (email: string, password: string, name: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Mock login - in production, validate with backend
        if (email && password) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
          }
          set({ user, isAuthenticated: true })
          localStorage.setItem('auth_user', JSON.stringify(user))
        }
      },
      register: (email: string, password: string, name: string) => {
        // Mock register - saves user data but doesn't authenticate
        // User must login separately
        if (email && password && name) {
          const userData = { email, password, name }
          localStorage.setItem('pending_registration', JSON.stringify(userData))
          // Don't set authenticated state - user must login manually
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
        localStorage.removeItem('auth_user')
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
