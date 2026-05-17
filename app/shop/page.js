'use client'
import { useState, useMemo } from 'react'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import FIcon from '@/components/FIcon'
import { Reveal } from '@/components/ui'
import { PRODUCTS, CATEGORIES } from '@/data/products'

export default function ShopPage() {
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')

  const filtered = useMemo(() => {
    let items = [...PRODUCTS]
    if (category !== 'all') items = items.filter(p => p.category === category)
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameBn.includes(search)
    )
    if (sort === 'price-low') items.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') items.sort((a, b) => b.price - a.price)
    if (sort === 'rating') items.sort((a, b) => b.rating - a.rating)
    return items
  }, [category, search, sort])

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: 80 }}>
        <Reveal>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 8 }}>
              Fresh Market
            </h1>
            <p style={{ fontSize: 16, color: 'var(--f-text-secondary)' }}>
              <span style={{ fontFamily: 'var(--f-font-bn)' }}>তাজা বাজার</span> · Browse our daily fresh collection
            </p>
          </div>
        </Reveal>

        {/* Search + Sort */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <FIcon name="search" size={18} color="var(--f-text-muted)" />
              </div>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search fish, meat, eggs..."
                style={{
                  width: '100%', padding: '14px 14px 14px 44px',
                  borderRadius: 'var(--f-radius-full)', border: '1.5px solid var(--f-border)',
                  background: 'var(--f-surface)', color: 'var(--f-text)',
                  fontSize: 15, outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--f-aqua)'; e.target.style.boxShadow = '0 0 0 3px var(--f-aqua-light)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--f-border)'; e.target.style.boxShadow = 'none' }}
              />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              padding: '14px 20px', borderRadius: 'var(--f-radius-full)',
              border: '1.5px solid var(--f-border)', background: 'var(--f-surface)',
              color: 'var(--f-text)', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', outline: 'none',
            }}>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </Reveal>

        {/* Category Chips */}
        <Reveal delay={150}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                padding: '10px 22px', borderRadius: 'var(--f-radius-full)',
                background: category === cat.id ? 'var(--f-aqua)' : 'var(--f-surface)',
                color: category === cat.id ? '#fff' : 'var(--f-text-secondary)',
                border: category === cat.id ? 'none' : '1.5px solid var(--f-border)',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: category === cat.id ? '0 4px 14px rgba(46,125,50,0.25)' : 'none',
              }}>
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--f-text-muted)' }}>
            <FIcon name="search" size={48} color="var(--f-border)" />
            <p style={{ marginTop: 16, fontSize: 17, fontWeight: 600 }}>No products found</p>
            <p style={{ fontSize: 14, marginTop: 4 }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24,
          }}>
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} onAdd={() => addToCart(p)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
