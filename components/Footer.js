'use client'
import Link from 'next/link'
import Image from 'next/image'

const ACCENT = '#0D7C66'

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', color: '#ccc', padding: '48px 20px 24px', marginTop: 60 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
        {/* Brand */}
        <div>
          <Image src="/images/Fishora-logo.jpeg" alt="Fishora" width={130} height={50} style={{ borderRadius: 8, objectFit: 'contain', marginBottom: 12 }} />
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#999' }}>
            Fresh Halal fish, meat & eggs delivered to your door. Quality you can trust.
          </p>
          <p style={{ fontSize: 13, color: '#777', marginTop: 8 }}>তাজা হালাল মাছ, মাংস ও ডিম — আপনার দোরগোড়ায়।</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Quick Links</h4>
          {[['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About'], ['/delivery', 'Delivery'], ['/contact', 'Contact']].map(([href, label]) => (
            <div key={href}>
              <Link href={href} style={{ color: '#999', fontSize: 14, lineHeight: 2.2, display: 'block', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = ACCENT}
                onMouseLeave={e => e.target.style.color = '#999'}
              >
                {label}
              </Link>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Contact</h4>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: '#999' }}>
            📍 Bishwas Super Market, College Road,<br />Ishwardi, Pabna<br />
            📞 01357-187246<br />
            💬 WhatsApp: 01357-187246
          </p>
        </div>

        {/* Payment */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Payment Methods</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[['bKash', '#E2136E'], ['Nagad', '#F6921E'], ['COD', '#666'], ['Bank', '#1565C0']].map(([m, c]) => (
              <span key={m} style={{ background: '#2a2a2a', border: `1px solid ${c}30`, padding: '6px 12px', borderRadius: 6, fontSize: 13, color: '#bbb' }}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid #333', textAlign: 'center', fontSize: 13, color: '#666' }}>
        © 2026 Fishora — Fresh Inside. All rights reserved.
      </div>
    </footer>
  )
}
