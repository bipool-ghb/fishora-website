'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

function ProductDetailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart, STEP, MIN_QTY } = useCart()
  const productId = searchParams.get('id')

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!productId) return
    fetch(`${API_URL}/api/v1/public/products`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          const found = data.data.find(p => p.id === productId)
          if (found) setProduct(found)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) {
    return (
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--f-text-muted)', fontSize: 16 }}>Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Product not found</h2>
        <button onClick={() => router.push('/shop')} style={{
          padding: '10px 24px', borderRadius: 24, border: 'none',
          background: 'var(--f-aqua)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 16,
        }}>Back to Shop</button>
      </div>
    )
  }

  const variant = product.variants?.[selectedVariant]
  const displayName = product.display_name || product.name
  const price = variant?.price || 0

  const handleAdd = () => {
    addToCart({
      id: variant?.id || product.id,
      name: displayName,
      price,
      weight: variant?.size_label || '',
      image: product.image_url || '',
      unit: variant?.unit || 'kg',
    }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleQtyBlur = () => {
    const rounded = Math.round(qty / STEP) * STEP
    setQty(Math.max(rounded, MIN_QTY))
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      {/* Back link */}
      <button onClick={() => router.push('/shop')} style={{
        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--f-aqua)',
        fontSize: 14, fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 18 }}>&larr;</span> Back to Shop
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        {/* Image */}
        <div style={{
          borderRadius: 16, overflow: 'hidden', aspectRatio: '1', background: 'linear-gradient(135deg, #f0f4f8, #e2e8f0)',
        }}>
          {product.image_url ? (
            <img src={product.image_url} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>
              🐟
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', marginBottom: 8, lineHeight: 1.3 }}>
            {displayName}
          </h1>

          {product.short_description && (
            <p style={{ fontSize: 15, color: 'var(--f-text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
              {product.short_description}
            </p>
          )}

          {/* Price */}
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--f-aqua)' }}>৳{price}</span>
            <span style={{ fontSize: 14, color: 'var(--f-text-muted)', marginLeft: 6 }}>/{variant?.unit || 'kg'}</span>
          </div>

          {/* Variant selector */}
          {product.variants && product.variants.length > 1 && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--f-text)', marginBottom: 8 }}>Size</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {product.variants.map((v, i) => (
                  <button key={v.id} onClick={() => setSelectedVariant(i)} style={{
                    padding: '8px 20px', borderRadius: 24,
                    border: selectedVariant === i ? '2px solid var(--f-aqua)' : '1px solid var(--f-border)',
                    background: selectedVariant === i ? 'rgba(0,150,136,0.08)' : 'var(--f-surface)',
                    color: selectedVariant === i ? 'var(--f-aqua)' : 'var(--f-text)',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {v.size_label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector + Add to cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', borderRadius: 28,
              border: '1.5px solid var(--f-border)', overflow: 'hidden',
            }}>
              <button onClick={() => setQty(q => Math.max(Math.round((q - STEP) / STEP) * STEP, MIN_QTY))} style={{
                width: 40, height: 44, background: 'var(--f-bg)', border: 'none',
                cursor: 'pointer', fontSize: 18, fontWeight: 700, color: 'var(--f-text)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>−</button>
              <input
                type="number"
                value={qty}
                step={STEP}
                min={MIN_QTY}
                onChange={e => setQty(parseFloat(e.target.value) || MIN_QTY)}
                onBlur={handleQtyBlur}
                style={{
                  width: 64, height: 44, textAlign: 'center', border: 'none',
                  borderLeft: '1px solid var(--f-border)', borderRight: '1px solid var(--f-border)',
                  fontSize: 15, fontWeight: 700, color: 'var(--f-text)',
                  background: 'var(--f-surface)', outline: 'none',
                }}
              />
              <button onClick={() => setQty(q => Math.round((q + STEP) / STEP) * STEP)} style={{
                width: 40, height: 44, background: 'var(--f-bg)', border: 'none',
                cursor: 'pointer', fontSize: 18, fontWeight: 700, color: 'var(--f-text)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>+</button>
            </div>
            <span style={{ fontSize: 13, color: 'var(--f-text-muted)', fontWeight: 600 }}>kg</span>
            <button onClick={handleAdd} style={{
              padding: '14px 36px', borderRadius: 28, border: 'none',
              background: added ? '#2ecc71' : 'var(--f-aqua)',
              color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.3s', flex: 1, maxWidth: 200,
            }}>
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>

          {/* Long description */}
          {product.long_description && (
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--f-border)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: 'var(--f-text)' }}>Description</h3>
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', lineHeight: 1.7 }}>
                {product.long_description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cooking & Storage */}
      {(product.cooking_suggestion || product.storage_instruction) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
          {product.cooking_suggestion && (
            <div style={{
              background: 'var(--f-surface)', border: '1px solid var(--f-border)',
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>🍳</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)' }}>Cooking Suggestion</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', lineHeight: 1.7 }}>
                {product.cooking_suggestion}
              </p>
            </div>
          )}
          {product.storage_instruction && (
            <div style={{
              background: 'var(--f-surface)', border: '1px solid var(--f-border)',
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>❄️</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)' }}>Storage Instruction</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', lineHeight: 1.7 }}>
                {product.storage_instruction}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>Loading...</div>}>
      <ProductDetailContent />
    </Suspense>
  )
}
