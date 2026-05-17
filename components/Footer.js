'use client'
import Link from 'next/link'
import { FishoraLogo, NakshiPattern } from './ui'
import { LOCATION, PHONE, WHATSAPP, HOURS } from '@/data/products'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--f-bg-dark)', color: '#fff', padding: '80px 0 40px',
      position: 'relative', overflow: 'hidden',
    }}>
      <NakshiPattern color="#2E7D32" size={400} opacity={0.015} style={{ top: -80, right: -100, transform: 'rotate(20deg)' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <FishoraLogo light size="lg" />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 16, lineHeight: 1.7, maxWidth: 260 }}>
              Fresh halal fish, meat & eggs delivered to your door. Quality you can trust.
            </p>
            <p style={{ fontFamily: 'var(--f-font-bn)', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
              তাজা হালাল মাছ, মাংস ও ডিম — আপনার দোরগোড়ায়।
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Shop</h4>
            {['Fresh Fish', 'Halal Meat', 'Eggs', 'Prawns', 'Combo Deals'].map(l => (
              <Link key={l} href="/shop" style={{
                display: 'block', color: 'rgba(255,255,255,0.6)',
                fontSize: 14, padding: '6px 0', transition: 'color 0.2s', textDecoration: 'none',
              }}>{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Company</h4>
            {[['About Us', '/about'], ['Contact', '/contact'], ['Services', '/services']].map(([l, p]) => (
              <Link key={l} href={p} style={{
                display: 'block', color: 'rgba(255,255,255,0.6)',
                fontSize: 14, padding: '6px 0', transition: 'color 0.2s', textDecoration: 'none',
              }}>{l}</Link>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Contact</h4>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 2.2 }}>
              <div>📍 {LOCATION}</div>
              <div>📞 {PHONE}</div>
              <div>💬 <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{ color: '#66BB6A', textDecoration: 'none' }}>WhatsApp: {PHONE}</a></div>
              <div>🕐 {HOURS}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
              {['bKash', 'Nagad', 'COD', 'Bank'].map(m => (
                <span key={m} style={{
                  padding: '5px 12px', borderRadius: 'var(--f-radius-full)',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: 12, color: 'rgba(255,255,255,0.5)',
                }}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            © 2026 Fishora — Fresh Inside. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Privacy', 'Terms', 'Support'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
