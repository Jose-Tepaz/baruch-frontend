'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentLocale } from '@/utils/get-current-locale'

export default function AuthButtons() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const currentLocale = getCurrentLocale()

  const handleLogout = () => {
    logout()
    router.push(`/${currentLocale}`)
  }

  if (isAuthenticated) {
    return (
      <div className="d-flex align-items-center gap-2">
        <div className="dropdown">
          <button 
            className="btn btn-outline-primary dropdown-toggle" 
            type="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <i className="fa-solid fa-user me-2"></i>
            {user?.username || 'Usuario'}
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" href={`/${currentLocale}/private-properties`}>
                <i className="fa-solid fa-lock me-2"></i>
                Properties
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button 
                className="dropdown-item text-danger" 
                onClick={handleLogout}
              >
                <i className="fa-solid fa-sign-out-alt me-2"></i>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <Link href={`/${currentLocale}/login`} className="btn btn-outline-primary">
        <i className="fa-solid fa-sign-in-alt me-2"></i>
        Iniciar Sesión
      </Link>
    </div>
  )
} 