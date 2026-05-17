'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import FIcon from '@/components/FIcon'
import { Reveal, FButton } from '@/components/ui'

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState({ name: '', phone: '', street: '', area: '', city: 'Ishwardi' })
  const [deliverySlot, setDeliverySlot] = useState('morning')
  const [payment, setPayment] = useState('bkash')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const fmt = (v) => `৳${v.toLocaleString()}`

  const slots = [
    { id: 'morning', label: 'Morning', time: '8:00 AM – 12:00 PM' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM – 4:00 PM' },
    { id: 'evening', label: 'Evening', time: '4:00 PM – 8:00 PM' },
  ]
  const payments = [
    { id: 'bkash', label: 'bKash', color: '#E2136E' },
    { id: 'nagad', label: 'Nagad', color: '#F6921E' },
    { id: 'card', label: 'Card', color: '#1A73E8' },
    { id: 'cod', label: 'Cash on Delivery', color: '#27ae60' },
  ]

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 'var(--f-radius-md)',
    border: '1.5px solid var(--f-border)', background: 'var(--f-surface)',
    color: 'var(--f-text)', fontSize: 15, outline: 'none',
    transition: 'border-color 0.2s',
  }

  if (orderPlaced) {
    return (
      <div style={{ paddingTop: 120, minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 560, textAlign: 'center', padding: '60px 24px' }}>
          <Reveal>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: 'rgba(46,204,113,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            }}>
              <FIcon name="check" size={40} color="#27ae60" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--f-text)', marginBottom: 12 }}>Order Placed!</h1>
            <p style={{ fontSize: 16, color: 'var(--f-text-secondary)', marginBottom: 8, lineHeight: 1.7 }}>
              Your fresh food is being prepared. You&apos;ll receive a confirmation shortly.
            </p>
            <p style={{ fontFamily: 'var(--f-font-bn)', fontSize: 15, color: 'var(--f-aqua)', marginBottom: 32 }}>
              ধন্যবাদ! আপনার অর্ডার গৃহীত হয়েছে।
            </p>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <FButton variant="primary" size="lg">Back to Home</FButton>
            </Link>
          </Reveal>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 120, minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 560, textAlign: 'center', padding: '60px 24px' }}>
          <FIcon name="cart" size={48} color="var(--f-border)" />
          <p style={{ marginTop: 16, fontSize: 17, fontWeight: 600, color: 'var(--f-text)' }}>Your cart is empty</p>
          <Link href="/shop" style={{ textDecoration: 'none', marginTop: 20, display: 'inline-block' }}>
            <FButton variant="primary" size="lg">Go Shopping</FButton>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 800, paddingBottom: 80 }}>
        <Reveal>
          <Link href="/shop" style={{
            display: 'flex', alignItems: 'center', gap: 6, color: 'var(--f-text-muted)',
            fontSize: 14, fontWeight: 600, marginBottom: 24, textDecoration: 'none',
          }}>
            <FIcon name="arrowLeft" size={16} color="var(--f-text-muted)" /> Back to shop
          </Link>
        </Reveal>

        <Reveal>
          <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 32 }}>
            Checkout
          </h1>
        </Reveal>

        {/* Steps indicator */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
            {['Address', 'Delivery', 'Payment'].map((s, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i <= step ? 'var(--f-aqua)' : 'var(--f-border)',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>
        </Reveal>

        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 32 }}>
          {/* Left: Form */}
          <Reveal delay={150}>
            <div style={{ background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)', padding: 32, border: '1px solid var(--f-border)' }}>
              {step === 0 && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 20 }}>Delivery Address</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <input style={inputStyle} placeholder="Full Name" value={address.name}
                      onChange={e => setAddress({ ...address, name: e.target.value })} />
                    <input style={inputStyle} placeholder="Phone Number" value={address.phone}
                      onChange={e => setAddress({ ...address, phone: e.target.value })} />
                    <input style={inputStyle} placeholder="Street Address" value={address.street}
                      onChange={e => setAddress({ ...address, street: e.target.value })} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <input style={inputStyle} placeholder="Area" value={address.area}
                        onChange={e => setAddress({ ...address, area: e.target.value })} />
                      <select style={{ ...inputStyle, cursor: 'pointer' }} value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}>
                        <option>Ishwardi</option><option>Pabna</option><option>Rajshahi</option><option>Dhaka</option>
                      </select>
                    </div>
                  </div>
                  <FButton variant="primary" size="lg" fullWidth onClick={() => setStep(1)}
                    style={{ marginTop: 24 }}>Continue to Delivery</FButton>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 20 }}>Delivery Slot</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {slots.map(s => (
                      <button key={s.id} onClick={() => setDeliverySlot(s.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px',
                        borderRadius: 'var(--f-radius-md)', cursor: 'pointer',
                        background: deliverySlot === s.id ? 'var(--f-aqua-light)' : 'var(--f-bg)',
                        border: `2px solid ${deliverySlot === s.id ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                        transition: 'all 0.2s ease', textAlign: 'left',
                      }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%',
                          border: `2px solid ${deliverySlot === s.id ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {deliverySlot === s.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--f-aqua)' }} />}
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>{s.label}</div>
                          <div style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>{s.time}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <FButton variant="secondary" size="md" onClick={() => setStep(0)}>Back</FButton>
                    <FButton variant="primary" size="lg" onClick={() => setStep(2)} style={{ flex: 1 }}>Continue to Payment</FButton>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 20 }}>Payment Method</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {payments.map(p => (
                      <button key={p.id} onClick={() => setPayment(p.id)} style={{
                        padding: '20px 16px', borderRadius: 'var(--f-radius-md)', cursor: 'pointer',
                        background: payment === p.id ? 'var(--f-aqua-light)' : 'var(--f-bg)',
                        border: `2px solid ${payment === p.id ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                        textAlign: 'center', transition: 'all 0.2s ease',
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, margin: '0 auto 8px',
                          background: p.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: 14, height: 14, borderRadius: 4, background: p.color }} />
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)' }}>{p.label}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginTop: 20,
                    padding: '12px 16px', borderRadius: 'var(--f-radius-md)',
                    background: 'rgba(46,204,113,0.06)', border: '1px solid rgba(46,204,113,0.15)',
                  }}>
                    <FIcon name="shield" size={18} color="#27ae60" />
                    <span style={{ fontSize: 13, color: '#27ae60', fontWeight: 500 }}>Your payment is secure and encrypted</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <FButton variant="secondary" size="md" onClick={() => setStep(1)}>Back</FButton>
                    <FButton variant="primary" size="lg" onClick={() => { setOrderPlaced(true); clearCart() }} style={{ flex: 1 }}>
                      Place Order · {fmt(subtotal)}
                    </FButton>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Right: Order Summary */}
          <Reveal delay={200}>
            <div style={{
              background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
              padding: 24, border: '1px solid var(--f-border)', position: 'sticky', top: 100,
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)', marginBottom: 16 }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cart.map(({ product, qty }) => (
                  <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>{product.name}</span>
                      <span style={{ fontSize: 13, color: 'var(--f-text-muted)', marginLeft: 6 }}>×{qty}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>
                      {fmt(product.price * qty)}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--f-border)', marginTop: 16, paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>Subtotal</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>Delivery</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-aqua)' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--f-border)', marginTop: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--f-text)' }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--f-text)' }}>{fmt(subtotal)}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
