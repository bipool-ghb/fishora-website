'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const ACCENT = '#0D7C66'
const LINKS = [
  { href: '/',          label: 'Home'     },
  { href: '/shop',      label: 'Shop'     },
  { href: '/about',     label: 'About'    },
  { href: '/delivery',  label: 'Delivery' },
  { href: '/services',  label: 'Services' },
  { href: '/contact',   label: 'Contact'  },
]

export default function Navbar() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#fff', borderBottom: '1px solid #e8e8e8',
      boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/images/Fishora-logo.jpeg" alt="Fishora" width={120} height={44} style={{ borderRadius: 8, objectFit: 'contain' }} />
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {LINKS.map(l => {
            const active = pathname === l.href
            return (
              <Link key={l.href} href={l.href} style={{
                background: active ? ACCENT + '12' : 'transparent',
                color: active ? ACCENT : '#444',
                borderRadius: 8, padding: '8px 16px',
                fontWeight: active ? 600 : 400, fontSize: 15, transition: 'all .2s',
              }}>
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Cart + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/cart" style={{
            position: 'relative',
            background: pathname === '/cart' ? ACCENT + '12' : '#f5f5f5',
            borderRadius: 10, padding: '8px 14px',
            fontSize: 18, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                background: ACCENT, color: '#fff', borderRadius: 50,
                fontSize: 11, fontWeight: 700, width: 20, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </Link>

          <button
            className="nav-hamburger"
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', fontSize: 24, display: 'none' }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile-menu" style={{ background: '#fff', borderTop: '1px solid #eee', padding: '8px 20px 16px' }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block',
              background: pathname === l.href ? ACCENT + '12' : 'transparent',
              color: pathname === l.href ? ACCENT : '#444',
              borderRadius: 8, padding: '12px 16px',
              fontWeight: pathname === l.href ? 600 : 400, fontSize: 16, marginBottom: 2,
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
