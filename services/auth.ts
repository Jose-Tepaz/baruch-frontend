import { query } from './strapi'

// Usar la variable de entorno correcta
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST || 'http://localhost:1337'

export interface User {
  id: number
  username: string
  email: string
  role: {
    id: number
    name: string
    type: string
  }
  permissions?: string[]
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  identifier: string // email o username
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  jwt: string
  user: User
}

// Función para hacer login
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    console.log('Intentando login con URL:', `${STRAPI_HOST}/api/auth/local`)
    console.log('Credenciales:', { identifier: credentials.identifier })
    
    const response = await fetch(`${STRAPI_HOST}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      
      try {
        const error = JSON.parse(errorText)
        throw new Error(error.error?.message || 'Login failed')
      } catch (parseError) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`)
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Función para registrar usuario
export async function register(userData: RegisterData): Promise<AuthResponse> {
  try {
    console.log('Intentando registro con URL:', `${STRAPI_HOST}/api/auth/local/register`)
    
    const response = await fetch(`${STRAPI_HOST}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      
      try {
        const error = JSON.parse(errorText)
        throw new Error(error.error?.message || 'Registration failed')
      } catch (parseError) {
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`)
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Función para verificar el token
export async function verifyToken(token: string): Promise<User> {
  try {
    const response = await fetch(`${STRAPI_HOST}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Invalid token')
    }

    const user = await response.json()
    return user
  } catch (error) {
    console.error('Token verification error:', error)
    throw error
  }
}

// Función para cerrar sesión (solo en el cliente)
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
}

// Función para obtener el token del localStorage
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Función para guardar el token en localStorage
export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

// Función para verificar si el usuario tiene permisos específicos
export function hasPermission(user: User | null, permission: string): boolean {
  if (!user || !user.permissions) return false
  return user.permissions.includes(permission)
}

// Función para verificar si el usuario puede ver propiedades privadas
export function canViewPrivateProperties(user: User | null): boolean {
  return hasPermission(user, 'view-private-properties') || 
         (user?.role?.name === 'admin' || user?.role?.name === 'authenticated')
} 