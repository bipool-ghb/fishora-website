// Fishora — Shared UI Components
const { useState, useEffect, useRef, useContext, createContext } = React;

// ── Context ──
const AppContext = createContext();
const useApp = () => useContext(AppContext);

// ── Navbar ──
function Navbar({ page, setPage, cartCount, tweaks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: 'home', label: 'Home', labelBn: 'হোম' },
    { id: 'shop', label: 'Shop', labelBn: 'দোকান' },
    { id: 'about', label: 'About', labelBn: 'আমাদের সম্পর্কে' },
    { id: 'delivery', label: 'Delivery', labelBn: 'ডেলিভারি' },
    { id: 'services', label: 'Services', labelBn: 'সেবা' },
    { id: 'contact', label: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  const accent = tweaks.accentColor || '#0D7C66';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setPage('home')}>
          <img src="assets/Fishora-logo.jpeg" alt="Fishora" style={{ height: 44, borderRadius: 8 }} />
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="nav-desktop">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              background: page === l.id ? accent + '12' : 'transparent',
              color: page === l.id ? accent : '#444',
              border: 'none', borderRadius: 8, padding: '8px 16px',
              fontWeight: page === l.id ? 600 : 400, cursor: 'pointer',
              fontSize: 15, fontFamily: 'inherit', transition: 'all .2s',
            }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Cart + Mobile menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setPage('cart')} style={{
            position: 'relative', background: page === 'cart' ? accent + '12' : '#f5f5f5',
            border: 'none', borderRadius: 10, padding: '8px 14px',
            cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            🛒
            {cartCount > 0 && <span style={{
              position: 'absolute', top: -4, right: -4,
              background: accent, color: '#fff', borderRadius: 50,
              fontSize: 11, fontWeight: 700, width: 20, height: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{cartCount}</span>}
          </button>

          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', display: 'none',
          }}>☰</button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: '#fff', borderTop: '1px solid #eee', padding: '8px 20px 16px',
        }} className="nav-mobile-menu">
          {links.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: page === l.id ? accent + '12' : 'transparent',
              color: page === l.id ? accent : '#444',
              border: 'none', borderRadius: 8, padding: '12px 16px',
              fontWeight: page === l.id ? 600 : 400, cursor: 'pointer',
              fontSize: 16, fontFamily: 'inherit', marginBottom: 2,
            }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Product Card ──
function ProductCard({ product, onAdd, tweaks }) {
  const accent = tweaks.accentColor || '#0D7C66';
  const cardStyle = tweaks.cardStyle || 'minimal';
  const [qty, setQty] = useState(1);

  const catObj = CATEGORIES.find(c => c.id === product.cat);
  const catColors = {
    fish: '#1976D2', meat: '#C62828', eggs: '#F9A825',
    prawns: '#E65100', dried: '#6D4C41',
  };
  const catColor = catColors[product.cat] || '#666';

  return (
    <div style={{
      background: '#fff',
      borderRadius: cardStyle === 'rounded' ? 16 : 10,
      border: cardStyle === 'bordered' ? '1.5px solid #e0e0e0' : '1px solid #f0f0f0',
      boxShadow: cardStyle === 'shadow' ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'transform .2s, box-shadow .2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = cardStyle === 'shadow' ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)'; }}
    >
      {/* Image placeholder */}
      <div style={{
        height: 160, background: catColor + '10',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48, position: 'relative',
      }}>
        {catObj?.icon || '🐟'}
        {product.badge && (
          <span style={{
            position: 'absolute', top: 10, right: 10,
            background: accent, color: '#fff', fontSize: 11, fontWeight: 600,
            padding: '3px 10px', borderRadius: 20,
          }}>{product.badge}</span>
        )}
      </div>

      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 12, color: catColor, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {catObj?.name}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{product.name}</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>{product.nameBn}</div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: accent }}>৳{product.price}</span>
            <span style={{ fontSize: 13, color: '#999' }}>/{product.unit}</span>
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 32, height: 32, border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: 16 }}>−</button>
              <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 32, height: 32, border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: 16 }}>+</button>
            </div>
            <button onClick={() => { onAdd(product, qty); setQty(1); }} style={{
              flex: 1, background: accent, color: '#fff', border: 'none',
              borderRadius: 8, padding: '8px 12px', cursor: 'pointer',
              fontWeight: 600, fontSize: 13, fontFamily: 'inherit',
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
            >Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Footer ──
function Footer({ setPage, tweaks }) {
  const accent = tweaks.accentColor || '#0D7C66';
  return (
    <footer style={{
      background: '#1a1a1a', color: '#ccc', padding: '48px 20px 24px',
      marginTop: 60,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
        <div>
          <img src="assets/Fishora-logo.jpeg" alt="Fishora" style={{ height: 50, borderRadius: 8, marginBottom: 12 }} />
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#999' }}>
            Fresh Halal fish, meat & eggs delivered to your door. Quality you can trust.
          </p>
          <p style={{ fontSize: 13, color: '#777', marginTop: 8 }}>তাজা হালাল মাছ, মাংস ও ডিম — আপনার দোরগোড়ায়।</p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 15, marginBottom: 12 }}>Quick Links</h4>
          {['home','shop','about','delivery','contact'].map(p => (
            <div key={p}><a onClick={() => setPage(p)} style={{ color: '#999', fontSize: 14, cursor: 'pointer', lineHeight: 2, textDecoration: 'none' }}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = '#999'}
            >{p.charAt(0).toUpperCase() + p.slice(1)}</a></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 15, marginBottom: 12 }}>Contact</h4>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#999' }}>
            📍 Bishwas Super Market, College Road,<br />Ishwardi, Pabna<br />
            📞 01357-187246<br />
            💬 WhatsApp: 01357-187246
          </p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 15, marginBottom: 12 }}>Payment Methods</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['bKash', 'Nagad', 'COD', 'Bank'].map(m => (
              <span key={m} style={{ background: '#2a2a2a', padding: '6px 12px', borderRadius: 6, fontSize: 13, color: '#bbb' }}>{m}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid #333', textAlign: 'center', fontSize: 13, color: '#666' }}>
        © 2026 Fishora — Fresh Inside. All rights reserved.
      </div>
    </footer>
  );
}

// ── WhatsApp Button ──
function WhatsAppButton() {
  return (
    <a href="https://wa.me/8801357187246" target="_blank" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 200,
      width: 56, height: 56, borderRadius: 28,
      background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
      textDecoration: 'none', transition: 'transform .2s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

Object.assign(window, { Navbar, ProductCard, Footer, WhatsAppButton, AppContext, useApp });
