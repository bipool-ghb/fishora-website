'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ACCENT = '#0D7C66'

const STAGES = [
  { key: 'order_placed',      label: 'Order Placed',      labelBn: 'অর্ডার গৃহীত',         icon: '📋' },
  { key: 'payment_complete',  label: 'Payment Complete',  labelBn: 'পেমেন্ট সম্পন্ন',       icon: '💳' },
  { key: 'order_confirmed',   label: 'Order Confirmed',   labelBn: 'অর্ডার নিশ্চিত',        icon: '✅' },
  { key: 'order_processing',  label: 'Order Processing',  labelBn: 'প্রক্রিয়াজাতকরণ',       icon: '🔪' },
  { key: 'delivery_started',  label: 'Delivery Started',  labelBn: 'ডেলিভারি শুরু',          icon: '🚚' },
  { key: 'delivered',         label: 'Delivered',         labelBn: 'ডেলিভারি সম্পন্ন',      icon: '🎉' },
]

const STATUS_INDEX = Object.fromEntries(STAGES.map((s, i) => [s.key, i]))

export default function TrackPage() {
  const [input, setInput]     = useState('')
  const [order, setOrder]     = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [orders, setOrders]   = useState([])

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem('fishora_orders') || '[]'))
    } catch {}
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const q = input.trim().toUpperCase()
    const found = orders.find(o => o.id === q)
    if (found) { setOrder(found); setNotFound(false) }
    else        { setOrder(null); setNotFound(true) }
  }

  const activeIdx = order ? (STATUS_INDEX[order.status] ?? 0) : -1

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>Track Your Order</h1>
      <p style={{ color: '#888', fontSize: 15, marginBottom: 32 }}>আপনার অর্ডার ট্র্যাক করুন</p>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
        <input
          value={input}
          onChange={e => { setInput(e.target.value); setNotFound(false) }}
          placeholder="Enter Order ID — e.g. FSH-ABCD-1234"
          style={{
            flex: 1, padding: '12px 16px', border: '1.5px solid #e0e0e0',
            borderRadius: 10, fontSize: 15, fontFamily: 'monospace',
          }}
        />
        <button type="submit" style={{
          background: ACCENT, color: '#fff', border: 'none',
          borderRadius: 10, padding: '12px 24px', fontSize: 15, fontWeight: 600,
        }}>Track</button>
      </form>

      {notFound && (
        <div style={{ background: '#fff3f3', border: '1.5px solid #ffcdd2', borderRadius: 12, padding: '16px 20px', marginBottom: 24, color: '#c62828', fontSize: 14 }}>
          ❌ Order not found. Please check your Order ID and try again.
        </div>
      )}

      {order && (
        <div>
          {/* Order summary */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: 24, marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#888', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Order ID</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: ACCENT, fontFamily: 'monospace', letterSpacing: 2 }}>{order.id}</div>
              </div>
              <div style={{
                background: activeIdx === STAGES.length - 1 ? '#e8f5e9' : ACCENT + '10',
                color: activeIdx === STAGES.length - 1 ? '#2e7d32' : ACCENT,
                borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700,
              }}>
                {STAGES[activeIdx]?.icon} {STAGES[activeIdx]?.label}
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '16px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, fontSize: 14 }}>
              <div><span style={{ color: '#888' }}>Customer</span><br /><strong>{order.name}</strong></div>
              <div><span style={{ color: '#888' }}>Phone</span><br /><strong>{order.phone}</strong></div>
              <div><span style={{ color: '#888' }}>Delivery Date</span><br /><strong>{order.deliveryDate}</strong></div>
              <div><span style={{ color: '#888' }}>Total</span><br /><strong style={{ color: ACCENT }}>৳{order.total}</strong></div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: '28px 24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 28 }}>Order Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {STAGES.map((stage, i) => {
                const done    = i < activeIdx
                const current = i === activeIdx
                const pending = i > activeIdx
                const isLast  = i === STAGES.length - 1

                return (
                  <div key={stage.key} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {/* Dot + line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 20,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: current ? 20 : 18,
                        background: done ? ACCENT : current ? ACCENT : '#f0f0f0',
                        border: current ? `3px solid ${ACCENT}40` : 'none',
                        boxShadow: current ? `0 0 0 4px ${ACCENT}20` : 'none',
                        transition: 'all .3s',
                        filter: pending ? 'grayscale(1) opacity(0.4)' : 'none',
                      }}>
                        {done ? '✓' : stage.icon}
                      </div>
                      {!isLast && (
                        <div style={{
                          width: 2, flex: 1, minHeight: 28,
                          background: done ? ACCENT : '#e0e0e0',
                          margin: '4px 0',
                        }} />
                      )}
                    </div>

                    {/* Label */}
                    <div style={{ paddingBottom: isLast ? 0 : 28, paddingTop: 8 }}>
                      <div style={{
                        fontSize: 15, fontWeight: current ? 700 : 600,
                        color: pending ? '#bbb' : '#1a1a1a',
                      }}>{stage.label}</div>
                      <div style={{ fontSize: 12, color: pending ? '#ccc' : '#888', marginTop: 2 }}>
                        {stage.labelBn}
                        {current && <span style={{ marginLeft: 8, color: ACCENT, fontWeight: 600 }}>← Current status</span>}
                        {done    && <span style={{ marginLeft: 8, color: ACCENT }}>✓ Completed</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Items */}
          {order.items?.length > 0 && (
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: 24, marginTop: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Items Ordered</h3>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#555', marginBottom: 8 }}>
                  <span>{item.name} × {item.qty}</span>
                  <span style={{ fontWeight: 600 }}>৳{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a href={`https://wa.me/8801357187246?text=Hi! My order ID is ${order.id}. Can you update me on my order status?`}
              target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#25D366', color: '#fff', borderRadius: 10,
              padding: '12px 28px', fontSize: 14, fontWeight: 600,
            }}>💬 Ask on WhatsApp</a>
          </div>
        </div>
      )}

      {/* Recent orders shortcut */}
      {!order && orders.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Your recent orders:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {orders.slice(0, 3).map(o => (
              <button key={o.id} onClick={() => { setInput(o.id); setOrder(o); setNotFound(false) }}
                style={{
                  background: '#fff', border: '1.5px solid #eee', borderRadius: 10,
                  padding: '12px 16px', textAlign: 'left', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: ACCENT }}>{o.id}</span>
                <span style={{ fontSize: 13, color: '#888' }}>{new Date(o.placedAt).toLocaleDateString()} · ৳{o.total}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {orders.length === 0 && !order && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <p>No orders placed yet.</p>
          <Link href="/shop" style={{ color: ACCENT, fontWeight: 600, fontSize: 14 }}>Start Shopping →</Link>
        </div>
      )}
    </div>
  )
}
