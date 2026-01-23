'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'
import { useTranslation } from '@/utils/i18n-simple'
export default function AuthButtons() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const getLocalizedPath = useLocalizedPath()
  const { t } = useTranslation('common')
  const handleLogout = () => {
    logout()
    router.push(getLocalizedPath('/'))
  }

  if (isAuthenticated) {
    return (
      <div className="d-flex align-items-center gap-2">
        <div className="dropdown">
          <button 
            className="login-btn  dropdown-toggle" 
            type="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <i className="fa-solid fa-user me-2"></i>
            {user?.username || t('navigation.logout-btn')}
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" href={getLocalizedPath('/private-properties')}>
                <i className="fa-solid fa-lock me-2"></i>
                {t('navigation.btn-private-properties')}
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button 
                className="dropdown-item text-danger" 
                onClick={handleLogout}
              >
                <i className="fa-solid fa-sign-out-alt me-2"></i>
                {t('navigation.logout-btn')}
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="wrapp-login-btn">
      <Link href={getLocalizedPath('/login')} className="login-btn">
        <i className="fa-solid fa-sign-in-alt me-2"></i>
       Login
      </Link>
    </div>
  )
} 