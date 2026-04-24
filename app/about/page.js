'use client'
import { imgSrc } from '@/lib/imgSrc'

const ACCENT = '#0D7C66'

const STATS = [
  { value: '500+', label: 'Happy Customers', labelBn: 'সন্তুষ্ট গ্রাহক' },
  { value: '50+', label: 'Products Available', labelBn: 'পণ্যের বিস্তার' },
  { value: '5+', label: 'Years Experience', labelBn: 'বছরের অভিজ্ঞতা' },
  { value: '100%', label: 'Halal Certified', labelBn: 'হালাল সার্টিফাইড' },
]

const VALUES = [
  { icon: '🐟', title: 'Freshness First', titleBn: 'তাজা পণ্য সর্বদা', desc: 'We source directly from local fishermen and farms daily to ensure the freshest products reach your table.' },
  { icon: '✅', title: 'Halal Guaranteed', titleBn: 'হালাল নিশ্চিত', desc: 'Every product we sell is 100% halal — from sourcing to processing to delivery, we uphold Islamic standards.' },
  { icon: '🤝', title: 'Community First', titleBn: 'সম্প্রদায়ের জন্য', desc: 'Based in Ishwardi, Pabna, we are proud to serve our local community and support local farmers and fishermen.' },
  { icon: '🚚', title: 'Reliable Delivery', titleBn: 'নির্ভরযোগ্য ডেলিভারি', desc: 'We deliver across Bangladesh with careful cold-chain handling so your order arrives fresh, on time, every time.' },
]

const TEAM = [
  { name: 'Md. Rafiqul Islam', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Fatima Akter', role: 'Operations Manager', emoji: '👩‍💼' },
  { name: 'Karim Hossain', role: 'Head of Processing', emoji: '👨‍🍳' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 320, background: '#000' }}>
        <img
          src={imgSrc('/images/cover-photo.jpeg')}
          alt="Fishora team"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.45 }}
        />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto', padding: '80px 24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 320,
        }}>
          <h1 style={{ color: '#fff', fontSize: 44, fontWeight: 800, lineHeight: 1.2, margin: 0, maxWidth: 600 }}>
            About Fishora
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, marginTop: 14, maxWidth: 520, lineHeight: 1.6 }}>
            আমাদের সম্পর্কে — ঈশ্বরদী থেকে সারাদেশে তাজা হালাল মাছ, মাংস ও ডিম।
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Our Story</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#444', marginBottom: 14 }}>
              Fishora was born in Ishwardi, Pabna — a region renowned for its rich rivers, fertile farmlands, and vibrant fish markets. We started with a simple mission: to bring the freshest, most authentic halal protein directly to Bangladeshi families.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666', marginBottom: 14 }}>
              ফিশোরার যাত্রা শুরু হয়েছিল ঈশ্বরদী, পাবনায় — একটি অঞ্চল যা তার নদী, কৃষি এবং মৎস্য বাজারের জন্য বিখ্যাত। আমরা বিশ্বাস করি যে তাজা, হালাল খাবার প্রতিটি পরিবারের অধিকার।
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666' }}>
              Today, we serve hundreds of families, restaurants, and businesses across Bangladesh — with the same commitment to quality, freshness, and trust that we started with.
            </p>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
            <img
              src={imgSrc('/images/cover-photo-bd.png')}
              alt="Fresh fish market"
              style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: ACCENT, padding: '56px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{s.label}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.labelBn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>Our Values</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 40, fontSize: 15 }}>আমাদের মূল্যবোধ</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, border: '1.5px solid #eee',
              padding: 28, borderTop: `3px solid ${ACCENT}`,
            }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{v.title}</div>
              <div style={{ fontSize: 13, color: ACCENT, fontWeight: 600, marginBottom: 12 }}>{v.titleBn}</div>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background: '#f9fafb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>Meet the Team</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: 40, fontSize: 15 }}>আমাদের দল</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {TEAM.map((m, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>{m.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: ACCENT, fontWeight: 500 }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
