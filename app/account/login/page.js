'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import FIcon from '@/components/FIcon'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/account'
  const { login, isLoggedIn } = useCustomerAuth()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Redirect if already logged in
  if (isLoggedIn) {
    router.push(redirectTo)
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!phone || !password) { setError('Please fill in all fields'); return }
    setSubmitting(true)
    try {
      await login(phone, password)
      router.push(redirectTo)
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440, padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: 'var(--f-aqua-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <FIcon name="user" size={26} color="var(--f-aqua)" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 6 }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: 15, color: 'var(--f-text-muted)' }}>
            Sign in to your Fishora account
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
          border: '1px solid var(--f-border)', padding: 28,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          {error && (
            <div style={{
              padding: '12px 16px', borderRadius: 'var(--f-radius-md)',
              background: '#fef2f2', border: '1px solid #fecaca',
              color: '#dc2626', fontSize: 14, fontWeight: 500, marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <button type="submit" disabled={submitting} style={{
            width: '100%', padding: '14px 24px', borderRadius: 'var(--f-radius-full)',
            background: submitting ? 'var(--f-text-muted)' : 'var(--f-aqua)',
            color: '#fff', fontSize: 15, fontWeight: 700, border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--f-text-muted)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/account/register" style={{ color: 'var(--f-aqua)', fontWeight: 600, textDecoration: 'none' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: 'var(--f-text)', marginBottom: 6,
}

const inputStyle = {
  width: '100%', padding: '12px 16px',
  borderRadius: 'var(--f-radius-md)', border: '1.5px solid var(--f-border)',
  background: 'var(--f-bg)', color: 'var(--f-text)',
  fontSize: 15, outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
}

function handleFocus(e) {
  e.target.style.borderColor = 'var(--f-aqua)'
  e.target.style.boxShadow = '0 0 0 3px var(--f-aqua-light)'
}

function handleBlur(e) {
  e.target.style.borderColor = 'var(--f-border)'
  e.target.style.boxShadow = 'none'
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--f-border)', borderTopColor: 'var(--f-aqua)', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
