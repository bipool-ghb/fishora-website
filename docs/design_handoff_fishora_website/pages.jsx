// Fishora — Page Components
const { useState, useMemo } = React;

// ── HOME PAGE ──
function HomePage({ setPage, tweaks }) {
  const accent = tweaks.accentColor || '#0D7C66';
  const heroStyle = tweaks.heroStyle || 'overlay';

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: heroStyle === 'split' ? 420 : 480,
        display: heroStyle === 'split' ? 'grid' : 'block',
        gridTemplateColumns: heroStyle === 'split' ? '1fr 1fr' : undefined,
        background: heroStyle === 'overlay' ? '#000' : '#f8f8f8',
      }}>
        {heroStyle === 'overlay' ? (
          <>
            <img src="assets/Fresh fish assortment on ice.png" alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              position: 'absolute', inset: 0, opacity: 0.55,
            }} />
            <div style={{
              position: 'relative', zIndex: 2,
              maxWidth: 1200, margin: '0 auto', padding: '80px 24px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              minHeight: 480,
            }}>
              <div style={{
                background: accent, color: '#fff', display: 'inline-block',
                padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                marginBottom: 20, width: 'fit-content',
              }}>🐟 100% Fresh & Halal</div>
              <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 800, lineHeight: 1.15, margin: 0, maxWidth: 600, textWrap: 'balance' }}>
                Fresh Fish, Meat & Eggs — Delivered Daily
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, marginTop: 16, maxWidth: 500, lineHeight: 1.6 }}>
                তাজা হালাল মাছ, মাংস ও ডিম — সারাদেশে ডেলিভারি। Fishora — Fresh Inside.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button onClick={() => setPage('shop')} style={{
                  background: accent, color: '#fff', border: 'none', borderRadius: 10,
                  padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>Shop Now</button>
                <a href="https://wa.me/8801357187246" target="_blank" style={{
                  background: '#25D366', color: '#fff', border: 'none', borderRadius: 10,
                  padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>💬 WhatsApp Order</a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                background: accent + '15', color: accent, display: 'inline-block',
                padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                marginBottom: 20, width: 'fit-content',
              }}>🐟 100% Fresh & Halal</div>
              <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: 0, color: '#1a1a1a', textWrap: 'balance' }}>
                Fresh Fish, Meat & Eggs — Delivered Daily
              </h1>
              <p style={{ color: '#666', fontSize: 17, marginTop: 16, lineHeight: 1.6 }}>
                তাজা হালাল মাছ, মাংস ও ডিম — সারাদেশে ডেলিভারি। Fishora — Fresh Inside.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button onClick={() => setPage('shop')} style={{
                  background: accent, color: '#fff', border: 'none', borderRadius: 10,
                  padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>Shop Now</button>
                <a href="https://wa.me/8801357187246" target="_blank" style={{
                  background: '#25D366', color: '#fff', border: 'none', borderRadius: 10,
                  padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>💬 WhatsApp Order</a>
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src="assets/Fresh fish assortment on ice.png" alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover',
              }} />
            </div>
          </>
        )}
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Shop by Category</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 36, fontSize: 15 }}>ক্যাটাগরি অনুযায়ী কেনাকাটা করুন</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setPage('shop')} style={{
              background: '#fff', border: '1.5px solid #eee', borderRadius: 14,
              padding: '28px 16px', textAlign: 'center', cursor: 'pointer',
              transition: 'all .2s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{cat.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>{cat.name}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{cat.nameBn}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ background: '#f9fafb', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Popular Items</h2>
          <p style={{ color: '#888', marginBottom: 32, fontSize: 15 }}>জনপ্রিয় পণ্যসমূহ</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {PRODUCTS.filter(p => p.badge).slice(0, 6).map(p => (
              <ProductCard key={p.id} product={p} onAdd={window.__addToCart || (() => {})} tweaks={tweaks} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button onClick={() => setPage('shop')} style={{
              background: 'transparent', color: accent, border: `2px solid ${accent}`,
              borderRadius: 10, padding: '12px 36px', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
            }}
            onMouseEnter={e => { e.target.style.background = accent; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = accent; }}
            >View All Products →</button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Our Services</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 36, fontSize: 15 }}>আমাদের সেবাসমূহ</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            { icon: '🏪', title: 'Wholesale Orders', titleBn: 'পাইকারি অর্ডার', desc: 'Bulk pricing for restaurants, hotels & retailers. Special rates on large quantity orders.', color: '#1565C0' },
            { icon: '💒', title: 'Wedding & Events', titleBn: 'বিয়ে ও অনুষ্ঠান', desc: 'Fresh fish & meat supply for weddings, parties and ceremonies. We handle large-scale catering orders.', color: '#9C27B0' },
            { icon: '🔪', title: 'Clean, Cut & Process', titleBn: 'পরিষ্কার, কাটা ও প্রক্রিয়াজাত', desc: 'Expert fish & meat processing — cleaned, scaled, cut to your specifications. Ready to cook.', color: '#E65100' },
            { icon: '📋', title: 'Pre-Orders', titleBn: 'প্রি-অর্ডার', desc: 'Pre-order for any event or occasion. Guaranteed freshness & timely delivery for your special day.', color: '#2E7D32' },
          ].map((s, i) => (
            <div key={i} onClick={() => setPage('services')} style={{
              background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 28,
              cursor: 'pointer', transition: 'all .2s', borderTop: `3px solid ${s.color}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: s.color, fontWeight: 600, marginBottom: 10 }}>{s.titleBn}</div>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button onClick={() => setPage('services')} style={{
            background: 'transparent', color: accent, border: `2px solid ${accent}`,
            borderRadius: 10, padding: '12px 36px', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
          }}
          onMouseEnter={e => { e.target.style.background = accent; e.target.style.color = '#fff'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = accent; }}
          >Learn More About Services →</button>
        </div>
      </section>

      {/* Trust badges */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {[
            { icon: '✅', title: '100% Halal', desc: 'সম্পূর্ণ হালাল পণ্য' },
            { icon: '❄️', title: 'Fresh Daily', desc: 'প্রতিদিন তাজা সরবরাহ' },
            { icon: '🚚', title: 'Nationwide Delivery', desc: 'সারাদেশে ডেলিভারি' },
            { icon: '🔪', title: 'Expert Processing', desc: 'দক্ষ প্রক্রিয়াজাতকরণ' },
          ].map((b, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{b.title}</div>
              <div style={{ fontSize: 14, color: '#888' }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── SHOP PAGE ──
function ShopPage({ addToCart, tweaks }) {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const accent = tweaks.accentColor || '#0D7C66';

  const filtered = useMemo(() => {
    let items = PRODUCTS;
    if (activeCat !== 'all') items = items.filter(p => p.cat === activeCat);
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameBn.includes(search)
    );
    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [activeCat, search, sort]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>Shop All Products</h1>
      <p style={{ color: '#888', fontSize: 15, marginBottom: 28 }}>সকল পণ্য ব্রাউজ করুন</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
        <input type="text" placeholder="Search / অনুসন্ধান..." value={search} onChange={e => setSearch(e.target.value)} style={{
          padding: '10px 16px', border: '1.5px solid #e0e0e0', borderRadius: 10,
          fontSize: 14, width: 220, fontFamily: 'inherit', outline: 'none',
        }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => setActiveCat('all')} style={{
            background: activeCat === 'all' ? accent : '#f0f0f0',
            color: activeCat === 'all' ? '#fff' : '#555',
            border: 'none', borderRadius: 20, padding: '8px 18px',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
              background: activeCat === c.id ? accent : '#f0f0f0',
              color: activeCat === c.id ? '#fff' : '#555',
              border: 'none', borderRadius: 20, padding: '8px 18px',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>{c.icon} {c.name}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{
          padding: '8px 14px', border: '1.5px solid #e0e0e0', borderRadius: 10,
          fontSize: 13, fontFamily: 'inherit', marginLeft: 'auto', background: '#fff',
        }}>
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} tweaks={tweaks} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>No products found / কোনো পণ্য পাওয়া যায়নি</div>
      )}
    </div>
  );
}

// ── CART PAGE ──
function CartPage({ cart, updateQty, removeItem, setPage, tweaks }) {
  const accent = tweaks.accentColor || '#0D7C66';
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const delivery = subtotal > 2000 ? 0 : 100;
  const total = subtotal + delivery;

  if (cart.length === 0) return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: '#1a1a1a' }}>Your cart is empty</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>আপনার কার্ট খালি। পণ্য যোগ করুন!</p>
      <button onClick={() => setPage('shop')} style={{
        background: accent, color: '#fff', border: 'none', borderRadius: 10,
        padding: '12px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
      }}>Continue Shopping</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, color: '#1a1a1a' }}>Shopping Cart <span style={{ color: '#888', fontWeight: 400, fontSize: 18 }}>({cart.length} items)</span></h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cart.map(item => (
            <div key={item.product.id} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: 16,
              background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 10,
                background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, flexShrink: 0,
              }}>{CATEGORIES.find(c => c.id === item.product.cat)?.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>{item.product.name}</div>
                <div style={{ color: '#888', fontSize: 13 }}>৳{item.product.price}/{item.product.unit}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 8 }}>
                <button onClick={() => updateQty(item.product.id, item.qty - 1)} style={{ width: 30, height: 30, border: 'none', background: '#f5f5f5', cursor: 'pointer' }}>−</button>
                <span style={{ width: 30, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{item.qty}</span>
                <button onClick={() => updateQty(item.product.id, item.qty + 1)} style={{ width: 30, height: 30, border: 'none', background: '#f5f5f5', cursor: 'pointer' }}>+</button>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: accent, width: 80, textAlign: 'right' }}>৳{item.product.price * item.qty}</div>
              <button onClick={() => removeItem(item.product.id)} style={{
                background: 'none', border: 'none', color: '#ccc', fontSize: 20, cursor: 'pointer',
              }}>×</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{
          background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: 28,
          position: 'sticky', top: 80,
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#1a1a1a' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 15, color: '#555' }}>
            <span>Subtotal</span><span>৳{subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 15, color: '#555' }}>
            <span>Delivery</span><span>{delivery === 0 ? <span style={{ color: accent }}>FREE</span> : `৳${delivery}`}</span>
          </div>
          {delivery > 0 && <p style={{ fontSize: 12, color: '#999', marginBottom: 10 }}>Free delivery on orders over ৳2,000</p>}
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20, color: '#1a1a1a' }}>
            <span>Total</span><span>৳{total}</span>
          </div>
          <button onClick={() => setPage('checkout')} style={{
            width: '100%', background: accent, color: '#fff', border: 'none',
            borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', marginTop: 20,
          }}>Proceed to Checkout</button>
          <button onClick={() => setPage('shop')} style={{
            width: '100%', background: 'transparent', color: accent, border: 'none',
            borderRadius: 10, padding: '10px', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit', marginTop: 8,
          }}>← Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

// ── CHECKOUT PAGE ──
function CheckoutPage({ cart, tweaks, setPage }) {
  const accent = tweaks.accentColor || '#0D7C66';
  const [payment, setPayment] = useState('bkash');
  const [placed, setPlaced] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const delivery = subtotal > 2000 ? 0 : 100;

  if (placed) return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Order Placed!</h2>
      <p style={{ color: '#666', marginBottom: 8, fontSize: 16 }}>আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।</p>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>We will contact you on WhatsApp to confirm delivery details.</p>
      <button onClick={() => setPage('home')} style={{
        background: accent, color: '#fff', border: 'none', borderRadius: 10,
        padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
      }}>Back to Home</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, color: '#1a1a1a' }}>Checkout</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Delivery info */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Delivery Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Full Name / নাম', ph: 'আপনার নাম' },
              { label: 'Phone / ফোন', ph: '01XXX-XXXXXX' },
            ].map((f, i) => (
              <div key={i}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input placeholder={f.ph} style={{
                  width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
                  borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
                }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Address / ঠিকানা</label>
            <textarea rows={3} placeholder="Full delivery address" style={{
              width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
              borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical',
            }}></textarea>
          </div>
        </div>

        {/* Payment */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Payment Method / পেমেন্ট</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
            {[
              { id: 'bkash', label: 'bKash', color: '#E2136E' },
              { id: 'nagad', label: 'Nagad', color: '#F6921E' },
              { id: 'cod', label: 'Cash on Delivery', color: '#555' },
              { id: 'bank', label: 'Bank Transfer', color: '#1565C0' },
            ].map(m => (
              <button key={m.id} onClick={() => setPayment(m.id)} style={{
                background: payment === m.id ? m.color + '12' : '#f8f8f8',
                border: payment === m.id ? `2px solid ${m.color}` : '2px solid transparent',
                borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                color: payment === m.id ? m.color : '#666',
                textAlign: 'center',
              }}>{m.label}</button>
            ))}
          </div>
        </div>

        {/* Place order */}
        <div style={{ background: accent + '08', borderRadius: 14, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 14, color: '#666' }}>Total: <strong style={{ fontSize: 22, color: '#1a1a1a' }}>৳{subtotal + delivery}</strong></div>
            <div style={{ fontSize: 13, color: '#888' }}>{cart.length} items + delivery</div>
          </div>
          <button onClick={() => setPlaced(true)} style={{
            background: accent, color: '#fff', border: 'none', borderRadius: 10,
            padding: '14px 40px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT PAGE ──
function AboutPage({ tweaks }) {
  const accent = tweaks.accentColor || '#0D7C66';
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>About Fishora</h1>
      <p style={{ color: '#888', marginBottom: 32, fontSize: 15 }}>ফিশোরা সম্পর্কে জানুন</p>

      <img src="assets/cover-photo-bd.png" alt="" style={{ width: '100%', borderRadius: 14, marginBottom: 32 }} />

      <div style={{ fontSize: 16, lineHeight: 1.8, color: '#444' }}>
        <p style={{ marginBottom: 16 }}>
          <strong>Fishora</strong> is a trusted halal protein store based in Ishwardi, Pabna. We are committed to delivering the freshest fish, meat, and eggs to households across Bangladesh.
        </p>
        <p style={{ marginBottom: 16 }}>
          ফিশোরা ঈশ্বরদী, পাবনায় অবস্থিত একটি বিশ্বস্ত হালাল প্রোটিন দোকান। আমরা সারাদেশে তাজা মাছ, মাংস এবং ডিম সরবরাহ করতে প্রতিশ্রুতিবদ্ধ।
        </p>
        <p style={{ marginBottom: 16 }}>
          Our mission is simple: bring <strong>fresh, halal, and affordable</strong> protein to every home. Every product is sourced locally and handled with care to ensure maximum freshness.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
        {[
          { n: '500+', label: 'Happy Customers' },
          { n: '5', label: 'Product Categories' },
          { n: '24hr', label: 'Delivery Nationwide' },
          { n: '100%', label: 'Halal Guaranteed' },
        ].map((s, i) => (
          <div key={i} style={{ background: accent + '08', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: accent }}>{s.n}</div>
            <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DELIVERY PAGE ──
function DeliveryPage({ tweaks }) {
  const accent = tweaks.accentColor || '#0D7C66';
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Delivery Info</h1>
      <p style={{ color: '#888', marginBottom: 32, fontSize: 15 }}>ডেলিভারি তথ্য</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { title: 'Delivery Area', titleBn: 'ডেলিভারি এলাকা', desc: 'We deliver nationwide across Bangladesh. Local orders in Ishwardi/Pabna get same-day delivery.' },
          { title: 'Delivery Time', titleBn: 'ডেলিভারি সময়', desc: 'Local: Same day | Dhaka: 24 hours | Nationwide: 24-48 hours. Orders placed before 12PM are processed same day.' },
          { title: 'Delivery Charges', titleBn: 'ডেলিভারি চার্জ', desc: 'FREE delivery on orders over ৳2,000. Standard delivery: ৳100 within Pabna, ৳150 Dhaka, ৳200 elsewhere.' },
          { title: 'Packaging', titleBn: 'প্যাকেজিং', desc: 'All products are packed in insulated bags with ice packs to ensure freshness during transit.' },
        ].map((item, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 24,
            borderLeft: `4px solid ${accent}`,
          }}>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{item.title}</h3>
            <div style={{ fontSize: 13, color: accent, marginBottom: 8 }}>{item.titleBn}</div>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CONTACT PAGE ──
function ContactPage({ tweaks }) {
  const accent = tweaks.accentColor || '#0D7C66';
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>Contact Us</h1>
      <p style={{ color: '#888', marginBottom: 32, fontSize: 15 }}>আমাদের সাথে যোগাযোগ করুন</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {[
              { icon: '📍', title: 'Address', value: 'Bishwas Super Market, College Road, Ishwardi, Pabna' },
              { icon: '📞', title: 'Phone', value: '01357-187246' },
              { icon: '💬', title: 'WhatsApp', value: '01357-187246' },
              { icon: '🕐', title: 'Hours', value: 'Saturday - Thursday: 7AM - 10PM' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24, flexShrink: 0, width: 40, height: 40, background: accent + '10', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>{c.title}</div>
                  <div style={{ fontSize: 14, color: '#666', marginTop: 2 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="https://wa.me/8801357187246" target="_blank" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#25D366', color: '#fff', padding: '12px 24px',
            borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 15,
          }}>💬 Chat on WhatsApp</a>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #eee', padding: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Send a Message</h3>
          {[
            { label: 'Name', ph: 'Your name' },
            { label: 'Phone', ph: '01XXX-XXXXXX' },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>{f.label}</label>
              <input placeholder={f.ph} style={{
                width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
                borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
              }} />
            </div>
          ))}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Message</label>
            <textarea rows={4} placeholder="Your message..." style={{
              width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
              borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical',
            }}></textarea>
          </div>
          <button style={{
            width: '100%', background: accent, color: '#fff', border: 'none',
            borderRadius: 8, padding: '12px', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>Send Message</button>
        </div>
      </div>
    </div>
  );
}

// ── SERVICES PAGE ──
function ServicesPage({ tweaks, setPage }) {
  const accent = tweaks.accentColor || '#0D7C66';
  const [activeTab, setActiveTab] = useState('wholesale');
  const [submitted, setSubmitted] = useState(false);

  const tabs = [
    { id: 'wholesale', label: 'Wholesale', labelBn: 'পাইকারি', icon: '🏪' },
    { id: 'wedding', label: 'Wedding & Events', labelBn: 'বিয়ে ও অনুষ্ঠান', icon: '💒' },
    { id: 'processing', label: 'Clean & Cut', labelBn: 'পরিষ্কার ও কাটা', icon: '🔪' },
    { id: 'preorder', label: 'Pre-Order', labelBn: 'প্রি-অর্ডার', icon: '📋' },
  ];

  const serviceDetails = {
    wholesale: {
      title: 'Wholesale Orders',
      titleBn: 'পাইকারি অর্ডার',
      desc: 'We offer competitive wholesale pricing for restaurants, hotels, catering services, and retail shops. Get the freshest halal fish, meat, and eggs at bulk rates with reliable delivery.',
      descBn: 'রেস্তোরাঁ, হোটেল, ক্যাটারিং সার্ভিস এবং খুচরা দোকানের জন্য প্রতিযোগিতামূলক পাইকারি মূল্য।',
      features: ['Bulk pricing (10kg+)', 'Weekly/monthly supply contracts', 'Dedicated account manager', 'Priority delivery scheduling', 'Custom packaging available'],
    },
    wedding: {
      title: 'Wedding & Event Catering Supply',
      titleBn: 'বিয়ে ও অনুষ্ঠানের সরবরাহ',
      desc: 'Planning a wedding, walima, or large gathering? We supply fresh fish and meat in large quantities, cleaned and cut to your specifications. Our team ensures everything is ready on time for your special occasion.',
      descBn: 'বিয়ে, ওয়ালিমা বা বড় অনুষ্ঠানের পরিকল্পনা করছেন? আমরা বড় পরিমাণে তাজা মাছ ও মাংস সরবরাহ করি।',
      features: ['Large quantity supply (50kg+)', 'Cleaned, cut & ready to cook', 'On-time guaranteed delivery', 'Menu planning consultation', 'Custom order for any event size'],
    },
    processing: {
      title: 'Expert Fish & Meat Processing',
      titleBn: 'দক্ষ মাছ ও মাংস প্রক্রিয়াজাতকরণ',
      desc: 'Our skilled team provides professional fish and meat processing services. We clean, scale, debone, fillet, and cut to your exact requirements — so you get ready-to-cook protein, saving you time and effort.',
      descBn: 'আমাদের দক্ষ দল পেশাদার মাছ ও মাংস প্রক্রিয়াজাতকরণ সেবা প্রদান করে — পরিষ্কার, আঁশ ছাড়ানো, হাড় ছাড়ানো, ফিলেট এবং আপনার চাহিদামতো কাটা।',
      features: ['Fish scaling & cleaning', 'Deboning & filleting', 'Meat cutting to specification', 'Marination on request', 'Vacuum packaging available'],
    },
    preorder: {
      title: 'Pre-Order for Any Event',
      titleBn: 'যেকোনো অনুষ্ঠানের জন্য প্রি-অর্ডার',
      desc: 'Need a specific type or quantity of fish or meat for an upcoming event? Place a pre-order and we guarantee freshness, quality, and on-time delivery. Order 24-72 hours in advance for best availability.',
      descBn: 'আসন্ন অনুষ্ঠানের জন্য নির্দিষ্ট ধরণ বা পরিমাণের মাছ বা মাংস দরকার? প্রি-অর্ডার করুন — তাজা, মানসম্পন্ন এবং সময়মতো ডেলিভারি নিশ্চিত।',
      features: ['Advance booking (24-72hrs)', 'Guaranteed freshness', 'Custom quantity & cuts', 'Scheduled delivery', 'Special items on request'],
    },
  };

  const active = serviceDetails[activeTab];

  if (submitted) return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Request Submitted!</h2>
      <p style={{ color: '#666', marginBottom: 8, fontSize: 16 }}>আপনার অনুরোধ সফলভাবে জমা হয়েছে।</p>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Our team will contact you within 2 hours on WhatsApp/phone to discuss details and pricing.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setSubmitted(false)} style={{
          background: accent, color: '#fff', border: 'none', borderRadius: 10,
          padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>Submit Another Request</button>
        <a href="https://wa.me/8801357187246" target="_blank" style={{
          background: '#25D366', color: '#fff', borderRadius: 10,
          padding: '12px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>💬 WhatsApp Us Now</a>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>Our Services</h1>
      <p style={{ color: '#888', fontSize: 15, marginBottom: 28 }}>আমাদের সেবাসমূহ — পাইকারি, অনুষ্ঠান, প্রক্রিয়াজাতকরণ, প্রি-অর্ডার</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: activeTab === t.id ? accent : '#f0f0f0',
            color: activeTab === t.id ? '#fff' : '#555',
            border: 'none', borderRadius: 10, padding: '10px 20px',
            fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 6, transition: 'all .2s',
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
        {/* Details */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{active.title}</h2>
          <p style={{ fontSize: 14, color: accent, fontWeight: 600, marginBottom: 16 }}>{active.titleBn}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#444', marginBottom: 10 }}>{active.desc}</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#777', marginBottom: 24 }}>{active.descBn}</p>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1a1a1a' }}>What's Included</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {active.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#444' }}>
                <span style={{ color: accent, fontWeight: 700, fontSize: 18 }}>✓</span> {f}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 28, background: accent + '08', borderRadius: 12, padding: 20,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ fontSize: 28 }}>📞</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>Quick Order via WhatsApp</div>
              <div style={{ fontSize: 14, color: '#666' }}>Call or message us at <strong>01357-187246</strong> for instant quotes</div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div style={{
          background: '#fff', borderRadius: 14, border: '1.5px solid #eee', padding: 24,
          position: 'sticky', top: 80,
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Request a Quote</h3>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>কোটেশনের জন্য অনুরোধ করুন</p>

          {[
            { label: 'Name / নাম', ph: 'আপনার নাম', type: 'text' },
            { label: 'Phone / ফোন', ph: '01XXX-XXXXXX', type: 'tel' },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>{f.label}</label>
              <input type={f.type} placeholder={f.ph} style={{
                width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
                borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
              }} />
            </div>
          ))}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Service Type</label>
            <select defaultValue={activeTab} style={{
              width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
              borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', background: '#fff',
            }}>
              {tabs.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Event Date (if applicable)</label>
            <input type="date" style={{
              width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
              borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
            }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#555', display: 'block', marginBottom: 6 }}>Details / বিস্তারিত</label>
            <textarea rows={4} placeholder="Describe what you need — items, quantity, cuts, event size..." style={{
              width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
              borderRadius: 8, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical',
            }}></textarea>
          </div>

          <button onClick={() => setSubmitted(true)} style={{
            width: '100%', background: accent, color: '#fff', border: 'none',
            borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>Submit Request</button>

          <a href="https://wa.me/8801357187246" target="_blank" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', background: '#25D366', color: '#fff', border: 'none',
            borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', marginTop: 10,
          }}>💬 Or Order via WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, ShopPage, CartPage, CheckoutPage, AboutPage, DeliveryPage, ContactPage, ServicesPage });
