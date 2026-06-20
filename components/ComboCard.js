'use client'
import { useCart } from '@/context/CartContext'
import FIcon from './FIcon'

export default function ComboCard({ combo, onAdd }) {
  const { cart, updateQty } = useCart()
  const cartItem = cart.find(i => i.type === 'combo' && i.comboId === combo.id)
  const inCart = !!cartItem

  const regularTotal = (combo.components || []).reduce((s, c) => s + (Number(c.unit_price) || 0) * Number(c.quantity), 0)
  const savings = regularTotal > 0 ? regularTotal - Number(combo.combo_price) : 0

  const handleAdd = (e) => {
    e?.stopPropagation?.()
    onAdd && onAdd({
      type: 'combo',
      comboId: combo.id,
      comboName: combo.display_name || combo.name,
      comboPrice: Number(combo.combo_price),
      comboImage: combo.image_url,
      components: (combo.components || []).map(c => ({
        variantId: c.variant_id,
        name: c.product_name || c.variant_name,
        quantity: c.quantity,
        unit: c.unit,
      })),
    })
  }

  const handleDecrease = (e) => {
    e?.stopPropagation?.()
    if (cartItem) updateQty(`combo-${combo.id}`, cartItem.qty - 1)
  }
  const handleIncrease = (e) => {
    e?.stopPropagation?.()
    if (cartItem) updateQty(`combo-${combo.id}`, cartItem.qty + 1)
  }

  return (
    <div style={{
      background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)', overflow: 'hidden',
      border: '1px solid var(--f-border)', display: 'flex', flexDirection: 'column', height: '100%',
      boxShadow: 'var(--f-card-shadow)',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 180, background: 'linear-gradient(135deg, #1a472a, #2d5a3f)' }}>
        {combo.image_url && (
          <img src={combo.image_url} alt={combo.display_name || combo.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} onError={e => e.target.style.display='none'} />
        )}
        {savings > 0 && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: '#e74c3c', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
            Save ৳{savings.toLocaleString()}
          </div>
        )}
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#fff' }}>
          COMBO
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--f-text)', marginBottom: 8 }}>
          {combo.display_name || combo.name}
        </h3>
        {/* Components list */}
        <div style={{ fontSize: 13, color: 'var(--f-text-muted)', marginBottom: 12, lineHeight: 1.6 }}>
          {(combo.components || []).map((c, i) => (
            <div key={i}>{'\u2022'} {c.product_name || c.variant_name} {c.quantity}{c.unit}</div>
          ))}
        </div>
        {/* Price + Add */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--f-border)' }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--f-aqua)' }}>৳{Number(combo.combo_price).toLocaleString()}</span>
            {regularTotal > 0 && (
              <span style={{ fontSize: 13, color: 'var(--f-text-muted)', marginLeft: 8, textDecoration: 'line-through' }}>৳{regularTotal.toLocaleString()}</span>
            )}
          </div>
          {inCart ? (
            <div style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--f-radius-full)', border: '2px solid var(--f-aqua)', overflow: 'hidden' }}>
              <button onClick={handleDecrease} style={{ width: 34, height: 34, background: 'rgba(0,150,136,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FIcon name="minus" size={14} color="var(--f-aqua)" />
              </button>
              <span style={{ minWidth: 36, textAlign: 'center', fontSize: 14, fontWeight: 800, color: 'var(--f-aqua)' }}>{cartItem.qty}</span>
              <button onClick={handleIncrease} style={{ width: 34, height: 34, background: 'rgba(0,150,136,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FIcon name="plus" size={14} color="var(--f-aqua)" />
              </button>
            </div>
          ) : (
            <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: 'var(--f-radius-full)', border: 'none', background: 'var(--f-aqua)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Add Combo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
