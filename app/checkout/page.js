'use client'
import { useState } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { useCart } from '@/context/CartContext'

function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const segment = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `FSH-${segment(4)}-${segment(4)}`
}

const ACCENT = '#0D7C66'
const PAYMENTS = [
  { id: 'bkash', label: 'bKash',            color: '#E2136E' },
  { id: 'nagad', label: 'Nagad',            color: '#F6921E' },
  { id: 'cod',   label: 'Cash on Delivery', color: '#555555' },
  { id: 'bank',  label: 'Bank Transfer',    color: '#1565C0' },
]

const today = new Date().toISOString().split('T')[0]

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart()
  const [payment, setPayment] = useState('bkash')
  const [placed, setPlaced]   = useState(false)
  const [orderId, setOrderId] = useState('')
  const [errors, setErrors]   = useState({})
  const [form, setForm]       = useState({ name: '', phone: '', address: '', deliveryDate: '' })
  const deliveryFee = subtotal > 2000 ? 0 : 100

  function validate() {
    const e = {}
    if (!form.name.trim())         e.name = 'Name is required'
    if (!form.phone.trim())        e.phone = 'Phone number is required'
    if (!form.address.trim())      e.address = 'Delivery address is required'
    if (!form.deliveryDate)        e.deliveryDate = 'Please select a delivery date'
    return e
  }

  function handlePlaceOrder() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    const id = generateOrderId()
    setOrderId(id)
    // Save order to localStorage for tracking
    const order = {
      id,
      name: form.name,
      phone: form.phone,
      address: form.address,
      deliveryDate: form.deliveryDate,
      payment,
      total: subtotal + deliveryFee,
      status: 'order_placed',
      placedAt: new Date().toISOString(),
      items: cart.map(i => ({ name: i.product.name, qty: i.qty, price: i.product.price })),
    }
    try {
      const existing = JSON.parse(localStorage.getItem('fishora_orders') || '[]')
      localStorage.setItem('fishora_orders', JSON.stringify([order, ...existing]))
    } catch {}
    clearCart()
    setPlaced(true)
  }

  function field(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  if (placed) return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, color: '#1a1a1a' }}>Order Placed!</h2>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 2 }}>আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।</p>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 28 }}>
        Delivery on <strong>{form.deliveryDate}</strong> · We'll confirm via WhatsApp.
      </p>

      {/* Order ID Card */}
      <div style={{
        background: '#fff', borderRadius: 16, border: '1.5px solid #eee',
        padding: '28px 24px', marginBottom: 24,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
          Your Order ID
        </p>
        <div style={{
          display: 'inline-block', background: '#f4f6f9', borderRadius: 10,
          padding: '10px 24px', marginBottom: 20,
        }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: ACCENT, fontFamily: 'monospace' }}>
            {orderId}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ padding: 12, background: '#fff', border: '1.5px solid #eee', borderRadius: 12, display: 'inline-block' }}>
            <QRCodeSVG
              value={`FISHORA-ORDER:${orderId}|NAME:${form.name}|PHONE:${form.phone}|DATE:${form.deliveryDate}|TOTAL:${subtotal + deliveryFee}`}
              size={160}
              fgColor="#1a1a1a"
              bgColor="#ffffff"
              level="M"
            />
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#aaa', margin: 0 }}>
          Save this QR code or note your Order ID to track your order
        </p>
        <p style={{ fontSize: 12, color: '#bbb', marginTop: 4 }}>
          এই QR কোড বা অর্ডার ID সংরক্ষণ করুন
        </p>
      </div>

      {/* Order Summary */}
      <div style={{
        background: ACCENT + '08', borderRadius: 12, padding: '16px 20px',
        fontSize: 14, color: '#555', marginBottom: 24, textAlign: 'left',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Customer</span><strong>{form.name}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Phone</span><strong>{form.phone}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Delivery Date</span><strong>{form.deliveryDate}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Paid</span><strong style={{ color: ACCENT }}>৳{subtotal + deliveryFee}</strong>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{
          background: ACCENT, color: '#fff', borderRadius: 10,
          padding: '12px 28px', fontSize: 15, fontWeight: 600, display: 'inline-block',
        }}>Back to Home</Link>
        <Link href={`/track`} style={{
          background: '#1a1a1a', color: '#fff', borderRadius: 10,
          padding: '12px 28px', fontSize: 15, fontWeight: 600, display: 'inline-block',
        }}>📦 Track Order</Link>
        <a href={`https://wa.me/8801357187246?text=Hi! My order ID is ${orderId}. I'd like to track my order.`}
          target="_blank" rel="noopener noreferrer" style={{
          background: '#25D366', color: '#fff', borderRadius: 10,
          padding: '12px 28px', fontSize: 15, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>💬 Track on WhatsApp</a>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, color: '#1a1a1a' }}>Checkout</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Delivery */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Delivery Information</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>
                Full Name / নাম <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                value={form.name}
                onChange={e => field('name', e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14,
                  border: `1.5px solid ${errors.name ? '#ef4444' : '#e0e0e0'}`,
                }}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>
                Phone / ফোন <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="tel"
                placeholder="01XXX-XXXXXX"
                value={form.phone}
                onChange={e => field('phone', e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14,
                  border: `1.5px solid ${errors.phone ? '#ef4444' : '#e0e0e0'}`,
                }}
              />
              {errors.phone && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
            </div>
          </div>

          {/* Address */}
          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>
              Address / ঠিকানা <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Full delivery address"
              value={form.address}
              onChange={e => field('address', e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14, resize: 'vertical',
                border: `1.5px solid ${errors.address ? '#ef4444' : '#e0e0e0'}`,
              }}
            />
            {errors.address && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.address}</p>}
          </div>

          {/* Delivery Date */}
          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>
              Delivery Date / ডেলিভারির তারিখ <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              min={today}
              value={form.deliveryDate}
              onChange={e => field('deliveryDate', e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14,
                border: `1.5px solid ${errors.deliveryDate ? '#ef4444' : '#e0e0e0'}`,
              }}
            />
            {errors.deliveryDate && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.deliveryDate}</p>}
          </div>
        </div>

        {/* Payment */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Payment Method / পেমেন্ট</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
            {PAYMENTS.map(m => (
              <button key={m.id} onClick={() => setPayment(m.id)} style={{
                background: payment === m.id ? m.color + '12' : '#f8f8f8',
                border: `2px solid ${payment === m.id ? m.color : 'transparent'}`,
                borderRadius: 10, padding: '14px 16px',
                fontSize: 14, fontWeight: 600,
                color: payment === m.id ? m.color : '#666',
                textAlign: 'center', transition: 'all .15s',
              }}>{m.label}</button>
            ))}
          </div>
        </div>

        {/* Place Order */}
        <div style={{
          background: ACCENT + '08', borderRadius: 14, padding: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 14, color: '#666' }}>
              Total: <strong style={{ fontSize: 22, color: '#1a1a1a' }}>৳{subtotal + deliveryFee}</strong>
            </div>
            <div style={{ fontSize: 13, color: '#888' }}>{cart.length} items + delivery</div>
          </div>
          <button
            onClick={handlePlaceOrder}
            style={{
              background: ACCENT, color: '#fff', border: 'none', borderRadius: 10,
              padding: '14px 40px', fontSize: 16, fontWeight: 600,
            }}
          >Place Order</button>
        </div>
      </div>
    </div>
  )
}
