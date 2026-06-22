'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

const STEP = 0.25
const MIN_QTY = 0.25

const PIECE_UNITS = ['piece', 'pc', 'pcs', 'dozen', 'pack', 'box', 'set']

function isPieceUnit(unit) {
  return PIECE_UNITS.includes((unit || '').toLowerCase())
}

function getStep(unit) {
  return isPieceUnit(unit) ? 1 : STEP
}

function getMinQty(unit) {
  return isPieceUnit(unit) ? 1 : MIN_QTY
}

// Round to nearest step to avoid floating point issues
function roundQty(n) {
  return Math.round(n / STEP) * STEP
}

function roundQtyForUnit(n, unit) {
  const step = getStep(unit)
  return Math.round(n / step) * step
}

function getItemId(item) {
  return item.type === 'combo' ? `combo-${item.comboId}` : (item.product?.id || item.id)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [appliedOffer, setAppliedOffer] = useState(null) // { code, name }

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fishora_cart')
      if (saved) setCart(JSON.parse(saved))
      const savedOffer = localStorage.getItem('fishora_offer')
      if (savedOffer) setAppliedOffer(JSON.parse(savedOffer))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('fishora_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (appliedOffer) localStorage.setItem('fishora_offer', JSON.stringify(appliedOffer))
    else localStorage.removeItem('fishora_offer')
  }, [appliedOffer])

  function applyOffer(offer) {
    // Toggle — if same offer clicked again, remove it
    if (appliedOffer?.code === offer.code) {
      setAppliedOffer(null)
    } else {
      setAppliedOffer({ code: offer.code, name: offer.name })
    }
  }

  function clearOffer() {
    setAppliedOffer(null)
  }

  function addToCart(product, qty = 1) {
    if (product.type === 'combo') {
      const q = Math.max(Math.round(qty), 1)
      setCart(prev => {
        const itemId = `combo-${product.comboId}`
        const existing = prev.find(i => getItemId(i) === itemId)
        if (existing) return prev.map(i => getItemId(i) === itemId ? { ...i, qty: i.qty + q } : i)
        return [...prev, { type: 'combo', comboId: product.comboId, comboName: product.comboName, comboPrice: product.comboPrice, comboImage: product.comboImage, components: product.components, qty: q }]
      })
      return
    }
    // existing product logic
    const q = roundQty(qty)
    setCart(prev => {
      const existing = prev.find(i => i.product?.id === product.id)
      if (existing) return prev.map(i => i.product?.id === product.id ? { ...i, qty: roundQty(i.qty + q) } : i)
      return [...prev, { product, qty: Math.max(q, MIN_QTY) }]
    })
  }

  function updateQty(id, qty) {
    // Check if it's a combo
    const isCombo = cart.some(i => i.type === 'combo' && `combo-${i.comboId}` === id)
    if (isCombo) {
      const q = Math.round(qty)
      if (q < 1) return removeItem(id)
      setCart(prev => prev.map(i => getItemId(i) === id ? { ...i, qty: q } : i))
      return
    }
    // Find item to get its unit
    const item = cart.find(i => i.product?.id === id)
    const unit = item?.product?.unit || 'kg'
    const step = getStep(unit)
    const min = getMinQty(unit)
    const q = Math.round(qty / step) * step
    if (q < min) return removeItem(id)
    setCart(prev => prev.map(i => (i.product?.id === id) ? { ...i, qty: q } : i))
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => getItemId(i) !== id))
  }

  function clearCart() {
    setCart([])
    setAppliedOffer(null)
  }

  const cartCount = cart.length
  const subtotal  = cart.reduce((s, i) => {
    if (i.type === 'combo') return s + i.comboPrice * i.qty
    return s + i.product.price * i.qty
  }, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, cartCount, subtotal, STEP, MIN_QTY, appliedOffer, applyOffer, clearOffer, getItemId, isPieceUnit, getStep, getMinQty }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }
