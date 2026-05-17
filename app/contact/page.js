'use client'
import { useState } from 'react'
import FIcon from '@/components/FIcon'
import { Reveal, FButton } from '@/components/ui'
import { LOCATION, PHONE, WHATSAPP, HOURS } from '@/data/products'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900, paddingBottom: 80 }}>
        <Reveal>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 8 }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: 16, color: 'var(--f-text-secondary)', marginBottom: 40 }}>
            <span style={{ fontFamily: 'var(--f-font-bn)' }}>যোগাযোগ করুন</span> · We&apos;d love to hear from you
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          <Reveal delay={100}>
            <div style={{
              background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
              padding: 32, border: '1px solid var(--f-border)',
            }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <FIcon name="check" size={40} color="var(--f-aqua)" />
                  <p style={{ marginTop: 16, fontSize: 17, fontWeight: 700, color: 'var(--f-text)' }}>Message Sent!</p>
                  <p style={{ fontSize: 14, color: 'var(--f-text-muted)', marginTop: 4 }}>We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: 'var(--f-text)' }}>Send a Message</h3>
                  {['Your Name', 'Email Address', 'Phone Number'].map(ph => (
                    <input key={ph} placeholder={ph} style={{
                      width: '100%', padding: '14px 16px', marginBottom: 12,
                      borderRadius: 'var(--f-radius-md)', border: '1.5px solid var(--f-border)',
                      background: 'var(--f-bg)', color: 'var(--f-text)', fontSize: 15,
                      outline: 'none',
                    }} />
                  ))}
                  <textarea placeholder="Your message..." rows={4} style={{
                    width: '100%', padding: '14px 16px', marginBottom: 16,
                    borderRadius: 'var(--f-radius-md)', border: '1.5px solid var(--f-border)',
                    background: 'var(--f-bg)', color: 'var(--f-text)', fontSize: 15,
                    outline: 'none', resize: 'vertical',
                  }} />
                  <FButton variant="primary" size="lg" fullWidth onClick={() => setSent(true)}>Send Message</FButton>
                </>
              )}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: 'mapPin', title: 'Visit Us', detail: LOCATION },
                { icon: 'truck', title: 'Call / WhatsApp', detail: PHONE },
                { icon: 'sunrise', title: 'Open Hours', detail: HOURS },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 16, padding: '22px 20px',
                  background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
                  border: '1px solid var(--f-border)',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'var(--f-aqua-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <FIcon name={c.icon} size={20} color="var(--f-aqua)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)', marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--f-text-secondary)' }}>{c.detail}</div>
                  </div>
                </div>
              ))}
              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{
                padding: '22px 20px', borderRadius: 'var(--f-radius-lg)',
                background: 'linear-gradient(135deg, #128C7E, #25D366)',
                cursor: 'pointer', textDecoration: 'none', display: 'block',
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Chat on WhatsApp</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Quick responses — {HOURS}</div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
