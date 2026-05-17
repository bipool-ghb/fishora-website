'use client'
import FIcon from '@/components/FIcon'
import { Reveal, SectionHeader, NakshiPattern } from '@/components/ui'
import { LOCATION, HOURS, PHONE } from '@/data/products'

export default function DeliveryPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: 80 }}>
        <SectionHeader title="Delivery Information" titleBn="ডেলিভারি তথ্য"
          subtitle="We deliver fresh halal protein across Bangladesh with care." />

        <Reveal>
          <div style={{
            background: 'var(--f-bg-dark)', borderRadius: 'var(--f-radius-xl)',
            padding: '48px 40px', position: 'relative', overflow: 'hidden',
          }}>
            <NakshiPattern color="#2E7D32" size={300} opacity={0.03} style={{ top: -50, right: -50 }} />
            <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, position: 'relative' }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 24 }}>Delivery Coverage</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { area: 'Ishwardi & Pabna', status: 'Same Day', areaBn: 'ঈশ্বরদী ও পাবনা' },
                    { area: 'Rajshahi Division', status: 'Next Day', areaBn: 'রাজশাহী বিভাগ' },
                    { area: 'Dhaka', status: 'Next Day', areaBn: 'ঢাকা' },
                    { area: 'Nationwide', status: '2-3 Days', areaBn: 'সারাদেশে' },
                  ].map((c, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                      background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--f-radius-md)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#66BB6A', boxShadow: '0 0 12px rgba(46,125,50,0.5)' }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{c.area}</span>
                        <span style={{ fontFamily: 'var(--f-font-bn)', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>{c.areaBn}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#66BB6A', padding: '4px 12px', borderRadius: 'var(--f-radius-full)', background: 'rgba(46,125,50,0.1)' }}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 24 }}>Store Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { icon: 'mapPin', label: 'Location', value: LOCATION },
                    { icon: 'sunrise', label: 'Hours', value: HOURS },
                    { icon: 'truck', label: 'Phone', value: PHONE },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(46,125,50,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FIcon name={item.icon} size={18} color="#66BB6A" />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
