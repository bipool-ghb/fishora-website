'use client'
import Link from 'next/link'

const ACCENT = '#0D7C66'

const ZONES = [
  { zone: 'Ishwardi & Pabna District', zoneBn: 'ঈশ্বরদী ও পাবনা জেলা', time: 'Same Day', timeBn: 'একই দিন', fee: 'FREE', feeBn: 'বিনামূল্যে', note: 'Orders placed before 12pm', color: ACCENT },
  { zone: 'Dhaka City', zoneBn: 'ঢাকা শহর', time: '1–2 Days', timeBn: '১–২ দিন', fee: '৳100', feeBn: '১০০ টাকা', note: 'Free on orders over ৳2,000', color: '#1565C0' },
  { zone: 'Major Cities (CTG, RJH, KHU)', zoneBn: 'চট্টগ্রাম, রাজশাহী, খুলনা', time: '2–3 Days', timeBn: '২–৩ দিন', fee: '৳150', feeBn: '১৫০ টাকা', note: 'Free on orders over ৳3,000', color: '#6D4C41' },
  { zone: 'Nationwide (All Districts)', zoneBn: 'সারাদেশ (সব জেলা)', time: '3–5 Days', timeBn: '৩–৫ দিন', fee: '৳200', feeBn: '২০০ টাকা', note: 'Contact us for bulk orders', color: '#9C27B0' },
]

const INFOS = [
  {
    icon: '❄️',
    title: 'Cold Chain Delivery',
    titleBn: 'শীতল পরিবহন',
    desc: 'All orders are packed with ice and insulated packaging to maintain freshness throughout transit. Your fish and meat arrives as fresh as the day it was sourced.',
  },
  {
    icon: '🕐',
    title: 'Order Cutoff Times',
    titleBn: 'অর্ডারের সময়সীমা',
    desc: 'Place your order before 12:00 PM for same-day delivery in Ishwardi/Pabna. Orders after 12 PM are dispatched the following morning.',
  },
  {
    icon: '📦',
    title: 'Packaging',
    titleBn: 'প্যাকেজিং',
    desc: 'We use food-grade, leak-proof packaging for all products. Fish and meat are double-packed to prevent cross-contamination. Custom packaging available for events.',
  },
  {
    icon: '📞',
    title: 'Live Order Tracking',
    titleBn: 'লাইভ অর্ডার ট্র্যাকিং',
    desc: 'Once your order is dispatched, we send you a WhatsApp update with estimated delivery time. Call or message us anytime at 01357-187246.',
  },
]

export default function DeliveryPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>Delivery Information</h1>
      <p style={{ color: '#888', fontSize: 15, marginBottom: 40 }}>ডেলিভারি তথ্য — আমরা সারাদেশে তাজা পণ্য পৌঁছে দিই</p>

      {/* Delivery Zones */}
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Delivery Zones & Charges</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
        {ZONES.map((z, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 12, border: '1px solid #eee',
            borderLeft: `4px solid ${z.color}`,
            padding: '20px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a', marginBottom: 2 }}>{z.zone}</div>
              <div style={{ fontSize: 13, color: '#888' }}>{z.zoneBn}</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 100 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>{z.time}</div>
              <div style={{ fontSize: 12, color: '#aaa' }}>{z.timeBn}</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 100 }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: z.color }}>{z.fee}</div>
              <div style={{ fontSize: 12, color: '#aaa' }}>{z.feeBn}</div>
            </div>
            <div style={{ fontSize: 12, color: '#999', minWidth: 160, textAlign: 'right' }}>{z.note}</div>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>How We Deliver</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
        {INFOS.map((info, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, border: '1.5px solid #eee',
            borderLeft: `4px solid ${ACCENT}`,
            padding: 24,
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{info.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{info.title}</div>
            <div style={{ fontSize: 13, color: ACCENT, fontWeight: 600, marginBottom: 12 }}>{info.titleBn}</div>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0 }}>{info.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        background: ACCENT + '08', border: `1.5px solid ${ACCENT}30`,
        borderRadius: 14, padding: '28px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>Need a Custom Delivery?</div>
          <div style={{ fontSize: 14, color: '#666' }}>বিশেষ ডেলিভারির প্রয়োজন? আমাদের সাথে যোগাযোগ করুন।</div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://wa.me/8801357187246" target="_blank" rel="noopener noreferrer" style={{
            background: '#25D366', color: '#fff', borderRadius: 10,
            padding: '12px 24px', fontSize: 14, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>💬 WhatsApp Us</a>
          <Link href="/contact" style={{
            background: ACCENT, color: '#fff', borderRadius: 10,
            padding: '12px 24px', fontSize: 14, fontWeight: 600, display: 'inline-block',
          }}>Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
