'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import FIcon from '@/components/FIcon'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

const STATUS_COLORS = {
  ACTIVE: { bg: 'rgba(34,197,94,0.1)', color: '#16a34a', border: 'rgba(34,197,94,0.25)' },
  PAUSED: { bg: 'rgba(245,158,11,0.1)', color: '#d97706', border: 'rgba(245,158,11,0.25)' },
  CANCELLED: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'rgba(239,68,68,0.25)' },
  EXPIRED: { bg: 'rgba(107,114,128,0.1)', color: '#6b7280', border: 'rgba(107,114,128,0.25)' },
}

const FREQUENCY_LABELS = {
  WEEKLY: 'Weekly',
  BIWEEKLY: 'Every 2 Weeks',
  MONTHLY: 'Monthly',
}

function authHeaders(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

export default function SubscriptionsPage() {
  const router = useRouter()
  const { token, isLoggedIn, loading } = useCustomerAuth()
  const [subscriptions, setSubscriptions] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [actionLoading, setActionLoading] = useState(null) // sub id being actioned
  const [confirmAction, setConfirmAction] = useState(null) // { type, sub }
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!loading && !isLoggedIn) router.push('/account/login')
  }, [loading, isLoggedIn, router])

  const load = useCallback(async () => {
    if (!token) return
    setLoadingList(true)
    try {
      const res = await fetch(`${API_URL}/api/v1/customer/subscriptions`, { headers: authHeaders(token) })
      const data = await res.json()
      if (data.success) setSubscriptions(data.data || [])
    } catch {}
    finally { setLoadingList(false) }
  }, [token])

  useEffect(() => { load() }, [load])

  const handleAction = async (type, subId) => {
    setActionLoading(subId)
    try {
      const url = `${API_URL}/api/v1/customer/subscriptions/${subId}/${type}`
      const body = (type === 'pause' || type === 'cancel') ? JSON.stringify({ reason }) : '{}'
      const res = await fetch(url, {
        method: 'PUT',
        headers: authHeaders(token),
        body,
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || `Failed to ${type}`)
      load()
      setConfirmAction(null)
      setReason('')
    } catch (e) {
      alert(e.message)
    } finally { setActionLoading(null) }
  }

  const fmt = (v) => `৳${Number(v || 0).toLocaleString()}`
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  if (loading) return (
    <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
      <Spinner />
    </div>
  )

  if (!isLoggedIn) return null

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 720, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <Link href="/account" style={{ fontSize: 13, color: 'var(--f-aqua)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
            <FIcon name="arrowLeft" size={14} color="var(--f-aqua)" /> Back to Account
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em' }}>
            My Subscriptions
          </h1>
          <p style={{ fontSize: 15, color: 'var(--f-text-muted)', marginTop: 4 }}>
            Manage your recurring deliveries
          </p>
        </div>

        {/* List */}
        {loadingList ? <Spinner /> : subscriptions.length === 0 ? (
          <div style={cardStyle}>
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <FIcon name="package" size={36} color="var(--f-border)" />
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', marginTop: 12 }}>No subscriptions yet</p>
              <Link href="/shop" style={{ color: 'var(--f-aqua)', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>
                Browse Plans
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {subscriptions.map(sub => {
              const sc = STATUS_COLORS[sub.status] || STATUS_COLORS.EXPIRED
              return (
                <div key={sub.id} style={{
                  ...cardStyle,
                  borderColor: sc.border,
                }}>
                  {/* Top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)' }}>{sub.plan_name || 'Subscription'}</span>
                        <span style={{
                          display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--f-radius-full)',
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                          background: sc.bg, color: sc.color,
                        }}>
                          {sub.status}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                        {FREQUENCY_LABELS[sub.frequency] || sub.frequency}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--f-aqua)' }}>{fmt(sub.price || sub.base_price)}</div>
                      <div style={{ fontSize: 11, color: 'var(--f-text-muted)', marginTop: 2 }}>per delivery</div>
                    </div>
                  </div>

                  {/* Info row */}
                  <div style={{
                    display: 'flex', gap: 16, flexWrap: 'wrap', padding: '12px 16px',
                    borderRadius: 'var(--f-radius-md)', background: 'var(--f-bg)',
                    marginBottom: 14, fontSize: 13,
                  }}>
                    <div>
                      <span style={{ color: 'var(--f-text-muted)' }}>Next Delivery: </span>
                      <span style={{ fontWeight: 600, color: 'var(--f-text)' }}>{fmtDate(sub.next_delivery_date)}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--f-text-muted)' }}>Deliveries Made: </span>
                      <span style={{ fontWeight: 600, color: 'var(--f-text)' }}>{sub.deliveries_made ?? 0}</span>
                    </div>
                    {sub.started_at && (
                      <div>
                        <span style={{ color: 'var(--f-text-muted)' }}>Since: </span>
                        <span style={{ fontWeight: 600, color: 'var(--f-text)' }}>{fmtDate(sub.started_at)}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {(sub.status === 'ACTIVE' || sub.status === 'PAUSED') && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {sub.status === 'ACTIVE' && (
                        <>
                          <button
                            onClick={() => setConfirmAction({ type: 'pause', sub })}
                            disabled={actionLoading === sub.id}
                            style={actionBtn('#d97706')}
                          >
                            Pause
                          </button>
                          <button
                            onClick={() => setConfirmAction({ type: 'skip', sub })}
                            disabled={actionLoading === sub.id}
                            style={actionBtn('var(--f-text-muted)')}
                          >
                            Skip Next
                          </button>
                          <button
                            onClick={() => setConfirmAction({ type: 'cancel', sub })}
                            disabled={actionLoading === sub.id}
                            style={actionBtn('#dc2626')}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {sub.status === 'PAUSED' && (
                        <>
                          <button
                            onClick={() => setConfirmAction({ type: 'resume', sub })}
                            disabled={actionLoading === sub.id}
                            style={actionBtn('#16a34a')}
                          >
                            Resume
                          </button>
                          <button
                            onClick={() => setConfirmAction({ type: 'cancel', sub })}
                            disabled={actionLoading === sub.id}
                            style={actionBtn('#dc2626')}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Confirm Dialog Overlay */}
        {confirmAction && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
            onClick={e => { if (e.target === e.currentTarget) { setConfirmAction(null); setReason(''); } }}
          >
            <div style={{
              background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
              border: '1px solid var(--f-border)', padding: 28,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              maxWidth: 420, width: '100%',
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 8 }}>
                {confirmAction.type === 'pause' && 'Pause Subscription'}
                {confirmAction.type === 'resume' && 'Resume Subscription'}
                {confirmAction.type === 'cancel' && 'Cancel Subscription'}
                {confirmAction.type === 'skip' && 'Skip Next Delivery'}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', marginBottom: 16 }}>
                {confirmAction.type === 'pause' && `Pause "${confirmAction.sub.plan_name}"? You can resume anytime.`}
                {confirmAction.type === 'resume' && `Resume "${confirmAction.sub.plan_name}"? Deliveries will restart.`}
                {confirmAction.type === 'cancel' && `Cancel "${confirmAction.sub.plan_name}"? This cannot be undone.`}
                {confirmAction.type === 'skip' && `Skip the next delivery for "${confirmAction.sub.plan_name}"?`}
              </p>

              {(confirmAction.type === 'pause' || confirmAction.type === 'cancel') && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--f-text)', marginBottom: 6 }}>
                    Reason (optional)
                  </label>
                  <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Tell us why..."
                    rows={2}
                    style={{
                      width: '100%', padding: '10px 14px',
                      borderRadius: 'var(--f-radius-md)', border: '1.5px solid var(--f-border)',
                      background: 'var(--f-bg)', color: 'var(--f-text)',
                      fontSize: 14, outline: 'none', resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => { setConfirmAction(null); setReason(''); }}
                  style={{
                    padding: '10px 20px', borderRadius: 'var(--f-radius-full)',
                    background: 'none', border: '1px solid var(--f-border)',
                    color: 'var(--f-text-muted)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => handleAction(confirmAction.type, confirmAction.sub.id)}
                  disabled={actionLoading === confirmAction.sub.id}
                  style={{
                    padding: '10px 20px', borderRadius: 'var(--f-radius-full)',
                    background: confirmAction.type === 'cancel' ? '#dc2626' :
                                confirmAction.type === 'pause' ? '#d97706' :
                                confirmAction.type === 'resume' ? '#16a34a' : 'var(--f-aqua)',
                    color: '#fff', fontSize: 14, fontWeight: 700, border: 'none',
                    cursor: actionLoading ? 'not-allowed' : 'pointer',
                    opacity: actionLoading ? 0.6 : 1,
                  }}
                >
                  {actionLoading === confirmAction.sub.id ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div style={{ textAlign: 'center', padding: '30px 0' }}>
      <div style={{ width: 32, height: 32, border: '3px solid var(--f-border)', borderTopColor: 'var(--f-aqua)', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const cardStyle = {
  background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
  border: '1px solid var(--f-border)', padding: 24,
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
}

const actionBtn = (color) => ({
  padding: '8px 18px', borderRadius: 'var(--f-radius-full)',
  background: 'none', border: `1.5px solid ${color}`,
  color: color, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', transition: 'all 0.2s ease',
})
