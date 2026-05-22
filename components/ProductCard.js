'use client'
import { useState } from 'react'
import { Badge, StarRating } from './ui'

const badgeVariants = {
  Premium: 'premium', Popular: 'popular', Fresh: 'fresh',
  Value: 'value', Organic: 'organic', Halal: 'halal', 'Best Value': 'premium'
}

export default function ProductCard({ product, onAdd }) {
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
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)', overflow: 'hidden',
        boxShadow: hov ? 'var(--f-card-shadow-hover)' : 'var(--f-card-shadow)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hov ? 'translateY(-6px)' : 'none',
        border: '1px solid var(--f-border)', cursor: 'pointer',
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
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--f-text)', marginBottom: 2 }}>{product.name}</h3>
            <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 13, color: 'var(--f-text-muted)' }}>{product.nameBn}</span>
          </div>
          {product.rating && <StarRating rating={product.rating} size={11} />}
        </div>
        <p style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>{product.weight} · {product.source}</p>
        {/* Price and Add to Cart hidden */}
      </div>
    </div>
  )
}
