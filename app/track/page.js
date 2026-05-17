'use client'
import { useState } from 'react'
import FIcon from '@/components/FIcon'
import { Reveal, FButton } from '@/components/ui'

export default function TrackPage() {
  const [orderId, setOrderId] = useState('')

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 500, textAlign: 'center', paddingBottom: 80 }}>
        <Reveal>
          <FIcon name="truck" size={48} color="var(--f-aqua)" />
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--f-text)', marginTop: 16, marginBottom: 8 }}>Track Your Order</h1>
          <p style={{ fontSize: 15, color: 'var(--f-text-secondary)', marginBottom: 32 }}>Enter your order ID to check delivery status</p>
          <input
            value={orderId} onChange={e => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            style={{
              width: '100%', padding: '16px 20px', borderRadius: 'var(--f-radius-full)',
              border: '1.5px solid var(--f-border)', background: 'var(--f-surface)',
              color: 'var(--f-text)', fontSize: 16, outline: 'none', textAlign: 'center',
              marginBottom: 16,
            }}
          />
          <FButton variant="primary" size="lg" fullWidth>Track Order</FButton>
          <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginTop: 16 }}>
            Can&apos;t find your order? Contact us on WhatsApp for instant support.
          </p>
        </Reveal>
      </div>
    </div>
  )
}
