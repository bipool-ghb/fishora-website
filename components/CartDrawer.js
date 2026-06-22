'use client'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import FIcon from './FIcon'
import { FButton } from './ui'
import { WHATSAPP } from '@/data/products'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, removeItem, subtotal, STEP, MIN_QTY, appliedOffer, clearOffer, getItemId, isPieceUnit, getStep } = useCart()
  const { token } = useCustomerAuth()
  const router = useRouter()
  const [discount, setDiscount] = useState(0)

  // Validate coupon when cart or offer changes
  useEffect(() => {
    if (!appliedOffer?.code || !token || cart.length === 0) { setDiscount(0); return }
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/customer/orders/validate-coupon`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            code: appliedOffer.code,
            items: cart.filter(i => i.type !== 'combo').map(({ product, qty }) => ({ variant_id: product.id, quantity: qty, unit_price: product.price })),
          }),
        })
        const json = await res.json()
        const result = json.data || json
        if (!cancelled && result.valid) setDiscount(Number(result.discount_amount) || 0)
      } catch {}
    })()
    return () => { cancelled = true }
  }, [appliedOffer, cart, token])

  const whatsAppOrder = () => {
    const lines = cart.map(i => {
      if (i.type === 'combo') return `• [COMBO] ${i.comboName} × ${i.qty} = ৳${(i.comboPrice * i.qty).toLocaleString()}`
      return `• ${i.product.name} (${i.product.weight}) × ${i.qty} = ৳${(i.product.price * i.qty).toLocaleString()}`
    })
    const msg = `🛒 *Fishora Order*\n\n${lines.join('\n')}\n\n*Total: ৳${subtotal.toLocaleString()}*\n\nPlease confirm my order. Thank you!`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)', zIndex: 9998,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }} />
      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 440,
        background: 'var(--f-bg)', zIndex: 9999,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: open ? '-10px 0 40px rgba(0,0,0,0.15)' : 'none',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', borderBottom: '1px solid var(--f-border)',
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--f-text)' }}>
            Your Cart
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--f-text-muted)', marginLeft: 8 }}>
              ({cart.length} items)
            </span>
          </h2>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: '50%', border: 'none',
            background: 'var(--f-bg-alt)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FIcon name="x" size={18} color="var(--f-text)" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--f-text-muted)' }}>
              <FIcon name="cart" size={48} color="var(--f-border)" />
              <p style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: 'var(--f-text-secondary)' }}>Your cart is empty</p>
              <p style={{ fontSize: 14, marginTop: 4 }}>Add fresh items to get started</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map((item) => {
                if (item.type === 'combo') {
                  const itemId = `combo-${item.comboId}`
                  return (
                    <div key={itemId} style={{
                      display: 'flex', gap: 14, padding: 14, borderRadius: 'var(--f-radius-md)',
                      background: 'var(--f-surface)', border: '1px solid var(--f-border)',
                    }}>
                      <div style={{
                        width: 72, height: 72, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                        background: 'linear-gradient(135deg, #1a472a, #2d5a3f)',
                      }}>
                        {item.comboImage && (
                          <img src={item.comboImage} alt={item.comboName} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => e.target.style.display = 'none'} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>{item.comboName}</div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,150,136,0.8)', borderRadius: 4, padding: '1px 6px' }}>COMBO</span>
                          </div>
                          <button onClick={() => removeItem(itemId)} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                          }}>
                            <FIcon name="trash" size={16} color="var(--f-text-muted)" />
                          </button>
                        </div>
                        {/* Component list */}
                        <div style={{ fontSize: 11, color: 'var(--f-text-muted)', marginTop: 4, lineHeight: 1.5 }}>
                          {(item.components || []).map((c, ci) => (
                            <div key={ci}>{c.name} {c.quantity}{c.unit}</div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, borderRadius: 'var(--f-radius-full)', border: '1px solid var(--f-border)', overflow: 'hidden' }}>
                            <button onClick={() => updateQty(itemId, item.qty - 1)} style={{
                              width: 32, height: 32, background: 'var(--f-bg-alt)', border: 'none', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}><FIcon name="minus" size={14} color="var(--f-text)" /></button>
                            <span style={{ minWidth: 36, textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--f-text)' }}>{item.qty}</span>
                            <button onClick={() => updateQty(itemId, item.qty + 1)} style={{
                              width: 32, height: 32, background: 'var(--f-bg-alt)', border: 'none', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}><FIcon name="plus" size={14} color="var(--f-text)" /></button>
                          </div>
                          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--f-text)' }}>
                            ৳{(item.comboPrice * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                // Regular product item
                const { product, qty } = item
                return (
                  <div key={product.id} style={{
                    display: 'flex', gap: 14, padding: 14, borderRadius: 'var(--f-radius-md)',
                    background: 'var(--f-surface)', border: '1px solid var(--f-border)',
                  }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--f-bg-dark), var(--f-ocean-mid))',
                    }}>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => e.target.style.display = 'none'} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>{product.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--f-text-muted)' }}>{product.weight}</div>
                        </div>
                        <button onClick={() => removeItem(product.id)} style={{
                          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                        }}>
                          <FIcon name="trash" size={16} color="var(--f-text-muted)" />
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, borderRadius: 'var(--f-radius-full)', border: '1px solid var(--f-border)', overflow: 'hidden' }}>
                          <button onClick={() => { const s = getStep(product.unit); updateQty(product.id, Math.round((qty - s) / s) * s); }} style={{
                            width: 32, height: 32, background: 'var(--f-bg-alt)', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}><FIcon name="minus" size={14} color="var(--f-text)" /></button>
                          <span style={{ minWidth: 44, textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--f-text)' }}>{qty} {isPieceUnit(product.unit) ? 'pc' : 'kg'}</span>
                          <button onClick={() => { const s = getStep(product.unit); updateQty(product.id, Math.round((qty + s) / s) * s); }} style={{
                            width: 32, height: 32, background: 'var(--f-bg-alt)', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}><FIcon name="plus" size={14} color="var(--f-text)" /></button>
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--f-text)' }}>
                          ৳{(product.price * qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--f-border)', background: 'var(--f-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>Subtotal</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>৳{subtotal.toLocaleString()}</span>
            </div>
            {appliedOffer && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: '#27ae60', fontSize: 12 }}>✓</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#27ae60' }}>{appliedOffer.code}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#27ae60', fontWeight: 600 }}>
                    {discount > 0 ? `-৳${discount.toLocaleString()}` : 'Validating...'}
                  </span>
                  <button onClick={() => { clearOffer(); setDiscount(0) }} style={{
                    background: 'none', border: 'none', fontSize: 14, color: 'var(--f-text-muted)',
                    cursor: 'pointer', fontWeight: 600, lineHeight: 1,
                  }}>×</button>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid var(--f-border)', marginTop: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--f-text)' }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--f-text)' }}>৳{(subtotal - discount).toLocaleString()}</span>
            </div>
            <FButton variant="primary" size="lg" fullWidth onClick={() => { onClose(); router.push('/checkout') }}>
              Proceed to Checkout
            </FButton>
            <div style={{ marginTop: 10 }}>
              <FButton variant="whatsapp" size="lg" fullWidth onClick={whatsAppOrder}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.44 1.27 4.89L2 22l5.11-1.27C8.56 21.54 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.07-.4-4.39-1.15l-.31-.18-3.22.84.86-3.14-.2-.32A7.963 7.963 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/></svg>}>
                Order via WhatsApp
              </FButton>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
