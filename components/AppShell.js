'use client'
import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import CartDrawer from './CartDrawer'

export default function AppShell({ children }) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
