'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useTheme } from '@/context/ThemeContext'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import FIcon from './FIcon'
import { FishoraLogo } from './ui'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ onCartOpen }) {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const { dark, toggleDark } = useTheme()
  const { isLoggedIn, customer } = useCustomerAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHome = pathname === '/'
  const isHero = isHome && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const textColor = isHero ? '#fff' : 'var(--f-text)'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: isHero ? (scrolled ? 'var(--f-nav-bg)' : 'transparent') : 'var(--f-nav-bg)',
        backdropFilter: scrolled || !isHero ? 'var(--f-nav-blur)' : 'none',
        WebkitBackdropFilter: scrolled || !isHero ? 'var(--f-nav-blur)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.35s ease',
        borderBottom: scrolled ? '1px solid var(--f-border)' : '1px solid transparent',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          height: 68, gap: 20,
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <FishoraLogo light={isHero} />
          </Link>

          {/* Desktop Links */}
          <div className="nav-desktop" style={{ display: 'flex', gap: 6 }}>
            {LINKS.map(l => {
              const active = pathname === l.href
              return (
                <Link key={l.href} href={l.href} style={{
                  padding: '8px 18px', borderRadius: 'var(--f-radius-full)',
                  background: active ? (isHero ? 'rgba(255,255,255,0.1)' : 'var(--f-aqua-light)') : 'transparent',
                  color: active ? (isHero ? '#fff' : 'var(--f-aqua)') : textColor,
                  fontSize: 14, fontWeight: 600, transition: 'all 0.2s ease',
                  letterSpacing: '0.01em', textDecoration: 'none',
                }}>
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Account */}
            <Link href={isLoggedIn ? '/account' : '/account/login'} title={isLoggedIn ? 'My Account' : 'Sign In'} style={{
              height: 38, borderRadius: 'var(--f-radius-full)',
              background: isHero ? 'rgba(255,255,255,0.08)' : 'var(--f-bg-alt)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease', textDecoration: 'none', gap: 6,
              padding: isLoggedIn ? '0 14px 0 10px' : '0',
              width: isLoggedIn ? 'auto' : 38,
            }}>
              <FIcon name="user" size={17} color={isLoggedIn ? 'var(--f-aqua)' : textColor} />
              {isLoggedIn && (
                <span className="nav-desktop-only" style={{ fontSize: 13, fontWeight: 600, color: textColor }}>
                  {customer?.name?.split(' ')[0] || 'Account'}
                </span>
              )}
            </Link>

            {/* Dark mode */}
            <button onClick={toggleDark} title="Toggle dark mode" style={{
              width: 38, height: 38, borderRadius: '50%',
              background: isHero ? 'rgba(255,255,255,0.08)' : 'var(--f-bg-alt)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}>
              <FIcon name={dark ? 'sun' : 'moon'} size={17} color={textColor} />
            </button>

            {/* Cart button */}
            <button
              onClick={onCartOpen}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: isHero ? 'rgba(255,255,255,0.08)' : 'var(--f-bg-alt)',
                border: 'none', cursor: 'pointer', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <FIcon name="cart" size={17} color={textColor} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -2, right: -2,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--f-aqua)', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 38, height: 38, borderRadius: '50%', display: 'none',
                background: isHero ? 'rgba(255,255,255,0.08)' : 'var(--f-bg-alt)',
                border: 'none', cursor: 'pointer',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <FIcon name={mobileOpen ? 'x' : 'menu'} size={18} color={textColor} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="nav-mobile-menu" style={{
          maxHeight: mobileOpen ? 300 : 0, overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
          background: 'var(--f-nav-bg)', backdropFilter: 'var(--f-nav-blur)',
          borderTop: mobileOpen ? '1px solid var(--f-border)' : 'none',
        }}>
          <div style={{ padding: '8px 24px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {LINKS.map(l => {
              const active = pathname === l.href
              return (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                  padding: '14px 16px', borderRadius: 'var(--f-radius-md)', textAlign: 'left',
                  background: active ? 'var(--f-aqua-light)' : 'transparent',
                  color: active ? 'var(--f-aqua)' : 'var(--f-text)',
                  fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'block',
                }}>
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="mobile-bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
        background: 'var(--f-nav-bg)', backdropFilter: 'var(--f-nav-blur)',
        WebkitBackdropFilter: 'var(--f-nav-blur)',
        borderTop: '1px solid var(--f-border)',
        display: 'none', justifyContent: 'space-around', padding: '8px 0 env(safe-area-inset-bottom, 8px)',
      }}>
        {[
          { href: '/', icon: 'home', label: 'Home' },
          { href: '/shop', icon: 'search', label: 'Shop' },
          ...(isLoggedIn ? [{ href: '/account/orders', icon: 'package', label: 'Orders' }] : []),
          { href: isLoggedIn ? '/account' : '/account/login', icon: 'user', label: isLoggedIn ? 'Account' : 'Login' },
        ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '6px 12px', textDecoration: 'none',
            }}>
              <FIcon name={item.icon} size={20}
                color={pathname === item.href ? 'var(--f-aqua)' : 'var(--f-text-muted)'} />
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: pathname === item.href ? 'var(--f-aqua)' : 'var(--f-text-muted)',
              }}>{item.label}</span>
            </Link>
        ))}
      </div>
    </>
  )
}
