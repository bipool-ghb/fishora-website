'use client'
import { useCart } from '@/context/CartContext'
import FIcon from './FIcon'
import { FButton } from './ui'
import { WHATSAPP } from '@/data/products'
import { useRouter } from 'next/navigation'

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, removeItem, subtotal } = useCart()
  const router = useRouter()

  const whatsAppOrder = () => {
    const lines = cart.map(i => `• ${i.product.name} (${i.product.weight}) × ${i.qty} = ৳${(i.product.price * i.qty).toLocaleString()}`)
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
              ({cart.reduce((s, i) => s + i.qty, 0)} items)
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
              {cart.map(({ product, qty }) => (
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
                      <div style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--f-radius-full)', border: '1px solid var(--f-border)', overflow: 'hidden' }}>
                        <button onClick={() => updateQty(product.id, qty - 1)} style={{
                          width: 32, height: 32, background: 'var(--f-bg-alt)', border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}><FIcon name="minus" size={14} color="var(--f-text)" /></button>
                        <span style={{ width: 36, textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'var(--f-text)' }}>{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)} style={{
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
              ))}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>Delivery</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-aqua)' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid var(--f-border)', marginTop: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--f-text)' }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--f-text)' }}>৳{subtotal.toLocaleString()}</span>
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
