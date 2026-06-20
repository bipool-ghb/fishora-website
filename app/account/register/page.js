'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import FIcon from '@/components/FIcon'

export default function RegisterPage() {
  const router = useRouter()
  const { register, login, isLoggedIn } = useCustomerAuth()
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '',
    address_line: '', area: '', city: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isLoggedIn) {
    router.push('/account')
    return null
  }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.phone || !form.password) {
      setError('Name, phone, and password are required')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setSubmitting(true)
    try {
      await register(form)
      // Auto-login after registration
      await login(form.phone, form.password)
      router.push('/account')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: 'var(--f-aqua-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <FIcon name="user" size={26} color="var(--f-aqua)" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 6 }}>
            Create Account
          </h1>
          <p style={{ fontSize: 15, color: 'var(--f-text-muted)' }}>
            Join Fishora for fresh deliveries
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

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Full Name *</label>
            <input value={form.name} onChange={set('name')} placeholder="Your full name" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Phone Number *</label>
            <input type="tel" value={form.phone} onChange={set('phone')} placeholder="01XXXXXXXXX" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Email <span style={{ color: 'var(--f-text-muted)', fontWeight: 400 }}>(optional)</span></label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Password *</label>
            <input type="password" value={form.password} onChange={set('password')} placeholder="Min 6 characters" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <div style={{ borderTop: '1px solid var(--f-border)', paddingTop: 18, marginTop: 6, marginBottom: 18 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--f-text-muted)', marginBottom: 14 }}>Address (optional)</p>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Address Line</label>
              <input value={form.address_line} onChange={set('address_line')} placeholder="House/Road/Village" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 0 }}>
              <div>
                <label style={labelStyle}>Area</label>
                <input value={form.area} onChange={set('area')} placeholder="Area/Thana" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={labelStyle}>City</label>
                <input value={form.city} onChange={set('city')} placeholder="City/District" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={submitting} style={{
            width: '100%', padding: '14px 24px', borderRadius: 'var(--f-radius-full)',
            background: submitting ? 'var(--f-text-muted)' : 'var(--f-aqua)',
            color: '#fff', fontSize: 15, fontWeight: 700, border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease', marginTop: 8,
          }}>
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--f-text-muted)' }}>
          Already have an account?{' '}
          <Link href="/account/login" style={{ color: 'var(--f-aqua)', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
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
