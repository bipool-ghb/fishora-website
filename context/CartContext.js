'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fishora_cart')
      if (saved) setCart(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('fishora_cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { product, qty }]
    })
  }

  function updateQty(productId, qty) {
    if (qty <= 0) return removeItem(productId)
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, qty } : i))
  }

  function removeItem(productId) {
    setCart(prev => prev.filter(i => i.product.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal  = cart.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }
