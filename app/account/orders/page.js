'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import { useCart } from '@/context/CartContext'
import FIcon from '@/components/FIcon'
import { Reveal, FButton } from '@/components/ui'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

const STATUS_COLORS = {
  PENDING: { bg: 'rgba(234,179,8,0.1)', color: '#ca8a04' },
  CONFIRMED: { bg: 'rgba(59,130,246,0.1)', color: '#2563eb' },
  PROCESSING: { bg: 'rgba(147,51,234,0.1)', color: '#9333ea' },
  OUT_FOR_DELIVERY: { bg: 'rgba(20,184,166,0.1)', color: '#0d9488' },
  DELIVERED: { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  CANCELLED: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626' },
}

const STATUS_LABELS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.PENDING
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 12px',
      borderRadius: 'var(--f-radius-full)', fontSize: 11, fontWeight: 700,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      background: c.bg, color: c.color,
    }}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}

export default function OrdersPage() {
  const router = useRouter()
  const { token, isLoggedIn, loading } = useCustomerAuth()
  const { addToCart } = useCart()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [error, setError] = useState('')
  const [reorderLoading, setReorderLoading] = useState(null)
  const [reorderModal, setReorderModal] = useState(null)
  const [reorderError, setReorderError] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const handleReorder = async (e, orderId) => {
    e.preventDefault()
    e.stopPropagation()
    setReorderLoading(orderId)
    setReorderError('')
    try {
      const res = await fetch(`${API_URL}/api/v1/customer/orders/${orderId}/reorder-preview`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setReorderModal(data.data)
      } else {
        setReorderError(data.error || 'Failed to load reorder preview')
      }
    } catch {
      setReorderError('Failed to load reorder preview')
    } finally {
      setReorderLoading(null)
    }
  }

  const handleAddReorderToCart = () => {
    if (!reorderModal?.available_items) return
    for (const item of reorderModal.available_items) {
      addToCart({
        id: item.variant_id,
        name: item.display_name,
        price: item.current_unit_price,
        weight: '',
        image: item.image_url || '',
        unit: item.unit || 'kg',
      }, item.quantity)
    }
    setReorderModal(null)
    setToastMsg('Items added to cart')
    setTimeout(() => setToastMsg(''), 3000)
  }

  useEffect(() => {
    if (!loading && !isLoggedIn) router.push('/account/login?redirect=/account/orders')
  }, [loading, isLoggedIn, router])

  useEffect(() => {
    if (!token) return
    const fetchOrders = async () => {
      setLoadingOrders(true)
      try {
        const res = await fetch(`${API_URL}/api/v1/customer/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success) {
          setOrders(data.data || [])
        } else {
          setError(data.error || 'Failed to load orders')
        }
      } catch {
        setError('Failed to load orders')
      } finally {
        setLoadingOrders(false)
      }
    }
    fetchOrders()
  }, [token])

  const fmt = (v) => `৳${Number(v || 0).toLocaleString()}`

  if (loading) return (
    <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
      <Spinner />
    </div>
  )

  if (!isLoggedIn) return null

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 720, paddingBottom: 80 }}>
        <Reveal>
          <Link href="/account" style={{
            display: 'flex', alignItems: 'center', gap: 6, color: 'var(--f-text-muted)',
            fontSize: 14, fontWeight: 600, marginBottom: 24, textDecoration: 'none',
          }}>
            <FIcon name="arrowLeft" size={16} color="var(--f-text-muted)" /> My Account
          </Link>
        </Reveal>

        <Reveal>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 32 }}>
            My Orders
          </h1>
        </Reveal>

        {error && (
          <Reveal>
            <div style={{
              padding: '12px 16px', borderRadius: 'var(--f-radius-md)',
              background: '#fef2f2', border: '1px solid #fecaca',
              color: '#dc2626', fontSize: 14, fontWeight: 500, marginBottom: 20,
            }}>
              {error}
            </div>
          </Reveal>
        )}

        {loadingOrders ? (
          <Spinner />
        ) : orders.length === 0 ? (
          <Reveal>
            <div style={{
              textAlign: 'center', padding: '60px 24px',
              background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
              border: '1px solid var(--f-border)',
            }}>
              <FIcon name="package" size={48} color="var(--f-border)" />
              <p style={{ marginTop: 16, fontSize: 17, fontWeight: 600, color: 'var(--f-text)' }}>No orders yet</p>
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', marginTop: 6, marginBottom: 24 }}>
                Start shopping to see your orders here.
              </p>
              <Link href="/shop" style={{ textDecoration: 'none' }}>
                <FButton variant="primary" size="md">Browse Shop</FButton>
              </Link>
            </div>
          </Reveal>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.map((order, i) => (
              <Reveal key={order.id} delay={i * 50}>
                <Link href={`/account/orders/detail?id=${order.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    padding: '20px 24px', borderRadius: 'var(--f-radius-lg)',
                    background: 'var(--f-surface)', border: '1px solid var(--f-border)',
                    transition: 'all 0.2s ease', cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--f-aqua)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--f-border)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)' }}>
                            #{order.order_number}
                          </span>
                          <StatusBadge status={order.status} />
                        </div>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                            {new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                            {order.item_count || order.items?.length || 0} item{(order.item_count || order.items?.length || 0) !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {(order.status === 'DELIVERED' || order.status === 'PICKED_UP') && (
                          <button
                            onClick={(e) => handleReorder(e, order.id)}
                            disabled={reorderLoading === order.id}
                            style={{
                              padding: '6px 14px', borderRadius: 'var(--f-radius-full)',
                              border: '1.5px solid #16a34a', background: 'transparent',
                              color: '#16a34a', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                              opacity: reorderLoading === order.id ? 0.6 : 1,
                              transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                            }}
                          >
                            {reorderLoading === order.id ? 'Loading...' : 'Reorder'}
                          </button>
                        )}
                        <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--f-aqua)' }}>
                          {fmt(order.total)}
                        </span>
                        <FIcon name="chevronRight" size={18} color="var(--f-text-muted)" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {reorderError && (
          <div style={{
            padding: '12px 16px', borderRadius: 'var(--f-radius-md)',
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#dc2626', fontSize: 14, fontWeight: 500, marginTop: 16,
          }}>
            {reorderError}
          </div>
        )}
      </div>

      {/* Reorder Modal */}
      {reorderModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setReorderModal(null)}>
          <div style={{ background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)', maxWidth: 500, width: '90%', maxHeight: '80vh', overflow: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--f-text)', marginBottom: 4 }}>Reorder Preview</h2>
            <p style={{ fontSize: 13, color: '#ca8a04', fontWeight: 500, marginBottom: 20 }}>Prices may differ from your previous order</p>

            {reorderModal.available_items?.length > 0 && (
              <>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)', marginBottom: 12 }}>Available Items</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {reorderModal.available_items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 'var(--f-radius-md)', background: 'var(--f-bg)', border: '1px solid var(--f-border)' }}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)', marginBottom: 2 }}>{item.display_name}</p>
                        <p style={{ fontSize: 12, color: 'var(--f-text-muted)' }}>{fmt(item.current_unit_price)} x {item.quantity}</p>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)' }}>{fmt(item.line_total)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {reorderModal.unavailable_items?.length > 0 && (
              <>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)', marginBottom: 12 }}>Unavailable Items</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {reorderModal.unavailable_items.map((item, i) => (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: 'var(--f-radius-md)', background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.3)' }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)', marginBottom: 2 }}>{item.display_name}</p>
                      <p style={{ fontSize: 12, color: '#ca8a04' }}>{item.reason}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {reorderModal.available_items?.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '2px solid var(--f-border)', marginBottom: 20 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)' }}>Subtotal</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--f-aqua)' }}>{fmt(reorderModal.subtotal)}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setReorderModal(null)} style={{ flex: 1, padding: '12px 0', borderRadius: 'var(--f-radius-md)', border: '1px solid var(--f-border)', background: 'transparent', color: 'var(--f-text)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              {reorderModal.available_items?.length > 0 && (
                <button onClick={handleAddReorderToCart} style={{ flex: 1, padding: '12px 0', borderRadius: 'var(--f-radius-md)', border: 'none', background: 'var(--f-aqua)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10000, background: '#16a34a', color: '#fff', padding: '12px 24px',
          borderRadius: 'var(--f-radius-full)', fontSize: 14, fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          {toastMsg}
        </div>
      )}
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
