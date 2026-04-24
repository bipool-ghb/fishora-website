'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, PRODUCTS } from '@/data/products'

const ACCENT = '#0D7C66'

function ShopContent() {
  const { addToCart } = useCart()
  const searchParams = useSearchParams()
  const [activeCat, setActiveCat] = useState(() => searchParams.get('cat') || 'all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveCat(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    let items = PRODUCTS
    if (activeCat !== 'all') items = items.filter(p => p.cat === activeCat)
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) || p.nameBn.includes(search)
    )
    if (sort === 'price-asc')  items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    return items
  }, [activeCat, search, sort])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>Shop All Products</h1>
      <p style={{ color: '#888', fontSize: 15, marginBottom: 28 }}>সকল পণ্য ব্রাউজ করুন</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search / অনুসন্ধান..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '10px 16px', border: '1.5px solid #e0e0e0', borderRadius: 10,
            fontSize: 14, width: 220, outline: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCat('all')}
            style={{
              background: activeCat === 'all' ? ACCENT : '#f0f0f0',
              color: activeCat === 'all' ? '#fff' : '#555',
              border: 'none', borderRadius: 20, padding: '8px 18px',
              fontSize: 13, fontWeight: 500,
            }}
          >All</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
              background: activeCat === c.id ? ACCENT : '#f0f0f0',
              color: activeCat === c.id ? '#fff' : '#555',
              border: 'none', borderRadius: 20, padding: '8px 18px',
              fontSize: 13, fontWeight: 500,
            }}>{c.icon} {c.name}</button>
          ))}
        </div>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            padding: '8px 14px', border: '1.5px solid #e0e0e0', borderRadius: 10,
            fontSize: 13, marginLeft: 'auto', background: '#fff',
          }}
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>No products found / কোনো পণ্য পাওয়া যায়নি</div>
      )}
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: 60, textAlign: 'center', color: '#999' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}
