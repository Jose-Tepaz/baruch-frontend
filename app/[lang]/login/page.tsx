'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import React from 'react'

interface LoginPageProps {
  params: {
    lang: string
  }
}

export default function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = React.use(params)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(identifier, password)
      router.push(`/${lang}/private-properties`)
    } catch (error: any) {
      setError(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container" style={{ marginTop: '120px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card mt-5">
              <div className="card-body" style={{ borderRadius: '20px' }}>
                <h2 className="text-size-large text-center mb-4">Login</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="identifier" className="form-label">
                      Email or Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="identifier"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                <div className="btn-area1 mt-0">
                  <button
                    type="submit"
                    className="vl-btn1 mt-0"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}

                    <span className="arrow1 ms-2"><i className="fa-solid fa-arrow-right"></i></span>
                    
                  </button>
                  

                </div>
                 
                </form>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 