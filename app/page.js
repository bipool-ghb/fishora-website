'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, PRODUCTS } from '@/data/products'

const ACCENT = '#0D7C66'

const SERVICES = [
  { icon: '🏪', title: 'Wholesale Orders',       titleBn: 'পাইকারি অর্ডার',              desc: 'Bulk pricing for restaurants, hotels & retailers. Special rates on large quantity orders.',                         color: '#1565C0' },
  { icon: '💒', title: 'Wedding & Events',        titleBn: 'বিয়ে ও অনুষ্ঠান',            desc: 'Fresh fish & meat supply for weddings, parties and ceremonies. We handle large-scale catering orders.',           color: '#9C27B0' },
  { icon: '🔪', title: 'Clean, Cut & Process',    titleBn: 'পরিষ্কার, কাটা ও প্রক্রিয়াজাত', desc: 'Expert fish & meat processing — cleaned, scaled, cut to your specifications. Ready to cook.',                   color: '#E65100' },
  { icon: '📋', title: 'Pre-Orders',              titleBn: 'প্রি-অর্ডার',                  desc: 'Pre-order for any event or occasion. Guaranteed freshness & timely delivery for your special day.',              color: '#2E7D32' },
]

const TRUST = [
  { icon: '✅', title: '100% Halal',             desc: 'সম্পূর্ণ হালাল পণ্য' },
  { icon: '❄️', title: 'Fresh Daily',            desc: 'প্রতিদিন তাজা সরবরাহ' },
  { icon: '🚚', title: 'Nationwide Delivery',    desc: 'সারাদেশে ডেলিভারি' },
  { icon: '🔪', title: 'Expert Processing',      desc: 'দক্ষ প্রক্রিয়াজাতকরণ' },
]

const featured = PRODUCTS.filter(p => p.badge && p.cat !== 'deals').slice(0, 6)
const combos   = PRODUCTS.filter(p => p.cat === 'deals')

export default function HomePage() {
  const { addToCart } = useCart()

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 480, background: '#000' }}>
        <Image
          src="/images/hero-fish.png"
          alt="Fresh fish on ice"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          priority
        />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto', padding: '80px 24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 480,
        }}>
          <div style={{
            background: ACCENT, color: '#fff', display: 'inline-block',
            padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
            marginBottom: 20, width: 'fit-content',
          }}>🐟 100% Fresh &amp; Halal</div>
          <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 800, lineHeight: 1.15, margin: 0, maxWidth: 600 }}>
            Fresh Fish, Meat &amp; Eggs — Delivered Daily
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, marginTop: 16, maxWidth: 500, lineHeight: 1.6 }}>
            তাজা হালাল মাছ, মাংস ও ডিম — সারাদেশে ডেলিভারি। Fishora — Fresh Inside.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/shop" style={{
              background: ACCENT, color: '#fff', borderRadius: 10,
              padding: '14px 32px', fontSize: 16, fontWeight: 600, display: 'inline-block',
            }}>Shop Now</Link>
            <a href="https://wa.me/8801357187246" target="_blank" rel="noopener noreferrer" style={{
              background: '#25D366', color: '#fff', borderRadius: 10,
              padding: '14px 28px', fontSize: 16, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>💬 WhatsApp Order</a>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Shop by Category</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 36, fontSize: 15 }}>ক্যাটাগরি অনুযায়ী কেনাকাটা করুন</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href="/shop" style={{
              background: '#fff', border: '1.5px solid #eee', borderRadius: 14,
              padding: '28px 16px', textAlign: 'center',
              transition: 'all .2s', display: 'block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{cat.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>{cat.name}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{cat.nameBn}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section style={{ background: '#f9fafb', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Popular Items</h2>
          <p style={{ color: '#888', marginBottom: 32, fontSize: 15 }}>জনপ্রিয় পণ্যসমূহ</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {featured.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/shop" style={{
              background: 'transparent', color: ACCENT, border: `2px solid ${ACCENT}`,
              borderRadius: 10, padding: '12px 36px', fontSize: 15, fontWeight: 600,
              display: 'inline-block', transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ACCENT }}
            >View All Products →</Link>
          </div>
        </div>
      </section>

      {/* ── Combo Deals ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>🎁 Combo Deals</h2>
            <p style={{ color: '#888', fontSize: 15 }}>কম্বো অফার — একসাথে কিনুন, বেশি সাশ্রয় করুন</p>
          </div>
          <Link href="/shop?cat=deals" style={{
            background: 'transparent', color: ACCENT, border: `2px solid ${ACCENT}`,
            borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 600,
            display: 'inline-block',
          }}>View All Deals →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginTop: 28 }}>
          {combos.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Our Services</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 36, fontSize: 15 }}>আমাদের সেবাসমূহ</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {SERVICES.map((s, i) => (
            <Link key={i} href="/services" style={{
              background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 28,
              display: 'block', transition: 'all .2s', borderTop: `3px solid ${s.color}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: s.color, fontWeight: 600, marginBottom: 10 }}>{s.titleBn}</div>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link href="/services" style={{
            background: 'transparent', color: ACCENT, border: `2px solid ${ACCENT}`,
            borderRadius: 10, padding: '12px 36px', fontSize: 15, fontWeight: 600,
            display: 'inline-block', transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ACCENT }}
          >Learn More About Services →</Link>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section style={{ background: '#f9fafb', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {TRUST.map((b, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{b.title}</div>
              <div style={{ fontSize: 14, color: '#888' }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
