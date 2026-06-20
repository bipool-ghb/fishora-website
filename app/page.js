'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import FIcon from '@/components/FIcon'
import { Reveal, GlassCard, Badge, SectionHeader, FButton, StarRating, NakshiPattern } from '@/components/ui'
import ComboCard from '@/components/ComboCard'
import { PRODUCTS, COMBOS, SERVICES, TESTIMONIALS, TRUST, CATEGORIES, WHATSAPP, PHONE, LOCATION, HOURS } from '@/data/products'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

const featured = PRODUCTS.filter(p => ['Premium', 'Popular', 'Halal'].includes(p.badge)).slice(0, 6)

export default function HomePage() {
  const { addToCart } = useCart()

  return (
    <div>
      <HeroSection />
      <TrustSection />
      <CategoriesSection />
      <FeaturedSection onAdd={addToCart} />
      <ComboSection onAdd={addToCart} />
      <ServicesSection />
      <WhySection />
      <DeliverySection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  )
}

// ─── HERO ───
function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])
  const anim = (d) => ({
    opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(36px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  })

  return (
    <section style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #071223 0%, #0B1D3A 40%, #0A3D62 100%)',
      display: 'flex', alignItems: 'center',
    }}>
      {/* Bubble particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', borderRadius: '50%',
            width: 8 + i * 4, height: 8 + i * 4,
            background: 'rgba(46,125,50,0.15)',
            left: `${15 + i * 14}%`, bottom: `${10 + i * 8}%`,
            animation: `bubbleUp ${4 + i * 1.5}s ease-in-out ${i * 0.8}s infinite`,
          }} />
        ))}
        <NakshiPattern color="#2E7D32" size={500} opacity={0.025}
          style={{ top: -50, right: -100, transform: 'rotate(15deg)' }} />
      </div>

      <div className="container hero-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60,
        alignItems: 'center', padding: '120px 24px 80px', position: 'relative', zIndex: 1,
      }}>
        <div>
          <div style={anim(200)}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 'var(--f-radius-full)',
              background: 'rgba(46,125,50,0.15)', border: '1px solid rgba(46,125,50,0.25)',
              fontSize: 13, fontWeight: 600, color: '#66BB6A', marginBottom: 16,
            }}>✓ 100% Fresh & Halal</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 800, color: '#fff',
            lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 20, ...anim(350),
          }}>
            Fresh Fish, Meat<br/>& Eggs — <span style={{ color: '#66BB6A' }}>Delivered Daily</span>
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)', color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7, maxWidth: 480, marginBottom: 12, ...anim(500),
            fontFamily: 'var(--f-font-bn)',
          }}>
            তাজা হালাল মাছ, মাংস ও ডিম — সারাদেশে ডেলিভারি।
          </p>
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7, maxWidth: 480, marginBottom: 36, ...anim(520),
          }}>
            Fishora — Fresh Inside. Premium halal protein sourced fresh daily, processed hygienically, delivered with care.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', ...anim(650) }}>
            <FButton variant="primary" size="lg" href="/shop" onClick={null}>
              Shop Now
            </FButton>
            <FButton variant="ghost" size="lg" href={`https://wa.me/${WHATSAPP}`}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.44 1.27 4.89L2 22l5.11-1.27C8.56 21.54 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.07-.4-4.39-1.15l-.31-.18-3.22.84.86-3.14-.2-.32A7.963 7.963 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/></svg>}>
              WhatsApp Order
            </FButton>
          </div>
        </div>

        <div className="hero-image" style={{ position: 'relative', ...anim(600) }}>
          <div style={{
            borderRadius: 'var(--f-radius-xl)', overflow: 'hidden', aspectRatio: '4/5',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          }}>
            <img src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80"
              alt="Fresh seafood" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg, #0A3D62, #2E7D32)'; e.target.style.display = 'none' }}
            />
          </div>
          <GlassCard dark style={{
            position: 'absolute', bottom: -20, left: -40,
            display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px',
            animation: 'floatSlow 4s ease-in-out infinite',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(46,125,50,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FIcon name="shield" size={20} color="#66BB6A"/>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>100% Halal</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Certified fresh</div>
            </div>
          </GlassCard>
          <GlassCard dark style={{
            position: 'absolute', top: 40, right: -30, padding: '14px 18px',
            animation: 'floatSlow 5s ease-in-out 1s infinite',
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Today&apos;s Pick</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>ইলিশ · Ilish</div>
            {/* Price hidden */}
          </GlassCard>
        </div>
      </div>

      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{
        position: 'absolute', bottom: -1, left: 0, width: '100%', height: 60,
      }}>
        <path d="M0,50 C360,80 720,20 1080,50 C1260,65 1380,40 1440,45 L1440,80 L0,80 Z" fill="var(--f-bg)"/>
      </svg>
    </section>
  )
}

// ─── TRUST ───
function TrustSection() {
  return (
    <section style={{ padding: '80px 0 60px' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20,
        }}>
          {TRUST.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                textAlign: 'center', padding: '28px 16px',
                background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
                border: '1px solid var(--f-border)',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, margin: '0 auto 14px',
                  background: 'var(--f-aqua-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FIcon name={t.icon} size={22} color="var(--f-aqua)"/>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)', marginBottom: 4 }}>{t.title}</div>
                <div style={{ fontFamily: 'var(--f-font-bn)', fontSize: 12, color: 'var(--f-text-muted)' }}>{t.titleBn}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CATEGORIES ───
function CategoriesSection() {
  const cats = CATEGORIES.filter(c => c.id !== 'all')
  return (
    <section style={{ padding: '60px 0 80px' }}>
      <div className="container">
        <SectionHeader title="Shop by Category" titleBn="ক্যাটাগরি অনুযায়ী কেনাকাটা করুন"
          subtitle="From the freshest river catch to halal meat — find exactly what your family needs." />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20,
        }}>
          {cats.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <CategoryCard cat={cat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ cat }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href="/shop"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 'var(--f-radius-lg)',
        height: 260, cursor: 'pointer', display: 'block', textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? '0 20px 50px rgba(0,0,0,0.2)' : 'var(--f-card-shadow)',
      }}>
      <div style={{ position: 'absolute', inset: 0, background: cat.gradient }}>
        {cat.image && <img src={cat.image} alt={cat.name} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5,
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          transform: hov ? 'scale(1.1)' : 'scale(1)',
        }} onError={e => e.target.style.display = 'none'} />}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{cat.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{cat.nameBn}</span>
          <span style={{
            fontSize: 12, color: '#fff', background: 'rgba(255,255,255,0.15)',
            padding: '4px 12px', borderRadius: 'var(--f-radius-full)', fontWeight: 600,
          }}>{cat.count} items</span>
        </div>
      </div>
    </Link>
  )
}

// ─── FEATURED ───
function FeaturedSection({ onAdd }) {
  return (
    <section style={{ padding: '80px 0', background: 'var(--f-bg-alt)' }}>
      <div className="container">
        <SectionHeader title="Popular Items" titleBn="জনপ্রিয় পণ্যসমূহ"
          subtitle="Hand-picked selections — fresh, halal, and ready for your family." />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24,
        }}>
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} onAdd={() => onAdd(p)} />
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/shop" style={{ textDecoration: 'none' }}>
            <FButton variant="secondary" size="lg">View All Products →</FButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── COMBOS ───
function ComboSection({ onAdd }) {
  const [apiCombos, setApiCombos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/v1/public/combo-items`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) setApiCombos(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const combosToShow = apiCombos.length > 0 ? apiCombos.slice(0, 4) : COMBOS.slice(0, 4)
  const useApi = apiCombos.length > 0

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <SectionHeader title="Combo Deals" titleBn="কম্বো অফার — একসাথে কিনুন, বেশি সাশ্রয় করুন"
          subtitle="Save more when you buy together — curated packs for every need." />
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--f-text-muted)' }}>
            <div style={{ width: 32, height: 32, border: '3px solid var(--f-border)', borderTopColor: 'var(--f-aqua)', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24,
          }}>
            {useApi ? (
              combosToShow.map((combo, i) => (
                <Reveal key={combo.id} delay={i * 80}>
                  <ComboCard combo={combo} onAdd={onAdd} />
                </Reveal>
              ))
            ) : (
              combosToShow.map((combo, i) => (
                <Reveal key={combo.id} delay={i * 80}>
                  <FallbackComboCard combo={combo} />
                </Reveal>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function FallbackComboCard({ combo }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)', overflow: 'hidden',
      boxShadow: hov ? 'var(--f-card-shadow-hover)' : 'var(--f-card-shadow)',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      transform: hov ? 'translateY(-6px)' : 'none',
      border: '1px solid var(--f-border)',
    }}>
      <div style={{
        position: 'relative', height: 160, overflow: 'hidden',
        background: 'linear-gradient(135deg, #1B5E20, #388E3C)',
      }}>
        <img src={combo.image} alt={combo.name} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5,
          transition: 'transform 0.6s ease', transform: hov ? 'scale(1.07)' : 'scale(1)',
        }} onError={e => e.target.style.display = 'none'} />
      </div>
      <div style={{ padding: '18px 20px' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--f-text)', marginBottom: 2 }}>{combo.name}</h3>
        <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 13, color: 'var(--f-text-muted)' }}>{combo.nameBn}</span>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {combo.items.map((item, j) => (
            <li key={j} style={{ fontSize: 13, color: 'var(--f-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--f-aqua)', fontWeight: 700 }}>{'\u2713'}</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── SERVICES ───
function ServicesSection() {
  const icons = ['package', 'heart', 'snowflake', 'check']
  return (
    <section style={{ padding: '80px 0', background: 'var(--f-bg-alt)' }}>
      <div className="container">
        <SectionHeader title="Our Services" titleBn="আমাদের সেবাসমূহ"
          subtitle="Beyond just selling — we provide complete fresh food solutions." />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20,
        }}>
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
                padding: '28px 24px', border: '1px solid var(--f-border)',
                transition: 'all 0.3s ease', height: '100%',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, marginBottom: 16,
                  background: 'var(--f-aqua-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FIcon name={icons[i]} size={22} color="var(--f-aqua)"/>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--f-text)', marginBottom: 4 }}>{s.title}</h3>
                <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 13, color: 'var(--f-aqua)', display: 'block', marginBottom: 10 }}>{s.titleBn}</span>
                <p style={{ fontSize: 14, color: 'var(--f-text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WHY FISHORA ───
function WhySection() {
  const features = [
    { title: 'Fresh Sourcing', titleBn: 'তাজা সংগ্রহ',
      desc: 'We source directly from rivers, farms, and the Bay of Bengal — cutting out middlemen to bring you the freshest catch within hours.',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80' },
    { title: '100% Halal Guarantee', titleBn: 'সম্পূর্ণ হালাল নিশ্চয়তা',
      desc: 'Every product is 100% halal certified. Our meat is processed following strict Islamic guidelines with full hygiene standards.',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=700&q=80' },
    { title: 'Expert Processing', titleBn: 'দক্ষ প্রক্রিয়াজাতকরণ',
      desc: 'Our team of experts cleans, scales, cuts, and packs your fish and meat to your specification — ready to cook when it arrives.',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=700&q=80' },
  ]

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <SectionHeader title="Why Fishora?" titleBn="কেন ���িশোরা?"
          subtitle="A smarter, cleaner way to bring fresh halal food to your family." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {features.map((f, i) => (
            <Reveal key={i}>
              <div className="grid-2col" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 60, alignItems: 'center',
                direction: i % 2 === 1 ? 'rtl' : 'ltr',
              }}>
                <div style={{ direction: 'ltr' }}>
                  <span style={{
                    fontFamily: 'var(--f-font-bn)', fontSize: 14, color: 'var(--f-aqua)',
                    display: 'block', marginBottom: 8,
                  }}>{f.titleBn}</span>
                  <h3 style={{
                    fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: 'var(--f-text)',
                    letterSpacing: '-0.03em', marginBottom: 16,
                  }}>{f.title}</h3>
                  <p style={{
                    fontSize: 16, lineHeight: 1.8, color: 'var(--f-text-secondary)', maxWidth: 440,
                  }}>{f.desc}</p>
                </div>
                <div style={{
                  direction: 'ltr', borderRadius: 'var(--f-radius-xl)', overflow: 'hidden',
                  aspectRatio: '4/3', boxShadow: 'var(--f-card-shadow-hover)',
                  background: 'linear-gradient(135deg, var(--f-bg-dark), #0A3D62)',
                }}>
                  <img src={f.image} alt={f.title} loading="lazy" style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                  }} onError={e => e.target.style.display = 'none'} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── DELIVERY ───
function DeliverySection() {
  return (
    <section style={{ padding: '100px 0', background: 'var(--f-bg-dark)', position: 'relative', overflow: 'hidden' }}>
      <NakshiPattern color="#2E7D32" size={400} opacity={0.02} style={{ top: -50, left: -80 }} />
      <div className="container">
        <SectionHeader title="Delivery & Location" titleBn="ডেলিভারি ও লোকেশন"
          subtitle="Visit our store or order for delivery — we serve nationwide." light />
        <Reveal>
          <div className="grid-2col" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'stretch',
          }}>
            {/* Store info */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--f-radius-lg)',
              border: '1px solid rgba(255,255,255,0.06)', padding: '36px 32px',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Our Store</h3>
              {[
                { icon: 'mapPin', label: 'Location', value: LOCATION },
                { icon: 'sunrise', label: 'Hours', value: HOURS },
                { icon: 'truck', label: 'Phone & WhatsApp', value: PHONE },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(46,125,50,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FIcon name={item.icon} size={20} color="#66BB6A"/>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery coverage */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--f-radius-lg)',
              border: '1px solid rgba(255,255,255,0.06)', padding: '36px 32px',
            }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Delivery Coverage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { area: 'Ishwardi & Pabna', areaBn: 'ঈশ্বরদী ও প��বনা', status: 'Same Day' },
                  { area: 'Rajshahi Division', areaBn: 'রাজশাহী বিভাগ', status: 'Next Day' },
                  { area: 'Dhaka', areaBn: 'ঢাকা', status: 'Next Day' },
                  { area: 'Nationwide', areaBn: 'সারাদেশে', status: '2-3 Days' },
                ].map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--f-radius-md)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: '#66BB6A',
                      boxShadow: '0 0 12px rgba(46,125,50,0.5)',
                    }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{c.area}</span>
                      <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>{c.areaBn}</span>
                    </div>
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: '#66BB6A',
                      padding: '4px 12px', borderRadius: 'var(--f-radius-full)',
                      background: 'rgba(46,125,50,0.1)',
                    }}>{c.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 'var(--f-radius-md)', background: 'rgba(46,125,50,0.08)', border: '1px solid rgba(46,125,50,0.15)' }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  <strong style={{ color: '#66BB6A' }}>Bulk Supply</strong> available for restaurants, hotels & shops. Contact us for wholesale pricing.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ───
function TestimonialsSection() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--f-bg-alt)' }}>
      <div className="container">
        <SectionHeader title="Trusted by Families" titleBn="পরিবারের বিশ্বাস"
          subtitle="Real stories from real families who trust Fishora." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <div style={{
                background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
                padding: '32px 28px', border: '1px solid var(--f-border)',
                height: '100%', display: 'flex', flexDirection: 'column',
              }}>
                <StarRating rating={t.rating} size={14} />
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--f-text-secondary)', margin: '20px 0', flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 16, borderTop: '1px solid var(--f-border)' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--f-aqua), #1565C0)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 14, fontWeight: 700,
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ───
function FinalCTASection() {
  return (
    <section style={{
      padding: '120px 0', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #071223 0%, #0B1D3A 50%, #0A3D62 100%)',
    }}>
      <NakshiPattern color="#F9A825" size={500} opacity={0.02} style={{ bottom: -100, right: -100, transform: 'rotate(-10deg)' }} />
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 18, color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 16 }}>
            আজই অর্ডার করুন — তাজা হালাল প্রোটিন আপনার দোরগোড়ায়
          </span>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 800, color: '#fff',
            letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.1,
          }}>
            Order Fresh Halal<br/>Protein Today
          </h2>
          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7,
          }}>
            Join families across Bangladesh who trust Fishora for their daily fresh food needs.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <FButton variant="primary" size="lg">Order Now</FButton>
            </Link>
            <FButton variant="ghost" size="lg" href={`https://wa.me/${WHATSAPP}`}
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.44 1.27 4.89L2 22l5.11-1.27C8.56 21.54 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.07-.4-4.39-1.15l-.31-.18-3.22.84.86-3.14-.2-.32A7.963 7.963 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/></svg>}>
              WhatsApp Order
            </FButton>
          </div>
          <p style={{ marginTop: 24, fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>
            Call or WhatsApp: <strong style={{ color: '#66BB6A' }}>{PHONE}</strong>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
