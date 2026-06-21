'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import FIcon from '@/components/FIcon'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

export default function AccountPage() {
  const router = useRouter()
  const { customer, token, logout, isLoggedIn, loading } = useCustomerAuth()
  const [tab, setTab] = useState('profile')
  const [loyalty, setLoyalty] = useState(null)

  useEffect(() => {
    if (!loading && !isLoggedIn) router.push('/account/login')
  }, [loading, isLoggedIn, router])

  // Fetch loyalty data
  useEffect(() => {
    if (!token) return
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/customer/loyalty`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success) setLoyalty(data.data)
      } catch {}
    })()
  }, [token])

  if (loading) return (
    <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
      <Spinner />
    </div>
  )

  if (!isLoggedIn) return null

  const handleLogout = () => { logout(); router.push('/') }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'orders', label: 'Orders' },
    { id: 'password', label: 'Password' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'phones', label: 'Phones' },
  ]

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 720, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 4 }}>
                My Account
              </h1>
              <p style={{ fontSize: 15, color: 'var(--f-text-muted)' }}>
                Welcome, {customer?.name || 'Customer'}
              </p>
            </div>
            <button onClick={handleLogout} style={{
              padding: '10px 20px', borderRadius: 'var(--f-radius-full)',
              background: 'var(--f-surface)', border: '1.5px solid var(--f-border)',
              color: 'var(--f-text-muted)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}>
              Sign Out
            </button>
          </div>

          {/* Customer info card */}
          <div style={{
            marginTop: 20, padding: '16px 20px', borderRadius: 'var(--f-radius-lg)',
            background: 'var(--f-aqua-light)', border: '1px solid var(--f-aqua)',
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: 'var(--f-aqua)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <FIcon name="user" size={22} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>{customer.name}</p>
              <p style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                {customer.primary_phone}{customer.email ? ` · ${customer.email}` : ''}
              </p>
            </div>
            {customer.customer_code && (
              <span style={{
                padding: '4px 12px', borderRadius: 'var(--f-radius-full)',
                background: 'var(--f-aqua)', color: '#fff', fontSize: 12, fontWeight: 700,
              }}>
                {customer.customer_code}
              </span>
            )}
          </div>

          {/* Loyalty Summary */}
          {loyalty && (
            <div style={{
              marginTop: 12, padding: '14px 20px', borderRadius: 'var(--f-radius-lg)',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(217,119,6,0.04))',
              border: '1px solid rgba(245,158,11,0.25)',
              display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
              <div style={{ textAlign: 'center', minWidth: 80 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#d97706' }}>
                  {Number(loyalty.available_points || 0).toLocaleString()}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--f-text-muted)', marginTop: 2 }}>
                  Available Points
                </div>
              </div>
              {loyalty.tier && (
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 14px', borderRadius: 'var(--f-radius-full)',
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: loyalty.tier === 'PLATINUM' ? 'linear-gradient(135deg, #6b7280, #9ca3af)' :
                                loyalty.tier === 'GOLD' ? 'linear-gradient(135deg, #d97706, #f59e0b)' :
                                'linear-gradient(135deg, #9ca3af, #d1d5db)',
                    color: '#fff',
                  }}>
                    {loyalty.tier}
                  </span>
                </div>
              )}
              <div style={{ textAlign: 'center', minWidth: 80 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>
                  {Number(loyalty.lifetime_earned || 0).toLocaleString()}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--f-text-muted)', marginTop: 2 }}>
                  Lifetime Earned
                </div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 80 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>
                  {Number(loyalty.lifetime_redeemed || 0).toLocaleString()}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--f-text-muted)', marginTop: 2 }}>
                  Lifetime Redeemed
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, flexWrap: 'wrap', borderBottom: '1px solid var(--f-border)', paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 20px', fontSize: 14, fontWeight: 600,
              background: 'none', border: 'none', cursor: 'pointer',
              color: tab === t.id ? 'var(--f-aqua)' : 'var(--f-text-muted)',
              borderBottom: tab === t.id ? '2px solid var(--f-aqua)' : '2px solid transparent',
              transition: 'all 0.2s ease', marginBottom: -1,
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'profile' && <ProfileSection token={token} customer={customer} />}
        {tab === 'orders' && <OrdersSection token={token} />}
        {tab === 'password' && <PasswordSection token={token} />}
        {tab === 'addresses' && <AddressesSection token={token} />}
        {tab === 'phones' && <PhonesSection token={token} />}
      </div>
    </div>
  )
}

/* ─── Profile ──────────────────────────────────────────── */
function ProfileSection({ token, customer }) {
  const [name, setName] = useState(customer?.name || '')
  const [email, setEmail] = useState(customer?.email || '')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true); setMsg(''); setErr('')
    try {
      const res = await fetch(`${API_URL}/api/v1/customer-auth/profile`, {
        method: 'PUT', headers: authHeaders(token),
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Update failed')
      setMsg('Profile updated successfully')
      // Update localStorage
      const saved = JSON.parse(localStorage.getItem('fishora_customer') || '{}')
      localStorage.setItem('fishora_customer', JSON.stringify({ ...saved, name, email }))
    } catch (e) { setErr(e.message) }
    finally { setSaving(false) }
  }

  return (
    <div style={cardStyle}>
      <h2 style={sectionTitle}>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <StatusMsg msg={msg} err={err} />
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <button type="submit" disabled={saving} style={btnPrimary(saving)}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

/* ─── Password ─────────────────────────────────────────── */
function PasswordSection({ token }) {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    if (!currentPw || !newPw) { setErr('Both fields are required'); return }
    if (newPw.length < 6) { setErr('New password must be at least 6 characters'); return }
    setSaving(true); setMsg(''); setErr('')
    try {
      const res = await fetch(`${API_URL}/api/v1/customer-auth/password`, {
        method: 'PUT', headers: authHeaders(token),
        body: JSON.stringify({ current_password: currentPw, new_password: newPw }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Update failed')
      setMsg('Password changed successfully')
      setCurrentPw(''); setNewPw('')
    } catch (e) { setErr(e.message) }
    finally { setSaving(false) }
  }

  return (
    <div style={cardStyle}>
      <h2 style={sectionTitle}>Change Password</h2>
      <form onSubmit={handleSave}>
        <StatusMsg msg={msg} err={err} />
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Current Password</label>
          <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>New Password</label>
          <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min 6 characters" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <button type="submit" disabled={saving} style={btnPrimary(saving)}>
          {saving ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  )
}

/* ─── Addresses ────────────────────────────────────────── */
function AddressesSection({ token }) {
  const [items, setItems] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [editing, setEditing] = useState(null) // null = list, 'new' = add, id = edit
  const [form, setForm] = useState({ label: '', address_line: '', area: '', city: '', is_default: false })
  const [err, setErr] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoadingList(true)
    try {
      const res = await fetch(`${API_URL}/api/v1/customer-auth/addresses`, { headers: authHeaders(token) })
      const data = await res.json()
      if (data.success) setItems(data.data || [])
    } catch {}
    finally { setLoadingList(false) }
  }, [token])

  useEffect(() => { load() }, [load])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: typeof f[k] === 'boolean' ? e.target.checked : e.target.value }))

  const startEdit = (item) => {
    setEditing(item.id)
    setForm({ label: item.label || '', address_line: item.address_line || '', area: item.area || '', city: item.city || '', is_default: item.is_default || false })
    setErr('')
  }

  const startNew = () => {
    setEditing('new')
    setForm({ label: '', address_line: '', area: '', city: '', is_default: false })
    setErr('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.address_line || !form.area || !form.city) { setErr('Address, area, and city are required'); return }
    setSaving(true); setErr('')
    try {
      const isNew = editing === 'new'
      const res = await fetch(`${API_URL}/api/v1/customer-auth/addresses${isNew ? '' : `/${editing}`}`, {
        method: isNew ? 'POST' : 'PUT', headers: authHeaders(token),
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      setEditing(null)
      load()
    } catch (e) { setErr(e.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this address?')) return
    try {
      await fetch(`${API_URL}/api/v1/customer-auth/addresses/${id}`, { method: 'DELETE', headers: authHeaders(token) })
      load()
    } catch {}
  }

  if (editing !== null) {
    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={sectionTitle}>{editing === 'new' ? 'Add Address' : 'Edit Address'}</h2>
          <button onClick={() => setEditing(null)} style={btnGhost}>Cancel</button>
        </div>
        <form onSubmit={handleSave}>
          {err && <ErrMsg err={err} />}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Label</label>
            <input value={form.label} onChange={set('label')} placeholder="Home, Office, etc." style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Address Line *</label>
            <input value={form.address_line} onChange={set('address_line')} placeholder="House/Road/Village" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Area *</label>
              <input value={form.area} onChange={set('area')} placeholder="Area/Thana" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div>
              <label style={labelStyle}>City *</label>
              <input value={form.city} onChange={set('city')} placeholder="City/District" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, cursor: 'pointer', fontSize: 14, color: 'var(--f-text)' }}>
            <input type="checkbox" checked={form.is_default} onChange={set('is_default')} />
            Set as default address
          </label>
          <button type="submit" disabled={saving} style={btnPrimary(saving)}>
            {saving ? 'Saving...' : 'Save Address'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={sectionTitle}>My Addresses</h2>
        <button onClick={startNew} style={btnSmallPrimary}>+ Add</button>
      </div>
      {loadingList ? <Spinner /> : items.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--f-text-muted)', padding: '20px 0', textAlign: 'center' }}>No addresses added yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(a => (
            <div key={a.id} style={{
              padding: '14px 16px', borderRadius: 'var(--f-radius-md)',
              border: '1px solid var(--f-border)', background: 'var(--f-bg)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <FIcon name="mapPin" size={14} color="var(--f-aqua)" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>{a.label || 'Address'}</span>
                  {a.is_default && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--f-aqua)', background: 'var(--f-aqua-light)', padding: '2px 8px', borderRadius: 'var(--f-radius-full)' }}>Default</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--f-text-muted)', lineHeight: 1.5 }}>
                  {a.address_line}{a.area ? `, ${a.area}` : ''}{a.city ? `, ${a.city}` : ''}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => startEdit(a)} style={btnIcon} title="Edit">
                  <FIcon name="chevronRight" size={14} color="var(--f-text-muted)" />
                </button>
                <button onClick={() => handleDelete(a.id)} style={btnIcon} title="Delete">
                  <FIcon name="trash" size={14} color="var(--f-text-muted)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Phones ───────────────────────────────────────────── */
function PhonesSection({ token }) {
  const [items, setItems] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ phone: '', label: '', is_primary: false })
  const [err, setErr] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoadingList(true)
    try {
      const res = await fetch(`${API_URL}/api/v1/customer-auth/phones`, { headers: authHeaders(token) })
      const data = await res.json()
      if (data.success) setItems(data.data || [])
    } catch {}
    finally { setLoadingList(false) }
  }, [token])

  useEffect(() => { load() }, [load])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: typeof f[k] === 'boolean' ? e.target.checked : e.target.value }))

  const startEdit = (item) => {
    setEditing(item.id)
    setForm({ phone: item.phone || '', label: item.label || '', is_primary: item.is_primary || false })
    setErr('')
  }

  const startNew = () => {
    setEditing('new')
    setForm({ phone: '', label: '', is_primary: false })
    setErr('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.phone) { setErr('Phone number is required'); return }
    setSaving(true); setErr('')
    try {
      const isNew = editing === 'new'
      const res = await fetch(`${API_URL}/api/v1/customer-auth/phones${isNew ? '' : `/${editing}`}`, {
        method: isNew ? 'POST' : 'PUT', headers: authHeaders(token),
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      setEditing(null)
      load()
    } catch (e) { setErr(e.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this phone number?')) return
    try {
      await fetch(`${API_URL}/api/v1/customer-auth/phones/${id}`, { method: 'DELETE', headers: authHeaders(token) })
      load()
    } catch {}
  }

  if (editing !== null) {
    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={sectionTitle}>{editing === 'new' ? 'Add Phone' : 'Edit Phone'}</h2>
          <button onClick={() => setEditing(null)} style={btnGhost}>Cancel</button>
        </div>
        <form onSubmit={handleSave}>
          {err && <ErrMsg err={err} />}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Phone Number *</label>
            <input type="tel" value={form.phone} onChange={set('phone')} placeholder="01XXXXXXXXX" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Label</label>
            <input value={form.label} onChange={set('label')} placeholder="Personal, Business, etc." style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, cursor: 'pointer', fontSize: 14, color: 'var(--f-text)' }}>
            <input type="checkbox" checked={form.is_primary} onChange={set('is_primary')} />
            Set as primary phone
          </label>
          <button type="submit" disabled={saving} style={btnPrimary(saving)}>
            {saving ? 'Saving...' : 'Save Phone'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={sectionTitle}>My Phone Numbers</h2>
        <button onClick={startNew} style={btnSmallPrimary}>+ Add</button>
      </div>
      {loadingList ? <Spinner /> : items.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--f-text-muted)', padding: '20px 0', textAlign: 'center' }}>No phone numbers added yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(p => (
            <div key={p.id} style={{
              padding: '14px 16px', borderRadius: 'var(--f-radius-md)',
              border: '1px solid var(--f-border)', background: 'var(--f-bg)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>{p.phone}</span>
                  {p.label && <span style={{ fontSize: 12, color: 'var(--f-text-muted)' }}>({p.label})</span>}
                  {p.is_primary && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--f-aqua)', background: 'var(--f-aqua-light)', padding: '2px 8px', borderRadius: 'var(--f-radius-full)' }}>Primary</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => startEdit(p)} style={btnIcon} title="Edit">
                  <FIcon name="chevronRight" size={14} color="var(--f-text-muted)" />
                </button>
                <button onClick={() => handleDelete(p.id)} style={btnIcon} title="Delete">
                  <FIcon name="trash" size={14} color="var(--f-text-muted)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Orders ──────────────────────────────────────────── */
const ORDER_STATUS_COLORS = {
  PENDING: { bg: 'rgba(234,179,8,0.1)', color: '#ca8a04' },
  CONFIRMED: { bg: 'rgba(59,130,246,0.1)', color: '#2563eb' },
  PROCESSING: { bg: 'rgba(147,51,234,0.1)', color: '#9333ea' },
  OUT_FOR_DELIVERY: { bg: 'rgba(20,184,166,0.1)', color: '#0d9488' },
  DELIVERED: { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  CANCELLED: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626' },
}

const ORDER_STATUS_LABELS = {
  PENDING: 'Pending', CONFIRMED: 'Confirmed', PROCESSING: 'Processing',
  OUT_FOR_DELIVERY: 'Out for Delivery', DELIVERED: 'Delivered', CANCELLED: 'Cancelled',
}

function OrdersSection({ token }) {
  const [orders, setOrders] = useState([])
  const [loadingList, setLoadingList] = useState(true)

  const load = useCallback(async () => {
    setLoadingList(true)
    try {
      const res = await fetch(`${API_URL}/api/v1/customer/orders`, { headers: authHeaders(token) })
      const data = await res.json()
      if (data.success) setOrders((data.data || []).slice(0, 5))
    } catch {}
    finally { setLoadingList(false) }
  }, [token])

  useEffect(() => { load() }, [load])

  const fmt = (v) => `৳${Number(v || 0).toLocaleString()}`

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={sectionTitle}>Recent Orders</h2>
        <Link href="/account/orders" style={{
          padding: '8px 16px', borderRadius: 'var(--f-radius-full)',
          background: 'var(--f-aqua)', color: '#fff', fontSize: 13, fontWeight: 600,
          border: 'none', cursor: 'pointer', textDecoration: 'none',
        }}>
          View All
        </Link>
      </div>
      {loadingList ? <Spinner /> : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <FIcon name="package" size={36} color="var(--f-border)" />
          <p style={{ fontSize: 14, color: 'var(--f-text-muted)', marginTop: 12 }}>No orders yet</p>
          <Link href="/shop" style={{ color: 'var(--f-aqua)', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {orders.map(order => {
            const sc = ORDER_STATUS_COLORS[order.status] || ORDER_STATUS_COLORS.PENDING
            return (
              <Link key={order.id} href={`/account/orders/detail?id=${order.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  padding: '14px 16px', borderRadius: 'var(--f-radius-md)',
                  border: '1px solid var(--f-border)', background: 'var(--f-bg)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  transition: 'border-color 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--f-aqua)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--f-border)'}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)' }}>#{order.order_number}</span>
                      <span style={{
                        display: 'inline-flex', padding: '2px 8px', borderRadius: 'var(--f-radius-full)',
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                        background: sc.bg, color: sc.color,
                      }}>
                        {ORDER_STATUS_LABELS[order.status] || order.status}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--f-text-muted)' }}>
                      {new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-aqua)' }}>{fmt(order.total)}</span>
                    <FIcon name="chevronRight" size={14} color="var(--f-text-muted)" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── Shared Styles & Helpers ──────────────────────────── */

function Spinner() {
  return (
    <div style={{ textAlign: 'center', padding: '30px 0' }}>
      <div style={{ width: 32, height: 32, border: '3px solid var(--f-border)', borderTopColor: 'var(--f-aqua)', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function StatusMsg({ msg, err }) {
  if (msg) return <div style={{ padding: '10px 14px', borderRadius: 'var(--f-radius-md)', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 14, fontWeight: 500, marginBottom: 18 }}>{msg}</div>
  if (err) return <ErrMsg err={err} />
  return null
}

function ErrMsg({ err }) {
  return <div style={{ padding: '10px 14px', borderRadius: 'var(--f-radius-md)', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 14, fontWeight: 500, marginBottom: 18 }}>{err}</div>
}

function authHeaders(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

function handleFocus(e) {
  e.target.style.borderColor = 'var(--f-aqua)'
  e.target.style.boxShadow = '0 0 0 3px var(--f-aqua-light)'
}

function handleBlur(e) {
  e.target.style.borderColor = 'var(--f-border)'
  e.target.style.boxShadow = 'none'
}

const cardStyle = {
  background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
  border: '1px solid var(--f-border)', padding: 28,
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
}

const sectionTitle = {
  fontSize: 18, fontWeight: 700, color: 'var(--f-text)', margin: 0,
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

const btnPrimary = (disabled) => ({
  padding: '12px 24px', borderRadius: 'var(--f-radius-full)',
  background: disabled ? 'var(--f-text-muted)' : 'var(--f-aqua)',
  color: '#fff', fontSize: 14, fontWeight: 700, border: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease',
})

const btnSmallPrimary = {
  padding: '8px 16px', borderRadius: 'var(--f-radius-full)',
  background: 'var(--f-aqua)', color: '#fff', fontSize: 13, fontWeight: 600,
  border: 'none', cursor: 'pointer',
}

const btnGhost = {
  padding: '8px 16px', borderRadius: 'var(--f-radius-full)',
  background: 'none', color: 'var(--f-text-muted)', fontSize: 13, fontWeight: 600,
  border: '1px solid var(--f-border)', cursor: 'pointer',
}

const btnIcon = {
  width: 32, height: 32, borderRadius: '50%', background: 'var(--f-bg-alt)',
  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
}
