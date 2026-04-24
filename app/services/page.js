'use client'
import { useState } from 'react'

const ACCENT = '#0D7C66'

const TABS = [
  { id: 'wholesale',   label: 'Wholesale',         labelBn: 'পাইকারি',              icon: '🏪' },
  { id: 'wedding',     label: 'Wedding & Events',   labelBn: 'বিয়ে ও অনুষ্ঠান',    icon: '💒' },
  { id: 'processing',  label: 'Clean & Cut',        labelBn: 'পরিষ্কার ও কাটা',     icon: '🔪' },
  { id: 'preorder',    label: 'Pre-Order',          labelBn: 'প্রি-অর্ডার',          icon: '📋' },
]

const SERVICE_DETAILS = {
  wholesale: {
    title: 'Wholesale Orders', titleBn: 'পাইকারি অর্ডার',
    desc: 'We offer competitive wholesale pricing for restaurants, hotels, catering services, and retail shops. Get the freshest halal fish, meat, and eggs at bulk rates with reliable delivery.',
    descBn: 'রেস্তোরাঁ, হোটেল, ক্যাটারিং সার্ভিস এবং খুচরা দোকানের জন্য প্রতিযোগিতামূলক পাইকারি মূল্য।',
    features: ['Bulk pricing (10kg+)', 'Weekly/monthly supply contracts', 'Dedicated account manager', 'Priority delivery scheduling', 'Custom packaging available'],
  },
  wedding: {
    title: 'Wedding & Event Catering Supply', titleBn: 'বিয়ে ও অনুষ্ঠানের সরবরাহ',
    desc: 'Planning a wedding, walima, or large gathering? We supply fresh fish and meat in large quantities, cleaned and cut to your specifications.',
    descBn: 'বিয়ে, ওয়ালিমা বা বড় অনুষ্ঠানের পরিকল্পনা করছেন? আমরা বড় পরিমাণে তাজা মাছ ও মাংস সরবরাহ করি।',
    features: ['Large quantity supply (50kg+)', 'Cleaned, cut & ready to cook', 'On-time guaranteed delivery', 'Menu planning consultation', 'Custom order for any event size'],
  },
  processing: {
    title: 'Expert Fish & Meat Processing', titleBn: 'দক্ষ মাছ ও মাংস প্রক্রিয়াজাতকরণ',
    desc: 'Our skilled team provides professional fish and meat processing services. We clean, scale, debone, fillet, and cut to your exact requirements.',
    descBn: 'আমাদের দক্ষ দল পেশাদার মাছ ও মাংস প্রক্রিয়াজাতকরণ সেবা প্রদান করে।',
    features: ['Fish scaling & cleaning', 'Deboning & filleting', 'Meat cutting to specification', 'Marination on request', 'Vacuum packaging available'],
  },
  preorder: {
    title: 'Pre-Order for Any Event', titleBn: 'যেকোনো অনুষ্ঠানের জন্য প্রি-অর্ডার',
    desc: 'Need a specific type or quantity of fish or meat for an upcoming event? Place a pre-order and we guarantee freshness, quality, and on-time delivery.',
    descBn: 'আসন্ন অনুষ্ঠানের জন্য নির্দিষ্ট ধরণ বা পরিমাণের মাছ বা মাংস দরকার? প্রি-অর্ডার করুন।',
    features: ['Advance booking (24-72hrs)', 'Guaranteed freshness', 'Custom quantity & cuts', 'Scheduled delivery', 'Special items on request'],
  },
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('wholesale')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', service: 'wholesale', date: '', details: '' })
  const active = SERVICE_DETAILS[activeTab]

  if (submitted) return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Request Submitted!</h2>
      <p style={{ color: '#666', marginBottom: 8, fontSize: 16 }}>আপনার অনুরোধ সফলভাবে জমা হয়েছে।</p>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Our team will contact you within 2 hours on WhatsApp/phone.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setSubmitted(false)} style={{ background: ACCENT, color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600 }}>
          Submit Another Request
        </button>
        <a href="https://wa.me/8801357187246" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          💬 WhatsApp Us Now
        </a>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>Our Services</h1>
      <p style={{ color: '#888', fontSize: 15, marginBottom: 28 }}>আমাদের সেবাসমূহ — পাইকারি, অনুষ্ঠান, প্রক্রিয়াজাতকরণ, প্রি-অর্ডার</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: activeTab === t.id ? ACCENT : '#f0f0f0',
            color: activeTab === t.id ? '#fff' : '#555',
            border: 'none', borderRadius: 10, padding: '10px 20px',
            fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all .2s',
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
        {/* Details */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{active.title}</h2>
          <p style={{ fontSize: 14, color: ACCENT, fontWeight: 600, marginBottom: 16 }}>{active.titleBn}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#444', marginBottom: 10 }}>{active.desc}</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#777', marginBottom: 24 }}>{active.descBn}</p>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1a1a1a' }}>{"What's Included"}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {active.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#444' }}>
                <span style={{ color: ACCENT, fontWeight: 700, fontSize: 18 }}>✓</span> {f}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, background: ACCENT + '08', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 28 }}>📞</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>Quick Order via WhatsApp</div>
              <div style={{ fontSize: 14, color: '#666' }}>Call or message us at <strong>01357-187246</strong> for instant quotes</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: 24, position: 'sticky', top: 80 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Request a Quote</h3>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>কোটেশনের জন্য অনুরোধ করুন</p>

          {[['name', 'Name / নাম', 'text', 'আপনার নাম'], ['phone', 'Phone / ফোন', 'tel', '01XXX-XXXXXX']].map(([key, label, type, ph]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>{label}</label>
              <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14 }} />
            </div>
          ))}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Service Type</label>
            <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, background: '#fff' }}>
              {TABS.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Event Date (if applicable)</label>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14 }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Details / বিস্তারিত</label>
            <textarea rows={4} placeholder="Describe what you need — items, quantity, cuts, event size..." value={form.details}
              onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, resize: 'vertical' }} />
          </div>

          <button onClick={() => setSubmitted(true)} style={{
            width: '100%', background: ACCENT, color: '#fff', border: 'none',
            borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 600,
          }}>Submit Request</button>

          <a href="https://wa.me/8801357187246" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', background: '#25D366', color: '#fff',
            borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', marginTop: 10,
          }}>💬 Or Order via WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
