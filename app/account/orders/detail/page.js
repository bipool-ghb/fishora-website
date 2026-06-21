'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

const PAYMENT_LABELS = {
  BKASH: 'bKash',
  NAGAD: 'Nagad',
  CARD: 'Card',
  CASH_ON_DELIVERY: 'Cash on Delivery',
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.PENDING
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '5px 14px',
      borderRadius: 'var(--f-radius-full)', fontSize: 12, fontWeight: 700,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      background: c.bg, color: c.color,
    }}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}

function OrderDetailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const { token, isLoggedIn, loading: authLoading } = useCustomerAuth()
  const { addToCart } = useCart()
  const [order, setOrder] = useState(null)
  const [tracking, setTracking] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reorderLoading, setReorderLoading] = useState(false)
  const [reorderModal, setReorderModal] = useState(null)
  const [reorderError, setReorderError] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const handleReorder = async () => {
    setReorderLoading(true)
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
      setReorderLoading(false)
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
    if (!authLoading && !isLoggedIn) router.push('/account/login?redirect=/account/orders')
  }, [authLoading, isLoggedIn, router])

  useEffect(() => {
    if (!token || !orderId) return
    const fetchData = async () => {
      setLoading(true)
      try {
        const [orderRes, trackingRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/customer/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/api/v1/customer/orders/${orderId}/tracking`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => null),
        ])
        const orderData = await orderRes.json()
        if (orderData.success) {
          setOrder(orderData.data)
        } else {
          setError(orderData.error || 'Failed to load order')
        }

        if (trackingRes) {
          const trackingData = await trackingRes.json()
          if (trackingData.success) {
            setTracking(trackingData.data || [])
          }
        }
      } catch {
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token, orderId])

  const fmt = (v) => `৳${Number(v || 0).toLocaleString()}`

  if (authLoading || loading) return (
    <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
      <Spinner />
    </div>
  )

  if (!isLoggedIn) return null

  if (error) return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 720, paddingBottom: 80 }}>
        <Link href="/account/orders" style={{
          display: 'flex', alignItems: 'center', gap: 6, color: 'var(--f-text-muted)',
          fontSize: 14, fontWeight: 600, marginBottom: 24, textDecoration: 'none',
        }}>
          <FIcon name="arrowLeft" size={16} color="var(--f-text-muted)" /> My Orders
        </Link>
        <div style={{
          padding: '12px 16px', borderRadius: 'var(--f-radius-md)',
          background: '#fef2f2', border: '1px solid #fecaca',
          color: '#dc2626', fontSize: 14, fontWeight: 500,
        }}>
          {error}
        </div>
      </div>
    </div>
  )

  if (!order) return null

  const addr = order.delivery_address_snapshot || {}
  const items = order.items || []
  const subtotal = items.reduce((sum, item) => sum + (Number(item.unit_price || 0) * Number(item.quantity || 0)), 0)
  const deliveryFee = Number(order.delivery_fee || 0)

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 720, paddingBottom: 80 }}>
        <Reveal>
          <Link href="/account/orders" style={{
            display: 'flex', alignItems: 'center', gap: 6, color: 'var(--f-text-muted)',
            fontSize: 14, fontWeight: 600, marginBottom: 24, textDecoration: 'none',
          }}>
            <FIcon name="arrowLeft" size={16} color="var(--f-text-muted)" /> My Orders
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal>
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', margin: 0 }}>
                Order #{order.order_number}
              </h1>
              <StatusBadge status={order.status} />
              {(order.status === 'DELIVERED' || order.status === 'PICKED_UP') && (
                <button
                  onClick={handleReorder}
                  disabled={reorderLoading}
                  style={{
                    padding: '7px 18px', borderRadius: 'var(--f-radius-full)',
                    border: '1.5px solid #16a34a', background: 'transparent',
                    color: '#16a34a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    opacity: reorderLoading ? 0.6 : 1, transition: 'all 0.2s ease',
                  }}
                >
                  {reorderLoading ? 'Loading...' : 'Reorder'}
                </button>
              )}
            </div>
            <p style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>
              Placed on {new Date(order.created_at).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            {reorderError && (
              <div style={{
                padding: '10px 14px', borderRadius: 'var(--f-radius-md)',
                background: '#fef2f2', border: '1px solid #fecaca',
                color: '#dc2626', fontSize: 13, fontWeight: 500, marginTop: 8,
              }}>
                {reorderError}
              </div>
            )}
          </div>
        </Reveal>

        {/* Items */}
        <Reveal delay={50}>
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Items</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              {items.filter(item => !item.is_combo_component).map((item, i, arr) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                  paddingBottom: i < arr.length - 1 ? 14 : 0,
                  borderBottom: i < arr.length - 1 ? '1px solid var(--f-border)' : 'none',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)', marginBottom: 4 }}>
                      {item.display_name_snapshot || item.item_name_snapshot || item.product_name || 'Product'}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                      {fmt(item.unit_price)}/kg x {item.quantity} kg
                    </p>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)', whiteSpace: 'nowrap' }}>
                    {fmt(Number(item.unit_price || 0) * Number(item.quantity || 0))}
                  </span>
                </div>
              ))}
            </div>

            {/* Combo Items */}
            {order.combo_items && order.combo_items.length > 0 && (
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--f-border)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,150,136,0.8)', borderRadius: 4, padding: '2px 8px' }}>COMBO</span>
                  Combo Items
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {order.combo_items.map((combo, ci) => (
                    <div key={ci} style={{
                      paddingBottom: ci < order.combo_items.length - 1 ? 14 : 0,
                      borderBottom: ci < order.combo_items.length - 1 ? '1px solid var(--f-border)' : 'none',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)', marginBottom: 4 }}>
                            {combo.combo_name_snapshot || combo.combo_name || 'Combo Pack'}
                          </p>
                          <p style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                            {fmt(combo.combo_price_snapshot)} x {combo.quantity}
                          </p>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)', whiteSpace: 'nowrap' }}>
                          {fmt(combo.line_total || Number(combo.combo_price_snapshot || 0) * Number(combo.quantity || 0))}
                        </span>
                      </div>
                      {/* Combo components */}
                      {combo.components && combo.components.length > 0 && (
                        <div style={{ marginTop: 8, paddingLeft: 16, borderLeft: '2px solid var(--f-border)' }}>
                          {combo.components.map((comp, cpi) => (
                            <div key={cpi} style={{ fontSize: 12, color: 'var(--f-text-muted)', lineHeight: 1.8 }}>
                              {comp.display_name_snapshot || comp.item_name_snapshot || comp.product_name || 'Item'} — {comp.quantity} {comp.unit}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Totals */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--f-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>Subtotal</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>{fmt(subtotal)}</span>
              </div>
              {(order.promotion_name_snapshot || order.promotion_code_snapshot) && (
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 8, padding: '8px 12px', borderRadius: 'var(--f-radius-md)',
                  background: 'rgba(46,204,113,0.06)', border: '1px solid rgba(46,204,113,0.12)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#27ae60', fontSize: 14, fontWeight: 700 }}>&#10003;</span>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--f-text)' }}>
                        {order.promotion_name_snapshot || 'Coupon Applied'}
                      </span>
                      {order.promotion_code_snapshot && (
                        <span style={{ fontSize: 12, color: 'var(--f-text-muted)', marginLeft: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          ({order.promotion_code_snapshot})
                        </span>
                      )}
                    </div>
                  </div>
                  {(order.promotion_discount_amount > 0 || order.discount_total > 0) && (
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#27ae60' }}>
                      -{fmt(order.promotion_discount_amount || order.discount_total)}
                    </span>
                  )}
                </div>
              )}
              {order.loyalty_points_redeemed > 0 && (
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 8, padding: '8px 12px', borderRadius: 'var(--f-radius-md)',
                  background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#d97706', fontSize: 14, fontWeight: 700 }}>&#9733;</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--f-text)' }}>
                      Points Redeemed
                    </span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#b45309' }}>
                    -{order.loyalty_points_redeemed.toLocaleString()} pts
                  </span>
                </div>
              )}
              {order.loyalty_discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#b45309' }}>Loyalty Discount</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#b45309' }}>-{fmt(order.loyalty_discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>
                  {order.fulfillment_type === 'PICKUP' ? 'Pickup' : 'Delivery'}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: deliveryFee > 0 ? 'var(--f-text)' : 'var(--f-aqua)' }}>
                  {order.fulfillment_type === 'PICKUP' ? 'Store Pickup' : (deliveryFee > 0 ? fmt(deliveryFee) : 'Free')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '2px solid var(--f-border)' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--f-text)' }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--f-aqua)' }}>{fmt(order.total)}</span>
              </div>
              {order.loyalty_points_earned > 0 && (
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginTop: 12, padding: '10px 14px', borderRadius: 'var(--f-radius-md)',
                  background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#d97706', fontSize: 15 }}>&#9733;</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--f-text)' }}>Points Earned</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>
                    +{order.loyalty_points_earned.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Delivery Address & Payment */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 16 }}>
          <Reveal delay={100}>
            <div style={cardStyle}>
              <h2 style={sectionTitle}>
                {order.fulfillment_type === 'PICKUP' ? 'Pickup Location' : 'Delivery Address'}
              </h2>
              <div style={{ marginTop: 12 }}>
                {order.fulfillment_type === 'PICKUP' ? (
                  <>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)', marginBottom: 4 }}>
                      {order.pickup_location || 'Fishora Store'}
                    </p>
                    {order.pickup_time_window && (
                      <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginBottom: 4 }}>
                        {order.pickup_time_window}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {addr.name && <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)', marginBottom: 4 }}>{addr.name}</p>}
                    {addr.phone && <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginBottom: 4 }}>{addr.phone}</p>}
                    <p style={{ fontSize: 13, color: 'var(--f-text-muted)', lineHeight: 1.6 }}>
                      {[addr.address_line1 || addr.address_line || addr.street, addr.area, addr.city].filter(Boolean).join(', ') || 'N/A'}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div style={cardStyle}>
              <h2 style={sectionTitle}>Payment</h2>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)', marginBottom: 4 }}>
                  {PAYMENT_LABELS[order.payment_method] || order.payment_method || 'N/A'}
                </p>
                <p style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                  Status: {order.payment_status || 'Pending'}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tracking Timeline */}
        {tracking.length > 0 && (
          <Reveal delay={200}>
            <div style={{ ...cardStyle, marginTop: 16 }}>
              <h2 style={sectionTitle}>Order Tracking</h2>
              <div style={{ marginTop: 20, position: 'relative', paddingLeft: 28 }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute', left: 7, top: 6, bottom: 6, width: 2,
                  background: 'var(--f-border)',
                }} />
                {tracking.map((event, i) => {
                  const isFirst = i === 0
                  const isModification = event.event_type === 'ORDER_MODIFICATION'
                  const dotColor = isFirst ? 'var(--f-aqua)' : isModification ? '#f59e0b' : 'var(--f-border)'
                  return (
                    <div key={i} style={{ position: 'relative', paddingBottom: i < tracking.length - 1 ? 24 : 0 }}>
                      {/* Dot */}
                      <div style={{
                        position: 'absolute', left: -24, top: 2,
                        width: 16, height: 16, borderRadius: '50%',
                        background: isFirst ? 'var(--f-aqua-light)' : isModification ? 'rgba(245,158,11,0.15)' : 'var(--f-bg)',
                        border: `3px solid ${dotColor}`,
                        zIndex: 1,
                      }} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: isFirst ? 'var(--f-text)' : 'var(--f-text-muted)' }}>
                          {event.title || event.status || 'Update'}
                        </p>
                        {event.description && (
                          <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginTop: 2 }}>
                            {event.description}
                          </p>
                        )}
                        {isModification && event.metadata && (
                          <div style={{
                            marginTop: 6, padding: '8px 12px', borderRadius: 'var(--f-radius-md)',
                            background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)',
                            fontSize: 12, color: 'var(--f-text-muted)', lineHeight: 1.6,
                          }}>
                            {event.metadata.type && (
                              <span style={{ fontWeight: 600, color: '#b45309', marginRight: 6 }}>
                                {event.metadata.type.replace(/_/g, ' ')}
                              </span>
                            )}
                            {event.metadata.item_name && <span>— {event.metadata.item_name}</span>}
                            {event.metadata.old_qty && event.metadata.new_qty && (
                              <span> (Qty: {event.metadata.old_qty} → {event.metadata.new_qty})</span>
                            )}
                            {event.metadata.reason && (
                              <div style={{ marginTop: 4, fontStyle: 'italic' }}>Reason: {event.metadata.reason}</div>
                            )}
                          </div>
                        )}
                        {event.created_at && (
                          <p style={{ fontSize: 12, color: 'var(--f-text-muted)', marginTop: 4, opacity: 0.7 }}>
                            {new Date(event.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            {' '}
                            {new Date(event.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        )}

        {/* Customer Notes */}
        {order.customer_notes && (
          <Reveal delay={250}>
            <div style={{ ...cardStyle, marginTop: 16 }}>
              <h2 style={sectionTitle}>Notes</h2>
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', marginTop: 8, lineHeight: 1.6 }}>
                {order.customer_notes}
              </p>
            </div>
          </Reveal>
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

export default function OrderDetailPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
        <Spinner />
      </div>
    }>
      <OrderDetailContent />
    </Suspense>
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

const sectionTitle = {
  fontSize: 16, fontWeight: 700, color: 'var(--f-text)', margin: 0,
}
