'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Badge, StarRating } from './ui'
import FIcon from './FIcon'

const badgeVariants = {
  Premium: 'premium', Popular: 'popular', Fresh: 'fresh',
  Value: 'value', Organic: 'organic', Halal: 'halal', 'Best Value': 'premium'
}

export default function ProductCard({ product, onAdd }) {
  const router = useRouter()
  const { cart, updateQty, STEP, MIN_QTY } = useCart()
  const [hov, setHov] = useState(false)

  // Find this product in cart (match by variant id stored as product.id)
  const cartItem = cart.find(i => i.product?.id === product.id)
  const inCart = !!cartItem

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd && onAdd(product)
  }

  const handleDecrease = (e) => {
    e.stopPropagation()
    if (cartItem) updateQty(product.id, Math.round((cartItem.qty - STEP) / STEP) * STEP)
  }

  const handleIncrease = (e) => {
    e.stopPropagation()
    if (cartItem) updateQty(product.id, Math.round((cartItem.qty + STEP) / STEP) * STEP)
  }

  return (
    <div
      onClick={() => router.push(`/shop/product?id=${product.productId || product.id}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)', overflow: 'hidden',
        boxShadow: hov ? 'var(--f-card-shadow-hover)' : 'var(--f-card-shadow)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hov ? 'translateY(-6px)' : 'none',
        border: '1px solid var(--f-border)', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', height: '100%',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative', overflow: 'hidden', height: 210,
        background: 'linear-gradient(135deg, var(--f-bg-dark), var(--f-ocean-mid))',
      }}>
        <img src={product.image} alt={product.name} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          transform: hov ? 'scale(1.07)' : 'scale(1)',
        }} onError={e => { e.target.style.display = 'none' }} />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <Badge text={product.badge} variant={badgeVariants[product.badge] || 'default'} />
        </div>
        {product.freshness && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            borderRadius: 'var(--f-radius-full)', padding: '4px 10px',
            fontSize: 11, color: '#fff', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ecc71' }}></span>
            {product.freshness}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 6 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)', marginBottom: 4, lineHeight: 1.3 }}>{product.name}</h3>
          {product.nameBn && (
            <p style={{ fontSize: 13, color: 'var(--f-text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.nameBn}</p>
          )}
        </div>
        <p style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>{product.weight}</p>

        {/* Price and Add to Cart / Qty Stepper */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--f-border)' }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--f-aqua)' }}>৳{product.price}</span>
            <span style={{ fontSize: 12, color: 'var(--f-text-muted)', marginLeft: 4 }}>/{product.unit || 'kg'}</span>
          </div>
          {inCart ? (
            <div style={{
              display: 'flex', alignItems: 'center', borderRadius: 'var(--f-radius-full)',
              border: '2px solid var(--f-aqua)', overflow: 'hidden',
            }}>
              <button onClick={handleDecrease} style={{
                width: 34, height: 34, background: 'rgba(0,150,136,0.08)', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><FIcon name="minus" size={14} color="var(--f-aqua)" /></button>
              <span style={{
                minWidth: 48, textAlign: 'center', fontSize: 13, fontWeight: 800,
                color: 'var(--f-aqua)', padding: '0 2px',
              }}>{cartItem.qty} kg</span>
              <button onClick={handleIncrease} style={{
                width: 34, height: 34, background: 'rgba(0,150,136,0.08)', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><FIcon name="plus" size={14} color="var(--f-aqua)" /></button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              style={{
                padding: '10px 20px', borderRadius: 'var(--f-radius-full)', border: 'none',
                background: 'var(--f-aqua)',
                color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hov ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
