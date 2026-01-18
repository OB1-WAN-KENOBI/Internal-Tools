import { create } from 'zustand'
import type { User } from '@/shared/types'
import { API_BASE_URL } from '@/shared/config'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),

  login: async (email: string, password: string) => {
    // In production demo, use mock authentication
    if (!API_BASE_URL) {
      // Mock user for demo
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
      }
      
      if (email === 'demo@example.com' && password === 'demo') {
        const token = `token_${mockUser.id}_${Date.now()}`
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(mockUser))
        set({ user: mockUser, token, isAuthenticated: true })
        return
      }
      throw new Error('Invalid credentials. Use demo@example.com / demo')
    }

    const response = await fetch(`${API_BASE_URL}/users`)
    const users: User[] = await response.json()

    const user = users.find(
      (u) =>
        u.email === email &&
        (u as User & { password: string }).password === password
    )

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = `token_${user.id}_${Date.now()}`
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))

    set({ user, token, isAuthenticated: true })

    await fetch(`${API_BASE_URL}/auditLogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        userName: user.name,
        action: 'login',
        resource: 'auth',
        timestamp: new Date().toISOString(),
        details: `User ${user.email} logged in`,
      }),
    })
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    set({ user: null, token: null, isAuthenticated: false })
  },

  setUser: (user: User) => {
    localStorage.setItem('auth_user', JSON.stringify(user))
    set({ user })
  },
}))

export function initAuth() {
  const token = localStorage.getItem('auth_token')
  const userStr = localStorage.getItem('auth_user')

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr) as User
      useAuthStore.setState({ user, token, isAuthenticated: true })
    } catch {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }
}
