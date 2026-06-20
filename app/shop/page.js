'use client'
import { useState, useMemo, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import ComboCard from '@/components/ComboCard'
import FIcon from '@/components/FIcon'
import { Reveal, SectionHeader } from '@/components/ui'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

export default function ShopPage() {
  const { addToCart, appliedOffer, applyOffer } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')
  const [apiProducts, setApiProducts] = useState([])
  const [apiCategories, setApiCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [offers, setOffers] = useState([])
  const [combos, setCombos] = useState([])

  // Fetch categories from POS API
  useEffect(() => {
    fetch(`${API_URL}/api/v1/public/categories`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setApiCategories(data.data)
        }
      })
      .catch(() => {})
  }, [])

  // Fetch active offers
  useEffect(() => {
    fetch(`${API_URL}/api/v1/public/offers`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setOffers(data.data)
        }
      })
      .catch(() => {})
  }, [])

  // Fetch combo items
  useEffect(() => {
    fetch(`${API_URL}/api/v1/public/combo-items`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setCombos(data.data)
        }
      })
      .catch(() => {})
  }, [])

  // Build category filter chips from API data
  const categoryChips = useMemo(() => {
    const roots = apiCategories.filter(c => !c.parent_id && c.status === 'ACTIVE')
    const chips = [{ id: 'all', name: 'All Products' }]
    roots.forEach(root => {
      chips.push({ id: root.id, name: root.name, isParent: true })
      const children = apiCategories.filter(c => c.parent_id === root.id && c.status === 'ACTIVE')
      children.forEach(child => {
        chips.push({ id: child.id, name: child.name, parentId: root.id })
      })
    })
    return chips
  }, [apiCategories])

  // Build category ID → name map and product category_id → chip id mapping
  const categoryMap = useMemo(() => {
    const map = {}
    apiCategories.forEach(c => { map[c.id] = c })
    return map
  }, [apiCategories])

  // Fetch products from POS API
  useEffect(() => {
    fetch(`${API_URL}/api/v1/public/products`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          // Map API products to the format ProductCard expects
          const mapped = data.data.flatMap(product => {
            if (!product.variants || product.variants.length === 0) {
              return [{
                id: product.id,
                name: product.display_name || product.name,
                nameBn: product.short_description || '',
                category_id: product.category_id,
                category: mapCategory(product.name),
                price: 0,
                weight: '1 kg',
                image: product.image_url || getDefaultImage(product.name),
                badge: 'Fresh',
                freshness: "Today's Stock",
                rating: 4.5,
                source: 'Fishora Store',
                description: product.short_description || '',
              }]
            }
            return product.variants.map(v => ({
              id: v.id,
              productId: product.id,
              productSlug: product.slug,
              name: product.display_name || product.name,
              nameBn: product.short_description || '',
              category_id: product.category_id,
              category: mapCategory(product.name),
              price: v.price || 0,
              weight: v.size_label || '',
              image: product.image_url || getDefaultImage(product.name),
              badge: v.price > 0 ? 'Priced' : 'New',
              freshness: "Today's Stock",
              rating: 4.5,
              source: 'Fishora Store',
              description: product.short_description || '',
              unit: v.unit || 'kg',
              sku: v.sku,
            }))
          }).filter(p => p.price > 0) // Only show items with prices
          setApiProducts(mapped)
        }
      })
      .catch(err => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let items = [...apiProducts]
    if (category !== 'all') {
      // Match by exact category_id, or by parent (if selected chip is a parent, include all its children)
      const selectedCat = categoryMap[category]
      if (selectedCat) {
        const childIds = apiCategories.filter(c => c.parent_id === category).map(c => c.id)
        const matchIds = [category, ...childIds]
        items = items.filter(p => matchIds.includes(p.category_id))
      }
    }
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    if (sort === 'price-low') items.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') items.sort((a, b) => b.price - a.price)
    if (sort === 'rating') items.sort((a, b) => b.rating - a.rating)
    return items
  }, [apiProducts, category, search, sort])

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

        {/* Active Offers */}
        {offers.length > 0 && (
          <Reveal delay={80}>
            <div style={{
              display: 'flex', gap: 10, marginBottom: 24, overflowX: 'auto',
              paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none',
            }}>
              {offers.map((offer, i) => {
                const isActive = appliedOffer?.code === offer.code
                return (
                  <button key={offer.id || i} onClick={() => offer.code && applyOffer(offer)} style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 18px', borderRadius: 'var(--f-radius-full)',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(46,125,50,0.18), rgba(0,150,136,0.18))'
                      : 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(0,150,136,0.08))',
                    border: isActive ? '2px solid var(--f-aqua)' : '1.5px solid rgba(46,125,50,0.18)',
                    cursor: offer.code ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                  }}>
                    <span style={{ fontSize: 16 }}>{isActive ? '✅' : '🏷️'}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? 'var(--f-aqua)' : 'var(--f-text)' }}>
                        {offer.name}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--f-aqua)', fontWeight: 600 }}>
                        {offer.discount_type === 'PERCENTAGE' ? `${offer.discount_value}% off` : `৳${offer.discount_value} off`}
                      </span>
                    </div>
                    {offer.code && (
                      <span style={{
                        padding: '4px 10px', borderRadius: 'var(--f-radius-md)',
                        background: isActive ? 'var(--f-aqua)' : 'var(--f-surface)',
                        border: isActive ? 'none' : '1px dashed var(--f-aqua)',
                        fontSize: 12, fontWeight: 700,
                        color: isActive ? '#fff' : 'var(--f-aqua)',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                      }}>
                        {isActive ? '✓ Applied' : offer.code}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </Reveal>
        )}

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

        {/* Category Chips — from API */}
        <Reveal delay={150}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap', alignItems: 'center' }}>
            {categoryChips.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                padding: cat.isParent ? '10px 22px' : '8px 18px',
                borderRadius: 'var(--f-radius-full)',
                background: category === cat.id ? 'var(--f-aqua)' : 'var(--f-surface)',
                color: category === cat.id ? '#fff' : 'var(--f-text-secondary)',
                border: category === cat.id ? 'none' : '1.5px solid var(--f-border)',
                fontSize: cat.isParent ? 14 : 13,
                fontWeight: cat.isParent ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: category === cat.id ? '0 4px 14px rgba(46,125,50,0.25)' : 'none',
                marginLeft: cat.parentId ? 0 : undefined,
              }}>
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Combo Deals */}
        {combos.length > 0 && (
          <Reveal delay={180}>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--f-text)', marginBottom: 6 }}>Combo Deals</h2>
              <p style={{ fontSize: 14, color: 'var(--f-text-muted)', marginBottom: 20 }}>Save more when you buy together</p>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24,
              }}>
                {combos.map((combo, i) => (
                  <ComboCard key={combo.id} combo={combo} onAdd={(item) => addToCart(item)} />
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--f-text-muted)' }}>
            <div style={{ width: 40, height: 40, border: '3px solid var(--f-border)', borderTopColor: 'var(--f-aqua)', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ marginTop: 16, fontSize: 15, fontWeight: 500 }}>Loading fresh products...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filtered.length === 0 ? (
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
              <Reveal key={p.id} delay={i * 60} style={{ height: '100%' }}>
                <ProductCard product={p} onAdd={() => addToCart(p)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Map product name to category
function mapCategory(name) {
  const n = name.toLowerCase()
  if (n.includes('fish') || n.includes('rui') || n.includes('katla') || n.includes('tilapia') || n.includes('carp') || n.includes('ilish')) return 'fish'
  if (n.includes('chicken') || n.includes('beef') || n.includes('meat') || n.includes('mutton')) return 'meat'
  if (n.includes('egg')) return 'eggs'
  if (n.includes('prawn') || n.includes('shrimp')) return 'prawns'
  return 'fish'
}

// Default images by category
function getDefaultImage(name) {
  const cat = mapCategory(name)
  const images = {
    fish: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80',
    meat: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    prawns: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
  }
  return images[cat] || images.fish
}
