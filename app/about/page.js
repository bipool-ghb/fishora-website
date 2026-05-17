'use client'
import { Reveal, Badge, FButton } from '@/components/ui'

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 800, paddingBottom: 80 }}>
        <Reveal>
          <Badge text="Our Story" variant="premium" style={{ marginBottom: 16 }} />
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.04em', marginBottom: 16, lineHeight: 1.08 }}>
            From River to<br/>Your <span style={{ color: 'var(--f-aqua)' }}>Table</span>
          </h1>
          <p style={{ fontFamily: 'var(--f-font-bn)', fontSize: 16, color: 'var(--f-text-muted)', marginBottom: 32 }}>
            নদী থেকে আপনার টেবিলে
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div style={{
            borderRadius: 'var(--f-radius-xl)', overflow: 'hidden', marginBottom: 48,
            aspectRatio: '16/7', background: 'linear-gradient(135deg, #0B1D3A, #0A3D62)',
          }}>
            <img src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80"
              alt="Fresh market" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              onError={e => e.target.style.display = 'none'} />
          </div>
        </Reveal>
        {[
          { title: 'Why We Started', text: "Fishora was born from a simple frustration — why is it so hard to get truly fresh fish in Bangladesh's cities? We set out to build a technology-enabled supply chain that brings river-fresh food to urban families within hours, not days." },
          { title: 'Our Mission', text: "To make premium-quality fresh food accessible to every family in Bangladesh. We believe freshness shouldn't be a luxury — it should be the standard." },
          { title: 'Quality Commitment', text: 'Every product passes through our 7-point quality check. From sourcing to delivery, temperature is monitored in real-time. We maintain strict cold chain logistics to ensure your food arrives as fresh as when it left the water.' },
          { title: 'Sustainable Sourcing', text: 'We partner directly with local fishermen and farmers, ensuring fair prices and sustainable practices. Our partnerships support over 500 farming families across Bangladesh.' },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--f-text)', marginBottom: 12, letterSpacing: '-0.02em' }}>{s.title}</h2>
              <p style={{ fontSize: 16, color: 'var(--f-text-secondary)', lineHeight: 1.8 }}>{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
