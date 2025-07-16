'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { login as loginService, register as registerService, verifyToken, logout as logoutService, saveToken, getToken, User } from '@/services/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (identifier: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken()
        if (token) {
          const userData = await verifyToken(token)
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        logoutService()
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (identifier: string, password: string) => {
    try {
      const response = await loginService({ identifier, password })
      saveToken(response.jwt)
      setUser(response.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await registerService({ username, email, password })
      saveToken(response.jwt)
      setUser(response.user)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    logoutService()
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 