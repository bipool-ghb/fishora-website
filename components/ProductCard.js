'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge, StarRating } from './ui'

const badgeVariants = {
  Premium: 'premium', Popular: 'popular', Fresh: 'fresh',
  Value: 'value', Organic: 'organic', Halal: 'halal', 'Best Value': 'premium'
}

export default function ProductCard({ product, onAdd }) {
  const router = useRouter()
  const [hov, setHov] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd && onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
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

        {/* Price and Add to Cart */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--f-border)' }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--f-aqua)' }}>৳{product.price}</span>
            <span style={{ fontSize: 12, color: 'var(--f-text-muted)', marginLeft: 4 }}>/{product.unit || 'kg'}</span>
          </div>
          <button
            onClick={handleAdd}
            style={{
              padding: '10px 20px', borderRadius: 'var(--f-radius-full)', border: 'none',
              background: added ? '#2ecc71' : 'var(--f-aqua)',
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: hov ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
