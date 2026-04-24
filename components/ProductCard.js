'use client'
import { useState } from 'react'
import { CATEGORIES } from '@/data/products'

const ACCENT = '#0D7C66'
const DEAL_COLOR = '#0D7C66'

export default function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1)
  const [hover, setHover] = useState(false)
  const cat = CATEGORIES.find(c => c.id === product.cat)
  const isDeal = product.cat === 'deals'

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#fff',
        borderRadius: 12,
        border: isDeal ? `1.5px solid ${DEAL_COLOR}30` : '1px solid #f0f0f0',
        boxShadow: hover ? '0 6px 24px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'transform .2s, box-shadow .2s',
      }}
    >
      {/* Image / icon area */}
      <div style={{
        height: isDeal ? 100 : 160,
        background: isDeal ? `linear-gradient(135deg, ${DEAL_COLOR}18, ${DEAL_COLOR}08)` : (cat?.color || '#666') + '10',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: isDeal ? 44 : 48, position: 'relative',
        borderBottom: isDeal ? `1px dashed ${DEAL_COLOR}30` : 'none',
      }}>
        {cat?.icon}
        {product.badge && (
          <span style={{
            position: 'absolute', top: 10, right: 10,
            background: isDeal ? '#FF6B35' : ACCENT,
            color: '#fff', fontSize: 11, fontWeight: 700,
            padding: '3px 10px', borderRadius: 20,
          }}>{product.badge}</span>
        )}
        {isDeal && (
          <span style={{
            position: 'absolute', top: 10, left: 10,
            background: DEAL_COLOR, color: '#fff', fontSize: 10, fontWeight: 700,
            padding: '3px 8px', borderRadius: 20, letterSpacing: 0.5,
          }}>COMBO</span>
        )}
      </div>

      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 12, color: cat?.color || '#666', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {cat?.name}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{product.name}</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: isDeal ? 10 : 0 }}>{product.nameBn}</div>

        {/* Combo items list */}
        {isDeal && product.includes && (
          <ul style={{ margin: '0 0 4px', padding: 0, listStyle: 'none' }}>
            {product.includes.map((item, i) => (
              <li key={i} style={{ fontSize: 12, color: '#555', lineHeight: 1.9, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: DEAL_COLOR, fontWeight: 700, fontSize: 14 }}>✓</span> {item}
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: ACCENT }}>৳{product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: 14, color: '#bbb', textDecoration: 'line-through' }}>৳{product.originalPrice}</span>
            )}
            <span style={{ fontSize: 13, color: '#999' }}>/{product.unit}</span>
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 32, height: 32, border: 'none', background: '#f5f5f5', fontSize: 16 }}>−</button>
              <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 32, height: 32, border: 'none', background: '#f5f5f5', fontSize: 16 }}>+</button>
            </div>
            <button
              onClick={() => { onAdd(product, qty); setQty(1) }}
              style={{ flex: 1, background: ACCENT, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, fontSize: 13, transition: 'opacity .2s' }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
