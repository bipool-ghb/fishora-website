'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useCustomerAuth } from '@/context/CustomerAuthContext'
import FIcon from '@/components/FIcon'
import { Reveal, FButton } from '@/components/ui'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

export default function CheckoutPage() {
  const { cart, subtotal, clearCart, appliedOffer, clearOffer } = useCart()
  const { customer, token, isLoggedIn } = useCustomerAuth()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [fulfillmentType, setFulfillmentType] = useState('DELIVERY')
  const [address, setAddress] = useState({ name: '', phone: '', street: '', area: '', city: 'Ishwardi' })
  const [pickupTimeWindow, setPickupTimeWindow] = useState('10AM - 12PM')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [payment, setPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [orderId, setOrderId] = useState('')
  const [errors, setErrors] = useState({})
  const [prefilled, setPrefilled] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState('')
  const [customerNote, setCustomerNote] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponName, setCouponName] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [loyaltyInput, setLoyaltyInput] = useState('')
  const [loyaltyApplied, setLoyaltyApplied] = useState(false)
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0)
  const [loyaltyError, setLoyaltyError] = useState('')
  const [loyaltyLoading, setLoyaltyLoading] = useState(false)
  const calendarRef = { current: null }

  // Auto-apply offer from shop page
  useEffect(() => {
    if (appliedOffer?.code && !couponApplied && cart.length > 0 && token) {
      setCouponCode(appliedOffer.code)
      // Auto-validate the coupon
      ;(async () => {
        setCouponLoading(true)
        try {
          const res = await fetch(`${API_URL}/api/v1/customer/orders/validate-coupon`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              code: appliedOffer.code,
              items: cart.filter(i => i.type !== 'combo').map(({ product, qty }) => ({ variant_id: product.id, quantity: qty, unit_price: product.price })),
              fulfillment_type: fulfillmentType,
            }),
          })
          const json = await res.json()
          const result = json.data || json
          if (result.valid) {
            setCouponApplied(true)
            setCouponDiscount(result.discount_amount)
            setCouponName(result.promotion_name)
          }
        } catch {} finally { setCouponLoading(false) }
      })()
    }
  }, [appliedOffer, token])

  // Fetch loyalty points
  useEffect(() => {
    if (!isLoggedIn || !token) return
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/customer/loyalty`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success) setLoyaltyPoints(data.data?.available_points || 0)
      } catch {}
    })()
  }, [isLoggedIn, token])

  // Pre-fill from logged-in customer
  useEffect(() => {
    if (!isLoggedIn || !token || prefilled) return

    const loadCustomerData = async () => {
      try {
        // Fetch profile
        const meRes = await fetch(`${API_URL}/api/v1/customer-auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const meData = await meRes.json()

        // Fetch addresses
        const addrRes = await fetch(`${API_URL}/api/v1/customer-auth/addresses`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const addrData = await addrRes.json()

        // Fetch phones
        const phoneRes = await fetch(`${API_URL}/api/v1/customer-auth/phones`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const phoneData = await phoneRes.json()

        const profile = meData.success ? meData.data : null
        const addresses = addrData.success ? addrData.data : []
        const phones = phoneData.success ? phoneData.data : []

        const primaryAddr = addresses.find(a => a.is_primary) || addresses[0]
        const primaryPhone = phones.find(p => p.is_primary) || phones[0]

        setAddress(prev => ({
          name: profile?.name || prev.name,
          phone: primaryPhone?.phone_number || profile?.primary_phone || prev.phone,
          street: primaryAddr?.address_line1 || prev.street,
          area: primaryAddr?.area || prev.area,
          city: primaryAddr?.city || prev.city,
        }))
        if (primaryAddr?.id) setSelectedAddressId(primaryAddr.id)
        setPrefilled(true)
      } catch {
        // silently fail
      }
    }

    loadCustomerData()
  }, [isLoggedIn, token, prefilled])

  const fmt = (v) => `৳${v.toLocaleString()}`

  // Generate next 7 delivery dates
  const deliveryDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1) // start from tomorrow
    return {
      value: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0,
    }
  })

  useEffect(() => {
    if (!deliveryDate && deliveryDates.length > 0) {
      setDeliveryDate(deliveryDates[0].value)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const payments = [
    { id: 'bkash', label: 'bKash', color: '#E2136E' },
    { id: 'nagad', label: 'Nagad', color: '#F6921E' },
    { id: 'card', label: 'Card', color: '#1A73E8' },
    { id: 'cod', label: 'Cash on Delivery', color: '#27ae60' },
  ]

  const labelStyle = {
    display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--f-text)',
    marginBottom: 6,
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 'var(--f-radius-md)',
    border: '1.5px solid var(--f-border)', background: 'var(--f-surface)',
    color: 'var(--f-text)', fontSize: 15, outline: 'none',
    transition: 'border-color 0.2s',
  }

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ef4444',
  }

  const PAYMENT_MAP = { bkash: 'BKASH', nagad: 'NAGAD', card: 'CARD', cod: 'CASH_ON_DELIVERY' }

  const placeOrder = async () => {
    if (!isLoggedIn) {
      router.push('/account/login?redirect=/checkout')
      return
    }
    setPlacing(true)
    setOrderError('')
    try {
      let addressId = selectedAddressId

      // For delivery orders, create address only if no saved address is selected
      if (fulfillmentType === 'DELIVERY' && !addressId) {
        const addrRes = await fetch(`${API_URL}/api/v1/customer-auth/addresses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            label: 'HOME',
            address_line1: address.street,
            area: address.area,
            city: address.city,
            country: 'Bangladesh',
            is_primary: true,
          }),
        })
        const addrData = await addrRes.json()
        if (!addrData.success) throw new Error(addrData.error?.message || 'Failed to save address')
        addressId = addrData.data?.id
      }

      const orderPayload = {
        fulfillment_type: fulfillmentType,
        payment_method: payment ? (PAYMENT_MAP[payment] || 'CASH_ON_DELIVERY') : 'CASH_ON_DELIVERY',
        ...(couponApplied ? { coupon_code: couponCode.trim() } : {}),
        ...(loyaltyApplied ? { loyalty_points_to_redeem: parseInt(loyaltyInput, 10) } : {}),
        ...(fulfillmentType === 'DELIVERY' ? {
          delivery_address_id: addressId,
          delivery_address_snapshot: {
            name: address.name,
            phone: address.phone,
            address_line1: address.street,
            area: address.area,
            city: address.city,
          },
        } : {
          pickup_location: 'Fishora Store, Ishwardi',
          pickup_time_window: pickupTimeWindow,
        }),
        customer_notes: [
          deliveryDate ? `Preferred ${fulfillmentType === 'PICKUP' ? 'pickup' : 'delivery'} date: ${deliveryDate}` : '',
          fulfillmentType === 'PICKUP' && pickupTimeWindow ? `Pickup time: ${pickupTimeWindow}` : '',
          customerNote,
        ].filter(Boolean).join(' | '),
        items: cart.filter(i => i.type !== 'combo').map(({ product, qty }) => ({
          variant_id: product.id,
          quantity: qty,
        })),
        ...(cart.some(i => i.type === 'combo') ? {
          combo_items: cart.filter(i => i.type === 'combo').map(item => ({
            combo_item_id: item.comboId,
            quantity: item.qty,
          })),
        } : {}),
      }

      const orderRes = await fetch(`${API_URL}/api/v1/customer/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderPayload),
      })
      const orderData = await orderRes.json()
      if (!orderData.success) throw new Error(orderData.error?.message || 'Failed to place order')

      setOrderNumber(orderData.data?.order_number || '')
      setOrderId(orderData.data?.id || '')
      setOrderPlaced(true)
      clearCart()
    } catch (err) {
      setOrderError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  const validateAddress = () => {
    const errs = {}
    if (!address.name.trim()) errs.name = 'Name is required'
    if (!address.phone.trim()) errs.phone = 'Phone number is required'
    if (fulfillmentType === 'DELIVERY' && !address.street.trim()) errs.street = 'Street address is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    setCouponError('')
    try {
      const res = await fetch(`${API_URL}/api/v1/customer/orders/validate-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          code: couponCode.trim(),
          items: cart.filter(i => i.type !== 'combo').map(({ product, qty }) => ({ variant_id: product.id, quantity: qty, unit_price: product.price })),
          fulfillment_type: fulfillmentType,
        }),
      })
      const json = await res.json()
      const result = json.data || json
      if (result.valid) {
        setCouponApplied(true)
        setCouponDiscount(result.discount_amount)
        setCouponName(result.promotion_name)
      } else {
        setCouponError(result.message || 'Invalid coupon code')
      }
    } catch {
      setCouponError('Failed to validate coupon. Please try again.')
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setCouponApplied(false)
    setCouponDiscount(0)
    setCouponName('')
    setCouponCode('')
    setCouponError('')
    clearOffer()
  }

  const applyLoyalty = async () => {
    const pts = parseInt(loyaltyInput, 10)
    if (!pts || pts < 100) { setLoyaltyError('Minimum 100 points required'); return }
    if (pts > loyaltyPoints) { setLoyaltyError('You don\'t have enough points'); return }
    setLoyaltyLoading(true)
    setLoyaltyError('')
    try {
      const res = await fetch(`${API_URL}/api/v1/customer/orders/validate-loyalty-redemption`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ points: pts }),
      })
      const json = await res.json()
      const result = json.data || json
      if (result.valid !== false) {
        setLoyaltyApplied(true)
        setLoyaltyDiscount(result.discount_amount || Math.floor(pts / 100) * 10)
      } else {
        setLoyaltyError(result.message || 'Cannot redeem these points')
      }
    } catch {
      setLoyaltyError('Failed to validate. Please try again.')
    } finally {
      setLoyaltyLoading(false)
    }
  }

  const removeLoyalty = () => {
    setLoyaltyApplied(false)
    setLoyaltyDiscount(0)
    setLoyaltyInput('')
    setLoyaltyError('')
  }

  const handleContinueToDate = () => {
    if (validateAddress()) setStep(fulfillmentType === 'PICKUP' ? 3 : 2)
  }

  if (orderPlaced) {
    return (
      <div style={{ paddingTop: 120, minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 560, textAlign: 'center', padding: '60px 24px' }}>
          <Reveal>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: 'rgba(46,204,113,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            }}>
              <FIcon name="check" size={40} color="#27ae60" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--f-text)', marginBottom: 12 }}>Order Placed!</h1>
            {orderNumber && (
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 8 }}>
                Order #{orderNumber}
              </p>
            )}
            <p style={{ fontSize: 16, color: 'var(--f-text-secondary)', marginBottom: 8, lineHeight: 1.7 }}>
              Your fresh food is being prepared. You&apos;ll receive a confirmation shortly.
            </p>
            <p style={{ fontFamily: 'var(--f-font-bn)', fontSize: 15, color: 'var(--f-aqua)', marginBottom: 32 }}>
              ধন্যবাদ! আপনার অর্ডার গৃহীত হয়েছে।
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {orderId && (
                <Link href={`/account/orders/detail?id=${orderId}`} style={{ textDecoration: 'none' }}>
                  <FButton variant="primary" size="lg">View Order</FButton>
                </Link>
              )}
              <Link href="/" style={{ textDecoration: 'none' }}>
                <FButton variant="secondary" size="lg">Back to Home</FButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 120, minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 560, textAlign: 'center', padding: '60px 24px' }}>
          <FIcon name="cart" size={48} color="var(--f-border)" />
          <p style={{ marginTop: 16, fontSize: 17, fontWeight: 600, color: 'var(--f-text)' }}>Your cart is empty</p>
          <Link href="/shop" style={{ textDecoration: 'none', marginTop: 20, display: 'inline-block' }}>
            <FButton variant="primary" size="lg">Go Shopping</FButton>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900, paddingBottom: 80 }}>
        <Reveal>
          <Link href="/shop" style={{
            display: 'flex', alignItems: 'center', gap: 6, color: 'var(--f-text-muted)',
            fontSize: 14, fontWeight: 600, marginBottom: 24, textDecoration: 'none',
          }}>
            <FIcon name="arrowLeft" size={16} color="var(--f-text-muted)" /> Back to shop
          </Link>
        </Reveal>

        <Reveal>
          <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--f-text)', letterSpacing: '-0.03em', marginBottom: 32 }}>
            Checkout
          </h1>
        </Reveal>

        {/* Steps indicator */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
            {(fulfillmentType === 'PICKUP'
              ? ['Method', 'Details & Date', 'Payment']
              : ['Method', 'Details', 'Date', 'Payment']
            ).map((s, i) => {
              const active = fulfillmentType === 'PICKUP'
                ? (step === 0 ? i <= 0 : step === 1 ? i <= 1 : i <= 2)
                : i <= step
              return (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: active ? 'var(--f-aqua)' : 'var(--f-border)',
                  transition: 'background 0.3s ease',
                }} />
              )
            })}
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32 }}>
          {/* Left: Form */}
          <Reveal delay={150}>
            <div style={{ background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)', padding: 32, border: '1px solid var(--f-border)' }}>
              {step === 0 && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 6 }}>How would you like to get your order?</h3>
                  <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginBottom: 24 }}>Choose delivery or pickup from our store</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { id: 'DELIVERY', icon: '🚚', label: 'Home Delivery', desc: 'We deliver to your doorstep' },
                      { id: 'PICKUP', icon: '🏪', label: 'Pickup from Store', desc: 'Pick up at Fishora Store, Ishwardi' },
                    ].map(opt => (
                      <button key={opt.id} onClick={() => setFulfillmentType(opt.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px',
                        borderRadius: 'var(--f-radius-md)', cursor: 'pointer', textAlign: 'left',
                        background: fulfillmentType === opt.id ? 'var(--f-aqua-light)' : 'var(--f-bg)',
                        border: `2px solid ${fulfillmentType === opt.id ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                        transition: 'all 0.2s ease',
                      }}>
                        <span style={{ fontSize: 32 }}>{opt.icon}</span>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: fulfillmentType === opt.id ? 'var(--f-aqua)' : 'var(--f-text)' }}>{opt.label}</div>
                          <div style={{ fontSize: 13, color: 'var(--f-text-muted)', marginTop: 2 }}>{opt.desc}</div>
                        </div>
                        <div style={{
                          marginLeft: 'auto', width: 22, height: 22, borderRadius: '50%',
                          border: `2px solid ${fulfillmentType === opt.id ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {fulfillmentType === opt.id && <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--f-aqua)' }} />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <FButton variant="primary" size="lg" fullWidth onClick={() => setStep(1)}
                    style={{ marginTop: 28 }}>Continue</FButton>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 6 }}>
                    {fulfillmentType === 'DELIVERY' ? 'Delivery Details' : 'Pickup Details'}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginBottom: 24 }}>
                    {fulfillmentType === 'DELIVERY'
                      ? (isLoggedIn ? 'Pre-filled from your account. Edit if needed.' : 'Where should we deliver your order?')
                      : 'Confirm your contact details for pickup'
                    }
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <label style={labelStyle}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                      <input style={errors.name ? errorInputStyle : inputStyle} placeholder="e.g. রহিম উদ্দিন" value={address.name}
                        onChange={e => { setAddress({ ...address, name: e.target.value }); setErrors(p => ({ ...p, name: '' })) }} />
                      {errors.name && <span style={{ fontSize: 12, color: '#ef4444', marginTop: 4, display: 'block' }}>{errors.name}</span>}
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                      <input style={errors.phone ? errorInputStyle : inputStyle} placeholder="01XXXXXXXXX" value={address.phone}
                        onChange={e => { setAddress({ ...address, phone: e.target.value }); setErrors(p => ({ ...p, phone: '' })) }} />
                      {errors.phone && <span style={{ fontSize: 12, color: '#ef4444', marginTop: 4, display: 'block' }}>{errors.phone}</span>}
                    </div>

                    {fulfillmentType === 'DELIVERY' && (
                      <>
                        <div>
                          <label style={labelStyle}>Street Address <span style={{ color: '#ef4444' }}>*</span></label>
                          <input style={errors.street ? errorInputStyle : inputStyle} placeholder="House/Road/Block" value={address.street}
                            onChange={e => { setAddress({ ...address, street: e.target.value }); setErrors(p => ({ ...p, street: '' })); setSelectedAddressId(null) }} />
                          {errors.street && <span style={{ fontSize: 12, color: '#ef4444', marginTop: 4, display: 'block' }}>{errors.street}</span>}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                          <div>
                            <label style={labelStyle}>Area</label>
                            <input style={inputStyle} placeholder="Area / Moholla" value={address.area}
                              onChange={e => setAddress({ ...address, area: e.target.value })} />
                          </div>
                          <div>
                            <label style={labelStyle}>City</label>
                            <select style={{ ...inputStyle, cursor: 'pointer' }} value={address.city}
                              onChange={e => setAddress({ ...address, city: e.target.value })}>
                              <option>Ishwardi</option><option>Pabna</option><option>Rajshahi</option><option>Dhaka</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {fulfillmentType === 'PICKUP' && (
                      <>
                        <div style={{
                          padding: 20, borderRadius: 'var(--f-radius-md)',
                          background: 'var(--f-bg)', border: '1px solid var(--f-border)',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 24 }}>🏪</span>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--f-text)' }}>Fishora Store</div>
                              <div style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>Ishwardi, Pabna</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Pickup Date</label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8 }}>
                            {deliveryDates.map(d => (
                              <button key={d.value} onClick={() => { setDeliveryDate(d.value); setShowCalendar(false) }} style={{
                                padding: '12px 6px', borderRadius: 'var(--f-radius-md)', cursor: 'pointer',
                                background: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua-light)' : 'var(--f-bg)',
                                border: `2px solid ${deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                                transition: 'all 0.2s ease', textAlign: 'center',
                              }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-text-muted)' }}>{d.day}</div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-text)', lineHeight: 1.2 }}>{d.date}</div>
                                <div style={{ fontSize: 11, fontWeight: 500, color: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-text-muted)' }}>{d.month}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Preferred Pickup Time</label>
                          <select style={{ ...inputStyle, cursor: 'pointer' }} value={pickupTimeWindow}
                            onChange={e => setPickupTimeWindow(e.target.value)}>
                            <option>10AM - 12PM</option>
                            <option>12PM - 2PM</option>
                            <option>2PM - 4PM</option>
                            <option>4PM - 6PM</option>
                            <option>5PM - 7PM</option>
                            <option>Morning (9AM - 12PM)</option>
                            <option>Afternoon (12PM - 5PM)</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    <FButton variant="secondary" size="md" onClick={() => setStep(0)}>Back</FButton>
                    <FButton variant="primary" size="lg" onClick={handleContinueToDate} style={{ flex: 1 }}>Continue</FButton>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 6 }}>
                    {fulfillmentType === 'PICKUP' ? 'Pickup Date' : 'Delivery Date'}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginBottom: 24 }}>
                    {fulfillmentType === 'PICKUP' ? 'When would you like to pick up your order?' : 'When would you like to receive your order?'}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 10 }}>
                    {deliveryDates.map(d => (
                      <button key={d.value} onClick={() => { setDeliveryDate(d.value); setShowCalendar(false) }} style={{
                        padding: '16px 8px', borderRadius: 'var(--f-radius-md)', cursor: 'pointer',
                        background: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua-light)' : 'var(--f-bg)',
                        border: `2px solid ${deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                        transition: 'all 0.2s ease', textAlign: 'center',
                      }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-text-muted)', marginBottom: 4 }}>{d.day}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-text)', lineHeight: 1 }}>{d.date}</div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: deliveryDate === d.value && !showCalendar ? 'var(--f-aqua)' : 'var(--f-text-muted)', marginTop: 4 }}>{d.month}</div>
                        {d.isToday && <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--f-aqua)', marginTop: 4 }}>Tomorrow</div>}
                      </button>
                    ))}
                  </div>

                  {/* Pick another date */}
                  <div style={{ marginTop: 16 }}>
                    {!showCalendar ? (
                      <button onClick={() => setShowCalendar(true)} style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
                        borderRadius: 'var(--f-radius-md)', cursor: 'pointer', width: '100%',
                        background: 'var(--f-bg)', border: '1.5px dashed var(--f-border)',
                        color: 'var(--f-text-muted)', fontSize: 14, fontWeight: 600,
                        justifyContent: 'center', transition: 'all 0.2s',
                      }}>
                        <span style={{ fontSize: 18 }}>📅</span> Pick another date
                      </button>
                    ) : (
                      <div style={{
                        padding: 16, borderRadius: 'var(--f-radius-md)',
                        background: 'var(--f-aqua-light)', border: '2px solid var(--f-aqua)',
                      }}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--f-aqua)', marginBottom: 8 }}>
                          Select a delivery date
                        </label>
                        <input
                          type="date"
                          value={deliveryDate}
                          min={deliveryDates[0]?.value}
                          onChange={e => setDeliveryDate(e.target.value)}
                          style={{
                            width: '100%', padding: '12px 14px', borderRadius: 'var(--f-radius-md)',
                            border: '1.5px solid var(--f-aqua)', background: 'var(--f-surface)',
                            color: 'var(--f-text)', fontSize: 15, outline: 'none', cursor: 'pointer',
                          }}
                        />
                        {deliveryDate && !deliveryDates.find(d => d.value === deliveryDate) && (
                          <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--f-aqua)' }}>
                            Selected: {new Date(deliveryDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <FButton variant="secondary" size="md" onClick={() => setStep(1)}>Back</FButton>
                    <FButton variant="primary" size="lg" onClick={() => setStep(3)} style={{ flex: 1 }}>Continue to Payment</FButton>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--f-text)', marginBottom: 6 }}>Payment Method</h3>
                  <p style={{ fontSize: 13, color: 'var(--f-text-muted)', marginBottom: 24 }}>
                    {fulfillmentType === 'PICKUP' ? 'Choose a payment method or pay at the store' : 'How would you like to pay?'}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {payments.map(p => (
                      <button key={p.id} onClick={() => setPayment(payment === p.id ? '' : p.id)} style={{
                        padding: '20px 16px', borderRadius: 'var(--f-radius-md)', cursor: 'pointer',
                        background: payment === p.id ? 'var(--f-aqua-light)' : 'var(--f-bg)',
                        border: `2px solid ${payment === p.id ? 'var(--f-aqua)' : 'var(--f-border)'}`,
                        textAlign: 'center', transition: 'all 0.2s ease',
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, margin: '0 auto 8px',
                          background: p.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: 14, height: 14, borderRadius: 4, background: p.color }} />
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)' }}>{p.label}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginTop: 20,
                    padding: '12px 16px', borderRadius: 'var(--f-radius-md)',
                    background: 'rgba(46,204,113,0.06)', border: '1px solid rgba(46,204,113,0.15)',
                  }}>
                    <FIcon name="shield" size={18} color="#27ae60" />
                    <span style={{ fontSize: 13, color: '#27ae60', fontWeight: 500 }}>Your payment is secure and encrypted</span>
                  </div>
                  {/* Customer note */}
                  <div style={{ marginTop: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--f-text)', marginBottom: 6 }}>
                      Order Note <span style={{ fontWeight: 400, color: 'var(--f-text-muted)' }}>(optional)</span>
                    </label>
                    <textarea
                      value={customerNote}
                      onChange={e => setCustomerNote(e.target.value)}
                      placeholder="e.g. Please call before delivery, leave at the gate, extra packaging..."
                      rows={3}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: 70,
                      }}
                    />
                  </div>

                  {orderError && (
                    <div style={{
                      marginTop: 16, padding: '12px 16px', borderRadius: 'var(--f-radius-md)',
                      background: '#fef2f2', border: '1px solid #fecaca',
                      color: '#dc2626', fontSize: 14, fontWeight: 500,
                    }}>
                      {orderError}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <FButton variant="secondary" size="md" onClick={() => setStep(fulfillmentType === 'PICKUP' ? 1 : 2)}>Back</FButton>
                    <FButton variant="primary" size="lg" onClick={placeOrder} style={{ flex: 1, opacity: placing ? 0.7 : 1, pointerEvents: placing ? 'none' : 'auto' }}>
                      {placing ? 'Placing Order...' : `Place Order · ${fmt(subtotal - (couponApplied ? couponDiscount : 0) - (loyaltyApplied ? loyaltyDiscount : 0))}`}
                    </FButton>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Right: Order Summary */}
          <Reveal delay={200}>
            <div style={{
              background: 'var(--f-surface)', borderRadius: 'var(--f-radius-lg)',
              padding: 28, border: '1px solid var(--f-border)', position: 'sticky', top: 100,
            }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--f-text)', marginBottom: 20 }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cart.map((item) => {
                  if (item.type === 'combo') {
                    return (
                      <div key={`combo-${item.comboId}`} style={{
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                        paddingBottom: 16, borderBottom: '1px solid var(--f-border)',
                      }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: 10, overflow: 'hidden',
                          background: 'linear-gradient(135deg, #1a472a, #2d5a3f)', flexShrink: 0,
                        }}>
                          {item.comboImage ? (
                            <img src={item.comboImage} alt={item.comboName} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={e => { e.target.style.display = 'none' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff', fontWeight: 700 }}>C</div>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                            <span style={{
                              fontSize: 14, fontWeight: 600, color: 'var(--f-text)',
                              lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>
                              {item.comboName}
                            </span>
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: 'rgba(0,150,136,0.8)', borderRadius: 3, padding: '1px 5px' }}>COMBO</span>
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--f-text-muted)', marginBottom: 4, lineHeight: 1.4 }}>
                            {(item.components || []).map(c => c.name).join(', ')}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                              {fmt(item.comboPrice)} x {item.qty}
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)' }}>
                              {fmt(item.comboPrice * item.qty)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  const { product, qty } = item
                  return (
                    <div key={product.id} style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      paddingBottom: 16, borderBottom: '1px solid var(--f-border)',
                    }}>
                      {/* Item image */}
                      <div style={{
                        width: 52, height: 52, borderRadius: 10, overflow: 'hidden',
                        background: 'var(--f-bg)', flexShrink: 0,
                      }}>
                        {product.image ? (
                          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => { e.target.style.display = 'none' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🐟</div>
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 14, fontWeight: 600, color: 'var(--f-text)',
                          lineHeight: 1.3, marginBottom: 4,
                          overflow: 'hidden', textOverflow: 'ellipsis',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        }}>
                          {product.name}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: 'var(--f-text-muted)' }}>
                            {fmt(product.price)}/{product.unit === 'piece' || product.unit === 'pc' || product.unit === 'pcs' || product.unit === 'dozen' ? 'pc' : 'kg'} x {qty} {product.unit === 'piece' || product.unit === 'pc' || product.unit === 'pcs' || product.unit === 'dozen' ? 'pc' : 'kg'}
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--f-text)' }}>
                            {fmt(product.price * qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Coupon Code */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--f-border)' }}>
                {!couponApplied ? (
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--f-text-muted)', marginBottom: 8, display: 'block' }}>
                      Promo Code
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        value={couponCode}
                        onChange={e => { setCouponCode(e.target.value); setCouponError('') }}
                        placeholder="Enter code"
                        onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                        style={{
                          flex: 1, padding: '10px 14px', borderRadius: 'var(--f-radius-md)',
                          border: `1.5px solid ${couponError ? '#ef4444' : 'var(--f-border)'}`,
                          background: 'var(--f-bg)', color: 'var(--f-text)', fontSize: 14,
                          outline: 'none', textTransform: 'uppercase', letterSpacing: '0.05em',
                          fontWeight: 600,
                        }}
                      />
                      <button
                        onClick={applyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        style={{
                          padding: '10px 18px', borderRadius: 'var(--f-radius-md)',
                          background: 'var(--f-aqua)', color: '#fff', border: 'none',
                          fontSize: 13, fontWeight: 700, cursor: 'pointer',
                          opacity: couponLoading || !couponCode.trim() ? 0.5 : 1,
                          transition: 'opacity 0.2s',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: '#ef4444', fontWeight: 500 }}>
                        <span style={{ fontSize: 14 }}>&#10007;</span> {couponError}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 'var(--f-radius-md)',
                    background: 'rgba(46,204,113,0.08)', border: '1px solid rgba(46,204,113,0.2)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#27ae60', fontSize: 15, fontWeight: 700 }}>&#10003;</span>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--f-text)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {couponCode}
                        </span>
                        <span style={{ fontSize: 12, color: '#27ae60', fontWeight: 500, marginLeft: 6 }}>
                          {couponName}
                        </span>
                      </div>
                    </div>
                    <button onClick={removeCoupon} style={{
                      background: 'none', border: 'none', color: 'var(--f-text-muted)',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline',
                    }}>Remove</button>
                  </div>
                )}
              </div>

              {/* Loyalty Points Redemption */}
              {isLoggedIn && loyaltyPoints > 0 && (
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--f-border)' }}>
                  {!loyaltyApplied ? (
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#b45309', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 15 }}>&#9733;</span> Loyalty Points
                        <span style={{ fontWeight: 400, color: 'var(--f-text-muted)', marginLeft: 'auto', fontSize: 12 }}>
                          {loyaltyPoints.toLocaleString()} available
                        </span>
                      </label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          type="number"
                          value={loyaltyInput}
                          onChange={e => { setLoyaltyInput(e.target.value); setLoyaltyError('') }}
                          placeholder="Min 100"
                          min={100}
                          step={1}
                          max={loyaltyPoints}
                          style={{
                            flex: 1, padding: '10px 14px', borderRadius: 'var(--f-radius-md)',
                            border: `1.5px solid ${loyaltyError ? '#ef4444' : 'rgba(245,158,11,0.4)'}`,
                            background: 'var(--f-bg)', color: 'var(--f-text)', fontSize: 14,
                            outline: 'none', fontWeight: 600,
                          }}
                        />
                        <button
                          onClick={applyLoyalty}
                          disabled={loyaltyLoading || !loyaltyInput}
                          style={{
                            padding: '10px 18px', borderRadius: 'var(--f-radius-md)',
                            background: '#d97706', color: '#fff', border: 'none',
                            fontSize: 13, fontWeight: 700, cursor: 'pointer',
                            opacity: loyaltyLoading || !loyaltyInput ? 0.5 : 1,
                            transition: 'opacity 0.2s', whiteSpace: 'nowrap',
                          }}
                        >
                          {loyaltyLoading ? '...' : 'Apply'}
                        </button>
                      </div>
                      {loyaltyInput && parseInt(loyaltyInput, 10) >= 100 && (
                        <div style={{ fontSize: 12, color: '#b45309', marginTop: 6, fontWeight: 500 }}>
                          Discount: {fmt(Math.floor(parseInt(loyaltyInput, 10) / 100) * 10)}
                        </div>
                      )}
                      {loyaltyError && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: '#ef4444', fontWeight: 500 }}>
                          <span style={{ fontSize: 14 }}>&#10007;</span> {loyaltyError}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', borderRadius: 'var(--f-radius-md)',
                      background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#d97706', fontSize: 15, fontWeight: 700 }}>&#9733;</span>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--f-text)' }}>
                            {parseInt(loyaltyInput, 10).toLocaleString()} pts
                          </span>
                          <span style={{ fontSize: 12, color: '#b45309', fontWeight: 500, marginLeft: 6 }}>
                            -{fmt(loyaltyDiscount)}
                          </span>
                        </div>
                      </div>
                      <button onClick={removeLoyalty} style={{
                        background: 'none', border: 'none', color: 'var(--f-text-muted)',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline',
                      }}>Remove</button>
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>Subtotal ({cart.length} items)</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>{fmt(subtotal)}</span>
                </div>
                {couponApplied && couponDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, color: '#27ae60' }}>Coupon ({couponCode.toUpperCase()})</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#27ae60' }}>-{fmt(couponDiscount)}</span>
                  </div>
                )}
                {loyaltyApplied && loyaltyDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, color: '#b45309' }}>Loyalty ({parseInt(loyaltyInput, 10).toLocaleString()}pts)</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#b45309' }}>-{fmt(loyaltyDiscount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--f-text-muted)' }}>
                    {fulfillmentType === 'PICKUP' ? 'Pickup' : 'Delivery'}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: fulfillmentType === 'PICKUP' ? 'var(--f-aqua)' : 'var(--f-text-muted)' }}>
                    {fulfillmentType === 'PICKUP' ? 'Store Pickup' : 'Pending'}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 16, borderTop: '2px solid var(--f-border)', marginTop: 16,
              }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--f-text)' }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--f-aqua)' }}>{fmt(subtotal - (couponApplied ? couponDiscount : 0) - (loyaltyApplied ? loyaltyDiscount : 0))}</span>
              </div>

              {/* Delivery/Pickup info preview */}
              {address.name && step > 1 && (
                <div style={{
                  marginTop: 20, padding: 16, borderRadius: 'var(--f-radius-md)',
                  background: 'var(--f-bg)', border: '1px solid var(--f-border)',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--f-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {fulfillmentType === 'PICKUP' ? 'Pickup from' : 'Delivering to'}
                  </div>
                  {fulfillmentType === 'PICKUP' ? (
                    <>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>🏪 Fishora Store, Ishwardi</div>
                      <div style={{ fontSize: 13, color: 'var(--f-text-muted)', marginTop: 2 }}>{pickupTimeWindow}</div>
                      <div style={{ fontSize: 13, color: 'var(--f-text-muted)', marginTop: 2 }}>{address.name} · {address.phone}</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--f-text)' }}>{address.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--f-text-muted)', marginTop: 2 }}>{address.phone}</div>
                      <div style={{ fontSize: 13, color: 'var(--f-text-muted)', marginTop: 2 }}>
                        {[address.street, address.area, address.city].filter(Boolean).join(', ')}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
