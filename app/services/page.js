'use client'
import FIcon from '@/components/FIcon'
import { Reveal, SectionHeader, FButton } from '@/components/ui'
import { SERVICES, WHATSAPP } from '@/data/products'

export default function ServicesPage() {
  const icons = ['package', 'heart', 'snowflake', 'check']
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: 80 }}>
        <SectionHeader title="Our Services" titleBn="আমাদের সেবাসমূহ"
          subtitle="Complete fresh food solutions for families, restaurants, and events." />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24,
        }}>
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
                padding: '36px 28px', border: '1px solid var(--f-border)',
                height: '100%',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, marginBottom: 20,
                  background: 'var(--f-aqua-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FIcon name={icons[i]} size={26} color="var(--f-aqua)"/>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--f-text)', marginBottom: 4 }}>{s.title}</h3>
                <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 14, color: 'var(--f-aqua)', display: 'block', marginBottom: 12 }}>{s.titleBn}</span>
                <p style={{ fontSize: 15, color: 'var(--f-text-secondary)', lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Reveal>
            <p style={{ fontSize: 16, color: 'var(--f-text-secondary)', marginBottom: 20 }}>
              Need a custom service? Contact us via WhatsApp for a quick response.
            </p>
            <FButton variant="whatsapp" size="lg" href={`https://wa.me/${WHATSAPP}`}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.44 1.27 4.89L2 22l5.11-1.27C8.56 21.54 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>}>
              Chat on WhatsApp
            </FButton>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
