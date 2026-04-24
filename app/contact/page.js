'use client'
import { useState } from 'react'

const ACCENT = '#0D7C66'

const CONTACT_INFO = [
  { icon: '📍', label: 'Address', labelBn: 'ঠিকানা', value: 'Ishwardi, Pabna-6620, Bangladesh' },
  { icon: '📞', label: 'Phone', labelBn: 'ফোন', value: '01357-187246' },
  { icon: '💬', label: 'WhatsApp', labelBn: 'হোয়াটসঅ্যাপ', value: '01357-187246', href: 'https://wa.me/8801357187246' },
  { icon: '📧', label: 'Email', labelBn: 'ইমেইল', value: 'hello@fishora.com.bd', href: 'mailto:hello@fishora.com.bd' },
  { icon: '🕐', label: 'Hours', labelBn: 'সময়', value: 'Sat–Thu: 8am–9pm, Fri: 2pm–9pm' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })

  if (sent) return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Message Sent!</h2>
      <p style={{ color: '#666', marginBottom: 8, fontSize: 16 }}>আপনার বার্তা সফলভাবে পাঠানো হয়েছে।</p>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>We will get back to you within 24 hours on WhatsApp or email.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }) }}
          style={{ background: ACCENT, color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600 }}>
          Send Another
        </button>
        <a href="https://wa.me/8801357187246" target="_blank" rel="noopener noreferrer"
          style={{ background: '#25D366', color: '#fff', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          💬 WhatsApp Us
        </a>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>Contact Us</h1>
      <p style={{ color: '#888', fontSize: 15, marginBottom: 40 }}>আমাদের সাথে যোগাযোগ করুন — আমরা সর্বদা সাহায্য করতে প্রস্তুত</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 40, alignItems: 'start' }}>
        {/* Contact Info */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 24 }}>Get in Touch</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
            {CONTACT_INFO.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                background: '#fff', borderRadius: 12, border: '1px solid #eee',
                borderLeft: `4px solid ${ACCENT}`,
                padding: '16px 20px',
              }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#555', marginBottom: 2 }}>
                    {c.label} <span style={{ color: ACCENT, fontSize: 12 }}>/ {c.labelBn}</span>
                  </div>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: 15, color: ACCENT, fontWeight: 600, textDecoration: 'none' }}>
                      {c.value}
                    </a>
                  ) : (
                    <div style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600 }}>{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#25D366' + '10', borderRadius: 14, padding: 24, border: '1.5px solid #25D36630' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💬</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a', marginBottom: 6 }}>Fastest Reply via WhatsApp</div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>সবচেয়ে দ্রুত সাড়া পাবেন হোয়াটসঅ্যাপে — সাধারণত ১৫ মিনিটের মধ্যে।</div>
            <a href="https://wa.me/8801357187246" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#25D366', color: '#fff', borderRadius: 10,
              padding: '12px 24px', fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
            }}>💬 Open WhatsApp Chat</a>
          </div>
        </div>

        {/* Message Form */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: 28, position: 'sticky', top: 80 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Send a Message</h3>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>বার্তা পাঠান</p>

          {[
            ['name', 'Name / নাম', 'text', 'আপনার নাম'],
            ['phone', 'Phone / ফোন', 'tel', '01XXX-XXXXXX'],
            ['email', 'Email (optional)', 'email', 'your@email.com'],
            ['subject', 'Subject / বিষয়', 'text', 'কীভাবে সাহায্য করতে পারি?'],
          ].map(([key, label, type, ph]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>{label}</label>
              <input
                type={type}
                placeholder={ph}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14 }}
              />
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Message / বার্তা</label>
            <textarea
              rows={4}
              placeholder="আপনার বার্তা লিখুন..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, resize: 'vertical' }}
            />
          </div>

          <button
            onClick={() => setSent(true)}
            style={{
              width: '100%', background: ACCENT, color: '#fff', border: 'none',
              borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 600,
            }}
          >Send Message</button>
        </div>
      </div>
    </div>
  )
}
