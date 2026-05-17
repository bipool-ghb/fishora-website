'use client'
import { WHATSAPP } from '@/data/products'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: 90, right: 24, width: 52, height: 52,
        borderRadius: '50%', background: '#25D366', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,0.35)', zIndex: 998,
        transition: 'transform 0.3s ease', textDecoration: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.44 1.27 4.89L2 22l5.11-1.27C8.56 21.54 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.07-.4-4.39-1.15l-.31-.18-3.22.84.86-3.14-.2-.32A7.963 7.963 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/>
        <path d="M16.25 13.97c-.23-.12-1.36-.67-1.57-.75-.21-.08-.37-.12-.52.12-.16.23-.61.75-.75.91-.14.16-.27.18-.5.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.28-1.59-.13-.23-.01-.36.1-.47.1-.1.23-.27.35-.4.12-.14.16-.23.23-.39.08-.16.04-.29-.02-.41-.06-.12-.52-1.27-.72-1.74-.19-.46-.38-.4-.52-.4h-.45c-.16 0-.41.06-.62.29-.21.23-.82.8-.82 1.96s.84 2.27.96 2.43c.12.16 1.65 2.52 4 3.53.56.24 1 .39 1.34.49.56.18 1.07.15 1.48.09.45-.07 1.36-.55 1.55-1.09.19-.54.19-.99.14-1.09-.06-.1-.21-.16-.44-.27z"/>
      </svg>
    </a>
  )
}
