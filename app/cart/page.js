'use client'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { CATEGORIES } from '@/data/products'

const ACCENT = '#0D7C66'

export default function CartPage() {
  const { cart, updateQty, removeItem, subtotal } = useCart()
  const delivery = subtotal > 2000 ? 0 : 100
  const total    = subtotal + delivery

  if (cart.length === 0) return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: '#1a1a1a' }}>Your cart is empty</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>আপনার কার্ট খালি। পণ্য যোগ করুন!</p>
      <Link href="/shop" style={{
        background: ACCENT, color: '#fff', borderRadius: 10,
        padding: '12px 32px', fontSize: 15, fontWeight: 600, display: 'inline-block',
      }}>Continue Shopping</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, color: '#1a1a1a' }}>
        Shopping Cart{' '}
        <span style={{ color: '#888', fontWeight: 400, fontSize: 18 }}>({cart.length} items)</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cart.map(item => {
            const cat = CATEGORIES.find(c => c.id === item.product.cat)
            return (
              <div key={item.product.id} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: 16,
                background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 10,
                  background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, flexShrink: 0,
                }}>{cat?.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>{item.product.name}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>৳{item.product.price}/{item.product.unit}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
                  <button onClick={() => updateQty(item.product.id, item.qty - 1)} style={{ width: 30, height: 30, border: 'none', background: '#f5f5f5' }}>−</button>
                  <span style={{ width: 30, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, item.qty + 1)} style={{ width: 30, height: 30, border: 'none', background: '#f5f5f5' }}>+</button>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: ACCENT, width: 80, textAlign: 'right' }}>
                  ৳{item.product.price * item.qty}
                </div>
                <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', color: '#ccc', fontSize: 20 }}>×</button>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div style={{
          background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: 28,
          position: 'sticky', top: 80,
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#1a1a1a' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 15, color: '#555' }}>
            <span>Subtotal</span><span>৳{subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 15, color: '#555' }}>
            <span>Delivery</span>
            <span>{delivery === 0 ? <span style={{ color: ACCENT }}>FREE</span> : `৳${delivery}`}</span>
          </div>
          {delivery > 0 && (
            <p style={{ fontSize: 12, color: '#999', marginBottom: 10 }}>Free delivery on orders over ৳2,000</p>
          )}
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20, color: '#1a1a1a' }}>
            <span>Total</span><span>৳{total}</span>
          </div>
          <Link href="/checkout" style={{
            display: 'block', width: '100%', background: ACCENT, color: '#fff', border: 'none',
            borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 600,
            textAlign: 'center', marginTop: 20,
          }}>Proceed to Checkout</Link>
          <Link href="/shop" style={{
            display: 'block', width: '100%', background: 'transparent', color: ACCENT,
            borderRadius: 10, padding: '10px', fontSize: 14, fontWeight: 500,
            textAlign: 'center', marginTop: 8,
          }}>← Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
