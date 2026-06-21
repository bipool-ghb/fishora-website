'use client'
import { useState, useEffect, useRef, useId } from 'react'

// ========== SCROLL REVEAL ==========
export function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el) }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const transforms = {
    up: 'translateY(40px)', down: 'translateY(-40px)',
    left: 'translateX(40px)', right: 'translateX(-40px)',
    scale: 'scale(0.92)', none: 'none'
  }

  return (
    <div ref={ref} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// ========== GLASS CARD ==========
export function GlassCard({ children, style = {}, dark = false }) {
  return (
    <div style={{
      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}`,
      borderRadius: 'var(--f-radius-lg)', padding: '24px',
      ...style,
    }}>
      {children}
    </div>
  )
}

// ========== BADGE ==========
export function Badge({ text, variant = 'default', style = {} }) {
  const palettes = {
    default: { bg: 'var(--f-aqua-light)', color: 'var(--f-aqua)' },
    premium: { bg: 'var(--f-gold-light)', color: 'var(--f-gold)' },
    fresh: { bg: 'rgba(46,125,50,0.1)', color: '#2E7D32' },
    popular: { bg: 'rgba(21,101,192,0.1)', color: '#1565C0' },
    value: { bg: 'rgba(230,81,0,0.1)', color: '#E65100' },
    organic: { bg: 'rgba(46,125,50,0.1)', color: '#2E7D32' },
    halal: { bg: 'rgba(46,125,50,0.12)', color: '#1B5E20' },
  }
  const c = palettes[variant] || palettes.default
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 12px',
      borderRadius: 'var(--f-radius-full)', fontSize: '11px', fontWeight: 700,
      letterSpacing: '0.05em', textTransform: 'uppercase',
      background: c.bg, color: c.color, ...style
    }}>{text}</span>
  )
}

// ========== SECTION HEADER ==========
export function SectionHeader({ title, titleBn, subtitle, align = 'center', light = false }) {
  return (
    <Reveal style={{ textAlign: align, marginBottom: 48 }}>
      {titleBn && (
        <span style={{
          fontFamily: 'var(--f-font-bn)', fontSize: 15, fontWeight: 500,
          color: light ? 'rgba(255,255,255,0.45)' : 'var(--f-aqua)',
          display: 'block', marginBottom: 8, letterSpacing: '0.04em',
        }}>{titleBn}</span>
      )}
      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
        color: light ? '#fff' : 'var(--f-text)',
        marginBottom: subtitle ? 16 : 0,
        letterSpacing: '-0.03em', lineHeight: 1.1,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontSize: 'clamp(15px, 1.4vw, 19px)',
          color: light ? 'rgba(255,255,255,0.65)' : 'var(--f-text-secondary)',
          maxWidth: 560, margin: align === 'center' ? '0 auto' : '0', lineHeight: 1.7,
        }}>{subtitle}</p>
      )}
    </Reveal>
  )
}

// ========== BUTTON ==========
export function FButton({ children, variant = 'primary', size = 'md', onClick, style = {}, icon, fullWidth, href }) {
  const [hov, setHov] = useState(false)
  const sizes = { sm: { p: '10px 22px', f: '13px' }, md: { p: '14px 30px', f: '15px' }, lg: { p: '18px 40px', f: '16px' } }
  const s = sizes[size]
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: s.p, fontSize: s.f, fontWeight: 600, borderRadius: 'var(--f-radius-full)',
    letterSpacing: '0.01em', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    transform: hov ? 'translateY(-2px)' : 'none', cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto', textDecoration: 'none',
  }
  const variants = {
    primary: { background: hov ? '#388E3C' : 'var(--f-aqua)', color: '#fff', border: 'none',
      boxShadow: hov ? 'var(--f-btn-shadow-hover)' : 'var(--f-btn-shadow)' },
    secondary: { background: hov ? 'var(--f-surface-hover)' : 'var(--f-surface)', color: 'var(--f-text)',
      border: '1.5px solid var(--f-border)', boxShadow: hov ? 'var(--f-card-shadow-hover)' : 'var(--f-card-shadow)' },
    ghost: { background: hov ? 'rgba(255,255,255,0.12)' : 'transparent', color: '#fff',
      border: '1.5px solid rgba(255,255,255,0.3)', boxShadow: 'none' },
    dark: { background: hov ? '#1a2332' : 'var(--f-ocean)', color: '#fff', border: 'none',
      boxShadow: hov ? '0 8px 28px rgba(11,29,58,0.35)' : '0 4px 14px rgba(11,29,58,0.15)' },
    whatsapp: { background: hov ? '#20bd5a' : '#25D366', color: '#fff', border: 'none',
      boxShadow: '0 4px 14px rgba(37,211,102,0.25)' },
  }

  const props = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: { ...base, ...variants[variant], ...style },
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//')
    if (isExternal) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{icon}{children}</a>
    }
    return <a href={href} {...props}>{icon}{children}</a>
  }
  return <button onClick={onClick} {...props}>{icon}{children}</button>
}

// ========== STAR RATING ==========
export function StarRating({ rating, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? 'var(--f-gold)' : 'var(--f-border)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ fontSize: size - 2, fontWeight: 600, color: 'var(--f-text-muted)', marginLeft: 4 }}>{rating}</span>
    </div>
  )
}

// ========== FISHORA LOGO ==========
export function FishoraLogo({ light = false, size = 'md' }) {
  const h = { sm: 28, md: 34, lg: 48 }[size] || 34
  const s = { sm: 18, md: 22, lg: 28 }[size] || 22
  const src = light
    ? '/images/fishora_dark_background_logo.png'
    : '/images/fishora_light_background_logo.png'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, userSelect: 'none', cursor: 'pointer', flexShrink: 0 }}>
      <img
        src={src}
        alt="Fishora"
        style={{ height: h, width: 'auto', display: 'block', flexShrink: 0 }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: s, fontWeight: 800, letterSpacing: '-0.04em', color: light ? '#fff' : 'var(--f-text)', lineHeight: 1 }}>
          Fish
        </span>
        <span style={{ fontSize: s, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--f-aqua)', lineHeight: 1 }}>
          ora
        </span>
      </div>
    </div>
  )
}

// ========== NAKSHI PATTERN ==========
export function NakshiPattern({ color = '#2E7D32', size = 300, opacity = 0.035, style = {} }) {
  const pid = 'nk' + useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ position: 'absolute', opacity, pointerEvents: 'none', ...style }}>
      <defs>
        <pattern id={pid} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke={color} strokeWidth="0.6"/>
          <circle cx="20" cy="20" r="2.5" fill={color}/>
          <circle cx="0" cy="0" r="1.2" fill={color}/><circle cx="40" cy="0" r="1.2" fill={color}/>
          <circle cx="0" cy="40" r="1.2" fill={color}/><circle cx="40" cy="40" r="1.2" fill={color}/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${pid})`}/>
    </svg>
  )
}
